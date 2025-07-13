/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { Card, Flex, Box, Button, ThemeUIStyleObject, Badge, Divider } from 'theme-ui';
import CountdownTimer from 'modules/app/components/CountdownTimer';
import { ExternalLink } from 'modules/app/components/ExternalLink';
import { useBreakpointIndex } from '@theme-ui/match-media';
import { PollCategoryTag } from './PollCategoryTag';
import SkyPollWinningOptionBox from './SkyPollWinningOptionBox';
import { formatDateWithTime } from 'lib/datetime';
import { CardTitle } from 'modules/app/components/Card/CardTitle';
import { CardHeader } from 'modules/app/components/Card/CardHeader';
import { CardSummary } from 'modules/app/components/Card/CardSummary';
import { ErrorBoundary } from 'modules/app/components/ErrorBoundary';
import { PollVoteTypeIndicator } from './PollOverviewCard/PollVoteTypeIndicator';
import { TagCount } from 'modules/app/types/tag';
import SkeletonThemed from 'modules/app/components/SkeletonThemed';
import { PluralityVoteSummary } from './vote-summary/PluralityVoteSummary';
import { ListVoteSummary } from './vote-summary/ListVoteSummary';
import {
  isResultDisplayApprovalBreakdown,
  isResultDisplayInstantRunoffBreakdown,
  isResultDisplaySingleVoteBreakdown
} from 'modules/polling/helpers/utils';

// Sky poll types based on API response structure
export type SkyPoll = {
  pollId: number;
  startDate: string;
  endDate: string;
  multiHash: string;
  slug: string;
  url: string;
  discussionLink: string;
  type: string;
  parameters: {
    inputFormat: {
      type: string;
      abstain: number[];
      options: any[];
    };
    victoryConditions: any[];
    resultDisplay: string;
  };
  title: string;
  summary: string;
  options: {
    [key: string]: string;
  };
  tags: string[];
  tally?: {
    parameters: {
      inputFormat: {
        type: string;
        abstain: number[];
        options: any[];
      };
      resultDisplay: string;
      victoryConditions: any[];
    };
    results: Array<{
      optionId: number;
      winner: boolean;
      skySupport: string;
      optionName: string;
      transfer: string;
      firstPct: number;
      transferPct: number;
    }>;
    totalSkyParticipation: string;
    totalSkyActiveParticipation: string;
    winner: number | null;
    winningOptionName: string | null;
    numVoters: number;
    victoryConditionMatched?: number;
    votesByAddress: Array<{
      skySupport: string;
      ballot: number[];
      pollId: number;
      voter: string;
      chainId: number;
      blockTimestamp: string;
      hash: string;
    }>;
  };
};

type Props = {
  poll: SkyPoll;
  sx?: ThemeUIStyleObject;
  hideTally?: boolean;
};

const isActivePoll = (poll: SkyPoll): boolean => {
  return new Date(poll.endDate) > new Date();
};

const getSkyPortalPollUrl = (poll: SkyPoll): string => {
  return `https://vote.sky.money/polling/${poll.slug}`;
};

