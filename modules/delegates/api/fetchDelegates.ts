/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { fetchChainDelegates } from './fetchChainDelegates';
import {
  DelegateOrderByEnum,
  DelegateStatusEnum,
  DelegateTypeEnum
} from 'modules/delegates/delegates.constants';
import { fetchGithubDelegate, fetchGithubDelegates } from './fetchGithubDelegates';
import { DEFAULT_NETWORK, SupportedNetworks } from 'modules/web3/constants/networks';
import {
  Delegate,
  DelegateContractInformation,
  DelegateRepoInformation,
  DelegatesValidatedQueryParams,
  DelegatesPaginatedAPIResponse,
  DelegatePaginated,
  AllDelegatesEntryWithName,
  DelegateInfo,
  DelegateListItem
} from 'modules/delegates/types';
import { getGithubExecutives } from 'modules/executive/api/fetchExecutives';
import { networkNameToChainId, getGaslessNetwork } from 'modules/web3/helpers/chain';
import { gqlRequest } from 'modules/gql/gqlRequest';
import {
  delegatesQuerySubsequentPages,
  delegatesQueryFirstPage
} from 'modules/gql/queries/subgraph/delegates';
import { lastVotedArbitrum } from 'modules/gql/queries/subgraph/lastVotedArbitrum';
import { fetchDelegatesExecSupport } from './fetchDelegatesExecSupport';
import { fetchDelegateAddresses } from './fetchDelegateAddresses';
import getDelegatesCounts from '../helpers/getDelegatesCounts';
import { filterDelegates } from '../helpers/filterDelegates';
import { fetchDelegationMetrics } from './fetchDelegationMetrics';
import { formatEther } from 'viem';
import { isExpiredCheck, isAboutToExpireCheck } from 'modules/migration/helpers/expirationChecks';
import { getLatestOwnerFromOld, getOriginalOwnerFromNew } from 'modules/migration/delegateAddressLinks';

function getExpirationStatus(delegateVersion: number, creationDate: Date) {
  if (delegateVersion === 2) {
    return { expired: false, isAboutToExpire: false };
  }

  const expirationDate = new Date(creationDate);
  expirationDate.setFullYear(expirationDate.getFullYear() + 1);

  const expired = isExpiredCheck(expirationDate);
  const isAboutToExpire = !expired && isAboutToExpireCheck(expirationDate);

  return { expired, isAboutToExpire, expirationDate };
}

function mergeDelegateInfo({
  onChainDelegate,
  githubDelegate,
  delegateVersion,
  creationDate,
  originalOnChainDelegate,
  newOnChainDelegate
}: {
  onChainDelegate: DelegateContractInformation;
  githubDelegate?: DelegateRepoInformation;
  delegateVersion: number;
  creationDate: Date;
  originalOnChainDelegate?: DelegateContractInformation;
  newOnChainDelegate?: DelegateContractInformation;
}): Delegate {
  const { expired, isAboutToExpire, expirationDate } = getExpirationStatus(delegateVersion, creationDate);
  return {
    voteDelegateAddress: onChainDelegate.voteDelegateAddress,
    address: onChainDelegate.address,
    status: githubDelegate ? DelegateStatusEnum.aligned : DelegateStatusEnum.shadow,
    description: githubDelegate?.description || '',
    name: githubDelegate?.name || 'Shadow Delegate',
    picture: githubDelegate?.picture || '',
    id: onChainDelegate.voteDelegateAddress,
    externalUrl: githubDelegate?.externalUrl,
    lastVoteDate: onChainDelegate.lastVoteDate,
    communication: githubDelegate?.communication,
    combinedParticipation: githubDelegate?.combinedParticipation,
    pollParticipation: githubDelegate?.pollParticipation,
    executiveParticipation: githubDelegate?.executiveParticipation,
    mkrDelegated: onChainDelegate.mkrDelegated,
    proposalsSupported: onChainDelegate.proposalsSupported,
    execSupported: undefined,
    mkrLockedDelegate: onChainDelegate.mkrLockedDelegate,
    blockTimestamp: onChainDelegate.blockTimestamp,
    ...(originalOnChainDelegate && {
      previous: {
        address: originalOnChainDelegate.address,
        voteDelegateAddress: originalOnChainDelegate.voteDelegateAddress
      }
    }),
    ...(newOnChainDelegate && {
      next: {
        address: newOnChainDelegate.address,
        voteDelegateAddress: newOnChainDelegate.voteDelegateAddress
      }
    }),
    expired,
    isAboutToExpire,
    expirationDate,
    delegateVersion: Number(delegateVersion)
  };
}

