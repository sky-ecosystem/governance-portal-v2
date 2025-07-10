/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { NextApiRequest, NextApiResponse } from 'next';
import withApiHandler from 'modules/app/api/withApiHandler';
import { ApiError } from 'modules/app/api/ApiError';

// Sky polls API response types
export type SkyPollsResponse = {
  paginationInfo: {
    totalCount: number;
    page: number;
    numPages: number;
    hasNextPage: boolean;
  };
  stats: {
    active: number;
    finished: number;
    total: number;
    type: {
      [key: string]: number;
    };
  };
  polls: Array<{
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
    options: any[];
    tags: string[];
    tally?: {
      parameters: {
        victoryConditions: any[];
      };
      results: Array<{
        optionId: number;
        skySupport: string;
        firstPct: number;
      }>;
      totalSkyParticipation: string;
      totalSkyActiveParticipation: string;
      winner: number | null;
      winningOptionName: string | null;
      numVoters: number;
      voteBreakdown: any[];
      victoryConditionMatched?: number;
    };
  }>;
  tags: Array<{
    id: string;
    shortname: string;
    longname: string;
    description: string;
    precedence: number;
    count?: number;
  }>;
};

async function fetchSkyPolls({
  pageSize = 5,
  page = 1
}: {
  pageSize?: number;
  page?: number;
}): Promise<SkyPollsResponse> {
  try {
    const apiUrl = 'https://vote.sky.money/api/polling/all-polls-with-tally';
    const url = new URL(apiUrl);
    url.searchParams.set('pageSize', pageSize.toString());
    url.searchParams.set('page', page.toString());

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
    console.error('Error fetching Sky polls:', error);

    // Return fallback empty data structure
    return {
      paginationInfo: {
        totalCount: 0,
        page: 1,
        numPages: 0,
        hasNextPage: false
      },
      stats: {
        active: 0,
        finished: 0,
        total: 0,
        type: {}
      },
      polls: [],
      tags: []
    };
  }
}

export default withApiHandler(async (req: NextApiRequest, res: NextApiResponse) => {
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
    const data = await fetchSkyPolls({
      pageSize: parsedPageSize,
      page: parsedPage
    });

    res.status(200).json(data);
  } catch (error) {
    console.error('Sky polls API error:', error);
    throw new ApiError('Failed to fetch Sky polls data', 500, 'Internal server error');
  }
});
