/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { Box, Text, Progress, Flex } from 'theme-ui';
import Skeleton from 'modules/app/components/SkeletonThemed';
import Tooltip from 'modules/app/components/Tooltip';
import Delay from 'modules/app/components/Delay';
import { PollTally, Poll } from 'modules/polling/types';
import { getVoteColor } from 'modules/polling/helpers/getVoteColor';
import { formatValue } from 'lib/string';
import { parseEther } from 'viem';
import {
  isResultDisplayApprovalBreakdown,
  isResultDisplayInstantRunoffBreakdown,
  isResultDisplaySingleVoteBreakdown
} from '../helpers/utils';
import { PollVoteTypeIndicator } from './PollOverviewCard/PollVoteTypeIndicator';
import React from 'react';

export default function VoteBreakdown({
  poll,
  shownOptions,
  tally
}: {
  poll: Poll;
  shownOptions: number;
  tally: PollTally | undefined;
}): JSX.Element {
  return (
    <Box key={2} sx={{ p: [3, 4] }} data-testid="vote-breakdown">
      <Flex sx={{ flexDirection: ['column', 'row'], justifyContent: 'space-between' }}>
        <Text variant="microHeading" sx={{ display: 'block', mb: 3 }}>
          Vote Breakdown
        </Text>
        <Box sx={{ mb: 3 }}>
          <PollVoteTypeIndicator poll={poll} />
          {isResultDisplayInstantRunoffBreakdown(poll.parameters) && (
            <Text as="p" variant="caps" sx={{ textAlign: 'left' }}>
              Rounds: {tally?.rounds || 0}
            </Text>
          )}
        </Box>
      </Flex>
      {isResultDisplayApprovalBreakdown(poll.parameters) &&
        Object.keys(poll.options).map((_, i) => {
          const tallyResult = tally?.results.find(r => r.optionId === i);
          const mkrSupport = tally && tallyResult && tallyResult.mkrSupport ? tallyResult.mkrSupport : 0;

          return (
            <div key={i}>
              <Flex sx={{ justifyContent: 'space-between' }}>
                {tally && tallyResult ? (
                  <React.Fragment>
                    <Text as="p" sx={{ color: 'textSecondary', mr: 2 }}>
                      {tallyResult.optionName}
                    </Text>
                    <Text
                      as="p"
                      sx={{
                        color: 'textSecondary',
                        width: tally ? 'unset' : '30%',
                        textAlign: 'right'
                      }}
                    >
                      {`${formatValue(BigInt(mkrSupport.toString()))} MKR Voting`}
                      {!isResultDisplayApprovalBreakdown(poll.parameters)
                        ? ` (${formatValue(BigInt(tallyResult.firstPct.toString()))}%)`
                        : ''}
                    </Text>
                  </React.Fragment>
                ) : (
                  <Delay>
                    <Skeleton />
                  </Delay>
                )}
              </Flex>

              {tally && tallyResult ? (
                <Tooltip label={`First choice ${formatValue(BigInt(mkrSupport.toString()))}`}>
                  <Box my={2}>
                    <Progress
                      sx={{
                        backgroundColor: 'secondary',
                        mb: '3',
                        height: 2,
                        color: 'primary'
                      }}
                      max={tally.totalMkrParticipation}
                      value={mkrSupport}
                    />
                  </Box>
                </Tooltip>
              ) : (
                <Delay>
                  <Skeleton />
                </Delay>
              )}
            </div>
          );
        })}
      {isResultDisplayInstantRunoffBreakdown(poll.parameters) &&
        Object.keys(poll.options)
          .slice(0, shownOptions)
          .map((_, i) => {
            const tallyResult = tally?.results[i];
            const firstChoice = BigInt(tallyResult?.mkrSupport || 0);
            const transfer = BigInt(tallyResult?.transfer || 0);
            return (
              <div key={i}>
                <Flex sx={{ flexDirection: ['column', 'row'], justifyContent: 'space-between' }}>
                  {tallyResult ? (
                    <Text as="p" sx={{ color: 'textSecondary', mr: 2 }}>
                      {tallyResult.optionName}
                    </Text>
                  ) : (
                    <Delay>
                      <Skeleton />
                    </Delay>
                  )}
                  {tallyResult ? (
                    <Text
                      as="p"
                      sx={{
                        color: 'textSecondary',
                        width: tally ? 'unset' : '30%',
                        textAlign: ['left', 'right']
                      }}
                    >
                      {`${formatValue(BigInt((firstChoice + transfer).toString()))} MKR Voting (${formatValue(
                        parseEther(
                          (Number(tallyResult.firstPct) + Number(tallyResult?.transferPct || 0)).toString()
                        )
                      )}%)`}
                    </Text>
                  ) : (
                    <Delay>
                      <Skeleton />
                    </Delay>
                  )}
                </Flex>

                {tally && tallyResult ? (
                  <Box sx={{ position: 'relative', mb: 4 }}>
                    <Tooltip
                      label={`First choice ${formatValue(firstChoice)}; Transfer ${formatValue(transfer)}`}
                    >
                      <Box my={2}>
                        <Box>
                          <Progress
                            sx={{
                              backgroundColor: 'secondary',
                              height: 2,
                              color: `${transfer < 0n ? '#f57350' : 'darkPrimary'}`,
                              position: 'absolute'
                            }}
                            max={tally.totalMkrParticipation}
                            value={transfer < 0n ? Number(firstChoice) : Number(firstChoice + transfer)}
                          />
                        </Box>
                        <Box>
                          <Progress
                            sx={{
                              backgroundColor: 'transparent',
                              height: 2,
                              color: 'primary',
                              position: 'absolute'
                            }}
                            max={tally.totalMkrParticipation}
                            value={transfer < 0n ? Number(firstChoice + transfer) : Number(firstChoice)}
                          />
                        </Box>
                      </Box>
                    </Tooltip>
                  </Box>
                ) : (
                  <Delay>
                    <Skeleton />
                  </Delay>
                )}
              </div>
            );
          })}
      {isResultDisplaySingleVoteBreakdown(poll.parameters) &&
        Object.keys(poll.options).map((_, i) => {
          const tallyResult = tally?.results[i];
          const mkrSupport = tally && tallyResult && tallyResult.mkrSupport ? tallyResult.mkrSupport : 0;

          return (
            <div key={i}>
              <Flex sx={{ justifyContent: 'space-between' }}>
                {tallyResult ? (
                  <Text as="p" sx={{ color: 'textSecondary', width: '20%', mr: 2 }}>
                    {tallyResult.optionName}
                  </Text>
                ) : (
                  <Delay>
                    <Skeleton />
                  </Delay>
                )}
                {tally && tallyResult ? (
                  <Text
                    as="p"
                    sx={{
                      color: 'textSecondary',
                      width: tally ? 'unset' : '30%',
                      textAlign: 'right'
                    }}
                  >
                    {`${formatValue(BigInt(mkrSupport.toString()))} MKR Voting (${formatValue(
                      parseEther(tallyResult.firstPct.toString())
                    )}%)`}
                  </Text>
                ) : (
                  <Delay>
                    <Skeleton />
                  </Delay>
                )}
              </Flex>

              {tally && tallyResult ? (
                <Tooltip label={`First choice ${formatValue(BigInt(mkrSupport.toString()))}`}>
                  <Box my={2}>
                    <Progress
                      sx={{
                        backgroundColor: 'secondary',
                        mb: '3',
                        height: 2,
                        color: getVoteColor(tallyResult.optionId, poll.parameters)
                      }}
                      max={tally.totalMkrParticipation}
                      value={mkrSupport}
                    />
                  </Box>
                </Tooltip>
              ) : (
                <Delay>
                  <Skeleton />
                </Delay>
              )}
            </div>
          );
        })}
    </Box>
  );
}
