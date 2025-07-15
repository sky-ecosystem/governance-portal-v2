import { test, expect } from './fixtures/base';
import { SkyExecutiveDetailPage } from './fixtures/sky-executive-detail';
import './forkVnet';

test.describe('Sky Executive Detail Page', () => {
  const mockExecutiveDetail = {
    title: 'Test Sky Executive Detail',
    proposalBlurb: 'This is a test executive proposal for the detail page',
    key: 'test-sky-executive-detail',
    address: '0x1234567890123456789012345678901234567890',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    content: '<p>This is the detailed content of the executive proposal</p>',
    active: true,
    proposalLink: 'https://vote.sky.money/executive/test-sky-executive-detail',
    spellData: {
      hasBeenCast: false,
      hasBeenScheduled: true,
      nextCastTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      datePassed: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      dateExecuted: '',
      skySupport: '750000',
      executiveHash: '0xabcdef123456',
      officeHours: 'true'
    },
    supporters: [
      {
        address: '0x1234567890123456789012345678901234567890',
        skySupport: '250000',
        percentage: 33.33
      },
      {
        address: '0x2345678901234567890123456789012345678901',
        skySupport: '200000',
        percentage: 26.67
      },
      {
        address: '0x3456789012345678901234567890123456789012',
        skySupport: '150000',
        percentage: 20.00
      },
      {
        address: '0x4567890123456789012345678901234567890123',
        skySupport: '100000',
        percentage: 13.33
      },
      {
        address: '0x5678901234567890123456789012345678901234',
        skySupport: '50000',
        percentage: 6.67
      }
    ],
    ctx: {
      prev: { key: 'previous-executive-key' },
      next: { key: 'next-executive-key' }
    }
  };

  const mockGoverningExecutive = {
    ...mockExecutiveDetail,
    title: 'Test Governing Executive',
    key: 'test-governing-executive',
    spellData: {
      ...mockExecutiveDetail.spellData,
      hasBeenCast: true,
      hasBeenScheduled: true,
      dateExecuted: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
    }
  };

  test.beforeEach(async ({ page }) => {
    // Mock the Sky executive detail API endpoint
    await page.route('**/api/sky/executives/test-sky-executive-detail', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockExecutiveDetail)
      });
    });

    await page.route('**/api/sky/executives/test-governing-executive', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockGoverningExecutive)
      });
    });

    // Mock external Sky API for server-side rendering fallback
    await page.route('**/vote.sky.money/api/executive/test-sky-executive-detail', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockExecutiveDetail)
      });
    });

    await page.route('**/vote.sky.money/api/executive/test-governing-executive', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockGoverningExecutive)
      });
    });
  });

  test('displays executive detail page correctly', async ({ page }) => {
    const skyExecutiveDetailPage = new SkyExecutiveDetailPage(page);

    await test.step('navigate to executive detail page', async () => {
      await skyExecutiveDetailPage.goto('test-sky-executive-detail');
      await skyExecutiveDetailPage.waitForPageLoad();
    });

    await test.step('verify page title and metadata', async () => {
      await expect(page).toHaveTitle(/Test Sky Executive Detail/);
    });

    await test.step('verify executive information is displayed', async () => {
      await skyExecutiveDetailPage.verifyExecutiveInformation();
      
      // Check executive key and dates
      await expect(page.getByText(/Executive Key test-sky-executive-detail/)).toBeVisible();
      await expect(page.getByText(/Posted/)).toBeVisible();
      
      // Check spell address
      await expect(page.getByText(/0x1234567890123456789012345678901234567890/)).toBeVisible();
      
      // Check SKY support
      await expect(page.getByText(/750,000/)).toBeVisible();
      
      // Check supporters count
      await expect(page.getByText(/5/)).toBeVisible();
      
      // Check Sky Governance badge
      await expect(page.getByText('Sky Governance')).toBeVisible();
    });

    await test.step('verify external links', async () => {
      await skyExecutiveDetailPage.verifyExternalLinks();
    });

    await test.step('verify read-only notice', async () => {
      await skyExecutiveDetailPage.verifyReadOnlyNotice();
    });

    await test.step('verify executive status', async () => {
      await skyExecutiveDetailPage.verifyExecutiveStatus();
      await expect(page.getByText(/Scheduled/)).toBeVisible();
    });
  });

  test('displays supporters tab correctly', async ({ page }) => {
    const skyExecutiveDetailPage = new SkyExecutiveDetailPage(page);

    await test.step('navigate to executive detail page', async () => {
      await skyExecutiveDetailPage.goto('test-sky-executive-detail');
      await skyExecutiveDetailPage.waitForPageLoad();
    });

    await test.step('verify supporters tab is default', async () => {
      const supportersTab = page.getByRole('tab', { name: 'Supporters' });
      await expect(supportersTab).toBeVisible();
    });

    await test.step('verify supporters table is displayed', async () => {
      await skyExecutiveDetailPage.verifySupportersTab();
      
      // Check supporter addresses are displayed (truncated format)
      await expect(page.getByText(/0x1234.../)).toBeVisible();
      await expect(page.getByText(/0x2345.../)).toBeVisible();
      
      // Check SKY amounts
      await expect(page.getByText(/250,000 SKY/)).toBeVisible();
      await expect(page.getByText(/200,000 SKY/)).toBeVisible();
      
      // Check percentages
      await expect(page.getByText(/33.33%/)).toBeVisible();
      await expect(page.getByText(/26.67%/)).toBeVisible();
    });

    await test.step('verify summary stats', async () => {
      await skyExecutiveDetailPage.verifySummaryStats();
      await expect(page.getByText(/750,000 SKY/)).toBeVisible();
      await expect(page.getByText(/5/)).toBeVisible();
    });

    await test.step('verify sorting functionality', async () => {
      await skyExecutiveDetailPage.verifySorting();
    });
  });

  test('displays executive detail tab correctly', async ({ page }) => {
    const skyExecutiveDetailPage = new SkyExecutiveDetailPage(page);

    await test.step('navigate to executive detail page', async () => {
      await skyExecutiveDetailPage.goto('test-sky-executive-detail');
      await skyExecutiveDetailPage.waitForPageLoad();
    });

    await test.step('switch to executive detail tab', async () => {
      await skyExecutiveDetailPage.verifyExecutiveDetailTab();
    });

    await test.step('verify executive content is displayed', async () => {
      const executiveDetailContent = page.locator('[data-testid="executive-detail"]');
      await expect(executiveDetailContent).toBeVisible();
      await expect(executiveDetailContent).toContainText('This is the detailed content of the executive proposal');
    });
  });

  test('navigation controls work correctly', async ({ page }) => {
    const skyExecutiveDetailPage = new SkyExecutiveDetailPage(page);

    await test.step('navigate to executive detail page', async () => {
      await skyExecutiveDetailPage.goto('test-sky-executive-detail');
      await skyExecutiveDetailPage.waitForPageLoad();
    });

    await test.step('verify navigation controls', async () => {
      await skyExecutiveDetailPage.verifyNavigationControls();
    });

    await test.step('verify back to executives button', async () => {
      // Mock the executives page
      await page.route('**/api/sky/executives*', route => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([])
        });
      });
      
      await skyExecutiveDetailPage.clickBackToExecs();
    });

    await test.step('verify previous/next navigation', async () => {
      await skyExecutiveDetailPage.goto('test-sky-executive-detail');
      
      // Check if previous button exists and works
      const prevButton = page.getByRole('button', { name: /Previous/ });
      if (await prevButton.isVisible()) {
        await prevButton.click();
        await expect(page).toHaveURL(/\/executive\/previous-executive-key/);
      }
    });
  });

  test('displays governing proposal badge correctly', async ({ page }) => {
    const skyExecutiveDetailPage = new SkyExecutiveDetailPage(page);

    await test.step('navigate to governing executive detail page', async () => {
      await skyExecutiveDetailPage.goto('test-governing-executive');
      await skyExecutiveDetailPage.waitForPageLoad();
    });

    await test.step('verify governing proposal badge is displayed', async () => {
      await skyExecutiveDetailPage.verifyGoverningProposalBadge(true);
    });

    await test.step('verify executed status', async () => {
      await expect(page.getByText(/Executed/)).toBeVisible();
    });
  });

  test('handles executive not found error', async ({ page }) => {
    await test.step('mock API to return 404', async () => {
      await page.route('**/api/sky/executives/non-existent-executive', route => {
        route.fulfill({
          status: 404,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Executive not found' })
        });
      });

      await page.route('**/vote.sky.money/api/executive/non-existent-executive', route => {
        route.fulfill({
          status: 404,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Executive not found' })
        });
      });

      // Mock legacy executive API to also return 404
      await page.route('**/api/executive/non-existent-executive', route => {
        route.fulfill({
          status: 404,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Executive not found' })
        });
      });
    });

    await test.step('navigate to non-existent executive', async () => {
      await page.goto('/executive/non-existent-executive');
      await page.waitForLoadState('networkidle');
    });

    await test.step('verify error page is displayed', async () => {
      await expect(page.getByText(/Executive proposal either does not exist/)).toBeVisible();
    });
  });

  test('handles API errors gracefully', async ({ page }) => {
    await test.step('mock API to return 500 error', async () => {
      await page.route('**/api/sky/executives/error-executive', route => {
        route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Internal server error' })
        });
      });

      await page.route('**/vote.sky.money/api/executive/error-executive', route => {
        route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Internal server error' })
        });
      });

      await page.route('**/api/executive/error-executive', route => {
        route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Internal server error' })
        });
      });
    });

    await test.step('navigate to error executive', async () => {
      await page.goto('/executive/error-executive');
      await page.waitForLoadState('networkidle');
    });

    await test.step('verify error page is displayed', async () => {
      await expect(page.getByText(/Executive proposal either does not exist/)).toBeVisible();
    });
  });

  test('supporters table shows no supporters message when empty', async ({ page }) => {
    const emptyExecutive = {
      ...mockExecutiveDetail,
      key: 'empty-executive',
      supporters: []
    };

    await test.step('mock executive with no supporters', async () => {
      await page.route('**/api/sky/executives/empty-executive', route => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(emptyExecutive)
        });
      });
    });

    await test.step('navigate to executive with no supporters', async () => {
      await page.goto('/executive/empty-executive');
      await page.waitForLoadState('networkidle');
    });

    await test.step('verify no supporters message', async () => {
      await expect(page.getByText(/Currently there are no supporters/)).toBeVisible();
    });
  });
});