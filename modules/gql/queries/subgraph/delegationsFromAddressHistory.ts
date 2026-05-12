/*
SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>
SPDX-License-Identifier: AGPL-3.0-or-later
*/

export const delegationsFromAddressHistory = (chainId: number, delegator: string): string => `
{
  DelegationHistory(
    limit: 1000,
    where: { chainId: { _eq: ${chainId} }, delegator: { _ilike: "${delegator}" } },
    order_by: { timestamp: desc }
  ) {
    amount
    accumulatedAmount
    delegator
    blockNumber
    timestamp
    txnHash
    delegate {
      id
      address
    }
    isLockstake
  }
}
`;
