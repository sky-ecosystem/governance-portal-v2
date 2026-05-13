/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { NextApiRequest, NextApiResponse } from 'next';
import { AddressApiResponse } from 'modules/address/types/addressApiResponse';
import { getAddressInfo } from 'modules/address/api/getAddressInfo';
import withApiHandler from 'modules/app/api/withApiHandler';
import { DEFAULT_NETWORK, SupportedNetworks } from 'modules/web3/constants/networks';
import { ApiError } from 'modules/app/api/ApiError';
import validateQueryParam from 'modules/app/api/validateQueryParam';
import { validateAddress } from 'modules/web3/api/validateAddress';

/**
 * @swagger
 * definitions:
 *   Address:
 *     type: object
 *     properties:
 *       isDelegate:
 *         type: boolean
 *       isProxyContract:
 *         type: boolean
 *       address:
 *         type: string
 *       delegateInfo:
 *         type: object
 *         properties:
 *           voteDelegateAddress:
 *             type: string
 *           id:
 *             type: string
 *           mkrDelegated:
 *             type: number
 *     example:
 *       - address: "0x7a1231231312d76A2aff3b1231231230A4"
 *         isDelegate: true
 *         isProxyContract: false
 *         delegateInfo:
 *           mkrDelegated: 5
 *           voteDelegateAddress: "0x123123213213"
 * /api/address/{address}:
 *   get:
 *     tags:
 *     - "address"
 *     summary: Returns the address info
 *     description: Returns the address info
 *     produces:
 *     - "application/json"
 *     parameters:
 *       - in: path
 *         name: address
 *         schema:
 *           type: string
 *         required: true
 *         description: address to check
 *     responses:
 *       '200':
 *         description: "Detail of an address"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Address'
 */
export default withApiHandler(async (req: NextApiRequest, res: NextApiResponse<AddressApiResponse>) => {
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

  // validate address
  const address = await validateAddress(
    req.query.address as string,
    new ApiError('Invalid address', 400, 'Invalid address')
  );

  const response = await getAddressInfo(address, network);

  res.setHeader('Cache-Control', 's-maxage=15, stale-while-revalidate');
  res.status(200).json(response);
});
