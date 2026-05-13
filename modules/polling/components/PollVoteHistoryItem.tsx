/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { Box, Flex, Text } from 'theme-ui';
import { PollVoteHistory } from '../types/pollVoteHistory';
import { InternalLink } from 'modules/app/components/InternalLink';
import { formatDateWithTime } from 'lib/datetime';
import { isInputFormatRankFree } from '../helpers/utils';
import { useBreakpointIndex } from '@theme-ui/match-media';
import { formatValue } from 'lib/string';
import { parseEther } from 'viem';
import VotedOption from './VotedOption';
import { PollVoteTypeIndicator } from './PollOverviewCard/PollVoteTypeIndicator';
import { ErrorBoundary } from 'modules/app/components/ErrorBoundary';
import CountdownTimer from 'modules/app/components/CountdownTimer';
import { chainIdToNetworkName } from 'modules/web3/helpers/chain';
import EtherscanLink from 'modules/web3/components/EtherscanLink';

export function PollVoteHistoryItem({ vote }: { vote: PollVoteHistory }): React.ReactElement {
  const bpi = useBreakpointIndex();
  const voteDate = formatDateWithTime(vote.blockTimestamp);
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: ['column', 'row']
        }}
      >
        <Box
          sx={{
            width: ['100%', '60%'],
            mr: [0, 2]
          }}
        >
          <Flex sx={{ flexDirection: 'column' }}>
            <Text
              variant="secondary"
              color="onSecondary"
              sx={{ textTransform: 'uppercase', fontSize: 1, fontWeight: 'bold' }}
              as="p"
            >
              Voted {voteDate} | Poll ID {vote.pollId}
            </Text>
          </Flex>
          <InternalLink href={`/polling/${vote.poll.slug}`} title="View poll details">
            <Text
              as="p"
              sx={{ fontSize: '18px', fontWeight: 'semiBold', color: 'secondaryAlt', mt: 1, mb: 1 }}
            >
              {vote.poll.title}
            </Text>
          </InternalLink>
        </Box>

        <Box
          sx={{
            mt: [2, 0]
          }}
        >
          <Box>
            <Text
              variant="secondary"
              color="onSecondary"
              sx={{
                textTransform: 'uppercase',
                fontSize: 1,
                fontWeight: 'bold',
                textAlign: ['left', 'right']
              }}
              as="p"
            >
              {isInputFormatRankFree(vote.poll.parameters) ? 'VOTED CHOICES' : 'VOTED OPTION'}
            </Text>
            <VotedOption vote={vote} poll={vote.poll} align={bpi === 0 ? 'left' : 'right'} />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Text
              variant="secondary"
              color="onSecondary"
              sx={{
                textTransform: 'uppercase',
                fontSize: 1,
                fontWeight: 'bold',
                textAlign: ['left', 'right']
              }}
              as="p"
            >
              Voting Weight
            </Text>
            <Text
              as="p"
              sx={{
                textAlign: ['left', 'right'],
                fontWeight: 'semiBold'
              }}
            >
              {formatValue(parseEther(vote.mkrSupport.toString()), undefined, undefined, true, true)} MKR
            </Text>
          </Box>
        </Box>
      </Box>
      <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Flex sx={{ alignItems: 'center' }}>
          <Box sx={{ mr: 2 }}>
            <ErrorBoundary componentName="Countdown Timer">
              <CountdownTimer endText="Poll ended" endDate={vote.poll.endDate} />
            </ErrorBoundary>
          </Box>
          <PollVoteTypeIndicator poll={vote.poll} />
        </Flex>

        <Box>
          <EtherscanLink
            hash={vote.hash}
            type="transaction"
            network={chainIdToNetworkName(vote.chainId)}
            prefix=""
          />
        </Box>
      </Flex>
    </Box>
  );
}
