/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { PollInputFormat, PollResultDisplay, PollVictoryConditions } from 'modules/polling/polling.constants';
import { Poll } from 'modules/polling/types';
import { SupportedNetworks } from 'modules/web3/constants/networks';
import { gqlRequest } from '../../../gql/gqlRequest';
import { fetchPollTally } from '../fetchPollTally';
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

describe('Fetch tally combined with other options', () => {
  const mockPollApproval: Poll = {
    pollId: 1,
    options: {
      '0': 'Abstain',
      '1': 'Approve Existing Budget',
      '2': 'Approve Increase',
      '3': 'Reject'
    },
    parameters: {
      inputFormat: {
        type: PollInputFormat.chooseFree,
        abstain: [0],
        options: []
      },
      resultDisplay: PollResultDisplay.approvalBreakdown,
      victoryConditions: [
        {
          type: PollVictoryConditions.and,
          conditions: [
            {
              type: PollVictoryConditions.approval
            },
            {
              type: PollVictoryConditions.majority,
              percent: 50
            }
          ]
        },
        {
          type: PollVictoryConditions.default,
          value: 3
        }
      ]
    }
  } as any as Poll;

  it('Does not find winner if it doesnt pass the majority percent, and it defaults to 3', async () => {
    (gqlRequest as Mock).mockResolvedValueOnce({
      voteAddressMkrWeightsAtTime: {
        nodes: [
          {
            optionIdRaw: '1',
            mkrSupport: '100'
          },
          {
            optionIdRaw: '2',
            mkrSupport: '90'
          },
          {
            optionIdRaw: '3',
            mkrSupport: '80'
          }
        ]
      }
    });

    const result = await fetchPollTally(mockPollApproval, SupportedNetworks.MAINNET);

    const expectedResult = {
      parameters: mockPollApproval.parameters,
      winner: 3,
      winningOptionName: 'Reject',
      totalMkrActiveParticipation: '270000000000000000000',
      totalMkrParticipation: '270000000000000000000',
      victoryConditionMatched: 1,
      numVoters: 3,
      results: [
        {
          optionId: 1,
          optionName: 'Approve Existing Budget',
          firstPct: 37.037,
          mkrSupport: '100000000000000000000',
          transferPct: 0,
          winner: false
        },
        {
          optionId: 2,
          optionName: 'Approve Increase',
          firstPct: 33.3333,
          mkrSupport: '90000000000000000000',
          transferPct: 0,
          winner: false
        },
        {
          optionId: 3,
          optionName: 'Reject',
          firstPct: 29.6296,
          mkrSupport: '80000000000000000000',
          transferPct: 0,
          winner: true
        },
        {
          optionId: 0,
          optionName: 'Abstain',
          mkrSupport: '0',
          firstPct: 0,
          transferPct: 0,
          winner: false
        }
      ]
    };

    expect(result).toEqual(expect.objectContaining(expectedResult));
  });

  it('Does find a winner if it pass the majority percent', async () => {
    (gqlRequest as Mock).mockResolvedValueOnce({
      voteAddressMkrWeightsAtTime: {
        nodes: [
          {
            optionIdRaw: '1',
            mkrSupport: '200'
          },
          {
            optionIdRaw: '2',
            mkrSupport: '90'
          },
          {
            optionIdRaw: '3',
            mkrSupport: '80'
          }
        ]
      }
    });

    const result = await fetchPollTally(mockPollApproval, SupportedNetworks.MAINNET);

    const expectedResult = {
      parameters: mockPollApproval.parameters,
      winner: 1,
      winningOptionName: 'Approve Existing Budget',
      totalMkrActiveParticipation: '370000000000000000000',
      totalMkrParticipation: '370000000000000000000',
      victoryConditionMatched: 0,
      numVoters: 3,
      results: [
        {
          optionId: 1,
          optionName: 'Approve Existing Budget',
          firstPct: 54.0541,
          mkrSupport: '200000000000000000000',
          transferPct: 0,
          winner: true
        },
        {
          optionId: 2,
          optionName: 'Approve Increase',
          firstPct: 24.3243,
          mkrSupport: '90000000000000000000',
          transferPct: 0,
          winner: false
        },
        {
          optionId: 3,
          optionName: 'Reject',
          firstPct: 21.6216,
          mkrSupport: '80000000000000000000',
          transferPct: 0,
          winner: false
        },
        {
          optionId: 0,
          optionName: 'Abstain',
          mkrSupport: '0',
          firstPct: 0,
          transferPct: 0,
          winner: false
        }
      ]
    };

    expect(result).toEqual(expect.objectContaining(expectedResult));
  });

  const mockPollRanked: Poll = {
    pollId: 1,
    options: {
      '0': 'Abstain',
      '1': 'Approve Existing Budget',
      '2': 'Approve Increase',
      '3': 'Reject',
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
          type: PollVictoryConditions.and,
          conditions: [
            {
              type: PollVictoryConditions.instantRunoff
            },
            {
              type: PollVictoryConditions.majority,
              percent: 50
            }
          ]
        },
        {
          type: PollVictoryConditions.default,
          value: 3
        }
      ]
    }
  } as any as Poll;

  it('ranked choice + majority when majority is not met', async () => {
    (gqlRequest as Mock).mockResolvedValueOnce({
      voteAddressMkrWeightsAtTime: {
        nodes: [
          {
            mkrSupport: '101',
            optionIdRaw: fromBuffer([1])
          },
          {
            mkrSupport: '100',
            optionIdRaw: fromBuffer([2].reverse())
          },
          {
            mkrSupport: '50',
            optionIdRaw: fromBuffer([3])
          },
          {
            mkrSupport: '49',
            optionIdRaw: fromBuffer([4].reverse())
          }
        ]
      }
    });

    const result = await fetchPollTally(mockPollRanked, SupportedNetworks.MAINNET);

    const expectedResult = {
      parameters: mockPollRanked.parameters,
      winner: 3,
      victoryConditionMatched: 1,
      winningOptionName: 'Reject',
      totalMkrActiveParticipation: '300000000000000000000',
      totalMkrParticipation: '300000000000000000000',
      results: [
        {
          optionId: 1,
          optionName: 'Approve Existing Budget',
          firstPct: 33.6667,
          mkrSupport: '101000000000000000000',
          transferPct: 0,
          winner: false
        },

        {
          optionId: 2,
          optionName: 'Approve Increase',
          firstPct: 33.3333,
          mkrSupport: '100000000000000000000',
          transferPct: 0,
          winner: false
        },

        {
          optionId: 3,
          optionName: 'Reject',
          firstPct: 16.6667,
          mkrSupport: '50000000000000000000',
          transferPct: 0,
          winner: true
        },
        {
          optionId: 4,
          optionName: 'Fourth',
          firstPct: 16.3333,
          mkrSupport: '49000000000000000000',
          transferPct: 0,
          winner: false
        },
        {
          optionId: 0,
          optionName: 'Abstain',
          firstPct: 0,
          mkrSupport: '0',
          transferPct: 0,
          winner: false
        }
      ],
      numVoters: 4
    };

    expect(result).toEqual(expect.objectContaining(expectedResult));
  });

  it('ranked choice + majority when majority is  met', async () => {
    (gqlRequest as Mock).mockResolvedValueOnce({
      voteAddressMkrWeightsAtTime: {
        nodes: [
          {
            mkrSupport: '301',
            optionIdRaw: fromBuffer([1])
          },
          {
            mkrSupport: '100',
            optionIdRaw: fromBuffer([2].reverse())
          },
          {
            mkrSupport: '50',
            optionIdRaw: fromBuffer([3])
          },
          {
            mkrSupport: '49',
            optionIdRaw: fromBuffer([4].reverse())
          }
        ]
      }
    });

    const result = await fetchPollTally(mockPollRanked, SupportedNetworks.MAINNET);

    const expectedResult = {
      parameters: mockPollRanked.parameters,
      winner: 1,
      winningOptionName: 'Approve Existing Budget',
      totalMkrActiveParticipation: '500000000000000000000',
      totalMkrParticipation: '500000000000000000000',
      victoryConditionMatched: 0,
      rounds: 1,
      results: [
        {
          optionId: 1,
          eliminated: false,
          optionName: 'Approve Existing Budget',
          firstPct: 60.2,
          mkrSupport: '301000000000000000000',
          transferPct: 0,
          transfer: '0',
          winner: true
        },

        {
          optionId: 2,
          optionName: 'Approve Increase',
          firstPct: 20,
          mkrSupport: '100000000000000000000',
          transferPct: 0,
          transfer: '0',
          eliminated: false,
          winner: false
        },

        {
          optionId: 3,
          optionName: 'Reject',
          mkrSupport: '50000000000000000000',
          firstPct: 10,
          transferPct: 0,
          transfer: '0',
          eliminated: false,
          winner: false
        },
        {
          optionId: 4,
          optionName: 'Fourth',
          firstPct: 9.8,
          mkrSupport: '49000000000000000000',
          transferPct: 0,
          transfer: '0',
          eliminated: false,
          winner: false
        },
        {
          optionId: 0,
          optionName: 'Abstain',
          firstPct: 0,
          mkrSupport: '0',
          transferPct: 0,
          winner: false
        }
      ],
      numVoters: 4
    };

    expect(result).toEqual(expect.objectContaining(expectedResult));
  });

  const mockPollRankedComparison: Poll = {
    pollId: 1,
    options: {
      '0': 'Abstain',
      '1': 'Approve Existing Budget',
      '2': 'Approve Increase',
      '3': 'Reject',
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
          type: PollVictoryConditions.and,
          conditions: [
            {
              type: PollVictoryConditions.instantRunoff
            },
            {
              type: PollVictoryConditions.majority,
              percent: 50
            },
            {
              type: PollVictoryConditions.comparison,
              value: 3000,
              comparator: '>='
            }
          ]
        }
      ]
    }
  } as any as Poll;

  it('ranked choice + majority when majority is  met + comparison not met', async () => {
    (gqlRequest as Mock).mockResolvedValueOnce({
      voteAddressMkrWeightsAtTime: {
        nodes: [
          {
            mkrSupport: '301',
            optionIdRaw: fromBuffer([1])
          },
          {
            mkrSupport: '100',
            optionIdRaw: fromBuffer([2].reverse())
          },
          {
            mkrSupport: '50',
            optionIdRaw: fromBuffer([3])
          },
          {
            mkrSupport: '49',
            optionIdRaw: fromBuffer([4].reverse())
          }
        ]
      }
    });

    const result = await fetchPollTally(mockPollRankedComparison, SupportedNetworks.MAINNET);

    const expectedResult = {
      parameters: mockPollRankedComparison.parameters,
      winner: null,
      winningOptionName: 'None found',
      totalMkrActiveParticipation: '500000000000000000000',
      totalMkrParticipation: '500000000000000000000',
      victoryConditionMatched: null,
      results: [
        {
          optionId: 1,
          optionName: 'Approve Existing Budget',
          firstPct: 60.2,
          mkrSupport: '301000000000000000000',
          transferPct: 0,

          winner: false
        },

        {
          optionId: 2,
          optionName: 'Approve Increase',
          firstPct: 20,
          mkrSupport: '100000000000000000000',
          transferPct: 0,

          winner: false
        },

        {
          optionId: 3,
          optionName: 'Reject',
          mkrSupport: '50000000000000000000',
          firstPct: 10,
          transferPct: 0,

          winner: false
        },
        {
          optionId: 4,
          optionName: 'Fourth',
          firstPct: 9.8,
          mkrSupport: '49000000000000000000',
          transferPct: 0,

          winner: false
        },
        {
          optionId: 0,
          optionName: 'Abstain',
          firstPct: 0,
          mkrSupport: '0',
          transferPct: 0,
          winner: false
        }
      ],
      numVoters: 4
    };

    expect(result).toEqual(expect.objectContaining(expectedResult));
  });

  it('ranked choice + majority when majority is met + comparison met', async () => {
    (gqlRequest as Mock).mockResolvedValueOnce({
      voteAddressMkrWeightsAtTime: {
        nodes: [
          {
            mkrSupport: '3001',
            optionIdRaw: fromBuffer([1])
          },
          {
            mkrSupport: '100',
            optionIdRaw: fromBuffer([2].reverse())
          },
          {
            mkrSupport: '50',
            optionIdRaw: fromBuffer([3])
          },
          {
            mkrSupport: '49',
            optionIdRaw: fromBuffer([4].reverse())
          }
        ]
      }
    });

    const result = await fetchPollTally(mockPollRankedComparison, SupportedNetworks.MAINNET);

    const expectedResult = {
      parameters: mockPollRankedComparison.parameters,
      winner: 1,
      winningOptionName: 'Approve Existing Budget',
      totalMkrActiveParticipation: '3200000000000000000000',
      totalMkrParticipation: '3200000000000000000000',
      victoryConditionMatched: 0,
      rounds: 1,
      results: [
        {
          optionId: 1,
          eliminated: false,
          optionName: 'Approve Existing Budget',
          firstPct: 93.7813,
          mkrSupport: '3001000000000000000000',
          transferPct: 0,
          transfer: '0',
          winner: true
        },

        {
          optionId: 2,
          optionName: 'Approve Increase',
          firstPct: 3.125,
          mkrSupport: '100000000000000000000',
          transferPct: 0,
          transfer: '0',
          eliminated: false,
          winner: false
        },

        {
          optionId: 3,
          optionName: 'Reject',
          mkrSupport: '50000000000000000000',
          firstPct: 1.5625,
          transferPct: 0,
          transfer: '0',
          eliminated: false,
          winner: false
        },
        {
          optionId: 4,
          optionName: 'Fourth',
          firstPct: 1.5313,
          mkrSupport: '49000000000000000000',
          transferPct: 0,
          transfer: '0',
          eliminated: false,
          winner: false
        },
        {
          optionId: 0,
          optionName: 'Abstain',
          firstPct: 0,
          mkrSupport: '0',
          transferPct: 0,
          winner: false
        }
      ],
      numVoters: 4
    };

    expect(result).toEqual(expect.objectContaining(expectedResult));
  });
});
