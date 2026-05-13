/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { cacheGet, cacheSet } from 'modules/cache/cache';
import { PartialActivePoll, Poll, PollFilterQueryParams, PollListItem } from 'modules/polling/types';
import { fetchPollMetadata } from './fetchPollMetadata';
import { DEFAULT_NETWORK, SupportedNetworks } from 'modules/web3/constants/networks';
import { getCategories } from '../helpers/getCategories';
import { isActivePoll } from '../helpers/utils';
import { PollFilters, PollsPaginatedResponse, PollsResponse } from '../types/pollsResponse';
import { PollsValidatedQueryParams } from 'modules/polling/types';
import { allWhitelistedPolls } from 'modules/gql/queries/spock/allWhitelistedPolls';
import { gqlRequest } from 'modules/gql/gqlRequest';
import { networkNameToChainId } from 'modules/web3/helpers/chain';
import { PollSpock } from '../types/pollSpock';
import uniqBy from 'lodash/uniqBy';
import chunk from 'lodash/chunk';
import { spockPollToPartialPoll } from '../helpers/parsePollMetadata';
import { ActivePollEdge, Query as GqlQuery } from 'modules/gql/generated/graphql';
import { PollsQueryVariables } from 'modules/gql/types';
import logger from 'lib/logger';
import {
  partialActivePollsCacheKey,
  getAllPollsCacheKey,
  isPollsHashValidCacheKey,
  pollDetailsCacheKey,
  pollListCacheKey,
  pollsHashCacheKey,
  pollSlugToIdsCacheKey
} from 'modules/cache/constants/cache-keys';
import { getPollTagsMapping, getPollTags } from './getPollTags';
import {
  AGGREGATED_POLLS_FILE_URL,
  PollStatusEnum,
  POLLS_HASH_FILE_URL,
  PollInputFormat
} from '../polling.constants';
import { ONE_WEEK_IN_MS, THIRTY_MINUTES_IN_MS } from 'modules/app/constants/time';
import { sortPollsBy } from '../helpers/sortPolls';
import { TagCount } from 'modules/app/types/tag';

export function sortPolls(pollList: Poll[]): Poll[] {
  return pollList.sort((a, b) => {
    // closest to expiration shown first, if some have same expiration date, sort by startdate
    const dateEndDiff = a.endDate.getTime() - b.endDate.getTime();

    // Sort by more recent first if they end at the same time
    const sortedByStartDate = a.startDate.getTime() < b.startDate.getTime() ? 1 : -1;

    return dateEndDiff < 0 ? 1 : dateEndDiff > 0 ? -1 : sortedByStartDate;
  });
}

// Fetches all the polls metadata, sorts and filters results.
export async function fetchAllPollsMetadata(pollList: PollSpock[]): Promise<Poll[]> {
  let numFailedFetches = 0;
  const failedPollIds: number[] = [];
  const polls: Poll[] = [];

  //uniqBy keeps the first occurence of a duplicate, so we sort polls so that the most recent poll is kept in case of a duplicate
  const dedupedPolls = uniqBy(
    pollList.sort((a, b) => b.pollId - a.pollId),
    p => p.multiHash
  );

  const tagsMapping = await getPollTagsMapping();

  for (const pollGroup of chunk(dedupedPolls, 20)) {
    // fetch polls in batches, don't fetch a new batch until the current one has resolved
    const pollGroupWithData = await Promise.all(
      pollGroup.map(async (p: PollSpock) => {
        try {
          return await fetchPollMetadata(spockPollToPartialPoll(p), tagsMapping);
        } catch (err) {
          numFailedFetches += 1;
          failedPollIds.push(p.pollId);
          return null;
        }
      })
    ).then((polls: Poll[]) => polls.filter(poll => !!poll));

    polls.push(...pollGroupWithData);
  }

  logger.warn(
    'fetchAllPollsMetadata',
    `---
    Failed to fetch docs for ${numFailedFetches}/${pollList.length} polls.
    IDs: ${failedPollIds}`
  );

  return sortPolls(polls);
}

