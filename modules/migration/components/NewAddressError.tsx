/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { Flex, Text, Button } from 'theme-ui';
import TxIndicators from 'modules/app/components/TxIndicators';
import { ExternalLink } from 'modules/app/components/ExternalLink';

export function NewAddressError({ resetStatus }: { resetStatus: () => void }): JSX.Element {
  return (
    <Flex sx={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Text as="h3" variant="smallHeading">
        Something went wrong
      </Text>
      <Flex sx={{ my: 4 }}>
        <TxIndicators.Failed sx={{ width: 6 }} />
      </Flex>
      <Text as="p" variant="secondary" sx={{ textAlign: 'center' }}>
        Please contact us on{' '}
        <ExternalLink href="https://discord.gg/tQ5wnN6Ms4" title="Discord" styles={{ color: 'accentBlue' }}>
          <Text>Discord</Text>
        </ExternalLink>{' '}
        to resolve the issue.
      </Text>
      <Button sx={{ mt: 4, minWidth: '300px' }} onClick={resetStatus}>
        Try again
      </Button>
    </Flex>
  );
}
