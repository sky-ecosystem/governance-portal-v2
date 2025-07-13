/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import React from 'react';
import { Heading, Flex, Box, Button, Divider, Grid, Text, Badge, Spinner, Card } from 'theme-ui';
import { useEffect, useMemo, useRef } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { GetStaticProps } from 'next';
import ErrorPage from 'modules/app/components/ErrorPage';
import Icon from 'modules/app/components/Icon';
import { useLockedMkr } from 'modules/mkr/hooks/useLockedMkr';
import { useHat } from 'modules/executive/hooks/useHat';
import { useVotedProposals } from 'modules/executive/hooks/useVotedProposals';
import { fetchJson } from 'lib/fetchJson';
import { useMkrOnHat } from 'modules/executive/hooks/useMkrOnHat';
import Deposit from 'modules/mkr/components/Deposit';
import WithdrawOldChief from 'modules/executive/components/WithdrawOldChief';
import ProposalsSortBy from 'modules/executive/components/ProposalsSortBy';
import DateFilter from 'modules/executive/components/DateFilter';
import SystemStatsSidebar from 'modules/app/components/SystemStatsSidebar';
import MkrLiquiditySidebar from 'modules/mkr/components/MkrLiquiditySidebar';
import ResourceBox from 'modules/app/components/ResourceBox';
import Stack from 'modules/app/components/layout/layouts/Stack';
import ExecutiveOverviewCard from 'modules/executive/components/ExecutiveOverviewCard';
import PrimaryLayout from 'modules/app/components/layout/layouts/Primary';
import SidebarLayout from 'modules/app/components/layout/layouts/Sidebar';
import ProgressBar from 'modules/executive/components/ProgressBar';
import PageLoadingPlaceholder from 'modules/app/components/PageLoadingPlaceholder';
import { ExecutiveBalance } from 'modules/executive/components/ExecutiveBalance';
import { ExternalLink } from 'modules/app/components/ExternalLink';
import useUiFiltersStore from 'modules/app/stores/uiFilters';
import { Proposal } from 'modules/executive/types';
import { HeadComponent } from 'modules/app/components/layout/Head';
import { useAccount } from 'modules/app/hooks/useAccount';
import { isDefaultNetwork } from 'modules/web3/helpers/networks';
import { formatValue } from 'lib/string';
import { ErrorBoundary } from 'modules/app/components/ErrorBoundary';
import useSWRInfinite from 'swr/infinite';
import SkeletonThemed from 'modules/app/components/SkeletonThemed';
import { SupportedNetworks } from 'modules/web3/constants/networks';
import { ExecutivePageData, fetchExecutivePageData } from 'modules/executive/api/fetchExecutivePageData';
import { InternalLink } from 'modules/app/components/InternalLink';
import { useNetwork } from 'modules/app/hooks/useNetwork';
import { useChainId, useReadContract } from 'wagmi';
import { chiefOldAbi, chiefOldAddress } from 'modules/contracts/generated';

const MigrationBadge = ({ children, py = [2, 3] }) => (
  <Badge
    variant="primary"
    sx={{
      textTransform: 'none',
      borderColor: 'primary',
      borderRadius: 'small',
      width: '100%',
      whiteSpace: 'normal',
      fontWeight: 'normal',
      fontSize: [1, 2],
      px: [3, 4],
      my: 3,
      py
    }}
  >
    {children}
  </Badge>
);

