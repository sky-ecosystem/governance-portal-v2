/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { useChainId, useReadContract } from 'wagmi';
import { vatAbi, vatAddress } from 'modules/contracts/generated';

type TotalDaiResponse = {
  data?: bigint | undefined;
  loading: boolean;
  error?: Error | null;
};

export const useTotalDai = (): TotalDaiResponse => {
  const chainId = useChainId();

  const { data, error } = useReadContract({
    address: vatAddress[chainId],
    abi: vatAbi,
    chainId,
    functionName: 'debt',
    scopeKey: `/total-dai-vat-${chainId}`
  });

  return {
    data,
    loading: !error && !data,
    error
  };
};
