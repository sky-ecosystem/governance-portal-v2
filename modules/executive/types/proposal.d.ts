/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { SpellData, SkySpellData } from './spellData';

export type CMSProposal = {
  active: boolean;
  address: string;
  key: string;
  content?: string;
  about?: string;
  proposalBlurb: string;
  title: string;
  date: string;
  proposalLink: string;
  spellData?: {
    mkrSupport: string;
  };
};

export type Proposal = CMSProposal & {
  spellData: SpellData;
};

export type SkyProposal = Omit<CMSProposal, 'spellData'> & {
  spellData: SkySpellData;
};
