/**
 * Fork a new tenderly testnet at the start of each test file and delete it at the end of the file. And set balances.
 * This file has to be imported in every e2e test file that you want it to run on.
 */
import { test } from '@playwright/test';
import { writeFile, readFile } from 'fs/promises';
import dotenv from 'dotenv';
import { parseEther, parseUnits, toHex } from 'viem';
import { TEST_ACCOUNTS } from './shared';
import { mockRpcCalls } from './mock-rpc-call';

dotenv.config();

const displayName = process.env.CI ? 'ci-tests-testnet' : 'local-tests-testnet';

test.beforeAll(async () => {
  await forkVnet(displayName);
  const address = TEST_ACCOUNTS.normal.address;
  await new Promise(resolve => setTimeout(resolve, 5000));
  await setEthBalance(address, '100');
  await setErc20Balance(address, '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2', '150001', 18); //fund MKR balance
});

test.beforeEach(async ({ page }) => {
  await page.route('https://virtual.mainnet.rpc.tenderly.co/**', mockRpcCalls);
});

// test.afterAll(async () => {
//   await deleteVnet();
// });

export const setEthBalance = async (address: string, amount: string) => {
  const file = await readFile('./tenderlyTestnetData.json', 'utf-8');
  const { TENDERLY_RPC_URL } = JSON.parse(file);
  const hexAmount = toHex(parseEther(amount)).replace(/^0x0/, '0x');
  const response = await fetch(TENDERLY_RPC_URL, {
    method: 'POST',
    headers: {
      accept: '*/*',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      method: 'tenderly_setBalance',
      params: [[address], hexAmount],
      id: 42,
      jsonrpc: '2.0'
    })
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  } else {
    console.log('ETH balance set');
  }
};

export const setErc20Balance = async (
  address: string,
  tokenAddress: string,
  amount: string,
  decimals = 18
) => {
  const file = await readFile('./tenderlyTestnetData.json', 'utf-8');
  const { TENDERLY_RPC_URL } = JSON.parse(file);

  const response = await fetch(TENDERLY_RPC_URL, {
    method: 'POST',
    headers: {
      accept: '*/*',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      method: 'tenderly_setErc20Balance',
      params: [tokenAddress, [address], toHex(parseUnits(amount, decimals))],
      id: 42,
      jsonrpc: '2.0'
    })
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  } else {
    console.log('token balance set');
  }
};

const forkVnet = async (displayName: string) => {
  if (!displayName.length) {
    throw new Error('A display name is required for the virtual testnet');
  }
  const res = await fetch(
    'https://api.tenderly.co/api/v1/account/jetstreamgg/project/jetstream/testnet/clone',
    {
      headers: [
        ['accept', 'application/json, text/plain, */*'],
        ['content-type', 'application/json'],
        ['X-Access-Key', `${process.env.TENDERLY_API_KEY}`]
      ],
      method: 'POST',
      body: JSON.stringify({
        srcContainerId: '67d03866-3483-455a-a001-7f9f69b1c5d4', //id e2e-testing-apr-15-fork_apr_29
        dstContainerDisplayName: displayName
      })
    }
  );

  const testnetData = await res.json();

  if (res.status !== 200) {
    console.error('There was an error while forking the virtual testnet:', testnetData);
    process.exit(1);
  }

  console.log('Virtual Testnet successfully forked');

  await writeFile(
    './tenderlyTestnetData.json',
    JSON.stringify({
      TENDERLY_TESTNET_ID: testnetData.id,
      TENDERLY_RPC_URL: testnetData.connectivityConfig.endpoints[0].uri
    })
  );
};

const deleteVnet = async () => {
  const file = await readFile('./tenderlyTestnetData.json', 'utf-8');
  const { TENDERLY_TESTNET_ID } = JSON.parse(file);

  const res = await fetch(
    `https://api.tenderly.co/api/v1/account/jetstreamgg/project/jetstream/testnet/container/${TENDERLY_TESTNET_ID}`,
    {
      headers: [['X-Access-Key', `${process.env.TENDERLY_API_KEY}`]],
      method: 'DELETE'
    }
  );

  if (res.status === 204) {
    console.log('Virtual Testnet successfully deleted');
  } else {
    console.log('There was an error while deleting the virtual testnet');
  }
};
