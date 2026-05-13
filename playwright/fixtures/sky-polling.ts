import { expect, Page } from '@playwright/test';

export class SkyPollingPage {
  readonly page: Page;

  // Locators
  private viewDetailsButton: any;
  private legacyPollsButton: any;
  private noticeAlert: any;
  private pollsHeading: any;
  private pollCard: any;
  private loadMoreButton: any;
  private errorAlert: any;
  private retryButton: any;
  private loadingSpinner: any;
  private noDataText: any;

  constructor(page: Page) {
    this.page = page;
    this.initializeLocators();
  }

  private initializeLocators() {
    this.viewDetailsButton = this.page.getByRole('button', { name: 'View Details' });
    this.legacyPollsButton = this.page.getByRole('button', { name: 'Legacy Polls' });
    this.noticeAlert = this.page.getByText('SKY is now the sole governance token of the Sky Protocol.');
    this.pollsHeading = this.page.getByRole('heading', { name: 'Polls' });
    this.pollCard = this.page.locator('[data-testid="sky-poll-overview-card"]');
    this.loadMoreButton = this.page.getByRole('button', { name: 'Load More Polls' });
    this.errorAlert = this.page.locator('text=/Error loading Sky polls/');
    this.retryButton = this.page.getByRole('button', { name: 'Retry' });
    this.loadingSpinner = this.page.locator('[data-testid="loading-spinner"]');
    this.noDataText = this.page.getByText('No polls available from Sky governance.');
  }

  async goto() {
    await this.page.goto('/polling');
  }

  async waitForPageLoad() {
    await expect(this.pollsHeading).toBeVisible();
  }

  async verifyNoticeAlert() {
    await expect(this.noticeAlert).toBeVisible();
    await expect(this.noticeAlert).toContainText('SKY is now the sole governance token of the Sky Protocol.');
  }

  async clickLegacyPollsButton() {
    await this.legacyPollsButton.click();
    await expect(this.page).toHaveURL('/legacy-polling');
  }

  async clickViewDetailsButton() {
    await this.viewDetailsButton.first().click();
    // Should navigate to local poll detail page
    await expect(this.page).toHaveURL(/\/polling\/[a-zA-Z0-9-]+/);
  }

  async verifyPollsVisible() {
    await expect(this.pollCard.first()).toBeVisible();
  }

  async getPollCount() {
    return await this.pollCard.count();
  }

  async loadMorePolls() {
    await this.loadMoreButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyLoadMoreButtonVisible() {
    await expect(this.loadMoreButton).toBeVisible();
  }

  async verifyLoadMoreButtonDisabled() {
    await expect(this.loadMoreButton).toBeDisabled();
  }

  async verifyError() {
    await expect(this.errorAlert).toBeVisible();
  }

  async retryLoading() {
    await this.retryButton.click();
  }

  async verifyNoPollsMessage() {
    await expect(this.noDataText).toBeVisible();
  }

  async verifyLoadingState() {
    // Check if the load more button is disabled, which indicates loading
    await expect(this.loadMoreButton).toBeDisabled();
  }
}
