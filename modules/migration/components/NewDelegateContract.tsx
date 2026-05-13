/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { Flex, Text, Button, Box } from 'theme-ui';
import { InternalLink } from 'modules/app/components/InternalLink';
import Icon from 'modules/app/components/Icon';

export function NewDelegateContract(): JSX.Element {
  return (
    <Flex sx={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Text as="h3" variant="smallHeading">
        You&apos;re almost done
      </Text>
      <Flex sx={{ my: 4, alignItems: 'center', justifyContent: 'center' }}>
        <Box
          sx={{
            borderRadius: '100%',
            backgroundColor: 'primary',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '72px',
            height: '72px'
          }}
        >
          <Icon name="walletCheck" color="white" size={4} />
        </Box>

        <Box
          sx={{
            borderBottom: '2px dashed',
            borderColor: 'secondary',
            width: '140px',
            ml: 1,
            mr: 1
          }}
        ></Box>

        <Box
          sx={{
            borderRadius: '100%',
            border: '2px dashed',
            borderColor: 'secondary',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '72px',
            height: '72px'
          }}
        >
          <Icon name="paperCheck" color="secondary" size={4} />
        </Box>
      </Flex>
      <Text as="p" sx={{ texstAlign: 'center', fontSize: 4, fontWeight: 'semiBold', mb: 3 }}>
        Your new address has been linked to your previous address.
      </Text>
      <Text as="p" variant="secondary" sx={{ textAlign: 'center', maxWidth: '450px' }}>
        You are now ready to create your new delegate contract.
      </Text>
      <Text as="p" variant="secondary" sx={{ textAlign: 'center', maxWidth: '450px', mt: 2 }}>
        Please proceed to the Account page to create the new contract.
      </Text>
      <InternalLink href="/account" title="View account page">
        <Button sx={{ mt: 4, minWidth: '300px' }}>Create new contract on Account page</Button>
      </InternalLink>
    </Flex>
  );
}
