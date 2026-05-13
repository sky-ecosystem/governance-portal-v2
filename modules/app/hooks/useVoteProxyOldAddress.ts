/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import useSWR from 'swr';
import { getVoteProxyAddresses, VoteProxyAddresses } from '../helpers/getVoteProxyAddresses';
import { SupportedNetworks } from 'modules/web3/constants/networks';
import { useNetwork } from './useNetwork';
import { voteProxyFactoryOldAbi, voteProxyFactoryOldAddress } from 'modules/contracts/generated';
import { networkNameToChainId } from 'modules/web3/helpers/chain';

type VoteProxyAddressResponse = {
  data?: VoteProxyAddresses;
  loading: boolean;
  error?: Error;
};

export const useVoteProxyOldAddress = (account?: string): VoteProxyAddressResponse => {
  const network = useNetwork();
  const chainId = networkNameToChainId(network);

  const { data, error } = useSWR(
    account && network !== SupportedNetworks.MAINNET ? `${account}/vote-proxy-address` : null,
    async () => {
      return await getVoteProxyAddresses(
        voteProxyFactoryOldAddress[chainId],
        voteProxyFactoryOldAbi,
        account as string,
        network
      );
    }
  );

  return {
    data,
    loading: !error && !data,
    error
  };
};
