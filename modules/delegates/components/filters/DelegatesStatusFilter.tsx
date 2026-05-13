/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { Flex, Checkbox, Label, Text, Box } from 'theme-ui';
import shallow from 'zustand/shallow';
import FilterButton from 'modules/app/components/FilterButton';
import { DelegatesAPIStats } from 'modules/delegates/types';
import useDelegatesFiltersStore from 'modules/delegates/stores/delegatesFiltersStore';

export function DelegatesStatusFilter({ stats }: { stats: DelegatesAPIStats }): JSX.Element {
  const [showAligned, showShadow, setShowAlignedFilter, setShowShadowFilter] = useDelegatesFiltersStore(
    state => [
      state.filters.showAligned,
      state.filters.showShadow,
      state.setShowAlignedFilter,
      state.setShowShadowFilter
    ],
    shallow
  );

  const itemsSelected = [showAligned, showShadow].filter(i => !!i).length;

  return (
    <FilterButton
      name={() => `Status ${itemsSelected > 0 ? `(${itemsSelected})` : ''}`}
      listVariant="cards.noPadding"
      data-testid="delegate-type-filter"
      active={itemsSelected > 0}
      sx={{
        mx: 2
      }}
    >
      <Box mx={2}>
        <Flex>
          <Label
            variant="thinLabel"
            sx={{ py: 1, fontSize: 2, alignItems: 'center' }}
            data-testid="delegate-type-filter-show-aligned"
          >
            <Checkbox
              sx={{ width: 3, height: 3 }}
              checked={showAligned}
              onChange={event => setShowAlignedFilter(event.target.checked)}
            />
            <Flex sx={{ justifyContent: 'space-between', width: '100%' }}>
              <Text>Aligned Delegates</Text>
              <Text sx={{ color: 'secondaryEmphasis', ml: 3 }}>{stats.aligned}</Text>
            </Flex>
          </Label>
        </Flex>
        <Flex>
          <Label
            variant="thinLabel"
            sx={{ py: 1, fontSize: 2, alignItems: 'center' }}
            data-testid="delegate-type-filter-show-shadow"
          >
            <Checkbox
              sx={{ width: 3, height: 3 }}
              checked={showShadow}
              onChange={event => setShowShadowFilter(event.target.checked)}
            />
            <Flex sx={{ justifyContent: 'space-between', width: '100%' }}>
              <Text>Shadow Delegates</Text>
              <Text sx={{ color: 'secondaryEmphasis', ml: 3 }}>{stats.shadow}</Text>
            </Flex>
          </Label>
        </Flex>
      </Box>
    </FilterButton>
  );
}
