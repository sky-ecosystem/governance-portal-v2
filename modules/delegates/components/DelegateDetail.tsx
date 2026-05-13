/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import React, { useState } from 'react';
import { Alert, Box, Text, Flex, Divider } from 'theme-ui';
import Icon from 'modules/app/components/Icon';
import Tabs from 'modules/app/components/Tabs';
import {
  DelegatePicture,
  DelegateCredentials,
  DelegateVoteHistory,
  DelegateParticipationMetrics
} from 'modules/delegates/components';
import { Delegate } from 'modules/delegates/types';
import { DelegateStatusEnum } from 'modules/delegates/delegates.constants';
import { DelegateMKRDelegatedStats } from './DelegateMKRDelegatedStats';
import useSWR, { useSWRConfig } from 'swr';
import { fetchJson } from 'lib/fetchJson';
import { PollingParticipationOverview } from 'modules/polling/components/PollingParticipationOverview';
import { AddressAPIStats } from 'modules/address/types/addressApiResponse';
import LastVoted from 'modules/polling/components/LastVoted';
import { useLockedMkr } from 'modules/mkr/hooks/useLockedMkr';
import DelegatedByAddress from 'modules/delegates/components/DelegatedByAddress';
import { useAccount } from 'modules/app/hooks/useAccount';
import { Address } from 'modules/address/components/Address';
import { formatDelegationHistory } from '../helpers/formatDelegationHistory';
import { CoreUnitModal } from './modals/CoreUnitModal';
import { CoreUnitButton } from './modals/CoreUnitButton';
import { InternalLink } from 'modules/app/components/InternalLink';
import DelegateContractInfo from 'modules/migration/components/DelegateContractInfo';
import EtherscanLink from 'modules/web3/components/EtherscanLink';
import { useNetwork } from 'modules/app/hooks/useNetwork';
import { parseEther } from 'viem';

type PropTypes = {
  delegate: Delegate;
};

