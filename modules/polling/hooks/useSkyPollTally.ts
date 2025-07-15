/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import useSWR from 'swr';
import { fetchJson } from 'lib/fetchJson';
import { SkyPollTallyResponse } from 'pages/api/sky/polls/tally/[poll-id]';

type UseSkyPollTallyResponse = {
  tally?: SkyPollTallyResponse;
  error?: any;
  isValidating: boolean;
  mutate: () => void;
};

export function useSkyPollTally(
  pollId: number | string | null | undefined,
  refreshInterval = 0,
  network = 'mainnet'
): UseSkyPollTallyResponse {
  const shouldFetch = pollId !== null && pollId !== undefined && pollId !== 0;

  const { data, error, isValidating, mutate } = useSWR<SkyPollTallyResponse>(
    shouldFetch ? `/api/sky/polls/tally/${pollId}?network=${network}` : null,
    fetchJson,
    {
      refreshInterval,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 30000, // 30 seconds
      errorRetryCount: 3,
      errorRetryInterval: 5000,
      onError: error => {
        console.error('Error fetching Sky poll tally:', error);
      }
    }
  );

  return {
    tally: data,
    error,
    isValidating,
    mutate
  };
}
