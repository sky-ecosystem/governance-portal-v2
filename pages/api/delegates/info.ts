/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { NextApiRequest, NextApiResponse } from 'next';
import { fetchDelegatesInfo } from 'modules/delegates/api/fetchDelegates';
import { DelegateInfo } from 'modules/delegates/types';
import { DEFAULT_NETWORK, SupportedNetworks } from 'modules/web3/constants/networks';
import withApiHandler from 'modules/app/api/withApiHandler';
import validateQueryParam from 'modules/app/api/validateQueryParam';

/**
 * @swagger
 * paths:
 *  /api/delegates/info:
 *    get:
 *      tags:
 *        - "delegates"
 *      description: Returns a list of aligned delegates names and metrics
 *      summary: Returns names and metrics for aligned delegates
 *      parameters:
 *        - name: network
 *          in: query
 *          description: The network for which to fetch the delegate names and metrics
 *          schema:
 *            type: string
 *            enum: [tenderly, mainnet]
 *          default: mainnet
 *      responses:
 *        200:
 *          description: A list of delegate names and metrics for the given network
 *          content:
 *            application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/definitions/DelegateInfo'
 * definitions:
 *  DelegateInfo:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *      picture:
 *        type: string
 *      address:
 *        type: string
 *      voteDelegateAddress:
 *        type: string
 *      status:
 *        type: string
 *        enum:
 *          - aligned
 *          - expired
 *          - shadow
 *      cuMember:
 *        type: boolean
 *      pollParticipation:
 *        type: string
 *      executiveParticipation:
 *        type: string
 *      combinedParticipation:
 *        type: string
 *      communication:
 *        type: string
 *      blockTimestamp:
 *        type: string
 *        format: date-time
 *      expirationDate:
 *        type: string
 *        format: date-time
 *      expired:
 *        type: boolean
 *      isAboutToExpire:
 *        type: boolean
 *      previous:
 *        type: object
 *        properties:
 *          address:
 *            type: string
 *      next:
 *        type: object
 *        properties:
 *          address:
 *            type: string
 *    required:
 *      - name
 *      - address
 *      - voteDelegateAddress
 *      - status
 *      - blockTimestamp
 *      - expirationDate
 *      - expired
 *      - isAboutToExpire
 */

export default withApiHandler(async (req: NextApiRequest, res: NextApiResponse<DelegateInfo[]>) => {
  const network = validateQueryParam(req.query.network, 'string', {
    defaultValue: DEFAULT_NETWORK.network,
    validValues: [SupportedNetworks.TENDERLY, SupportedNetworks.MAINNET]
  }) as SupportedNetworks;

  const delegates = await fetchDelegatesInfo(network, false);
  res.setHeader('Cache-Control', 's-maxage=15, stale-while-revalidate');
  res.status(200).json(delegates);
});
