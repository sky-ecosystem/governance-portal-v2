/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { NextApiRequest, NextApiResponse } from 'next';
import { DEFAULT_NETWORK, SupportedNetworks } from 'modules/web3/constants/networks';
import withApiHandler from 'modules/app/api/withApiHandler';
import logger from 'lib/logger';
import { getCacheInfo } from 'modules/cache/cache';
import {
  delegatesGithubCacheKey,
  allDelegatesCacheKey,
  executiveSupportersCacheKey,
  getAllPollsCacheKey,
  executiveProposalsCacheKey
} from 'modules/cache/constants/cache-keys';
import { ApiError } from 'modules/app/api/ApiError';
import validateQueryParam from 'modules/app/api/validateQueryParam';

// fetches cache info for constant keys
export default withApiHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  // validate network
  const network = validateQueryParam(
    (req.query.network as SupportedNetworks) || DEFAULT_NETWORK.network,
    'string',
    {
      defaultValue: null,
      validValues: [SupportedNetworks.TENDERLY, SupportedNetworks.MAINNET]
    },
    n => !!n,
    new ApiError('Invalid network', 400, 'Invalid network')
  ) as SupportedNetworks;

  // keys to check
  const allowedCacheKeys = [
    getAllPollsCacheKey(),
    executiveProposalsCacheKey,
    executiveSupportersCacheKey,
    delegatesGithubCacheKey,
    allDelegatesCacheKey
  ];

  try {
    const promises = await Promise.all(allowedCacheKeys.map(key => getCacheInfo(key, network)));
    const response = {};
    promises.map((key, index) => {
      response[allowedCacheKeys[index]] = key;
    });

    return res.status(200).json({
      ...response
    });
  } catch (e) {
    logger.error(`cache-info: ${e.message}`);
    return res.status(200).json({
      error: 'unknown'
    });
  }
});
