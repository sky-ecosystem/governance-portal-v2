/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { sortPolls } from '../fetchPolls';

import { Poll } from '../../types';

import { PollInputFormat, PollResultDisplay, PollVictoryConditions } from 'modules/polling/polling.constants';
import { gqlRequest } from 'modules/gql/gqlRequest';
import { Mock, vi } from 'vitest';

vi.mock('modules/gql/gqlRequest');

describe('Sort Polls', () => {
  beforeAll(() => {
    (gqlRequest as Mock).mockResolvedValue({
      activePolls: {
        nodes: [],
        edges: []
      }
    });
  });

  // TODO: Introduce getPollsTest

  const polls: Poll[] = [
    {
      tags: [
        {
          id: 'a',
          longname: 'a',
          shortname: 'a'
        }
      ],
      content: '',
      discussionLink: '',
      endDate: new Date(2011, 10, 30),
      multiHash: '',
      options: {},
      pollId: 1,
      startDate: new Date(2011, 10, 30),
      slug: '',
      summary: '',
      title: '2011,10,30',
      parameters: {
        inputFormat: PollInputFormat.singleChoice,
        resultDisplay: PollResultDisplay.singleVoteBreakdown,
        victoryConditions: [{ type: PollVictoryConditions.plurality }]
      },
      ctx: {} as any
    },
    {
      tags: [
        {
          id: 'a',
          longname: 'a',
          shortname: 'a'
        }
      ],
      content: '',
      discussionLink: '',
      endDate: new Date(2011, 10, 30),
      multiHash: '',
      options: {},
      pollId: 2,
      startDate: new Date(2011, 10, 31),
      slug: '',
      summary: '',
      title: '2011,10,31',
      parameters: {
        inputFormat: PollInputFormat.singleChoice,
        resultDisplay: PollResultDisplay.singleVoteBreakdown,
        victoryConditions: [{ type: PollVictoryConditions.plurality }]
      },
      ctx: {} as any
    },
    {
      tags: [
        {
          id: 'a',
          longname: 'a',
          shortname: 'a'
        }
      ],
      content: '',
      discussionLink: '',
      endDate: new Date(2021, 11, 31),
      multiHash: '',
      options: {},
      pollId: 3,
      startDate: new Date(2021, 10, 31),
      slug: '',
      summary: '',
      title: '2021,10,31',
      parameters: {
        inputFormat: PollInputFormat.singleChoice,
        resultDisplay: PollResultDisplay.singleVoteBreakdown,
        victoryConditions: [{ type: PollVictoryConditions.plurality }]
      },
      ctx: {} as any
    },
    {
      tags: [
        {
          id: 'a',
          longname: 'a',
          shortname: 'a'
        }
      ],
      content: '',
      discussionLink: '',
      endDate: new Date(2021, 11, 31),
      multiHash: '',
      options: {},
      pollId: 4,
      startDate: new Date(2021, 11, 31),
      slug: '',
      summary: '',
      title: '2021,11,31',
      parameters: {
        inputFormat: PollInputFormat.singleChoice,
        resultDisplay: PollResultDisplay.singleVoteBreakdown,
        victoryConditions: [{ type: PollVictoryConditions.plurality }]
      },
      ctx: {} as any
    }
  ];

  test('The first poll is the one created sooner', () => {
    const results = sortPolls(polls);

    expect(results[0].pollId).toEqual(4);
  });

  test('The second poll is the one with the same date as 1 but different start date', () => {
    const results = sortPolls(polls);

    expect(results[1].pollId).toEqual(3);
  });

  test('The 4 poll is the one that ended first', () => {
    const results = sortPolls(polls);

    expect(results[3].pollId).toEqual(1);
  });
});
