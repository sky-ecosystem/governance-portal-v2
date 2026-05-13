/*
SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>
SPDX-License-Identifier: AGPL-3.0-or-later
*/

export const delegateHistoryArray = (
  chainId: number,
  delegates: string[],
  engines: string[]
): string => {
  const delegateIlikeConditions = delegates
    .map(d => `{ id: { _ilike: "%${d}" } }`)
    .join(', ');

  const engineNilikeConditions = engines
    .map(e => `{ delegator: { _nilike: "${e}" } }`)
    .join(', ');

  return `
{
  Delegate(
    where: { chainId: { _eq: ${chainId} }, _or: [${delegateIlikeConditions}] }
  ) {
    delegationHistory(limit: 1000, where: { _and: [${engineNilikeConditions}] }) {
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
}
`;
};
