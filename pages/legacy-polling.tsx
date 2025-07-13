/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { useEffect, useState, useRef, useMemo } from 'react';
import { Heading, Box, Flex, Button, Text } from 'theme-ui';
import { useBreakpointIndex } from '@theme-ui/match-media';
import Icon from 'modules/app/components/Icon';
import ErrorPage from 'modules/app/components/ErrorPage';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import shallow from 'zustand/shallow';
import useSWR, { useSWRConfig } from 'swr';
import groupBy from 'lodash/groupBy';
import { PollListItem } from 'modules/polling/types';
import { formatDateWithTime } from 'lib/datetime';
import PrimaryLayout from 'modules/app/components/layout/layouts/Primary';
import SidebarLayout from 'modules/app/components/layout/layouts/Sidebar';
import Stack from 'modules/app/components/layout/layouts/Stack';
import PollOverviewCard from 'modules/polling/components/PollOverviewCard';
import { SearchBar } from 'modules/app/components/filters/SearchBar';
import { CategoryFilter } from 'modules/polling/components/filters/CategoryFilter';
import { StatusFilter } from 'modules/polling/components/filters/StatusFilter';
import { PollTypeFilter } from 'modules/polling/components/filters/PollTypeFilter';
import { DateFilter } from 'modules/polling/components/filters/DateFilter';
import ResourceBox from 'modules/app/components/ResourceBox';
import SystemStatsSidebar from 'modules/app/components/SystemStatsSidebar';
import useUiFiltersStore from 'modules/app/stores/uiFilters';
import BallotStatus from 'modules/polling/components/BallotStatus';
import PageLoadingPlaceholder from 'modules/app/components/PageLoadingPlaceholder';
import { useAllUserVotes } from 'modules/polling/hooks/useAllUserVotes';
import { HeadComponent } from 'modules/app/components/layout/Head';
import { useAccount } from 'modules/app/hooks/useAccount';
import { isDefaultNetwork } from 'modules/web3/helpers/networks';
import { ErrorBoundary } from 'modules/app/components/ErrorBoundary';
import { useIntersectionObserver } from 'modules/app/hooks/useIntersectionObserver';
import { fetchPollingPageData } from 'modules/polling/api/fetchPollingPageData';
import { SupportedNetworks } from 'modules/web3/constants/networks';
import PollsSort from 'modules/polling/components/filters/PollsSort';
import { PollingPageProps } from 'modules/polling/types/pollsResponse';
import { PollOrderByEnum, PollStatusEnum } from 'modules/polling/polling.constants';
import SkeletonThemed from 'modules/app/components/SkeletonThemed';
import { useNetwork } from 'modules/app/hooks/useNetwork';

const emptyStats = {
  active: 0,
  finished: 0,
  total: 0
};

