/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { ZERO_ADDRESS } from 'modules/web3/constants/addresses';
import { voteProxyAbi } from 'modules/contracts/ethers/abis';
import { SupportedNetworks } from 'modules/web3/constants/networks';
import { networkNameToChainId } from 'modules/web3/helpers/chain';
import { cacheGet, cacheSet } from 'modules/cache/cache';
import { ONE_HOUR_IN_MS } from '../constants/time';
import { getPublicClient } from 'modules/web3/helpers/getPublicClient';
import { Abi } from 'viem';

export type VoteProxyAddresses = {
  hotAddress?: string;
  coldAddress?: string;
  voteProxyAddress?: string;
  hasProxy: boolean;
};

export const getVoteProxyAddresses = async (
  voteProxyFactory: `0x${string}`,
  voteProxyFactoryAbi: Abi,
  account: string,
  network: SupportedNetworks
): Promise<VoteProxyAddresses> => {
  let hotAddress,
    coldAddress,
    voteProxyAddress,
    hasProxy = false;

  const cacheKey = `proxy-info-${account}`;

  const cachedProxyInfo = await cacheGet(cacheKey, network);
  if (cachedProxyInfo) {
    return JSON.parse(cachedProxyInfo);
  }

  const chainId = networkNameToChainId(network);
  const publicClient = getPublicClient(chainId);

  // first check if account is a proxy contract
  try {
    // assume account is a proxy contrac
    // this will fail if vpContract is not an instance of vote proxy
    const [proxyAddressCold, proxyAddressHot] = await publicClient.multicall({
      contracts: [
        {
          address: account as `0x${string}`,
          abi: voteProxyAbi,
          functionName: 'cold'
        },
        {
          address: account as `0x${string}`,
          abi: voteProxyAbi,
          functionName: 'hot'
        }
      ],
      allowFailure: false
    });

    // if the calls above didn't fail, account is a proxy contract, so set values
    hotAddress = proxyAddressHot;
    coldAddress = proxyAddressCold;
    voteProxyAddress = account;
    hasProxy = true;
  } catch (err) {
    // if we're here, account is not a proxy contract
    // but no need to throw an error
  }

  // if account is not a proxy, check if it is a hot or cold address
  if (!hasProxy) {
    const [proxyAddressCold, proxyAddressHot] = await publicClient.multicall({
      contracts: [
        {
          address: voteProxyFactory,
          abi: voteProxyFactoryAbi,
          functionName: 'coldMap',
          args: [account]
        },
        {
          address: voteProxyFactory,
          abi: voteProxyFactoryAbi,
          functionName: 'hotMap',
          args: [account]
        }
      ],
      allowFailure: false
    });

    // if account belongs to a hot or cold map, get proxy contract address
    if (proxyAddressCold !== ZERO_ADDRESS) {
      voteProxyAddress = proxyAddressCold;
      coldAddress = account;
    } else if (proxyAddressHot !== ZERO_ADDRESS) {
      voteProxyAddress = proxyAddressHot;
      hotAddress = account;
    }

    // found proxy contract, now determine hot and cold addresses
    if (voteProxyAddress) {
      hotAddress =
        hotAddress ??
        (await publicClient.readContract({
          address: account as `0x${string}`,
          abi: voteProxyAbi,
          functionName: 'hot'
        }));
      coldAddress =
        coldAddress ??
        (await publicClient.readContract({
          address: account as `0x${string}`,
          abi: voteProxyAbi,
          functionName: 'cold'
        }));
      hasProxy = true;
    }
  }

  const proxyInfo = { hotAddress, coldAddress, voteProxyAddress, hasProxy };

  // cache for 60 mins
  cacheSet(cacheKey, JSON.stringify(proxyInfo), network, ONE_HOUR_IN_MS);

  // it's been a long journey through the proxy jungles, let's go home
  return proxyInfo;
};
