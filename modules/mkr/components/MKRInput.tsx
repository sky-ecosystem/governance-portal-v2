/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { useState } from 'react';
import { Input, Text, Button, Box, Flex } from 'theme-ui';
import Skeleton from 'modules/app/components/SkeletonThemed';
import { formatValue } from 'lib/string';
import { parseEther } from 'viem';
import logger from 'lib/logger';

export type MKRInputProps = {
  placeholder?: string;
  onChange: (value: bigint) => void;
  min?: bigint;
  max?: bigint;
  balance?: bigint;
  balanceText?: string;
  errorMaxMessage?: string;
  value: bigint;
};

export function MKRInput({
  placeholder = '0.000000 MKR',
  errorMaxMessage = 'MKR balance too low',
  onChange,
  min = 0n,
  max,
  balance,
  balanceText = 'MKR Balance:',
  value
}: MKRInputProps): React.ReactElement {
  const [currentValueStr, setCurrentValueStr] = useState('');
  const [errorInvalidFormat, setErrorInvalidFormat] = useState(false);

  function updateValue(e: { currentTarget: { value: string } }) {
    const newValueStr = e.currentTarget.value;

    setCurrentValueStr(newValueStr);

    try {
      const newValue = parseEther(newValueStr || '0');

      const invalidValue = newValue < min || (!!max && newValue > max);
      if (invalidValue) {
        setErrorInvalidFormat(true);
        return;
      }

      setErrorInvalidFormat(false);

      onChange(parseEther(newValueStr));
    } catch (e) {
      logger.error(`MKRInput, invalid value: ${newValueStr}`, e);
      setErrorInvalidFormat(true);
      return;
    }
  }

  const disabledButton = balance === undefined;

  const onClickSetMax = () => {
    const val = balance ? balance : 0n;
    onChange(val);
    const formattedValue = formatValue(val, 'wad', 6).replace(/,/g, '');
    setCurrentValueStr(formattedValue);
  };

  const errorMax = value !== undefined && value > (balance || 0n);
  const errorMin = value !== undefined && value < 0n;

  return (
    <Box data-testid="mkr-input-wrapper">
      <Flex sx={{ border: '1px solid #D8E0E3', justifyContent: 'space-between' }}>
        <Input
          aria-label="mkr-input"
          data-testid="mkr-input"
          type="number"
          onChange={updateValue}
          value={currentValueStr}
          placeholder={placeholder}
          lang="en" // Forces dot for decimals
          sx={{
            border: 'none',
            color: 'text'
          }}
        />
        <Button
          disabled={disabledButton}
          variant="textual"
          data-testid="mkr-input-set-max"
          sx={{ width: '80px', fontWeight: 'bold', paddingLeft: 0 }}
          onClick={onClickSetMax}
          title="Set max"
        >
          Set max
        </Button>
      </Flex>
      <Flex sx={{ alignItems: 'baseline', mb: 3, alignSelf: 'flex-start' }}>
        <Text
          sx={{
            textTransform: 'uppercase',
            color: 'secondaryEmphasis',
            fontSize: 1,
            fontWeight: 'bold'
          }}
          data-testid="mkr-input-balance-text"
        >
          {balanceText}&nbsp;
        </Text>

        {balance !== undefined ? (
          <Text
            sx={{ cursor: 'pointer', fontSize: 2, mt: 2 }}
            onClick={onClickSetMax}
            data-testid="mkr-input-balance"
          >
            {formatValue(balance, 'wad', 6)}
          </Text>
        ) : (
          <Box sx={{ width: 6 }}>
            <Skeleton />
          </Box>
        )}
      </Flex>

      {errorMax && (
        <Text variant="error" data-testid="mkr-input-error">
          {errorMaxMessage}
        </Text>
      )}
      {errorMin && (
        <Text variant="error" data-testid="mkr-input-error">
          Please enter a valid amount.
        </Text>
      )}
      {errorInvalidFormat && (
        <Text variant="error" data-testid="mkr-input-error">
          Please enter a valid number.
        </Text>
      )}
    </Box>
  );
}
