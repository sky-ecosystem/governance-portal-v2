/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

type SystemConfig = {
  USE_CACHE: string;
  TRACING_RPC_NODE: string;
  NODE_ENV: 'development' | 'production' | 'test';
  GITHUB_TOKEN: string;
  GITHUB_TOKEN_2: string;
  GITHUB_TOKEN_3: string;
  REDIS_URL: string;
  DEFENDER_API_KEY_TESTNET: string;
  DEFENDER_API_SECRET_TESTNET: string;
  DEFENDER_API_KEY_MAINNET: string;
  DEFENDER_API_SECRET_MAINNET: string;
  WALLETCONNECT_PROJECT_ID: string;
  MIGRATION_WEBHOOK_URL: string;
  GASLESS_WEBHOOK_URL: string;
  DASHBOARD_PASSWORD: string;
  GASLESS_BACKDOOR_SECRET: string;
  GASLESS_DISABLED: string;
  TENDERLY_RPC_KEY: string;
  USE_MOCK_WALLET: string;
  SUBGRAPH_API_KEY: string;
  READ_ONLY: boolean;
};

export const config: SystemConfig = {
  USE_CACHE: process.env.USE_CACHE || '',
  TRACING_RPC_NODE: process.env.TRACING_RPC_NODE || '',
  NODE_ENV: process.env.NODE_ENV || 'development',
  GITHUB_TOKEN: process.env.GITHUB_TOKEN || '',
  GITHUB_TOKEN_2: process.env.GITHUB_TOKEN_2 || '',
  GITHUB_TOKEN_3: process.env.GITHUB_TOKEN_3 || '',
  REDIS_URL: process.env.REDIS_URL || '',
  DEFENDER_API_KEY_TESTNET: process.env.DEFENDER_API_KEY_TESTNET || '',
  DEFENDER_API_SECRET_TESTNET: process.env.DEFENDER_API_SECRET_TESTNET || '',
  DEFENDER_API_KEY_MAINNET: process.env.DEFENDER_API_KEY_MAINNET || '',
  DEFENDER_API_SECRET_MAINNET: process.env.DEFENDER_API_SECRET_MAINNET || '',
  WALLETCONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
  MIGRATION_WEBHOOK_URL: process.env.MIGRATION_WEBHOOK_URL || '',
  GASLESS_WEBHOOK_URL: process.env.GASLESS_WEBHOOK_URL || '',
  DASHBOARD_PASSWORD: process.env.DASHBOARD_PASSWORD || '',
  GASLESS_BACKDOOR_SECRET: process.env.GASLESS_BACKDOOR_SECRET || '',
  GASLESS_DISABLED: process.env.GASLESS_DISABLED || '',
  TENDERLY_RPC_KEY: process.env.NEXT_PUBLIC_TENDERLY_RPC_KEY || '',
  USE_MOCK_WALLET: process.env.NEXT_PUBLIC_USE_MOCK_WALLET || '',
  SUBGRAPH_API_KEY: process.env.NEXT_PUBLIC_SUBGRAPH_API_KEY || '',
  READ_ONLY: process.env.READ_ONLY === 'true'
};
