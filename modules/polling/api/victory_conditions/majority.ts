/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

// Receives the currentVotes and the percentage required to be determined winner
import { PollTallyVote } from 'modules/polling/types';
import { formatEther, parseEther } from 'viem';

// Determines the winner of a majority algorithm. The percent is a number between 0-100 and it determines that the winner has to have more than "percent" of the MKR.
export function extractWinnerMajority(currentVotes: PollTallyVote[], percent: number): number | null {
  // Group votes by MKR support, remember that each vote has a ballot with possible many multiple options
  const votes: { [key: number]: bigint } = {};
  let totalMKR = 0n;

  currentVotes.forEach(vote => {
    totalMKR = totalMKR + parseEther(vote.mkrSupport.toString());

    vote.ballot.forEach(votedOption => {
      if (votes[votedOption]) {
        votes[votedOption] = votes[votedOption] + parseEther(vote.mkrSupport.toString());
      } else {
        votes[votedOption] = parseEther(vote.mkrSupport.toString());
      }
    });
  });

  // Sort options by MKR support
  const sortedOptions = Object.keys(votes)
    .map(option => {
      return {
        option: parseInt(option),
        mkrSupport: votes[parseInt(option)]
      };
    })
    .sort((prev, next) => {
      return prev.mkrSupport >= next.mkrSupport ? -1 : 1;
    });

  const mostVoted = sortedOptions[0];

  if (!mostVoted) {
    return null;
  }

  // Check percentage of majority
  if (+formatEther(mostVoted.mkrSupport) / +formatEther(totalMKR) >= (percent > 0 ? percent / 100 : 0)) {
    return mostVoted.option;
  }

  // Does not pass majority
  return null;
}
