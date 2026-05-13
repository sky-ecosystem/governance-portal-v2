/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { useChainId } from 'wagmi';
import { WriteHook, WriteHookParams } from 'modules/web3/types/hooks';
import { useWriteContractFlow } from 'modules/web3/hooks/useWriteContractFlow';
import { voteDelegateAbi } from 'modules/contracts/ethers/abis';

export const useDelegateFree = ({
  voteDelegateAddress,
  mkrToWithdraw,
  gas,
  enabled: paramEnabled = true,
  onSuccess,
  onError,
  onStart
}: WriteHookParams & {
  voteDelegateAddress: string;
  mkrToWithdraw: bigint;
}): WriteHook => {
  const chainId = useChainId();

  return useWriteContractFlow({
    address: voteDelegateAddress as `0x${string}`,
    abi: voteDelegateAbi,
    functionName: 'free',
    args: [mkrToWithdraw],
    chainId,
    enabled: paramEnabled,
    gas,
    onSuccess,
    onError,
    onStart
  });
};
