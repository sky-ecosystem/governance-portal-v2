/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import React, { memo } from 'react';
import { Card, Flex, Box, Button, ThemeUIStyleObject, Divider, Badge } from 'theme-ui';
import {
  isActivePoll,
  isResultDisplayApprovalBreakdown,
  isResultDisplayInstantRunoffBreakdown,
  isResultDisplaySingleVoteBreakdown
} from 'modules/polling/helpers/utils';
import CountdownTimer from 'modules/app/components/CountdownTimer';
import { InternalLink } from 'modules/app/components/InternalLink';
import { PollListItem } from 'modules/polling/types';
import { useBreakpointIndex } from '@theme-ui/match-media';
import { PollCategoryTag } from './PollCategoryTag';
import { PluralityVoteSummary } from './vote-summary/PluralityVoteSummary';
import PollWinningOptionBox from './PollWinningOptionBox';
import { formatDateWithTime } from 'lib/datetime';
import { usePollTally } from '../hooks/usePollTally';
import SkeletonThemed from 'modules/app/components/SkeletonThemed';
import { CardTitle } from 'modules/app/components/Card/CardTitle';
import { CardHeader } from 'modules/app/components/Card/CardHeader';
import { CardSummary } from 'modules/app/components/Card/CardSummary';
import { useAccount } from 'modules/app/hooks/useAccount';
import { ErrorBoundary } from 'modules/app/components/ErrorBoundary';
import { ListVoteSummary } from './vote-summary/ListVoteSummary';
import { PollVoteTypeIndicator } from './PollOverviewCard/PollVoteTypeIndicator';
import { TagCount } from 'modules/app/types/tag';

