/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { useState, useMemo } from 'react';
import { Box, Flex, Text, Button, Spinner } from 'theme-ui';
import { SkyExecutiveDetailResponse, SkyExecutiveSupporter } from 'modules/executive/types';
import { InternalLink } from 'modules/app/components/InternalLink';
import AddressIconBox from 'modules/address/components/AddressIconBox';
import { formatValue } from 'lib/string';
import { parseEther } from 'viem';
import Icon from 'modules/app/components/Icon';

const INITIAL_SUPPORTERS_COUNT = 10;

type SkyExecutiveSupportersBreakdownProps = {
  executive: SkyExecutiveDetailResponse;
  showAll: boolean;
  onShowAll: () => void;
};

const SkyExecutiveSupportersBreakdown = ({ 
  executive, 
  showAll, 
  onShowAll 
}: SkyExecutiveSupportersBreakdownProps): JSX.Element => {
  const [sortBy, setSortBy] = useState<'skySupport' | 'percentage'>('skySupport');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const supporters = executive.supporters || [];
  const loading = !supporters;
  const hasNoSupporters = supporters.length === 0;

  const sortedSupporters = useMemo(() => {
    if (!supporters) return [];
    
    const sorted = [...supporters].sort((a, b) => {
      let aValue: number;
      let bValue: number;
      
      if (sortBy === 'skySupport') {
        aValue = parseFloat(a.skySupport);
        bValue = parseFloat(b.skySupport);
      } else {
        aValue = a.percentage;
        bValue = b.percentage;
      }
      
      return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
    });
    
    return showAll ? sorted : sorted.slice(0, INITIAL_SUPPORTERS_COUNT);
  }, [supporters, sortBy, sortOrder, showAll]);

  const handleSort = (field: 'skySupport' | 'percentage') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const getSortIcon = (field: 'skySupport' | 'percentage') => {
    if (sortBy !== field) return 'chevron_down';
    return sortOrder === 'desc' ? 'chevron_down' : 'chevron_up';
  };

  if (loading) {
    return (
      <Box sx={{ p: [3, 4] }}>
        <Flex
          sx={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '200px'
          }}
        >
          <Spinner size={32} />
        </Flex>
      </Box>
    );
  }

  if (hasNoSupporters) {
    return (
      <Box sx={{ p: [3, 4] }}>
        <Text variant="microHeading" sx={{ mb: 3 }}>
          Supporters
        </Text>
        <Flex
          sx={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '200px'
          }}
        >
          <Text sx={{ color: 'textSecondary' }}>Currently there are no supporters</Text>
        </Flex>
      </Box>
    );
  }

  return (
    <Box sx={{ p: [3, 4] }}>
      <Text variant="microHeading" sx={{ mb: 3 }}>
        Supporters
      </Text>
      
      {/* Table Header */}
      <Flex
        sx={{
          borderBottom: '1px solid',
          borderColor: 'muted',
          pb: 2,
          mb: 2
        }}
      >
        <Text
          sx={{
            flex: 1,
            fontSize: 2,
            fontWeight: 'semiBold',
            color: 'textSecondary'
          }}
        >
          Address
        </Text>
        <Button
          variant="ghost"
          onClick={() => handleSort('skySupport')}
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 2,
            fontWeight: 'semiBold',
            color: 'textSecondary',
            minWidth: '120px',
            justifyContent: 'flex-end'
          }}
        >
          SKY Support
          <Icon name={getSortIcon('skySupport')} sx={{ ml: 1, size: 1 }} />
        </Button>
        <Button
          variant="ghost"
          onClick={() => handleSort('percentage')}
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 2,
            fontWeight: 'semiBold',
            color: 'textSecondary',
            minWidth: '100px',
            justifyContent: 'flex-end'
          }}
        >
          Percentage
          <Icon name={getSortIcon('percentage')} sx={{ ml: 1, size: 1 }} />
        </Button>
      </Flex>

      {/* Supporters List */}
      <Box>
        {sortedSupporters.map((supporter) => (
          <Flex
            key={supporter.address}
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
              py: 2,
              borderBottom: '1px solid',
              borderColor: 'muted',
              ':last-child': {
                borderBottom: 'none'
              }
            }}
          >
            <InternalLink
              href={`/address/${supporter.address}`}
              title="Profile details"
              styles={{ flex: 1, maxWidth: '50%' }}
            >
              <Text
                sx={{
                  color: 'accentBlue',
                  fontSize: 2,
                  ':hover': { color: 'accentBlueEmphasis' }
                }}
              >
                <AddressIconBox address={supporter.address} width={30} limitTextLength={70} />
              </Text>
            </InternalLink>
            
            <Text
              sx={{
                fontSize: 2,
                fontWeight: 'semiBold',
                minWidth: '120px',
                textAlign: 'right',
                mr: 3
              }}
            >
              {formatValue(parseEther(supporter.skySupport), undefined, undefined, true, true)} SKY
            </Text>
            
            <Text
              sx={{
                fontSize: 2,
                color: 'textSecondary',
                minWidth: '100px',
                textAlign: 'right'
              }}
            >
              {supporter.percentage > 0.01 ? supporter.percentage.toFixed(2) : '<0.01'}%
            </Text>
          </Flex>
        ))}
      </Box>

      {/* Show More Button */}
      {!showAll && supporters.length > INITIAL_SUPPORTERS_COUNT && (
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Button
            variant="outline"
            onClick={onShowAll}
            data-testid="button-show-more-sky-executive-supporters"
          >
            <Text color="text" variant="caps">
              Show all {supporters.length} supporters
            </Text>
          </Button>
        </Box>
      )}

      {/* Summary Stats */}
      <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid', borderColor: 'muted' }}>
        <Flex sx={{ justifyContent: 'space-between', mb: 2 }}>
          <Text sx={{ color: 'textSecondary' }}>Total SKY Support</Text>
          <Text sx={{ fontWeight: 'semiBold' }}>
            {executive.spellData?.skySupport ? 
              Math.floor(parseFloat(executive.spellData.skySupport)).toLocaleString() : 
              '0'
            } SKY
          </Text>
        </Flex>
        <Flex sx={{ justifyContent: 'space-between' }}>
          <Text sx={{ color: 'textSecondary' }}>Total Supporters</Text>
          <Text sx={{ fontWeight: 'semiBold' }}>{supporters.length}</Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default SkyExecutiveSupportersBreakdown;