import { test as base } from '@playwright/test';
import { LegacyPollingPage } from './polling';
import { WalletPage } from './wallet';
import { LegacyExecutivePage } from './executive';
import { DelegatePage } from './delegate';
import { SkyPollingPage } from './sky-polling';
import { SkyExecutivePage } from './sky-executive';

type Fixtures = {
  pollingPage: LegacyPollingPage;
  walletPage: WalletPage;
  executivePage: LegacyExecutivePage;
  delegatePage: DelegatePage;
  skyPollingPage: SkyPollingPage;
  skyExecutivePage: SkyExecutivePage;
};

export const test = base.extend<Fixtures>({
  pollingPage: async ({ page }, use) => {
    await use(new LegacyPollingPage(page));
  },
  walletPage: async ({ page }, use) => {
    await use(new WalletPage(page));
  },
  executivePage: async ({ page }, use) => {
    await use(new LegacyExecutivePage(page));
  },
  delegatePage: async ({ page }, use) => {
    await use(new DelegatePage(page));
  },
  skyPollingPage: async ({ page }, use) => {
    await use(new SkyPollingPage(page));
  },
  skyExecutivePage: async ({ page }, use) => {
    await use(new SkyExecutivePage(page));
  }
});

export { expect } from '@playwright/test';
