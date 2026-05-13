/*
SPDX-FileCopyrightText: © 2024 Dai Foundation <www.daifoundation.org>
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import useSWR from 'swr';
import { useChainId, useAccount } from 'wagmi';
import { chainIdToNetworkName } from 'modules/web3/helpers/chain';
import { fetchDelegationEventsFromAddresses } from 'modules/delegates/api/fetchDelegationEventsFromAddresses';
import { MKRLockedDelegateAPIResponse } from 'modules/delegates/types';

type DelegationsFromUserResponse = {
  data: MKRLockedDelegateAPIResponse[] | undefined;
  loading: boolean;
  error?: Error;
  mutate: () => void;
};

export const useMkrDelegationsFromUser = (): DelegationsFromUserResponse => {
  const chainId = useChainId();
  const { address } = useAccount();
  const network = chainIdToNetworkName(chainId);

  const { data, error, mutate } = useSWR(
    address ? ['/user/mkr-delegations', address] : null,
    async () => {
      try {
        return await fetchDelegationEventsFromAddresses(address as string, network);
      } catch (outerError) {
        console.error('Error in useMkrDelegationsFromUser', outerError);
        return undefined;
      }
    },
    {
      revalidateOnMount: true,
      revalidateOnFocus: false
    }
  );

  return {
    data,
    loading: !error && !data,
    error,
    mutate
  };
};
