/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { useMemo, useState } from 'react';
import { Box, Text, Flex, IconButton, Heading } from 'theme-ui';
import { useBreakpointIndex } from '@theme-ui/match-media';
import Icon from 'modules/app/components/Icon';
import { InternalLink } from 'modules/app/components/InternalLink';
import Skeleton from 'modules/app/components/SkeletonThemed';
import Tooltip from 'modules/app/components/Tooltip';
import { DelegationHistory } from 'modules/delegates/types';
import { formatDateWithTime } from 'lib/datetime';
import { SupportedNetworks } from 'modules/web3/constants/networks';
import { formatValue } from 'lib/string';
import { parseEther } from 'viem';
import AddressIconBox from 'modules/address/components/AddressIconBox';
import EtherscanLink from 'modules/web3/components/EtherscanLink';
import { useNetwork } from 'modules/app/hooks/useNetwork';
import { calculatePercentage } from 'lib/utils';

type DelegatedByAddressProps = {
  delegators: DelegationHistory[];
  totalDelegated: bigint;
};

type CollapsableRowProps = {
  delegator: DelegationHistory;
  network: SupportedNetworks;
  bpi: number;
  totalDelegated: bigint;
};

const formatTotalDelegated = (num: bigint, denom: bigint): string => {
  try {
    return calculatePercentage(num, denom, 2).toString();
  } catch (e) {
    return '0';
  }
};

const CollapsableRow = ({ delegator, network, bpi, totalDelegated }: CollapsableRowProps) => {
  const [expanded, setExpanded] = useState(false);
  const { address, lockAmount, events } = delegator;
  const sortedEvents = events.sort((prev, next) => (prev.blockTimestamp > next.blockTimestamp ? -1 : 1));
  return (
    <tr>
      <Flex as="td" sx={{ flexDirection: 'column', mb: [0, 3], pt: ['10px', 0], mr: 2 }}>
        <Heading variant="microHeading">
          <InternalLink
            href={`/address/${address}`}
            title="View address detail"
            styles={{ fontSize: [1, 3] }}
          >
            <AddressIconBox address={address} width={bpi < 1 ? 22 : 41} />
          </InternalLink>
        </Heading>
        {expanded && (
          <Flex sx={{ pl: 3, flexDirection: 'column' }}>
            {sortedEvents.map(({ blockTimestamp }) => {
              return (
                <Text
                  key={blockTimestamp}
                  variant="smallCaps"
                  sx={{
                    ':first-of-type': { pt: 2 },
                    ':not(:last-of-type)': { pb: 2 }
                  }}
                >
                  {formatDateWithTime(blockTimestamp)}
                </Text>
              );
            })}
          </Flex>
        )}
      </Flex>
      <Box as="td" sx={{ verticalAlign: 'top', pt: 2 }}>
        <Text sx={{ fontSize: [1, 3] }}>
          {parseEther(lockAmount) > 0 && parseEther(lockAmount) < 1
            ? `${formatValue(parseEther(lockAmount), 'wad')}${bpi > 0 ? ' MKR' : ''}`
            : `${formatValue(parseEther(lockAmount), 'wad', 3)}${bpi > 0 ? ' MKR' : ''}`}
        </Text>
        {expanded && (
          <Flex sx={{ flexDirection: 'column' }}>
            {sortedEvents.map(({ blockTimestamp, lockAmount, isLockstake }) => {
              return (
                <Flex
                  key={blockTimestamp}
                  sx={{
                    alignItems: 'center',
                    ':first-of-type': { pt: 3 },
                    ':not(:last-of-type)': { pb: 2 }
                  }}
                >
                  {lockAmount.indexOf('-') === 0 ? (
                    <Icon name="decrease" size={2} color="bear" />
                  ) : (
                    <Icon name="increase" size={2} color="bull" />
                  )}
                  <Text key={blockTimestamp} variant="smallCaps" sx={{ pl: 2 }}>
                    {`${formatValue(
                      parseEther(lockAmount.indexOf('-') === 0 ? lockAmount.substring(1) : lockAmount),
                      'wad'
                    )}${bpi > 0 ? ' MKR' : ''}`}
                  </Text>
                  <Text key={blockTimestamp} variant="smallCaps" sx={{ pl: 2 }}>
                    {isLockstake ? '(Seal)' : ''}
                  </Text>
                </Flex>
              );
            })}
          </Flex>
        )}
      </Box>
      <Box as="td" sx={{ verticalAlign: 'top', pt: 2 }}>
        {totalDelegated ? (
          <Text sx={{ fontSize: [1, 3] }}>{`${formatTotalDelegated(
            parseEther(lockAmount),
            totalDelegated
          )}%`}</Text>
        ) : (
          <Box sx={{ width: '100%' }}>
            <Skeleton />
          </Box>
        )}
      </Box>
      <Box as="td" sx={{ textAlign: 'end', verticalAlign: 'top', width: '100%', pt: 2 }}>
        <Box sx={{ height: '32px' }}>
          <Flex
            sx={{
              bg: 'background',
              size: 'auto',
              width: '17px',
              height: '17px',
              float: 'right',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 'round'
            }}
          >
            <IconButton aria-label="Delegate history expand" onClick={() => setExpanded(!expanded)}>
              <Icon name={expanded ? 'minus' : 'plus'} />
            </IconButton>
          </Flex>
        </Box>
        {expanded && (
          <Flex sx={{ flexDirection: 'column' }}>
            {sortedEvents.map(({ blockTimestamp, hash }) => {
              return (
                <Flex
                  key={blockTimestamp}
                  sx={{
                    justifyContent: 'flex-end',
                    lineHeight: '20px',
                    fontSize: 1,
                    ':not(:last-of-type)': { pb: 2 }
                  }}
                >
                  <EtherscanLink type="transaction" network={network} hash={hash as string} prefix="" />
                </Flex>
              );
            })}
          </Flex>
        )}
      </Box>
    </tr>
  );
};

