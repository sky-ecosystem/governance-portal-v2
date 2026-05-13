/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { gqlRequest } from 'modules/gql/gqlRequest';
import { lastPollVote } from 'modules/gql/queries/spock/lastPollVote';
import { SupportedNetworks } from 'modules/web3/constants/networks';
import { networkNameToChainId } from 'modules/web3/helpers/chain';
import { parseRawOptionId } from '../helpers/parseRawOptionId';
import { PollTallyVote } from '../types';

export async function fetchLastPollVote(
  address: string,
  network: SupportedNetworks
): Promise<PollTallyVote | null> {
  const data = await gqlRequest({
    chainId: networkNameToChainId(network),
    query: lastPollVote,
    variables: { argAddress: address.toLowerCase() }
  });

  // Parse the rankedChoice option
  const res: PollTallyVote[] = data.allCurrentVotes.nodes.map(o => {
    const ballot = parseRawOptionId(o.optionIdRaw);
    return {
      ...o,
      ballot,
      voter: address
    };
  });

  return res.length > 0 ? res[0] : null;
}
