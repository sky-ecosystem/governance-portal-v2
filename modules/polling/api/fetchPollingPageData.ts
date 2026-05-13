/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { getActivePollIds, getPollsPaginated } from 'modules/polling/api/fetchPolls';
import { SupportedNetworks } from 'modules/web3/constants/networks';
import { fetchJson } from 'lib/fetchJson';
import { PollInputFormat, PollOrderByEnum, PollStatusEnum } from '../polling.constants';
import { PollsPaginatedResponse, PollingPageProps } from '../types/pollsResponse';
import { PollListItem } from '../types';
import { PollingReviewPageProps } from 'pages/polling/review';
import { TagCount } from 'modules/app/types/tag';

export type PollsQueryParams = {
  page?: number;
  orderBy?: PollOrderByEnum;
  status?: PollStatusEnum | null;
  title?: string | null;
  queryTags?: string[];
  type?: PollInputFormat[] | null;
  startDate?: Date | null;
  endDate?: Date | null;
};

export async function fetchPollingPageData(
  network: SupportedNetworks,
  useApi = false,
  queryParams?: PollsQueryParams
): Promise<PollingPageProps> {
  const pageSize = 30;
  const page = queryParams?.page || 1;
  const orderBy = queryParams?.orderBy || PollOrderByEnum.nearestEnd;
  const status = queryParams?.status || null;
  const title = queryParams?.title || null;
  const queryTags = queryParams?.queryTags || null;
  const type = queryParams?.type || null;
  const startDate = queryParams?.startDate || null;
  const endDate = queryParams?.endDate || null;

  const { polls, tags, stats, paginationInfo }: PollsPaginatedResponse = useApi
    ? await fetchJson(
        `/api/polling/v2/all-polls?network=${network}&pageSize=${pageSize}&page=${page}&orderBy=${orderBy}&status=${status}${
          title ? '&title=' + title : ''
        }${queryTags?.length ? '&tags=' + queryTags.join(',') : ''}${type?.length ? '&type=' + type : ''}${
          startDate ? '&startDate=' + startDate : ''
        }${endDate ? '&endDate=' + endDate : ''}`
      )
    : await getPollsPaginated({
        network,
        pageSize,
        page,
        orderBy,
        status,
        title,
        tags: queryTags,
        type,
        startDate,
        endDate
      });

  const activePollIds = await getActivePollIds(network);

  return {
    polls,
    tags,
    stats,
    paginationInfo,
    activePollIds
  };
}

export async function fetchPollingReviewPageData(
  network: SupportedNetworks,
  useApi = false
): Promise<PollingReviewPageProps> {
  const queryParams = {
    network,
    pageSize: 30,
    page: 1,
    orderBy: PollOrderByEnum.nearestEnd,
    status: PollStatusEnum.active,
    title: null,
    tags: null,
    type: null,
    startDate: null,
    endDate: null
  };

  let hasNextPage = true;
  const polls: PollListItem[] = [];
  let tags: TagCount[] = [];

  while (hasNextPage) {
    const {
      polls: pollsRes,
      paginationInfo,
      tags: TagsRes
    }: PollsPaginatedResponse = useApi
      ? await fetchJson(
          `/api/polling/v2/all-polls?network=${network}&pageSize=${queryParams.pageSize}&page=${queryParams.page}&status=${queryParams.status}`
        )
      : await getPollsPaginated(queryParams);

    polls.push(...pollsRes);

    if (paginationInfo.hasNextPage) {
      queryParams.page++;
    } else {
      tags = TagsRes;
      hasNextPage = false;
    }
  }

  const activePollIds = await getActivePollIds(network);

  return {
    polls,
    activePollIds,
    tags
  };
}