// Returns info for one delegate mixing onchain and repo info (requires the delegate contract address as parameter)
export async function fetchDelegate(
  voteDelegateAddress: string,
  network?: SupportedNetworks
): Promise<Delegate | undefined> {
  const currentNetwork = network ? network : DEFAULT_NETWORK.network;

  const onChainDelegates = await fetchChainDelegates(currentNetwork);

  const onChainDelegate = onChainDelegates.find(
    i => i.voteDelegateAddress.toLowerCase() === voteDelegateAddress.toLowerCase()
  );

  if (!onChainDelegate) {
    return Promise.resolve(undefined);
  }

  const delegateVersion = Number(onChainDelegate?.delegateVersion) || 1;
  const creationDate = new Date(Number(onChainDelegate.blockTimestamp) * 1000);

  const originalOwnerAddress = getOriginalOwnerFromNew(onChainDelegate.address, currentNetwork);
  const originalOnChainDelegate = originalOwnerAddress
    ? onChainDelegates.find(i => i.address.toLowerCase() === originalOwnerAddress.toLowerCase())
    : undefined;

  // check if delegate owner has a link to a newer contract
  const latestOwnerAddress = getLatestOwnerFromOld(onChainDelegate.address, currentNetwork);

  // fetch the newer contract if so
  const newOnChainDelegate = latestOwnerAddress
    ? onChainDelegates.find(i => i.address.toLowerCase() === latestOwnerAddress.toLowerCase())
    : undefined;

  // fetch github info for delegate (if they have a link to prev contract, prev contract is the info directory key)
  const { data: githubDelegate } = await fetchGithubDelegate(
    originalOnChainDelegate
      ? originalOnChainDelegate.voteDelegateAddress
      : onChainDelegate.voteDelegateAddress,
    currentNetwork
  );

  return mergeDelegateInfo({
    onChainDelegate,
    githubDelegate,
    delegateVersion,
    creationDate,
    originalOnChainDelegate,
    newOnChainDelegate
  });
}

export async function fetchAndMergeDelegates(
  network: SupportedNetworks
): Promise<[DelegateListItem[] | undefined, AllDelegatesEntryWithName[]]> {
  const [{ data: githubDelegates }, allDelegateAddresses] = await Promise.all([
    fetchGithubDelegates(network),
    fetchDelegateAddresses(network)
  ]);
  const allDelegatesWithNamesAndLinks = allDelegateAddresses.map(delegate => {
    const originalOwner = getOriginalOwnerFromNew(delegate.delegate, network);
    const latestOwner = getLatestOwnerFromOld(delegate.delegate, network);

    const oldContractAddress = allDelegateAddresses.find(del => del.delegate === originalOwner)?.voteDelegate;
    const newContractAddress = allDelegateAddresses.find(del => del.delegate === latestOwner)?.voteDelegate;

    const ghDelegate = githubDelegates?.find(del =>
      [delegate.voteDelegate, oldContractAddress, newContractAddress].includes(
        del.voteDelegateAddress.toLowerCase()
      )
    );
    const delegateVersion = Number(delegate.delegateVersion) || 1;
    const creationDate = delegate.creationDate
      ? new Date(delegate.creationDate)
      : delegate.blockTimestamp;
    const { expired, isAboutToExpire, expirationDate } = getExpirationStatus(delegateVersion, creationDate);

    return {
      ...delegate,
      delegateType: ghDelegate ? DelegateTypeEnum.ALIGNED : DelegateTypeEnum.SHADOW,
      blockTimestamp: delegate.blockTimestamp,
      name: ghDelegate?.name,
      picture: ghDelegate?.picture,
      expired,
      isAboutToExpire,
      expirationDate
    };
  });

  return [githubDelegates, allDelegatesWithNamesAndLinks];
}

