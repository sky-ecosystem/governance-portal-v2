/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { Heading, Box, Flex, Button } from 'theme-ui';
import { useBreakpointIndex } from '@theme-ui/match-media';
import ErrorPage from 'modules/app/components/ErrorPage';
import Icon from 'modules/app/components/Icon';
import { fetchJson } from 'lib/fetchJson';
import PrimaryLayout from 'modules/app/components/layout/layouts/Primary';
import SidebarLayout from 'modules/app/components/layout/layouts/Sidebar';
import Stack from 'modules/app/components/layout/layouts/Stack';
import SystemStatsSidebar from 'modules/app/components/SystemStatsSidebar';
import ResourceBox from 'modules/app/components/ResourceBox';
import PageLoadingPlaceholder from 'modules/app/components/PageLoadingPlaceholder';
import { useRouter } from 'next/router';
import { AddressApiResponse } from 'modules/address/types/addressApiResponse';
import { AddressDetail } from 'modules/address/components/AddressDetail';
import { DelegateDetail, DelegatesSystemInfo } from 'modules/delegates/components';
import { HeadComponent } from 'modules/app/components/layout/Head';
import ManageDelegation from 'modules/delegates/components/ManageDelegation';
import useSWR, { useSWRConfig } from 'swr';
import { ErrorBoundary } from 'modules/app/components/ErrorBoundary';
import { InternalLink } from 'modules/app/components/InternalLink';
import { DelegatesAPIStats, DelegatesPaginatedAPIResponse } from 'modules/delegates/types';
import { useNetwork } from 'modules/app/hooks/useNetwork';

const AddressView = ({
  addressInfo,
  delegationStats
}: {
  addressInfo: AddressApiResponse;
  delegationStats: DelegatesAPIStats | undefined;
}) => {
  const bpi = useBreakpointIndex({ defaultIndex: 2 });

  return (
    <PrimaryLayout sx={{ maxWidth: [null, null, null, 'page', 'dashboard'] }}>
      <HeadComponent
        title={`${
          addressInfo.isDelegate ? `${addressInfo.delegateInfo?.name} Delegate` : 'Address'
        } Information`}
        description={`See all the voting activity of ${
          addressInfo.delegateInfo?.name || addressInfo.address
        } in Maker Governance. `}
        image={addressInfo.delegateInfo?.picture}
      />

      <SidebarLayout>
        <Stack gap={2}>
          {addressInfo.isDelegate && (
            <Flex sx={{ alignItems: 'center' }}>
              <Heading variant="microHeading" mr={3}>
                <InternalLink scroll={false} href={'/delegates'} title="View delegates page">
                  <Button variant="mutedOutline">
                    <Flex sx={{ alignItems: 'center', whiteSpace: 'nowrap' }}>
                      <Icon name="chevron_left" sx={{ size: 2, mr: 2 }} />
                      {bpi > 0 ? 'Back to all delegates' : 'Back'}
                    </Flex>
                  </Button>
                </InternalLink>
              </Heading>
            </Flex>
          )}
          <Box>
            {addressInfo.delegateInfo && (
              <ErrorBoundary componentName="Delegate Information">
                <DelegateDetail delegate={addressInfo.delegateInfo} />
              </ErrorBoundary>
            )}
            {!addressInfo.delegateInfo && (
              <ErrorBoundary componentName="Address Information">
                <AddressDetail addressInfo={addressInfo} />
              </ErrorBoundary>
            )}
          </Box>
        </Stack>
        <Stack gap={3}>
          {addressInfo.isDelegate && addressInfo.delegateInfo && (
            <ErrorBoundary componentName="Delegate MKR">
              <ManageDelegation delegate={addressInfo.delegateInfo} />
            </ErrorBoundary>
          )}
          {addressInfo.isDelegate && delegationStats ? (
            <ErrorBoundary componentName="Delegates System Info">
              <DelegatesSystemInfo stats={delegationStats} />
            </ErrorBoundary>
          ) : (
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
          )}
          <ResourceBox type={'general'} />
        </Stack>
      </SidebarLayout>
    </PrimaryLayout>
  );
};

export default function AddressPage(): JSX.Element {
  const router = useRouter();
  const { address } = router.query;
  const network = useNetwork();
  const { cache } = useSWRConfig();

  const dataKeyAccount = `/api/address/${address}?network=${network}`;
  const { data, error } = useSWR<AddressApiResponse>(address ? dataKeyAccount : null, fetchJson, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnMount: !cache.get(dataKeyAccount),
    revalidateOnReconnect: false
  });

  const dataKeyDelegationInfo = `/api/delegates/v2?network=${network}`;
  const { data: delegationData } = useSWR<DelegatesPaginatedAPIResponse>(
    data?.isDelegate ? dataKeyDelegationInfo : null,
    fetchJson,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnMount: !cache.get(dataKeyDelegationInfo),
      revalidateOnReconnect: false
    }
  );

  if (error && error.status === 404) {
    return (
      <PrimaryLayout>
        <ErrorPage statusCode={404} title="This address does not exist" />
      </PrimaryLayout>
    );
  } else if (error) {
    return (
      <PrimaryLayout>
        <ErrorPage statusCode={error.status} title="Error fetching address information" />
      </PrimaryLayout>
    );
  }

  if (!data || (data.isDelegate && !delegationData)) {
    return <PageLoadingPlaceholder />;
  }

  return (
    <ErrorBoundary componentName="Address Page">
      <AddressView addressInfo={data} delegationStats={delegationData?.stats} />
    </ErrorBoundary>
  );
}
