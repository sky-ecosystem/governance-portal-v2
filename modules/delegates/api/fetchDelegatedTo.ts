/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { add } from 'date-fns';
import { formatEther, parseEther } from 'viem';
import logger from 'lib/logger';
import { gqlRequest } from 'modules/gql/gqlRequest';
import { allDelegateAddresses } from 'modules/gql/queries/subgraph/allDelegateAddresses';
import { delegatorHistory } from 'modules/gql/queries/subgraph/delegatorHistory';
import { SupportedNetworks } from 'modules/web3/constants/networks';
import { networkNameToChainId } from 'modules/web3/helpers/chain';
import { isAboutToExpireCheck, isExpiredCheck } from 'modules/migration/helpers/expirationChecks';
import { DelegationHistoryWithExpirationDate, MKRDelegatedToResponse } from '../types';
import { getLatestOwnerFromOld } from 'modules/migration/delegateAddressLinks';

export async function fetchDelegatedTo(
  address: string,
  network: SupportedNetworks
): Promise<DelegationHistoryWithExpirationDate[]> {
  try {
    const chainId = networkNameToChainId(network);

    // Fetch all delegates
    const delegatesData = await gqlRequest<any>({
      chainId,
      query: allDelegateAddresses(chainId),
      useSubgraph: true
    });

    const delegates = (delegatesData.Delegate || []).map((delegate: any) => ({
      voteDelegate: delegate.address,
      delegate: delegate.ownerAddress,
      blockTimestamp: new Date(Number(delegate.blockTimestamp) * 1000),
      delegateVersion: Number(delegate.version) || 1
    }));

    // Returns the records with the aggregated delegated data
    const data = await gqlRequest<any>({
      chainId,
      useSubgraph: true,
      query: delegatorHistory(chainId, address.toLowerCase())
    });

    const res: MKRDelegatedToResponse[] = (data.DelegationHistory || []).map((x: any) => {
      return {
        delegateContractAddress: x.delegate.address,
        lockAmount: x.amount,
        blockTimestamp: new Date(parseInt(x.timestamp) * 1000).toISOString(),
        hash: x.txnHash,
        blockNumber: x.blockNumber,
        immediateCaller: address,
        isLockstake: x.isLockstake
      };
    });

    const delegatedTo = res.reduce(
      (acc, { delegateContractAddress, lockAmount, blockTimestamp, hash, isLockstake }) => {
        const existing = acc.find(({ address }) => address === delegateContractAddress) as
          | DelegationHistoryWithExpirationDate
          | undefined;

        // We sum the total of lockAmounts in different events to calculate the current delegated amount
        if (existing) {
          existing.lockAmount = formatEther(parseEther(existing.lockAmount) + parseEther(lockAmount));
          existing.events.push({
            lockAmount: formatEther(parseEther(lockAmount)),
            blockTimestamp,
            hash,
            isLockstake
          });
        } else {
          const delegatingTo = delegates.find(
            (i: any) => i?.voteDelegate?.toLowerCase() === delegateContractAddress.toLowerCase()
          );

          if (!delegatingTo) {
            return acc;
          }

          const delegatingToWalletAddress = delegatingTo?.delegate?.toLowerCase();
          // Get the expiration date of the delegate

          const expirationDate =
            delegatingTo.delegateVersion === 2
              ? undefined
              : add(new Date(delegatingTo?.blockTimestamp), { years: 1 });

          //only v1 delegate contracts expire
          const isAboutToExpire = delegatingTo.delegateVersion !== 2 && isAboutToExpireCheck(expirationDate);
          const isExpired = delegatingTo.delegateVersion !== 2 && isExpiredCheck(expirationDate);

          // If it has a new owner address, check if it has renewed the contract
          const latestOwnerAddress = getLatestOwnerFromOld(delegatingToWalletAddress as string, network);

          const newRenewedContract = latestOwnerAddress
            ? delegates.find((d: any) => d?.delegate?.toLowerCase() === latestOwnerAddress.toLowerCase())
            : null;

          acc.push({
            address: delegateContractAddress,
            expirationDate,
            isExpired,
            isAboutToExpire: !isExpired && isAboutToExpire,
            lockAmount: formatEther(parseEther(lockAmount)),
            isRenewedToV2: !!newRenewedContract && newRenewedContract.delegateVersion === 2,
            events: [{ lockAmount: formatEther(parseEther(lockAmount)), blockTimestamp, hash, isLockstake }]
          } as DelegationHistoryWithExpirationDate);
        }

        return acc;
      },
      [] as DelegationHistoryWithExpirationDate[]
    );

    // Sort by lockAmount, lockAmount is the total amount delegated currently
    return delegatedTo.sort((prev, next) =>
      parseEther(prev.lockAmount) > parseEther(next.lockAmount) ? -1 : 1
    );
  } catch (e) {
    logger.error('fetchDelegatedTo: Error fetching MKR delegated to address', e.message);
    return [];
  }
}
