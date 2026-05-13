/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { NextApiRequest, NextApiResponse } from 'next';
import { fetchDelegatedTo } from 'modules/delegates/api/fetchDelegatedTo';
import {
  DelegateInfo,
  DelegationHistory,
  DelegationHistoryWithExpirationDate
} from 'modules/delegates/types';
import withApiHandler from 'modules/app/api/withApiHandler';
import { DEFAULT_NETWORK, SupportedNetworks } from 'modules/web3/constants/networks';
import { networkNameToChainId } from 'modules/web3/helpers/chain';
import { getVoteProxyAddresses } from 'modules/app/helpers/getVoteProxyAddresses';
import { ApiError } from 'modules/app/api/ApiError';
import validateQueryParam from 'modules/app/api/validateQueryParam';
import { validateAddress } from 'modules/web3/api/validateAddress';
import { fetchDelegatesInfo } from 'modules/delegates/api/fetchDelegates';
import { voteProxyFactoryAddress } from 'modules/contracts/generated';
import { voteProxyAbi } from 'modules/contracts/ethers/abis';
import { formatEther, parseEther } from 'viem';

/**
 * @swagger
 * /api/address/{address}/delegations:
 *  get:
 *    tags:
 *      - "address"
 *    description: Returns a list of delegates an address has delegated to along with the delegations for each delegate
 *    summary: Returns the list of delegations for an address
 *    parameters:
 *      - in: path
 *        name: address
 *        description: Address to check
 *        schema:
 *          type: string
 *        required: true
 *      - in: query
 *        name: network
 *        description: The network for which to fetch de delegations and delegates
 *        schema:
 *          type: string
 *          enum: [tenderly, mainnet]
 *        default: mainnet
 *    responses:
 *      200:
 *        description: A list of delegates an address has delegated to along with the delegations for each delegate
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/MKRAddressDelegationsAPIResponse'
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
 *          - recognized
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
 *  DelegationHistoryEvent:
 *    type: object
 *    properties:
 *      lockAmount:
 *        type: string
 *      blockTimestamp:
 *        type: string
 *        format: date-time
 *      hash:
 *        type: string
 *  DelegationHistory:
 *    type: object
 *    properties:
 *      address:
 *        type: string
 *      lockAmount:
 *        type: string
 *      events:
 *        type: array
 *        items:
 *          $ref: '#/definitions/DelegationHistoryEvent'
 *  MKRAddressDelegationsAPIResponse:
 *    type: object
 *    properties:
 *      totalDelegated:
 *        type: number
 *      delegatedTo:
 *        type: array
 *        items:
 *          $ref: '#/definitions/DelegationHistory'
 *      delegates:
 *        type: array
 *        items:
 *          $ref: '#/definitions/DelegateInfo'
 */

export type MKRAddressDelegationsAPIResponse = {
  totalDelegated: number;
  delegatedTo: DelegationHistory[];
  delegates: DelegateInfo[];
};

export default withApiHandler(
  async (req: NextApiRequest, res: NextApiResponse<MKRAddressDelegationsAPIResponse>) => {
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
    const chainId = networkNameToChainId(network);

    const proxyInfo = await getVoteProxyAddresses(
      voteProxyFactoryAddress[chainId],
      voteProxyAbi,
      address,
      network
    );

    // if hasProxy, we need to combine the delegation history of hot, cold, proxy
    let delegatedTo: DelegationHistoryWithExpirationDate[];

    if (proxyInfo.hasProxy && proxyInfo.coldAddress && proxyInfo.hotAddress && proxyInfo.voteProxyAddress) {
      const [coldHistory, hotHistory, proxyHistory] = await Promise.all([
        fetchDelegatedTo(proxyInfo.coldAddress, network),
        fetchDelegatedTo(proxyInfo.hotAddress, network),
        fetchDelegatedTo(proxyInfo.voteProxyAddress, network)
      ]);
      delegatedTo = coldHistory.concat(hotHistory).concat(proxyHistory);
    } else {
      delegatedTo = await fetchDelegatedTo(address, network);
    }

    // filter out duplicate txs
    const txHashes = {};
    const filtered = delegatedTo
      .filter(historyItem => {
        let duplicateFound = false;
        historyItem.events.forEach(event => {
          if (txHashes[event.hash]) duplicateFound = true;
          txHashes[event.hash] = true;
        });
        return !duplicateFound;
      })
      .map(({ address, lockAmount, events }) => ({ address, lockAmount, events }));

    const delegatesInfo = await fetchDelegatesInfo(network, false);
    const delegatesDelegatedTo = delegatesInfo.filter(({ voteDelegateAddress }) =>
      filtered.some(({ address }) => address.toLowerCase() === voteDelegateAddress.toLowerCase())
    );
    const delegatesAndNextContracts = [
      ...delegatesDelegatedTo,
      ...(delegatesDelegatedTo
        .map(({ next }) =>
          delegatesInfo.find(
            d => d.voteDelegateAddress.toLowerCase() === next?.voteDelegateAddress.toLowerCase()
          )
        )
        .filter(delegate => !!delegate) as DelegateInfo[])
    ];

    const totalDelegated = filtered.reduce((prev, next) => {
      return prev + parseEther(next.lockAmount);
    }, 0n);

    res.setHeader('Cache-Control', 's-maxage=15, stale-while-revalidate');
    res.status(200).json({
      totalDelegated: +formatEther(totalDelegated),
      delegatedTo: filtered,
      delegates: delegatesAndNextContracts
    });
  }
);
