/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import useSWR from 'swr';
import { fetchJson } from 'lib/fetchJson';
import { SkyExecutiveDetailResponse } from 'modules/executive/types';

export const useSkyExecutiveDetail = (proposalIdOrKey: string | undefined, refreshInterval = 60000) => {
  const { data, error, isValidating, mutate } = useSWR<SkyExecutiveDetailResponse>(
    proposalIdOrKey ? `/api/sky/executives/${proposalIdOrKey}` : null,
    fetchJson,
    {
      refreshInterval,
      revalidateOnFocus: false,
      revalidateOnMount: true,
      errorRetryCount: 3,
      errorRetryInterval: 5000
    }
  );

  return {
    executive: data,
    error,
    isValidating,
    mutate
  };
};