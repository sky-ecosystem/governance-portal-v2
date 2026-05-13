/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { NextApiRequest, NextApiResponse } from 'next';
import validateQueryParam from 'modules/app/api/validateQueryParam';
import { fetchDelegationEventsByAddresses } from 'modules/delegates/api/fetchDelegationEventsByAddresses';
import withApiHandler from 'modules/app/api/withApiHandler';
import { DEFAULT_NETWORK, SupportedNetworks } from 'modules/web3/constants/networks';
import { getAddressDelegationHistoryCacheKey } from 'modules/cache/constants/cache-keys';
import { cacheGet, cacheSet } from 'modules/cache/cache';
import { TEN_MINUTES_IN_MS } from 'modules/app/constants/time';
import { ApiError } from 'modules/app/api/ApiError';
import { validateAddress } from 'modules/web3/api/validateAddress';

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

  const address = await validateAddress(
    req.query.address as string,
    new ApiError('Invalid address', 400, 'Invalid address')
  );

  const cacheKey = getAddressDelegationHistoryCacheKey(address);
  const cachedResponse = await cacheGet(cacheKey, network);

  if (cachedResponse) {
    return res.status(200).json(JSON.parse(cachedResponse));
  }

  const data = await fetchDelegationEventsByAddresses([address], network);
  res.setHeader('Cache-Control', 's-maxage=15, stale-while-revalidate');

  cacheSet(cacheKey, JSON.stringify(data), network, TEN_MINUTES_IN_MS);
  res.status(200).json(data);
});
