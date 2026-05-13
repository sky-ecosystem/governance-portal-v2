/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { DelegateContractInformation } from 'modules/delegates/types';
import { networkNameToChainId } from 'modules/web3/helpers/chain';
import { gqlRequest } from 'modules/gql/gqlRequest';
import { delegatesQuerySubsequentPages } from 'modules/gql/queries/subgraph/delegates';
import { SupportedNetworks } from 'modules/web3/constants/networks';
import { formatEther } from 'viem';

export async function fetchChainDelegates(
  network: SupportedNetworks
): Promise<DelegateContractInformation[]> {
  try {
    const chainId = networkNameToChainId(network);
    const delegates: any[] = [];
    let offset = 0;
    const batchSize = 1000;
    let keepFetching = true;

    const whereConditions = [
      `chainId: { _eq: ${chainId} }`,
      'version: { _in: ["1", "2"] }'
    ];

    while (keepFetching) {
      const data = await gqlRequest<any>({
        chainId,
        useSubgraph: true,
        query: delegatesQuerySubsequentPages({
          whereConditions,
          orderBy: 'blockTimestamp',
          orderDirection: 'asc',
          limit: batchSize,
          offset
        })
      });

      const batch = data.delegates;
      delegates.push(...batch);
      offset += batchSize;
      keepFetching = batch.length === batchSize;
    }

  return delegates.map(delegate => {
    const totalDelegated = BigInt(delegate.totalDelegated || '0');

    return {
      address: delegate.ownerAddress,
      voteDelegateAddress: delegate.address,
      mkrDelegated: formatEther(totalDelegated),
      blockTimestamp: delegate.blockTimestamp,
      delegateVersion: delegate.version,
      proposalsSupported: 0,
      mkrLockedDelegate: [],
      lastVoteDate: null
    };
  });
  } catch (error) {
    console.error('Error fetching chain delegates:', error);
    // Return empty array when subgraph is unavailable
    return [];
  }
}
