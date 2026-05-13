/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { PollTallyVote } from 'modules/polling/types';
import { parseEther } from 'viem';

export function extractWinnerApproval(currentVotes: PollTallyVote[]): number | null {
  if (currentVotes.length === 0) {
    return null;
  }

  const votes: { [key: number]: bigint } = {};

  currentVotes.forEach(vote => {
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
      return prev.mkrSupport > next.mkrSupport ? -1 : 1;
    });

  // if the 2 first options share the same MKR amount, return null
  if (sortedOptions.length >= 2) {
    if (sortedOptions[0].mkrSupport === sortedOptions[1].mkrSupport) {
      return null;
    }
  }

  const winner = sortedOptions.length > 0 ? sortedOptions[0].option : null;
  return winner;
}
