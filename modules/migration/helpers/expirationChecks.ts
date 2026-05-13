/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { add, isAfter, isBefore } from 'date-fns';

const DAYS_TO_WARN_BEFORE = 30;

export const isAboutToExpireCheck = (expirationDate?: Date | null): boolean =>
  expirationDate ? isBefore(new Date(expirationDate), add(new Date(), { days: DAYS_TO_WARN_BEFORE })) : false;

export const isExpiredCheck = (expirationDate?: Date | null): boolean =>
  expirationDate ? isAfter(new Date(), new Date(expirationDate)) : false;
