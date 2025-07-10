/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { GetStaticProps } from 'next';
import { Heading, Box, Button, Text, Alert, Flex, Spinner } from 'theme-ui';
import PrimaryLayout from 'modules/app/components/layout/layouts/Primary';
import SidebarLayout from 'modules/app/components/layout/layouts/Sidebar';
import Stack from 'modules/app/components/layout/layouts/Stack';
import ResourceBox from 'modules/app/components/ResourceBox';
import SystemStatsSidebar from 'modules/app/components/SystemStatsSidebar';
import { HeadComponent } from 'modules/app/components/layout/Head';
import { ErrorBoundary } from 'modules/app/components/ErrorBoundary';
import { useEffect, useState } from 'react';
import { SkyExecutivesResponse } from './api/sky/executives';
import SkyExecutiveOverviewCard from 'modules/executive/components/SkyExecutiveOverviewCard';
import SkeletonThemed from 'modules/app/components/SkeletonThemed';
import { InternalLink } from 'modules/app/components/InternalLink';

export default function ExecutivePage(): JSX.Element {
  const [skyExecutives, setSkyExecutives] = useState<SkyExecutivesResponse>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [hatAddress, setHatAddress] = useState<any>(null);
  const [skyOnHat, setSkyOnHat] = useState<any>(null);

  const fetchSkyHatInfo = async () => {
    //TOD: change url to production endpoint
    const response = await fetch('/api/sky/hat');
    const data = await response.json();
    setHatAddress(data.hatAddress);
    setSkyOnHat(data.skyOnHat);
  };

  const fetchSkyExecutives = async (pageNum = 1) => {
    try {
      setLoading(true);
      setError(null);

      const pageSize = 5;

      const response = await fetch(`/api/sky/executives?pageSize=${pageSize}&page=${pageNum}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch polls: ${response.status}`);
      }

      const data: SkyExecutivesResponse = await response.json();

      setSkyExecutives(prev => [...prev, ...data]);

      setHasMore(data.length === pageSize);
    } catch (err) {
      console.error('Error fetching Sky polls:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch Sky polls');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchSkyExecutives(nextPage);
  };

  useEffect(() => {
    // Reset state and fetch first page
    setSkyExecutives([]);
    setPage(1);
    fetchSkyExecutives(1);
    fetchSkyHatInfo();
  }, []);

  return (
    <PrimaryLayout sx={{ maxWidth: [null, null, null, 'page', 'dashboard'] }}>
      <HeadComponent title="Executive Proposals" />

      <SidebarLayout>
        <Box>
          <Stack gap={4}>
            <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Heading as="h1">Executive Proposals</Heading>
              <InternalLink href="/legacy-executive" title="Legacy Executive Proposals">
                <Button variant="outline">Legacy Executives</Button>
              </InternalLink>
            </Flex>

            {/* Sky Executives Section */}
            {error ? (
              <Alert variant="error" sx={{ mb: 4 }}>
                <Text>Error loading Sky executives: {error}</Text>
                <Button variant="outline" sx={{ mt: 2 }} onClick={() => fetchSkyExecutives(1)}>
                  Retry
                </Button>
              </Alert>
            ) : (
              <Box>
                {loading && skyExecutives.length === 0 ? (
                  <Stack gap={4}>
                    {[...Array(4)].map((_, i) => (
                      <SkeletonThemed key={i} height="300px" />
                    ))}
                  </Stack>
                ) : skyExecutives.length > 0 ? (
                  <Box>
                    <Stack gap={4} sx={{ mb: 4 }}>
                      {skyExecutives.map(executive => (
                        <Box key={executive.key}>
                          <SkyExecutiveOverviewCard
                            proposal={{
                              ...executive,
                              spellData: {
                                ...executive.spellData,
                                nextCastTime: executive.spellData.nextCastTime
                                  ? new Date(executive.spellData.nextCastTime)
                                  : undefined,
                                datePassed: executive.spellData.datePassed
                                  ? new Date(executive.spellData.datePassed)
                                  : undefined,
                                dateExecuted: executive.spellData.dateExecuted
                                  ? new Date(executive.spellData.dateExecuted)
                                  : undefined,
                                officeHours: executive.spellData.officeHours === 'true'
                              }
                            }}
                            isHat={executive.address === hatAddress}
                            skyOnHat={skyOnHat}
                          />
                        </Box>
                      ))}
                    </Stack>

                    {hasMore && (
                      <Flex sx={{ justifyContent: 'center', mt: 4 }}>
                        <Button
                          variant="outline"
                          onClick={loadMore}
                          disabled={loading}
                          sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                        >
                          {loading && <Spinner size={16} />}
                          Load More Executives
                        </Button>
                      </Flex>
                    )}
                  </Box>
                ) : (
                  <Text sx={{ fontStyle: 'italic', color: 'textSecondary' }}>
                    No executives available from Sky governance.
                  </Text>
                )}
              </Box>
            )}
          </Stack>
        </Box>

        <Stack gap={3}>
          <ErrorBoundary componentName="System Info">
            <SystemStatsSidebar
              fields={['chief contract', 'mkr in chief', 'savings rate', 'total dai', 'debt ceiling']}
            />
          </ErrorBoundary>
          <ResourceBox type={'executive'} />
          <ResourceBox type={'general'} />
        </Stack>
      </SidebarLayout>
    </PrimaryLayout>
  );
}

//TODO: add static props
export const getStaticProps: GetStaticProps = async () => {
  return {
    revalidate: 60 * 30, // allow revalidation every half an hour in seconds
    props: {}
  };
};
