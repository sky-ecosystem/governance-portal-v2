/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { useState, useEffect } from 'react';
import { Text, Flex, Box, Button, Badge, Divider, Card } from 'theme-ui';
import Icon from 'modules/app/components/Icon';
import Skeleton from 'modules/app/components/SkeletonThemed';
import { formatDateWithoutTime } from 'lib/datetime';
import { formatValue } from 'lib/string';
import { getStatusText } from 'modules/executive/helpers/getStatusText';
import { InternalLink } from 'modules/app/components/InternalLink';
import { Proposal } from 'modules/executive/types';
import VoteModal from './VoteModal';
import { CardHeader } from 'modules/app/components/Card/CardHeader';
import { CardTitle } from 'modules/app/components/Card/CardTitle';
import { CardSummary } from 'modules/app/components/Card/CardSummary';
import { ZERO_ADDRESS } from 'modules/web3/constants/addresses';
import { StatBox } from 'modules/app/components/StatBox';
import { StatusText } from 'modules/app/components/StatusText';
import { config } from 'lib/config';

type Props = {
  proposal: Proposal;
  isHat: boolean;
  account?: string;
  votedProposals: string[];
  mkrOnHat?: bigint;
};

export default function ExecutiveOverviewCard({
  proposal,
  isHat,
  account,
  votedProposals,
  mkrOnHat
}: Props): JSX.Element {
  const [voting, setVoting] = useState(false);
  const [postedDateString, setPostedDateString] = useState('');

  useEffect(() => {
    setPostedDateString(`posted ${formatDateWithoutTime(proposal.date)}`);
  }, []);

  const hasVotedFor =
    votedProposals &&
    !!votedProposals.find(
      proposalAddress => proposalAddress.toLowerCase() === proposal.address.toLowerCase()
    );

  if (!('about' in proposal)) {
    return (
      <Card sx={{ p: [0, 0] }}>
        <Box sx={{ p: 3 }}>
          <Text>spell address {proposal.address}</Text>
        </Box>
      </Card>
    );
  }

  const canVote = !!account;

  return (
    <Card
      sx={{
        p: [0, 0],
        width: '100%'
      }}
    >
      <Flex
        sx={{
          flexDirection: 'column',
          px: [3, 4],
          py: [3, proposal.spellData?.hasBeenScheduled ? 3 : 4],
          justifyContent: 'space-between'
        }}
      >
        <Flex sx={{ justifyContent: 'space-between' }}>
          <Box>
            <Flex sx={{ flexDirection: 'column' }}>
              <InternalLink 
                href={`/executive/${proposal.key}`} 
                title="View executive details"
              >
                <>
                  <CardHeader text={postedDateString} />
                  <CardTitle title={proposal.title} styles={{ mt: 2 }} />
                  <CardSummary text={proposal.proposalBlurb} styles={{ my: 2 }} />
                </>
              </InternalLink>
              <Flex sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
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
            </Flex>
          </Box>
        </Flex>

        <Flex sx={{ flexDirection: 'column' }}>
          <Flex
            sx={{
              alignItems: ['flex-end', 'center'],
              justifyContent: 'space-between',
              height: ['auto', 'auto', 'auto', 74]
            }}
          >
            <Flex
              sx={{
                flexDirection: ['column-reverse', 'row'],
                flexWrap: 'wrap-reverse',
                width: 'auto',
                gap: [0, 3]
              }}
            >
              <InternalLink 
                href={`/executive/${proposal.key}`} 
                title="View executive details"
              >
                <Button
                  variant="outline"
                  sx={{
                    width: 122,
                    mt: [2, 0]
                  }}
                >
                  View Details
                </Button>
              </InternalLink>
              {!hasVotedFor && canVote && (
                <Button
                  variant="primaryOutline"
                  sx={{ width: 122 }}
                  disabled={
                    config.READ_ONLY || (hasVotedFor && votedProposals && votedProposals.length === 1)
                  }
                  onClick={ev => {
                    setVoting(true);
                    ev.stopPropagation();
                  }}
                  data-testid="vote-button-exec-overview-card"
                >
                  {'Vote'}
                </Button>
              )}
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
            <Flex sx={{ flexShrink: 0 }}>
              {proposal.spellData?.mkrSupport === undefined ? (
                <Box sx={{ width: 6, ml: 'auto', height: '100%' }}>
                  <Skeleton />
                </Box>
              ) : (
                <StatBox
                  value={formatValue(BigInt(proposal.spellData?.mkrSupport))}
                  label="MKR Supporting"
                  styles={{ textAlign: 'right' }}
                />
              )}
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      {voting && <VoteModal proposal={proposal} close={() => setVoting(false)} />}

      <Flex sx={{ flexDirection: 'column' }}>
        <Divider my={0} />
        <Flex sx={{ py: 2, justifyContent: 'center' }}>
          <StatusText testId="proposal-status">
            {getStatusText({ proposalAddress: proposal.address, spellData: proposal.spellData, mkrOnHat })}
          </StatusText>
        </Flex>
      </Flex>
    </Card>
  );
}
