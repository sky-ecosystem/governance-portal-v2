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
    <Box sx={{ p: [3, 4] }}>
      {visibleOptions.map(([optionId, optionName]) => {
        const result = tally.results.find(r => r.optionId.toString() === optionId);
        const skySupport = result ? Number(result.skySupport) : 0;
        const percentage = totalSkySupport > 0 ? (skySupport / totalSkySupport) * 100 : 0;
        const isWinner = result?.winner || false;

        return (
          <Box key={optionId} sx={{ mb: 4 }}>
            <Flex sx={{ justifyContent: 'space-between', alignItems: 'baseline', mb: 2 }}>
              <Text 
                sx={{ 
                  fontWeight: isWinner ? 'bold' : 'normal',
                  color: isWinner ? 'primary' : 'text'
                }}
              >
                {optionName} {isWinner && '(Winner)'}
              </Text>
              <Flex sx={{ alignItems: 'baseline', gap: 2 }}>
                <Text sx={{ fontSize: 1, color: 'textSecondary' }}>
                  {skySupport.toLocaleString(undefined, { maximumFractionDigits: 2 })} SKY
                </Text>
                <Text sx={{ fontSize: 1, color: 'textSecondary' }}>
                  {percentage.toFixed(1)}%
                </Text>
              </Flex>
            </Flex>
            <Progress
              value={percentage}
              max={100}
              sx={{
                height: 8,
                backgroundColor: 'muted',
                color: isWinner ? 'primary' : 'secondary',
                borderRadius: 4
              }}
            />
          </Box>
        );
      })}

      {/* Summary info */}
      <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'muted' }}>
        <Flex sx={{ justifyContent: 'space-between', mb: 2 }}>
          <Text sx={{ color: 'textSecondary' }}>Total Participation:</Text>
          <Text>
            {Number(tally.totalSkyActiveParticipation).toLocaleString(undefined, {
              maximumFractionDigits: 2
            })}{' '}
            SKY
          </Text>
        </Flex>
        <Flex sx={{ justifyContent: 'space-between' }}>
          <Text sx={{ color: 'textSecondary' }}>Total Voters:</Text>
          <Text>{tally.numVoters}</Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default SkyVoteBreakdown;