export function DelegateDetail({ delegate }: PropTypes): React.ReactElement {
  const { voteDelegateAddress } = delegate;
  const network = useNetwork();
  const { cache } = useSWRConfig();
  const [showCoreUnitModal, setShowCoreUnitModal] = useState(false);

  const handleInfoClick = () => {
    setShowCoreUnitModal(!showCoreUnitModal);
  };

  const dataKeyDelegateStats = `/api/address/stats?address=${
    delegate.voteDelegateAddress
  }&network=${network}${delegate.previous ? `&address=${delegate.previous.voteDelegateAddress}` : ''}`;
  const { data: statsData } = useSWR<AddressAPIStats>(delegate ? dataKeyDelegateStats : null, fetchJson, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnMount: !cache.get(dataKeyDelegateStats),
    revalidateOnReconnect: false
  });

  const { data: totalStaked } = useLockedMkr(delegate.voteDelegateAddress);
  const { voteDelegateContractAddress } = useAccount();
  const delegationHistory = formatDelegationHistory(delegate.mkrLockedDelegate);

  const activeDelegators = delegationHistory.filter(({ lockAmount }) => parseEther(lockAmount) > 0n);
  const delegatorCount = activeDelegators.length;
  const isOwner = delegate.voteDelegateAddress.toLowerCase() === voteDelegateContractAddress?.toLowerCase();

  const tabTitles = [
    delegate.status === DelegateStatusEnum.aligned ? 'Delegate Credentials' : null,
    'Metrics',
    'Voting History'
  ].filter(i => !!i) as string[];

  const tabPanels = [
    delegate.status === DelegateStatusEnum.aligned ? (
      <Box key="delegate-credentials">
        <DelegateCredentials delegate={delegate} />
      </Box>
    ) : null,
    <Box key="delegate-participation-metrics">
      {delegate.status === DelegateStatusEnum.aligned && <DelegateParticipationMetrics delegate={delegate} />}
      {delegate.status === DelegateStatusEnum.aligned && <Divider />}
      {delegationHistory.length > 0 && totalStaked ? (
        <>
          <Box sx={{ pl: [3, 4], pr: [3, 4], py: [3, 4] }}>
            <DelegatedByAddress delegators={delegationHistory} totalDelegated={totalStaked} />
          </Box>
          <Divider />
        </>
      ) : (
        <Box p={[3, 4]} mt={1}>
          <Text>No metrics data found</Text>
        </Box>
      )}
      {statsData && <PollingParticipationOverview votes={statsData.pollVoteHistory} />}
    </Box>,
    <Box key="delegate-vote-history">
      <DelegateVoteHistory delegate={delegate} dataKeyDelegateStats={dataKeyDelegateStats} />
    </Box>
  ].filter(i => !!i);

  return (
    <Box sx={{ variant: 'cards.primary', p: [0, 0] }}>
      <Box sx={{ pl: [3, 4], pr: [3, 4], pt: [3, 4], pb: 2 }}>
        {delegate?.next?.voteDelegateAddress && (
          <InternalLink href={`/address/${delegate?.next?.voteDelegateAddress}`} title="View migration page">
            <Flex sx={{ mb: 4 }}>
              <Alert
                variant="warning"
                sx={{
                  fontWeight: 'normal'
                }}
              >
                You are viewing an older contract. View delegate&apos;s renewed contract
                <Icon name="chevron_right" size={2} sx={{ ml: 2 }} />
              </Alert>
            </Flex>
          </InternalLink>
        )}
        <Flex
          sx={{
            justifyContent: 'space-between',
            flexDirection: ['column', 'row']
          }}
        >
          <Box>
            <Flex sx={{ mb: 1 }}>
              <DelegatePicture delegate={delegate} key={delegate.id} width={52} />
              <Box sx={{ width: '100%' }}>
                <Box sx={{ ml: 3 }}>
                  <Flex sx={{ alignItems: 'center' }}>
                    <Text as="p" variant="microHeading" sx={{ fontSize: [3, 5] }}>
                      {delegate.name !== '' ? delegate.name : 'Shadow Delegate'}
                    </Text>
                    {isOwner && (
                      <Flex
                        sx={{
                          display: 'inline-flex',
                          backgroundColor: 'tagColorSevenBg',
                          borderRadius: 'roundish',
                          padding: '3px 6px',
                          alignItems: 'center',
                          color: 'tagColorSeven',
                          ml: 2
                        }}
                      >
                        <Text sx={{ fontSize: 1 }}>Owner</Text>
                      </Flex>
                    )}
                  </Flex>

                  <Box sx={{ fontSize: [1, 3], mt: [1, 0], fontWeight: 'semiBold' }}>
                    <EtherscanLink
                      showBlockExplorerName={false}
                      type="address"
                      prefix="Delegate contract"
                      hash={voteDelegateAddress}
                      network={network}
                    />
                  </Box>

                  <InternalLink href={`/address/${delegate.address}`} title="View address">
                    <Text as="p" variant="secondary" sx={{ fontSize: [1, 2], mt: [1, 0] }}>
                      Deployed by: <Address address={delegate.address} />
                    </Text>
                  </InternalLink>
                </Box>
              </Box>
            </Flex>
          </Box>
          <Flex sx={{ mt: [2, 0], flexDirection: 'column', alignItems: ['flex-start', 'flex-end'] }}>
            {delegate.cuMember && <CoreUnitButton handleInfoClick={handleInfoClick} />}
            <LastVoted
              expired={delegate.expired}
              date={statsData ? (statsData.lastVote ? statsData.lastVote.blockTimestamp : null) : undefined}
              styles={{ my: 1 }}
            />
            <DelegateContractInfo delegate={delegate} />
          </Flex>
        </Flex>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <DelegateMKRDelegatedStats delegate={delegate} delegatorCount={delegatorCount} />
        </Box>
      </Box>

      <Tabs tabListStyles={{ pl: [3, 4] }} tabTitles={tabTitles} tabPanels={tabPanels}></Tabs>
      {showCoreUnitModal && (
        <CoreUnitModal isOpen={showCoreUnitModal} onDismiss={() => setShowCoreUnitModal(false)} />
      )}
    </Box>
  );
}
