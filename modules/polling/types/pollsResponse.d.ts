/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { TagCount } from 'modules/app/types/tag';
import { Poll, PollListItem } from './poll';
import { PollInputFormat } from '../polling.constants';

export type PollFilters = {
  startDate?: Date | null;
  endDate?: Date | null;
  tags?: string[] | null;
  active?: boolean | null;
};

export type PollsResponse = {
  polls: Poll[];
  tags: TagCount[];
  stats: {
    active: number;
    finished: number;
    total: number;
    type?: {
      [PollInputFormat.singleChoice]: number;
      [PollInputFormat.rankFree]: number;
      [PollInputFormat.majority]: number;
      [PollInputFormat.chooseFree]: number;
    };
  };
};

export type PollsPaginatedResponse = {
  paginationInfo: {
    totalCount: number;
    page: number;
    numPages: number;
    hasNextPage: boolean;
  };
  stats: PollsResponse['stats'];
  polls: PollListItem[];
  tags: PollsResponse['tags'];
};

export type PollingPageProps = PollsPaginatedResponse & {
  activePollIds: number[];
};
