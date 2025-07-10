import { gqlRequest } from 'modules/gql/gqlRequest';
import { allDelegateAddresses } from 'modules/gql/queries/subgraph/allDelegateAddresses';
import { allDelegatesExecSupportKey } from 'modules/cache/constants/cache-keys';
import { cacheGet, cacheSet } from 'modules/cache/cache';
import { SupportedNetworks } from 'modules/web3/constants/networks';
import { networkNameToChainId } from 'modules/web3/helpers/chain';
import logger from 'lib/logger';
import { ZERO_SLATE_HASH } from 'modules/executive/helpers/zeroSlateHash';
import { getSlateAddresses } from 'modules/executive/helpers/getSlateAddresses';
import { DelegateExecSupport } from '../types';
import { TEN_MINUTES_IN_MS } from 'modules/app/constants/time';
import { getPublicClient } from 'modules/web3/helpers/getPublicClient';
import { chiefAbi, chiefAddress } from 'modules/contracts/generated';

type SubgraphDelegate = {
  id: string;
  ownerAddress: string;
  blockTimestamp: string;
  version: string;
};

export async function fetchDelegatesExecSupport(network: SupportedNetworks): Promise<{
  error: boolean;
  data?: DelegateExecSupport[];
}> {
  const cachedResponse = await cacheGet(allDelegatesExecSupportKey, network);
  if (cachedResponse) {
    return {
      error: false,
      data: JSON.parse(cachedResponse)
    };
  }

  try {
    const chainId = networkNameToChainId(network);
    const publicClient = getPublicClient(chainId);

    const delegates: SubgraphDelegate[] = [];
    let hasMore = true;
    let skip = 0;
    while (hasMore) {
      const data = await gqlRequest<{ delegates: SubgraphDelegate[] }>({
        chainId,
        useSubgraph: true,
        query: allDelegateAddresses,
        variables: {
          first: 1000,
          skip
        }
      });

      if (data.delegates.length > 0) {
        delegates.push(...data.delegates);
        skip += data.delegates.length;
      } else {
        hasMore = false;
      }
    }

    const delegatesExecSupport = await Promise.all(
      delegates.map(async delegate => {
        const votedSlate = await publicClient.readContract({
          address: chiefAddress[chainId],
          abi: chiefAbi,
          functionName: 'votes',
          args: [delegate.id as `0x${string}`]
        });
        const votedProposals =
          votedSlate !== ZERO_SLATE_HASH
            ? await getSlateAddresses(chainId, chiefAddress[chainId], chiefAbi, votedSlate)
            : [];

        return {
          voteDelegate: delegate.id,
          votedProposals
        };
      })
    );

    cacheSet(allDelegatesExecSupportKey, JSON.stringify(delegatesExecSupport), network, TEN_MINUTES_IN_MS);

    return {
      error: false,
      data: delegatesExecSupport
    };
  } catch (e) {
    logger.error(
      'fetchDelegatesExecSupport: Error fetching delegates executive support',
      (e as Error).message,
      'Network',
      network
    );
    return { error: true };
  }
}
