/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { Poll } from './poll';
import { PollTallyVote } from './pollTally';

export type PollVoteHistory = PollTallyVote & {
  poll: Poll;
  optionValue: string[];
};
