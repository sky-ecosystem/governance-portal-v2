/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import React, { useState } from 'react';
import { Card, Box, Flex, Button, Text } from 'theme-ui';
import { formatValue } from 'lib/string';
import { useMkrDelegatedByUser } from 'modules/mkr/hooks/useMkrDelegatedByUser';
import { DelegateInfo } from 'modules/delegates/types';
import { DelegateModal, UndelegateModal } from 'modules/delegates/components';
import DelegateAvatarName from 'modules/delegates/components/DelegateAvatarName';
import { useAccount } from 'modules/app/hooks/useAccount';
import DelegateContractInfo from './DelegateContractInfo';

type PropTypes = {
  delegate: DelegateInfo;
};

export function DelegateExpirationOverviewCard({ delegate }: PropTypes): React.ReactElement {
  const { account } = useAccount();

  const [showDelegateModal, setShowDelegateModal] = useState(false);
  const [showUndelegateModal, setShowUndelegateModal] = useState(false);

  const { data: mkrDelegatedData, mutate: mutateMKRDelegated } = useMkrDelegatedByUser(
    account,
    delegate.voteDelegateAddress
  );
  const mkrDelegated = mkrDelegatedData?.totalDelegationAmount;

  return (
    <Card
      sx={{
        p: 0
      }}
      data-testid="delegate-card"
    >
      <Box px={[3, 4]} pb={3} pt={3}>
        <Flex sx={{ mb: 2, justifyContent: 'flex-end' }}>
          <DelegateContractInfo delegate={delegate} />
        </Flex>

        <Flex
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: ['wrap', 'nowrap']
          }}
        >
          <Box sx={{ mr: 2, my: 2, width: '50%' }}>
            <DelegateAvatarName delegate={delegate} />
          </Box>

          <Flex
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              ml: 2,
              my: 2,
              justifyContent: 'right'
            }}
          >
            <Box sx={{ mr: 4 }}>
              <Text
                as="p"
                variant="microHeading"
                sx={{ fontSize: [3, 5] }}
                data-testid="mkr-delegated-by-you"
              >
                {mkrDelegated ? formatValue(mkrDelegated) : '0'}
              </Text>
              <Text as="p" variant="secondary" color="onSecondary" sx={{ fontSize: [2, 3] }}>
                MKR delegated by you
              </Text>
            </Box>
            <Box>
              {(delegate.delegateVersion !== 2) && (
                <Button
                  variant="primaryOutline"
                  disabled={!account}
                  onClick={() => {
                    setShowUndelegateModal(true);
                  }}
                  sx={{ width: '135px', height: '45px', maxWidth: '135px', mr: [2, 2] }}
                  data-testid="button-undelegate"
                >
                  Undelegate
                </Button>
              )}
              {delegate.delegateVersion === 2 && (
                <Button
                  variant="primaryLarge"
                  data-testid="button-delegate"
                  disabled={!account}
                  onClick={() => {
                    setShowDelegateModal(true);
                  }}
                  sx={{ width: '135px', maxWidth: '135px', height: '45px', ml: 3 }}
                >
                  Delegate
                </Button>
              )}
            </Box>
          </Flex>
        </Flex>
      </Box>

      {showDelegateModal && (
        <DelegateModal
          delegate={delegate}
          isOpen={showDelegateModal}
          onDismiss={() => setShowDelegateModal(false)}
          mutateTotalStaked={() => null}
          mutateMKRDelegated={mutateMKRDelegated}
        />
      )}
      {showUndelegateModal && (
        <UndelegateModal
          delegate={delegate}
          isOpen={showUndelegateModal}
          onDismiss={() => setShowUndelegateModal(false)}
          mutateTotalStaked={() => null}
          mutateMKRDelegated={mutateMKRDelegated}
        />
      )}
    </Card>
  );
}
