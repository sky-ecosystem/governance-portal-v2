import { expect, Page } from '@playwright/test';

export class SkyExecutiveDetailPage {
  readonly page: Page;

  // Locators
  private backToExecsButton: any;
  private previousExecButton: any;
  private nextExecButton: any;
  private executiveTitle: any;
  private executiveBlurb: any;
  private skyPortalLink: any;
  private spellAddress: any;
  private skySupport: any;
  private supportersCount: any;
  private supportersTab: any;
  private executiveDetailTab: any;
  private supportersTable: any;
  private supporterAddress: any;
  private skyAmountColumn: any;
  private percentageColumn: any;
  private showAllSupportersButton: any;
  private sortBySkyButton: any;
  private sortByPercentageButton: any;
  private executiveStatus: any;
  private totalSkySupport: any;
  private totalSupporters: any;
  private readOnlyNotice: any;
  private skyVotingLink: any;
  private executiveContent: any;
  private governingProposalBadge: any;

  constructor(page: Page) {
    this.page = page;
    this.initializeLocators();
  }

  private initializeLocators() {
    this.backToExecsButton = this.page.getByRole('button', { name: /Back to Execs/ });
    this.previousExecButton = this.page.getByRole('button', { name: /Previous/ });
    this.nextExecButton = this.page.getByRole('button', { name: /Next/ });
    this.executiveTitle = this.page.getByRole('heading', { level: 1 });
    this.executiveBlurb = this.page.getByText(/This is a test executive/);
    this.skyPortalLink = this.page.getByRole('link', { name: 'View on Sky Portal' });
    this.spellAddress = this.page.getByText(/Spell Address/);
    this.skySupport = this.page.getByText(/SKY Support/);
    this.supportersCount = this.page.getByText(/Supporters/);
    this.supportersTab = this.page.getByRole('tab', { name: 'Supporters' });
    this.executiveDetailTab = this.page.getByRole('tab', { name: 'Executive Detail' });
    this.supportersTable = this.page.locator('[data-testid="supporters-table"]');
    this.supporterAddress = this.page.locator('text=/0x[a-fA-F0-9]{4}\.\.\./');
    this.skyAmountColumn = this.page.locator('text=/SKY$/');
    this.percentageColumn = this.page.locator('text=/%$/');
    this.showAllSupportersButton = this.page.getByRole('button', { name: /Show all.*supporters/ });
    this.sortBySkyButton = this.page.getByRole('button', { name: 'SKY Support' });
    this.sortByPercentageButton = this.page.getByRole('button', { name: 'Percentage' });
    this.executiveStatus = this.page.locator('[data-testid="sky-executive-status"]');
    this.totalSkySupport = this.page.getByText(/Total SKY Support/);
    this.totalSupporters = this.page.getByText(/Total Supporters/);
    this.readOnlyNotice = this.page.getByText(/This is a Sky governance executive/);
    this.skyVotingLink = this.page.getByRole('link', { name: 'vote.sky.money' });
    this.executiveContent = this.page.locator('[data-testid="executive-detail"]');
    this.governingProposalBadge = this.page.getByText('Governing Proposal');
  }

  async goto(executiveKey: string) {
    await this.page.goto(`/executive/${executiveKey}`);
    await this.page.waitForLoadState('networkidle');
  }

  async waitForPageLoad() {
    await expect(this.executiveTitle).toBeVisible();
  }

  async verifyExecutiveInformation() {
    await expect(this.executiveTitle).toBeVisible();
    await expect(this.executiveBlurb).toBeVisible();
    await expect(this.spellAddress).toBeVisible();
    await expect(this.skySupport).toBeVisible();
    await expect(this.supportersCount).toBeVisible();
  }

  async verifyExternalLinks() {
    await expect(this.skyPortalLink).toBeVisible();
    await expect(this.skyPortalLink).toHaveAttribute('href', /vote\.sky\.money/);
  }

  async verifySupportersTab() {
    await this.supportersTab.click();
    await expect(this.supportersTable).toBeVisible();
    await expect(this.supporterAddress.first()).toBeVisible();
    await expect(this.skyAmountColumn.first()).toBeVisible();
    await expect(this.percentageColumn.first()).toBeVisible();
  }

  async verifyExecutiveDetailTab() {
    await this.executiveDetailTab.click();
    await expect(this.executiveContent).toBeVisible();
  }

  async verifySorting() {
    // Test SKY Support sorting
    await this.sortBySkyButton.click();
    await this.page.waitForTimeout(500); // Allow sorting to complete
    
    // Test Percentage sorting
    await this.sortByPercentageButton.click();
    await this.page.waitForTimeout(500); // Allow sorting to complete
  }

  async verifyShowAllSupporters() {
    const initialCount = await this.supporterAddress.count();
    await this.showAllSupportersButton.click();
    await this.page.waitForTimeout(500);
    const newCount = await this.supporterAddress.count();
    expect(newCount).toBeGreaterThanOrEqual(initialCount);
  }

  async verifyNavigationControls() {
    await expect(this.backToExecsButton).toBeVisible();
    // Previous/Next buttons may not always be visible depending on context
  }

  async clickBackToExecs() {
    await this.backToExecsButton.click();
    await expect(this.page).toHaveURL('/executive');
  }

  async verifyExecutiveStatus() {
    await expect(this.executiveStatus).toBeVisible();
  }

  async verifyReadOnlyNotice() {
    await expect(this.readOnlyNotice).toBeVisible();
    await expect(this.skyVotingLink).toBeVisible();
    await expect(this.skyVotingLink).toHaveAttribute('href', 'https://vote.sky.money');
  }

  async verifyGoverningProposalBadge(shouldBeVisible: boolean = false) {
    if (shouldBeVisible) {
      await expect(this.governingProposalBadge).toBeVisible();
    }
  }

  async verifySummaryStats() {
    await expect(this.totalSkySupport).toBeVisible();
    await expect(this.totalSupporters).toBeVisible();
  }
}