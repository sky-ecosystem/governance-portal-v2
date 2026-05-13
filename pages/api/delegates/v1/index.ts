/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { NextApiRequest, NextApiResponse } from 'next';
import { fetchDelegatesPaginated } from 'modules/delegates/api/fetchDelegates';
import { DelegatesAPIResponse } from 'modules/delegates/types';
import { DelegateOrderByEnum, DelegateTypeEnum } from 'modules/delegates/delegates.constants';
import { DEFAULT_NETWORK, SupportedNetworks } from 'modules/web3/constants/networks';
import withApiHandler from 'modules/app/api/withApiHandler';
import validateQueryParam from 'modules/app/api/validateQueryParam';

/**
 * @swagger
 * paths:
 *  /api/delegates/v1:
 *    get:
 *      tags:
 *        - "delegates"
 *      summary: Returns information about all delegates
 *      description: Returns information about all delegates
 *      produces:
 *        - "application/json"
 *      parameters:
 *        - name: "network"
 *          in: "query"
 *          description: "Network name"
 *          required: false
 *          type: "string"
 *          enum: [tenderly, mainnet]
 *          default: "mainnet"
 *        - name: "sortBy"
 *          in: "query"
 *          description: "Sort by criteria"
 *          required: false
 *          type: "string"
 *          enum: [random, mkr, delegators, date]
 *          default: "random"
 *      responses:
 *        200:
 *          description: Returns information about all delegates
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/definitions/DelegatesAPIResponse"
 *
 * definitions:
 *   DelegatesAPIStats:
 *     type: object
 *     properties:
 *       total:
 *         type: number
 *       shadow:
 *         type: number
 *       recognized:
 *         type: number
 *       totalMKRDelegated:
 *         type: string
 *       totalDelegators:
 *         type: number
 *   DelegatesAPIResponse:
 *     type: object
 *     properties:
 *       delegates:
 *         type: array
 *         items:
 *           $ref: "#/definitions/Delegate"
 *       stats:
 *         $ref: "#/definitions/DelegatesAPIStats"
 *       pagination:
 *         type: object
 *         properties:
 *           page:
 *             type: number
 *           pageSize:
 *             type: number
 *   Delegate:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       name:
 *         type: string
 *       address:
 *         type: string
 *       voteDelegateAddress:
 *         type: string
 *       description:
 *         type: string
 *       picture:
 *         type: string
 *       status:
 *         type: string
 *       lastVoteDate:
 *         type: number
 *         nullable: true
 *       expired:
 *         type: boolean
 *       isAboutToExpire:
 *         type: boolean
 *       expirationDate:
 *         type: string
 *         format: date-time
 *       externalUrl:
 *         type: string
 *         nullable: true
 *       combinedParticipation:
 *         type: string
 *       pollParticipation:
 *         type: string
 *       executiveParticipation:
 *         type: string
 *       communication:
 *         type: string
 *       cuMember:
 *         type: boolean
 *       mkrDelegated:
 *         type: string
 *       proposalsSupported:
 *         type: number
 *       execSupported:
 *         $ref: "#/definitions/Executive"
 *       mkrLockedDelegate:
 *         type: array
 *         items:
 *           $ref: "#/definitions/MKRLockedDelegateAPIResponse"
 *       blockTimestamp:
 *         type: string
 *       tags:
 *         type: array
 *         items:
 *           $ref: "#/definitions/Tag"
 *       previous:
 *         type: object
 *         properties:
 *           address:
 *             type: string
 *           voteDelegateAddress:
 *             type: string
 *       next:
 *         type: object
 *         properties:
 *           address:
 *             type: string
 *           voteDelegateAddress:
 *             type: string
 *   MKRLockedDelegateAPIResponse:
 *     type: object
 *     properties:
 *       fromAddress:
 *         type: string
 *       immediateCaller:
 *         type: string
 *       delegateContractAddress:
 *         type: string
 *       lockAmount:
 *         type: string
 *       blockNumber:
 *         type: number
 *       blockTimestamp:
 *         type: string
 *       lockTotal:
 *         type: string
 *       callerLockTotal:
 *         type: string
 *       hash:
 *         type: string
 *   Tag:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       shortname:
 *         type: string
 *       longname:
 *         type: string
 *       description:
 *         type: string
 *       recommend_ui:
 *         type: boolean
 *       related_link:
 *         type: string
 *       precedence:
 *         type: number
 */

export default withApiHandler(async (req: NextApiRequest, res: NextApiResponse<DelegatesAPIResponse>) => {
  const network = validateQueryParam(req.query.network, 'string', {
    defaultValue: DEFAULT_NETWORK.network,
    validValues: [SupportedNetworks.TENDERLY, SupportedNetworks.MAINNET]
  }) as SupportedNetworks;

  const sortBy = validateQueryParam(req.query.sortBy, 'string', {
    defaultValue: 'random',
    validValues: ['random', 'mkr', 'delegators', 'date']
  });

  const sortByMap: { [key: string]: string } = {
    random: DelegateOrderByEnum.RANDOM,
    mkr: DelegateOrderByEnum.MKR,
    delegators: DelegateOrderByEnum.DELEGATORS,
    date: DelegateOrderByEnum.DATE
  };

  const result = await fetchDelegatesPaginated({
    network,
    page: 1,
    pageSize: 10000,
    orderBy: sortByMap[sortBy as string],
    orderDirection: 'desc',
    delegateType: DelegateTypeEnum.ALL,
    searchTerm: null,
    includeExpired: false,
    seed: null
  });

  const response: DelegatesAPIResponse = {
    delegates: result.delegates as any,
    stats: result.stats
  };

  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  res.status(200).json(response);
});
