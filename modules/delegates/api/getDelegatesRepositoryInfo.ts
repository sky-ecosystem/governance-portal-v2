/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { SupportedNetworks } from 'modules/web3/constants/networks';

export type RepositoryInfo = {
  owner: string;
  repo: string;
  page: string;
};

export function getDelegatesRepositoryInformation(network: SupportedNetworks): RepositoryInfo {
  const repoMainnet = {
    owner: 'sky-ecosystem',
    repo: 'community',
    page: 'governance/delegates'
  };

  const repoTest = {
    owner: 'sky-ecosystem',
    repo: 'voting-delegates',
    page: 'delegates'
  };

  const delegatesRepositoryInfo =
    network === SupportedNetworks.MAINNET || SupportedNetworks.TENDERLY ? repoMainnet : repoTest;
  return delegatesRepositoryInfo;
}
