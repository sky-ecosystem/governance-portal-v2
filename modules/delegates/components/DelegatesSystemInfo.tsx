/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import StackLayout from 'modules/app/components/layout/layouts/Stack';
import SkeletonThemed from 'modules/app/components/SkeletonThemed';
import { Box, Card, Flex, Heading, Text } from 'theme-ui';
import { DelegatesAPIStats } from '../types';
import { useTotalSupply } from 'modules/web3/hooks/useTotalSupply';
import { Tokens } from 'modules/web3/constants/tokens';
import EtherscanLink from 'modules/web3/components/EtherscanLink';
import { useNetwork } from 'modules/app/hooks/useNetwork';
import {
  voteDelegateFactoryAddress as voteDelegateFactoryAddressMapping,
  voteDelegateFactoryOldAddress as voteDelegateFactoryOldAddressMapping
} from 'modules/contracts/generated';
import { useChainId } from 'wagmi';
import { calculatePercentage } from 'lib/utils';
import { parseEther } from 'viem';

export function DelegatesSystemInfo({ stats }: { stats: DelegatesAPIStats }): React.ReactElement {
  const chainId = useChainId();
  const delegateFactoryAddress = voteDelegateFactoryAddressMapping[chainId];
  const oldDelegateFactoryAddress = voteDelegateFactoryOldAddressMapping[chainId];
  const network = useNetwork();

  const { data: totalMkr } = useTotalSupply(Tokens.MKR);

  const statsItems = [
    {
      title: 'Total delegates',
      id: 'total-delegates-system-info',
      value: stats.total
    },
    {
      title: 'Aligned delegates',
      id: 'total-aligned-delegates-system-info',
      value: stats.aligned
    },
    {
      title: 'Shadow delegates',
      id: 'total-shadow-delegates-system-info',
      value: stats.shadow
    },
    {
      title: 'Total MKR delegated',
      id: 'total-mkr-system-info',
      value: Math.round(Number(stats.totalMKRDelegated)).toLocaleString()
    },
    {
      title: 'Percent of MKR delegated',
      id: 'percent-mkr-system-info',
      value: totalMkr ? (
        `${calculatePercentage(parseEther(stats.totalMKRDelegated.toString()), totalMkr, 2)}%`
      ) : (
        <SkeletonThemed width={'100px'} height={'15px'} />
      )
    },
    {
      title: 'Total delegators',
      id: 'total-delegators-system-info',
      value: stats.totalDelegators
    }
  ];

  return (
    <Box sx={{ mt: 3 }}>
      <Heading mt={3} mb={2} as="h3" variant="microHeading">
        Legacy System Info
      </Heading>
      <Card variant="compact">
        <StackLayout gap={3}>
          <Flex sx={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <Text sx={{ fontSize: 3, color: 'textSecondary' }}>V2 delegate factory</Text>
            {delegateFactoryAddress ? (
              <EtherscanLink type="address" showAddress hash={delegateFactoryAddress} network={network} />
            ) : (
              <Box sx={{ width: 6 }}>
                <SkeletonThemed />
              </Box>
            )}
          </Flex>
          <Flex sx={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <Text sx={{ fontSize: 3, color: 'textSecondary' }}>V1 delegate factory</Text>
            {oldDelegateFactoryAddress ? (
              <EtherscanLink type="address" showAddress hash={oldDelegateFactoryAddress} network={network} />
            ) : (
              <Box sx={{ width: 6 }}>
                <SkeletonThemed />
              </Box>
            )}
          </Flex>
          {statsItems.map(item => (
            <Flex key={item.id} sx={{ justifyContent: 'space-between', flexDirection: 'row' }}>
              <Text sx={{ fontSize: 3, color: 'textSecondary' }}>{item.title}</Text>
              <Text variant="h2" sx={{ fontSize: 3 }} data-testid={item.id}>
                {item.value}
              </Text>
            </Flex>
          ))}
        </StackLayout>
      </Card>
    </Box>
  );
}
