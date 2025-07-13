/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import React from 'react';
import { Flex, Text } from 'theme-ui';
import { formatValue } from 'lib/string';
import { parseEther } from 'viem';
import { StatusText } from 'modules/app/components/StatusText';
import { ErrorBoundary } from 'modules/app/components/ErrorBoundary';
import { SkyPoll } from './SkyPollOverviewCard';

export default function SkyPollWinningOptionBox({
  tally,
  poll
}: {
  poll: SkyPoll;
  tally: SkyPoll['tally'];
}): React.ReactElement {
  if (!tally || !tally.results || tally.results.length === 0) {
    return (
      <Flex sx={{ py: 2, justifyContent: 'center' }}>
        <StatusText>No results available.</StatusText>
      </Flex>
    );
  }

  const isActivePoll = new Date(poll.endDate) > new Date();
  const isFinishedWithNoWinner = !tally.winner && !isActivePoll;

  const firstResultSupport = tally.results[0]?.skySupport;
  const numberOfLeadingOptions = firstResultSupport
    ? tally.results.filter(
        result =>
          result.skySupport &&
          parseEther(firstResultSupport as string) > 0n &&
          result.skySupport === firstResultSupport
      ).length
    : 1;

  const winningVictoryCondition = tally.parameters?.victoryConditions?.find(
    (v, index) => index === tally.victoryConditionMatched
  );

  let textWin = isActivePoll ? 'Leading option' : 'Winning option';
  let isDefault = false;

  // Check if there's a comparison victory condition (minimum participation threshold)
  const hasComparison = poll.parameters?.victoryConditions?.find(
    (condition: any) => condition.type === 'comparison'
  );

  const comparisonText =
    hasComparison &&
    hasComparison.comparator === '>=' &&
    ` Requires ${formatValue(parseEther(hasComparison.value.toString()))} SKY participation. `;

  if (winningVictoryCondition && winningVictoryCondition.type === 'default') {
    textWin = `No winner condition met.${comparisonText ? comparisonText : ' '}Defaulting to`;
    isDefault = true;
  }

  // Winner will be null if the winning conditions are not met, but we want to display the leading option too
  const leadingOption = typeof tally.winner === 'number' ? tally.winner : tally.results[0].optionId;
  const leadingOptionName = `${
    typeof tally.winner === 'number'
      ? tally.winningOptionName
      : tally.results[0].optionName || `Option ${tally.results[0].optionId}`
    //don't show "& n more" if isDefault since there's only ever 1 default option
  }${!isDefault && numberOfLeadingOptions > 1 ? ` & ${numberOfLeadingOptions - 1} more` : ''}`;

  const leadingOptionSupport =
    tally.results.find(({ optionId }) => optionId === leadingOption)?.skySupport?.toString() || '0';

  // Simple color mapping for options
  const getOptionColor = (optionId: number) => {
    const colors = ['#504DFF', '#4331E9', '#3B29C5', '#2A1F99'];
    return colors[optionId % colors.length] || '#504DFF';
  };

  return (
    <Flex sx={{ py: 2, justifyContent: 'center' }}>
      <ErrorBoundary componentName="Sky Poll Winning option">
        {(tally.totalSkyActiveParticipation &&
          parseEther(tally.totalSkyActiveParticipation as string) > 0n) ||
        (winningVictoryCondition && winningVictoryCondition.type === 'default') ? (
          <>
            {isFinishedWithNoWinner && <StatusText>No winning option</StatusText>}

            {(isActivePoll || !isFinishedWithNoWinner) && (
              <StatusText>
                <>
                  {textWin}:{' '}
                  <Text as="span" sx={{ color: getOptionColor(leadingOption) }}>
                    {leadingOptionName}
                  </Text>
                  {!isDefault &&
                    leadingOptionSupport &&
                    leadingOptionSupport !== '0' &&
                    ' with ' + formatValue(parseEther(leadingOptionSupport)) + ' SKY supporting.'}
                  {isDefault && '.'}
                </>
              </StatusText>
            )}
          </>
        ) : (
          <StatusText>No participation.</StatusText>
        )}
      </ErrorBoundary>
    </Flex>
  );
}
