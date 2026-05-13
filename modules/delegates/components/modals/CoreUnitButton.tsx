/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { Button, Flex, Text } from 'theme-ui';
import Icon from 'modules/app/components/Icon';

type Props = {
  handleInfoClick: () => void;
};

export const CoreUnitButton = ({ handleInfoClick }: Props): JSX.Element => (
  <Button variant="outline" onClick={handleInfoClick} sx={{ border: 'none', p: 0 }}>
    <Flex sx={{ alignItems: 'center', flexDirection: ['row-reverse', 'row'] }}>
      <Text variant="caps" sx={{ color: 'onSecondary', mr: [0, 2] }}>
        core unit member
      </Text>
      <Icon
        name={'info'}
        color="voterYellow"
        sx={{
          size: 16,
          mr: [2, 0]
        }}
      />
    </Flex>
  </Button>
);
