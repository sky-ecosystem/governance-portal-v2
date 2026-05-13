/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { GetStaticProps } from 'next';
import { useContext, useMemo, useState } from 'react';
import { Heading, Box, Button, Flex, Text } from 'theme-ui';
import Icon from 'modules/app/components/Icon';
import ErrorPage from 'modules/app/components/ErrorPage';
import { useBreakpointIndex } from '@theme-ui/match-media';
import useSWR, { useSWRConfig } from 'swr';
import { isInputFormatRankFree } from 'modules/polling/helpers/utils';
import PrimaryLayout from 'modules/app/components/layout/layouts/Primary';
import SidebarLayout from 'modules/app/components/layout/layouts/Sidebar';
import Stack from 'modules/app/components/layout/layouts/Stack';
import PollOverviewCard from 'modules/polling/components/PollOverviewCard';
import { PollListItem } from 'modules/polling/types';
import ReviewBox from 'modules/polling/components/review/ReviewBox';
import PageLoadingPlaceholder from 'modules/app/components/PageLoadingPlaceholder';
import { objectToGetParams, getNumberWithOrdinal } from 'lib/utils';
import { useAccount } from 'modules/app/hooks/useAccount';
import { isDefaultNetwork } from 'modules/web3/helpers/networks';
import { BallotContext } from 'modules/polling/context/BallotContext';
import ActivePollsBox from 'modules/polling/components/review/ActivePollsBox';
import { ShareVotesModal } from 'modules/polling/components/ShareVotesModal';
import InternalIcon from 'modules/app/components/Icon';
import { InternalLink } from 'modules/app/components/InternalLink';
import { fetchPollingReviewPageData } from 'modules/polling/api/fetchPollingPageData';
import { SupportedNetworks } from 'modules/web3/constants/networks';
import { ErrorBoundary } from 'modules/app/components/ErrorBoundary';
import AccountNotConnected from 'modules/web3/components/AccountNotConnected';
import EtherscanLink from 'modules/web3/components/EtherscanLink';
import { TagCount } from 'modules/app/types/tag';
import { useNetwork } from 'modules/app/hooks/useNetwork';

export type PollingReviewPageProps = {
  polls: PollListItem[];
  tags: TagCount[];
  activePollIds: number[];
};

