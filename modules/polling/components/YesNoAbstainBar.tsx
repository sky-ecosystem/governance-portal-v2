/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { Box, Text } from 'theme-ui';
import Tooltip from 'modules/app/components/Tooltip';

export function YesNoAbstainBar({
  yesPercent,
  noPercent,
  abstainPercent,
  showTitles = true
}: {
  yesPercent: string | number;
  noPercent: string | number;
  abstainPercent: string | number;
  showTitles?: boolean;
}): React.ReactElement {
  const styles = {
    titles: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    progressBarWrapper: {
      display: 'flex',
      borderRadius: '4px',
      overflow: 'hidden',
      marginTop: 2,
      marginBottom: 2
    },
    yesBar: {
      backgroundColor: 'primary',
      height: '4px',
      width: `${yesPercent}%`
    },
    noBar: {
      backgroundColor: 'notice',
      height: '4px',
      width: `${noPercent}%`
    },
    abstainBar: {
      backgroundColor: 'secondaryEmphasis',
      height: '4px',
      width: `${abstainPercent}%`
    },
    percentagesWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      mt: 1
    },
    yesPercentage: {
      color: 'primary',
      fontSize: 1,
      fontWeight: 'semiBold',
      mr: 1
    },
    noPercentage: {
      color: 'notice',
      fontSize: 1,
      fontWeight: 'semiBold',
      ml: 1
    },
    abstainPercentage: {
      color: 'secondaryEmphasis',
      fontSize: 1,
      fontWeight: 'semiBold',
      mr: 1,
      ml: 1
    }
  };
  return (
    <Box>
      {showTitles && (
        <Box sx={styles.titles}>
          <Box>
            <Text
              variant="secondary"
              color="onSecondary"
              sx={{ textTransform: 'uppercase', fontSize: 1, fontWeight: 'bold', mr: 1 }}
              as="p"
            >
              Yes
            </Text>
          </Box>
          <Box>
            <Text
              variant="secondary"
              color="onSecondary"
              sx={{ textTransform: 'uppercase', fontSize: 1, fontWeight: 'bold', ml: 1, mr: 1 }}
              as="p"
            >
              Abstain
            </Text>
          </Box>
          <Box>
            <Text
              variant="secondary"
              color="onSecondary"
              sx={{ textTransform: 'uppercase', fontSize: 1, fontWeight: 'bold', ml: 1 }}
              as="p"
            >
              No
            </Text>
          </Box>
        </Box>
      )}
      <Box sx={styles.percentagesWrapper}>
        <Box sx={styles.yesPercentage}>
          {' '}
          <Tooltip label={'Percentage of Yes'}>
            <span>{yesPercent}%</span>
          </Tooltip>
        </Box>
        <Box sx={styles.abstainPercentage}>
          <Tooltip label={'Percentage of Abstain'}>
            <span>{abstainPercent}%</span>
          </Tooltip>
        </Box>
        <Box sx={styles.noPercentage}>
          <Tooltip label={'Percentage of No'}>
            <span>{noPercent}%</span>
          </Tooltip>
        </Box>
      </Box>
      <Box sx={styles.progressBarWrapper}>
        <Box sx={styles.yesBar} />
        <Box sx={styles.abstainBar} />
        <Box sx={styles.noBar} />
      </Box>
    </Box>
  );
}
