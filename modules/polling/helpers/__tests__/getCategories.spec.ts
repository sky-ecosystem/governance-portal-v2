/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { Poll } from '../../types';
import { getCategories } from '../getCategories';
describe('Get categories', () => {
  it('Returns all the categories', () => {
    const polls = [
      {
        tags: [
          { id: 'a', longname: 'a' },
          { id: 'b', longname: 'b' },
          { id: 'c', longname: 'c' }
        ]
      },
      {
        tags: [
          { id: 'b', longname: 'b' },
          { id: 'c', longname: 'c' }
        ]
      },
      {
        tags: [
          { id: 'x', longname: 'x' },
          { id: 'y', longname: 'y' },
          { id: 'c', longname: 'c' }
        ]
      }
    ] as Poll[];
    const categories = getCategories(polls);

    // Returns all the categories
    expect(categories.length).toEqual(5);
  });

  it('Sorts them by alphabetical order', () => {
    const polls = [
      {
        tags: [
          { id: 'x', longname: 'x' },
          { id: 'b', longname: 'b' },
          { id: 'c', longname: 'c' }
        ]
      },
      {
        tags: [
          { id: 'b', longname: 'b' },
          { id: 'c', longname: 'c' }
        ]
      },
      {
        tags: [
          { id: 'x', longname: 'x' },
          { id: 'y', longname: 'y' },
          { id: 'c', longname: 'c' }
        ]
      }
    ] as Poll[];

    const categories = getCategories(polls);

    // First categories are the ones with more ocfurences
    expect(categories[0]).toEqual({ count: 2, id: 'b', longname: 'b' });
    expect(categories[1]).toEqual({ count: 3, id: 'c', longname: 'c' });
  });
});
