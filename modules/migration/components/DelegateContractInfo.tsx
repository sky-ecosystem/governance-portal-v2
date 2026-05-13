/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { Text, Flex, Heading, Link as ThemeUILink, Button } from 'theme-ui';
import React, { useState } from 'react';
import LocalIcon from 'modules/app/components/Icon';
import { DateWithHover } from 'modules/app/components/DateWithHover';
import { Delegate, DelegateInfo, DelegatePaginated } from 'modules/delegates/types';
import BoxWithClose from 'modules/app/components/BoxWithClose';
import Icon from 'modules/app/components/Icon';
import { InternalLink } from 'modules/app/components/InternalLink';
import { DialogContent, DialogOverlay } from 'modules/app/components/Dialog';

export default function DelegateContractInfo({
  delegate,
  reverse
}: {
  delegate: Delegate | DelegatePaginated | DelegateInfo;
  reverse?: boolean;
}): React.ReactElement {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    if (delegate.delegateVersion === 2 || (!delegate.isAboutToExpire && !delegate.expired)) {
      return;
    }
    setModalOpen(true);
  };

  return (
    <Flex
      sx={{
        flexDirection: reverse ? 'row-reverse' : ['row-reverse', 'row'],
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '18px',
        cursor: delegate.isAboutToExpire || delegate.expired ? 'pointer' : 'inherit'
      }}
      onClick={openModal}
    >
      <Text variant="caps" color="onSecondary" sx={{ mr: delegate.delegateVersion === 2 ? 0 : 1 }}>
        {delegate.delegateVersion === 2 ? 'V2' : 'V1 | '}
      </Text>
      <Text variant="caps" color={'onSecondary'} sx={{ mr: delegate.delegateVersion === 2 ? 0 : 2 }}>
        <Flex>
          <Text sx={{ mr: 1 }}>
            {delegate.delegateVersion === 2
              ? ''
              : delegate.expired
              ? 'EXPIRED'
              : delegate.isAboutToExpire
              ? 'EXPIRING'
              : 'EXPIRES'}
          </Text>{' '}
          {delegate.delegateVersion !== 2 && <DateWithHover date={delegate.expirationDate} />}
        </Flex>
      </Text>
      <Flex
        sx={{
          alignContent: 'center',
          mr: reverse ? 2 : [2, 0]
        }}
      >
        {delegate.delegateVersion !== 2 && !delegate.expired && !delegate.isAboutToExpire && (
          <LocalIcon
            name="calendarcross"
            sx={{
              color: 'primary'
            }}
          />
        )}
        {(delegate.expired || delegate.isAboutToExpire) && (
          <Icon
            name="info"
            sx={{
              color: delegate.expired ? 'warning' : 'voterYellow'
            }}
          />
        )}
      </Flex>
      {modalOpen && (
        <DialogOverlay isOpen={modalOpen} onDismiss={() => setModalOpen(false)}>
          <DialogContent widthDesktop="580px" ariaLabel="Delegate expiry date">
            <BoxWithClose close={() => setModalOpen(false)}>
              <Flex sx={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Icon
                  name={'info'}
                  color={delegate.expired ? 'warning' : 'voterYellow'}
                  sx={{
                    size: 50,
                    mb: 3
                  }}
                />
                <Heading sx={{ textAlign: 'center', mb: 3 }}>
                  This delegate contract {delegate.expired ? 'has expired' : 'is about to expire'}.
                </Heading>
                <Text sx={{ mb: 3, color: 'onSecondary', textAlign: 'center' }}>
                  Maker delegate contracts expire after 1 year. Please{' '}
                  <InternalLink href="/migration/delegator" title="Migrate your MKR">
                    <Text as={'span'} sx={{ color: 'accentBlue' }}>
                      migrate your MKR
                    </Text>
                  </InternalLink>{' '}
                  by undelegating from the expiring/expired contracts and redelegating to the new contracts.
                </Text>
                <ThemeUILink
                  href={'https://manual.makerdao.com/delegation/delegate-expiration'}
                  sx={{ mb: 3 }}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Text px={4} sx={{ textAlign: 'center', fontSize: 14, color: 'accentBlue' }}>
                    Read More
                    <Icon name="arrowTopRight" sx={{ pt: 2 }} color="accentBlue" />
                  </Text>
                </ThemeUILink>
                <Button
                  sx={{ borderColor: 'primary', width: '100%', color: 'primary' }}
                  variant="outline"
                  onClick={() => setModalOpen(false)}
                >
                  Close
                </Button>
              </Flex>
            </BoxWithClose>
          </DialogContent>
        </DialogOverlay>
      )}
    </Flex>
  );
}
