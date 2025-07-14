/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { Box, Flex, Text, Progress } from 'theme-ui';
import { SkyPollDetailResponse } from 'pages/api/sky/polls/[poll-id-or-slug]';

type SkyVoteBreakdownProps = {
  poll: SkyPollDetailResponse;
  tally: NonNullable<SkyPollDetailResponse['tally']>;
  shownOptions: number;
};

const SkyVoteBreakdown = ({ poll, tally, shownOptions }: SkyVoteBreakdownProps): JSX.Element => {
  const optionEntries = Object.entries(poll.options);
  const visibleOptions = optionEntries.slice(0, shownOptions);

  // Calculate percentages for each option
  const totalSkySupport = tally.results.reduce((sum, result) => sum + Number(result.skySupport), 0);

  return (
    <Box sx={{ p: [3, 4] }} data-testid="vote-breakdown">
      <Text variant="microHeading" sx={{ display: 'block', mb: 3 }}>
        Vote Breakdown
      </Text>
      {visibleOptions.map(([optionId, optionName]) => {
        const result = tally.results.find(r => r.optionId.toString() === optionId);
        const skySupport = result ? Number(result.skySupport) : 0;
        const percentage = totalSkySupport > 0 ? (skySupport / totalSkySupport) * 100 : 0;

        return (
          <Box key={optionId} sx={{ mb: 3 }}>
            <Flex sx={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
              <Text 
                as="p"
                sx={{ 
                  color: 'textSecondary',
                  mr: 2
                }}
              >
                {optionName}
              </Text>
              <Text
                as="p"
                sx={{
                  color: 'textSecondary',
                  textAlign: 'right'
                }}
              >
                {`${skySupport.toLocaleString(undefined, { maximumFractionDigits: 0 })} SKY Voting (${percentage.toFixed(1)}%)`}
              </Text>
            </Flex>
            <Box my={2}>
              <Progress
                sx={{
                  backgroundColor: 'secondary',
                  mb: '3',
                  height: 2,
                  color: 'primary'
                }}
                max={totalSkySupport}
                value={skySupport}
              />
            </Box>
          </Box>
        );
      })}

    </Box>
  );
};

export default SkyVoteBreakdown;