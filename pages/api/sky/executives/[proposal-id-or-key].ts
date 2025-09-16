/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { NextApiRequest, NextApiResponse } from 'next';
import withApiHandler from 'modules/app/api/withApiHandler';
import { ApiError } from 'modules/app/api/ApiError';
import { SkyExecutiveDetailResponse } from 'modules/executive/types';
import validateQueryParam from 'modules/app/api/validateQueryParam';

async function fetchSkyExecutiveDetail(proposalIdOrKey: string): Promise<SkyExecutiveDetailResponse> {
  try {
    // Validate proposal-id format (kebab-case string or ethereum address)
    const proposalId = validateQueryParam(
      proposalIdOrKey,
      'string',
      { defaultValue: null },
      (id: string) => {
        if (!id || typeof id !== 'string') return false;
        // Allow ethereum addresses (0x followed by 40 hex chars)
        if (/^0x[a-fA-F0-9]{40}$/.test(id)) return true;
        // Allow kebab-case strings (letters, numbers, hyphens, at least 3 chars)
        if (/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id) && id.length >= 3) return true;
        return false;
      },
      new ApiError(
        'Invalid proposal-id format',
        400,
        'Proposal ID must be a valid ethereum address or kebab-case string'
      )
    ) as string;

    const apiUrl = `https://vote.sky.money/api/executive/${proposalId}`;

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

    // Transform string dates to Date objects and convert officeHours to boolean
    if (data.spellData) {
      if (data.spellData.nextCastTime) {
        data.spellData.nextCastTime = new Date(data.spellData.nextCastTime);
      }
      if (data.spellData.datePassed) {
        data.spellData.datePassed = new Date(data.spellData.datePassed);
      }
      if (data.spellData.dateExecuted) {
        data.spellData.dateExecuted = new Date(data.spellData.dateExecuted);
      }
      // Convert officeHours string to boolean
      if (typeof data.spellData.officeHours === 'string') {
        data.spellData.officeHours = data.spellData.officeHours === 'true';
      }
    }

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
