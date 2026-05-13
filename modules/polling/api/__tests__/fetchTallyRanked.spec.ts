/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { gqlRequest } from '../../../../modules/gql/gqlRequest';
import { fetchPollTally } from '../fetchPollTally';
import { SupportedNetworks } from 'modules/web3/constants/networks';
import { Poll } from 'modules/polling/types';
import { PollInputFormat, PollResultDisplay, PollVictoryConditions } from 'modules/polling/polling.constants';
import { Mock, vi } from 'vitest';

vi.mock('modules/gql/gqlRequest');

const fromBuffer = (buf, opts?) => {
  if (!opts) {
    opts = {};
  }

  const endian = { 1: 'big', '-1': 'little' }[opts.endian] || opts.endian || 'big';

  const size = opts.size === 'auto' ? Math.ceil(buf.length) : opts.size || 1;

  if (buf.length % size !== 0) {
    throw new RangeError(`Buffer length (${buf.length}) must be a multiple of size (${size})`);
  }

  const hex = [];
  for (let i = 0; i < buf.length; i += size) {
    const chunk = [];
    for (let j = 0; j < size; j++) {
      chunk.push(buf[i + (endian === 'big' ? j : size - j - 1)]);
    }

    hex.push(chunk.map(c => (c < 16 ? '0' : '') + c.toString(16)).join(''));
  }

  return BigInt('0x' + hex.join(''));
};

