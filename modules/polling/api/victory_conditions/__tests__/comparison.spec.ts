/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { PollTallyVote } from 'modules/polling/types';
import { extractSatisfiesComparison } from '../comparison';

describe('Find options that satisfy condition comparison', () => {
  it('gives no options if no comparison is passed', async () => {
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

    const winner = extractSatisfiesComparison(votes, '>', 1000);

    expect(winner).toEqual([]);
  });
  it('gives all options with > 1000 mkr', async () => {
    const votes: PollTallyVote[] = [
      {
        mkrSupport: 1230,
        optionIdRaw: 1,
        ballot: [1],
        blockTimestamp: 1,
        chainId: 1,
        hash: '',
        voter: '',
        pollId: 1
      },
      {
        mkrSupport: 1000,
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

    const winner = extractSatisfiesComparison(votes, '>', 1000);

    expect(winner).toEqual([1]);
  });

  it('gives all options with >= 1000 mkr', async () => {
    const votes: PollTallyVote[] = [
      {
        mkrSupport: 1230,
        optionIdRaw: 1,
        ballot: [1],
        blockTimestamp: 1,
        chainId: 1,
        hash: '',
        voter: '',
        pollId: 1
      },
      {
        mkrSupport: 1000,
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

    const winner = extractSatisfiesComparison(votes, '>=', 1000);

    expect(winner).toEqual([1, 2]);
  });

  it('gives all options with = 1000 mkr', async () => {
    const votes: PollTallyVote[] = [
      {
        mkrSupport: 1230,
        optionIdRaw: 1,
        ballot: [1],
        blockTimestamp: 1,
        chainId: 1,
        hash: '',
        voter: '',
        pollId: 1
      },
      {
        mkrSupport: 1000,
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

    const winner = extractSatisfiesComparison(votes, '=', 1000);

    expect(winner).toEqual([2]);
  });

  it('gives all options with < 1000 mkr', async () => {
    const votes: PollTallyVote[] = [
      {
        mkrSupport: 1230,
        optionIdRaw: 1,
        ballot: [1],
        blockTimestamp: 1,
        chainId: 1,
        hash: '',
        voter: '',
        pollId: 1
      },
      {
        mkrSupport: 1000,
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

    const winner = extractSatisfiesComparison(votes, '<', 1000);

    expect(winner).toEqual([3]);
  });

  it('gives all options with <= 1000 mkr', async () => {
    const votes: PollTallyVote[] = [
      {
        mkrSupport: 1230,
        optionIdRaw: 1,
        ballot: [1],
        blockTimestamp: 1,
        chainId: 1,
        hash: '',
        voter: '',
        pollId: 1
      },
      {
        mkrSupport: 1000,
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

    const winner = extractSatisfiesComparison(votes, '<=', 1000);

    expect(winner).toEqual([2, 3]);
  });
});