type Props = {
  poll: PollListItem;
  allTags: TagCount[];
  reviewPage: boolean;
  disableVoting?: boolean;
  sx?: ThemeUIStyleObject;
  showVoting?: boolean;
  children?: React.ReactNode;
  hideTally?: boolean;
  disableTagFilter?: boolean;
  onVisitPoll?: () => void;
  basePath?: string; // Allow customizing the base path for legacy polls
};
const PollOverviewCard = memo(
  function PollOverviewCard({
    poll,
    allTags,
    reviewPage,
    showVoting,
    disableVoting = false,
    children,
    onVisitPoll,
    hideTally = false,
    disableTagFilter = false,
    basePath = '/polling'
  }: Props): JSX.Element {
    const { account } = useAccount();
    const bpi = useBreakpointIndex({ defaultIndex: 2 });
    const canVote = !!account && isActivePoll(poll);
    // const showQuickVote = canVote && showVoting;
    const { tally, error: errorTally, isValidating } = usePollTally(hideTally ? 0 : poll.pollId);

    return (
      <Card
        data-testid="poll-overview-card"
        aria-label="Poll overview"
        sx={{
          p: [0, 0]
        }}
      >
        <ErrorBoundary componentName="Poll Card">
          <Flex sx={{ flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
            <Box
              sx={{
                px: [3, 4],
                py: 3,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'space-between'
              }}
            >
              <Flex
                sx={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  minHeight: ['auto', 210],
                  height: '100%'
                }}
              >
                <Flex
                  sx={{
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box>
                    {bpi === 0 && (
                      <Box sx={{ justifyContent: 'space-between', flexDirection: 'row', flexWrap: 'nowrap' }}>
                        <CountdownTimer endText="Poll ended" endDate={poll.endDate} />
                      </Box>
                    )}
                    <Box>
                      <Box>
                        <CardHeader
                          text={`Posted ${formatDateWithTime(poll.startDate)} | Poll ID ${poll.pollId}`}
                          styles={{ mb: 2 }}
                        />
                        <InternalLink href={`${basePath}/${poll.slug}`} title="View poll details">
                          <CardTitle
                            title={poll.title}
                            dataTestId="poll-overview-card-poll-title"
                            onVisit={onVisitPoll}
                          />
                        </InternalLink>
                      </Box>
                      <InternalLink href={`${basePath}/${poll.slug}`} title="View poll details">
                        <CardSummary text={poll.summary} styles={{ my: 2 }} onVisit={onVisitPoll} />
                      </InternalLink>
                    </Box>

                    <Flex sx={{ flexWrap: 'wrap' }}>
                      {poll.tags.map(c => (
                        <Box key={c} sx={{ marginRight: 2, marginBottom: 2 }}>
                          <PollCategoryTag tag={c} allTags={allTags} disableTagFilter={disableTagFilter} />
                        </Box>
                      ))}
                    </Flex>
                  </Box>
                  {bpi > 0 && (
                    <Flex mt={3} sx={{ gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                      <Box>
                        <ErrorBoundary componentName="Countdown Timer">
                          <CountdownTimer endText="Poll ended" endDate={poll.endDate} />
                        </ErrorBoundary>
                      </Box>
                    </Flex>
                  )}
                </Flex>
                {/* {showQuickVote && bpi > 0 && (
                  <Box sx={{ ml: 2, minWidth: '265px' }}>
                    <ErrorBoundary componentName="Vote in Poll">
                      <Box sx={{ maxWidth: 7 }}>
                        <QuickVote poll={poll} showStatus={!reviewPage} disabled={disableVoting} />
                      </Box>
                    </ErrorBoundary>
                  </Box>
                )} */}
              </Flex>

              <Box>
                <Flex
                  sx={{
                    alignItems: 'flex-end',
                    mt: 2,
                    justifyContent: 'space-between',
                    flexDirection: ['column', 'row']
                  }}
                >
                  <Flex
                    sx={{
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: bpi > 0 ? 'auto' : '100%',
                      p: 0
                    }}
                  >
                    <InternalLink href={`${basePath}/${poll.slug}`} title="View poll details">
                      <Button
                        variant="outline"
                        sx={{
                          display: reviewPage ? 'none' : undefined
                        }}
                        onClick={() => onVisitPoll?.()}
                      >
                        View Details
                      </Button>
                    </InternalLink>

                    {bpi === 0 && <PollVoteTypeIndicator poll={poll} />}
                  </Flex>

                  {/* {showQuickVote && bpi === 0 && (
                    <Box sx={{ mt: 3, width: '100%' }}>
                      <ErrorBoundary componentName="Vote in Poll">
                        <QuickVote poll={poll} showStatus={!reviewPage} disabled={disableVoting} />
                      </ErrorBoundary>
                    </Box>
                  )} */}

                  <Box sx={{ width: bpi > 0 ? '265px' : '100%' }}>
                    {bpi > 0 && (
                      <Flex sx={{ justifyContent: 'flex-end' }}>
                        <PollVoteTypeIndicator poll={poll} />
                      </Flex>
                    )}
                    {tally && +tally.totalMkrParticipation > 0 && (
                      <InternalLink
                        href={`${basePath}/${poll.slug}`}
                        hash="vote-breakdown"
                        title="View poll vote breakdown"
                      >
                        <Box sx={{ mt: 2 }} onClick={() => onVisitPoll?.()}>
                          <ErrorBoundary componentName="Poll Results">
                            {isResultDisplaySingleVoteBreakdown(poll.parameters) ? (
                              <PluralityVoteSummary tally={tally} showTitles={false} />
                            ) : !isResultDisplayApprovalBreakdown(poll.parameters) ? (
                              <ListVoteSummary
                                choices={tally.results.map(i => i.optionId)}
                                poll={poll}
                                limit={3}
                                showOrdinal={isResultDisplayInstantRunoffBreakdown(poll.parameters)}
                              />
                            ) : null}
                          </ErrorBoundary>
                        </Box>
                      </InternalLink>
                    )}
                    {!tally && isValidating && !errorTally && (
                      <SkeletonThemed width={'265px'} height={'30px'} />
                    )}
                    {errorTally && !isValidating && (
                      <Flex sx={{ justifyContent: ['center', 'flex-end'] }}>
                        <Badge
                          variant="warning"
                          sx={{
                            color: 'warning',
                            borderColor: 'warning',
                            textTransform: 'uppercase',
                            display: 'inline-flex',
                            alignItems: 'center',
                            m: 1
                          }}
                        >
                          Error loading votes
                        </Badge>
                      </Flex>
                    )}
                  </Box>
                </Flex>
              </Box>

              {children && <Box>{children}</Box>}
            </Box>

            {tally && (
              <Flex sx={{ flexDirection: 'column', justifySelf: 'flex-end' }}>
                <Divider my={0} />
                <ErrorBoundary componentName="Poll Winning Option">
                  <PollWinningOptionBox tally={tally} poll={poll} />
                </ErrorBoundary>
              </Flex>
            )}
          </Flex>
        </ErrorBoundary>
      </Card>
    );
  },
  ({ poll: prevPoll, children: prevChildren }, { poll: nextPoll, children: nextChildren }) =>
    Object.is(prevPoll, nextPoll) && Object.is(prevChildren, nextChildren)
);

export default PollOverviewCard;
