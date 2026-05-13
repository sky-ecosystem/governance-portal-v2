/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { PollInputFormat, PollOrderByEnum } from 'modules/polling/polling.constants';
import { create } from 'zustand';

type Store = {
  pollFilters: {
    title: null | string;
    startDate: null | Date;
    endDate: null | Date;
    categoryFilter: string[];
    pollVictoryCondition: PollInputFormat[];
    showPollActive: boolean;
    showPollEnded: boolean;
  };
  executiveFilters: {
    startDate: null | Date;
    endDate: null | Date;
  };
  setTitle: (title: null | string) => void;
  setStartDate: (type: 'poll' | 'executive', startDate: Date | null) => void;
  setEndDate: (type: 'poll' | 'executive', endDate: Date | null) => void;
  setCategoryFilter: (categoryFilter: string[]) => void;
  setPollVictoryCondition: (pollVictoryCondition: PollInputFormat[]) => void;
  setShowPollActive: (showActive: boolean) => void;
  setShowPollEnded: (ended: boolean) => void;
  resetPollFilters: () => void;
  resetExecutiveFilters: () => void;
  executiveSortBy: 'active' | 'date' | 'mkr';
  setExecutiveSortBy: (method: 'active' | 'date' | 'mkr') => void;
  pollsSortBy: PollOrderByEnum;
  setPollsSortBy: (sort: PollOrderByEnum) => void;
  fetchOnLoad: boolean;
  setFetchOnLoad: (fetchOnLoad: boolean) => void;
};

const [useUiFiltersStore] = create<Store>((set, get) => ({
  pollFilters: {
    title: null,
    startDate: null,
    endDate: null,
    categoryFilter: [],
    pollVictoryCondition: [],
    showPollActive: false,
    showPollEnded: false
  },

  executiveFilters: {
    startDate: null,
    endDate: null
  },

  fetchOnLoad: false,

  setTitle: title => {
    set({ pollFilters: { ...get().pollFilters, title } });
  },

  setStartDate: (type, startDate) => {
    if (type === 'poll') set({ pollFilters: { ...get().pollFilters, startDate } });
    else if (type === 'executive') set({ executiveFilters: { ...get().executiveFilters, startDate } });
  },

  setEndDate: (type, endDate) => {
    if (type === 'poll') set({ pollFilters: { ...get().pollFilters, endDate } });
    else if (type === 'executive') set({ executiveFilters: { ...get().executiveFilters, endDate } });
  },

  setCategoryFilter: categoryFilter => {
    set({ pollFilters: { ...get().pollFilters, categoryFilter } });
  },

  setPollVictoryCondition: pollVictoryCondition => {
    set({ pollFilters: { ...get().pollFilters, pollVictoryCondition } });
  },

  setShowPollActive: (active: boolean) => {
    set({ pollFilters: { ...get().pollFilters, showPollActive: active } });
  },

  setShowPollEnded: (ended: boolean) => {
    set({ pollFilters: { ...get().pollFilters, showPollEnded: ended } });
  },

  resetPollFilters: () => {
    set({
      pollFilters: {
        title: null,
        startDate: null,
        endDate: null,
        categoryFilter: [],
        pollVictoryCondition: [],
        showPollActive: false,
        showPollEnded: false
      },
      pollsSortBy: PollOrderByEnum.nearestEnd
    });
  },

  resetExecutiveFilters: () => {
    set({
      executiveFilters: {
        startDate: null,
        endDate: null
      }
    });
  },

  executiveSortBy: 'active',

  setExecutiveSortBy: sortMethod => {
    set({ executiveSortBy: sortMethod });
  },

  pollsSortBy: PollOrderByEnum.nearestEnd,

  setPollsSortBy: pollsSortBy => {
    set({
      pollsSortBy
    });
  },

  setFetchOnLoad: fetchOnLoad => {
    set({
      fetchOnLoad
    });
  }
}));

export default useUiFiltersStore;
