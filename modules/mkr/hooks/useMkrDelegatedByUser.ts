/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { useMemo } from 'react';
import useSWR from 'swr';
import { useChainId } from 'wagmi';
import { config } from 'lib/config';
import { getPublicClient } from 'modules/web3/helpers/getPublicClient';
import { voteDelegateAbi } from 'modules/contracts/ethers/abis';
import { parseEther } from 'viem';
import { useMkrDelegationsFromUser } from './useMkrDelegationsFromUser';

type DelegatedByUserResponse = {
  data:
    | {
        directDelegationAmount: bigint | undefined;
        sealDelegationAmount: bigint | undefined;
        totalDelegationAmount: bigint | undefined;
      }
    | undefined;
  loading: boolean;
  error?: Error;
  mutate: () => void;
};

// Fetches the amount delegated from one user to one contract address
export const useMkrDelegatedByUser = (
  userAddress?: string,
  voteDelegateAddress?: string
): DelegatedByUserResponse => {
  const chainId = useChainId();
  const {
    data: delegations,
    error: delegationsError,
    loading: delegationsLoading,
    mutate: delegationsMutate
  } = useMkrDelegationsFromUser();

  if (!voteDelegateAddress) {
    return {
      data: undefined,
      loading: false,
      error: new Error('No account found'),
      mutate: () => undefined
    };
  }

  const fetchFromChain = async (userAddress: string | undefined, voteDelegateAddress: string) => {
    if (!userAddress) return undefined;

    const publicClient = getPublicClient(chainId);
    const directDelegated = await publicClient.readContract({
      address: voteDelegateAddress as `0x${string}`,
      abi: voteDelegateAbi,
      functionName: 'stake',
      args: [userAddress as `0x${string}`]
    });

    return {
      directDelegationAmount: directDelegated,
      sealDelegationAmount: undefined,
      totalDelegationAmount: directDelegated
    };
  };

  const {
    data: dataFromChain,
    error: errorFromChain,
    mutate: mutateFromChain
  } = useSWR(
    (config.USE_MOCK_WALLET || delegationsError) && userAddress && voteDelegateAddress
      ? ['/user/mkr-delegated-from-chain', voteDelegateAddress, userAddress]
      : null,
    () => fetchFromChain(userAddress, voteDelegateAddress)
  );

  if (config.USE_MOCK_WALLET || (delegationsError && !delegationsLoading)) {
    return {
      data: dataFromChain,
      loading: !dataFromChain && !errorFromChain,
      error: errorFromChain,
      mutate: mutateFromChain
    };
  }

  const calculatedData = useMemo(() => {
    if (!delegations) {
      return {
        directDelegationAmount: 0n,
        sealDelegationAmount: 0n,
        totalDelegationAmount: 0n
      };
    }

    let sealDelegated = 0n;
    let directDelegated = 0n;
    for (let i = 0; i < delegations.length; i++) {
      try {
        const curr = delegations[i];
        if (curr.delegateContractAddress.toLowerCase() !== voteDelegateAddress.toLowerCase()) {
          continue;
        }

        const lockAmount = parseEther(curr.lockAmount.toString());
        if (curr.isLockstake) {
          sealDelegated = sealDelegated + lockAmount;
        } else {
          directDelegated = directDelegated + lockAmount;
        }
      } catch (innerError) {
        console.error(`Error processing delegation ${i + 1}:`, innerError);
      }
    }
    return {
      directDelegationAmount: directDelegated,
      sealDelegationAmount: sealDelegated,
      totalDelegationAmount: sealDelegated + directDelegated
    };
  }, [delegations, voteDelegateAddress]);

  return {
    data: calculatedData,
    loading: delegationsLoading,
    error: delegationsError,
    mutate: delegationsMutate
  };
};
