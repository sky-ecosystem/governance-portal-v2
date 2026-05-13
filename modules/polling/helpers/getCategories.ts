/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { TagCount } from 'modules/app/types/tag';
import { Poll } from 'modules/polling/types';

export const getCategories = (polls: Poll[]): TagCount[] => {
  const categories = polls.reduce((acc, cur) => {
    if (!cur.tags) return acc;
    cur.tags.forEach(c => {
      const prev = acc.findIndex(t => t.id === c.id);

      if (prev !== -1) {
        acc[prev].count += 1;
      } else {
        acc.push({
          ...c,
          count: 1
        });
      }
    });
    return acc;
  }, [] as TagCount[]);

  const allCategories = categories.sort((a, b) => (a.longname > b.longname ? 1 : -1));

  return allCategories || [];
};
