/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { SupportedNetworks } from 'modules/web3/constants/networks';
import { networkNameToChainId } from 'modules/web3/helpers/chain';
import { getPublicClient } from 'modules/web3/helpers/getPublicClient';
import { chiefAddress, mkrAbi, mkrAddress } from 'modules/contracts/generated';

export async function fetchMkrInChief(network?: SupportedNetworks): Promise<bigint> {
  const chainId = network ? networkNameToChainId(network) : networkNameToChainId(SupportedNetworks.MAINNET);
  const publicClient = getPublicClient(chainId);

  const mkrInChief = await publicClient.readContract({
    address: mkrAddress[chainId],
    abi: mkrAbi,
    functionName: 'balanceOf',
    args: [chiefAddress[chainId]]
  });

  return mkrInChief;
}