export async function fetchSingleDelegateInfo(
  address: string,
  network: SupportedNetworks
): Promise<DelegateInfo | null> {
  const [githubDelegates, allDelegatesWithNamesAndLinks] = await fetchAndMergeDelegates(network);

  const foundDelegate = allDelegatesWithNamesAndLinks.find(
    delegate => delegate.voteDelegate.toLowerCase() === address.toLowerCase()
  );

  if (!foundDelegate) {
    return null;
  }

  const foundGithubDelegate = githubDelegates?.find(delegate => delegate.name === foundDelegate?.name);

  return {
    name: foundDelegate.name || 'Shadow Delegate',
    picture: foundGithubDelegate?.picture,
    address: foundDelegate.delegate,
    voteDelegateAddress: foundDelegate.voteDelegate,
    status: foundGithubDelegate ? DelegateStatusEnum.aligned : DelegateStatusEnum.shadow,
    pollParticipation: foundGithubDelegate?.pollParticipation,
    executiveParticipation: foundGithubDelegate?.executiveParticipation,
    combinedParticipation: foundGithubDelegate?.combinedParticipation,
    communication: foundGithubDelegate?.communication,
    blockTimestamp: foundDelegate.blockTimestamp,
    expired: foundDelegate.expired,
    isAboutToExpire: foundDelegate.isAboutToExpire,
    expirationDate: foundDelegate.expirationDate
  };
}

export async function fetchDelegatesInfo(
  network: SupportedNetworks,
  alignedOnly: boolean
): Promise<DelegateInfo[]> {
  const [githubDelegates, allDelegatesWithNamesAndLinks] = await fetchAndMergeDelegates(network);

  const delegatesInfo = allDelegatesWithNamesAndLinks
    .filter(delegate => (alignedOnly ? delegate.delegateType === DelegateTypeEnum.ALIGNED : true))
    .filter((delegate, i, arr) => (alignedOnly ? arr.findIndex(d => d.name === delegate.name) === i : true))
    .sort((a, b) => new Date(a.blockTimestamp).getTime() - new Date(b.blockTimestamp).getTime())
    .map(delegate => {
      const githubDelegate = githubDelegates?.find(d => d.name === delegate.name);
      return {
        name: delegate.name || 'Shadow Delegate',
        picture: githubDelegate?.picture,
        address: delegate.delegate,
        voteDelegateAddress: delegate.voteDelegate,
        status: delegate.name ? DelegateStatusEnum.aligned : DelegateStatusEnum.shadow,
        pollParticipation: githubDelegate?.pollParticipation,
        executiveParticipation: githubDelegate?.executiveParticipation,
        combinedParticipation: githubDelegate?.combinedParticipation,
        communication: githubDelegate?.communication,
        blockTimestamp: delegate.blockTimestamp,
        expired: delegate.expired,
        isAboutToExpire: delegate.isAboutToExpire,
        expirationDate: delegate.expirationDate
      };
    });

  return delegatesInfo;
}

