/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { NextApiRequest, NextApiResponse } from 'next';
import { getExecutiveProposals } from 'modules/executive/api/fetchExecutives';
import { Proposal } from 'modules/executive/types';
import withApiHandler from 'modules/app/api/withApiHandler';
import { DEFAULT_NETWORK, SupportedNetworks } from 'modules/web3/constants/networks';
import validateQueryParam from 'modules/app/api/validateQueryParam';

/**
 * @swagger
 * definitions:
 *   ArrayOfExecutives:
 *     type: array
 *     items:
 *       $ref: '#/definitions/Executive'
 * /api/executive:
 *   get:
 *     tags:
 *     - "executive"
 *     summary: Returns all executive proposals
 *     description: Returns all executive proposals
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "network"
 *       in: "query"
 *       description: "Network"
 *       required: false
 *       type: "array"
 *       items:
 *         type: "string"
 *         enum:
 *         - "mainnet"
 *         default: ""
 *     - name: "start"
 *       in: "query"
 *       description: "start index"
 *       required: false
 *       type: "number"
 *       default: 0
 *     - name: "limit"
 *       in: "query"
 *       description: "limit index"
 *       required: false
 *       type: "number"
 *       default: 10
 *     - name: "active"
 *       in: "query"
 *       description: "Filter by active"
 *       required: false
 *       type: "boolean"
 *       collectionFormat: "multi"
 *     responses:
 *       '200':
 *         description: "List of executives"
 *         content:
 *           application/json:
 *             type: object
 *             properties:
 *               total:
 *                 type: "number"
 *               proposals:
 *                 schema:
 *                   $ref: '#/definitions/ArrayOfExecutives'
 */
export default withApiHandler(async (req: NextApiRequest, res: NextApiResponse<Proposal[]>) => {
  const network = validateQueryParam(req.query.network, 'string', {
    defaultValue: DEFAULT_NETWORK.network,
    validValues: [SupportedNetworks.TENDERLY, SupportedNetworks.MAINNET]
  }) as SupportedNetworks;

  const start = validateQueryParam(req.query.start, 'number', {
    defaultValue: 0,
    minValue: 0
  }) as number;

  const limit = validateQueryParam(req.query.limit, 'number', {
    defaultValue: 5,
    minValue: 1,
    maxValue: 30
  }) as number;

  const sortBy = validateQueryParam(req.query.sortBy, 'string', {
    defaultValue: 'active',
    validValues: ['date', 'mkr', 'active']
  });

  const startDate = validateQueryParam(req.query.startDate, 'number', {
    defaultValue: 0
  }) as number;

  const endDate = validateQueryParam(req.query.endDate, 'number', {
    defaultValue: 0
  }) as number;

  const response = await getExecutiveProposals({
    start,
    limit,
    startDate,
    endDate,
    network: network as SupportedNetworks,
    ...(sortBy !== null && { sortBy: sortBy as 'date' | 'mkr' | 'active' })
  });

  res.setHeader('Cache-Control', 's-maxage=15, stale-while-revalidate');
  res.status(200).json(response);
});
