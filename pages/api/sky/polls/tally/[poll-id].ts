/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { NextApiRequest, NextApiResponse } from 'next';
import withApiHandler from 'modules/app/api/withApiHandler';
import { ApiError } from 'modules/app/api/ApiError';

// Sky poll tally response type
export type SkyPollTallyResponse = {
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

async function fetchSkyPollTally(pollId: string, network = 'mainnet'): Promise<SkyPollTallyResponse> {
  try {
    const apiUrl = `https://vote.sky.money/api/polling/tally/${pollId}`;
    const url = new URL(apiUrl);
    url.searchParams.set('network', network);

    const response = await fetch(url.toString(), {
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
    console.error('Error fetching Sky poll tally:', error);
    throw error;
  }
}

export default withApiHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    throw new ApiError('Method not allowed', 405, 'Method not allowed');
  }

  const { 'poll-id': pollId, network = 'mainnet' } = req.query;

  if (!pollId || typeof pollId !== 'string') {
    throw new ApiError('Poll ID is required', 400, 'Invalid request');
  }

  if (typeof network !== 'string') {
    throw new ApiError('Network must be a string', 400, 'Invalid request');
  }

  try {
    const tally = await fetchSkyPollTally(pollId, network);

    // Set cache headers for 60 seconds
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=120');

    res.status(200).json(tally);
  } catch (error) {
    console.error('Sky poll tally API error:', error);
    throw new ApiError('Failed to fetch Sky poll tally', 500, 'Internal server error');
  }
});