const PollingOverview = ({
  polls: propPolls,
  tags: propTags,
  stats: propStats,
  paginationInfo: propPaginationInfo,
  activePollIds
}: PollingPageProps) => {
  const [
    { categoryFilter, pollVictoryCondition, startDate, endDate, showPollActive, showPollEnded },
    setCategoryFilter,
    resetPollFilters,
    sort,
    title,
    setTitle,
    fetchOnLoad,
    setFetchOnLoad
  ] = useUiFiltersStore(
    state => [
      state.pollFilters,
      state.setCategoryFilter,
      state.resetPollFilters,
      state.pollsSortBy,
      state.pollFilters.title,
      state.setTitle,
      state.fetchOnLoad,
      state.setFetchOnLoad
    ],
    shallow
  );

  const onVisitPoll = () => {
    setFetchOnLoad(true);
  };

  const onResetClick = () => {
    setShowHistorical(false);
    resetPollFilters();
    setFetchOnLoad(false);
  };

  const router = useRouter();

  useEffect(() => {
    if (router.query.category) {
      const category = router.query.category as string;
      setCategoryFilter([category]);
    }
  }, [router]);

  const bpi = useBreakpointIndex();
  const network = useNetwork();

  const [loading, setLoading] = useState(fetchOnLoad);
  const [isRendering, setIsRendering] = useState(true);
  const [shouldLoadMore, setShouldLoadMore] = useState(false);
  const [polls, setPolls] = useState(fetchOnLoad ? [] : propPolls);
  const [tags, setTags] = useState(fetchOnLoad ? [] : propTags);
  const [stats, setStats] = useState(fetchOnLoad ? emptyStats : propStats);
  const [paginationInfo, setPaginationInfo] = useState(propPaginationInfo);
  const [showHistorical, setShowHistorical] = useState(false);
  const [filters, setFilters] = useState({
    page: 1,
    sort,
    title,
    queryTags: categoryFilter,
    type: pollVictoryCondition,
    startDate,
    endDate,
    status:
      (showPollActive && showPollEnded) || (!showPollActive && !showPollEnded)
        ? null
        : showPollEnded
        ? PollStatusEnum.ended
        : PollStatusEnum.active
  });

  // only for mobile
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setIsRendering(false);
  }, []);

  useEffect(() => {
    if (shouldLoadMore) {
      if (paginationInfo.hasNextPage) {
        setLoading(true);
        setFilters(({ page: prevPage, ...prevFilters }) => ({
          ...prevFilters,
          page: prevPage + 1
        }));
      } else {
        setShouldLoadMore(false);
      }
    }
  }, [shouldLoadMore]);

  useEffect(() => {
    if (!isRendering || fetchOnLoad) {
      let mounted = true;

      const fetchPolls = async () => {
        const queryParams = {
          page: filters.page,
          type: filters.type,
          orderBy: filters.sort,
          title: filters.title,
          queryTags: filters.queryTags,
          startDate: filters.startDate,
          endDate: filters.endDate,
          status: filters.status
        };

        const res = await fetchPollingPageData(network, true, queryParams);

        setLoading(false);
        setPolls(prevPolls => [...prevPolls, ...res.polls]);
        setTags(res.tags);
        setStats(res.stats);
        setPaginationInfo(res.paginationInfo);
        setShouldLoadMore(false);
      };

      if (mounted) {
        fetchPolls();
      }
      return () => {
        mounted = false;
      };
    }
  }, [filters]);

  useEffect(() => {
    setPolls(fetchOnLoad ? polls : propPolls);
    setTags(fetchOnLoad ? tags : propTags);
    setStats(fetchOnLoad ? stats : propStats);
    setPaginationInfo(propPaginationInfo);
  }, [propPolls, propTags, propStats, propPaginationInfo, fetchOnLoad]);

  useEffect(() => {
    if (!isRendering) {
      setLoading(true);
      setPolls([]);
      setFilters({
        page: 1,
        sort,
        title,
        queryTags: categoryFilter,
        type: pollVictoryCondition,
        startDate,
        endDate,
        status:
          (showPollActive && showPollEnded) || (!showPollActive && !showPollEnded)
            ? null
            : showPollEnded
            ? PollStatusEnum.ended
            : PollStatusEnum.active
      });
    }
  }, [sort, title, categoryFilter, pollVictoryCondition, startDate, endDate, showPollActive, showPollEnded]);

  // Load more on scroll
  const loader = useRef<HTMLDivElement>(null);
  useIntersectionObserver(showHistorical ? loader : null, () => setShouldLoadMore(true));

  const { account, votingAccount } = useAccount();
  const { mutate: mutateAllUserVotes } = useAllUserVotes(votingAccount);

  // revalidate user votes if connected address changes
  useEffect(() => {
    mutateAllUserVotes();
  }, [votingAccount]);

  const [activePolls, endedPolls, groupedActivePolls, groupedEndedPolls] = useMemo(() => {
    const active = polls.filter(poll => new Date(poll.endDate) > new Date());
    const ended = polls.filter(poll => new Date(poll.endDate) <= new Date());

    const [groupByKey, activePollsVerb, endedPollsVerb] =
      sort === PollOrderByEnum.nearestEnd || sort === PollOrderByEnum.furthestEnd
        ? ['endDate', 'ending', 'ended']
        : ['startDate', 'started', 'started'];

    const groupedActive = Object.entries(groupBy(active, groupByKey)).map(
      ([date, pollList]: [string, PollListItem[]]) => [
        `${pollList.length} Poll${pollList.length === 1 ? '' : 's'} - ${activePollsVerb} ${formatDateWithTime(
          date
        )}`,
        pollList
      ]
    ) as [string, PollListItem[]][];

    const groupedEnded = Object.entries(groupBy(ended, groupByKey)).map(
      ([date, pollList]: [string, PollListItem[]]) => [
        `${pollList.length} Poll${pollList.length === 1 ? '' : 's'} - ${endedPollsVerb} ${formatDateWithTime(
          date
        )}`,
        pollList
      ]
    ) as [string, PollListItem[]][];

    return [active, ended, groupedActive, groupedEnded];
  }, [polls, propPolls]);

  useEffect(() => {
    if (activePolls.length === 0 && endedPolls.length > 0) {
      setShowHistorical(true);
    }
  }, [activePolls.length, endedPolls.length]);

  return (
    <PrimaryLayout sx={{ maxWidth: [null, null, null, 'page', 'dashboard'] }}>
      <HeadComponent
        title="Polling"
        description={`${polls.length > 0 ? `Lastest poll: ${polls[0].title}. ` : ''}Active Polls: ${
          activePolls.length
        }. Total Polls: ${polls.length}. .`}
      />

      <Stack gap={3}>
        <Flex sx={{ justifyContent: ['center', 'flex-start'], alignItems: 'center', flexWrap: 'wrap' }}>
          <Flex sx={{ alignItems: 'center' }}>
            <Button
              variant="textual"
              sx={{ display: ['block', 'none'], color: 'onSecondary' }}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Text sx={{ mr: 1 }}>{showFilters ? 'Hide poll filters' : 'Show poll filters'}</Text>
              <Icon name={showFilters ? 'chevron_down' : 'chevron_right'} size={2} />
            </Button>
          </Flex>
          {(showFilters || bpi > 0) && (
            <Flex sx={{ flexDirection: ['column', 'column', 'column', 'row'] }}>
              <Flex
                sx={{
                  justifyContent: ['center', 'center', 'center', 'flex-start'],
                  alignItems: 'center',
                  flexWrap: 'wrap'
                }}
              >
                <SearchBar
                  sx={{ m: 2 }}
                  onChange={setTitle}
                  value={title}
                  placeholder="Search poll titles"
                  withSearchButton={true}
                  performSearchOnClear={true}
                />
                <PollsSort />
                <CategoryFilter tags={tags} sx={{ m: 2 }} />
                <StatusFilter stats={stats} sx={{ m: 2 }} />
                <PollTypeFilter stats={stats} sx={{ m: 2 }} />
                <DateFilter sx={{ m: 2 }} />
              </Flex>
              <Button
                variant={'outline'}
                sx={{
                  m: 2,
                  color: 'textSecondary',
                  border: 'none'
                }}
                onClick={onResetClick}
              >
                Reset filters
              </Button>
            </Flex>
          )}
        </Flex>
        <SidebarLayout>
          <Box>
            {[...activePolls, ...endedPolls].length === 0 && !loading && (
              <Flex sx={{ flexDirection: 'column', alignItems: 'center', pt: [5, 5, 5, 6] }}>
                <Flex
                  sx={{
                    borderRadius: '50%',
                    backgroundColor: 'secondary',
                    p: 2,
                    width: '111px',
                    height: '111px',
                    alignItems: 'center'
                  }}
                >
                  <Box m={'auto'}>
                    <Icon name="magnifying_glass" sx={{ color: 'background', size: 4 }} />
                  </Box>
                </Flex>
                <Text variant={'microHeading'} sx={{ color: 'onSecondary', mt: 3 }}>
                  No polls found
                </Text>
                <Button
                  variant={'textual'}
                  sx={{ color: 'primary', textDecoration: 'underline', mt: 2, fontSize: 3 }}
                  onClick={resetPollFilters}
                >
                  Reset filters
                </Button>
              </Flex>
            )}

            {activePolls.length === 0 && bpi <= 2 && account && <BallotStatus />}

            {[...activePolls, ...endedPolls].length !== 0 && (
              <Stack>
                {activePolls.length > 0 && (
                  <div>
                    <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', my: 3 }}>
                      <Heading as="h4">Active Polls</Heading>
                      {bpi <= 2 && account && <BallotStatus />}
                    </Flex>
                    <Stack>
                      {groupedActivePolls.map(([groupTitle, pollGroup]) => (
                        <div key={groupTitle}>
                          <Text as="p" variant="caps" color="textSecondary" mb={2}>
                            {groupTitle}
                          </Text>
                          <Box sx={{ mb: 0 }}>
                            {pollGroup.map(poll => (
                              <Box key={poll.slug} sx={{ mb: 4 }}>
                                <PollOverviewCard
                                  poll={poll}
                                  allTags={tags}
                                  showVoting={true}
                                  reviewPage={false}
                                  onVisitPoll={onVisitPoll}
                                />
                              </Box>
                            ))}
                          </Box>
                        </div>
                      ))}
                    </Stack>
                  </div>
                )}

                {showHistorical ? (
                  <div>
                    <Heading mb={3} as="h4" sx={{ display: stats.finished > 0 ? undefined : 'none' }}>
                      <Flex sx={{ justifyContent: 'space-between' }}>Legacy Polls</Flex>
                    </Heading>
                    <Stack>
                      {groupedEndedPolls.map(([groupTitle, pollGroup]) => (
                        <div key={groupTitle}>
                          <Text as="p" variant="caps" color="textSecondary" mb={2}>
                            {groupTitle}
                          </Text>
                          <Box>
                            {pollGroup.map(poll => (
                              <Box key={poll.slug} sx={{ mb: 4 }}>
                                <PollOverviewCard
                                  poll={poll}
                                  allTags={tags}
                                  reviewPage={false}
                                  showVoting={false}
                                  onVisitPoll={onVisitPoll}
                                />
                              </Box>
                            ))}
                          </Box>
                        </div>
                      ))}
                    </Stack>
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      setShowHistorical(true);
                    }}
                    variant="outline"
                    data-testid="button-view-ended-polls"
                    sx={{ mb: 5, py: 3, display: stats.finished > 0 ? undefined : 'none' }}
                  >
                    View ended polls ({paginationInfo.totalCount - activePolls.length})
                  </Button>
                )}
              </Stack>
            )}
            {loading && (
              <Flex sx={{ justifyContent: 'center' }}>
                <SkeletonThemed circle={true} width={50} height={50} />
              </Flex>
            )}
          </Box>
          <Stack gap={3}>
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
      </Stack>
      <div ref={loader} />
    </PrimaryLayout>
  );
};

