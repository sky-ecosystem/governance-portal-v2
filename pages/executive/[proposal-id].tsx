/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { useState, useEffect, useMemo } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import ErrorPage from 'modules/app/components/ErrorPage';
import { Button, Card, Flex, Heading, Spinner, Box, Text, Divider, Badge } from 'theme-ui';
import useSWR, { useSWRConfig } from 'swr';
import Icon from 'modules/app/components/Icon';
import { useBreakpointIndex } from '@theme-ui/match-media';
import { getExecutiveProposal, getGithubExecutives } from 'modules/executive/api/fetchExecutives';
import { useSpellData } from 'modules/executive/hooks/useSpellData';
import { useVotedProposals } from 'modules/executive/hooks/useVotedProposals';
import { useHat } from 'modules/executive/hooks/useHat';
import { useMkrOnHat } from 'modules/executive/hooks/useMkrOnHat';
import { cutMiddle, formatValue } from 'lib/string';
import { getStatusText } from 'modules/executive/helpers/getStatusText';
import { isDefaultNetwork } from 'modules/web3/helpers/networks';
import Stack from 'modules/app/components/layout/layouts/Stack';
import Tabs from 'modules/app/components/Tabs';
import PrimaryLayout from 'modules/app/components/layout/layouts/Primary';
import SidebarLayout from 'modules/app/components/layout/layouts/Sidebar';
import ResourceBox from 'modules/app/components/ResourceBox';
import { StatBox } from 'modules/app/components/StatBox';
import { SpellEffectsTab } from 'modules/executive/components/SpellEffectsTab';
import { InternalLink } from 'modules/app/components/InternalLink';
import { CMSProposal, Proposal, SpellData, SpellDiff } from 'modules/executive/types';
import { HeadComponent } from 'modules/app/components/layout/Head';
import { ZERO_ADDRESS } from 'modules/web3/constants/addresses';
import { useAccount } from 'modules/app/hooks/useAccount';
import { ErrorBoundary } from 'modules/app/components/ErrorBoundary';
import AddressIconBox from 'modules/address/components/AddressIconBox';
import { DEFAULT_NETWORK } from 'modules/web3/constants/networks';
import { fetchJson } from 'lib/fetchJson';
import { StatusText } from 'modules/app/components/StatusText';
import EtherscanLink from 'modules/web3/components/EtherscanLink';
import { trimProposalKey } from 'modules/executive/helpers/trimProposalKey';
import { parseEther } from 'viem';
import { useNetwork } from 'modules/app/hooks/useNetwork';

type Props = {
  proposal: Proposal;
  spellDiffs: SpellDiff[];
};

const INITIAL_SUPPORTERS_COUNT = 10;

const editMarkdown = content => {
  // hide the duplicate proposal title
  return content.replace(/^<h1>.*<\/h1>|^<h2>.*<\/h2>/, '');
};

const ProposalTimingBanner = ({
  proposal,
  spellData,
  mkrOnHat
}: {
  proposal: CMSProposal;
  spellData?: SpellData;
  mkrOnHat?: bigint;
}): JSX.Element => {
  if (spellData || proposal.address === ZERO_ADDRESS)
    return (
      <>
        <Divider my={1} />
        <Flex sx={{ py: 2, justifyContent: 'center', fontSize: [1, 2], color: 'onSecondary' }}>
          <StatusText>{getStatusText({ proposalAddress: proposal.address, spellData, mkrOnHat })}</StatusText>
        </Flex>
        <Divider sx={{ mt: 1 }} />
      </>
    );
  return <></>;
};

