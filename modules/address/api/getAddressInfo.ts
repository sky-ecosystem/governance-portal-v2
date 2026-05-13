/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { SupportedNetworks } from 'modules/web3/constants/networks';
import { fetchDelegate } from 'modules/delegates/api/fetchDelegates';
import { AddressApiResponse } from '../types/addressApiResponse';
import { networkNameToChainId } from 'modules/web3/helpers/chain';
import { getVoteProxyAddresses } from 'modules/app/helpers/getVoteProxyAddresses';
import { getAddressDetailCacheKey } from 'modules/cache/constants/cache-keys';
import { cacheGet, cacheSet } from 'modules/cache/cache';
import { TEN_MINUTES_IN_MS } from 'modules/app/constants/time';
import { getDelegateContractAddress } from 'modules/delegates/helpers/getDelegateContractAddress';
import { voteProxyFactoryAbi, voteProxyFactoryAddress } from 'modules/contracts/generated';

export async function getAddressInfo(
  address: string,
  network: SupportedNetworks
): Promise<AddressApiResponse> {
  const cacheKey = getAddressDetailCacheKey(address);
  const cachedAddressInfo = await cacheGet(cacheKey, network);
  if (cachedAddressInfo) {
    return JSON.parse(cachedAddressInfo);
  }

  const chainId = networkNameToChainId(network);

  // Find the voty proxy for the address (in case there's one)
  const voteProxyAddress = await getVoteProxyAddresses(
    voteProxyFactoryAddress[chainId],
    voteProxyFactoryAbi,
    address,
    network
  );

  // Return the delegate if the address corresponds to a delegate contract
  const delegate = await fetchDelegate(address, network);

  // Find the delegate contract address if the address is a normal wallet
  const voteDelegateAdress = await getDelegateContractAddress(address, chainId);

  const response: AddressApiResponse = {
    isDelegate: !!delegate,
    isProxyContract: !!voteProxyAddress.hotAddress,
    voteProxyInfo: voteProxyAddress,
    delegateInfo: delegate,
    address,
    voteDelegateAdress
  };

  cacheSet(cacheKey, JSON.stringify(response), network, TEN_MINUTES_IN_MS);

  return response;
}
