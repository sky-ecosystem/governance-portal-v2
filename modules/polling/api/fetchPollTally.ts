/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { SupportedNetworks } from 'modules/web3/constants/networks';
import { Poll, PollTally, PollTallyOption, PollTallyVote, VictoryCondition } from 'modules/polling/types';
import { extractWinnerPlurality } from './victory_conditions/plurality';
import { PollVictoryConditions } from '../polling.constants';
import { extractWinnerApproval } from './victory_conditions/approval';
import { extractWinnerMajority } from './victory_conditions/majority';
import { extractWinnerInstantRunoff } from './victory_conditions/instantRunoff';
import { extractWinnerDefault } from './victory_conditions/default';
import { InstantRunoffResults } from '../types/instantRunoff';
import { extractSatisfiesComparison } from './victory_conditions/comparison';
import { hasVictoryConditionInstantRunOff } from '../helpers/utils';
import { fetchVotesByAddressForPoll } from './fetchVotesByAddress';
import { calculatePercentage } from 'lib/utils';
import { parseEther } from 'viem';

type WinnerOption = { winner: number | null; results: InstantRunoffResults | null };

export function findWinner(condition: VictoryCondition, votes: PollTallyVote[], poll: Poll): WinnerOption {
  let results: InstantRunoffResults | null = null;

  switch (condition.type) {
    case PollVictoryConditions.approval:
      return {
        winner: extractWinnerApproval(votes),
        results
      };
    case PollVictoryConditions.majority:
      return { winner: extractWinnerMajority(votes, condition.percent), results };
    case PollVictoryConditions.plurality:
      return { winner: extractWinnerPlurality(votes), results };
    case PollVictoryConditions.instantRunoff:
      results = extractWinnerInstantRunoff(votes);
      return { winner: results ? results.winner : null, results };
    case PollVictoryConditions.default:
      return { winner: extractWinnerDefault(poll, condition.value), results };
    // In case comparison is set on the top level instead of inside a AND logic.
    // Inside of an AND logic, comparison is set as a filter to be complied with
    // on the top level we would take the first option that passes this condition and declare it a winner
    case PollVictoryConditions.comparison:
      return {
        winner:
          extractSatisfiesComparison(votes, condition.comparator, condition.value).length > 0
            ? extractSatisfiesComparison(votes, condition.comparator, condition.value)[0]
            : null,
        results
      };
    default:
      return {
        winner: null,
        results
      };
  }
}

