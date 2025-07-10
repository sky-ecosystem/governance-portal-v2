import { test } from './fixtures/base';
import { connectWallet } from './shared';
import {
  PollInputFormat,
  PollResultDisplay,
  PollVictoryConditions
} from '../modules/polling/polling.constants';
import './forkVnet';

test.beforeEach(async ({ page }) => {
  // Mock polling precheck API
  await page.route('api/polling/precheck*', route => {
    route.fulfill({
      status: 201,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      contentType: 'application/json',
      body: JSON.stringify({
        recentlyUsedGaslessVoting: null,
        hasMkrRequired: true,
        alreadyVoted: false,
        relayBalance: '0.99766447864494'
      })
    });
  });

  // Mock polling tally API
  await page.route('**/api/polling/tally/*', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        totalMkrParticipation: '150000',
        totalMkrActiveParticipation: '150000',
        winner: 1,
        winningOptionName: 'Yes',
        victoryConditionMatched: 0,
        numVoters: 1,
        results: [
          {
            optionId: 0,
            optionName: 'No',
            mkrSupport: '50000',
            winner: false,
            firstPct: 33.33,
            transferPct: 0
          },
          {
            optionId: 1,
            optionName: 'Yes',
            mkrSupport: '100000',
            winner: true,
            firstPct: 66.67,
            transferPct: 0
          }
        ],
        votesByAddress: [],
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
      })
    });
  });

  // Mock v1 all-polls API with any query parameters
  await page.route('**/api/polling/v1/all-polls**', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        polls: [
          {
            pollId: 1,
            slug: 'test-poll-1',
            title: 'Test Legacy Poll 1',
            summary: 'This is a test legacy poll',
            options: {
              '0': 'No',
              '1': 'Yes'
            },
            startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            content: 'Test poll content',
            discussionLink: 'https://forum.example.com/test-poll-1',
            type: 'plurality',
            tags: ['governance'],
            active: true,
            parameters: {
              inputFormat: {
                type: 'single-choice',
                abstain: [0],
                options: []
              },
              victoryConditions: [
                {
                  type: 'plurality'
                }
              ],
              resultDisplay: 'single-vote-breakdown'
            }
          }
        ]
      })
    });
  });

  // Mock v2 all-polls API with any query parameters
  await page.route('**/api/polling/v2/all-polls**', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        polls: [
          {
            pollId: 1,
            slug: 'test-poll-1',
            title: 'Test Legacy Poll 1',
            summary: 'This is a test legacy poll',
            options: {
              '0': 'No',
              '1': 'Yes'
            },
            startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            content: 'Test poll content',
            discussionLink: 'https://forum.example.com/test-poll-1',
            type: 'plurality',
            tags: ['governance'],
            active: true,
            parameters: {
              inputFormat: {
                type: 'single-choice',
                abstain: [0],
                options: []
              },
              victoryConditions: [
                {
                  type: 'plurality'
                }
              ],
              resultDisplay: 'single-vote-breakdown'
            }
          }
        ],
        tags: [],
        stats: {
          active: 1,
          finished: 0,
          total: 1
        },
        paginationInfo: {
          totalCount: 1,
          page: 1,
          numPages: 1,
          hasNextPage: false
        }
      })
    });
  });

  // Mock individual poll endpoint
  await page.route('**/api/polling/*', route => {
    // Skip if it's already handled by other routes
    if (
      route.request().url().includes('/tally/') ||
      route.request().url().includes('/all-polls') ||
      route.request().url().includes('/precheck')
    ) {
      route.continue();
      return;
    }

    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        pollId: 1,
        slug: 'test-poll-1',
        title: 'Test Legacy Poll 1',
        summary: 'This is a test legacy poll',
        options: {
          '0': 'No',
          '1': 'Yes'
        },
        startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        content: 'Test poll content',
        discussionLink: 'https://forum.example.com/test-poll-1',
        type: 'plurality',
        tags: ['governance'],
        active: true,
        parameters: {
          inputFormat: {
            type: 'single-choice',
            abstain: [0],
            options: []
          },
          victoryConditions: [
            {
              type: 'plurality'
            }
          ],
          resultDisplay: 'single-vote-breakdown'
        }
      })
    });
  });

  // Mock active poll IDs endpoint
  await page.route('**/api/polling/v2/active-poll-ids**', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        activePollIds: [1]
      })
    });
  });
});

test('Can see legacy polls, but cannot vote on them', async ({ page, pollingPage }) => {
  await test.step('navigate to legacy polling page', async () => {
    await pollingPage.goto();
    await pollingPage.waitForPolls();
  });

  await test.step('connect wallet', async () => {
    await connectWallet(page);
  });

  await test.step('verify voting weight', async () => {
    await pollingPage.verifyVotingWeight('150,001 MKR');
  });

  await test.step('select poll choice but cannot add to ballot', async () => {
    await pollingPage.selectChoice('Yes');
    await pollingPage.verifyAddToBallotDisabled();
  });

  await test.step('review ballot button is disabled', async () => {
    await pollingPage.verifyReviewBallotDisabled();
  });
});
