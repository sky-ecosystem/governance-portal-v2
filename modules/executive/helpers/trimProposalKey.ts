/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

// Trims the proposal key to a certain length (otherwise build can fail)
export function trimProposalKey(proposalKey: string): string {
  const MAX_SLUG_LENGTH = 200;

  return proposalKey.substring(0, Math.min(proposalKey.length, MAX_SLUG_LENGTH));
}
