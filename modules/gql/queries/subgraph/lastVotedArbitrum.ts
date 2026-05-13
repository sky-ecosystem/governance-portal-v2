/*
SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later
*/

export const lastVotedArbitrum = (chainId: number, addresses: string[]): string => {
  const addressIlikeConditions = addresses
    .map(a => `{ id: { _ilike: "%${a}" } }`)
    .join(', ');

  return `
{
  ArbitrumVoter(
    where: { chainId: { _eq: ${chainId} }, _or: [${addressIlikeConditions}] }
  ) {
    id
    address
    pollVotes(order_by: { blockTime: desc }, limit: 1) {
      blockTime
    }
  }
}
`;
};