const PollingReview = ({ polls: activePolls, activePollIds, tags }: PollingReviewPageProps) => {
  const bpi = useBreakpointIndex();
  const network = useNetwork();

  const [showMarkdownModal, setShowMarkdownModal] = useState(false);
  const [modalPollId, setModalPollId] = useState<number | undefined>(undefined);
  const toggleShareModal = (pollId?: number) => {
    setModalPollId(pollId);
    setShowMarkdownModal(!showMarkdownModal);
  };

  const { ballot, previousBallot, transaction, ballotCount } = useContext(BallotContext);

  const { account } = useAccount();

  // Used to create a string that does not trigger the useMemo of votedPolls to be recreated. (Unique string does not re-render the votedPolls object)
  const ballotKeys = useMemo(() => {
    return Object.keys(ballot).join('');
  }, [ballot]);

  const votedPolls = useMemo(() => {
    return Object.keys(ballot)
      .map(pollId => {
        return activePolls.find(poll => poll?.pollId === parseInt(pollId));
      })
      .filter(p => !!p) as PollListItem[];
  }, [ballotKeys]);

  const previousVotedPolls = Object.keys(previousBallot)
    .map(pollId => {
      return activePolls.find(poll => poll?.pollId === parseInt(pollId));
    })
    .filter(p => !!p) as PollListItem[];

  const previousVotesLength = Object.keys(previousBallot).length;

  const votesToTweet = (): string => {
    let url = '';
    let text = '';
    if (modalPollId) {
      // single vote
      const poll = previousVotedPolls.find(poll => poll.pollId === modalPollId);
      if (!poll) return '';
      const option = poll.options[previousBallot[poll.pollId].option as number];
      url = `https://vote.makerdao.com/polling/${poll.slug}`;
      text = `I just voted ${
        option ? option + ' ' : ''
      }on a MakerDAO governance poll! Learn more about the poll on the Governance Portal:`;
    } else {
      // all votes
      url = 'https://vote.makerdao.com';
      text = `I just voted on ${
        previousVotesLength > 1 ? previousVotesLength : 'a'
      } MakerDAO governance poll${
        previousVotesLength > 1 ? 's' : ''
      }! Find my votes and all Maker governance proposals on the Governance Portal:`;
    }

    return (
      'https://twitter.com/share' +
      objectToGetParams({
        url,
        text
      })
    );
  };

  const votesToMarkdown = (): string => {
    let markdown = '';
    let polls;
    if (modalPollId) {
      // single vote
      polls = [previousVotedPolls.find(poll => poll.pollId === modalPollId)];
    } else {
      // all votes
      polls = previousVotedPolls;
    }
    polls.map(poll => {
      const optionData = previousBallot[poll.pollId].option;
      let option;
      if (typeof optionData === 'number') {
        option = `**${poll.options[optionData]}**`;
      } else {
        const markdownArray = (optionData as number[]).map(
          (id, index) =>
            `${
              isInputFormatRankFree(poll.parameters) ? `**${getNumberWithOrdinal(index + 1)} choice:**` : ''
            } ${poll.options[id]}  \n`
        );
        option = markdownArray.reduce((previousValue, currentValue) => previousValue + currentValue);
      }

      markdown += `[${poll.title}](https://vote.makerdao.com/polling/${poll.slug}) ([thread](${poll.discussionLink}))  \n`;
      if (option) markdown += `Voted: ${option}  \n`;
      markdown += '  \n';
    });
    return markdown;
  };

  const ballotPollIds = Object.keys(ballot);
  const hasVoted = previousVotesLength > 0 && ballotCount === 0;

  return (
    <PrimaryLayout sx={{ maxWidth: 'dashboard' }}>
      <Stack gap={3}>
        {!hasVoted && (
          <Heading mb={3} as="h4">
            {bpi <= 2 ? 'Review & Submit Ballot' : 'Review Your Ballot'}
          </Heading>
        )}
        {hasVoted && (
          <Box mb={3}>
            <Heading as="h4">
              You successfully voted on {previousVotesLength} poll{previousVotesLength > 1 ? 's' : ''}
            </Heading>
            <Text as="p" sx={{ mt: 2 }}>
              Share your votes to the Forum or Twitter below, or go back to the polls page to edit your votes
            </Text>
            <Flex sx={{ alignItems: 'center', mt: 1, gap: 1, flexWrap: 'wrap' }}>
              <Flex sx={{ alignItems: 'center', gap: 1 }}>
                <Icon name="info" color="textSecondary" />
                <Text as="p" variant="secondary">
                  Your vote may take a few minutes to appear in the Voting Portal.
                </Text>
              </Flex>
              {transaction?.hash && (
                <EtherscanLink
                  hash={transaction.hash}
                  type="transaction"
                  network={transaction.gaslessNetwork ?? network}
                />
              )}
            </Flex>
          </Box>
        )}
        <SidebarLayout>
          <Box>
            <Stack gap={3}>
              <Box>
                <InternalLink href={'/polling'} title="View polling page">
                  <Button variant="mutedOutline" sx={{ width: 'max-content' }}>
                    <Icon name="chevron_left" size={2} sx={{ mr: 2 }} />
                    Back to All Polls
                  </Button>
                </InternalLink>
              </Box>
              <Stack gap={3}>
                {!account && (
                  <Text as="p" sx={{ mt: 3 }}>
                    Connect a wallet to vote
                  </Text>
                )}
                {!!account && votedPolls.length === 0 && !hasVoted && (
                  <Text as="p" sx={{ mt: 3 }}>
                    Your ballot is empty. Go back to the polling page to add votes to your ballot.
                  </Text>
                )}

                {bpi <= 2 && !!account && (
                  <Box>
                    {!hasVoted && (
                      <ReviewBox
                        account={account}
                        activePollCount={activePollIds.length}
                        activePollIds={activePollIds}
                        ballotPollIds={ballotPollIds}
                      />
                    )}
                    {hasVoted && (
                      <Box>
                        <Heading mb={2} variant="microHeading" sx={{ lineHeight: '33px' }}>
                          Share all your votes
                        </Heading>
                        <ActivePollsBox
                          activePollCount={activePollIds.length}
                          activePollIds={activePollIds}
                          voted
                        >
                          <Box p={3}>
                            <Button sx={{ width: '100%' }} onClick={() => toggleShareModal()}>
                              <Flex sx={{ alignItems: 'center', justifyContent: 'center' }}>
                                <InternalIcon name="forum" size={18} /> <Text ml={1}>Share all votes</Text>
                              </Flex>
                            </Button>
                          </Box>
                        </ActivePollsBox>
                      </Box>
                    )}
                  </Box>
                )}

                {!!account && hasVoted && (
                  <Box mt={3}>
                    {previousVotedPolls.map(poll => {
                      return (
                        <Box
                          key={`previous-voted-${poll.pollId}`}
                          data-testid="previously-voted-on"
                          sx={{ mb: 2 }}
                        >
                          <PollOverviewCard
                            poll={poll}
                            allTags={tags}
                            reviewPage={true}
                            showVoting={true}
                            disableVoting={true}
                          />
                        </Box>
                      );
                    })}
                  </Box>
                )}
                {votedPolls.length > 0 && (
                  <Stack sx={{ display: activePolls.length ? undefined : 'none' }}>
                    {votedPolls.map(poll => {
                      return (
                        <Box key={poll.slug} sx={{ mb: 3 }}>
                          <PollOverviewCard poll={poll} allTags={tags} reviewPage={true} showVoting={true} />
                        </Box>
                      );
                    })}
                  </Stack>
                )}
                {bpi <= 2 && (
                  <Box>
                    {hasVoted && (
                      <Button sx={{ width: '100%' }} onClick={() => toggleShareModal()}>
                        <Flex sx={{ alignItems: 'center', justifyContent: 'center' }}>
                          <InternalIcon name="forum" size={18} /> <Text ml={1}>Share all votes</Text>
                        </Flex>
                      </Button>
                    )}
                  </Box>
                )}
                {!account && (
                  <Box pt="3">
                    <AccountNotConnected message="Connect your wallet to review your ballot" />
                  </Box>
                )}
              </Stack>
            </Stack>
          </Box>

          {bpi >= 3 && !!account && (
            <Box sx={{ pt: 3 }}>
              {!hasVoted && (
                <Box>
                  <Heading mb={2} variant="microHeading" sx={{ lineHeight: '33px' }}>
                    Submit Ballot
                  </Heading>
                  <ReviewBox
                    account={account}
                    activePollCount={activePollIds.length}
                    activePollIds={activePollIds}
                    ballotPollIds={ballotPollIds}
                  />
                </Box>
              )}
              {hasVoted && (
                <Box>
                  <Heading mb={2} variant="microHeading" sx={{ lineHeight: '33px' }}>
                    Share all your votes
                  </Heading>
                  <ActivePollsBox activePollCount={activePollIds.length} activePollIds={activePollIds} voted>
                    <Box p={3}>
                      <Button sx={{ width: '100%' }} onClick={() => toggleShareModal()}>
                        <Flex sx={{ alignItems: 'center', justifyContent: 'center' }}>
                          <InternalIcon name="forum" size={18} /> <Text ml={1}>Share all votes</Text>
                        </Flex>
                      </Button>
                    </Box>
                  </ActivePollsBox>
                </Box>
              )}
            </Box>
          )}
          {showMarkdownModal && (
            <ShareVotesModal
              isOpen={showMarkdownModal}
              onDismiss={toggleShareModal}
              markdownContent={votesToMarkdown()}
              twitterContent={votesToTweet()}
            />
          )}
        </SidebarLayout>
      </Stack>
    </PrimaryLayout>
  );
};

