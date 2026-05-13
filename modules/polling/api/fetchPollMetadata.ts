/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { Poll, PartialPoll } from '../types/poll';

import { backoffRetry, timeoutPromise } from 'lib/utils';
import { matterWrapper } from 'lib/matter';
import { parsePollMetadata } from '../helpers/parsePollMetadata';
import logger from 'lib/logger';

async function fetchPollGithubDocument(url: string): Promise<string> {
  try {
    const document = await timeoutPromise(
      5000, // reject if it takes longer than this to fetch
      backoffRetry(3, () => fetch(url))
    ).then(resp => {
      return resp?.text();
    });

    if (!(document.length > 0 && Object.keys(matterWrapper(document).data?.options)?.length > 0)) {
      throw new Error('Invalid poll document');
    }

    return document;
  } catch (e) {
    throw new Error('Invalid poll document');
  }
}

// Fetches poll metadata and returns null if it's invalid
export async function fetchPollMetadata(
  p: PartialPoll,
  tagsMapping: {
    [key: number]: string[];
  }
): Promise<Poll | null> {
  const document = await fetchPollGithubDocument(p.url);
  const poll = await parsePollMetadata(p, document, tagsMapping);
  // If incorrect data, return null
  if (!poll || !poll.summary || !poll.options) {
    logger.error(`fetchPollMetadata: Poll ${p.pollId} incorrect data `);
    return null;
  }

  // If the poll hasn't started yet return null
  if (new Date(poll.startDate).getTime() > Date.now()) {
    logger.error(`fetchPollMetadata: Poll ${p.pollId} hasn't started yet.`);

    return null;
  }

  return poll;
}