export const ExecutiveOverview = ({ proposals }: { proposals?: Proposal[] }): JSX.Element => {
  const {
    account,
    voteDelegateContractAddress,
    voteProxyContractAddress,
    voteProxyOldContractAddress,
    votingAccount
  } = useAccount();
  const network = useNetwork();
  const chainId = useChainId();

  const [showHistorical, setShowHistorical] = React.useState(false);

  const { data: lockedMkr, mutate: mutateLockedMkr } = useLockedMkr(votingAccount);

  const { data: votedProposals, mutate: mutateVotedProposals } = useVotedProposals();
  const { data: mkrOnHat } = useMkrOnHat();

  const [startDate, endDate, sortBy, resetExecutiveFilters] = useUiFiltersStore(state => [
    state.executiveFilters.startDate,
    state.executiveFilters.endDate,
    state.executiveSortBy,
    state.resetExecutiveFilters
  ]);

  const EXEC_PAGE_SIZE = 10;

  // Use SWRInfinite to do a loaded pagination of the proposals
  // Preload with the server side data as "fallback"
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end

    const key = `/api/executive?network=${network}&start=${
      pageIndex * EXEC_PAGE_SIZE
    }&limit=${EXEC_PAGE_SIZE}&sortBy=${sortBy}${
      startDate ? `&startDate=${new Date(startDate).getTime()}` : ''
    }${endDate ? `&endDate=${new Date(endDate).getTime()}` : ''}`; // SWR key

    return key;
  };

  const {
    data: paginatedProposals,
    error,
    size,
    setSize,
    isValidating,
    mutate: mutatePaginatedProposals
  } = useSWRInfinite(getKey, fetchJson, {
    refreshInterval: 0,
    revalidateOnFocus: false,
    initialSize: 1,
    revalidateFirstPage: true,
    persistSize: false,
    fallbackData: proposals
  });

  const isLoadingInitialData = !paginatedProposals && !error;

  const isLoadingMore =
    size > 0 && paginatedProposals && typeof paginatedProposals[size - 1] === 'undefined' && isValidating;

  const isEmpty = paginatedProposals?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty ||
    (paginatedProposals && paginatedProposals[paginatedProposals.length - 1]?.length < EXEC_PAGE_SIZE);

  const loadMore = () => {
    setSize(size + 1);
  };

  // revalidate votedProposals if connected address changes
  useEffect(() => {
    mutateVotedProposals();
  }, [votingAccount]);

  useEffect(() => {
    setSize(1);
    mutatePaginatedProposals();
  }, [startDate, endDate]);

  const lockedMkrKeyOldChief = voteProxyOldContractAddress || account;

  const { data: lockedMkrOldChief } = useReadContract({
    address: chiefOldAddress[chainId],
    abi: chiefOldAbi,
    chainId,
    functionName: 'deposits',
    args: [lockedMkrKeyOldChief as `0x${string}`],
    scopeKey: `/user/mkr-locked-old-chief/${lockedMkrKeyOldChief}`,
    query: {
      enabled: !!lockedMkrKeyOldChief
    }
  });

  const votingForSomething = votedProposals && votedProposals.length > 0;

  const prevSortByRef = useRef<string>(sortBy);

  useEffect(() => {
    if (sortBy !== prevSortByRef.current) {
      prevSortByRef.current = sortBy;
      setShowHistorical(true);
    }
  }, [sortBy]);

  const flattenedProposals = useMemo(() => {
    return paginatedProposals?.flat() || [];
  }, [paginatedProposals]);

  const { data: hat } = useHat();

  const showProxyInfo = Boolean(
    lockedMkrOldChief &&
      lockedMkrOldChief === 0n &&
      !voteProxyContractAddress &&
      lockedMkr &&
      lockedMkr === 0n &&
      !voteDelegateContractAddress
  );

  return (
    <PrimaryLayout sx={{ maxWidth: [null, null, null, 'page', 'dashboard'] }}>
      <HeadComponent title="Legacy Executive Proposals" />

      {lockedMkrOldChief && lockedMkrOldChief > 0 && (
        <>
          <ProgressBar step={0} />
          <MigrationBadge py={[2]}>
            <Flex
              sx={{
                justifyContent: 'space-between',
                alignItems: 'center',
                alignContent: 'space-between',
                flexWrap: 'wrap'
              }}
            >
              <Text sx={{ py: 2 }}>
                An executive vote has passed to update the Chief to a new version. You have{' '}
                <b>{formatValue(lockedMkrOldChief)} MKR</b> to withdraw from the old chief.
              </Text>
              <Flex>
                <WithdrawOldChief />
                <ExternalLink
                  href="https://forum.makerdao.com/t/dschief-v1-2-migration-steps/5412"
                  title="View migration steps"
                >
                  <Button
                    variant="outline"
                    sx={{
                      height: '26px',
                      py: 0,
                      px: 2,
                      ml: 1,
                      textTransform: 'uppercase',
                      fontWeight: 'bold',
                      fontSize: '10px',
                      borderColor: 'accentBlue',
                      color: 'accentBlue',
                      ':hover': { color: 'accentBlueEmphasis', borderColor: 'accentBlueEmphasis' },
                      ':hover svg': { color: 'accentBlueEmphasis' }
                    }}
                  >
                    <Text>
                      Forum Post <Icon name="arrowTopRight" sx={{ size: 2, ml: '1px' }} color="accentBlue" />
                    </Text>
                  </Button>
                </ExternalLink>
              </Flex>
            </Flex>
          </MigrationBadge>
        </>
      )}
      {votedProposals &&
        !votingForSomething &&
        lockedMkrOldChief &&
        lockedMkrOldChief === 0n &&
        voteProxyContractAddress &&
        lockedMkr &&
        !voteDelegateContractAddress && (
          <>
            <ProgressBar step={lockedMkr === 0n ? 1 : 2} />
            <MigrationBadge>
              {lockedMkr === 0n ? (
                <Text>
                  Your vote proxy has been created. Please{' '}
                  <Deposit link={'deposit'} showProxyInfo={showProxyInfo} /> into your new vote proxy contract
                </Text>
              ) : (
                'Your vote proxy has been created. You are now ready to vote.'
              )}
            </MigrationBadge>
          </>
        )}
      {votedProposals &&
        !votingForSomething &&
        lockedMkrOldChief &&
        lockedMkrOldChief === 0n &&
        !voteProxyContractAddress &&
        lockedMkr &&
        lockedMkr > 0n && (
          <>
            <ProgressBar step={2} />
            <MigrationBadge>Your MKR has been deposited. You are now ready to vote.</MigrationBadge>
          </>
        )}
      <Stack>
        {account && (
          <ExecutiveBalance
            lockedMkr={lockedMkr || 0n}
            mutateLockedMkr={mutateLockedMkr}
            voteDelegate={voteDelegateContractAddress}
            showProxyInfo={showProxyInfo}
          />
        )}
        <Flex sx={{ alignItems: 'center' }}>
          <Heading variant="microHeading" mr={3} sx={{ display: ['none', 'block'] }}>
            Filters
          </Heading>
          <ProposalsSortBy sx={{ mr: 3 }} />
          <DateFilter />
          {isValidating && <Spinner size={20} ml={3} />}
          {(startDate || endDate) && !isValidating && (
            <Button
              variant={'outline'}
              sx={{ ml: 3 }}
              onClick={resetExecutiveFilters}
              data-testid="executive-reset-filters"
            >
              Clear date filter
            </Button>
          )}
        </Flex>

        <SidebarLayout>
          <Box>
            <Stack gap={3}>
              <Heading as="h1">Legacy Executive Proposals</Heading>
              {!isLoadingInitialData && (
                <Stack gap={4} sx={{ mb: 4 }}>
                  {flattenedProposals
                    .filter(proposal => proposal.active)
                    .map((proposal, index) => {
                      console.log('proposal', proposal);
                      return (
                        <Box key={`proposal-${proposal.address}-${index}`}>
                          <ExecutiveOverviewCard
                            proposal={proposal}
                            isHat={hat ? hat.toLowerCase() === proposal.address.toLowerCase() : false}
                            account={account}
                            votedProposals={votedProposals}
                            mkrOnHat={mkrOnHat}
                          />
                        </Box>
                      );
                    })}
                </Stack>
              )}

              {!isValidating &&
                (startDate || endDate) &&
                flattenedProposals &&
                flattenedProposals.length === 0 && (
                  <Text>No proposals found. Please try clearing filters.</Text>
                )}

              {isLoadingInitialData && (
                <Box>
                  <Box my={3}>
                    <SkeletonThemed width={'100%'} height={'200px'} />
                  </Box>
                </Box>
              )}
              {!showHistorical && flattenedProposals.filter(proposal => proposal.active).length > 0 && (
                <Grid columns="1fr max-content 1fr" sx={{ alignItems: 'center' }}>
                  <Divider />
                  <Button
                    variant="mutedOutline"
                    onClick={() => {
                      setShowHistorical(true);
                    }}
                  >
                    View more proposals
                  </Button>
                  <Divider />
                </Grid>
              )}
              {(showHistorical || flattenedProposals.filter(proposal => proposal.active).length == 0) && (
                <div>
                  {flattenedProposals.filter(proposal => proposal.active).length > 0 && (
                    <Grid mb={4} columns="1fr max-content 1fr" sx={{ alignItems: 'center' }}>
                      <Divider />
                      <Button
                        variant="mutedOutline"
                        onClick={() => {
                          setShowHistorical(false);
                        }}
                      >
                        View fewer proposals
                      </Button>
                      <Divider />
                    </Grid>
                  )}

                  <Stack gap={4}>
                    {flattenedProposals
                      .filter(proposal => !proposal.active)
                      .map((proposal, index) => (
                        <Box key={`proposal-${proposal.address}-${index}`}>
                          <ExecutiveOverviewCard
                            proposal={proposal}
                            isHat={hat ? hat.toLowerCase() === proposal.address.toLowerCase() : false}
                            account={account}
                            votedProposals={votedProposals}
                            mkrOnHat={mkrOnHat}
                          />
                        </Box>
                      ))}
                  </Stack>
                  {isLoadingMore && (
                    <Box>
                      <Box my={3}>
                        <SkeletonThemed width={'100%'} height={'200px'} />
                      </Box>
                      <Box my={3}>
                        <SkeletonThemed width={'100%'} height={'200px'} />
                      </Box>
                      <Box my={3}>
                        <SkeletonThemed width={'100%'} height={'200px'} />
                      </Box>
                    </Box>
                  )}

                  {!isReachingEnd && (
                    <Grid mb={5} mt={4} columns="1fr max-content 1fr" sx={{ alignItems: 'center' }}>
                      <Divider />
                      <Button variant="mutedOutline" onClick={loadMore}>
                        Load more
                      </Button>
                      <Divider />
                    </Grid>
                  )}
                </div>
              )}
            </Stack>
          </Box>
          <Stack gap={3}>
            <Box sx={{ mb: 3 }}>
              <Heading mt={3} mb={2} as="h3" variant="microHeading">
                Custom Spell Voting
              </Heading>
              <Card variant="compact">
                <Text as="p" sx={{ mb: 3, color: 'textSecondary' }}>
                  It is also possible to vote on a custom spell address—only use this in case of emergencies!
                </Text>
                <Box>
                  <InternalLink href={'/custom-spell'} title="View custom spell voting page">
                    <Text color="accentBlue">View Custom Spell Voting Page</Text>
                  </InternalLink>
                </Box>
              </Card>
            </Box>
            <ErrorBoundary componentName="System Info">
              <SystemStatsSidebar
                fields={['chief contract', 'mkr in chief', 'savings rate', 'total dai', 'debt ceiling']}
              />
            </ErrorBoundary>
            <ErrorBoundary componentName="MKR Liquidity">
              <MkrLiquiditySidebar network={network} />
            </ErrorBoundary>
            <ResourceBox type={'executive'} />
            <ResourceBox type={'general'} />
          </Stack>
        </SidebarLayout>
      </Stack>
    </PrimaryLayout>
  );
};