export async function fetchSpockPolls(
  network: SupportedNetworks,
  queryVariables?: PollsQueryVariables | null
): Promise<PollSpock[]> {
  const requestData = {
    chainId: networkNameToChainId(network),
    query: allWhitelistedPolls,
    variables: queryVariables ?? undefined
  };

  const data = await gqlRequest<GqlQuery>(requestData);

  const pollEdges: ActivePollEdge[] = data.activePolls.edges;

  const pollList = pollEdges.map(({ node: poll, cursor }) => {
    return { ...poll, cursor };
  });

  return pollList as PollSpock[];
}

export async function _getAllPolls(
  network?: SupportedNetworks,
  queryVariables?: PollsQueryVariables
): Promise<Poll[]> {
  const cacheKey = getAllPollsCacheKey(queryVariables);

  const cachedPolls = await cacheGet(cacheKey, network);
  if (cachedPolls) {
    return JSON.parse(cachedPolls);
  }

  const pollList = await fetchSpockPolls(network || DEFAULT_NETWORK.network, queryVariables);

  const polls = await fetchAllPollsMetadata(pollList);

  // remove markdown from "all-polls" to avoid sending too much data
  const trimmedPolls = polls.map(poll => {
    return {
      ...poll,
      content: poll.content.substring(0, 100) + '...'
    };
  });

  cacheSet(cacheKey, JSON.stringify(trimmedPolls), network);

  return trimmedPolls;
}

// Public method that returns the polls, and accepts filters
const defaultFilters: PollFilters = {
  startDate: null,
  endDate: null,
  tags: null,
  active: null
};

export async function getPolls(
  filters = defaultFilters,
  network?: SupportedNetworks,
  queryVariables?: PollsQueryVariables
): Promise<PollsResponse> {
  const allPolls = await _getAllPolls(network, queryVariables);

  const filteredPolls = allPolls.filter(poll => {
    // check date filters first
    if (filters.startDate && new Date(poll.endDate).getTime() < filters.startDate.getTime()) return false;
    if (filters.endDate && new Date(poll.endDate).getTime() > filters.endDate.getTime()) return false;

    // if no category filters selected, return all, otherwise, check if poll contains category
    return !filters.tags || poll.tags.some(c => filters.tags && filters.tags.includes(c.id));
  });

  return {
    polls: filteredPolls,
    tags: getCategories(allPolls),
    stats: {
      active: allPolls.filter(isActivePoll).length,
      finished: allPolls.filter(p => !isActivePoll(p)).length,
      total: allPolls.length
    }
  };
}

export async function checkCachedPollsValidity(
  network: SupportedNetworks
): Promise<{ valid: boolean; hash?: string }> {
  const isPollsHashValid: boolean | undefined = await cacheGet(
    isPollsHashValidCacheKey,
    network,
    THIRTY_MINUTES_IN_MS
  );

  if (isPollsHashValid) {
    return { valid: true };
  }

  const githubPollsHashRes = await fetch(POLLS_HASH_FILE_URL[network]);
  const githubPollsHashFile = await githubPollsHashRes.json();

  const githubPollsHash: string | undefined = githubPollsHashFile.hash;
  const cachedPollsHash: string | undefined = await cacheGet(pollsHashCacheKey, network, ONE_WEEK_IN_MS);

  if (githubPollsHash && cachedPollsHash && githubPollsHash === cachedPollsHash) {
    cacheSet(isPollsHashValidCacheKey, 'true', network, THIRTY_MINUTES_IN_MS);
    return { valid: true };
  } else {
    return { valid: false, hash: githubPollsHash };
  }
}

