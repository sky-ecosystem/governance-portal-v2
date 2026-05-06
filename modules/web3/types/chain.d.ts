/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { SupportedChainId } from '../constants/chainID';
import { SupportedNetworks } from '../constants/networks';

export type BlockExplorer = 'Etherscan' | 'Arbiscan' | 'block explorer';

export type SupportedChain = {
  blockExplorerUrl: string;
  blockExplorerName: BlockExplorer;
  chainId: SupportedChainId;
  label: string;
  network: SupportedNetworks;
  spockUrl?: string;
  subgraphUrl?: string;
  type: 'gasless' | 'normal';
  showInProduction: boolean;
};
