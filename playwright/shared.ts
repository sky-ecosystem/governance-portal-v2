import { Page } from '@playwright/test';

type TestAccount = {
  name: string;
  address: string;
};

enum TestAccountsEnum {
  normal = 'normal'
}

interface TestAccounts {
  [key: string]: TestAccount;
}

//this address is able to send transactions on the tenderly vnet via the wagmi mock
export const TEST_ACCOUNTS: TestAccounts = {
  [TestAccountsEnum.normal]: {
    name: 'Default test account',
    address: '0xdE70d75Bee022C0706C584042836a44ABc5bB863'
  }
};

export async function connectWallet(page: Page) {
  await page.getByRole('button', { name: 'Connect wallet' }).click();
  try {
    await page.waitForSelector('text="Connected with Mock"', { timeout: 2000 });
    await closeModal(page);
  } catch (error) {
    await page.getByTestId('select-wallet-mock').click();
  }
}

export function closeModal(page) {
  page.locator('[aria-label="close"]').click();
}
