import { readFile } from 'fs/promises';
import { TEST_ACCOUNTS } from '../shared';
import { encodeFunctionData, parseUnits } from 'viem';
import { voteDelegateAbi } from '../../modules/contracts/ethers/abis';
import { mkrAbi, mkrAddress } from '../../modules/contracts/generated';
import { SupportedChainId } from '../../modules/web3/constants/chainID';

const TEST_DELEGATE_CONTRACT = '0xc1a1bdb7d60b7cb3920787a15a2b583786c52fb6';

export async function delegateMkr(amount: string) {
  const file = await readFile('./tenderlyTestnetData.json', 'utf-8');
  const { TENDERLY_RPC_URL } = JSON.parse(file);

  const approvalResponse = await fetch(TENDERLY_RPC_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 0,
      method: 'eth_sendTransaction',
      params: [
        {
          from: TEST_ACCOUNTS.normal.address,
          to: mkrAddress[SupportedChainId.TENDERLY],
          gas: '0x7A1200',
          gasPrice: '0x0',
          value: '0x0',
          data: encodeFunctionData({
            abi: mkrAbi,
            functionName: 'approve',
            args: [TEST_DELEGATE_CONTRACT]
          })
        }
      ]
    })
  });

  if (!approvalResponse.ok) {
    throw new Error(`Error approving MKR contract: ${approvalResponse.statusText}`);
  }

  const response = await fetch(TENDERLY_RPC_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'eth_sendTransaction',
      params: [
        {
          from: TEST_ACCOUNTS.normal.address,
          to: TEST_DELEGATE_CONTRACT,
          gas: '0x7A1200',
          gasPrice: '0x0',
          value: '0x0',
          data: encodeFunctionData({
            abi: voteDelegateAbi,
            functionName: 'lock',
            args: [parseUnits(amount, 18)]
          })
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`Error delegating MKR to test delegate: ${response.statusText}`);
  }

  // Mine a block to confirm the transaction
  const blockMineResponse = await fetch(TENDERLY_RPC_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 2,
      method: 'evm_mine',
      params: []
    })
  });

  if (!blockMineResponse.ok) {
    throw new Error(`Error mining block: ${blockMineResponse.statusText}`);
  }

  console.log('Successfully delegated MKR to test delegate');
  return response.ok;
}
