/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { Box, Flex, Text } from 'theme-ui';
import Icon from 'modules/app/components/Icon';
import Tooltip from 'modules/app/components/Tooltip';
import { MKRVotingWeightResponse } from 'modules/mkr/helpers/getMKRVotingWeight';
import { getPollingVotingWeightCopy } from 'modules/polling/helpers/getPollingVotingWeightCopy';
import { useAccount } from 'modules/app/hooks/useAccount';
import { useMKRVotingWeight } from 'modules/mkr/hooks/useMKRVotingWeight';
import { formatValue } from 'lib/string';

export const getDescription = ({
  votingWeight,
  isDelegate
}: {
  votingWeight?: MKRVotingWeightResponse;
  isDelegate?: boolean;
}): JSX.Element | null => {
  if (votingWeight) {
    if (isDelegate) {
      return (
        <Text as="p">
          {'Balance of delegated MKR: ' + formatValue(votingWeight.chiefBalanceHot) + ' MKR'}
        </Text>
      );
    } else if (
      votingWeight.chiefBalanceProxy &&
      votingWeight.chiefBalanceCold &&
      votingWeight.walletBalanceCold
    ) {
      return (
        <>
          <Text as="p">
            {'Proxy balance in chief: ' + formatValue(votingWeight.chiefBalanceProxy) + ' MKR'}
          </Text>
          <Text as="p">{'Hot balance in chief: ' + formatValue(votingWeight.chiefBalanceHot) + ' MKR'}</Text>
          <Text as="p">
            {'Hot balance in wallet: ' + formatValue(votingWeight.walletBalanceHot) + ' MKR'}
          </Text>
          <Text as="p">
            {'Cold balance in chief: ' + formatValue(votingWeight.chiefBalanceCold) + ' MKR'}
          </Text>
          <Text as="p">
            {'Cold balance in wallet: ' + formatValue(votingWeight.walletBalanceCold) + ' MKR'}
          </Text>
        </>
      );
    } else {
      return (
        <>
          <Text as="p">{'Balance in chief: ' + formatValue(votingWeight.chiefBalanceHot) + ' MKR'}</Text>
          <Text as="p">{'Balance in wallet: ' + formatValue(votingWeight.walletBalanceHot) + ' MKR'}</Text>
        </>
      );
    }
  }

  return null;
};

export default function VotingWeight(): JSX.Element {
  const { account, voteDelegateContractAddress } = useAccount();

  const { data: votingWeight } = useMKRVotingWeight({ address: account });

  const votingWeightCopy = getPollingVotingWeightCopy(!!voteDelegateContractAddress);

  const tooltipLabel = (
    <Box>
      <Text as="p" sx={{ whiteSpace: 'normal', maxWidth: '400px', mb: 3 }}>
        {votingWeightCopy}
      </Text>
      {getDescription({ votingWeight, isDelegate: !!voteDelegateContractAddress })}
    </Box>
  );

  return (
    <Flex
      sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%'
      }}
    >
      <Flex sx={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text as="p" color="textSecondary">
          Voting weight
        </Text>
        <Tooltip label={tooltipLabel}>
          <Box>
            <Icon name="question" color="textSecondary" sx={{ ml: 1, mt: '6px' }} />
          </Box>
        </Tooltip>
      </Flex>
      <Text sx={{ color: 'text' }} data-testid="voting-weight">
        {votingWeight ? `${formatValue(votingWeight.total)} MKR` : '--'}
      </Text>
    </Flex>
  );
}
