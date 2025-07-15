/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import useSWR from 'swr';
import { fetchJson } from 'lib/fetchJson';
import { SkyExecutiveSupportersResponse } from 'pages/api/sky/executives/supporters';

export const useSkyExecutiveSupporters = () => {
  const { data, error, mutate } = useSWR<SkyExecutiveSupportersResponse>(
    '/api/sky/executives/supporters',
    fetchJson,
    {
      refreshInterval: 5 * 60 * 1000, // Refresh every 5 minutes
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 30 * 1000, // Dedupe requests within 30 seconds
    }
  );

  return {
    supporters: data,
    loading: !error && !data,
    error,
    mutate,
  };
};

export const useSkyExecutiveSupportersForSpell = (spellAddress: string) => {
  const { supporters, loading, error, mutate } = useSkyExecutiveSupporters();

  return {
    supporters: supporters?.[spellAddress.toLowerCase()] || [],
    loading,
    error,
    mutate,
  };
};