/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

export const allDelegateAddresses = (chainId: number): string => `
{
  Delegate(
    limit: 1000,
    where: { chainId: { _eq: ${chainId} }, version: { _in: ["1", "2"] } },
    order_by: { blockTimestamp: asc }
  ) {
    id
    address
    ownerAddress
    blockTimestamp
    version
    totalDelegated
    delegators
  }
}
`;
