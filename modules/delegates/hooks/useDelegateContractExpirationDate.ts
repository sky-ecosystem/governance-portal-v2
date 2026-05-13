/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { useAccount } from 'modules/app/hooks/useAccount';
import { useChainId, useReadContract } from 'wagmi';
import { voteDelegateAbi } from 'modules/contracts/ethers/abis';

type VoteDelegateAddressResponse = {
  data: {
    expiration?: Date | null;
    voteDelegateContractAddress?: string;
  };
  loading: boolean;
  error: Error | null;
};

// Returns the vote delegate contract address for a account
export const useDelegateContractExpirationDate = (): VoteDelegateAddressResponse => {
  const { voteDelegateContractAddress } = useAccount();
  const chainId = useChainId();

  const { data: expirationData, error } = useReadContract({
    address: voteDelegateContractAddress as `0x${string}` | undefined,
    abi: voteDelegateAbi,
    functionName: 'expiration',
    chainId,
    scopeKey: `${voteDelegateContractAddress}/expiration-date/${chainId}`,
    query: {
      enabled: !!voteDelegateContractAddress
    }
  });

  return {
    data: {
      expiration: expirationData ? new Date(Number(expirationData) * 1000) : null,
      voteDelegateContractAddress
    },
    loading: !error && !expirationData,
    error
  };
};
