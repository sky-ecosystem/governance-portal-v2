/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import ErrorPage from 'modules/app/components/ErrorPage';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Card, Flex, Divider, Heading, Text, Box, Button, Badge } from 'theme-ui';
import { useBreakpointIndex } from '@theme-ui/match-media';
import Icon from 'modules/app/components/Icon';
import { formatDateWithTime } from 'lib/datetime';
import Skeleton from 'modules/app/components/SkeletonThemed';
import CountdownTimer from 'modules/app/components/CountdownTimer';
import PrimaryLayout from 'modules/app/components/layout/layouts/Primary';
import SidebarLayout from 'modules/app/components/layout/layouts/Sidebar';
import Stack from 'modules/app/components/layout/layouts/Stack';
import Tabs from 'modules/app/components/Tabs';
import SystemStatsSidebar from 'modules/app/components/SystemStatsSidebar';
import ResourceBox from 'modules/app/components/ResourceBox';
import { PollCategoryTag } from 'modules/polling/components/PollCategoryTag';
import { HeadComponent } from 'modules/app/components/layout/Head';
import { ErrorBoundary } from 'modules/app/components/ErrorBoundary';
import { InternalLink } from 'modules/app/components/InternalLink';
import { ExternalLink } from 'modules/app/components/ExternalLink';
import { SkyPollDetailResponse } from '../api/sky/polls/[poll-id-or-slug]';
import SkyVoteBreakdown from 'modules/polling/components/SkyVoteBreakdown';
import SkyPollWinningOptionBox from 'modules/polling/components/SkyPollWinningOptionBox';
import SkyVotesByAddress from 'modules/polling/components/SkyVotesByAddress';
import { useSkyPollTally } from 'modules/polling/hooks/useSkyPollTally';

const editMarkdown = (content: string) => {
  // hide the duplicate proposal title
  return (
    content
      .replace(/^<h1>.*<\/h1>|^<h2>.*<\/h2>/, '')
      // fixes issue with older images that are too large
      .replace(/(<img)(.*src=".*")(>)/g, '$1 width="100%"$2$3')
  );
};

// Replaces the raw GitHub domain name, adds the 'blob' path and adds the link to the review section
const parseRawUrl = (rawUrl: string) => {
  const [protocol, separator, , org, repo, ...route] = rawUrl.split('/');
  const url = [protocol, separator, 'github.com', org, repo, 'blob', ...route].join('/');
  return url + '#review';
};

