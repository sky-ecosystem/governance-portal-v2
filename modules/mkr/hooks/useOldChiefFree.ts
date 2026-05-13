/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { useAccount } from 'modules/app/hooks/useAccount';
import { WriteHook, WriteHookParams } from 'modules/web3/types/hooks';
import { useChainId } from 'wagmi';
import { useWriteContractFlow } from 'modules/web3/hooks/useWriteContractFlow';
import { chiefOldAbi, chiefOldAddress } from 'modules/contracts/generated';
import { voteProxyAbi } from 'modules/contracts/ethers/abis';

export const useOldChiefFree = ({
  mkrToWithdraw,
  gas,
  enabled: paramEnabled = true,
  onSuccess,
  onError,
  onStart
}: WriteHookParams & {
  mkrToWithdraw: bigint;
}): WriteHook => {
  const chainId = useChainId();
  const { voteProxyOldContractAddress } = useAccount();

  const commonParams = {
    chainId,
    enabled: paramEnabled,
    gas,
    onSuccess,
    onError,
    onStart
  } as const;

  const useWriteContractFlowResponseProxy = useWriteContractFlow({
    address: voteProxyOldContractAddress as `0x${string}` | undefined,
    abi: voteProxyAbi,
    functionName: 'freeAll',
    ...commonParams,
    enabled: commonParams.enabled && !!voteProxyOldContractAddress
  });

  const useWriteContractFlowResponseChief = useWriteContractFlow({
    address: chiefOldAddress[chainId],
    abi: chiefOldAbi,
    functionName: 'free',
    args: [mkrToWithdraw],
    ...commonParams,
    enabled: commonParams.enabled && !voteProxyOldContractAddress
  });

  return voteProxyOldContractAddress ? useWriteContractFlowResponseProxy : useWriteContractFlowResponseChief;
};
