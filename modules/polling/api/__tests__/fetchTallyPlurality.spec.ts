/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { PollInputFormat, PollResultDisplay, PollVictoryConditions } from 'modules/polling/polling.constants';
import { Poll } from 'modules/polling/types';
import { SupportedNetworks } from 'modules/web3/constants/networks';
import { gqlRequest } from '../../../../modules/gql/gqlRequest';
import { fetchPollTally } from '../fetchPollTally';
import { Mock, vi } from 'vitest';

vi.mock('modules/gql/gqlRequest');

describe('Fetch tally plurality', () => {
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
        type: PollInputFormat.singleChoice,
        abstain: [0],
        options: []
      },
      resultDisplay: PollResultDisplay.singleVoteBreakdown,
      victoryConditions: [
        {
          type: PollVictoryConditions.plurality
        }
      ]
    }
  } as any as Poll;

  it('gives expected results', async () => {
    (gqlRequest as Mock).mockResolvedValueOnce({
      voteAddressMkrWeightsAtTime: {
        nodes: [
          {
            optionIdRaw: '1',
            mkrSupport: '40'
          },
          {
            optionIdRaw: '1',
            mkrSupport: '60'
          },
          {
            optionIdRaw: '0',
            mkrSupport: '77'
          },
          {
            optionIdRaw: '0',
            mkrSupport: '32'
          },
          {
            optionIdRaw: '1',
            mkrSupport: '600'
          }
        ]
      }
    });

    const result = await fetchPollTally(mockPoll, SupportedNetworks.MAINNET);

    const expectedResult = {
      parameters: mockPoll.parameters,
      winner: 1,
      winningOptionName: 'First',
      totalMkrActiveParticipation: '700000000000000000000',
      totalMkrParticipation: '809000000000000000000',
      victoryConditionMatched: 0,
      numVoters: 5,
      results: [
        {
          optionId: 1,
          optionName: 'First',
          firstPct: 86.5266,
          mkrSupport: '700000000000000000000',
          transferPct: 0,
          winner: true
        },
        {
          optionId: 0,
          optionName: 'Abstain',
          firstPct: 13.4734,
          mkrSupport: '109000000000000000000',
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
        },
        {
          optionId: 2,
          optionName: 'Second',
          mkrSupport: '0',
          firstPct: 0,
          transferPct: 0,
          winner: false
        },
        {
          optionId: 3,
          optionName: 'Third',
          firstPct: 0,
          mkrSupport: '0',
          transferPct: 0,
          winner: false
        }
      ]
    };

    expect(result).toEqual(expect.objectContaining(expectedResult));
  });

  it('gives expected results for adjusted data', async () => {
    (gqlRequest as Mock).mockResolvedValueOnce({
      voteAddressMkrWeightsAtTime: {
        nodes: [
          {
            optionIdRaw: '1',
            mkrSupport: '40'
          },
          {
            optionIdRaw: '1',
            mkrSupport: '60'
          },
          {
            optionIdRaw: '0',
            mkrSupport: '77'
          },
          {
            optionIdRaw: '0',
            mkrSupport: '32'
          },
          {
            optionIdRaw: '1',
            mkrSupport: '600'
          },
          {
            optionIdRaw: '2',
            mkrSupport: '32'
          },
          {
            optionIdRaw: '2',
            mkrSupport: '1200'
          }
        ]
      }
    });

    const result = await fetchPollTally(mockPoll, SupportedNetworks.MAINNET);

    const expectedResult = {
      parameters: mockPoll.parameters,
      winner: 2,
      winningOptionName: 'Second',
      totalMkrActiveParticipation: '1932000000000000000000',
      totalMkrParticipation: '2041000000000000000000',
      victoryConditionMatched: 0,
      numVoters: 7,
      results: [
        {
          optionId: 2,
          optionName: 'Second',
          firstPct: 60.3626,
          mkrSupport: '1232000000000000000000',
          transferPct: 0,
          winner: true
        },
        {
          optionId: 1,
          optionName: 'First',
          firstPct: 34.2969,
          mkrSupport: '700000000000000000000',
          transferPct: 0,
          winner: false
        },
        {
          optionId: 0,
          optionName: 'Abstain',
          firstPct: 5.3405,
          mkrSupport: '109000000000000000000',
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
        },
        {
          optionId: 3,
          optionName: 'Third',
          firstPct: 0,
          mkrSupport: '0',
          transferPct: 0,
          winner: false
        }
      ]
    };

    expect(result).toEqual(expect.objectContaining(expectedResult));
  });

  it('parses correctly a plurality with no votes', async () => {
    (gqlRequest as Mock).mockResolvedValueOnce({
      voteAddressMkrWeightsAtTime: {
        nodes: []
      }
    });

    const result = await fetchPollTally(mockPoll, SupportedNetworks.MAINNET);

    const expectedResult = {
      parameters: mockPoll.parameters,
      winner: null,
      winningOptionName: 'None found',
      totalMkrParticipation: '0',
      victoryConditionMatched: null,
      totalMkrActiveParticipation: '0',
      numVoters: 0,
      results: [
        {
          optionId: 0,
          optionName: 'Abstain',
          mkrSupport: '0',
          firstPct: 0,
          transferPct: 0,
          winner: false
        },
        {
          optionId: 1,
          optionName: 'First',
          mkrSupport: '0',
          firstPct: 0,
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
        },
        {
          optionId: 2,
          optionName: 'Second',
          mkrSupport: '0',
          firstPct: 0,
          transferPct: 0,
          winner: false
        },

        {
          optionId: 3,
          optionName: 'Third',
          firstPct: 0,
          mkrSupport: '0',
          transferPct: 0,
          winner: false
        }
      ]
    };

    expect(result).toEqual(expect.objectContaining(expectedResult));
  });

  it('gives expected results for tally with abstain majority', async () => {
    (gqlRequest as Mock).mockResolvedValueOnce({
      voteAddressMkrWeightsAtTime: {
        nodes: [
          {
            optionIdRaw: '1',
            mkrSupport: '40'
          },
          {
            optionIdRaw: '1',
            mkrSupport: '60'
          },
          {
            optionIdRaw: '0',
            mkrSupport: '77'
          },
          {
            optionIdRaw: '0',
            mkrSupport: '32'
          },
          {
            optionIdRaw: '1',
            mkrSupport: '600'
          },
          {
            optionIdRaw: '2',
            mkrSupport: '32'
          },
          {
            optionIdRaw: '0',
            mkrSupport: '1200'
          }
        ]
      }
    });

    const result = await fetchPollTally(mockPoll, SupportedNetworks.MAINNET);

    const expectedResult = {
      parameters: mockPoll.parameters,
      winner: 1,
      winningOptionName: 'First',
      victoryConditionMatched: 0,
      totalMkrActiveParticipation: '732000000000000000000',
      totalMkrParticipation: '2041000000000000000000',
      numVoters: 7,
      results: [
        {
          optionId: 0,
          optionName: 'Abstain',
          firstPct: 64.1352,
          mkrSupport: '1309000000000000000000',
          transferPct: 0,
          winner: false
        },
        {
          optionId: 1,
          optionName: 'First',
          firstPct: 34.2969,
          mkrSupport: '700000000000000000000',
          transferPct: 0,
          winner: true
        },
        {
          optionId: 2,
          optionName: 'Second',
          firstPct: 1.5679,
          mkrSupport: '32000000000000000000',
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
        },
        {
          optionId: 3,
          optionName: 'Third',
          firstPct: 0,
          mkrSupport: '0',
          transferPct: 0,
          winner: false
        }
      ]
    };

    expect(result).toEqual(expect.objectContaining(expectedResult));
  });
});
