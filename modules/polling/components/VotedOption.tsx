/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { Box } from 'theme-ui';
import { isInputFormatRankFree } from '../helpers/utils';
import { Poll, PollTallyVote } from '../types';
import { ListVoteSummary } from './vote-summary/ListVoteSummary';

// This components displays the vote of a user in a poll
export default function VotedOption({
  vote,
  poll,
  align = 'left'
}: {
  vote: PollTallyVote;
  poll: Poll;
  align?: 'left' | 'right';
}): React.ReactElement {
  return (
    <Box>
      <ListVoteSummary
        choices={vote.ballot || []}
        poll={poll}
        align={align}
        showOrdinal={isInputFormatRankFree(poll.parameters) && vote.ballot.length > 1}
      />
    </Box>
  );
}
