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

describe('Fetch tally approval', () => {
  const mockPoll: Poll = {
    pollId: 1,
    options: {
      '0': 'Abstain',
      '1': 'Approve Existing Budget',
      '2': 'Approve Increase',
      '3': 'Reject',
      '4': 'None of the above'
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
          type: PollVictoryConditions.approval
        }
      ]
    }
  } as any as Poll;

  it('gives first option as winner if it has most mkr', async () => {
    (gqlRequest as Mock).mockResolvedValueOnce({
      voteAddressMkrWeightsAtTime: {
        nodes: [
          {
            optionIdRaw: '258',
            mkrSupport: '820.2125800'
          },
          {
            optionIdRaw: '258',
            mkrSupport: '17.3630'
          },
          {
            optionIdRaw: '1',
            mkrSupport: '10'
          },
          {
            optionIdRaw: '4',
            mkrSupport: '14'
          },
          {
            optionIdRaw: '4',
            mkrSupport: '0'
          }
        ]
      }
    });

    const result = await fetchPollTally(mockPoll, SupportedNetworks.MAINNET);

    const expectedResult = {
      parameters: mockPoll.parameters,
      winner: 1,
      winningOptionName: 'Approve Existing Budget',
      totalMkrActiveParticipation: '861575580000000000000',
      totalMkrParticipation: '861575580000000000000',
      numVoters: 5,
      victoryConditionMatched: 0,
      results: [
        {
          optionId: 1,
          optionName: 'Approve Existing Budget',
          firstPct: 98.3751,
          mkrSupport: '847575580000000000000',
          transferPct: 0,
          winner: true
        },
        {
          optionId: 2,
          optionName: 'Approve Increase',
          firstPct: 97.2144,
          mkrSupport: '837575580000000000000',
          transferPct: 0,
          winner: false
        },
        {
          optionId: 4,
          optionName: 'None of the above',
          firstPct: 1.6249,
          mkrSupport: '14000000000000000000',
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
        },
        {
          optionId: 3,
          optionName: 'Reject',
          firstPct: 0,
          mkrSupport: '0',
          transferPct: 0,
          winner: false
        }
      ]
    };

    expect(result).toEqual(expect.objectContaining(expectedResult));
  });

  it('gives no option as winner if both have the same MKR voting weight', async () => {
    (gqlRequest as Mock).mockResolvedValueOnce({
      voteAddressMkrWeightsAtTime: {
        nodes: [
          {
            optionIdRaw: '258',
            mkrSupport: '820.2125800'
          },
          {
            optionIdRaw: '258',
            mkrSupport: '17.3630'
          },
          {
            optionIdRaw: '4',
            mkrSupport: '14'
          },
          {
            optionIdRaw: '4',
            mkrSupport: '0'
          }
        ]
      }
    });

    const result = await fetchPollTally(mockPoll, SupportedNetworks.MAINNET);

    const expectedResult = {
      parameters: mockPoll.parameters,
      winner: null,
      winningOptionName: 'None found',
      totalMkrActiveParticipation: '851575580000000000000',
      totalMkrParticipation: '851575580000000000000',
      numVoters: 4,
      victoryConditionMatched: null,
      results: [
        {
          optionId: 1,
          optionName: 'Approve Existing Budget',
          firstPct: 98.356,
          mkrSupport: '837575580000000000000',
          transferPct: 0,
          winner: false
        },
        {
          optionId: 2,
          optionName: 'Approve Increase',
          firstPct: 98.356,
          mkrSupport: '837575580000000000000',
          transferPct: 0,
          winner: false
        },
        {
          optionId: 4,
          optionName: 'None of the above',
          firstPct: 1.644,
          mkrSupport: '14000000000000000000',
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
        },
        {
          optionId: 3,
          optionName: 'Reject',
          firstPct: 0,
          mkrSupport: '0',
          transferPct: 0,
          winner: false
        }
      ]
    };

    expect(result).toEqual(expect.objectContaining(expectedResult));
  });

  it('Ignores abstain', async () => {
    (gqlRequest as Mock).mockResolvedValueOnce({
      voteAddressMkrWeightsAtTime: {
        nodes: [
          {
            optionIdRaw: '0',
            mkrSupport: '400'
          }
        ]
      }
    });

    const result = await fetchPollTally(mockPoll, SupportedNetworks.MAINNET);

    const expectedResult = {
      parameters: mockPoll.parameters,
      winner: null,
      winningOptionName: 'None found',
      totalMkrParticipation: '400000000000000000000',
      totalMkrActiveParticipation: '0',
      numVoters: 1,
      victoryConditionMatched: null,
      results: [
        {
          optionId: 0,
          optionName: 'Abstain',
          mkrSupport: '400000000000000000000',
          firstPct: 100,
          transferPct: 0,
          winner: false
        },
        {
          optionId: 1,
          optionName: 'Approve Existing Budget',
          mkrSupport: '0',
          firstPct: 0,
          transferPct: 0,
          winner: false
        },
        {
          optionId: 2,
          optionName: 'Approve Increase',
          mkrSupport: '0',
          firstPct: 0,
          transferPct: 0,
          winner: false
        },
        {
          optionId: 4,
          optionName: 'None of the above',
          firstPct: 0,
          mkrSupport: '0',
          transferPct: 0,
          winner: false
        },

        {
          optionId: 3,
          optionName: 'Reject',
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
