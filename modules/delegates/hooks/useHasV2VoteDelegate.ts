/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { ZERO_ADDRESS } from 'modules/web3/constants/addresses';
import { useChainId, useReadContract } from 'wagmi';
import { voteDelegateFactoryOldAbi, voteDelegateFactoryOldAddress } from 'modules/contracts/generated';

type HasV1VoteDelegateResponse = {
  data?: boolean | undefined;
  loading: boolean;
  error: Error | null;
  mutate: () => void;
};

// Returns whether the address has a v1 vote delegate contract
export const useHasV1VoteDelegate = (account?: string): HasV1VoteDelegateResponse => {
  const chainId = useChainId();

  const {
    data,
    error,
    refetch: mutate
  } = useReadContract({
    address: voteDelegateFactoryOldAddress[chainId],
    abi: voteDelegateFactoryOldAbi,
    chainId,
    functionName: 'delegates',
    args: [account as `0x${string}`],
    scopeKey: `${account}/has-v1-vote-delegate-address`,
    query: {
      enabled: !!account
    }
  });

  return {
    data: data !== ZERO_ADDRESS,
    loading: !error && !data,
    error,
    mutate
  };
};