describe('Fetch tally ranked', () => {
  const mockPoll: Poll = {
    pollId: 1,
    options: {
      '0': 'Abstain',
      '1': 'First',
      '2': 'Second',
      '3': 'Third',
      '4': 'Fourth'
    },
    parameters: {
      inputFormat: {
        type: PollInputFormat.rankFree,
        abstain: [0],
        options: []
      },
      resultDisplay: PollResultDisplay.instantRunoffBreakdown,
      victoryConditions: [
        {
          type: PollVictoryConditions.instantRunoff
        }
      ]
    }
  } as any as Poll;

  it('gives expected results for a tally with majority', async () => {
    (gqlRequest as Mock).mockResolvedValueOnce({
      voteAddressMkrWeightsAtTime: {
        nodes: [
          {
            mkrSupport: '60.025000000000000000',
            optionIdRaw: fromBuffer([1, 3].reverse()) // [1st choice, 2nd choice, ...]
          },
          {
            mkrSupport: '200.598801867883985831',
            optionIdRaw: fromBuffer([3, 1].reverse())
          },
          {
            mkrSupport: '64.068823529411764706',
            optionIdRaw: fromBuffer([2, 3].reverse())
          }
        ]
      }
    });

    const result = await fetchPollTally(mockPoll, SupportedNetworks.MAINNET);
    const expectedResult = {
      parameters: mockPoll.parameters,
      rounds: 1,
      winner: 3,
      winningOptionName: 'Third',
      victoryConditionMatched: 0,
      totalMkrActiveParticipation: '324692625397295750537',
      totalMkrParticipation: '324692625397295750537',
      results: [
        {
          optionId: 3,
          optionName: 'Third',
          firstPct: 61.7811,
          mkrSupport: '200598801867883985831',
          transfer: '0',
          transferPct: 0,
          winner: true,
          eliminated: false
        },
        {
          optionId: 2,
          optionName: 'Second',
          firstPct: 19.7321,
          mkrSupport: '64068823529411764706',
          transfer: '0',
          transferPct: 0,
          winner: false,
          eliminated: false
        },
        {
          optionId: 1,
          optionName: 'First',
          firstPct: 18.4867,
          mkrSupport: '60025000000000000000',
          transfer: '0',
          transferPct: 0,
          winner: false,
          eliminated: false
        },
        {
          optionId: 0,
          optionName: 'Abstain',
          firstPct: 0,
          mkrSupport: '0',
          transferPct: 0,
          winner: false
        },
        {
          optionId: 4,
          optionName: 'Fourth',
          firstPct: 0,
          mkrSupport: '0',
          transferPct: 0,
          winner: false
        }
      ],
      numVoters: 3
    };

    expect(result).toEqual(expect.objectContaining(expectedResult));
  });
  it('gives expected results for a tally with no  majority', async () => {
    (gqlRequest as Mock).mockResolvedValueOnce({
      voteAddressMkrWeightsAtTime: {
        nodes: [
          {
            mkrSupport: '60.025000000000000000',
            optionIdRaw: fromBuffer([1, 3].reverse()) // [1st choice, 2nd choice, ...]
          },
          {
            mkrSupport: '102.598801867883985831',
            optionIdRaw: fromBuffer([3, 1].reverse())
          },
          {
            mkrSupport: '64.068823529411764706',
            optionIdRaw: fromBuffer([2, 3].reverse())
          }
        ]
      }
    });

    const result = await fetchPollTally(mockPoll, SupportedNetworks.MAINNET);

    const expectedResult = {
      parameters: mockPoll.parameters,
      rounds: 2,
      winner: 3,
      winningOptionName: 'Third',
      victoryConditionMatched: 0,
      totalMkrActiveParticipation: '226692625397295750537',
      totalMkrParticipation: '226692625397295750537',
      results: [
        {
          optionId: 3,
          optionName: 'Third',
          firstPct: 45.259,
          mkrSupport: '102598801867883985831',
          transfer: '60025000000000000000',
          transferPct: 26.4786,
          winner: true,
          eliminated: false
        },
        {
          optionId: 2,
          optionName: 'Second',
          firstPct: 28.2624,
          mkrSupport: '64068823529411764706',
          transfer: '0',
          transferPct: 0,
          winner: false,
          eliminated: false
        },
        {
          optionId: 0,
          optionName: 'Abstain',
          firstPct: 0,
          mkrSupport: '0',
          transferPct: 0,
          winner: false
        },
        {
          optionId: 1,
          optionName: 'First',
          firstPct: 26.4786,
          mkrSupport: '60025000000000000000',
          transfer: '-60025000000000000000',
          transferPct: -26.4785,
          winner: false,
          eliminated: true
        },

        {
          optionId: 4,
          optionName: 'Fourth',
          firstPct: 0,
          mkrSupport: '0',
          transferPct: 0,
          winner: false
        }
      ],
      numVoters: 3
    };

    expect(result).toEqual(expect.objectContaining(expectedResult));
  });

  it('gives expected results for a tally with multiple rounds', async () => {
    (gqlRequest as Mock).mockResolvedValueOnce({
      voteAddressMkrWeightsAtTime: {
        nodes: [
          {
            mkrSupport: '60.025000000000000000',
            optionIdRaw: fromBuffer([1, 3].reverse()) // [1st choice, 2nd choice, ...]
          },
          {
            mkrSupport: '102.598801867883985831',
            optionIdRaw: fromBuffer([3, 1].reverse())
          },
          {
            mkrSupport: '64.068823529411764706',
            optionIdRaw: fromBuffer([2, 3].reverse())
          },
          {
            mkrSupport: '4',
            optionIdRaw: fromBuffer([4, 1].reverse())
          }
        ]
      }
    });

    const result = await fetchPollTally(mockPoll, SupportedNetworks.MAINNET);

    const expectedResult = {
      parameters: mockPoll.parameters,
      rounds: 3,
      winner: 3,
      winningOptionName: 'Third',
      victoryConditionMatched: 0,
      totalMkrActiveParticipation: '230692625397295750537',
      totalMkrParticipation: '230692625397295750537',
      results: [
        {
          optionId: 3,
          optionName: 'Third',
          firstPct: 44.4742,
          mkrSupport: '102598801867883985831',
          transfer: '60025000000000000000',
          transferPct: 26.0195,
          winner: true,
          eliminated: false
        },
        {
          optionId: 2,
          optionName: 'Second',
          firstPct: 27.7724,
          mkrSupport: '64068823529411764706',
          transfer: '0',
          transferPct: 0,
          winner: false,
          eliminated: false
        },
        {
          optionId: 1,
          optionName: 'First',
          firstPct: 26.0195,
          mkrSupport: '60025000000000000000',
          transfer: '-56025000000000000000',
          transferPct: -24.2855,
          winner: false,
          eliminated: true
        },
        {
          optionId: 0,
          optionName: 'Abstain',
          firstPct: 0,
          mkrSupport: '0',
          transferPct: 0,
          winner: false
        },
        {
          optionId: 4,
          optionName: 'Fourth',
          firstPct: 1.7339,
          mkrSupport: '4000000000000000000',
          transfer: '-4000000000000000000',
          transferPct: -1.7338,
          winner: false,
          eliminated: true
        }
      ],
      numVoters: 4
    };

    expect(result).toEqual(expect.objectContaining(expectedResult));
  });

  it('ranked choice tally verify eliminated options cant get votes', async () => {
    (gqlRequest as Mock).mockResolvedValueOnce({
      voteAddressMkrWeightsAtTime: {
        nodes: [
          {
            mkrSupport: '60.025000000000000000',
            optionIdRaw: fromBuffer([1, 3].reverse())
          },
          {
            mkrSupport: '102.598801867883985831',
            optionIdRaw: fromBuffer([3, 1].reverse())
          },
          {
            mkrSupport: '54.068823529411764706',
            // option 4 should never get these votes since it's eliminated in the first round
            optionIdRaw: fromBuffer([2, 4].reverse())
          },
          {
            mkrSupport: '4',
            optionIdRaw: fromBuffer([4, 1].reverse())
          }
        ]
      }
    });

    const result = await fetchPollTally(mockPoll, SupportedNetworks.MAINNET);

    const expectedResult = {
      parameters: mockPoll.parameters,
      rounds: 4,
      winner: 3,
      victoryConditionMatched: 0,
      winningOptionName: 'Third',
      totalMkrActiveParticipation: '220692625397295750537',
      totalMkrParticipation: '220692625397295750537',
      results: [
        {
          optionId: 3,
          optionName: 'Third',
          firstPct: 46.4895,
          mkrSupport: '102598801867883985831',
          transfer: '60025000000000000000',
          transferPct: 27.1985,
          winner: true,
          eliminated: false
        },
        {
          optionId: 2,
          optionName: 'Second',
          firstPct: 24.4996,
          mkrSupport: '54068823529411764706',
          transfer: '0',
          transferPct: 0,
          winner: false,
          eliminated: true
        },
        {
          optionId: 1,
          optionName: 'First',
          firstPct: 27.1985,
          mkrSupport: '60025000000000000000',
          transfer: '-56025000000000000000',
          transferPct: -25.3859,
          winner: false,
          eliminated: true
        },

        {
          optionId: 0,
          optionName: 'Abstain',
          firstPct: 0,
          mkrSupport: '0',
          transferPct: 0,
          winner: false
        },
        {
          optionId: 4,
          optionName: 'Fourth',
          firstPct: 1.8125,
          mkrSupport: '4000000000000000000',
          transfer: '-4000000000000000000',
          transferPct: -1.8124,
          winner: false,
          eliminated: true
        }
      ],
      numVoters: 4
    };

    expect(result).toEqual(expect.objectContaining(expectedResult));
  });

  // round 1
  // option 1: 101, option 2: 100, option 3: 50, option 4: 49, total: 300
  // round 2
  // option 1: 101, option 2: 100, option 3: 99, option 4: 0, total: 300
  // round 3
  // option 1: 101, option 2: 100, option 3: 0, option 4: 0, total: 300
  // round 4
  // option 1: 201, option 2: 0, option 3: 0, option 4: 0, total: 300
  // winner: option 1
  it('ranked choice tally stop when 1 remains', async () => {
    (gqlRequest as Mock).mockResolvedValueOnce({
      voteAddressMkrWeightsAtTime: {
        nodes: [
          {
            mkrSupport: '101',
            optionIdRaw: fromBuffer([1])
          },
          {
            mkrSupport: '100',
            optionIdRaw: fromBuffer([2, 1].reverse())
          },
          {
            mkrSupport: '50',
            optionIdRaw: fromBuffer([3])
          },
          {
            mkrSupport: '49',
            optionIdRaw: fromBuffer([4, 3].reverse())
          }
        ]
      }
    });

    const result = await fetchPollTally(mockPoll, SupportedNetworks.MAINNET);

    const expectedResult = {
      parameters: mockPoll.parameters,
      rounds: 4,
      winner: 1,
      victoryConditionMatched: 0,
      winningOptionName: 'First',
      totalMkrParticipation: '300000000000000000000',
      totalMkrActiveParticipation: '300000000000000000000',
      results: [
        {
          optionId: 1,
          optionName: 'First',
          firstPct: 33.6667,
          mkrSupport: '101000000000000000000',
          transfer: '100000000000000000000',
          transferPct: 33.3333,
          winner: true,
          eliminated: false
        },

        {
          optionId: 3,
          optionName: 'Third',
          mkrSupport: '50000000000000000000',
          firstPct: 16.6667,
          transfer: '49000000000000000000',
          transferPct: 16.3333,
          winner: false,
          eliminated: true
        },
        {
          optionId: 0,
          optionName: 'Abstain',
          firstPct: 0,
          mkrSupport: '0',
          transferPct: 0,
          winner: false
        },

        {
          optionId: 4,
          optionName: 'Fourth',
          firstPct: 16.3333,
          mkrSupport: '49000000000000000000',
          transfer: '-49000000000000000000',
          transferPct: -16.3332,
          winner: false,
          eliminated: true
        },
        {
          optionId: 2,
          optionName: 'Second',
          firstPct: 33.3333,
          mkrSupport: '100000000000000000000',
          transfer: '-100000000000000000000',
          transferPct: -33.3332,
          winner: false,
          eliminated: true
        }
      ],
      numVoters: 4
    };

    expect(result).toEqual(expect.objectContaining(expectedResult));
  });
});
