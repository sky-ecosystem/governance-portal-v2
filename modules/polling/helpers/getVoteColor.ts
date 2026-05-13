/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { PollParameters } from '../types';
import { isInputFormatChooseFree, isInputFormatRankFree, isResultDisplayApprovalBreakdown } from './utils';

export const getVoteColor = (optionId: number, pollParameters: PollParameters, hex = false): string => {
  const abstainOptionHex = '#708390';
  const abstainOption = 'onSurface';

  const noOptionHex = '#F75524';
  const noOption = 'warning';

  const yesOptionHex = '#1AAB9B';
  const yesOption = 'primary';

  if (pollParameters.inputFormat.abstain.indexOf(optionId) !== -1) {
    return hex ? abstainOptionHex : abstainOption;
  }

  if (isResultDisplayApprovalBreakdown(pollParameters)) {
    return hex ? '#231536' : 'text';
  }

  if (isInputFormatRankFree(pollParameters)) {
    return hex ? abstainOptionHex : abstainOption;
  }

  if (isInputFormatChooseFree(pollParameters)) {
    return pollParameters.inputFormat.options.indexOf(optionId) !== -1 ? yesOption : noOption;
  }

  const colors = {
    0: abstainOption,
    1: yesOption,
    2: noOption
  };

  const colorsHex = {
    0: abstainOptionHex,
    1: yesOptionHex,
    2: noOptionHex
  };

  return hex ? colorsHex[optionId] : colors[optionId];
};
