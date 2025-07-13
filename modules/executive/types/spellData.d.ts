/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

export type SpellData = {
  hasBeenCast?: boolean;
  hasBeenScheduled: boolean;
  eta?: Date;
  expiration?: Date;
  nextCastTime?: Date;
  datePassed?: Date;
  dateExecuted?: Date;
  mkrSupport: string;
  executiveHash?: string;
  officeHours?: boolean;
};

export type SkySpellData = {
  hasBeenCast?: boolean;
  hasBeenScheduled: boolean;
  eta?: Date;
  expiration?: Date;
  nextCastTime?: Date;
  datePassed?: Date;
  dateExecuted?: Date;
  skySupport: string;
  executiveHash?: string;
  officeHours?: boolean;
};

export type DecodedDiffAPIResponse = {
  contract: string;
  location: string;
  from_val: string;
  to_val: string;
  decoded_contract: string;
  decoded_location: string;
  decoded_from_val: string;
  decoded_to_val: string;
};

export type SimulationDiffAPIResponse = {
  contract: string;
  location: string;
  from_val: string;
  to_val: string;
};

export type SpellDiff = {
  contract: string;
  location: string;
  fromVal: string;
  toVal: string;
};
