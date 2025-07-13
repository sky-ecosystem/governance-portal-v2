import { expect, Page } from '@playwright/test';

export class SkyExecutivePage {
  readonly page: Page;

  // Locators
  private skyPortalButton: any;
  private legacyExecutivesButton: any;
  private noticeAlert: any;
  private executivesHeading: any;
  private executiveCard: any;
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
    this.skyPortalButton = this.page.getByRole('button', { name: 'View on Sky Portal' });
    this.legacyExecutivesButton = this.page.getByRole('button', { name: 'Legacy Executives' });
    this.noticeAlert = this.page.getByText('SKY is now the sole governance token of the Sky Protocol.');
    this.executivesHeading = this.page.getByRole('heading', {
      name: 'Executive Proposals'
    });
    this.executiveCard = this.page.locator('[data-testid="sky-executive-overview-card"]');
    this.loadMoreButton = this.page.getByRole('button', { name: 'Load More Executives' });
    this.errorAlert = this.page.locator('text=/Error loading Sky executives/');
    this.retryButton = this.page.getByRole('button', { name: 'Retry' });
    this.loadingSpinner = this.page.locator('[data-testid="loading-spinner"]');
    this.noDataText = this.page.getByText('No executives available from Sky governance.');
  }

  async goto() {
    await this.page.goto('/executive');
  }

  async waitForPageLoad() {
    await expect(this.executivesHeading).toBeVisible();
  }

  async verifyNoticeAlert() {
    await expect(this.noticeAlert).toBeVisible();
    await expect(this.noticeAlert).toContainText('SKY is now the sole governance token of the Sky Protocol.');
  }

  async clickLegacyExecutivesButton() {
    await this.legacyExecutivesButton.click();
    await expect(this.page).toHaveURL('/legacy-executive');
  }

  // async clickSkyPortalButton() {
  //   await this.skyPortalButton.click();
  // }

  async verifyExecutivesVisible() {
    await expect(this.executiveCard.first()).toBeVisible();
  }

  async getExecutiveCount() {
    return await this.executiveCard.count();
  }

  async loadMoreExecutives() {
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

  async verifyNoExecutivesMessage() {
    await expect(this.noDataText).toBeVisible();
  }

  async verifyLoadingState() {
    // Check if the load more button is disabled, which indicates loading
    await expect(this.loadMoreButton).toBeDisabled();
  }
}
