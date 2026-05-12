/*
SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import { sealEngineAddressMainnet } from 'modules/gql/gql.constants';

export const allDelegations = (chainId: number): string => `
{
  Delegate(
    limit: 1000,
    where: { chainId: { _eq: ${chainId} }, version: { _in: ["1", "2"] } }
  ) {
    delegations(limit: 1000, where: { delegator: { _nilike: "${sealEngineAddressMainnet}" } }) {
      delegator
      delegate {
        id
        address
      }
      amount
    }
  }
}
`;