export async function fetchDelegatesPaginated({
  network,
  pageSize,
  page,
  orderBy,
  orderDirection,
  delegateType,
  searchTerm,
  includeExpired
}: DelegatesValidatedQueryParams): Promise<DelegatesPaginatedAPIResponse> {
  try {
    const chainId = networkNameToChainId(network);

  const [githubDelegates, allDelegatesWithNamesAndLinks] = await fetchAndMergeDelegates(network);

  const { alignedDelegatesAddresses, filteredDelegateAddresses, filteredDelegateEntries } = filterDelegates(
    allDelegatesWithNamesAndLinks,
    searchTerm,
    delegateType
  );

  const { alignedDelegatesCount, shadowDelegatesCount, totalDelegatesCount } =
    getDelegatesCounts(filteredDelegateEntries);

  // If there are no aligned delegates, the id_not_in filter will filter out everything if we give it an empty array
  const alignedDelegatesAddressesForNotInQuery =
    alignedDelegatesAddresses.length > 0
      ? alignedDelegatesAddresses
      : ['0x0000000000000000000000000000000000000000'];

  // Build base Hasura where conditions
  const baseWhereConditions: string[] = [
    `chainId: { _eq: ${chainId} }`
  ];

  // Version and expiration filter
  if (includeExpired) {
    baseWhereConditions.push('version: { _in: ["1", "2"] }');
  } else {
    // Include all v2, and v1 only if not expired (created within the last year)
    const oneYearAgo = Math.floor(Date.now() / 1000) - 24 * 60 * 60 * 365;
    baseWhereConditions.push(
      `_or: [{ version: { _eq: "2" } }, { _and: [{ version: { _eq: "1" } }, { blockTimestamp_gt: ${oneYearAgo} }] }]`
    );
  }

  // Build chainId-prefixed ID conditions for filtering
  const prefixedAlignedAddresses = alignedDelegatesAddresses.map(a => `{ id: { _ilike: "%${a}" } }`);
  const prefixedFilteredAddresses = filteredDelegateAddresses.map(a => `{ id: { _ilike: "%${a}" } }`);
  const prefixedNotAlignedAddresses = alignedDelegatesAddressesForNotInQuery.map(
    a => `{ id: { _nilike: "%${a}" } }`
  );

  if (searchTerm) {
    if (prefixedFilteredAddresses.length > 0) {
      baseWhereConditions.push(`_or: [${prefixedFilteredAddresses.join(', ')}]`);
    }
    if (delegateType === DelegateTypeEnum.ALIGNED && prefixedAlignedAddresses.length > 0) {
      baseWhereConditions.push(`_or: [${prefixedAlignedAddresses.join(', ')}]`);
    }
  } else if (delegateType === DelegateTypeEnum.ALIGNED && prefixedAlignedAddresses.length > 0) {
    baseWhereConditions.push(`_or: [${prefixedAlignedAddresses.join(', ')}]`);
  } else if (delegateType === DelegateTypeEnum.SHADOW && prefixedNotAlignedAddresses.length > 0) {
    baseWhereConditions.push(`_and: [${prefixedNotAlignedAddresses.join(', ')}]`);
  }

  // Shadow filter: base + not aligned
  const shadowWhereConditions = [
    ...baseWhereConditions.filter(c => !c.startsWith('_or: [{ id: { _ilike')),
    ...(prefixedNotAlignedAddresses.length > 0
      ? [`_and: [${prefixedNotAlignedAddresses.join(', ')}]`]
      : [])
  ];

  // Aligned filter: base + only aligned
  const alignedWhereConditions = [
    ...baseWhereConditions.filter(c => !c.startsWith('_and: [{ id: { _nilike')),
    ...(prefixedAlignedAddresses.length > 0
      ? [`_or: [${prefixedAlignedAddresses.join(', ')}]`]
      : [])
  ];

  const queryOrderBy = orderBy === DelegateOrderByEnum.RANDOM ? DelegateOrderByEnum.MKR : orderBy;

  const [githubExecutives, delegatesExecSupport, delegatesQueryRes, delegationMetrics] = await Promise.all([
    getGithubExecutives(network),
    fetchDelegatesExecSupport(network),
    gqlRequest<any>({
      chainId,
      query: page === 1
        ? delegatesQueryFirstPage({
            shadowWhereConditions: searchTerm ? baseWhereConditions : shadowWhereConditions,
            alignedWhereConditions,
            orderBy: queryOrderBy,
            orderDirection,
            limit: pageSize
          })
        : delegatesQuerySubsequentPages({
            whereConditions: searchTerm ? baseWhereConditions : shadowWhereConditions,
            orderBy: queryOrderBy,
            orderDirection,
            limit: pageSize,
            offset: (page - 1) * pageSize
          }),
      useSubgraph: true
    }),
    fetchDelegationMetrics(network)
  ]);

  let combinedDelegates = [
    // Include aligned delegates if the filter doesn't specify to only show shadow delegates
    ...((delegateType !== DelegateTypeEnum.SHADOW && delegatesQueryRes.alignedDelegates) || []),
    // Include shadow delegates if the filter doesn't specify to only show aligned delegates
    ...((delegateType !== DelegateTypeEnum.ALIGNED && delegatesQueryRes.delegates) || [])
  ];

  const combinedDelegateOwnerAddresses = combinedDelegates.map((delegate: any) =>
    delegate.ownerAddress.toLowerCase()
  );

  const gaslessChainId = networkNameToChainId(getGaslessNetwork(network));
  const lastVotedArbitrumArray = await gqlRequest<any>({
    chainId: gaslessChainId,
    query: lastVotedArbitrum(gaslessChainId, combinedDelegateOwnerAddresses),
    useSubgraph: true
  });

  const lastVotedArbitrumObj = (lastVotedArbitrumArray.ArbitrumVoter || []).reduce((acc: any, voter: any) => {
    acc[voter.address?.toLowerCase()] =
      voter.pollVotes && voter.pollVotes.length > 0 ? Number(voter.pollVotes[0].blockTime) : 0;
    return acc;
  }, {});

  // Apply random sorting on the frontend if orderBy is RANDOM
  if (orderBy === DelegateOrderByEnum.RANDOM) {
    combinedDelegates = combinedDelegates.sort(() => Math.random() - 0.5);
  }

  const delegatesData = {
    paginationInfo: {
      totalCount: delegatesQueryRes.delegates.totalCount,
      page,
      numPages: Math.ceil(delegatesQueryRes.delegates.totalCount / pageSize),
      hasNextPage: true
    },
    stats: {
      total: totalDelegatesCount,
      shadow: shadowDelegatesCount,
      aligned: alignedDelegatesCount,
      totalMKRDelegated: delegationMetrics.totalMkrDelegated,
      totalDelegators: delegationMetrics.delegatorCount
    },
    delegates: combinedDelegates.map((delegate: any) => {
      const allDelegatesEntry = allDelegatesWithNamesAndLinks.find(
        del => del.voteDelegate.toLowerCase() === delegate.address?.toLowerCase()
      );
      const githubDelegate = githubDelegates?.find(ghDelegate => ghDelegate.name === allDelegatesEntry?.name);

      const delegateVersion = Number(allDelegatesEntry?.delegateVersion) || 1;

      const votedProposals = delegatesExecSupport.data?.find(
        del => del.voteDelegate.toLowerCase() === delegate.address?.toLowerCase()
      )?.votedProposals;
      const execSupported = githubExecutives.find(proposal =>
        votedProposals?.find(vp => vp.toLowerCase() === proposal?.address?.toLowerCase())
      );

      // Ensure blockTimestamp is a valid number
      const blockTimestampNum = delegate.blockTimestamp ? Number(delegate.blockTimestamp) : 0;
      let creationDate: Date;
      try {
        creationDate = new Date(blockTimestampNum * 1000);
        // Validate the date is valid
        creationDate.toISOString();
      } catch (e) {
        // If date is invalid, use current date as fallback
        creationDate = new Date();
      }

      // Handle creationDate from delegate object
      let finalCreationDate: Date;
      try {
        finalCreationDate = delegate.creationDate ? new Date(delegate.creationDate) : creationDate;
        // Validate the date is valid
        finalCreationDate.toISOString();
      } catch (e) {
        // If date is invalid, use the previously calculated creationDate as fallback
        finalCreationDate = creationDate;
      }

      const lastVoteMainnet = delegate.voter?.lastVotedTimestamp || 0;

      const lastVoteArbitrum = lastVotedArbitrumObj[delegate.ownerAddress?.toLowerCase()] || 0;

      const lastVoteTimestamp = Math.max(lastVoteMainnet, lastVoteArbitrum);

      const totalDelegated = BigInt(delegate.totalDelegated || '0');

      const { expired, isAboutToExpire, expirationDate } = getExpirationStatus(
        delegateVersion,
        finalCreationDate
      );

      return {
        name: githubDelegate?.name || 'Shadow Delegate',
        voteDelegateAddress: delegate.address,
        address: delegate.ownerAddress,
        status: githubDelegate ? DelegateStatusEnum.aligned : DelegateStatusEnum.shadow,
        creationDate: finalCreationDate,
        picture: githubDelegate?.picture,
        communication: githubDelegate?.communication,
        combinedParticipation: githubDelegate?.combinedParticipation,
        pollParticipation: githubDelegate?.pollParticipation,
        executiveParticipation: githubDelegate?.executiveParticipation,
        mkrDelegated: formatEther(totalDelegated),
        delegatorCount: delegate.delegators,
        lastVoteDate: lastVoteTimestamp > 0 ? new Date(lastVoteTimestamp * 1000) : null,
        proposalsSupported: votedProposals?.length || 0,
        execSupported: execSupported && { title: execSupported.title, address: execSupported.address },
        delegateVersion,
        expired,
        isAboutToExpire,
        expirationDate
      };
    }) as DelegatePaginated[]
  };

  return delegatesData;
  } catch (error) {
    console.error('Error fetching delegates paginated:', error);
    // Return a default response structure when there's an error
    return {
      paginationInfo: {
        totalCount: 0,
        page: page,
        numPages: 0,
        hasNextPage: false
      },
      stats: {
        total: 0,
        shadow: 0,
        aligned: 0,
        totalMKRDelegated: '0',
        totalDelegators: 0
      },
      delegates: []
    };
  }
}
