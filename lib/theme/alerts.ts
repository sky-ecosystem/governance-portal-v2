/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

export const alerts = {
  primary: {
    fontSize: 2,
    borderRadius: 'small',
    border: '1px solid',
    borderColor: 'primary',
    bg: 'primary',
    color: 'onPrimary',
    width: '100%',
    justifyContent: ['flex-start', 'center']
  },
  success: {
    variant: 'alerts.primary',
    borderColor: 'success',
    bg: 'successAlt',
    color: 'onSuccess'
  },
  notice: {
    variant: 'alerts.primary',
    borderColor: 'notice',
    bg: 'noticeAlt',
    color: 'onNotice'
  },
  warning: {
    variant: 'alerts.primary',
    borderColor: 'warning',
    bg: 'warning',
    color: 'onPrimary'
  },
  banner: {
    variant: 'alerts.primary',
    bg: 'banner',
    borderColor: 'banner'
  },
  bannerNotice: {
    variant: 'alerts.primary',
    borderColor: 'orangeAttention',
    bg: 'orangeAttention',
    color: 'onPrimary'
  },
  bannerWarning: {
    variant: 'alerts.primary',
    borderColor: 'warning',
    bg: 'warning',
    color: 'onPrimary'
  }
};
