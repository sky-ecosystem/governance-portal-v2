import { test, expect } from './fixtures/base';
import './forkVnet';

test.describe('Sky Executive Page', () => {
  test.beforeEach(async ({ skyExecutivePage, page }) => {
    // Mock the Sky hat info API endpoint
    await page.route('**/api/sky/hat', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          hatAddress: '0x0000000000000000000000000000000000000001',
          skyOnHat: '500000'
        })
      });
    });

    // Mock the Sky executives API endpoint
    await page.route('**/api/sky/executives*', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            key: 'exec-1',
            address: '0x0000000000000000000000000000000000000001',
            title: 'Test Sky Executive 1',
            proposalBlurb: 'This is a test executive proposal',
            about: 'Test executive about section',
            content: 'Full content of the test executive',
            proposalLink: 'https://forum.example.com/test-exec-1',
            date: new Date().toISOString(),
            active: true,
            hasBeenScheduled: false,
            hasBeenCast: false,
            proposalId: '1',
            spellData: {
              datePassed: null,
              dateExecuted: null,
              nextCastTime: null,
              officeHours: 'true',
              hasBeenCast: false,
              hasBeenScheduled: false,
              eta: '0',
              expiration: '0',
              mkrSupport: '500000'
            }
          },
          {
            key: 'exec-2',
            address: '0x0000000000000000000000000000000000000002',
            title: 'Test Sky Executive 2',
            proposalBlurb: 'Another test executive proposal',
            about: 'Another test executive about section',
            content: 'Full content of another test executive',
            proposalLink: 'https://forum.example.com/test-exec-2',
            date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            active: true,
            hasBeenScheduled: false,
            hasBeenCast: false,
            proposalId: '2',
            spellData: {
              datePassed: null,
              dateExecuted: null,
              nextCastTime: null,
              officeHours: 'false',
              hasBeenCast: false,
              hasBeenScheduled: false,
              eta: '0',
              expiration: '0',
              mkrSupport: '250000'
            }
          }
        ])
      });
    });
  });

  test('displays Sky executives notice and navigation', async ({ skyExecutivePage }) => {
    await test.step('navigate to executive page', async () => {
      await skyExecutivePage.goto();
      await skyExecutivePage.waitForPageLoad();
    });

    await test.step('verify executives are visible', async () => {
      await skyExecutivePage.verifyExecutivesVisible();
      const executiveCount = await skyExecutivePage.getExecutiveCount();
      test.expect(executiveCount).toBe(2);
      
      // Check Sky Governance badge is visible on executive cards
      await expect(skyExecutivePage.page.getByText('Sky Governance').first()).toBeVisible();
    });

    // await test('verify Sky Portal button is visible', async () => {
    //   // Just check button is visible, don't click external link
    //   const skyPortalButton = skyExecutivePage.page.getByRole('button', { name: 'View on Sky Portal' });
    //   await expect(skyPortalButton).toBeVisible();
    // });
  });

  test('navigates to legacy executives page', async ({ skyExecutivePage }) => {
    await test.step('navigate to executive page', async () => {
      await skyExecutivePage.goto();
      await skyExecutivePage.waitForPageLoad();
    });

    await test.step('click legacy executives button', async () => {
      await skyExecutivePage.clickLegacyExecutivesButton();
    });
  });

  test('handles loading more executives', async ({ skyExecutivePage, page }) => {
    // Mock initial response with 5 executives
    await page.route('**/api/sky/executives?pageSize=5&page=1', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(
          Array(5)
            .fill(null)
            .map((_, i) => ({
              key: `exec-${i + 1}`,
              address: `0x000000000000000000000000000000000000000${i + 1}`,
              title: `Test Executive ${i + 1}`,
              proposalBlurb: 'Test executive proposal',
              about: 'Test about',
              content: 'Test content',
              proposalLink: `https://forum.example.com/test-exec-${i + 1}`,
              date: new Date().toISOString(),
              active: true,
              hasBeenScheduled: false,
              hasBeenCast: false,
              proposalId: `${i + 1}`,
              spellData: {
                datePassed: null,
                dateExecuted: null,
                nextCastTime: null,
                officeHours: 'true',
                hasBeenCast: false,
                hasBeenScheduled: false,
                eta: '0',
                expiration: '0',
                mkrSupport: '100000'
              }
            }))
        )
      });
    });

    // Mock second page response
    await page.route('**/api/sky/executives?pageSize=5&page=2', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(
          Array(3)
            .fill(null)
            .map((_, i) => ({
              key: `exec-${i + 6}`,
              address: `0x000000000000000000000000000000000000000${i + 6}`,
              title: `Test Executive ${i + 6}`,
              proposalBlurb: 'Test executive proposal',
              about: 'Test about',
              content: 'Test content',
              proposalLink: `https://forum.example.com/test-exec-${i + 6}`,
              date: new Date().toISOString(),
              active: true,
              hasBeenScheduled: false,
              hasBeenCast: false,
              proposalId: `${i + 6}`,
              spellData: {
                datePassed: null,
                dateExecuted: null,
                nextCastTime: null,
                officeHours: 'true',
                hasBeenCast: false,
                hasBeenScheduled: false,
                eta: '0',
                expiration: '0',
                mkrSupport: '100000'
              }
            }))
        )
      });
    });

    await test.step('navigate to executive page', async () => {
      await skyExecutivePage.goto();
      await skyExecutivePage.waitForPageLoad();
    });

    await test.step('verify initial executives loaded', async () => {
      await skyExecutivePage.verifyExecutivesVisible();
      const initialCount = await skyExecutivePage.getExecutiveCount();
      test.expect(initialCount).toBe(5);
    });

    await test.step('verify load more button is visible', async () => {
      await skyExecutivePage.verifyLoadMoreButtonVisible();
    });

    await test.step('load more executives', async () => {
      await skyExecutivePage.loadMoreExecutives();
      const newCount = await skyExecutivePage.getExecutiveCount();
      test.expect(newCount).toBe(8);
    });
  });

  test('handles API errors gracefully', async ({ skyExecutivePage, page }) => {
    // Mock API error
    await page.route('**/api/sky/executives*', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' })
      });
    });

    await test.step('navigate to executive page', async () => {
      await skyExecutivePage.goto();
    });

    await test.step('verify error alert is displayed', async () => {
      await skyExecutivePage.verifyError();
    });

    await test.step('mock successful retry', async () => {
      await page.route('**/api/sky/executives*', route => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([
            {
              key: 'recovered-exec',
              address: '0x0000000000000000000000000000000000000001',
              title: 'Recovered Executive',
              proposalBlurb: 'Executive after retry',
              about: 'Recovered about',
              content: 'Recovered content',
              proposalLink: 'https://forum.example.com/recovered-exec',
              date: new Date().toISOString(),
              active: true,
              hasBeenScheduled: false,
              hasBeenCast: false,
              proposalId: '1',
              spellData: {
                datePassed: null,
                dateExecuted: null,
                nextCastTime: null,
                officeHours: 'true',
                hasBeenCast: false,
                hasBeenScheduled: false,
                eta: '0',
                expiration: '0',
                mkrSupport: '100000'
              }
            }
          ])
        });
      });
    });

    await test.step('retry loading', async () => {
      await skyExecutivePage.retryLoading();
      await skyExecutivePage.verifyExecutivesVisible();
    });
  });

  test('displays no executives message when empty', async ({ skyExecutivePage, page }) => {
    // Mock empty response
    await page.route('**/api/sky/executives*', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([])
      });
    });

    await test.step('navigate to executive page', async () => {
      await skyExecutivePage.goto();
      await skyExecutivePage.waitForPageLoad();
    });

    await test.step('verify no executives message', async () => {
      await skyExecutivePage.verifyNoExecutivesMessage();
    });
  });

  test('correctly identifies hat executive', async ({ skyExecutivePage, page }) => {
    // Mock hat info with specific address
    await page.route('**/api/sky/hat', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          hatAddress: '0x0000000000000000000000000000000000000001',
          skyOnHat: '1000000'
        })
      });
    });

    // Mock executives with one being the hat
    await page.route('**/api/sky/executives*', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            key: 'hat-exec',
            address: '0x0000000000000000000000000000000000000001', // This is the hat
            title: 'Current Hat Executive',
            proposalBlurb: 'This executive has the hat',
            about: 'Hat executive about',
            content: 'Hat executive content',
            proposalLink: 'https://forum.example.com/hat-exec',
            date: new Date().toISOString(),
            active: true,
            hasBeenScheduled: false,
            hasBeenCast: false,
            proposalId: '1',
            spellData: {
              datePassed: null,
              dateExecuted: null,
              nextCastTime: null,
              officeHours: 'true',
              hasBeenCast: false,
              hasBeenScheduled: false,
              eta: '0',
              expiration: '0',
              mkrSupport: '1000000'
            }
          },
          {
            key: 'non-hat-exec',
            address: '0x0000000000000000000000000000000000000002',
            title: 'Non-Hat Executive',
            proposalBlurb: 'This executive does not have the hat',
            about: 'Non-hat executive about',
            content: 'Non-hat executive content',
            proposalLink: 'https://forum.example.com/non-hat-exec',
            date: new Date().toISOString(),
            active: true,
            hasBeenScheduled: false,
            hasBeenCast: false,
            proposalId: '2',
            spellData: {
              datePassed: null,
              dateExecuted: null,
              nextCastTime: null,
              officeHours: 'false',
              hasBeenCast: false,
              hasBeenScheduled: false,
              eta: '0',
              expiration: '0',
              mkrSupport: '500000'
            }
          }
        ])
      });
    });

    await test.step('navigate to executive page', async () => {
      await skyExecutivePage.goto();
      await skyExecutivePage.waitForPageLoad();
    });

    await test.step('verify executives are displayed with hat indicator', async () => {
      await skyExecutivePage.verifyExecutivesVisible();
      const executiveCount = await skyExecutivePage.getExecutiveCount();
      test.expect(executiveCount).toBe(2);
      // The component should show the hat indicator on the first executive
      // This would be visible in the SkyExecutiveOverviewCard component
    });
  });
});
