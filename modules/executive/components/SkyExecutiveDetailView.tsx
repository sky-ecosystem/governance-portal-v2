/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { useState } from 'react';
import { Card, Flex, Divider, Heading, Text, Box, Button, Spinner, Badge } from 'theme-ui';
import { useBreakpointIndex } from '@theme-ui/match-media';
import Icon from 'modules/app/components/Icon';
import { formatDateWithTime } from 'lib/datetime';
import PrimaryLayout from 'modules/app/components/layout/layouts/Primary';
import SidebarLayout from 'modules/app/components/layout/layouts/Sidebar';
import Stack from 'modules/app/components/layout/layouts/Stack';
import Tabs from 'modules/app/components/Tabs';
import SystemStatsSidebar from 'modules/app/components/SystemStatsSidebar';
import ResourceBox from 'modules/app/components/ResourceBox';
import { HeadComponent } from 'modules/app/components/layout/Head';
import { ErrorBoundary } from 'modules/app/components/ErrorBoundary';
import { InternalLink } from 'modules/app/components/InternalLink';
import { ExternalLink } from 'modules/app/components/ExternalLink';
import { SkyExecutiveDetailResponse } from 'modules/executive/types';
import { StatBox } from 'modules/app/components/StatBox';
import { formatValue } from 'lib/string';
import { parseUnits } from 'viem';
import { useSkyExecutiveSupportersForSpell } from 'modules/executive/hooks/useSkyExecutiveSupporters';
import AddressIconBox from 'modules/address/components/AddressIconBox';
import SkyExecutiveStatusBox from './SkyExecutiveStatusBox';

const editMarkdown = (content: string) => {
  // hide the duplicate proposal title
  return (
    content
      .replace(/^<h1>.*<\/h1>|^<h2>.*<\/h2>/, '')
      // fixes issue with older images that are too large
      .replace(/(<img)(.*src=".*")(>)/g, '$1 width="100%"$2$3')
  );
};

type SkyExecutiveDetailViewProps = {
  executive: SkyExecutiveDetailResponse;
  skyOnHat?: bigint;
};