export async function fetchPollTally(poll: Poll, network: SupportedNetworks): Promise<PollTally> {
  // Fetch spock votes for the poll
  const endUnix = new Date(poll.endDate).getTime() / 1000;

  const votesByAddress = await fetchVotesByAddressForPoll(poll.pollId, endUnix, network);

  // Abstain
  const abstain = poll.parameters.inputFormat.abstain ? poll.parameters.inputFormat.abstain : [0];

  let totalMkrParticipation = 0n;
  let totalMkrActiveParticipation = 0n;

  // Remove all the votes that voted "Abstain" in any option. (It should only be 1 abstain option)
  const filteredVotes = votesByAddress.filter(vote => {
    // Store the total MKR
    totalMkrParticipation = totalMkrParticipation + parseEther(vote.mkrSupport.toString());
    if (vote.ballot.filter(i => abstain.indexOf(i) !== -1).length > 0) {
      return false;
    }

    totalMkrActiveParticipation = totalMkrActiveParticipation + parseEther(vote.mkrSupport.toString());

    return true;
  });

  let winnerOption: WinnerOption = { winner: null, results: null };

  let victoryConditionMatched: number | null = null;

  // Victory conditions work like an "if-else", if the first does not find a winner, we move to the next one
  poll.parameters.victoryConditions.forEach((victoryGroup, index) => {
    // A winner has been found, skip.
    if (winnerOption.winner) {
      return;
    }

    if (victoryGroup.type === PollVictoryConditions.and) {
      // If all the winners are the same, and a winner is found, declare this the winner.
      let allTheSame = true;
      let allWinners = true;

      let andWinner: WinnerOption | null = null;

      victoryGroup.conditions.forEach(condition => {
        // Comparison is a filter
        if (condition.type === PollVictoryConditions.comparison) {
          // Comparison returns an array of options that satisfy the condition
          const satisfiesConditions = extractSatisfiesComparison(
            filteredVotes,
            condition.comparator,
            condition.value
          );
          if (satisfiesConditions.length === 0) {
            allWinners = false;
          }

          if (!andWinner?.winner) {
            andWinner = {
              winner: satisfiesConditions.length > 0 ? satisfiesConditions[0] : null,
              results: null
            };
          } else {
            // There's no winner that satisfies conditions
            if (satisfiesConditions.indexOf(andWinner.winner) === -1) {
              allTheSame = false;
            }
          }
          return;
        }

        // For all the other conditions except comparison, we find the winner and compare.
        const winnerOptionAnd = findWinner(condition, filteredVotes, poll);
        if (!winnerOptionAnd.winner) {
          allWinners = false;
          return;
        }

        if (andWinner && andWinner.winner !== winnerOptionAnd.winner) {
          allTheSame = false;
          return;
        }

        if (!andWinner) {
          andWinner = winnerOptionAnd;
        }
      });

      if (allTheSame && allWinners && andWinner) {
        winnerOption = andWinner;
        victoryConditionMatched = index;
      }
    } else {
      const winnerGroup = findWinner(victoryGroup, filteredVotes, poll);
      if (winnerGroup.winner) {
        winnerOption = winnerGroup;
        victoryConditionMatched = index;
      }
    }
  });

  // Format results
  const votesInfo: { [key: number]: bigint } = {};

  // needs to consider IRV without comparator threshold met when aggregating MKR
  const isIrv = hasVictoryConditionInstantRunOff(poll.parameters.victoryConditions);

  // Aggregate the MKR support
  votesByAddress.forEach(vote => {
    // if IRV and no winner, only consider weight from first ballot option
    if (isIrv && !winnerOption.results) {
      if (votesInfo[vote.ballot[0]]) {
        votesInfo[vote.ballot[0]] = votesInfo[vote.ballot[0]] + parseEther(vote.mkrSupport.toString());
      } else {
        votesInfo[vote.ballot[0]] = parseEther(vote.mkrSupport.toString());
      }
    } else {
      // otherwise aggregate all votes
      vote.ballot.forEach(votedOption => {
        if (votesInfo[votedOption]) {
          votesInfo[votedOption] = votesInfo[votedOption] + parseEther(vote.mkrSupport.toString());
        } else {
          votesInfo[votedOption] = parseEther(vote.mkrSupport.toString());
        }
      });
    }
  });

  // Form the results structure
  const results: PollTallyOption[] = Object.keys(poll.options)
    .map(key => {
      const optionId = parseInt(key);
      const instantRunoffOption = winnerOption.results?.options[optionId];

      // To get the real MKR support we need to get the one extracted from the ranked results, for instant-runoff, since
      // it will count the firstChoice MKR support based on the algorithm. Except for abstain
      // for other algorithms we just use the accumulated MKR

      const isAbstainOption = poll.parameters.inputFormat.abstain.indexOf(parseInt(key)) !== -1;

      const mkrSupport =
        winnerOption.results && !isAbstainOption
          ? instantRunoffOption?.mkrSupport || 0n
          : votesInfo[optionId] || 0n;

      const firstPct =
        totalMkrParticipation > 0n ? calculatePercentage(mkrSupport, totalMkrParticipation, 4) : 0;
      const transferPct =
        totalMkrParticipation > 0n && instantRunoffOption?.transfer
          ? calculatePercentage(instantRunoffOption.transfer, totalMkrParticipation, 4)
          : 0;

      return {
        optionId,
        winner: winnerOption.winner === optionId,
        mkrSupport: mkrSupport.toString(),
        optionName: poll.options[optionId],
        eliminated: instantRunoffOption?.eliminated,
        transfer: instantRunoffOption?.transfer?.toString(),
        firstPct,
        transferPct
      };
    })
    .sort((a, b) => {
      const valueA = parseEther(a.mkrSupport) + parseEther((a.transfer || 0).toString());
      const valueB = parseEther(b.mkrSupport) + parseEther((b.transfer || 0).toString());
      if (valueA === valueB) return a.optionName > b.optionName ? 1 : -1;
      return valueA > valueB ? -1 : 1;
    });

  const tally: PollTally = {
    parameters: poll.parameters,
    winner: winnerOption.winner ? winnerOption.winner : null,
    victoryConditionMatched,
    numVoters: votesByAddress.length,
    totalMkrParticipation: totalMkrParticipation.toString(),
    totalMkrActiveParticipation: totalMkrActiveParticipation.toString(),
    winningOptionName: winnerOption.winner ? poll.options[winnerOption.winner] : 'None found',
    results,
    rounds: winnerOption.results?.rounds,
    votesByAddress
  };

  return tally;
}
