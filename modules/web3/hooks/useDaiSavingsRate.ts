/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { SECONDS_PER_YEAR } from 'lib/datetime';
import { useChainId, useReadContract } from 'wagmi';
import { potAbi, potAddress } from 'modules/contracts/generated';
import { formatUnits } from 'viem';

type DaiSavingsRateResponse = {
  data?: number | undefined;
  loading: boolean;
  error?: Error | null;
};

export const useDaiSavingsRate = (): DaiSavingsRateResponse => {
  const chainId = useChainId();

  const { data, error } = useReadContract({
    address: potAddress[chainId],
    abi: potAbi,
    chainId,
    functionName: 'dsr',
    scopeKey: `dai-savings-rate-${chainId}`
  });

  return {
    data: !data ? undefined : (Number(formatUnits(data, 27)) ** SECONDS_PER_YEAR - 1) * 100,
    loading: !error && !data,
    error
  };
};
