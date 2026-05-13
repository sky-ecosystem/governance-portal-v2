/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { getVoteProxyAddresses } from 'modules/app/helpers/getVoteProxyAddresses';
import {
  chiefAbi,
  chiefAddress,
  mkrAbi,
  mkrAddress,
  voteProxyFactoryAbi,
  voteProxyFactoryAddress
} from 'modules/contracts/generated';
import { getDelegateContractAddress } from 'modules/delegates/helpers/getDelegateContractAddress';
import { SupportedNetworks } from 'modules/web3/constants/networks';
import { networkNameToChainId } from 'modules/web3/helpers/chain';
import { getPublicClient } from 'modules/web3/helpers/getPublicClient';

export type MKRVotingWeightResponse = {
  walletBalanceHot: bigint;
  walletBalanceCold?: bigint;
  chiefBalanceHot: bigint;
  chiefBalanceCold?: bigint;
  chiefBalanceProxy?: bigint;
  chiefTotal: bigint;
  total: bigint;
};

const getMKRBalanceOfParams = (chainId: number, address: string) => {
  return {
    address: mkrAddress[chainId],
    abi: mkrAbi,
    functionName: 'balanceOf',
    args: [address as `0x${string}`]
  } as const;
};

const getChiefDepositsParams = (chainId: number, address: string) => {
  return {
    address: chiefAddress[chainId],
    abi: chiefAbi,
    functionName: 'deposits',
    args: [address as `0x${string}`]
  } as const;
};

// returns the voting weight for an address
export async function getMKRVotingWeight(
  address: string,
  network: SupportedNetworks,
  excludeDelegateOwnerBalance: boolean
): Promise<MKRVotingWeightResponse> {
  const chainId = networkNameToChainId(network);
  const publicClient = getPublicClient(chainId);

  // first check if the address is a delegate contract and if so return the balance locked in the delegate contract
  const voteDelegateAddress = !excludeDelegateOwnerBalance
    ? await getDelegateContractAddress(address, chainId)
    : undefined;
  if (voteDelegateAddress) {
    const [mkrDelegate, mkrChiefDelegate] = await publicClient.multicall({
      contracts: [
        getMKRBalanceOfParams(chainId, voteDelegateAddress),
        getChiefDepositsParams(chainId, voteDelegateAddress)
      ],
      allowFailure: false
    });
    return {
      walletBalanceHot: mkrDelegate,
      chiefBalanceHot: mkrChiefDelegate,
      chiefTotal: mkrChiefDelegate,
      total: mkrDelegate + mkrChiefDelegate
    };
  }

  // next check if address is part of a proxy set up
  const voteProxyAddresses = await getVoteProxyAddresses(
    voteProxyFactoryAddress[chainId],
    voteProxyFactoryAbi,
    address,
    network
  );

  if (
    voteProxyAddresses.hasProxy &&
    voteProxyAddresses.hotAddress &&
    voteProxyAddresses.coldAddress &&
    voteProxyAddresses.voteProxyAddress
  ) {
    const [walletBalanceHot, walletBalanceCold, chiefBalanceHot, chiefBalanceCold, chiefBalanceProxy] =
      await publicClient.multicall({
        contracts: [
          getMKRBalanceOfParams(chainId, voteProxyAddresses.hotAddress),
          getMKRBalanceOfParams(chainId, voteProxyAddresses.coldAddress),
          getChiefDepositsParams(chainId, voteProxyAddresses.hotAddress),
          getChiefDepositsParams(chainId, voteProxyAddresses.coldAddress),
          getChiefDepositsParams(chainId, voteProxyAddresses.voteProxyAddress)
        ],
        allowFailure: false
      });

    return {
      walletBalanceHot,
      walletBalanceCold,
      chiefBalanceHot,
      chiefBalanceCold,
      chiefBalanceProxy,
      chiefTotal: chiefBalanceHot + chiefBalanceCold + chiefBalanceProxy,
      total: walletBalanceHot + walletBalanceCold + chiefBalanceHot + chiefBalanceCold + chiefBalanceProxy
    };
  }

  // otherwise, not proxy or delegate, get connected wallet balances
  const [walletBalanceHot, chiefBalanceHot] = await publicClient.multicall({
    contracts: [getMKRBalanceOfParams(chainId, address), getChiefDepositsParams(chainId, address)],
    allowFailure: false
  });
  return {
    walletBalanceHot,
    chiefBalanceHot,
    chiefTotal: chiefBalanceHot,
    total: walletBalanceHot + chiefBalanceHot
  };
}
