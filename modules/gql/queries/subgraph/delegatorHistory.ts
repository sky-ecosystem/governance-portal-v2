/*
SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later
*/

export const delegatorHistory = (chainId: number, address: string): string => `
{
  DelegationHistory(
    limit: 1000,
    where: { chainId: { _eq: ${chainId} }, delegator: { _ilike: "${address}" } }
  ) {
    amount
    accumulatedAmount
    delegate {
      id
      address
    }
    timestamp
    txnHash
    blockNumber
    isLockstake
  }
}
`;
