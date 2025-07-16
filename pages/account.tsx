/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { Box, Card, Flex, Heading, Label, Text } from 'theme-ui';
import { formatValue } from 'lib/string';
import { useLockedMkr } from 'modules/mkr/hooks/useLockedMkr';
import PrimaryLayout from 'modules/app/components/layout/layouts/Primary';
import SidebarLayout from 'modules/app/components/layout/layouts/Sidebar';
import Stack from 'modules/app/components/layout/layouts/Stack';
import SystemStatsSidebar from 'modules/app/components/SystemStatsSidebar';
import ResourceBox from 'modules/app/components/ResourceBox';
import { DelegateDetail } from 'modules/delegates/components';
import Withdraw from 'modules/mkr/components/Withdraw';
import Icon from 'modules/app/components/Icon';
import { HeadComponent } from 'modules/app/components/layout/Head';
import { useAccount } from 'modules/app/hooks/useAccount';
import { AddressDetail } from 'modules/address/components/AddressDetail';
import ManageDelegation from 'modules/delegates/components/ManageDelegation';
import SkeletonThemed from 'modules/app/components/SkeletonThemed';
import { ErrorBoundary } from 'modules/app/components/ErrorBoundary';
import { useAddressInfo } from 'modules/app/hooks/useAddressInfo';
import { useLinkedDelegateInfo } from 'modules/migration/hooks/useLinkedDelegateInfo';
import { useVoteDelegateAddress } from 'modules/delegates/hooks/useVoteDelegateAddress';
import { ExternalLink } from 'modules/app/components/ExternalLink';
import AccountSelect from 'modules/app/components/layout/header/AccountSelect';
import { ClientRenderOnly } from 'modules/app/components/ClientRenderOnly';
import EtherscanLink from 'modules/web3/components/EtherscanLink';
import { useNetwork } from 'modules/app/hooks/useNetwork';

const AccountPage = (): React.ReactElement => {
  const network = useNetwork();
  const { account, voteDelegateContractAddress, voteProxyContractAddress, votingAccount } = useAccount();

  const { latestOwnerConnected, originalOwnerAddress } = useLinkedDelegateInfo();
  const { data: addressInfo, error: errorLoadingAddressInfo } = useAddressInfo(votingAccount, network);
  const { data: originalOwnerContractAddress } = useVoteDelegateAddress(
    originalOwnerAddress as `0x${string}` | undefined
  );
  const { data: chiefBalance } = useLockedMkr(voteProxyContractAddress || account);

  return (
    <PrimaryLayout sx={{ maxWidth: [null, null, null, 'page', 'dashboard'] }}>
      <HeadComponent title="Account" />

      <SidebarLayout>
        <Box sx={{ mb: 6 }}>
          <Box sx={{ my: 3 }}>
            <Heading as="h3" variant="microHeading">
              Account Information
            </Heading>
          </Box>
          <Box>
            {addressInfo && (
              <Box>
                {addressInfo.delegateInfo && (
                  <Box>
                    <DelegateDetail delegate={addressInfo.delegateInfo} />
                  </Box>
                )}
                {!addressInfo.delegateInfo && <AddressDetail addressInfo={addressInfo} />}
              </Box>
            )}
            {account && !addressInfo && !errorLoadingAddressInfo && (
              <Box sx={{ my: 3 }}>
                <SkeletonThemed height={100} width="100%" />
              </Box>
            )}
            {errorLoadingAddressInfo && <Text>Error loading address information</Text>}
          </Box>
          {!account ? (
            <Box>
              <ClientRenderOnly>
                <AccountSelect />
              </ClientRenderOnly>
            </Box>
          ) : (
            voteDelegateContractAddress && (
              <Box sx={{ mt: 4 }}>
                <Box sx={{ my: 3 }}>
                  <Heading as="h3" variant="microHeading">
                    Vote Delegation
                  </Heading>
                </Box>
                <Card>
                  {voteDelegateContractAddress && (
                    <Box sx={{ mb: 2 }}>
                      <Label>Your delegate contract address:</Label>

                      <EtherscanLink
                        type="address"
                        showAddress
                        hash={voteDelegateContractAddress}
                        network={network}
                      />
                    </Box>
                  )}
                  {latestOwnerConnected && originalOwnerContractAddress && (
                    <Box sx={{ mb: 2 }}>
                      <Label>Original delegate contract address:</Label>

                      <EtherscanLink
                        type="address"
                        showAddress
                        hash={originalOwnerContractAddress}
                        network={network}
                      />
                    </Box>
                  )}
                  {voteDelegateContractAddress && (
                    <Box sx={{ mb: 2 }}>
                      <Label>FAQ</Label>
                      <ExternalLink
                        title="How can I verify my delegate contract?"
                        href={
                          'https://dux.makerdao.network/Verifying-a-delegate-contract-on-Etherscan-df677c604ac94911ae071fedc6a98ed2'
                        }
                      >
                        <Text as="p" sx={{ display: 'flex', alignItems: 'center' }}>
                          How can I verify my delegate contract?{' '}
                          <Icon name="arrowTopRight" sx={{ size: 2, ml: 2 }} />
                        </Text>
                      </ExternalLink>
                    </Box>
                  )}
                  {chiefBalance && chiefBalance > 0n && (
                    <Flex sx={{ alignItems: 'flex-start', flexDirection: 'column', mt: 5 }}>
                      <Text as="p">
                        You have a DSChief balance of{' '}
                        <Text sx={{ fontWeight: 'bold' }}>{formatValue(chiefBalance, 'wad', 6)} MKR.</Text>
                        <Text as="p" sx={{ my: 2 }}>
                          {voteDelegateContractAddress
                            ? 'As a delegate you can only vote with your delegate contract through the portal. You can withdraw your MKR and delegate it to yourself to vote with it.'
                            : 'If you become a delegate, you will only be able to vote through the portal as a delegate. In this case, it is recommended to withdraw your MKR and delegate it to yourself or create the delegate contract from a different account.'}
                        </Text>
                      </Text>
                      <Withdraw sx={{ mt: 3 }} />
                    </Flex>
                  )}
                </Card>
              </Box>
            )
          )}
        </Box>
        <Stack gap={3}>
          {addressInfo && addressInfo.delegateInfo && (
            <Box>
              <ErrorBoundary componentName="Delegate MKR">
                <ManageDelegation
                  delegate={addressInfo.delegateInfo}
                  textDelegate="Delegate MKR to myself"
                  textUndelegate="Undelegate MKR from my contract"
                />
              </ErrorBoundary>
            </Box>
          )}
          <ErrorBoundary componentName="System Info">
            <SystemStatsSidebar
              fields={[
                'polling contract v2',
                'polling contract v1',
                'arbitrum polling contract',
                'savings rate',
                'total dai',
                'debt ceiling',
                'system surplus'
              ]}
            />
          </ErrorBoundary>
          <ResourceBox type={'general'} />
        </Stack>
      </SidebarLayout>
    </PrimaryLayout>
  );
};

export default AccountPage;