const SkyExecutiveDetailView = ({ executive, skyOnHat }: SkyExecutiveDetailViewProps) => {
  const bpi = useBreakpointIndex({ defaultIndex: 2 });
  const [showAllSupporters, setShowAllSupporters] = useState(false);

  // Fetch supporters data from Sky API
  const {
    supporters,
    loading: supportersLoading,
    error: supportersError
  } = useSkyExecutiveSupportersForSpell(executive.address);

  const isHat = executive.spellData?.hasBeenCast || false;

  return (
    <PrimaryLayout sx={{ maxWidth: 'dashboard' }}>
      <SidebarLayout>
        <HeadComponent
          title={executive.title}
          description={`${executive.title}. ${executive.proposalBlurb}`}
        />

        <div>
          <Flex mb={2} sx={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <InternalLink href="/executive" title="View executive proposals">
              <Button variant="mutedOutline">
                <Flex sx={{ display: ['none', 'block'], alignItems: 'center', whiteSpace: 'nowrap' }}>
                  <Icon name="chevron_left" sx={{ size: 2, mr: 2 }} />
                  Back to Execs
                </Flex>
                <Flex sx={{ display: ['block', 'none'], alignItems: 'center', whiteSpace: 'nowrap' }}>
                  Back to Execs
                </Flex>
              </Button>
            </InternalLink>
            <Flex sx={{ justifyContent: 'space-between' }}>
              {executive.ctx?.prev?.key && (
                <InternalLink
                  href={`/sky-executive/${executive.ctx.prev.key}`}
                  title="View previous executive"
                  scroll={false}
                >
                  <Button variant="mutedOutline">
                    <Flex sx={{ alignItems: 'center', whiteSpace: 'nowrap' }}>
                      <Icon name="chevron_left" sx={{ size: 2, mr: 2 }} />
                      {bpi > 0 ? 'Previous Exec' : 'Previous'}
                    </Flex>
                  </Button>
                </InternalLink>
              )}
              {executive.ctx?.next?.key && (
                <InternalLink
                  href={`/sky-executive/${executive.ctx.next.key}`}
                  title="View next executive"
                  scroll={false}
                  styles={{ ml: 2 }}
                >
                  <Button variant="mutedOutline">
                    <Flex sx={{ alignItems: 'center', whiteSpace: 'nowrap' }}>
                      {bpi > 0 ? 'Next Exec' : 'Next'}
                      <Icon name="chevron_right" sx={{ size: 2, ml: 2 }} />
                    </Flex>
                  </Button>
                </InternalLink>
              )}
            </Flex>
          </Flex>

          <Card sx={{ p: [0, 0] }}>
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
                    Posted {formatDateWithTime(new Date(executive.date))}
                  </Text>
                </Flex>

                <Flex sx={{ mb: 2, flexDirection: 'column' }}>
                  <Heading mt="2" sx={{ fontSize: [5, 6] }}>
                    {executive.title}
                  </Heading>

                  <Text sx={{ my: 2, color: 'textSecondary' }}>{executive.proposalBlurb}</Text>

                  <Flex sx={{ justifyContent: 'space-between', mb: 2, flexDirection: 'column' }}>
                    {executive.proposalLink && (
                      <Box>
                        <ExternalLink title="View on Sky Portal" href={executive.proposalLink}>
                          <Text sx={{ fontSize: 3, fontWeight: 'semiBold' }}>
                            View on Sky Portal
                            <Icon sx={{ ml: 2 }} name="arrowTopRight" size={2} />
                          </Text>
                        </ExternalLink>
                      </Box>
                    )}
                  </Flex>

                  {/* Executive Stats */}
                  <Flex sx={{ justifyContent: 'space-between', mb: 3 }}>
                    <StatBox value={executive.address} label="Spell Address" styles={{ fontSize: [2, 3] }} />
                    <StatBox
                      value={
                        executive.spellData?.skySupport
                          ? formatValue(BigInt(executive.spellData.skySupport))
                          : undefined
                      }
                      label="SKY Support"
                    />
                    <StatBox value={supporters.length.toString()} label="Supporters" />
                  </Flex>

                  {/* Executive Badges */}
                  <Flex sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                    {isHat && (
                      <Box
                        sx={{
                          borderRadius: '12px',
                          padding: '4px 8px',
                          display: 'flex',
                          alignItems: 'center',
                          color: 'tagColorThree',
                          backgroundColor: 'tagColorThreeBg',
                          my: 2
                        }}
                      >
                        <Text sx={{ fontSize: 2 }}>Governing Proposal</Text>
                      </Box>
                    )}
                  </Flex>
                </Flex>
              </Box>
            </Flex>

            <Tabs
              tabListStyles={{ pl: [3, 4] }}
              tabTitles={['Executive Detail']}
              tabRoutes={['Executive Detail']}
              tabPanels={[
                <div key="executive-detail">
                  <Box
                    data-testid="executive-detail"
                    sx={{ variant: 'markdown.default', p: [3, 4] }}
                    dangerouslySetInnerHTML={{
                      __html: editMarkdown(executive.content || executive.proposalBlurb)
                    }}
                  />
                </div>
              ]}
              banner={
                <Box>
                  <Divider my={0} />
                  <SkyExecutiveStatusBox executive={executive} skyOnHat={skyOnHat} />
                  <Divider my={0} />
                </Box>
              }
            />
          </Card>
        </div>

        <Stack gap={3}>
          {/* Read-only notice for Sky executives */}
          <Card sx={{ p: 3, backgroundColor: 'background', border: '1px solid', borderColor: 'muted' }}>
            <Flex sx={{ alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="info" sx={{ mr: 2, color: 'primary', size: 4 }} />
              <Text sx={{ textAlign: 'center', color: 'textSecondary' }}>
                This is a Sky governance executive. Voting is only available on{' '}
                <ExternalLink href="https://vote.sky.money" title="Sky voting portal">
                  <Text>vote.sky.money</Text>
                </ExternalLink>
              </Text>
            </Flex>
          </Card>

          {/* Supporters List */}
          <Box>
            <Flex sx={{ mt: 3, mb: 2, alignItems: 'center', justifyContent: 'space-between' }}>
              <Heading as="h3" variant="microHeading" sx={{ mr: 1 }}>
                Supporters
              </Heading>
              <Flex sx={{ alignItems: 'center' }}>
                <Box sx={{ pt: '3px', mr: 1 }}>
                  <Icon name="info" color="textSecondary" size={14} />
                </Box>
                <Text sx={{ fontSize: 1, color: 'textSecondary' }}>Updated every five minutes</Text>
              </Flex>
            </Flex>
            <ErrorBoundary componentName="Sky Executive Supporters">
              <Card variant="compact" p={3}>
                <Box>
                  {supportersLoading && !supportersError && (
                    <Flex
                      sx={{
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <Spinner size={32} />
                    </Flex>
                  )}

                  {supportersError && (
                    <Flex
                      sx={{
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: 4,
                        color: 'onSecondary'
                      }}
                    >
                      List of supporters currently unavailable
                    </Flex>
                  )}
                  {!supportersLoading && !supportersError && supporters.length === 0 && (
                    <Flex
                      sx={{
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <Text>Currently there are no supporters</Text>
                    </Flex>
                  )}

                  <Flex sx={{ flexDirection: 'column' }}>
                    {supporters.slice(0, showAllSupporters ? supporters.length : 10).map(supporter => (
                      <Flex
                        sx={{
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          ':not(:last-child)': {
                            mb: 2
                          }
                        }}
                        key={supporter.address}
                      >
                        <InternalLink
                          href={`/address/${supporter.address}`}
                          title="Profile details"
                          styles={{ maxWidth: '265px' }}
                        >
                          <Text
                            sx={{
                              color: 'accentBlue',
                              fontSize: 2,
                              ':hover': { color: 'accentBlueEmphasis' }
                            }}
                          >
                            <AddressIconBox address={supporter.address} width={30} limitTextLength={70} />
                          </Text>
                        </InternalLink>
                        <Flex sx={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                          <Text>
                            {parseFloat(supporter.percent) > 0.01
                              ? parseFloat(supporter.percent).toFixed(2)
                              : '<0.01'}
                            %
                          </Text>
                          <Text color="onSecondary" sx={{ fontSize: 2 }}>
                            {formatValue(
                              parseUnits(supporter.deposits, 18),
                              undefined,
                              undefined,
                              true,
                              true
                            )}{' '}
                            SKY
                          </Text>
                        </Flex>
                      </Flex>
                    ))}

                    {!showAllSupporters && supporters.length > 10 && (
                      <Button
                        onClick={() => setShowAllSupporters(true)}
                        variant="outline"
                        data-testid="button-show-more-sky-executive-supporters"
                        sx={{ mt: 2, alignSelf: 'center' }}
                      >
                        <Text color="text" variant="caps">
                          Show all supporters
                        </Text>
                      </Button>
                    )}
                  </Flex>
                </Box>
              </Card>
            </ErrorBoundary>
          </Box>

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
          <ResourceBox type={'executive'} />
          <ResourceBox type={'general'} />
        </Stack>
      </SidebarLayout>
    </PrimaryLayout>
  );
};

export default SkyExecutiveDetailView;