export default function ExecutiveOverviewPage({
  proposals: prefetchedProposals
}: ExecutivePageData): JSX.Element {
  const network = useNetwork();

  const fallbackData = isDefaultNetwork(network)
    ? {
        proposals: prefetchedProposals
      }
    : null;

  const { cache } = useSWRConfig();
  const cacheKey = `page/executive/${network}`;
  const { data, error } = useSWR<ExecutivePageData>(
    !network || isDefaultNetwork(network) ? null : cacheKey,
    () => fetchExecutivePageData(network, true),
    {
      revalidateOnMount: !cache.get(cacheKey),
      ...(fallbackData && { fallbackData })
    }
  );

  if (!isDefaultNetwork(network) && !data && !error) {
    return <PageLoadingPlaceholder />;
  }

  if (error && error.status === 404) {
    return (
      <PrimaryLayout sx={{ maxWidth: 'dashboard' }}>
        <ErrorPage statusCode={404} title="Executive not found" />
      </PrimaryLayout>
    );
  } else if (error) {
    return (
      <PrimaryLayout sx={{ maxWidth: 'dashboard' }}>
        <ErrorPage statusCode={500} title="Error fetching data" />
      </PrimaryLayout>
    );
  }

  const props = {
    proposals: isDefaultNetwork(network) ? prefetchedProposals : data?.proposals || []
  };

  return (
    <ErrorBoundary componentName="Executive Page">
      <ExecutiveOverview {...props} />
    </ErrorBoundary>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { proposals } = await fetchExecutivePageData(SupportedNetworks.MAINNET);

  return {
    revalidate: 60 * 30, // allow revalidation every half an hour in seconds
    props: {
      proposals,
      staticPageGenerationTimeout: 180
    }
  };
};
