/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { NextApiRequest, NextApiResponse } from 'next';
import { getActivePollIds } from 'modules/polling/api/fetchPolls';
import withApiHandler from 'modules/app/api/withApiHandler';
import { DEFAULT_NETWORK, SupportedNetworks } from 'modules/web3/constants/networks';
import validateQueryParam from 'modules/app/api/validateQueryParam';

/**
 * @swagger
 * paths:
 *  /api/polling/v2/active-poll-ids:
 *    get:
 *      tags:
 *        - "polls"
 *      description: Returns an array of poll ids for active polls.
 *      summary: Returns poll ids for active polls
 *      produces:
 *        - "application/json"
 *      parameters:
 *        - name: network
 *          in: query
 *          description: The network to query the polls for. Defaults to mainnet.
 *          schema:
 *            type: string
 *            enum: [tenderly, mainnet]
 *          default: "mainnet"
 *      responses:
 *        200:
 *          description: A list with the poll ids for all of the active polls for the given network.
 *          content:
 *            application/json:
 *              type: array
 *              items:
 *                type: number
 */

export default withApiHandler(async (req: NextApiRequest, res: NextApiResponse<number[]>) => {
  const network = validateQueryParam(req.query.network, 'string', {
    defaultValue: DEFAULT_NETWORK.network,
    validValues: [SupportedNetworks.TENDERLY, SupportedNetworks.MAINNET]
  }) as SupportedNetworks;

  const activePollIds = await getActivePollIds(network);

  res.setHeader('Cache-Control', 's-maxage=15, stale-while-revalidate');
  res.status(200).json(activePollIds);
});