const DelegatedByAddress = ({ delegators, totalDelegated }: DelegatedByAddressProps): JSX.Element => {
  const bpi = useBreakpointIndex();
  const network = useNetwork();

  const [sortBy, setSortBy] = useState({
    type: 'mkr',
    order: 1
  });

  const changeSort = type => {
    if (sortBy.type === type) {
      setSortBy({
        type,
        order: sortBy.order === 1 ? -1 : 1
      });
    } else {
      setSortBy({
        type,
        order: 1
      });
    }
  };

  const sortedDelegators = useMemo(() => {
    switch (sortBy.type) {
      case 'mkr':
        return delegators?.sort((a, b) => {
          const aMKR = parseEther(a.lockAmount);
          const bMKR = parseEther(b.lockAmount);
          return sortBy.order === 1 ? (aMKR > bMKR ? -1 : 1) : aMKR > bMKR ? 1 : -1;
        });
      case 'address':
        return delegators?.sort((a, b) =>
          sortBy.order === 1 ? (a.address > b.address ? -1 : 1) : a.address > b.address ? 1 : -1
        );

      default:
        return delegators;
    }
  }, [delegators, sortBy.type, sortBy.order]);

  return (
    <Box>
      <Box mb={3}>
        <Text
          as="p"
          variant="h2"
          sx={{
            fontSize: 4,
            fontWeight: 'semiBold'
          }}
        >
          Delegators
        </Text>
        <Text as="p" variant="secondary" color="onSurface">
          Addresses that have delegated MKR to this delegate
        </Text>
      </Box>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse'
        }}
      >
        <thead>
          <tr>
            <Text
              as="th"
              sx={{ cursor: 'pointer', textAlign: 'left', pb: 2, width: '30%' }}
              variant="caps"
              onClick={() => changeSort('address')}
            >
              Address
              {sortBy.type === 'address' ? (
                sortBy.order === 1 ? (
                  <Icon name="chevron_down" size={2} sx={{ ml: 1 }} />
                ) : (
                  <Icon name="chevron_up" size={2} sx={{ ml: 1 }} />
                )
              ) : (
                ''
              )}
            </Text>
            <Text
              as="th"
              sx={{ cursor: 'pointer', textAlign: 'left', pb: 2, width: '30%' }}
              variant="caps"
              onClick={() => changeSort('mkr')}
            >
              {bpi < 1 ? 'MKR' : 'MKR Delegated'}
              {sortBy.type === 'mkr' ? (
                sortBy.order === 1 ? (
                  <Icon name="chevron_down" size={2} sx={{ ml: 1 }} />
                ) : (
                  <Icon name="chevron_up" size={2} sx={{ ml: 1 }} />
                )
              ) : (
                ''
              )}
            </Text>
            <Tooltip label={'This is the percentage of the total MKR delegated to this delegate.'}>
              <Text
                as="th"
                sx={{ cursor: 'pointer', textAlign: 'left', pb: 2, width: '20%' }}
                variant="caps"
                onClick={() => changeSort('mkr')}
              >
                {bpi < 1 ? '%' : 'Voting Weight'}
                {sortBy.type === 'mkr' ? (
                  sortBy.order === 1 ? (
                    <Icon name="chevron_down" size={2} sx={{ ml: 1 }} />
                  ) : (
                    <Icon name="chevron_up" size={2} sx={{ ml: 1 }} />
                  )
                ) : (
                  ''
                )}
              </Text>
            </Tooltip>
            <Text as="th" sx={{ textAlign: 'right', pb: 2, width: '20%' }} variant="caps">
              Expand
            </Text>
          </tr>
        </thead>
        <tbody>
          {sortedDelegators ? (
            sortedDelegators.map(delegator => (
              <CollapsableRow
                key={delegator.address}
                delegator={delegator}
                network={network}
                bpi={bpi}
                totalDelegated={totalDelegated}
              />
            ))
          ) : (
            <tr key={0}>
              <td colSpan={3}>
                <Text color="text" variant="allcaps">
                  Loading
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Box>
  );
};

export default DelegatedByAddress;
