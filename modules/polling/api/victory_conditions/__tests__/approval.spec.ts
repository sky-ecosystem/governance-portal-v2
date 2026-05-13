/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { PollTallyVote } from 'modules/polling/types/pollTally';
import { extractWinnerApproval } from '../approval';

describe('Extract winner condition approval', () => {
  it('gets the one with most mkr', async () => {
    const votes: PollTallyVote[] = [
      {
        mkrSupport: 15,
        optionIdRaw: 1,
        ballot: [1, 2],
        blockTimestamp: 1,
        chainId: 1,
        hash: '',
        voter: '',
        pollId: 1
      },
      {
        mkrSupport: 20,
        optionIdRaw: 2,
        ballot: [2],
        blockTimestamp: 1,
        chainId: 1,
        hash: '',
        voter: '',
        pollId: 1
      },
      {
        mkrSupport: 30,
        optionIdRaw: 3,
        ballot: [3],
        blockTimestamp: 1,
        chainId: 1,
        hash: '',
        voter: '',
        pollId: 1
      }
    ];

    const winner = extractWinnerApproval(votes);

    expect(winner).toEqual(2);
  });
  it('finds no winner if two votes have the same MKR amount', async () => {
    const votes: PollTallyVote[] = [
      {
        mkrSupport: 10,
        optionIdRaw: 1,
        ballot: [1],
        blockTimestamp: 1,
        chainId: 1,
        hash: '',
        voter: '',
        pollId: 1
      },
      {
        mkrSupport: 10,
        optionIdRaw: 2,
        ballot: [2],
        blockTimestamp: 1,
        chainId: 1,
        hash: '',
        voter: '',
        pollId: 1
      }
    ];

    const winner = extractWinnerApproval(votes);

    expect(winner).toEqual(null);
  });
});
