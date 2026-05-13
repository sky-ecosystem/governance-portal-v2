/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import useSWR from 'swr';
import { getVoteProxyAddresses, VoteProxyAddresses } from '../helpers/getVoteProxyAddresses';
import { useNetwork } from './useNetwork';
import { networkNameToChainId } from 'modules/web3/helpers/chain';
import { voteProxyFactoryAbi, voteProxyFactoryAddress } from 'modules/contracts/generated';

type VoteProxyAddressResponse = {
  data?: VoteProxyAddresses;
  loading: boolean;
  error: Error;
};

export const useVoteProxyAddress = (account?: string): VoteProxyAddressResponse => {
  const network = useNetwork();
  const chainId = networkNameToChainId(network);

  const { data, error } = useSWR(account ? `${account}/vote-proxy-address` : null, async () => {
    return await getVoteProxyAddresses(
      voteProxyFactoryAddress[chainId],
      voteProxyFactoryAbi,
      account as string,
      network
    );
  });

  return {
    data,
    loading: !error && !data,
    error
  };
};
