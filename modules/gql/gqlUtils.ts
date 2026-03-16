/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

/**
 * Strips the `{chainId}-` prefix from Envio HyperIndex entity IDs.
 * E.g., "1-0xabc..." → "0xabc..."
 */
export function stripChainIdPrefix(id: string): string {
  const dashIndex = id.indexOf('-');
  if (dashIndex === -1) return id;
  return id.substring(dashIndex + 1);
}
