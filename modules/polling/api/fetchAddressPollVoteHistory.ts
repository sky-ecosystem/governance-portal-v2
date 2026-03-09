/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { SupportedNetworks } from 'modules/web3/constants/networks';
import { PollVoteHistory } from '../types/pollVoteHistory';
import { getPollList } from './fetchPolls';
import { fetchAllCurrentVotes } from './fetchAllCurrentVotes';
import { PollTallyVote, Poll } from '../types';

export async function fetchAddressPollVoteHistory(
  address: string,
  network: SupportedNetworks
): Promise<PollVoteHistory[]> {
  const pollList = await getPollList(network);
  const voteHistory = await fetchAllCurrentVotes(address, network);
  const items = await Promise.all(
    voteHistory.map(async (pollVote: PollTallyVote): Promise<PollVoteHistory | null> => {
      const poll = pollList.find(poll => poll.pollId === pollVote.pollId);
      if (!poll) {
        return null;
      }

      const optionValue: string[] = [];
      if (pollVote.ballot && pollVote.ballot.length > 0) {
        pollVote.ballot.forEach(option => {
          optionValue.push(poll.options[option]);
        });
      }

      return {
        ...pollVote,
        poll: poll as unknown as Poll,
        optionValue
      };
    })
  );

  return items.filter(pollVote => !!pollVote) as PollVoteHistory[];
}