export async function refetchPolls(
  network: SupportedNetworks,
  githubHash: string
): Promise<{
  pollList: PollListItem[];
  allPolls: Poll[];
  partialActivePolls: PartialActivePoll[];
}> {
  const allPollsRes = await fetch(AGGREGATED_POLLS_FILE_URL[network]);
  const allPolls = await allPollsRes.json();

  const pollList: PollListItem[] = allPolls.map(poll => {
    const { pollId, startDate, endDate, slug, parameters, summary, title, options, tags } = poll;
    return {
      pollId,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      slug,
      type: parameters.inputFormat.type,
      parameters,
      title,
      summary,
      options,
      tags
    };
  });

  const partialActivePolls = pollList
    .filter(poll => new Date(poll.endDate) > new Date())
    .map(({ pollId, startDate, endDate }) => ({ pollId, startDate, endDate }));

  cacheSet(isPollsHashValidCacheKey, 'true', network, THIRTY_MINUTES_IN_MS);
  cacheSet(pollsHashCacheKey, githubHash, network, ONE_WEEK_IN_MS);
  cacheSet(pollListCacheKey, JSON.stringify(pollList), network, ONE_WEEK_IN_MS);
  cacheSet(partialActivePollsCacheKey, JSON.stringify(partialActivePolls), network, ONE_WEEK_IN_MS);

  const pollTags = getPollTags();

  const pollSlugToIds: [string, number][] = [];
  const stringifiedPolls: { [key: number]: string } = {};

  const parsedPolls: Poll[] = allPolls.map((poll, i) => {
    const prevPoll = allPolls[i - 1];
    const nextPoll = allPolls[i + 1];

    const pollWithLinksAndTags: Poll = {
      ...poll,
      tags: poll.tags.map(tag => pollTags.find(t => t.id === tag)).filter(tag => !!tag),
      ctx: {
        prev: prevPoll ? { slug: prevPoll.slug } : null,
        next: nextPoll ? { slug: nextPoll.slug } : null
      }
    };

    pollSlugToIds.push([poll.slug, poll.pollId]);
    stringifiedPolls[poll.pollId] = JSON.stringify(pollWithLinksAndTags);

    return pollWithLinksAndTags;
  });

  // Individual polls contain more metadata than the poll-list array and are used to render the poll detail page.
  // They are stored as multiple hashes for a same cache key for improved performance when setting and getting them.
  cacheSet(pollDetailsCacheKey, stringifiedPolls, network, ONE_WEEK_IN_MS, 'HSET');
  cacheSet(pollSlugToIdsCacheKey, JSON.stringify(pollSlugToIds), network, ONE_WEEK_IN_MS);

  return { pollList, allPolls: parsedPolls, partialActivePolls };
}

export async function getActivePollIds(network: SupportedNetworks): Promise<number[]> {
  const { valid: cachedPollsAreValid, hash: githubHash } = await checkCachedPollsValidity(network);

  let partialActivePolls: PartialActivePoll[] | undefined;

  if (cachedPollsAreValid) {
    const cachedPartialActivePolls = await cacheGet(partialActivePollsCacheKey, network, ONE_WEEK_IN_MS);
    if (cachedPartialActivePolls) {
      partialActivePolls = JSON.parse(cachedPartialActivePolls);
    }
  }

  if (!partialActivePolls) {
    const { partialActivePolls: newPartialActivePolls } = await refetchPolls(network, githubHash as string);
    partialActivePolls = newPartialActivePolls;
  }

  const activePollIds =
    partialActivePolls
      ?.filter(poll => new Date(poll.endDate) > new Date() && new Date(poll.startDate) <= new Date())
      .map(poll => poll.pollId) || [];

  return activePollIds;
}

export async function getPollList(network: SupportedNetworks): Promise<PollListItem[]> {
  const { valid: cachedPollsAreValid, hash: githubHash } = await checkCachedPollsValidity(network);

  if (cachedPollsAreValid) {
    const cachedPollList = await cacheGet(pollListCacheKey, network, ONE_WEEK_IN_MS);
    if (cachedPollList) {
      return JSON.parse(cachedPollList);
    }
  }

  const { pollList } = await refetchPolls(network, githubHash as string);

  return pollList;
}

