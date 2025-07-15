import { test, expect } from './fixtures/base';
import './forkVnet';

test.describe('Sky Poll Detail Page', () => {
  const mockPollDetail = {
    pollId: 1,
    title: 'Test Sky Poll Detail',
    summary: 'This is a test poll for the detail page',
    content: '<p>This is the detailed content of the poll</p>',
    slug: 'test-sky-poll-detail',
    multiHash: 'QmTestHash123',
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    options: { 
      '0': 'Abstain', 
      '1': 'Yes', 
      '2': 'No' 
    },
    type: 'plurality',
    url: 'https://github.com/makerdao/community/blob/master/governance/polls/test.md',
    discussionLink: 'https://forum.makerdao.com/t/test-poll/12345',
    tags: [
      {
        id: 'governance',
        shortname: 'governance',
        longname: 'Governance',
        description: 'Governance related polls',
        precedence: 1
      }
    ],
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
    },
    tally: {
      parameters: {
        inputFormat: {
          type: 'single-choice',
          abstain: [0],
          options: []
        },
        resultDisplay: 'single-vote-breakdown',
        victoryConditions: []
      },
      results: [
        {
          optionId: 0,
          winner: false,
          skySupport: '50000',
          optionName: 'Abstain',
          transfer: '0',
          firstPct: 10,
          transferPct: 0
        },
        {
          optionId: 1,
          winner: true,
          skySupport: '300000',
          optionName: 'Yes',
          transfer: '0',
          firstPct: 60,
          transferPct: 0
        },
        {
          optionId: 2,
          winner: false,
          skySupport: '150000',
          optionName: 'No',
          transfer: '0',
          firstPct: 30,
          transferPct: 0
        }
      ],
      totalSkyParticipation: '500000',
      totalSkyActiveParticipation: '500000',
      winner: 1,
      winningOptionName: 'Yes',
      numVoters: 125,
      votesByAddress: [
        {
          skySupport: '100000',
          ballot: [1],
          pollId: 1,
          voter: '0x1234567890123456789012345678901234567890',
          chainId: 1,
          blockTimestamp: new Date().toISOString(),
          hash: '0xabcdef'
        },
        {
          skySupport: '75000',
          ballot: [1],
          pollId: 1,
          voter: '0x2345678901234567890123456789012345678901',
          chainId: 1,
          blockTimestamp: new Date().toISOString(),
          hash: '0xbcdefg'
        }
      ]
    },
    ctx: {
      prev: { slug: 'previous-poll-slug' },
      next: { slug: 'next-poll-slug' }
    }
  };

  test.beforeEach(async ({ page }) => {
    // Mock the Sky poll detail API endpoint
    await page.route('**/api/sky/polls/test-sky-poll-detail', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockPollDetail)
      });
    });

    // Mock external Sky API for server-side rendering fallback
    await page.route('**/vote.sky.money/api/polling/test-sky-poll-detail', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockPollDetail)
      });
    });
  });

  test('displays poll detail page correctly', async ({ page }) => {
    await test.step('navigate to poll detail page', async () => {
      await page.goto('/polling/test-sky-poll-detail');
      await page.waitForLoadState('networkidle');
    });

    await test.step('verify page title and metadata', async () => {
      await expect(page).toHaveTitle(/Test Sky Poll Detail/);
      const heading = page.getByRole('heading', { name: 'Test Sky Poll Detail' });
      await expect(heading).toBeVisible();
    });

    await test.step('verify poll information is displayed', async () => {
      // Check poll ID and dates
      await expect(page.getByText(/Poll ID 1/)).toBeVisible();
      await expect(page.getByText(/Posted/)).toBeVisible();
      
      // Check tags
      await expect(page.getByText('governance')).toBeVisible();
      
      // Check external links
      await expect(page.getByRole('link', { name: 'Forum Discussion' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Review resources on GitHub' })).toBeVisible();
      
      // Check Sky Governance badge
      await expect(page.getByText('Sky Governance')).toBeVisible();
    });

    await test.step('verify read-only notice', async () => {
      const notice = page.getByText(/This is a Sky governance poll. Voting is only available on/);
      await expect(notice).toBeVisible();
      
      const skyLink = page.getByRole('link', { name: 'vote.sky.money' });
      await expect(skyLink).toBeVisible();
      await expect(skyLink).toHaveAttribute('href', 'https://vote.sky.money');
    });
  });

  test('displays vote breakdown tab correctly', async ({ page }) => {
    await test.step('navigate to poll detail page', async () => {
      await page.goto('/polling/test-sky-poll-detail');
      await page.waitForLoadState('networkidle');
    });

    await test.step('verify vote breakdown tab is default', async () => {
      const voteBreakdownTab = page.getByRole('tab', { name: 'Vote Breakdown' });
      await expect(voteBreakdownTab).toBeVisible();
      
      // Check voting stats
      await expect(page.getByText(/Total Voting Power/)).toBeVisible();
      await expect(page.getByText(/500,000 SKY/)).toBeVisible();
      await expect(page.getByText(/Total Votes/)).toBeVisible();
      await expect(page.getByText(/125/)).toBeVisible();
    });

    await test.step('verify voting results are displayed', async () => {
      // Check option results
      await expect(page.getByText('Yes (Winner)')).toBeVisible();
      await expect(page.getByText('No')).toBeVisible();
      await expect(page.getByText('Abstain')).toBeVisible();
      
      // Check percentages
      await expect(page.getByText(/60.0%/)).toBeVisible();
      await expect(page.getByText(/30.0%/)).toBeVisible();
      await expect(page.getByText(/10.0%/)).toBeVisible();
    });

    await test.step('verify votes by address section', async () => {
      const votesSection = page.getByText('Voting By Address');
      await expect(votesSection).toBeVisible();
      
      // Check that some voter addresses are displayed (truncated format)
      await expect(page.getByText(/0x1234.../)).toBeVisible();
      await expect(page.getByText(/0x2345.../)).toBeVisible();
    });
  });

  test('displays poll detail tab correctly', async ({ page }) => {
    await test.step('navigate to poll detail page', async () => {
      await page.goto('/polling/test-sky-poll-detail');
      await page.waitForLoadState('networkidle');
    });

    await test.step('switch to poll detail tab', async () => {
      const pollDetailTab = page.getByRole('tab', { name: 'Poll Detail' });
      await pollDetailTab.click();
    });

    await test.step('verify poll content is displayed', async () => {
      const pollDetailContent = page.locator('[data-testid="poll-detail"]');
      await expect(pollDetailContent).toBeVisible();
      await expect(pollDetailContent).toContainText('This is the detailed content of the poll');
    });
  });

  test('navigation controls work correctly', async ({ page }) => {
    await test.step('navigate to poll detail page', async () => {
      await page.goto('/polling/test-sky-poll-detail');
      await page.waitForLoadState('networkidle');
    });

    await test.step('verify back to all polls button', async () => {
      const backButton = page.getByRole('button', { name: /Back to All Polls/ });
      await expect(backButton).toBeVisible();
      
      // Mock the polling page
      await page.route('**/api/sky/polls*', route => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            polls: [],
            tags: [],
            stats: { active: 0, finished: 0, total: 0 },
            paginationInfo: { totalCount: 0, page: 1, numPages: 0, hasNextPage: false }
          })
        });
      });
      
      await backButton.click();
      await expect(page).toHaveURL('/polling');
    });
  });

  test('handles poll not found error', async ({ page }) => {
    await test.step('mock API to return 404', async () => {
      await page.route('**/api/sky/polls/non-existent-poll', route => {
        route.fulfill({
          status: 404,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Poll not found' })
        });
      });

      await page.route('**/vote.sky.money/api/polling/non-existent-poll', route => {
        route.fulfill({
          status: 404,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Poll not found' })
        });
      });
    });

    await test.step('navigate to non-existent poll', async () => {
      await page.goto('/polling/non-existent-poll');
      await page.waitForLoadState('networkidle');
    });

    await test.step('verify error page is displayed', async () => {
      await expect(page.getByText(/Poll either does not exist/)).toBeVisible();
    });
  });
});