/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { NextApiRequest, NextApiResponse } from 'next';
import validateQueryParam from 'modules/app/api/validateQueryParam';
import { getExecutiveProposal } from 'modules/executive/api/fetchExecutives';
import { CMSProposal } from 'modules/executive/types';
import { NotFoundResponse } from 'modules/app/types/genericApiResponse';
import withApiHandler from 'modules/app/api/withApiHandler';
import { DEFAULT_NETWORK, SupportedNetworks } from 'modules/web3/constants/networks';
import { ApiError } from 'modules/app/api/ApiError';

/**
 * @swagger
 * definitions:
 *   Executive:
 *     type: object
 *     properties:
 *       about:
 *         type: string
 *       content:
 *         type: string
 *       title:
 *         type: string
 *       proposalBlurb:
 *         type: string
 *       key:
 *         type: string
 *       address:
 *         type: string
 *       date:
 *         type: string
 *       active:
 *         type: boolean
 *       proposalLink:
 *         type: string
 *     example:
 *       - about: "markdown"
 *         content: 'markdown'
 *         title: "The example executive"
 *         proposalBlurb: "Example"
 *         key: "executive-number-3"
 *         address: '0x000000'
 *         date: "Fri Sep 17 2021 00:00:00 GMT+0000 (Coordinated Universal Time)"
 *         active: false
 *         proposalLink: 'https://linktogithubrawcontent'
 *
 * /api/executive/{key}:
 *   get:
 *     tags:
 *     - "executive"
 *     summary: Returns a executive detail
 *     description: Returns a executive detail
 *     produces:
 *     - "application/json"
 *     parameters:
 *       - in: path
 *         name: key
 *         schema:
 *           type: string
 *         required: true
 *         description: Key of the executive
 *     responses:
 *       '200':
 *         description: "Detail of a Executive"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/definitions/Executive'
 */
export default withApiHandler(
  async (req: NextApiRequest, res: NextApiResponse<CMSProposal | NotFoundResponse>) => {
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

    // TODO what kind of validation can we apply on the proposal-id?
    const proposalId = req.query['proposal-id'] as string;

    const response = await getExecutiveProposal(proposalId, network);

    if (!response) {
      throw new ApiError(`GET /api/executive/${proposalId}`, 404, 'Proposal not found');
    }

    res.setHeader('Cache-Control', 's-maxage=15, stale-while-revalidate');
    res.status(200).json(response);
  }
);