export default function PollingReviewPage({
  polls: prefetchedPolls,
  activePollIds: prefetchedActivePollIds,
  tags: prefetchedTags
}: PollingReviewPageProps): JSX.Element {
  const network = useNetwork();

  const fallbackData = isDefaultNetwork(network)
    ? {
        polls: prefetchedPolls,
        activePollIds: prefetchedActivePollIds,
        tags: prefetchedTags
      }
    : null;

  const { cache } = useSWRConfig();
  const cacheKey = `page/polling/${network}`;
  const { data, error } = useSWR<PollingReviewPageProps>(
    !network || isDefaultNetwork(network) ? null : cacheKey,
    () => fetchPollingReviewPageData(network, true),
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
        <ErrorPage statusCode={500} title="Error fetching data" />
      </PrimaryLayout>
    );
  }
  const props = {
    polls: isDefaultNetwork(network) ? prefetchedPolls : data?.polls || [],
    activePollIds: isDefaultNetwork(network) ? prefetchedActivePollIds : data?.activePollIds || [],
    tags: isDefaultNetwork(network) ? prefetchedTags : data?.tags || []
  };

  return (
    <ErrorBoundary componentName="Poll Review">
      <PollingReview {...props} />
    </ErrorBoundary>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { polls, activePollIds, tags } = await fetchPollingReviewPageData(SupportedNetworks.MAINNET);

  return {
    revalidate: 60, // revalidate every 60 seconds
    props: {
      polls,
      activePollIds,
      tags
    }
  };
};
