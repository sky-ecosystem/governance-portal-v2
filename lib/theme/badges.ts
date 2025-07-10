/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

export const badges = {
  primary: {
    variant: 'text.caps',
    fontSize: 1,
    px: 3,
    overflow: 'hidden',
    borderRadius: 'round',
    border: '1px solid',
    borderColor: 'secondaryAlt',
    py: 1,
    color: 'secondaryAlt',
    bg: 'surface'
  },
  circle: {
    width: '25px',
    height: '25px',
    p: 1,
    borderRadius: 'round',
    variant: 'text.caps',
    color: 'primary',
    bg: 'surface',
    border: '1px solid',
    borderColor: 'primary'
  },
  solidCircle: {
    width: '20px',
    height: '20px',
    borderRadius: 'round',
    variant: 'text.caps',
    color: 'onPrimary',
    bg: 'primary',
    border: '1px solid',
    borderColor: 'primary'
  },
  success: {
    variant: 'badges.primary',
    borderColor: 'success',
    color: 'success'
  },
  notice: {
    variant: 'badges.primary',
    borderColor: 'notice',
    color: 'notice'
  },
  warning: {
    variant: 'badges.primary',
    borderColor: 'warning',
    color: 'warning'
  },
  outline: {
    variant: 'text.caps',
    fontSize: 1,
    px: 3,
    py: 1,
    borderRadius: 'round',
    border: '1px solid',
    borderColor: '#C1C6FE',
    color: '#3B29C5',
    bg: '#F8F9FF'
  },
  sky: {
    variant: 'text.caps',
    fontSize: 0,
    px: 2,
    py: 1,
    borderRadius: 'small',
    border: 'none',
    color: '#504DFF',
    bg: 'background'
  }
};
