/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { PollInputFormat, PollResultDisplay, PollVictoryConditions } from '../polling.constants';
import {
  Poll,
  PollParameters,
  PollVictoryConditionAND,
  PollTallyVote,
  VictoryCondition,
  PollListItem
} from '../types';

export function pollHasEnded(poll: PollListItem | Poll): boolean {
  const now = Date.now();
  return new Date(poll.endDate).getTime() < now;
}

export function pollHasStarted(poll: PollListItem | Poll): boolean {
  const now = Date.now();
  return new Date(poll.startDate).getTime() < now;
}

export function isActivePoll(poll: PollListItem | Poll): boolean {
  return !pollHasEnded(poll) && pollHasStarted(poll);
}

// Generic function to determine if a victory condition exists in the nested array of victory conditions
export function findVictoryCondition(
  victoryConditions: (PollVictoryConditionAND | VictoryCondition)[],
  victoryCondition: PollVictoryConditions
): (PollVictoryConditionAND | VictoryCondition)[] {
  const found: (PollVictoryConditionAND | VictoryCondition)[] = [];
  victoryConditions.forEach((v: VictoryCondition | PollVictoryConditionAND) => {
    if (v.type === PollVictoryConditions.and) {
      if (victoryCondition === PollVictoryConditions.and) {
        found.push(v);
        return;
      }

      (v.conditions || []).forEach(i => {
        if (i.type === victoryCondition) {
          found.push(i);
          return;
        }
      });
    }

    if (v.type === victoryCondition) {
      found.push(v);
    }
  });
  return found;
}

export function hasVictoryConditionInstantRunOff(
  victoryConditions: (PollVictoryConditionAND | VictoryCondition)[]
): boolean {
  return findVictoryCondition(victoryConditions, PollVictoryConditions.instantRunoff).length > 0;
}
export function hasVictoryConditionPlurality(
  victoryConditions: (PollVictoryConditionAND | VictoryCondition)[]
): boolean {
  return findVictoryCondition(victoryConditions, PollVictoryConditions.plurality).length > 0;
}

export function hasVictoryConditionMajority(
  victoryConditions: (PollVictoryConditionAND | VictoryCondition)[]
): boolean {
  return findVictoryCondition(victoryConditions, PollVictoryConditions.majority).length > 0;
}

export function hasVictoryConditionApproval(
  victoryConditions: (PollVictoryConditionAND | VictoryCondition)[]
): boolean {
  return findVictoryCondition(victoryConditions, PollVictoryConditions.approval).length > 0;
}

export function hasVictoryConditionAND(
  victoryConditions: (PollVictoryConditionAND | VictoryCondition)[]
): boolean {
  return findVictoryCondition(victoryConditions, PollVictoryConditions.and).length > 0;
}

export function hasVictoryConditionDefault(
  victoryConditions: (PollVictoryConditionAND | VictoryCondition)[]
): boolean {
  return findVictoryCondition(victoryConditions, PollVictoryConditions.default).length > 0;
}

export function hasVictoryConditionComparison(
  victoryConditions: (PollVictoryConditionAND | VictoryCondition)[]
): boolean {
  return findVictoryCondition(victoryConditions, PollVictoryConditions.comparison).length > 0;
}

export function isResultDisplaySingleVoteBreakdown(parameters: PollParameters): boolean {
  return parameters.resultDisplay === PollResultDisplay.singleVoteBreakdown;
}

export function isResultDisplayInstantRunoffBreakdown(parameters: PollParameters): boolean {
  return parameters.resultDisplay === PollResultDisplay.instantRunoffBreakdown;
}

export function isResultDisplayApprovalBreakdown(parameters: PollParameters): boolean {
  return parameters.resultDisplay === PollResultDisplay.approvalBreakdown;
}

export function isInputFormatRankFree(parameters: PollParameters): boolean {
  return parameters.inputFormat.type === PollInputFormat.rankFree;
}

export function isInputFormatChooseFree(parameters: PollParameters): boolean {
  return parameters.inputFormat.type === PollInputFormat.chooseFree;
}

export function isInputFormatSingleChoice(parameters: PollParameters): boolean {
  return parameters.inputFormat.type === PollInputFormat.singleChoice;
}

export function extractCurrentPollVote(
  poll: PollListItem | Poll,
  allUserVotes: PollTallyVote[] | undefined
): number[] | null {
  const currentVote = allUserVotes?.find(_poll => _poll.pollId === poll.pollId);
  return currentVote?.ballot || null;
}

export function findPollById(pollList: Poll[], pollId: string): Poll | undefined {
  return pollList.find((poll: Poll) => parseInt(pollId) === poll.pollId);
}
