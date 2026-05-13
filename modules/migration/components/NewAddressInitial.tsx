/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { useState } from 'react';
import { Alert, Button, Flex, Text, Input, Label } from 'theme-ui';
import Icon from 'modules/app/components/Icon';
import { ExternalLink } from 'modules/app/components/ExternalLink';

export function NewAddressInitial({
  handleSubmit,
  setError,
  error
}: {
  handleSubmit: (newAddress: string) => void;
  setError: (bool: boolean) => void;
  error: boolean;
}): JSX.Element {
  const [newAddress, setNewAddress] = useState('');

  const handleInput = e => {
    setError(false);
    setNewAddress(e.target.value);
  };

  return (
    <Flex sx={{ flexDirection: 'column' }}>
      <Flex>
        <Flex sx={{ width: '60%', flexDirection: 'column', pr: 5 }}>
          <Text as="h3" sx={{ fontWeight: 'semiBold' }}>
            Please enter a different wallet address that will be used to generate your new delegate contract
          </Text>
          <Text as="p" variant="secondary" sx={{ mt: 2 }}>
            Clicking ’submit address’ spawns a message you are required to sign using your current connected
            wallet. DUX team will verify the message and establish a link between your current contract and
            your new v2 delegate contract.
          </Text>
        </Flex>
        <Flex sx={{ width: '40%' }}>
          <Flex sx={{ bg: 'onSurfaceAlt', p: 3 }}>
            <Flex sx={{ mt: '5px', mr: 3, m1: 1, alignContent: 'flex-start', width: '100px' }}>
              <Icon name="Gnosis Safe" />
            </Flex>
            <Flex sx={{ flexDirection: 'column' }}>
              <Text>Are you a Gnosis Safe user?</Text>
              <Text variant="secondary">
                Gnosis Safe does not yet support off-chain message signing. Please sign the message through
                posting the transaction to Ethereum mainnet and contact DUX Core Unit once successful.
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Alert variant="notice" sx={{ my: 4 }}>
        You need to use a different wallet address for generating your new delegate contract. Make sure the
        address is different from the currently connected address, and make sure you are the sole operator of
        the address.
      </Alert>
      <Label sx={{ mb: 1 }}>Enter new address</Label>
      <Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Flex sx={{ flexDirection: 'column' }}>
          <Input
            name="search"
            onChange={handleInput}
            type="search"
            value={newAddress}
            sx={{
              px: 3,
              mr: 3,
              width: 460
            }}
          />
        </Flex>
        <Flex>
          <Button
            onClick={() => handleSubmit(newAddress)}
            sx={{ minWidth: 300 }}
            disabled={!newAddress || newAddress.length === 0}
          >
            Submit address
          </Button>
        </Flex>
      </Flex>
      {error && (
        <Text variant="error" sx={{ mt: 1 }}>
          Please enter a valid address
        </Text>
      )}
      <Text as="p" sx={{ fontWeight: 'semiBold', mt: 4 }}>
        You only need to submit once
      </Text>
      <Text as="p" variant="secondary" sx={{ mt: 2 }}>
        After submitting an address, you will be asked to sign a message to prove ownership of the current
        delegate contract.
      </Text>
      <Flex sx={{ alignItems: 'center', mt: 2 }}>
        <Text variant="secondary">
          Please reach out to us on{' '}
          <ExternalLink href="https://discord.gg/tQ5wnN6Ms4" title="Discord" styles={{ color: 'accentBlue' }}>
            <Text>Discord</Text>
          </ExternalLink>{' '}
          if you have additional questions.
        </Text>
        <Icon name={'discord'} sx={{ ml: 2 }} />
      </Flex>
    </Flex>
  );
}
