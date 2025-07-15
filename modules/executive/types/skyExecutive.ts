/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

// Sky executive types for the governance portal

export type SkyExecutiveSpellData = {
  hasBeenCast: boolean;
  hasBeenScheduled: boolean;
  nextCastTime: string;
  datePassed: string;
  dateExecuted: string;
  skySupport: string;
  executiveHash: string;
  officeHours: string;
};

export type SkyExecutiveSupporter = {
  address: string;
  skySupport: string;
  percentage: number;
};

export type SkyExecutiveContext = {
  prev: { key: string } | null;
  next: { key: string } | null;
};

export type SkyExecutiveDetailResponse = {
  title: string;
  proposalBlurb: string;
  key: string;
  address: string;
  date: string;
  content: string; // HTML content for executive details
  active: boolean;
  proposalLink: string;
  spellData: SkyExecutiveSpellData;
  supporters?: SkyExecutiveSupporter[];
  ctx?: SkyExecutiveContext;
};

// Sky executive list item (from the existing executives API)
export type SkyExecutiveListItem = {
  title: string;
  proposalBlurb: string;
  key: string;
  address: string;
  date: string;
  active: boolean;
  proposalLink: string;
  spellData: SkyExecutiveSpellData;
};

// Type guard to check if an executive is a Sky executive
export function isSkyExecutive(executive: any): executive is SkyExecutiveDetailResponse {
  return (
    executive &&
    typeof executive === 'object' &&
    'key' in executive &&
    'spellData' in executive &&
    'skySupport' in executive.spellData
  );
}

// Type guard to check if spell data is Sky spell data
export function isSkySpellData(spellData: any): spellData is SkyExecutiveSpellData {
  return (
    spellData &&
    typeof spellData === 'object' &&
    'skySupport' in spellData
  );
}