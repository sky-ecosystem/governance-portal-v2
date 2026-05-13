/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import logger from 'lib/logger';
import { gqlRequest } from 'modules/gql/gqlRequest';
import { delegateHistoryArray } from 'modules/gql/queries/subgraph/delegateHistoryArray';
import { SupportedNetworks } from 'modules/web3/constants/networks';
import { networkNameToChainId } from 'modules/web3/helpers/chain';
import { MKRLockedDelegateAPIResponse } from '../types';
import { formatEther } from 'viem';
import { sealEngineAddressMainnet, sealEngineAddressTestnet } from 'modules/gql/gql.constants';

export async function fetchDelegationEventsByAddresses(
  addresses: string[],
  network: SupportedNetworks
): Promise<MKRLockedDelegateAPIResponse[]> {
  const engine = network === SupportedNetworks.TENDERLY ? sealEngineAddressTestnet : sealEngineAddressMainnet;
  try {
    const chainId = networkNameToChainId(network);
    const data = await gqlRequest<any>({
      chainId,
      useSubgraph: true,
      query: delegateHistoryArray(chainId, addresses, [engine])
    });
    const flattenedData = (data.Delegate || []).flatMap((delegate: any) => delegate.delegationHistory);
    const addressData: MKRLockedDelegateAPIResponse[] = flattenedData.map((x: any) => {
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
  } catch (e) {
    logger.error('fetchDelegationEventsByAddresses: Error fetching delegation events', e.message);
    return [];
  }
}
