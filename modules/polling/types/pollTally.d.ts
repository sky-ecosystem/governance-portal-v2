/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { PollParameters } from './poll';

export type SpockVote = {
  optionIdRaw: number;
  mkrSupport: number;
  voter: string;
  chainId: number;
  blockTimestamp: number;
  hash: string;
};

export type PollTallyVote = {
  pollId: number;
  voter: string;
  ballot: number[];
  mkrSupport: number | string;
  chainId: number;
  blockTimestamp: number;
  hash: string;
  optionIdRaw: string | number;
};

export type PollTallyOption = {
  mkrSupport: number | string;
  optionId: number;
  optionName: string;
  winner: boolean;
  firstPct: number | string;
  eliminated?: boolean;
  transferPct?: number | string;
  transfer?: number | string;
};

export type PollTally = {
  parameters: PollParameters;
  winner: number | null;
  numVoters: number;
  results: PollTallyOption[];
  totalMkrParticipation: number | string;
  totalMkrActiveParticipation: number | string;
  winningOptionName: string;
  victoryConditionMatched: number | null;
  votesByAddress?: PollTallyVote[];
  rounds?: number;
};