const ProposalView = ({ proposal, spellDiffs }: Props): JSX.Element => {
  const { data: spellData } = useSpellData(proposal.address);

  const { account } = useAccount();

  const bpi = useBreakpointIndex();
  const network = useNetwork();
  const { cache } = useSWRConfig();

  const dataKey = `/api/executive/supporters?network=${network}`;
  const { data: allSupporters, error: supportersError } = useSWR<Proposal[]>(dataKey, fetchJson, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnMount: !cache.get(dataKey),
    revalidateOnReconnect: false
  });

  const { data: votedProposals } = useVotedProposals();
  const { data: mkrOnHat } = useMkrOnHat();
  const { data: hat } = useHat();
  const isHat = hat && hat.toLowerCase() === proposal.address.toLowerCase();

  const supporters = allSupporters ? allSupporters[proposal.address.toLowerCase()] : null;

  const [voting, setVoting] = useState(false);
  const [showAllSupporters, setShowAllSupporters] = useState(false);
  const close = () => setVoting(false);

  const hasVotedFor =
    votedProposals &&
    !!votedProposals.find(
      proposalAddress => proposalAddress.toLowerCase() === proposal.address.toLowerCase()
    );

  const loadMoreSupporters = () => {
    setShowAllSupporters(true);
  };

  const filteredSupporters = useMemo(
    () => (showAllSupporters ? supporters : supporters?.slice(0, INITIAL_SUPPORTERS_COUNT)),
    [supporters, showAllSupporters]
  );

  return (
    <PrimaryLayout sx={{ maxWidth: 'dashboard' }}>
      <HeadComponent
        title={`Proposal ${proposal['title'] ? proposal['title'] : proposal.address}`}
        description={`See the results of the MakerDAO executive proposal ${
          proposal['title'] ? proposal['title'] : proposal.address
        }.`}
      />
      <SidebarLayout>
        <Box>
          <InternalLink href="/executive" title="View executive proposals">
            <Button variant="mutedOutline" mb={2}>
              <Flex sx={{ alignItems: 'center', whiteSpace: 'nowrap' }}>
                <Icon name="chevron_left" sx={{ size: 2, mr: 2 }} />
                Back to Execs
              </Flex>
            </Button>
          </InternalLink>
          <Card sx={{ p: [0, 0] }}>
            <Heading pt={[3, 4]} px={[3, 4]} pb="3" sx={{ fontSize: [5, 6] }}>
              {proposal.title ? proposal.title : proposal.address}
            </Heading>
            <Flex>
              <Flex sx={{ alignItems: 'center', flexWrap: 'wrap', ml: [3, 4] }}>
                {isHat && proposal.address !== ZERO_ADDRESS ? (
                  // TODO this should be made the primary badge component in our theme
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
                ) : null}
              </Flex>

              {hasVotedFor && (
                <Badge
                  variant="primary"
                  sx={{
                    color: 'primary',
                    borderColor: 'primary',
                    textTransform: 'uppercase',
                    display: 'inline-flex',
                    alignItems: 'center',
                    m: 1,
                    border: 'none'
                  }}
                >
                  <Flex sx={{ display: 'inline-flex', pr: 2 }}>
                    <Icon name="verified" size={3} />
                  </Flex>
                  Your Vote
                </Badge>
              )}
            </Flex>
            <Flex sx={{ mx: [3, 4], mb: 3, justifyContent: 'space-between' }}>
              <StatBox
                value={
                  <Box sx={{ fontSize: [2, 5] }}>
                    <EtherscanLink hash={proposal.address} type="address" network={network} showAddress />
                  </Box>
                }
                label="Spell Address"
                renderAsDiv
              />
              <StatBox
                value={spellData && spellData.mkrSupport && formatValue(BigInt(spellData.mkrSupport))}
                label="MKR Support"
              />
              <StatBox
                value={
                  allSupporters && (!supporters || supporters.length === 0)
                    ? '0'
                    : supporters && supporters.length
                }
                label="Supporters"
              />
            </Flex>
            {'about' in proposal ? (
              <Tabs
                tabListStyles={{ pl: [3, 4] }}
                tabTitles={['Proposal Detail', 'Spell Details']}
                tabRoutes={['Proposal Detail', 'Spell Details']}
                tabPanels={[
                  <Box
                    key={'about'}
                    sx={{ variant: 'markdown.default', p: [3, 4] }}
                    dangerouslySetInnerHTML={{ __html: editMarkdown(proposal.content) }}
                  />,
                  <Box key={'spell'} sx={{ p: [3, 4] }}>
                    <SpellEffectsTab proposal={proposal} spellData={spellData} spellDiffs={spellDiffs} />
                  </Box>
                ]}
                banner={
                  <ErrorBoundary componentName="Executive Timing Banner">
                    <ProposalTimingBanner proposal={proposal} spellData={spellData} mkrOnHat={mkrOnHat} />
                  </ErrorBoundary>
                }
              ></Tabs>
            ) : (
              <Tabs
                tabListStyles={{ pl: [3, 4] }}
                tabTitles={['Spell Details']}
                tabPanels={[
                  <Box key={'spell'} sx={{ p: [3, 4] }}>
                    <SpellEffectsTab proposal={proposal} spellData={spellData} />
                  </Box>
                ]}
              />
            )}
          </Card>
        </Box>
        <Stack gap={3} sx={{ mb: [5, 0] }}>
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
            <ErrorBoundary componentName="Executive Supporters">
              <Card variant="compact" p={3}>
                <Box>
                  {!allSupporters && !supportersError && (
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
                  {allSupporters && (!supporters || supporters.length === 0) && (
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
                    {filteredSupporters &&
                      filteredSupporters.length > 0 &&
                      filteredSupporters.map(supporter => (
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
                            <Text>{supporter.percent > 0.01 ? supporter.percent : '<0.01'}%</Text>
                            <Text color="onSecondary" sx={{ fontSize: 2 }}>
                              {formatValue(parseEther(supporter.deposits), undefined, undefined, true, true)}{' '}
                              MKR
                            </Text>
                          </Flex>
                        </Flex>
                      ))}

                    {filteredSupporters && supporters && filteredSupporters.length < supporters.length && (
                      <Button
                        onClick={loadMoreSupporters}
                        variant="outline"
                        data-testid="button-show-more-executive-supporters"
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
          <ResourceBox type={'executive'} />
          <ResourceBox type={'general'} />
        </Stack>
      </SidebarLayout>
    </PrimaryLayout>
  );
};

const LoadingIndicator = () => (
  <PrimaryLayout sx={{ maxWidth: 'dashboard' }}>
    <Flex sx={{ justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
      <Spinner size={48} />{' '}
      <Text ml={3} sx={{ fontSize: 4 }}>
        Loading proposal...
      </Text>
    </Flex>
  </PrimaryLayout>
);

// HOC to fetch the proposal depending on the network
export default function ProposalPage({
  proposal: prefetchedProposal
}: // spellDiffs: prefetchedSpellDiffs
{
  proposal?: Proposal;
  // spellDiffs: SpellDiff[];
}): JSX.Element {
  const [_proposal, _setProposal] = useState<Proposal>();
  const [error, setError] = useState<string>();
  const router = useRouter();
  const { query } = router;
  const network = useNetwork();
  const proposalId = query['proposal-id'] as string;

  /**Disabling spell-effects until multi-transactions endpoint is ready */
  // const spellAddress = prefetchedProposal?.address;
  // const nextCastTime = prefetchedProposal?.spellData?.nextCastTime?.getTime();
  // const hasBeenCast = prefetchedProposal?.spellData.hasBeenCast;

  // If we didn't fetch the diffs during build, attempt to fetch them now
  // const { data: diffs } = useSWR(
  //   prefetchedProposal && prefetchedSpellDiffs.length === 0
  //     ? `/api/executive/state-diff/${spellAddress}?nextCastTime=${nextCastTime}&hasBeenCast=${hasBeenCast}&network=${network}`
  //     : null
  // );

  // fetch proposal contents at run-time if on any network other than the default
  useEffect(() => {
    if (!network) return;
    if (!isDefaultNetwork(network) && query['proposal-id']) {
      fetchJson(`/api/executive/${query['proposal-id']}?network=${network}`)
        .then(response => {
          _setProposal(response);
        })
        .catch(setError);
    }
  }, [query['proposal-id'], network]);

  // Check for fallback state first
  if (router.isFallback) {
    return <LoadingIndicator />;
  }

  // Now check for actual errors or missing proposals AFTER fallback is resolved
  if (error || (isDefaultNetwork(network) && !prefetchedProposal?.key)) {
    return (
      <PrimaryLayout sx={{ maxWidth: 'dashboard' }}>
        <ErrorPage
          statusCode={404}
          title="Executive proposal either does not exist, or could not be fetched at this time"
        />
      </PrimaryLayout>
    );
  }

  // Loading check for non-default networks
  if (!isDefaultNetwork(network) && !_proposal) {
    return <LoadingIndicator />;
  }

  const proposal = isDefaultNetwork(network) ? prefetchedProposal : _proposal;
  // const spellDiffs = prefetchedSpellDiffs.length > 0 ? prefetchedSpellDiffs : diffs;

  // Check if proposal is null before rendering
  if (!proposal) {
    return (
      <PrimaryLayout sx={{ maxWidth: 'dashboard' }}>
        <ErrorPage
          statusCode={404}
          title="Executive proposal either does not exist, or could not be fetched at this time"
        />
      </PrimaryLayout>
    );
  }

  return (
    <ErrorBoundary componentName="Executive Page">
      <ProposalView proposal={proposal} spellDiffs={[]} />
    </ErrorBoundary>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // fetch proposal contents at build-time if on the default network
  const proposalId = (params || {})['proposal-id'] as string;

  const proposal: Proposal | null = await getExecutiveProposal(proposalId, DEFAULT_NETWORK.network);

  /**Disabling spell-effects until multi-transactions endpoint is ready */
  // // Only fetch at build time if spell has been cast, and it's not older than two months (to speed up builds)
  // const spellDiffs: SpellDiff[] =
  //   proposal &&
  //   proposal.spellData?.hasBeenCast &&
  //   isAfter(new Date(proposal?.date), sub(new Date(), { months: 2 }))
  //     ? await fetchHistoricalSpellDiff(proposal.address)
  //     : [];

  return {
    revalidate: 60 * 60, // Revalidate each hour
    props: {
      proposal,
      // spellDiffs,
      revalidate: 30 // Ensures that after a spell is cast, we regenerate the static page with fetchHistoricalSpellDiff
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const proposals = await getGithubExecutives(DEFAULT_NETWORK.network);
  const MAX_PROPOSALS = 5;

  const paths = proposals
    .slice(0, MAX_PROPOSALS)
    .map(proposal => `/executive/${trimProposalKey(proposal.key)}`);

  return {
    paths,
    fallback: true
  };
};
