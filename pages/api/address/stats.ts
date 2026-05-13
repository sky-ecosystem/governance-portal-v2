/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import invariant from 'tiny-invariant';
import { NextApiRequest, NextApiResponse } from 'next';
import { isSupportedNetwork } from 'modules/web3/helpers/networks';
import { AddressAPIStats } from 'modules/address/types/addressApiResponse';
import { fetchAddressPollVoteHistory } from 'modules/polling/api/fetchAddressPollVoteHistory';
import withApiHandler from 'modules/app/api/withApiHandler';
import { DEFAULT_NETWORK, SupportedNetworks } from 'modules/web3/constants/networks';
import { getAddressStatsCacheKey } from 'modules/cache/constants/cache-keys';
import { cacheGet, cacheSet } from 'modules/cache/cache';
import { TEN_MINUTES_IN_MS } from 'modules/app/constants/time';
import { ApiError } from 'modules/app/api/ApiError';
import validateQueryParam from 'modules/app/api/validateQueryParam';
import { validateAddress } from 'modules/web3/api/validateAddress';

/**
 * @swagger
 * definitions:
 *   ArrayOfVoteHistory:
 *     type: array
 *     items:
 *       $ref: '#/definitions/VoteHistory'
 *   VoteHistory:
 *     type: object
 *     properties:
 *       pollId:
 *         type: integer
 *       blockTimestamp:
 *         type: string
 *       option:
 *         type: number
 *       optionValue:
 *         type: array
 *         items:
 *           type: string
 *       ballot:
 *         type: array
 *         items:
 *           type: integer
 *       poll:
 *         $ref: '#/definitions/Poll'
 *     example:
 *       - pollId: 1
 *         blockTimestamp: "2021-11-20T19:25:47+00:00"
 *         option: 1
 *         optionValue: ["Yes"]
 *         ballot: [1]
 *         poll:
 *           pollId: 1
 *   AddressStats:
 *     type: object
 *     properties:
 *       pollVoteHistory:
 *         $ref: '#/definitions/ArrayOfVoteHistory'
 *       lastVote:
 *         $ref: '#/definitions/VoteHistory'
 *
 * /api/address/stats:
 *   get:
 *     tags:
 *     - "address"
 *     summary: Returns stats for address
 *     description: Returns stats for address
 *     produces:
 *     - "application/json"
 *     parameters:
 *       - in: query
 *         name: address
 *         schema:
 *           type: string
 *         required: true
 *         description: Address to check
 *     responses:
 *       '200':
 *         description: "Stats of the address"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/AddressStats'
 *
 */
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

  // Make sure the address exists
  const tmpAddresses = typeof req.query.address === 'string' ? [req.query.address] : req.query.address || [];
  const addresses = await Promise.all(
    tmpAddresses
      ?.filter(i => !!i)
      .map(tmpAddress =>
        validateAddress(tmpAddress, new ApiError('Address stats, Invalid address', 400, 'Invalid address'))
      )
  );

  invariant(isSupportedNetwork(network), `unsupported network ${network}`);

  const cacheKey = getAddressStatsCacheKey(addresses);

  const cachedResponse = await cacheGet(cacheKey, network);
  if (cachedResponse) {
    return res.status(200).json(JSON.parse(cachedResponse));
  }

  const pollVoteHistories = await Promise.all(
    addresses.map(async (address: string) => {
      const pollVoteHistory = await fetchAddressPollVoteHistory(address, network);

      return pollVoteHistory;
    })
  );

  const combinedPollVoteHistory = pollVoteHistories.flat();
  const response: AddressAPIStats = {
    pollVoteHistory: combinedPollVoteHistory,
    lastVote: combinedPollVoteHistory.sort((a, b) => (a.blockTimestamp > b.blockTimestamp ? -1 : 1))[0]
  };

  res.setHeader('Cache-Control', 's-maxage=15, stale-while-revalidate');
  cacheSet(cacheKey, JSON.stringify(response), network, TEN_MINUTES_IN_MS);
  res.status(200).json(response);
});
