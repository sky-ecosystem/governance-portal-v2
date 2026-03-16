/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

const delegateFields = `
    blockTimestamp
    blockNumber
    ownerAddress
    version
    id
    address
    totalDelegated
    delegators
    voter {
      lastVotedTimestamp
    }
`;

export const delegatesQuerySubsequentPages = ({
  whereConditions,
  orderBy,
  orderDirection,
  limit,
  offset
}: {
  whereConditions: string[];
  orderBy: string;
  orderDirection: string;
  limit: number;
  offset: number;
}): string => `
{
  delegates: Delegate(
    limit: ${limit},
    offset: ${offset},
    order_by: { ${orderBy}: ${orderDirection} },
    where: { ${whereConditions.join(', ')} }
  ) {
    ${delegateFields}
  }
}
`;

export const delegatesQueryFirstPage = ({
  shadowWhereConditions,
  alignedWhereConditions,
  orderBy,
  orderDirection,
  limit
}: {
  shadowWhereConditions: string[];
  alignedWhereConditions: string[];
  orderBy: string;
  orderDirection: string;
  limit: number;
}): string => `
{
  delegates: Delegate(
    limit: ${limit},
    order_by: { ${orderBy}: ${orderDirection} },
    where: { ${shadowWhereConditions.join(', ')} }
  ) {
    ${delegateFields}
  }
  alignedDelegates: Delegate(
    order_by: { ${orderBy}: ${orderDirection} },
    where: { ${alignedWhereConditions.join(', ')} }
  ) {
    ${delegateFields}
  }
}
`;
