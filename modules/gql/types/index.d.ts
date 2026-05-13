/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { QueryActivePollsArgs } from '../generated/graphql';

// More filter types can be included here as we add them
export type PollsQueryVariables = Partial<QueryActivePollsArgs>;

type ActiveGenFn = ({ endDate }: { endDate: number }) => Partial<QueryActivePollsArgs>;
type PollIdGenFn = ({ pollId }: { pollId: number }) => Partial<QueryActivePollsArgs>;
type RangeGenFn = ({ start, end }: { start: number; end: number }) => Partial<QueryActivePollsArgs>;
type MultiHashGenFn = ({ multiHash }: { multiHash: string }) => Partial<QueryActivePollsArgs>;

type QueryFilterList = {
  active: ActiveGenFn;
  pollId: PollIdGenFn;
  range: RangeGenFn;
  multiHash: MultiHashGenFn;
};

type FilterNames = keyof QueryFilterList;
