/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { Flex, Heading, Grid } from 'theme-ui';
import { InternalLink } from 'modules/app/components/InternalLink';
import { ViewMore } from 'modules/home/components/ViewMore';
import { ErrorBoundary } from 'modules/app/components/ErrorBoundary';
import PollOverviewCard from 'modules/polling/components/PollOverviewCard';
import { PollListItem } from 'modules/polling/types';
import { TagCount } from 'modules/app/types/tag';

type Props = {
  polls: PollListItem[];
  activePollCount: number;
  allTags: TagCount[];
};

export const PollsOverviewLanding = ({ polls, activePollCount, allTags }: Props): JSX.Element => {
  const hasActivePolls = activePollCount > 0;
  const pollsToDisplay = hasActivePolls
    ? activePollCount >= 4
      ? polls
      : polls.slice(0, activePollCount)
    : polls.slice(0, 2);

  return (
    <Flex sx={{ flexDirection: 'column' }}>
      <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Heading>{hasActivePolls ? 'Active Polls' : 'Recent Polls'}</Heading>
        <InternalLink href={'/polling'} title="Active Polls">
          <ViewMore label="View All" />
        </InternalLink>
      </Flex>
      <Flex>
        <ErrorBoundary componentName="Active Polls">
          <Grid gap={4} columns={[1, 1, 1, 2]}>
            {pollsToDisplay.map(poll => (
              <PollOverviewCard
                key={poll.pollId}
                poll={poll}
                allTags={allTags}
                reviewPage={false}
                showVoting={false}
                disableTagFilter={true}
              />
            ))}
          </Grid>
        </ErrorBoundary>
      </Flex>
    </Flex>
  );
};
