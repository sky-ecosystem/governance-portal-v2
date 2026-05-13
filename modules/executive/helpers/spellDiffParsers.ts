/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { isAddress } from 'viem';
import { isValid, format } from 'date-fns';
import { DecodedDiffAPIResponse, SimulationDiffAPIResponse, SpellDiff } from '../types';
import { cutMiddle } from 'lib/string';
// import { DecodedDiffAPIResponse, SimulationDiffAPIResponse, SpellDiff } from '../types';

// Standardize the diff properties and use the decoded ones when available
export const validateDiff = (diff: DecodedDiffAPIResponse | SimulationDiffAPIResponse): SpellDiff => ({
  contract: (diff as DecodedDiffAPIResponse).decoded_contract ?? diff.contract,
  location: (diff as DecodedDiffAPIResponse).decoded_location ?? diff.location,
  fromVal: (diff as DecodedDiffAPIResponse).decoded_from_val ?? diff.from_val,
  toVal: (diff as DecodedDiffAPIResponse).decoded_to_val ?? diff.to_val
});

export const formatLocation = (location: string): string => {
  if (location.indexOf(']') !== -1) {
    const storage = location.slice(0, location.indexOf('['));
    const storKey = location.slice(location.indexOf('[') + 1, location.indexOf(']'));
    // const val = location.indexOf('].') !== -1 ? location.slice(location.indexOf('].') + 2) : null;

    // Check if it's an address
    if (isAddress(storKey)) {
      return `${storage}[${cutMiddle(storKey, 12, 8)}]`;

      // Check if its a hash
    } else if (storKey.length === 64) {
      return `${storage}[${cutMiddle(storKey)}]`;

      // Check if it is a contract name
    } else if (isNaN(parseInt(storKey))) {
      return location;

      // Check if it's an ID
    } else if (typeof parseInt(storKey) === 'number') {
      return location;
    }
  }
  return location;
};

export const formatDiffValue = (value: string): string => {
  if ((value.startsWith('16') || value.startsWith('17')) && isValid(new Date(parseInt(value) * 1000))) {
    return format(new Date(parseInt(value) * 1000), 'MM/dd/yyyy');
  }
  return cutMiddle(value);
};
