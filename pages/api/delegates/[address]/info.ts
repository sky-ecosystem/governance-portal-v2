/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { NextApiRequest, NextApiResponse } from 'next';
import { fetchSingleDelegateInfo } from 'modules/delegates/api/fetchDelegates';
import { DelegateInfo } from 'modules/delegates/types';
import { DEFAULT_NETWORK, SupportedNetworks } from 'modules/web3/constants/networks';
import withApiHandler from 'modules/app/api/withApiHandler';
import validateQueryParam from 'modules/app/api/validateQueryParam';
import { validateAddress } from 'modules/web3/api/validateAddress';
import { ApiError } from 'modules/app/api/ApiError';

/**
 * @swagger
 * paths:
 *  /api/delegates/{address}/info:
 *    get:
 *      tags:
 *        - "delegates"
 *      description: Returns a delegate's name and metrics
 *      summary: Returns name and metrics for a delegate
 *      parameters:
 *        - name: network
 *          in: query
 *          description: The network for which to fetch the delegate names and metrics
 *          schema:
 *            type: string
 *            enum: [tenderly, mainnet]
 *          default: mainnet
 *        - name: address
 *          in: url
 *          description: The contract address of the delegate to fetch results for
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: A delegate entry with their name and metrics for the given network
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/definitions/DelegateInfo'
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

export default withApiHandler(async (req: NextApiRequest, res: NextApiResponse<DelegateInfo | null>) => {
  const network = validateQueryParam(req.query.network, 'string', {
    defaultValue: DEFAULT_NETWORK.network,
    validValues: [SupportedNetworks.TENDERLY, SupportedNetworks.MAINNET]
  }) as SupportedNetworks;

  const address = await validateAddress(
    req.query.address as string,
    new ApiError('Delegate name and metrics by address, Invalid address', 400, 'Invalid address')
  );

  const delegate = await fetchSingleDelegateInfo(address, network);

  res.setHeader('Cache-Control', 's-maxage=15, stale-while-revalidate');
  res.status(200).json(delegate);
});