const SkyPollOverviewCard = function SkyPollOverviewCard({ poll, hideTally = false }: Props): JSX.Element {
  const bpi = useBreakpointIndex({ defaultIndex: 2 });
  const isActive = isActivePoll(poll);

  return (
    <Card
      data-testid="sky-poll-overview-card"
      aria-label="Sky poll overview"
      sx={{
        p: [0, 0],
        position: 'relative'
      }}
    >
      <ErrorBoundary componentName="Sky Poll Card">
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
                      <CountdownTimer endText="Poll ended" endDate={new Date(poll.endDate)} />
                    </Box>
                  )}
                  <Box>
                    <Box>
                      <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <CardHeader
                          text={`Posted ${formatDateWithTime(new Date(poll.startDate))} | Poll ID ${
                            poll.pollId
                          }`}
                          styles={{ mb: 0 }}
                        />
                        <Badge variant="sky">Sky Governance</Badge>
                      </Flex>
                      <ExternalLink href={getSkyPortalPollUrl(poll)} title="View poll details on Sky Portal">
                        <CardTitle title={poll.title} dataTestId="sky-poll-overview-card-poll-title" />
                      </ExternalLink>
                    </Box>
                    <ExternalLink href={getSkyPortalPollUrl(poll)} title="View poll details on Sky Portal">
                      <CardSummary text={poll.summary} styles={{ my: 2 }} />
                    </ExternalLink>
                  </Box>

                  <Flex sx={{ flexWrap: 'wrap' }}>
                    {poll.tags.map(tag => (
                      <Box key={tag} sx={{ marginRight: 2, marginBottom: 2 }}>
                        <PollCategoryTag tag={tag} allTags={[]} disableTagFilter={true} />
                      </Box>
                    ))}
                  </Flex>
                </Box>
                {bpi > 0 && (
                  <Flex mt={3} sx={{ gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                    <Box>
                      <ErrorBoundary componentName="Countdown Timer">
                        <CountdownTimer endText="Poll ended" endDate={new Date(poll.endDate)} />
                      </ErrorBoundary>
                    </Box>
                  </Flex>
                )}
              </Flex>
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
                    gap: 2,
                    p: 0
                  }}
                >
                  <ExternalLink href={getSkyPortalPollUrl(poll)} title="View poll details on Sky Portal">
                    <Button variant="outline">View Details</Button>
                  </ExternalLink>

                  {isActive && (
                    <ExternalLink href={getSkyPortalPollUrl(poll)} title="Vote on Sky Portal">
                      <Button variant="primary">Vote on Sky Portal</Button>
                    </ExternalLink>
                  )}

                  {bpi === 0 && <PollVoteTypeIndicator poll={poll as any} />}
                </Flex>

                {!hideTally && (
                  <Box sx={{ width: bpi > 0 ? '265px' : '100%', mt: [3, 0] }}>
                    {bpi > 0 && (
                      <Flex sx={{ justifyContent: 'flex-end' }}>
                        <PollVoteTypeIndicator poll={poll as any} />
                      </Flex>
                    )}
                    {poll.tally && +poll.tally.totalSkyActiveParticipation > 0 && (
                      <ExternalLink
                        href={`${getSkyPortalPollUrl(poll)}#vote-breakdown`}
                        title="View poll vote breakdown on Sky Portal"
                      >
                        <Box sx={{ mt: 2 }}>
                          <ErrorBoundary componentName="Poll Results">
                            {isResultDisplaySingleVoteBreakdown(poll.parameters as any) ? (
                              <PluralityVoteSummary tally={poll.tally as any} showTitles={false} />
                            ) : !isResultDisplayApprovalBreakdown(poll.parameters as any) ? (
                              <ListVoteSummary
                                choices={poll.tally.results.map(i => i.optionId)}
                                poll={poll as any}
                                limit={3}
                                showOrdinal={isResultDisplayInstantRunoffBreakdown(poll.parameters as any)}
                              />
                            ) : null}
                          </ErrorBoundary>
                        </Box>
                      </ExternalLink>
                    )}
                    {!poll.tally && <SkeletonThemed width={'265px'} height={'30px'} />}
                    {poll.tally && +poll.tally.totalSkyActiveParticipation === 0 && (
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
                          No votes yet
                        </Badge>
                      </Flex>
                    )}
                  </Box>
                )}
              </Flex>
            </Box>
          </Box>

          {poll.tally && poll.tally.results && poll.tally.results.length > 0 && (
            <Flex sx={{ flexDirection: 'column', justifySelf: 'flex-end' }}>
              <Divider my={0} />
              <ErrorBoundary componentName="Sky Poll Winning Option">
                <SkyPollWinningOptionBox tally={poll.tally} poll={poll} />
              </ErrorBoundary>
            </Flex>
          )}
        </Flex>
      </ErrorBoundary>
    </Card>
  );
};

export default SkyPollOverviewCard;
