import { expect, Page } from '@playwright/test';

export class LegacyPollingPage {
  readonly page: Page;

  // Locators
  private pollHeading: any;
  private pollOverviewCard: any;
  private votingWeightText: any;

  constructor(page: Page) {
    this.page = page;
    this.initializeLocators();
  }

  private initializeLocators() {
    this.pollHeading = this.page.getByRole('heading', { name: /Active Polls|Ended Polls|Legacy Polls/ });
    this.pollOverviewCard = this.page.locator('[data-testid="poll-overview-card"]');
    this.votingWeightText = this.page.locator('[data-testid="voting-weight"]');
  }

  private getPollId(pollId: number) {
    return this.page.locator(`text=Poll ID ${pollId}`);
  }

  async goto() {
    await this.page.goto('/legacy-polling'); // Legacy polling page
  }

  async waitForPolls() {
    await expect(this.pollHeading).toBeVisible();
  }

  async verifyPollId(pollId: number) {
    await expect(this.getPollId(pollId)).toBeVisible();
  }

  async verifyPollingIsReadOnly() {
    // Verify that polls are visible but no voting functionality is present
    await expect(this.pollOverviewCard.first()).toBeVisible();
    // Verify that ballot-related elements are not present
    await expect(this.page.locator('[data-testid="button-add-vote-to-ballot"]')).not.toBeVisible();
    await expect(this.page.locator('text=Review & Submit Your Ballot')).not.toBeVisible();
  }
}
