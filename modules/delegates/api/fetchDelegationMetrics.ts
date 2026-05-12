/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { gqlRequest } from 'modules/gql/gqlRequest';
import { allDelegateAddresses } from 'modules/gql/queries/subgraph/allDelegateAddresses';
import { SupportedNetworks } from 'modules/web3/constants/networks';
import { networkNameToChainId } from 'modules/web3/helpers/chain';
import { formatEther } from 'viem';

interface DelegationMetrics {
  totalMkrDelegated: string;
  delegatorCount: number;
}

export async function fetchDelegationMetrics(network: SupportedNetworks): Promise<DelegationMetrics> {
  try {
    const chainId = networkNameToChainId(network);

    const data = await gqlRequest<any>({
      chainId,
      query: allDelegateAddresses(chainId),
      useSubgraph: true
    });

    const delegates = data.Delegate || [];

    const totalMkrDelegated = formatEther(
      delegates.reduce((acc: bigint, d: any) => acc + BigInt(d.totalDelegated || '0'), 0n)
    );
    const delegatorCount = delegates.reduce((acc: number, d: any) => acc + (d.delegators || 0), 0);

    return {
      totalMkrDelegated,
      delegatorCount
    };
  } catch (error) {
    console.error('Error fetching delegation metrics:', error);
    return {
      totalMkrDelegated: '0',
      delegatorCount: 0
    };
  }
}
