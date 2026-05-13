/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { useChainId } from 'wagmi';
import { useWriteContractFlow } from 'modules/web3/hooks/useWriteContractFlow';
import { chiefAbi, chiefAddress } from 'modules/contracts/generated';
import { WriteHook, WriteHookParams } from 'modules/web3/types/hooks';
import { useAccount } from 'modules/app/hooks/useAccount';
import { voteProxyAbi } from 'modules/contracts/ethers/abis';

export const useFree = ({
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
  const { voteProxyContractAddress } = useAccount();

  const commonParams = {
    functionName: 'free',
    args: [mkrToWithdraw],
    chainId,
    enabled: paramEnabled,
    gas,
    onSuccess,
    onError,
    onStart
  } as const;

  const useWriteContractFlowResponseProxy = useWriteContractFlow({
    address: voteProxyContractAddress as `0x${string}` | undefined,
    abi: voteProxyAbi,
    ...commonParams,
    enabled: commonParams.enabled && !!voteProxyContractAddress
  });

  const useWriteContractFlowResponseChief = useWriteContractFlow({
    address: chiefAddress[chainId],
    abi: chiefAbi,
    ...commonParams,
    enabled: commonParams.enabled && !voteProxyContractAddress
  });

  return voteProxyContractAddress ? useWriteContractFlowResponseProxy : useWriteContractFlowResponseChief;
};
