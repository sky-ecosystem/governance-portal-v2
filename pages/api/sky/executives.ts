/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { NextApiRequest, NextApiResponse } from 'next';
import withApiHandler from 'modules/app/api/withApiHandler';
import { ApiError } from 'modules/app/api/ApiError';
import { SkyExecutiveListItem } from 'modules/executive/types';

// Sky executives API response types
export type SkyExecutivesResponse = SkyExecutiveListItem[];

async function fetchSkyExecutives({
  pageSize = 5,
  page = 1
}: {
  pageSize?: number;
  page?: number;
}): Promise<SkyExecutivesResponse> {
  try {
    const apiUrl = 'https://vote.sky.money/api/executive';
    const url = new URL(apiUrl);
    const start = (page - 1) * pageSize;
    url.searchParams.set('start', start.toString());
    url.searchParams.set('limit', pageSize.toString());

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Add timeout for the request
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      throw new Error(`Sky API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform string dates to Date objects and convert officeHours to boolean
    if (Array.isArray(data)) {
      data.forEach(executive => {
        if (executive.spellData) {
          if (executive.spellData.nextCastTime) {
            executive.spellData.nextCastTime = new Date(executive.spellData.nextCastTime);
          }
          if (executive.spellData.datePassed) {
            executive.spellData.datePassed = new Date(executive.spellData.datePassed);
          }
          if (executive.spellData.dateExecuted) {
            executive.spellData.dateExecuted = new Date(executive.spellData.dateExecuted);
          }
          // Convert officeHours string to boolean
          if (typeof executive.spellData.officeHours === 'string') {
            executive.spellData.officeHours = executive.spellData.officeHours === 'true';
          }
        }
      });
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching Sky executives:', error);
    
    // Return fallback empty data structure
    return [];
  }
}

export default withApiHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
      throw new ApiError('Method not allowed', 405, 'Method not allowed');
    }

    const {
      pageSize = '5',
      page = '1'
    } = req.query;

    // Validate parameters
    const parsedPageSize = parseInt(pageSize as string, 10);
    const parsedPage = parseInt(page as string, 10);

    if (isNaN(parsedPageSize) || parsedPageSize < 1 || parsedPageSize > 50) {
      throw new ApiError('Invalid pageSize. Must be between 1 and 50.', 400, 'Invalid request');
    }

    if (isNaN(parsedPage) || parsedPage < 1) {
      throw new ApiError('Invalid page. Must be greater than 0.', 400, 'Invalid request');
    }

    try {
      const data = await fetchSkyExecutives({
        pageSize: parsedPageSize,
        page: parsedPage
      });

      res.status(200).json(data);
    } catch (error) {
      console.error('Sky executives API error:', error);
      throw new ApiError('Failed to fetch Sky executives data', 500, 'Internal server error');
    }
  }
);
