/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { PollTallyVote } from 'modules/polling/types';
import { extractWinnerPlurality } from '../plurality';

describe('Extract winner condition plurality', () => {
  it('gets the one with most mkr', async () => {
    const votes: PollTallyVote[] = [
      {
        mkrSupport: 10,
        optionIdRaw: 1,
        ballot: [1],
        blockTimestamp: 1,
        chainId: 1,
        hash: '',
        voter: ''
      },
      {
        mkrSupport: 20,
        optionIdRaw: 2,
        ballot: [2],
        blockTimestamp: 1,
        chainId: 1,
        hash: '',
        voter: ''
      },
      {
        mkrSupport: 30,
        optionIdRaw: 3,
        ballot: [3],
        blockTimestamp: 1,
        chainId: 1,
        hash: '',
        voter: ''
      }
    ];

    const winner = extractWinnerPlurality(votes);

    expect(winner).toEqual(3);
  });
  it('doesnt find winner if two votes have the same MKR amount', async () => {
    const votes: PollTallyVote[] = [
      {
        mkrSupport: 10,
        optionIdRaw: 1,
        ballot: [1],
        blockTimestamp: 1,
        chainId: 1,
        hash: '',
        voter: ''
      },
      {
        mkrSupport: 10,
        optionIdRaw: 2,
        ballot: [2],
        blockTimestamp: 1,
        chainId: 1,
        hash: '',
        voter: ''
      }
    ];

    const winner = extractWinnerPlurality(votes);

    expect(winner).toEqual(null);
  });
});
