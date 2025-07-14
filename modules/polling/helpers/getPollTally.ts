/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { SupportedNetworks } from 'modules/web3/constants/networks';
import { cacheSet } from 'modules/cache/cache';
import { fetchPollTally } from 'modules/polling/api/fetchPollTally';
import { Poll, PollTally } from 'modules/polling/types';
import { getPollTallyCacheKey } from 'modules/cache/constants/cache-keys';
import { pollHasEnded } from './utils';
import { ONE_WEEK_IN_MS, ONE_MINUTE_IN_MS } from 'modules/app/constants/time';

export async function getPollTally(poll: Poll, network: SupportedNetworks): Promise<PollTally> {
  // Builds poll tally
  const tally: PollTally = await fetchPollTally(poll, network);

  const pollEnded = pollHasEnded(poll);

  const cacheKey = getPollTallyCacheKey(poll.pollId);
  cacheSet(cacheKey, JSON.stringify(tally), network, pollEnded ? ONE_WEEK_IN_MS : ONE_MINUTE_IN_MS);

  return tally;
}