export function filterPollList(
  pollList: PollListItem[],
  filters: PollFilterQueryParams
): Omit<PollsPaginatedResponse, 'tags'> {
  const {
    pageSize,
    page,
    title: filterTitle,
    orderBy,
    tags: filterTags,
    status,
    type: filterTypes,
    startDate: filterStartDate,
    endDate: filterEndDate
  } = filters;

  const filteredPolls = pollList
    // First, filter the poll list by the filters passed
    .filter(({ title, tags, type, startDate, endDate }) => {
      const paramStartDate = new Date(startDate);
      const paramEndDate = new Date(endDate);

      return (
        new Date() >= paramStartDate &&
        (filterTitle ? title.toLowerCase().includes(filterTitle.toLowerCase()) : true) &&
        (filterTags ? filterTags.every(tag => tags.includes(tag)) : true) &&
        (filterStartDate ? paramStartDate >= filterStartDate : true) &&
        (filterEndDate ? paramEndDate < filterEndDate : true) &&
        (status
          ? status === PollStatusEnum.active
            ? new Date() < paramEndDate
            : new Date() >= paramEndDate
          : true) &&
        (filterTypes ? filterTypes.includes(type) : true)
      );
    });

  const sortedPolls = filteredPolls
    // Then, sort it by the `orderBy` parameter
    .sort(sortPollsBy(orderBy));

  const totalCount = filteredPolls.length;
  const numPages = Math.ceil(filteredPolls.length / pageSize);
  const hasNextPage = page < numPages;

  const pollStats = {
    active: 0,
    finished: 0,
    total: filteredPolls.length,
    type: {
      [PollInputFormat.singleChoice]: 0,
      [PollInputFormat.rankFree]: 0,
      [PollInputFormat.majority]: 0,
      [PollInputFormat.chooseFree]: 0
    }
  };

  // If the only filter applied is the poll status (active or finished), use all polls for counts.
  // Else, use only the filtered polls
  const onlyStatusFiltered =
    status && !filterTitle && !filterTags && !filterTypes && !filterStartDate && !filterEndDate;

  const pollsToCount = onlyStatusFiltered ? pollList : filteredPolls;

  pollsToCount.forEach(poll => {
    if (new Date(poll.endDate) > new Date() && new Date(poll.startDate) <= new Date()) {
      pollStats.active++;
    } else {
      pollStats.finished++;
    }

    switch (poll.type) {
      case PollInputFormat.singleChoice:
        pollStats.type[PollInputFormat.singleChoice]++;
        break;
      case PollInputFormat.rankFree:
        pollStats.type[PollInputFormat.rankFree]++;
        break;
      case PollInputFormat.chooseFree:
        pollStats.type[PollInputFormat.chooseFree]++;
        break;
      case PollInputFormat.majority:
        pollStats.type[PollInputFormat.majority]++;
        break;
      default:
        break;
    }
  });

  return {
    paginationInfo: {
      totalCount,
      page,
      numPages,
      hasNextPage
    },
    stats: pollStats,
    polls: sortedPolls
  };
}

export function reducePollTags(pollList: PollListItem[], filteredPollList: PollListItem[]): TagCount[] {
  const pollTags = getPollTags();

  const tags = pollList.reduce((acumTags, poll) => {
    const pollInFilteredPolls = filteredPollList.some(p => p.pollId === poll.pollId);

    poll.tags.forEach(tag => {
      const addedTag = acumTags.find(t => t.id === tag);

      if (addedTag) {
        if (pollInFilteredPolls) {
          addedTag.count += 1;
        }
        return;
      }

      const pollTag = pollTags.find(t => t.id === tag);

      if (pollTag) {
        acumTags.push({
          ...pollTag,
          count: pollInFilteredPolls ? 1 : 0
        });
      }
    });

    return acumTags;
  }, [] as TagCount[]);

  return tags.sort((a, b) => (a.longname > b.longname ? 1 : -1));
}

export async function getPollsPaginated({
  network,
  pageSize,
  page,
  title,
  orderBy,
  tags,
  status,
  type,
  startDate,
  endDate
}: PollsValidatedQueryParams): Promise<PollsPaginatedResponse> {
  const pollList = await getPollList(network);

  const pollFilters = { pageSize, page, title, orderBy, tags, status, type, startDate, endDate };
  const filteredPollList = filterPollList(pollList, pollFilters);
  const pollTags = reducePollTags(pollList, filteredPollList.polls);

  return {
    ...filteredPollList,
    polls: filteredPollList.polls.slice((page - 1) * pageSize, page * pageSize),
    tags: pollTags
  };
}