export default function PollingOverviewPage({
  polls: prefetchedPolls,
  tags: prefetchedCategories,
  stats: prefetchedStats,
  paginationInfo: prefetchedPaginationInfo,
  activePollIds: prefetchedActivePollIds
}: PollingPageProps): JSX.Element {
  const network = useNetwork();

  const fallbackData = isDefaultNetwork(network)
    ? {
        polls: prefetchedPolls,
        tags: prefetchedCategories,
        stats: prefetchedStats,
        paginationInfo: prefetchedPaginationInfo,
        activePollIds: prefetchedActivePollIds
      }
    : null;

  const { cache } = useSWRConfig();
  const cacheKey = `page/polling/${network}`;
  const { data, error } = useSWR<PollingPageProps>(
    !network || isDefaultNetwork(network) ? null : cacheKey,
    () => fetchPollingPageData(network, true),
    {
      revalidateOnMount: !cache.get(cacheKey),
      ...(fallbackData && { fallbackData })
    }
  );

  if (!isDefaultNetwork(network) && !data && !error) {
    return <PageLoadingPlaceholder />;
  }

  if (error) {
    return (
      <PrimaryLayout sx={{ maxWidth: 'dashboard' }}>
        <ErrorPage statusCode={500} title="Error fetching data, please try again later." />
      </PrimaryLayout>
    );
  }

  const props = {
    polls: isDefaultNetwork(network) ? prefetchedPolls : data?.polls || [],
    tags: isDefaultNetwork(network) ? prefetchedCategories : data?.tags || [],
    stats: isDefaultNetwork(network) ? prefetchedStats : data?.stats || { active: 0, finished: 0, total: 0 },
    paginationInfo: isDefaultNetwork(network)
      ? prefetchedPaginationInfo
      : data?.paginationInfo || {
          totalCount: 0,
          page: 0,
          numPages: 0,
          hasNextPage: false
        },
    activePollIds: isDefaultNetwork(network) ? prefetchedActivePollIds : data?.activePollIds || []
  };

  return (
    <ErrorBoundary componentName="Poll List">
      <PollingOverview {...props} />
    </ErrorBoundary>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { polls, tags, stats, paginationInfo, activePollIds } = await fetchPollingPageData(
    SupportedNetworks.MAINNET
  );

  return {
    revalidate: 60, // revalidate every 60 seconds
    props: {
      polls,
      tags,
      stats,
      paginationInfo,
      activePollIds
    }
  };
};
