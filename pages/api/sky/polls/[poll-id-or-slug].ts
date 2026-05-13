/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { NextApiRequest, NextApiResponse } from 'next';
import withApiHandler from 'modules/app/api/withApiHandler';
import { ApiError } from 'modules/app/api/ApiError';

// Sky poll detail response type
export type SkyPollDetailResponse = {
  pollId: number;
  startDate: string;
  endDate: string;
  multiHash: string;
  slug: string;
  url: string;
  discussionLink: string;
  type: string;
  parameters: {
    inputFormat: {
      type: string;
      abstain: number[];
      options: any[];
    };
    victoryConditions: any[];
    resultDisplay: string;
  };
  title: string;
  summary: string;
  content: string; // HTML content for poll details
  options: {
    [key: string]: string;
  };
  tags: Array<{
    id: string;
    shortname: string;
    longname: string;
    description: string;
    precedence: number;
  }>;
  tally?: {
    parameters: {
      inputFormat: {
        type: string;
        abstain: number[];
        options: any[];
      };
      resultDisplay: string;
      victoryConditions: any[];
    };
    results: Array<{
      optionId: number;
      winner: boolean;
      skySupport: string;
      optionName: string;
      transfer: string;
      firstPct: number;
      transferPct: number;
    }>;
    totalSkyParticipation: string;
    totalSkyActiveParticipation: string;
    winner: number | null;
    winningOptionName: string | null;
    numVoters: number;
    victoryConditionMatched?: number;
    votesByAddress: Array<{
      skySupport: string;
      ballot: number[];
      pollId: number;
      voter: string;
      chainId: number;
      blockTimestamp: string;
      hash: string;
    }>;
  };
  ctx?: {
    prev: { slug: string } | null;
    next: { slug: string } | null;
  };
};

async function fetchSkyPollDetail(pollIdOrSlug: string): Promise<SkyPollDetailResponse> {
  try {
    const apiUrl = `https://vote.sky.money/api/polling/${pollIdOrSlug}`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      // Add timeout for the request
      signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) {
      throw new Error(`Sky API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Sky poll detail:', error);
    throw error;
  }
}

export default withApiHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    throw new ApiError('Method not allowed', 405, 'Method not allowed');
  }

  const { 'poll-id-or-slug': pollIdOrSlug } = req.query;

  if (!pollIdOrSlug || typeof pollIdOrSlug !== 'string') {
    throw new ApiError('Poll ID or slug is required', 400, 'Invalid request');
  }

  try {
    const poll = await fetchSkyPollDetail(pollIdOrSlug);
    res.status(200).json(poll);
  } catch (error) {
    console.error('Sky poll detail API error:', error);
    throw new ApiError('Failed to fetch Sky poll details', 500, 'Internal server error');
  }
});