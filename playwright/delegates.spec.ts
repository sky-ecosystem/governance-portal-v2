import { expect, test } from './fixtures/base';
import { connectWallet } from './shared';
import './forkVnet';
import { delegateMkr } from './helpers/delegateMkr';

// the undelegate button won't show on e2e because the delegation needs to be indexed in the subgraph first
test.skip('delegate MKR', async ({ page, delegatePage }) => {
  await test.step('navigate to delegate page', async () => {
    await delegatePage.goto();
  });

  await test.step('connect wallet', async () => {
    await connectWallet(page);
  });

  // TODO: V2 delegates don't show up in tenderly e2e fork as contracts so their delegated amount doesn't show up
  // neither does the delegation actions work
  await test.step('sort delegates and check delegate button is disabled', async () => {
    await delegatePage.sortByHighestFirst();
    await delegatePage.verifyDelegateButtonIsDisabled();
  });

  await test.step('undelegate MKR', async () => {
    // Delegate MKR through an RPC call directly since it's not possible from the app
    const delegationSuccessful = await delegateMkr('2');
    expect(delegationSuccessful).toBe(true);

    await page.reload();
    await connectWallet(page);
    await delegatePage.sortByHighestFirst();
    await delegatePage.undelegate();
  });

  await test.step('undelegate all MKR', async () => {
    await delegatePage.undelegateAll();
  });
});
