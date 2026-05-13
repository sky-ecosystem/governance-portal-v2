/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { NextApiRequest, NextApiResponse } from 'next';
import withApiHandler from 'modules/app/api/withApiHandler';
import { DEFAULT_NETWORK, SupportedNetworks } from 'modules/web3/constants/networks';
import validateQueryParam from 'modules/app/api/validateQueryParam';

export type HatInfoResponse = {
  hatAddress: string;
  skyOnHat: string;
  network: string;
};

/**
 * @swagger
 * /api/executive/hat:
 *   get:
 *     tags:
 *       - "executive"
 *     summary: Get the current hat address and SKY amount on it
 *     description: Returns the current hat address (governing proposal) and the total SKY supporting it from external API
 *     parameters:
 *       - name: network
 *         in: query
 *         description: The Ethereum network to query
 *         required: false
 *         schema:
 *           type: string
 *           enum: [mainnet, tenderly]
 *           default: mainnet
 *     responses:
 *       200:
 *         description: Hat information including address and SKY amount
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 hatAddress:
 *                   type: string
 *                   description: The address of the current hat (governing proposal)
 *                 skyOnHat:
 *                   type: string
 *                   description: The total SKY amount supporting the hat (in wei)
 *                 network:
 *                   type: string
 *                   description: The network this data is from
 *       500:
 *         description: Error fetching data from external API
 */
export default withApiHandler(async (req: NextApiRequest, res: NextApiResponse<HatInfoResponse>) => {
  const network = validateQueryParam(req.query.network, 'string', {
    defaultValue: DEFAULT_NETWORK.network,
    validValues: [SupportedNetworks.TENDERLY, SupportedNetworks.MAINNET]
  }) as SupportedNetworks;

  try {
    const externalUrl = `https://vote.sky.money/api/executive/hat?network=${network}`;

    const response = await fetch(externalUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      // Add timeout to prevent hanging requests
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });

    if (!response.ok) {
      throw new Error(`External API responded with status: ${response.status}`);
    }

    const data = await response.json();

    // Validate the response structure
    if (!data.hatAddress || !data.skyOnHat || !data.network) {
      throw new Error('Invalid response structure from external API');
    }

    // Set cache headers - shorter cache since we're proxying external data
    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate');
    res.status(200).json(data);
  } catch (error) {
    // Log the error for debugging
    console.error('Error fetching hat data from external API:', error);

    // Return a more user-friendly error
    throw new Error(`Failed to fetch hat information from external API: ${error.message}`);
  }
});
