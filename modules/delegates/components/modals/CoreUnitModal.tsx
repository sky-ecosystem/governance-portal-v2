/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { Text, Heading, Flex, Button, Link as ThemeUILink } from 'theme-ui';
import Icon from 'modules/app/components/Icon';
import { BoxWithClose } from 'modules/app/components/BoxWithClose';
import { DialogContent, DialogOverlay } from 'modules/app/components/Dialog';

type Props = {
  isOpen: boolean;
  onDismiss: () => void;
};

export const CoreUnitModal = ({ isOpen, onDismiss }: Props): JSX.Element => {
  return (
    <DialogOverlay isOpen={isOpen} onDismiss={onDismiss}>
      <DialogContent widthDesktop="580px" ariaLabel="Core Unit modal">
        <BoxWithClose close={onDismiss}>
          <Flex sx={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Icon
              name={'info'}
              color="voterYellow"
              sx={{
                size: 39,
                mb: 3
              }}
            />
            <Heading sx={{ textAlign: 'center', mb: 3 }}>
              Note: This delegate is also a Core Unit Member
            </Heading>
            <Text sx={{ mb: 3, color: 'onSecondary' }}>
              Core Unit members are paid contributors to MakerDAO. When delegating your MKR to this delegate,
              please be conscious of the potential impact of these divergent incentives. GovAlpha generally
              advises against delegating to CU members.{' '}
            </Text>
            <ThemeUILink
              href={'https://manual.makerdao.com/delegation/overview/separation-of-powers'}
              sx={{ mb: 3 }}
              target="_blank"
              rel="noreferrer"
            >
              <Text px={4} sx={{ textAlign: 'center', fontSize: 14, color: 'accentBlue' }}>
                Read More
                <Icon name="arrowTopRight" sx={{ pt: 2 }} color="accentBlue" />
              </Text>
            </ThemeUILink>
            <Button onClick={onDismiss}>Close</Button>
          </Flex>
        </BoxWithClose>
      </DialogContent>
    </DialogOverlay>
  );
};
