/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { useDelegateContractExpirationDate } from 'modules/delegates/hooks/useDelegateContractExpirationDate';
import { getLatestOwnerFromOld, getOriginalOwnerFromNew } from 'modules/migration/delegateAddressLinks';
import { useAccount } from 'wagmi';
import { useNetwork } from 'modules/app/hooks/useNetwork';

export function useLinkedDelegateInfo(): {
  latestOwnerAddress?: string;
  latestOwnerConnected: boolean;
  originalOwnerAddress?: string;
  originalOwnerConnected: boolean;
  latestOwnerHasDelegateContract: boolean;
} {
  const network = useNetwork();
  const { address } = useAccount();

  const {
    data: { expiration: delegateContractExpirationDate }
  } = useDelegateContractExpirationDate();

  // Means the old delegate in a mapping is connected
  const originalOwnerConnected = address ? !!getLatestOwnerFromOld(address, network) : false;

  // Means the new delegate in a mapping is connected (we need to check also that the previous owner is not connected, since an address can be, after one year, both the previous and new delegates)
  /* For example: 
  { 
    '0x1': '0x2',
    '0x2': '0x3'
  }
  0x2 is both a new delegate for 0x1 and a previous delegate for 0x3
  */
  const latestOwnerConnected = address
    ? !!getOriginalOwnerFromNew(address, network) && !originalOwnerConnected
    : false;

  const originalOwnerAddress = originalOwnerConnected
    ? address
    : address
    ? getOriginalOwnerFromNew(address, network)
    : undefined;

  const latestOwnerAddress =
    latestOwnerConnected && !originalOwnerConnected
      ? address
      : address
      ? getLatestOwnerFromOld(address, network)
      : undefined;

  const latestOwnerHasDelegateContract = !!delegateContractExpirationDate;

  return {
    latestOwnerAddress,
    latestOwnerConnected,
    originalOwnerAddress,
    originalOwnerConnected,
    latestOwnerHasDelegateContract
  };
}
