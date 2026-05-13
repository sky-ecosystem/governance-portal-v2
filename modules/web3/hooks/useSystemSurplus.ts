/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { useChainId, useReadContracts } from 'wagmi';
import { vatAbi, vatAddress, vowAddress } from 'modules/contracts/generated';

type SystemSurplusResponse = {
  data?: bigint | undefined;
  loading: boolean;
  error?: Error | null;
};

export const useSystemSurplus = (): SystemSurplusResponse => {
  const chainId = useChainId();

  const { data, error } = useReadContracts({
    contracts: [
      {
        address: vatAddress[chainId],
        abi: vatAbi,
        chainId,
        functionName: 'dai',
        args: [vowAddress[chainId]]
      },
      {
        address: vatAddress[chainId],
        abi: vatAbi,
        chainId,
        functionName: 'sin',
        args: [vowAddress[chainId]]
      }
    ],
    scopeKey: `/system-surplus-dai-and-sin-${chainId}`
  });

  const dai = data?.[0].result;
  const sin = data?.[1].result;

  return {
    data: dai && sin ? dai - sin : undefined,
    loading: !error && !dai && !sin,
    error
  };
};
