/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { Box, Text, Flex, ThemeUIStyleObject } from 'theme-ui';
import React from 'react';
import Icon from 'modules/app/components/Icon';
import Skeleton from 'modules/app/components/SkeletonThemed';
import { DateWithHover } from 'modules/app/components/DateWithHover';

export default function LastVoted({
  expired,
  date,
  left = false,
  styles
}: {
  expired: boolean;
  date?: number | string | Date | null;
  left?: boolean;
  styles?: ThemeUIStyleObject;
}): React.ReactElement {
  const iconStyles = {
    expiredCalendar: {
      fill: '#D8E0E3',
      stroke: '#D8E0E3'
    },
    yellowCalendar: {
      fill: 'voterYellow',
      stroke: 'voterYellow'
    },
    orangeCalendar: {
      fill: 'warning',
      stroke: 'warning'
    },
    redCalendar: {
      fill: '#FF0000',
      stroke: '#FF0000'
    },
    activeCalendar: {
      fill: 'primary',
      stroke: 'primary'
    }
  };

  const loading = typeof date === 'undefined';

  if (loading) {
    return (
      <Box sx={{ width: '100%', height: '18px', ...styles }}>
        <Skeleton />
      </Box>
    );
  }

  const isLongerThan14Days = date && Date.now() - new Date(date).getTime() > 14 * 24 * 60 * 60 * 1000;
  const isLongerThan21Days = date && Date.now() - new Date(date).getTime() > 21 * 24 * 60 * 60 * 1000;
  const isLongerThan28Days = date && Date.now() - new Date(date).getTime() > 28 * 24 * 60 * 60 * 1000;

  const lastVoteDate = date ? (
    <Flex>
      <Text sx={{ mr: 1 }}>LAST VOTED</Text> <DateWithHover timeago={!!isLongerThan14Days} date={date} />
    </Flex>
  ) : (
    'NO VOTE HISTORY'
  );

  return (
    <Flex
      sx={{
        flexDirection: left ? 'row-reverse' : ['row-reverse', 'row'],
        justifyContent: left ? 'flex-end' : 'flex-start',
        alignItems: 'center',
        height: '18px',
        ...styles
      }}
    >
      <Text variant="caps" color={expired ? '#D8E0E3' : 'onSecondary'} sx={{ mr: 2, ml: left ? 1 : 0 }}>
        {lastVoteDate}
      </Text>
      <Flex
        sx={{
          alignContent: 'center',
          mr: [1, 0]
        }}
      >
        <Icon
          name="calendar"
          sx={
            expired || !date
              ? iconStyles.expiredCalendar
              : isLongerThan28Days
              ? iconStyles.redCalendar
              : isLongerThan21Days
              ? iconStyles.orangeCalendar
              : isLongerThan14Days
              ? iconStyles.yellowCalendar
              : iconStyles.activeCalendar
          }
        />
      </Flex>
    </Flex>
  );
}
