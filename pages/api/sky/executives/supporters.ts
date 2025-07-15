/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { NextApiRequest, NextApiResponse } from 'next';
import withApiHandler from 'modules/app/api/withApiHandler';
import { ApiError } from 'modules/app/api/ApiError';

// Sky executive supporters API response type
export type SkyExecutiveSupportersResponse = {
  [spellAddress: string]: {
    address: string;
    deposits: string;
    percent: string;
  }[];
};

async function fetchSkyExecutiveSupporters(): Promise<SkyExecutiveSupportersResponse> {
  try {
    const apiUrl = 'https://vote.sky.money/api/executive/supporters';
    
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
    console.error('Error fetching Sky executive supporters:', error);
    throw error;
  }
}

export default withApiHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    throw new ApiError('Method not allowed', 405, 'Method not allowed');
  }

  // Set cache headers for 5 minutes
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');

  try {
    const supporters = await fetchSkyExecutiveSupporters();
    res.status(200).json(supporters);
  } catch (error) {
    console.error('Sky executive supporters API error:', error);
    throw new ApiError('Failed to fetch Sky executive supporters', 500, 'Internal server error');
  }
});