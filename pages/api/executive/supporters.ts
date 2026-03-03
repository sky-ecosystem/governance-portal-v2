/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

/**
 * @swagger
 * /api/executive/supporters:
 *   get:
 *     summary: Get the supporters of all executive spells
 *     description: Returns the list of supporters for each executive spell. Supports mainnet and tenderly networks.
 *     tags:
 *       - executive
 *     parameters:
 *       - name: network
 *         in: query
 *         description: The Ethereum network to use.
 *         schema:
 *           type: string
 *         enum:
 *           - tenderly
 *           - mainnet
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 {EXECUTIVE_SPELL}:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       address:
 *                         type: string
 *                       support:
 *                         type: string
 *                       votes:
 *                         type: string
 *                       percent:
 *                         type: string
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */

import { NextApiRequest, NextApiResponse } from 'next';
import withApiHandler from 'modules/app/api/withApiHandler';
import allSupporters from 'modules/executive/data/supporters.json';

export default withApiHandler(async (_req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  res.status(200).json(allSupporters);
});
