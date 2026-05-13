/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import shallow from 'zustand/shallow';
import { MenuItem } from '@reach/menu-button';

import useUiFiltersStore from 'modules/app/stores/uiFilters';
import FilterButton from 'modules/app/components/FilterButton';

export default function ProposalsSortBy(props): JSX.Element {
  const [executiveSortBy, setExecutiveSortBy] = useUiFiltersStore(
    state => [state.executiveSortBy, state.setExecutiveSortBy],
    shallow
  );

  return (
    <FilterButton
      name={() =>
        `Sort by ${
          executiveSortBy === 'date' ? 'Date Posted' : executiveSortBy === 'mkr' ? 'MKR Amount' : 'Active'
        }`
      }
      listVariant="menubuttons.default.list"
      {...props}
    >
      <MenuItem
        onSelect={() => setExecutiveSortBy('active')}
        sx={{
          variant: 'menubuttons.default.item',
          fontWeight: executiveSortBy === 'active' ? 'bold' : undefined
        }}
      >
        Active
      </MenuItem>
      <MenuItem
        onSelect={() => setExecutiveSortBy('date')}
        sx={{
          variant: 'menubuttons.default.item',
          fontWeight: executiveSortBy === 'date' ? 'bold' : undefined
        }}
      >
        Date Posted
      </MenuItem>
      <MenuItem
        onSelect={() => setExecutiveSortBy('mkr')}
        sx={{
          variant: 'menubuttons.default.item',
          fontWeight: executiveSortBy === 'mkr' ? 'bold' : undefined
        }}
      >
        MKR Amount
      </MenuItem>
    </FilterButton>
  );
}
