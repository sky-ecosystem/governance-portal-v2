/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { Text } from 'theme-ui';

type Props = {
  children: string | JSX.Element;
  testId?: string;
};

export const StatusText = (props: Props): JSX.Element => (
  <Text
    as="p"
    variant="caps"
    data-testid={props.testId}
    sx={{ textAlign: 'center', px: [3, 4], wordBreak: 'break-word' }}
  >
    {props.children}
  </Text>
);
