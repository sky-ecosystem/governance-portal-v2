/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { useAccount } from 'modules/app/hooks/useAccount';
import { useChainId } from 'wagmi';
import { voteDelegateAbi } from 'modules/contracts/ethers/abis';
import { WriteHook, WriteHookParams } from 'modules/web3/types/hooks';
import { useWriteContractFlow } from 'modules/web3/hooks/useWriteContractFlow';
import { config } from 'lib/config';

export const useDelegateVote = ({
  slateOrProposals,
  gas,
  enabled: paramEnabled = true,
  onSuccess,
  onError,
  onStart
}: WriteHookParams & {
  slateOrProposals: `0x${string}` | `0x${string}`[];
}): WriteHook => {
  const chainId = useChainId();
  const { voteDelegateContractAddress } = useAccount();

  return useWriteContractFlow({
    address: voteDelegateContractAddress as `0x${string}` | undefined,
    abi: voteDelegateAbi,
    functionName: 'vote',
    args: [slateOrProposals],
    chainId,
    enabled: paramEnabled && !config.READ_ONLY,
    gas,
    onSuccess,
    onError,
    onStart
  });
};
