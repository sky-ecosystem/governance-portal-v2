/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { render, screen } from '@testing-library/react';
import mockVote from 'modules/polling/api/mocks/vote.json';
import { PollVoteHistoryItem } from 'modules/polling/components/PollVoteHistoryItem';
import { PollVoteHistory } from 'modules/polling/types/pollVoteHistory';
import { PollInputFormat, PollResultDisplay, PollVictoryConditions } from 'modules/polling/polling.constants';
import { usePollTally } from '../../hooks/usePollTally';
import { beforeAll, describe, expect, Mock, test, vi } from 'vitest';

vi.mock('../../hooks/usePollTally');

describe('Poll vote history item', () => {
  beforeAll(() => {
    (usePollTally as Mock).mockReturnValue({
      tally: {
        rounds: 1,
        winner: 1,
        totalMkrParticipation: '70288.579356787892861292',
        results: [
          {
            firstChoice: 2.001309,
            transfer: 0,
            winner: false,
            eliminated: false
          },
          {
            firstChoice: '70286.578047787892861292',
            transfer: 0,
            winner: true,
            eliminated: false
          }
        ],
        numVoters: 13
      },
      mutate: () => null
    });
  });

  test('renders plurality vote type correctly', async () => {
    const vote = {
      ...mockVote,
      poll: {
        ...mockVote.poll,
        endDate: new Date(mockVote.poll.endDate),
        startDate: new Date(mockVote.poll.startDate),
        parameters: {
          inputFormat: {
            type: PollInputFormat.singleChoice,
            options: [],
            abstain: [0]
          },
          resultDisplay: PollResultDisplay.singleVoteBreakdown,
          victoryConditions: [{ type: PollVictoryConditions.plurality }]
        }
      }
    };

    render(<PollVoteHistoryItem vote={vote as PollVoteHistory} />);

    // search page for query text
    await screen.findByText(/VOTED OPTION/);

    // look for discussion link
    // await screen.findByText(/Discussion/);
  });

  test('renders ranked choice vote type correctly', async () => {
    const vote = {
      ...mockVote,
      poll: {
        ...mockVote.poll,
        parameters: {
          inputFormat: {
            type: PollInputFormat.rankFree,
            options: [],
            abstain: [0]
          },
          resultDisplay: PollResultDisplay.instantRunoffBreakdown,
          victoryConditions: [
            {
              type: PollVictoryConditions.instantRunoff
            }
          ]
        }
      }
    };

    render(<PollVoteHistoryItem vote={vote as any as PollVoteHistory} />);

    // search page for query text
    await screen.findByText(/VOTED CHOICES/);

    // check plurality graphic doesn't exist
    const abstain = screen.queryByText(/Abstain/);
    expect(abstain).not.toBeInTheDocument();
  });
});
