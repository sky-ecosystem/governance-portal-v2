/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { ZERO_SLATE_HASH } from 'modules/executive/helpers/zeroSlateHash';
import useSWR from 'swr';
import { useAccount } from 'modules/app/hooks/useAccount';
import { getSlateAddresses } from 'modules/executive/helpers/getSlateAddresses';
import { useChainId, useReadContract } from 'wagmi';
import { chiefAbi, chiefAddress } from 'modules/contracts/generated';

type VotedProposalsResponse = {
  data: string[];
  loading: boolean;
  error: Error;
  mutate: any;
};

export const useVotedProposals = (passedAddress?: string): VotedProposalsResponse => {
  const { votingAccount } = useAccount();
  const addressToUse = passedAddress ? passedAddress : votingAccount;
  const chainId = useChainId();

  const {
    data: votedSlate,
    error: votedSlateError,
    refetch: mutateVotedSlate
  } = useReadContract({
    address: chiefAddress[chainId],
    abi: chiefAbi,
    chainId,
    functionName: 'votes',
    args: [addressToUse as `0x${string}`],
    scopeKey: `voted-proposals-${addressToUse}-${chainId}`,
    query: {
      enabled: !!addressToUse,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      gcTime: 60000
    }
  });

  const { data, error, mutate } = useSWR<string[]>(
    addressToUse ? `${addressToUse}/executive/voted-proposals-${chainId}-${votedSlate}` : null,
    async () => {
      return votedSlate && votedSlate !== ZERO_SLATE_HASH
        ? await getSlateAddresses(chainId, chiefAddress[chainId], chiefAbi, votedSlate)
        : [];
    },
    { revalidateOnMount: true, refreshInterval: 60000, revalidateOnFocus: false }
  );

  return {
    data: data || [],
    loading: !votedSlateError && !error && !data && !votedSlate,
    error: votedSlateError || error,
    mutate: () => {
      mutateVotedSlate();
      mutate();
    }
  };
};
