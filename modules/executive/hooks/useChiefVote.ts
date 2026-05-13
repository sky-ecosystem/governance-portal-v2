/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { useChainId } from 'wagmi';
import { WriteHook, WriteHookParams } from 'modules/web3/types/hooks';
import { useWriteContractFlow } from 'modules/web3/hooks/useWriteContractFlow';
import { chiefAbi, chiefAddress } from 'modules/contracts/generated';
import { config } from 'lib/config';

export const useChiefVote = ({
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

  return useWriteContractFlow({
    address: chiefAddress[chainId],
    abi: chiefAbi,
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
