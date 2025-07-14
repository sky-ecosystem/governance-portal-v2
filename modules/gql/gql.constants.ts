/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

/* Spock URLs */
export const LOCAL_SPOCK_URL = 'http://localhost:3001/v1';
export const STAGING_MAINNET_SPOCK_URL = 'https://pollingdb2-mainnet-staging.makerdao.com/api/v1';
export const MAINNET_SPOCK_URL = 'https://pollingdb2-mainnet-prod.makerdao.com/api/v1';
export const TENDERLY_SPOCK_URL = 'https://pollingdb2-tenderly-staging.makerdao.com/api/v1';

/* Subgraph URLs */

// const usePrivateSubgraph = process.env.USE_PRIVATE_SUBGRAPH === 'true';
// const permission = usePrivateSubgraph ? 'private' : 'public';
export const TENDERLY_SUBGRAPH_URL =
  'https://query-subgraph-staging.sky.money/subgraphs/name/jetstreamgg/sky-subgraph-testnet';
export const MAINNET_STAGING_SUBGRAPH_URL =
  'https://query-subgraph-staging.sky.money/subgraphs/name/jetstreamgg/sky-subgraph-mainnet';
export const MAINNET_PROD_SUBGRAPH_URL =
  'https://query-subgraph.sky.money/subgraphs/name/jetstreamgg/sky-subgraph-mainnet';

export enum QueryFilterNames {
  Active = 'active',
  PollId = 'pollId',
  Range = 'range',
  MultiHash = 'multiHash'
}

export const sealEngineAddressTestnet = '0x9581c795dbcaf408e477f6f1908a41be43093122';
export const sealEngineAddressMainnet = '0x2b16c07d5fd5cc701a0a871eae2aad6da5fc8f12';
