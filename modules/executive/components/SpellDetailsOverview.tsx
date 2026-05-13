/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { Box, Flex, Text } from 'theme-ui';
import { formatDateWithTime } from 'lib/datetime';
import { formatValue } from 'lib/string';
import { SpellData } from '../types';

type Props = {
  spellDetails: SpellData;
};

export const SpellDetailsOverview = ({ spellDetails }: Props): JSX.Element => {
  return (
    <Box sx={{ fontSize: [1, 3] }}>
      <Flex sx={{ mt: 3, flexDirection: ['column', 'row'] }}>
        <Text as="span" sx={{ fontWeight: 'bold' }}>
          Executive hash:
        </Text>
        <Text sx={{ ml: [0, 3], color: 'onSecondary', wordWrap: 'break-word' }}>
          {spellDetails?.executiveHash}
        </Text>
      </Flex>
      <Flex sx={{ mt: 3, flexDirection: ['column', 'row'] }}>
        <Text as="span" sx={{ fontWeight: 'bold' }}>
          Data executed:
        </Text>
        <Text sx={{ ml: [0, 3], color: 'onSecondary' }}>
          {formatDateWithTime(spellDetails?.dateExecuted)}
        </Text>
      </Flex>
      <Flex sx={{ mt: 3, flexDirection: ['column', 'row'] }}>
        <Text as="span" sx={{ fontWeight: 'bold' }}>
          Data passed:{' '}
        </Text>
        <Text sx={{ ml: [0, 3], color: 'onSecondary' }}>{formatDateWithTime(spellDetails?.datePassed)}</Text>
      </Flex>
      <Flex sx={{ mt: 3, flexDirection: ['column', 'row'] }}>
        <Text as="span" sx={{ fontWeight: 'bold' }}>
          Available for execution at:{' '}
        </Text>
        <Text sx={{ ml: [0, 3], color: 'onSecondary' }}>
          {formatDateWithTime(spellDetails?.nextCastTime || spellDetails?.eta)}
        </Text>
      </Flex>
      <Flex sx={{ mt: 3, flexDirection: ['column', 'row'] }}>
        <Text as="span" sx={{ fontWeight: 'bold' }}>
          Expiration:{' '}
        </Text>
        <Text sx={{ ml: [0, 3], color: 'onSecondary' }}>{formatDateWithTime(spellDetails?.expiration)}</Text>
      </Flex>

      <Flex sx={{ mt: 3, flexDirection: ['column', 'row'] }}>
        <Text as="span" sx={{ fontWeight: 'bold' }}>
          Has been cast:
        </Text>
        <Text sx={{ ml: [0, 3], color: 'onSecondary' }}>{spellDetails?.hasBeenCast ? 'true' : 'false'}</Text>
      </Flex>
      <Flex sx={{ mt: 3, flexDirection: ['column', 'row'] }}>
        <Text as="span" sx={{ fontWeight: 'bold' }}>
          Has been scheduled:
        </Text>
        <Text sx={{ ml: [0, 3], color: 'onSecondary' }}>
          {spellDetails?.hasBeenScheduled ? 'true' : 'false'}
        </Text>
      </Flex>
      <Flex sx={{ mt: 3, flexDirection: ['column', 'row'] }}>
        <Text as="span" sx={{ fontWeight: 'bold' }}>
          MKR support:
        </Text>
        <Text sx={{ ml: [0, 3], color: 'onSecondary' }}>
          {formatValue(BigInt(spellDetails?.mkrSupport))} MKR
        </Text>
      </Flex>
      <Flex sx={{ mt: 3, flexDirection: ['column', 'row'] }}>
        <Text as="span" sx={{ fontWeight: 'bold' }}>
          Next cast time:
        </Text>
        <Text sx={{ ml: [0, 3], color: 'onSecondary' }}>
          {formatDateWithTime(spellDetails?.nextCastTime)}
        </Text>
      </Flex>
      <Flex sx={{ mt: 3, flexDirection: ['column', 'row'] }}>
        <Text as="span" sx={{ fontWeight: 'bold' }}>
          Office hours:
        </Text>
        <Text sx={{ ml: [0, 3], color: 'onSecondary' }}>{spellDetails?.officeHours ? 'true' : 'false'}</Text>
      </Flex>
    </Box>
  );
};
