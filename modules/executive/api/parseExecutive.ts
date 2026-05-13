/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { matterWrapper } from 'lib/matter';
import { CMSProposal } from 'modules/executive/types';
import { getAddress } from 'viem';
import { slugify } from 'lib/utils';
import { SupportedNetworks } from 'modules/web3/constants/networks';
import logger from 'lib/logger';

export function parseExecutive(
  proposalDoc: string,
  proposalIndex: Record<string, string[]>,
  proposalLink: string,
  network: SupportedNetworks
): CMSProposal | null {
  const {
    content,
    data: { title, summary, address, date }
  } = matterWrapper(proposalDoc);
  // Remove empty docs
  if (!(content && title && summary && address && date)) {
    logger.warn(
      `parseExecutive: ${proposalLink} executive missing required field, skipping executive: `,
      title
    );
    return null;
  }

  //remove if address is not a valid address
  try {
    getAddress(address);
  } catch (_) {
    logger.warn(`parseExecutive: ${proposalLink} invalid address: ${address} skipping executive: ${title}`);
    return null;
  }

  //remove if date is invalid
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    logger.warn(`parseExecutive: ${proposalLink} invalid date: ${date} skipping executive: ${title}`);
    return null;
  }

  //remove `Template - [ ... ] ` from title
  const editTitle = title => {
    const vStr = 'Template - [Executive Vote] ';
    const pStr = 'Template - [Executive Proposal] ';
    if (title.indexOf(vStr) === 0) return title.replace(vStr, '');
    if (title.indexOf(pStr) === 0) return title.replace(pStr, '');
    return title;
  };

  return {
    about: content,
    content: content,
    title: editTitle(title),
    proposalBlurb: summary,
    key: slugify(title),
    address: address,
    date: String(date),
    active: proposalIndex[network].includes(proposalLink),
    proposalLink
  };
}
