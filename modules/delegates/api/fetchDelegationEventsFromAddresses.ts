/*
SPDX-FileCopyrightText: © 2024 Dai Foundation <www.daifoundation.org>
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import logger from 'lib/logger';
import { gqlRequest } from 'modules/gql/gqlRequest';
import { delegationsFromAddressHistory } from 'modules/gql/queries/subgraph/delegationsFromAddressHistory';
import { SupportedNetworks } from 'modules/web3/constants/networks';
import { networkNameToChainId } from 'modules/web3/helpers/chain';
import { MKRLockedDelegateAPIResponse } from '../types';
import { formatEther } from 'viem';

export async function fetchDelegationEventsFromAddresses(
  address: string,
  network: SupportedNetworks
): Promise<MKRLockedDelegateAPIResponse[]> {
  try {
    const chainId = networkNameToChainId(network);
    const data = await gqlRequest<any>({
      chainId,
      useSubgraph: true,
      query: delegationsFromAddressHistory(chainId, address.toLowerCase())
    });

    const addressData: MKRLockedDelegateAPIResponse[] = (data.DelegationHistory || []).map((x: any) => {
      return {
        delegateContractAddress: x.delegate.address,
        immediateCaller: x.delegator,
        lockAmount: formatEther(x.amount),
        blockNumber: x.blockNumber,
        blockTimestamp: new Date(parseInt(x.timestamp) * 1000).toISOString(),
        hash: x.txnHash,
        callerLockTotal: formatEther(x.accumulatedAmount),
        isLockstake: x.isLockstake
      };
    });
    return addressData;
  } catch (e: any) {
    logger.error('fetchDelegationEventsFromAddresses: Error fetching delegation events', e.message);
    return [];
  }
}
