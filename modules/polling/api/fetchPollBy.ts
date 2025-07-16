/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { cacheGet } from 'modules/cache/cache';
import { SupportedNetworks } from 'modules/web3/constants/networks';
import { Poll } from '../types';
import { pollDetailsCacheKey, pollSlugToIdsCacheKey } from 'modules/cache/constants/cache-keys';
import { checkCachedPollsValidity, refetchPolls } from './fetchPolls';
import { ONE_WEEK_IN_MS } from 'modules/app/constants/time';

export async function fetchSinglePoll(
  network: SupportedNetworks,
  pollIdOrSlug: number | string
): Promise<Poll | null> {
  if (!pollIdOrSlug) {
    return null;
  }

  const { valid: cachedPollsAreValid, hash: githubHash } = await checkCachedPollsValidity(network);

  if (cachedPollsAreValid) {
    const pollSlugToIdsString = await cacheGet(pollSlugToIdsCacheKey, network, ONE_WEEK_IN_MS);

    if (!pollSlugToIdsString) {
      return null;
    }

    const pollSlugToIds = JSON.parse(pollSlugToIdsString);

    const parsedPollIdentifier = typeof pollIdOrSlug === 'number' ? pollIdOrSlug : parseInt(pollIdOrSlug);
    // If it's a number, the parameter passed is a pollId. If not, it's a pollSlug
    const pollId: number | null = !Number.isNaN(parsedPollIdentifier)
      ? parsedPollIdentifier
      : pollSlugToIds.find(p => p[0] === pollIdOrSlug)?.[1] || null;

    if (!pollId) {
      return null;
    }

    const cachedPoll = await cacheGet(pollDetailsCacheKey, network, ONE_WEEK_IN_MS, 'HGET', String(pollId));
    if (cachedPoll) {
      return JSON.parse(cachedPoll);
    } else {
      return null;
    }
  }

  const { allPolls } = await refetchPolls(network, githubHash as string);

  // Convert to number if it's a numeric string
  const parsedId = typeof pollIdOrSlug === 'string' ? parseInt(pollIdOrSlug) : pollIdOrSlug;
  const isNumericId = !Number.isNaN(parsedId);

  return allPolls.find(poll => 
    (isNumericId && poll.pollId === parsedId) || poll.slug === pollIdOrSlug
  ) || null;
}
