/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { Box, Text, Flex, IconButton, Heading } from 'theme-ui';
import { useBreakpointIndex } from '@theme-ui/match-media';
import Icon from 'modules/app/components/Icon';
import Skeleton from 'modules/app/components/SkeletonThemed';
import { DelegationHistoryWithExpirationDate } from 'modules/delegates/types';
import { useState } from 'react';
import { InternalLink } from 'modules/app/components/InternalLink';
import { formatDateWithTime } from 'lib/datetime';
import Tooltip from 'modules/app/components/Tooltip';
import { SupportedNetworks } from 'modules/web3/constants/networks';
import AddressIconBox from './AddressIconBox';
import { parseEther } from 'viem';
import { formatValue } from 'lib/string';
import { DateWithHover } from 'modules/app/components/DateWithHover';
import EtherscanLink from 'modules/web3/components/EtherscanLink';
import { useNetwork } from 'modules/app/hooks/useNetwork';
import { calculatePercentage } from 'lib/utils';

type CollapsableRowProps = {
  delegate: DelegationHistoryWithExpirationDate;
  network: SupportedNetworks;
  bpi: number;
  totalDelegated: number;
};

const CollapsableRow = ({ delegate, network, bpi, totalDelegated }: CollapsableRowProps) => {
  const [expanded, setExpanded] = useState(false);

  const { address, lockAmount, events } = delegate;
  const sortedEvents = events.sort((prev, next) => (prev.blockTimestamp > next.blockTimestamp ? -1 : 1));

  const formattedDate = delegate.expirationDate ? formatDateWithTime(delegate.expirationDate) : '';
  const dateText = delegate.isExpired
    ? `This contract expired ${formattedDate}`
    : `This contract will expire ${formattedDate}`;

  return (
    <Box
      as="tr"
      sx={{
        color: delegate.isExpired ? 'warning' : delegate.isAboutToExpire ? 'voterYellow' : 'onSecondary'
      }}
    >
      <Flex as="td" sx={{ flexDirection: 'column', mb: 3 }}>
        <Heading variant="microHeading">
          <InternalLink
            href={`/address/${address}`}
            title="View address detail"
            styles={{ fontSize: bpi < 1 ? 1 : 3 }}
          >
            <AddressIconBox address={address} width={41} limitTextLength={15} />
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
        <Text sx={{ fontSize: bpi < 1 ? 1 : 3 }}>
          {`${formatValue(BigInt(lockAmount), undefined, undefined, true)}${bpi > 0 ? ' MKR' : ''}`}
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
                      BigInt(lockAmount.indexOf('-') === 0 ? lockAmount.substring(1) : lockAmount)
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
        <Flex sx={{ alignSelf: 'flex-start' }}>
          {typeof totalDelegated !== 'undefined' ? (
            <Text>{`${
              totalDelegated === 0
                ? '0'
                : calculatePercentage(
                    BigInt(lockAmount),
                    parseEther(totalDelegated.toString()),
                    1
                  ).toLocaleString()
            }%`}</Text>
          ) : (
            <Box sx={{ width: '100%' }}>
              <Skeleton />
            </Box>
          )}
        </Flex>
      </Box>
      <Box as="td" sx={{ verticalAlign: 'top', pt: 2, display: bpi > 1 ? 'table-cell' : 'none' }}>
        <Text variant="caps" sx={{ color: 'inherit' }}>
          <DateWithHover label={dateText} date={delegate.expirationDate} />
        </Text>
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
            <IconButton aria-label="Delegated to expand" onClick={() => setExpanded(!expanded)}>
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
                    ':not(:last-of-type)': { pb: 2 }
                  }}
                >
                  <EtherscanLink
                    showBlockExplorerName={false}
                    prefix=""
                    type="transaction"
                    network={network}
                    hash={hash as string}
                  />
                </Flex>
              );
            })}
          </Flex>
        )}
      </Box>
    </Box>
  );
};

type AddressDelegatedToProps = {
  delegatedTo: DelegationHistoryWithExpirationDate[];
  totalDelegated: number;
};

const AddressDelegatedTo = ({ delegatedTo, totalDelegated }: AddressDelegatedToProps): JSX.Element => {
  const bpi = useBreakpointIndex();
  const network = useNetwork();

  return (
    <Box>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse'
        }}
      >
        <thead>
          <tr>
            <Text as="th" sx={{ textAlign: 'left', pb: 2, width: ['40%', '30%'] }} variant="caps">
              Address
            </Text>
            <Text as="th" sx={{ textAlign: 'left', pb: 2, width: bpi > 1 ? '20%' : '25%' }} variant="caps">
              MKR Delegated
            </Text>
            <Text as="th" sx={{ textAlign: 'left', pb: 2, width: bpi > 1 ? '20%' : '25%' }} variant="caps">
              <Tooltip label={'This is the percentage of the total MKR delegated by this address.'}>
                <Flex>
                  <span>Voting Weight</span>
                  <Icon name="question" sx={{ ml: 1 }} />
                </Flex>
              </Tooltip>
            </Text>
            <Text
              as="th"
              sx={{ textAlign: 'left', pb: 2, width: '20%', display: bpi > 1 ? 'table-cell' : 'none' }}
              variant="caps"
            >
              Expiry Date
            </Text>
            <Text as="th" sx={{ textAlign: 'right', pb: 2, width: '10%' }} variant="caps">
              Expand
            </Text>
          </tr>
        </thead>
        <tbody>
          {delegatedTo ? (
            delegatedTo.map((delegate, i) => (
              <CollapsableRow
                key={i}
                delegate={delegate}
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

export default AddressDelegatedTo;
