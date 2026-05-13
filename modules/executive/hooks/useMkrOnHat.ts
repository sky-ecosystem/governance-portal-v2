/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import useSWR from 'swr';
import { getChiefApprovals } from 'modules/web3/api/getChiefApprovals';
import { useNetwork } from 'modules/app/hooks/useNetwork';
import { useChainId, useReadContract } from 'wagmi';
import { chiefAbi, chiefAddress } from 'modules/contracts/generated';

type MkrOnHatResponse = {
  data?: bigint;
  loading: boolean;
  error?: Error | null;
  mutate: () => void;
};

export const useMkrOnHat = (): MkrOnHatResponse => {
  const network = useNetwork();

  const chainId = useChainId();

  const {
    data: hatAddress,
    error: hatError,
    refetch: mutateHatAddress
  } = useReadContract({
    address: chiefAddress[chainId],
    abi: chiefAbi,
    chainId,
    functionName: 'hat',
    scopeKey: `executive-hat-${chainId}`
  });

  const {
    data,
    error,
    mutate: mutateMkrOnHat
  } = useSWR(`${chiefAddress[chainId]}/mkr-on-hat`, async () => {
    return hatAddress ? await getChiefApprovals(hatAddress, network) : undefined;
  });

  return {
    data,
    loading: !hatError && !error && !data && !hatAddress,
    error: hatError || error,
    mutate: () => {
      mutateHatAddress();
      mutateMkrOnHat();
    }
  };
};
