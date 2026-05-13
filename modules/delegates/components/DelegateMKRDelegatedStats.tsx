/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { Box, Flex } from 'theme-ui';
import Icon from 'modules/app/components/Icon';
import { useMkrDelegatedByUser } from 'modules/mkr/hooks/useMkrDelegatedByUser';
import { Delegate } from 'modules/delegates/types';
import { StatBox } from 'modules/app/components/StatBox';
import { useAccount } from 'modules/app/hooks/useAccount';
import { formatValue } from 'lib/string';
import Tooltip from 'modules/app/components/Tooltip';
import { getDescription } from 'modules/polling/components/VotingWeight';
import { useMKRVotingWeight } from 'modules/mkr/hooks/useMKRVotingWeight';
import Skeleton from 'react-loading-skeleton';

export function DelegateMKRDelegatedStats({
  delegate,
  delegatorCount
}: {
  delegate: Delegate;
  delegatorCount?: number;
}): React.ReactElement {
  const { account } = useAccount();
  const { data: mkrDelegatedData } = useMkrDelegatedByUser(account, delegate.voteDelegateAddress);
  const totalMkrDelegated = mkrDelegatedData?.totalDelegationAmount;
  const { data: votingWeight } = useMKRVotingWeight({ address: delegate.voteDelegateAddress });

  return (
    <Flex
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: ['column', 'row'],
        marginTop: 1,
        marginBottom: 1
      }}
    >
      <StatBox
        value={
          !votingWeight ? (
            <Skeleton width="100%" height="15px" />
          ) : votingWeight?.chiefBalanceHot !== undefined ? (
            formatValue(votingWeight?.chiefBalanceHot)
          ) : (
            'Untracked'
          )
        }
        label={'Total MKR Delegated'}
        tooltip={
          <Tooltip label={getDescription({ votingWeight, isDelegate: true })}>
            <Box>
              <Icon sx={{ ml: 1 }} name="question" />
            </Box>
          </Tooltip>
        }
      />
      <StatBox
        value={
          typeof delegatorCount !== 'undefined'
            ? delegatorCount.toLocaleString(undefined, { maximumFractionDigits: 0 })
            : '--'
        }
        label={'Total Active Delegators'}
      />
      {account && (
        <StatBox
          value={typeof totalMkrDelegated !== 'undefined' ? formatValue(totalMkrDelegated) : '0'}
          label={'MKR delegated by you'}
        />
      )}
    </Flex>
  );
}
