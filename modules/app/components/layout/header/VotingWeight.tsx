/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { Box, Flex, Text } from 'theme-ui';
import Icon from '../../Icon';
import { getPollingVotingWeightCopy } from 'modules/polling/helpers/getPollingVotingWeightCopy';
import { useMKRVotingWeight } from 'modules/mkr/hooks/useMKRVotingWeight';
import { useAccount } from 'modules/app/hooks/useAccount';
import { formatValue } from 'lib/string';
import Tooltip from '../../Tooltip';
import { getDescription } from 'modules/polling/components/VotingWeight';
import { getExecutiveVotingWeightCopy } from 'modules/polling/helpers/getExecutiveVotingWeightCopy';

export default function VotingWeight(): JSX.Element {
  const { account, voteDelegateContractAddress } = useAccount();
  const { data: votingWeight } = useMKRVotingWeight({ address: account });
  const votingWeightCopy = getPollingVotingWeightCopy(!!voteDelegateContractAddress);

  return (
    <>
      <Flex sx={{ pt: 4, alignItems: 'center', gap: 2 }}>
        <Text variant="caps" as="h4">
          polling voting weight
        </Text>
        {votingWeight && (
          <Tooltip label={getDescription({ votingWeight, isDelegate: !!voteDelegateContractAddress })}>
            <Box>
              <Icon name="question" color="textSecondary" />
            </Box>
          </Tooltip>
        )}
      </Flex>
      <Flex>
        <Text sx={{ fontSize: 5 }} data-testid="polling-voting-weight">
          {votingWeight ? `${formatValue(votingWeight.total)} MKR` : '--'}
        </Text>
      </Flex>
      <Flex sx={{ py: 1 }}>
        <Text variant="secondary">{votingWeightCopy}</Text>
      </Flex>
      <Flex sx={{ justifyContent: 'space-between' }}>
        <Text variant="caps" sx={{ mt: 4 }} as="h4">
          executive voting weight
        </Text>
      </Flex>
      <Flex>
        <Text sx={{ fontSize: 5 }}>
          {votingWeight ? `${formatValue(votingWeight.chiefTotal)} MKR` : '--'}
        </Text>
      </Flex>
      <Flex sx={{ py: 1 }}>
        <Text variant="secondary">{getExecutiveVotingWeightCopy(!!voteDelegateContractAddress)}</Text>
      </Flex>
    </>
  );
}
