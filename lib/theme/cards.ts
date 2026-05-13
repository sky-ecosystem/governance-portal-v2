/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

export const cards = {
  primary: {
    border: 'none',
    boxShadow: theme => `0px 20px 40px ${theme.colors.shadowFloater}, 0px 1px 3px #bebebe40`,
    p: 3,
    borderRadius: 'medium',
    bg: 'surface'
  },
  compact: {
    variant: 'cards.primary',
    p: 3
  },
  noPadding: {
    variant: 'cards.primary',
    p: 0
  },
  tight: {
    variant: 'cards.primary',
    p: 2
  },
  emphasized: {
    variant: 'cards.primary',
    border: '1px solid',
    borderColor: 'onSecondary'
  }
};
