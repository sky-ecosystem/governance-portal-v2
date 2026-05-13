/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { useEffect, useState } from 'react';
import { Box, Button, Card, Flex, Heading, Text, Input } from 'theme-ui';
import PrimaryLayout from 'modules/app/components/layout/layouts/Primary';
import Stack from 'modules/app/components/layout/layouts/Stack';
import { HeadComponent } from 'modules/app/components/layout/Head';
import { fetchJson } from 'lib/fetchJson';
import { ErrorBoundary } from 'modules/app/components/ErrorBoundary';
import {
  allDelegatesCacheKey,
  delegatesGithubCacheKey,
  executiveSupportersCacheKey,
  getAllPollsCacheKey,
  getPollTallyCacheKey,
  githubExecutivesCacheKey,
  executiveProposalsCacheKey
} from 'modules/cache/constants/cache-keys';
import { invalidateCache } from 'modules/cache/invalidateCache';
import { toast } from 'react-toastify';
import { getCacheInfo } from 'modules/cache/getCacheInfo';
import { useNetwork } from 'modules/app/hooks/useNetwork';

const DashboardPage = (): React.ReactElement => {
  const network = useNetwork();
  const [loading, setLoading] = useState(false);
  const [pollId, setPollId] = useState('');
  const [password, setPassword] = useState('');
  const [signedIn, setSignedIn] = useState(false);
  const [cacheInfo, setCacheInfo] = useState({});

  const fetchCacheInfo = async () => {
    const info = await getCacheInfo(network);

    setCacheInfo(info);
  };

  useEffect(() => {
    if (signedIn) {
      fetchCacheInfo();
    }
  }, [signedIn]);

  const invalidate = async (cacheKey: string) => {
    setLoading(true);
    try {
      await invalidateCache(cacheKey, password, network);
      await fetchCacheInfo();
      setLoading(false);
      toast.success(`Cache ${cacheKey} cleared`);
    } catch (e) {
      setLoading(false);
      if (e.toString().includes('Unauthorized')) {
        toast.error('Unauthorized');
      } else {
        toast.error('Error invalidating cache');
      }
    }
  };

  const logIn = async () => {
    if (!password) {
      toast.error('Invalid password');
      return;
    }

    setLoading(true);
    try {
      await fetchJson('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password
        })
      });
      setLoading(false);
      toast.success('Authorization successful');
      setSignedIn(true);
    } catch (e) {
      setLoading(false);
      toast.error('Invalid password');
    }
  };
  return (
    <PrimaryLayout sx={{ maxWidth: 'page' }}>
      <HeadComponent title="Dashboard" />
      <Stack gap={3}>
        <Heading>Dashboard</Heading>
        {!signedIn && (
          <Card>
            <Box
              as="form"
              onSubmit={e => {
                e.preventDefault();
                logIn();
              }}
            >
              <Text as="h3">Enter Password</Text>
              <Flex sx={{ mt: 3 }}>
                <Box sx={{ mr: 2 }}>
                  <Input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </Box>
                <Button type="submit">Submit</Button>
              </Flex>
            </Box>
          </Card>
        )}
        {signedIn && (
          <Box>
            <Card>
              <ErrorBoundary componentName="Cache invalidation">
                <Text as="h3">Invalidate cache</Text>
                {loading && <Box>Clearing selected cache...</Box>}
                <Flex sx={{ flexWrap: 'wrap', alignItems: 'center' }}>
                  <Box sx={{ m: 3 }}>
                    <Button onClick={() => invalidate(getAllPollsCacheKey())} disabled={loading}>
                      All polls
                    </Button>
                  </Box>
                  <Box sx={{ m: 3 }}>
                    <Button
                      onClick={() => {
                        invalidate(githubExecutivesCacheKey);
                        invalidate(executiveProposalsCacheKey);
                      }}
                      disabled={loading}
                    >
                      Executive proposals
                    </Button>
                  </Box>
                  <Box sx={{ m: 3 }}>
                    <Button onClick={() => invalidate(executiveSupportersCacheKey)} disabled={loading}>
                      Executive supporters
                    </Button>
                  </Box>

                  <Box sx={{ m: 3 }}>
                    <Button
                      onClick={() => {
                        invalidate(delegatesGithubCacheKey);
                        invalidate(allDelegatesCacheKey);
                      }}
                      disabled={loading}
                    >
                      Delegates
                    </Button>
                  </Box>
                  <Flex sx={{ m: 3 }}>
                    <Input
                      type="text"
                      value={pollId}
                      onChange={e => setPollId(e.target.value)}
                      placeholder="poll-id (ex: 242)"
                      sx={{ mr: 2 }}
                    />
                    <Button
                      onClick={() => invalidate(getPollTallyCacheKey(parseInt(pollId)))}
                      disabled={loading}
                      sx={{ minWidth: 150 }}
                    >
                      Tally by poll ID
                    </Button>
                  </Flex>
                </Flex>
              </ErrorBoundary>
            </Card>
            <Card sx={{ mt: 4 }}>
              <ErrorBoundary componentName="Cache info">
                <Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text as="h3">Cache TTL info</Text>
                  <Button variant="outline" onClick={fetchCacheInfo}>
                    Refresh
                  </Button>
                </Flex>
                <Flex sx={{ mt: 2 }}>
                  <Text sx={{ fontWeight: 'semiBold' }}>All polls:</Text>
                  {cacheInfo[getAllPollsCacheKey()] > 0 ? (
                    <Text sx={{ ml: 2 }}>{`Expires in ${cacheInfo[getAllPollsCacheKey()]} seconds`}</Text>
                  ) : (
                    <Text sx={{ ml: 2 }}>No cache found</Text>
                  )}
                </Flex>
                <Flex sx={{ mt: 2 }}>
                  <Text sx={{ fontWeight: 'semiBold' }}>Executives proposals:</Text>
                  {cacheInfo[executiveProposalsCacheKey] > 0 ? (
                    <Text
                      sx={{ ml: 2 }}
                    >{`Expires in ${cacheInfo[executiveProposalsCacheKey]} seconds`}</Text>
                  ) : (
                    <Text sx={{ ml: 2 }}>No cache found</Text>
                  )}
                </Flex>
                <Flex sx={{ mt: 2 }}>
                  <Text sx={{ fontWeight: 'semiBold' }}>Executive supporters:</Text>
                  {cacheInfo[executiveSupportersCacheKey] > 0 ? (
                    <Text
                      sx={{ ml: 2 }}
                    >{`Expires in ${cacheInfo[executiveSupportersCacheKey]} seconds`}</Text>
                  ) : (
                    <Text sx={{ ml: 2 }}>No cache found</Text>
                  )}
                </Flex>
                <Flex sx={{ mt: 2 }}>
                  <Text sx={{ fontWeight: 'semiBold' }}>Delegates:</Text>
                  {cacheInfo[delegatesGithubCacheKey] > 0 ? (
                    <Text sx={{ ml: 2 }}>{`Expires in ${cacheInfo[delegatesGithubCacheKey]} seconds`}</Text>
                  ) : (
                    <Text sx={{ ml: 2 }}>No cache found</Text>
                  )}
                </Flex>
              </ErrorBoundary>
            </Card>
          </Box>
        )}
      </Stack>
    </PrimaryLayout>
  );
};

export default DashboardPage;
