/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { useChainId, useReadContract } from 'wagmi';
import { mkrAbi, mkrAddress } from 'modules/contracts/generated';

type MkrBalanceResponse = {
  data?: bigint;
  loading?: boolean;
  error?: Error | null;
  mutate: () => void;
};

export const useMkrBalance = (address?: string): MkrBalanceResponse => {
  const chainId = useChainId();

  const {
    data,
    error,
    refetch: mutate
  } = useReadContract({
    address: mkrAddress[chainId],
    abi: mkrAbi,
    chainId,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    scopeKey: `/mkr-balance-${address}-${chainId}`,
    query: {
      enabled: !!address,
      refetchOnMount: true
    }
  });

  return {
    data: data,
    loading: !error && !data,
    error,
    mutate
  };
};
