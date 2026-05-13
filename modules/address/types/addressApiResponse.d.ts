/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { PollVoteHistory } from 'modules/polling/types';
import { Delegate } from 'modules/delegates/types';
import { VoteProxyAddresses } from 'modules/app/helpers/getVoteProxyAddresses';

export type AddressAPIStats = {
  pollVoteHistory: PollVoteHistory[];
  lastVote: PollVoteHistory;
};

export type AddressApiResponse = {
  isDelegate: boolean;
  isProxyContract: boolean;
  voteProxyInfo?: VoteProxyAddresses;
  delegateInfo?: Delegate;
  address: string;
  voteDelegateAdress?: string;
};
