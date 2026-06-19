/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { NextApiRequest, NextApiResponse } from 'next';
import withApiHandler from 'modules/app/api/withApiHandler';
import { ApiError } from 'modules/app/api/ApiError';
import { fetchSkyExecutiveDetail } from 'modules/executive/api/fetchSkyExecutiveDetail';

export default withApiHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    throw new ApiError('Method not allowed', 405, 'Method not allowed');
  }

  const { proposalIdOrKey } = req.query;

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
