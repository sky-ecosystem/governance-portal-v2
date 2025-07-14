/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { request, Variables, RequestDocument } from 'graphql-request';
import logger from 'lib/logger';
import { backoffRetry } from 'lib/utils';
import { ApiError } from 'modules/app/api/ApiError';
import { SupportedChainId } from 'modules/web3/constants/chainID';
import { CHAIN_INFO } from 'modules/web3/constants/networks';

type GqlRequestProps = {
  chainId?: SupportedChainId;
  useSubgraph?: boolean;
  query: RequestDocument;
  variables?: Variables | null;
};

// TODO we'll be able to remove the "any" if we update all the instances of gqlRequest to pass <Query>
export const gqlRequest = async <TQuery = any>({
  chainId,
  useSubgraph = false,
  query,
  variables
}: GqlRequestProps): Promise<TQuery> => {
  try {
    const id = chainId ?? SupportedChainId.MAINNET;
    let url;
    if (useSubgraph) {
      url = CHAIN_INFO[id].subgraphUrl;
      if (!url) {
        url = CHAIN_INFO[SupportedChainId.MAINNET].subgraphUrl;
      }
    } else {
      url = CHAIN_INFO[id].spockUrl;
    }
    if (!url) {
      return Promise.reject(
        new ApiError(`Missing ${useSubgraph ? 'subgraph' : 'spock'} url in configuration for chainId: ${id}`)
      );
    }

    const resp = await backoffRetry(
      1,
      () => request(url, query, variables),
      500,
      (message: string) => {
        logger.debug(`GQL Request: ${message}. --- ${query}`);
      }
    );
    return resp;
  } catch (e) {
    const status = e.response ? e.response.status : 500;
    const errorMessage = e.message;
    const message = `Error on GraphQL query, Chain ID: ${chainId}, query: ${query}, message: ${errorMessage}`;
    throw new ApiError(message, status, 'Error fetching gov polling data');
  }
};
