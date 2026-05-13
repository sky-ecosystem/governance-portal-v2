/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { Flex, Box, Text } from 'theme-ui';
import Deposit from 'modules/mkr/components/Deposit';
import Withdraw from 'modules/mkr/components/Withdraw';
import { formatValue } from 'lib/string';

type Props = {
  lockedMkr: bigint;
  mutateLockedMkr?: () => void;
  voteDelegate?: string;
  voteProxy?: string;
  showProxyInfo?: boolean;
};

export const ExecutiveBalance = ({
  lockedMkr,
  mutateLockedMkr,
  voteDelegate,
  voteProxy,
  showProxyInfo
}: Props): JSX.Element => (
  <Flex sx={{ alignItems: [null, 'center'], flexDirection: ['column', 'row'] }}>
    <Flex>
      <Text sx={{ mr: 1 }}>
        {voteDelegate ? 'In delegate contract:' : voteProxy ? 'In proxy contract:' : 'In voting contract:'}{' '}
      </Text>
      <Text sx={{ fontWeight: 'bold' }} data-testid="locked-mkr">
        {formatValue(lockedMkr, 'wad', 6)} MKR
      </Text>
    </Flex>
    {!voteDelegate && (
      <Flex sx={{ mt: [3, 0], alignItems: 'center' }}>
        <Box sx={{ ml: [0, 3] }}>
          <Deposit showProxyInfo={showProxyInfo} mutateLockedMkr={mutateLockedMkr} />
        </Box>
        <Withdraw sx={{ ml: 3 }} mutateLockedMkr={mutateLockedMkr} />
      </Flex>
    )}
  </Flex>
);