const SkyPollView = ({ poll }: { poll: SkyPollDetailResponse }) => {
  const bpi = useBreakpointIndex({ defaultIndex: 2 });
  const [shownOptions, setShownOptions] = useState(6);

  const SkyVoteWeightVisual = dynamic(() => import('../../modules/polling/components/SkyVoteWeightVisual'), {
    ssr: false
  });

  // Fetch tally data separately from Sky API
  const { tally, error: tallyError, isValidating } = useSkyPollTally(poll.pollId, 60000);

  return (
    <PrimaryLayout sx={{ maxWidth: 'dashboard' }}>
      <SidebarLayout>
        <HeadComponent title={poll.title} description={`${poll.title}. End Date: ${poll.endDate}.`} />

        <div>
          <Flex mb={2} sx={{ justifyContent: 'flex-start', flexDirection: 'row' }}>
            <InternalLink href="/polling" title="View polling page">
              <Button variant="mutedOutline">
                <Flex sx={{ display: ['none', 'block'], alignItems: 'center', whiteSpace: 'nowrap' }}>
                  <Icon name="chevron_left" sx={{ size: 2, mr: 2 }} />
                  Back to Polls
                </Flex>
                <Flex sx={{ display: ['block', 'none'], alignItems: 'center', whiteSpace: 'nowrap' }}>
                  Back to Polls
                </Flex>
              </Button>
            </InternalLink>
          </Flex>
          <Card sx={{ p: [0, 0], position: 'relative' }}>
            <Badge variant="sky" sx={{ position: 'absolute', top: 3, right: 3 }}>
              Sky Governance
            </Badge>
            <Flex sx={{ flexDirection: 'column', px: [3, 4], pt: [3, 4] }}>
              <Box>
                <Flex sx={{ justifyContent: 'space-between', flexDirection: ['column', 'row'] }}>
                  <Text
                    variant="caps"
                    sx={{
                      fontSize: [1],
                      color: 'textSecondary'
                    }}
                  >
                    Posted {formatDateWithTime(new Date(poll.startDate))} | Poll ID {poll.pollId}
                  </Text>
                </Flex>

                <Flex sx={{ mb: 2, flexDirection: 'column' }}>
                  <Heading mt="2" sx={{ fontSize: [5, 6] }}>
                    {poll.title}
                  </Heading>

                  <Flex sx={{ my: 2, flexWrap: 'wrap' }}>
                    {poll.tags.map(tag => (
                      <Box key={tag.id} sx={{ my: 2, mr: 2 }}>
                        <PollCategoryTag tag={tag} />
                      </Box>
                    ))}
                  </Flex>

                  <CountdownTimer
                    key={poll.multiHash}
                    endText="Poll ended"
                    endDate={new Date(poll.endDate)}
                    sx={{ mb: 2 }}
                  />

                  <Flex sx={{ justifyContent: 'space-between', mb: 2, flexDirection: 'column' }}>
                    {poll.discussionLink && (
                      <Box>
                        <ExternalLink title="Forum Discussion" href={poll.discussionLink}>
                          <Text sx={{ fontSize: 3, fontWeight: 'semiBold' }}>
                            Forum Discussion
                            <Icon sx={{ ml: 2 }} name="arrowTopRight" size={2} />
                          </Text>
                        </ExternalLink>
                      </Box>
                    )}
                    {poll.url && (
                      <Box>
                        <ExternalLink title="Review resources on GitHub" href={parseRawUrl(poll.url)}>
                          <Text sx={{ fontSize: 3, fontWeight: 'semiBold' }}>
                            Review resources on GitHub
                            <Icon sx={{ ml: 2 }} name="arrowTopRight" size={2} />
                          </Text>
                        </ExternalLink>
                      </Box>
                    )}
                  </Flex>
                </Flex>
              </Box>
            </Flex>

            <Tabs
              tabListStyles={{ pl: [3, 4] }}
              tabTitles={['Vote Breakdown', 'Poll Detail']}
              tabRoutes={['Vote Breakdown', 'Poll Detail']}
              tabPanels={[
                <div key="vote-breakdown">
                  {!tally || isValidating ? (
                    <Box sx={{ m: 4 }}>
                      <Skeleton />
                      {tallyError && (
                        <Text sx={{ color: 'error', mt: 2, textAlign: 'center' }}>
                          Error loading vote data. Please refresh to try again.
                        </Text>
                      )}
                    </Box>
                  ) : (
                    <>
                      <SkyVoteBreakdown poll={poll} shownOptions={shownOptions} tally={tally} />
                      {shownOptions < Object.keys(poll.options).length && (
                        <Box sx={{ px: 4, pb: 3 }}>
                          <Button
                            variant="mutedOutline"
                            onClick={() => {
                              setShownOptions(shownOptions + 6);
                            }}
                          >
                            <Flex sx={{ alignItems: 'center' }}>
                              View more
                              <Icon name="chevron_down" sx={{ size: 2, ml: 2 }} />
                            </Flex>
                          </Button>
                        </Box>
                      )}
                      <Divider />
                      <Flex data-testid="voting-stats" sx={{ p: [3, 4], flexDirection: 'column' }}>
                        <Text variant="microHeading" sx={{ mb: 3 }}>
                          Voting Stats
                        </Text>
                        <Flex sx={{ justifyContent: 'space-between', mb: 3 }}>
                          <Text sx={{ color: 'textSecondary' }}>Total Voting Power</Text>
                          <Text>
                            {Number(tally.totalSkyParticipation).toLocaleString(undefined, {
                              maximumFractionDigits: 3
                            })}{' '}
                            SKY
                          </Text>
                        </Flex>
                        <Flex sx={{ justifyContent: 'space-between' }}>
                          <Text sx={{ color: 'textSecondary' }}>Total Votes</Text>
                          <Text>{tally.numVoters}</Text>
                        </Flex>
                      </Flex>
                      <Divider />
                      <Flex data-testid="voting-by-address" sx={{ p: [3, 4], flexDirection: 'column' }}>
                        <Text variant="microHeading" sx={{ mb: 3 }}>
                          Voting By Address
                        </Text>
                        {tally.votesByAddress && tally.numVoters > 0 ? (
                          <SkyVotesByAddress tally={tally} poll={poll} />
                        ) : tally.numVoters === 0 ? (
                          <Text sx={{ color: 'textSecondary' }}>No votes yet</Text>
                        ) : (
                          <Box sx={{ width: '100%' }}>
                            <Box mb={2}>
                              <Skeleton width="100%" />
                            </Box>
                            <Box mb={2}>
                              <Skeleton width="100%" />
                            </Box>
                            <Box mb={2}>
                              <Skeleton width="100%" />
                            </Box>
                          </Box>
                        )}
                      </Flex>
                      <Divider />
                      <Flex sx={{ p: [3, 4], flexDirection: 'column' }}>
                        <Text variant="microHeading" sx={{ mb: 3 }}>
                          Voting Weight
                        </Text>
                        {tally && tally.numVoters > 0 && <SkyVoteWeightVisual tally={tally} poll={poll} />}
                        {tally && tally.numVoters === 0 && (
                          <Text sx={{ color: 'textSecondary' }}>No votes yet</Text>
                        )}
                      </Flex>
                    </>
                  )}
                </div>,
                <div key="poll-detail">
                  <Box
                    data-testid="poll-detail"
                    sx={{ variant: 'markdown.default', p: [3, 4] }}
                    dangerouslySetInnerHTML={{ __html: editMarkdown(poll.content || poll.summary) }}
                  />
                </div>
              ]}
              banner={
                tally &&
                tally.totalSkyActiveParticipation &&
                +tally.totalSkyActiveParticipation > 0 &&
                tally.winningOptionName ? (
                  <Box>
                    <Divider my={0} />
                    <SkyPollWinningOptionBox tally={tally} poll={poll} />
                    <Divider my={0} />
                  </Box>
                ) : null
              }
            />
          </Card>
        </div>
        <Stack gap={3}>
          {/* Read-only notice for Sky polls */}
          <Card sx={{ p: 3, backgroundColor: 'background', border: '1px solid', borderColor: 'muted' }}>
            <Flex sx={{ alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="info" sx={{ mr: 2, color: 'primary', size: 4 }} />
              <Text sx={{ textAlign: 'center', color: 'textSecondary' }}>
                This is a Sky governance poll. Voting is only available on{' '}
                <ExternalLink href="https://vote.sky.money" title="Sky voting portal">
                  <Text>vote.sky.money</Text>
                </ExternalLink>
              </Text>
            </Flex>
          </Card>
          <ErrorBoundary componentName="System Info">
            <SystemStatsSidebar
              fields={[
                'polling contract v2',
                'polling contract v1',
                'arbitrum polling contract',
                'savings rate',
                'total dai',
                'debt ceiling',
                'system surplus'
              ]}
            />
          </ErrorBoundary>
          <ResourceBox type={'polling'} />
          <ResourceBox type={'general'} />
        </Stack>
      </SidebarLayout>
    </PrimaryLayout>
  );
};

export default function SkyPollPage({
  poll: prefetchedPoll,
  error: initialError
}: {
  poll?: SkyPollDetailResponse;
  error?: string;
}): JSX.Element {
  const [poll, setPoll] = useState<SkyPollDetailResponse | undefined>(prefetchedPoll);
  const [error, setError] = useState<string | undefined>(initialError);
  const [loading, setLoading] = useState(false);
  const { query } = useRouter();

  // Client-side fetching fallback if SSR fails
  useEffect(() => {
    if (!poll && !error && query['poll-hash']) {
      setLoading(true);
      fetch(`/api/sky/polls/${query['poll-hash']}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch poll: ${response.status}`);
          }
          return response.json();
        })
        .then((data: SkyPollDetailResponse) => {
          setPoll(data);
        })
        .catch(err => {
          console.error('Error fetching poll:', err);
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [query['poll-hash'], poll, error]);

  if (loading) {
    return (
      <PrimaryLayout sx={{ maxWidth: 'dashboard' }}>
        <p>Loading...</p>
      </PrimaryLayout>
    );
  }

  if (error || !poll) {
    return (
      <PrimaryLayout sx={{ maxWidth: 'dashboard' }}>
        <ErrorPage
          statusCode={404}
          title={error || 'Poll either does not exist, or could not be fetched at this time'}
        />
      </PrimaryLayout>
    );
  }

  return (
    <ErrorBoundary componentName="Sky Poll Page">
      <SkyPollView poll={poll} />
    </ErrorBoundary>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const pollIdOrSlug = params?.['poll-hash'] as string;

  if (!pollIdOrSlug) {
    return {
      props: {
        error: 'Poll ID or slug is required'
      }
    };
  }

  try {
    // Try to fetch the poll data server-side
    const apiUrl = `https://vote.sky.money/api/polling/${pollIdOrSlug}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      signal: AbortSignal.timeout(5000)
    });

    if (!response.ok) {
      console.error('Failed to fetch Sky poll:', response.status);
      return {
        props: {
          error: `Failed to fetch poll (status: ${response.status})`
        }
      };
    }

    const poll: SkyPollDetailResponse = await response.json();

    return {
      props: {
        poll
      }
    };
  } catch (error) {
    console.error('Error fetching Sky poll:', error);
    return {
      props: {
        error: 'Failed to connect to Sky governance API'
      }
    };
  }
};
