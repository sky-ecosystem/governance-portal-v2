/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { NextApiRequest, NextApiResponse } from 'next';
import withApiHandler from 'modules/app/api/withApiHandler';
import { ApiError } from 'modules/app/api/ApiError';
import { SkyExecutiveDetailResponse } from 'modules/executive/types';

async function fetchSkyExecutiveDetail(proposalIdOrKey: string): Promise<SkyExecutiveDetailResponse> {
  try {
    const apiUrl = `https://vote.sky.money/api/executive/${proposalIdOrKey}`;

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
    console.error('Error fetching Sky executive detail:', error);
    throw error;
  }
}

export default withApiHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    throw new ApiError('Method not allowed', 405, 'Method not allowed');
  }

  const { 'proposal-id-or-key': proposalIdOrKey } = req.query;

  if (!proposalIdOrKey || typeof proposalIdOrKey !== 'string') {
    throw new ApiError('Proposal ID or key is required', 400, 'Invalid request');
  }

  try {
    const executive = await fetchSkyExecutiveDetail(proposalIdOrKey);
    res.status(200).json(executive);
  } catch (error) {
    console.error('Sky executive detail API error:', error);
    throw new ApiError('Failed to fetch Sky executive details', 500, 'Internal server error');
  }
});