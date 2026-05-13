/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { ZERO_ADDRESS } from 'modules/web3/constants/addresses';
import { useChainId, useReadContracts } from 'wagmi';
import {
  voteDelegateFactoryAbi,
  voteDelegateFactoryAddress,
  voteDelegateFactoryOldAbi,
  voteDelegateFactoryOldAddress
} from 'modules/contracts/generated';

type VoteDelegateAddressResponse = {
  data?: `0x${string}` | undefined;
  loading: boolean;
  error: Error | null;
  mutate: () => void;
};

// Returns the vote delegate contract address for a account
export const useVoteDelegateAddress = (account?: `0x${string}`): VoteDelegateAddressResponse => {
  const chainId = useChainId();

  const { data, isLoading, error, refetch } = useReadContracts({
    contracts: [
      {
        address: voteDelegateFactoryAddress[chainId],
        abi: voteDelegateFactoryAbi,
        chainId,
        functionName: 'delegates',
        args: [account as `0x${string}`]
      },
      {
        address: voteDelegateFactoryOldAddress[chainId],
        abi: voteDelegateFactoryOldAbi,
        chainId,
        functionName: 'delegates',
        args: [account as `0x${string}`]
      }
    ],
    allowFailure: false,
    scopeKey: `${account}/vote-delegate-address`,
    query: {
      enabled: !!account
    }
  });

  const [voteDelegate, voteDelegateOld] = data || [];

  return {
    data:
      voteDelegate !== ZERO_ADDRESS
        ? voteDelegate
        : voteDelegateOld !== ZERO_ADDRESS
        ? voteDelegateOld
        : undefined,
    loading: isLoading,
    error,
    mutate: () => {
      refetch();
    }
  };
};
