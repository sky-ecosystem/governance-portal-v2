/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { useChainId } from 'wagmi';
import { WriteHook, WriteHookParams } from 'modules/web3/types/hooks';
import { useWriteContractFlow } from 'modules/web3/hooks/useWriteContractFlow';
import { voteDelegateAbi } from 'modules/contracts/ethers/abis';
import { config } from 'lib/config';

export const useDelegateLock = ({
  voteDelegateAddress,
  mkrToDeposit,
  gas,
  enabled: paramEnabled = true,
  onSuccess,
  onError,
  onStart
}: WriteHookParams & {
  voteDelegateAddress: string;
  mkrToDeposit: bigint;
}): WriteHook => {
  const chainId = useChainId();

  return useWriteContractFlow({
    address: voteDelegateAddress as `0x${string}`,
    abi: voteDelegateAbi,
    functionName: 'lock',
    args: [mkrToDeposit],
    chainId,
    enabled: paramEnabled && !config.READ_ONLY,
    gas,
    onSuccess,
    onError,
    onStart
  });
};
