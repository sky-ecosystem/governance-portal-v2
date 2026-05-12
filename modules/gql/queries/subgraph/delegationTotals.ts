/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { sealEngineAddressMainnet } from 'modules/gql/gql.constants';

export const delegationTotalsQuery = (chainId: number, skip: number): string => `
{
  Delegate(
    limit: 1000,
    offset: ${skip},
    where: { chainId: { _eq: ${chainId} }, version: { _in: ["1", "2"] } }
  ) {
    delegations(limit: 1000, where: { delegator: { _nilike: "${sealEngineAddressMainnet}" } }) {
      amount
    }
  }
}
`;
