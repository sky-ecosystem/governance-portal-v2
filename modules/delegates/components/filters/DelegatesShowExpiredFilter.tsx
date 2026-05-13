/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { Box, Label, Checkbox, ThemeUIStyleObject } from 'theme-ui';
import shallow from 'zustand/shallow';
import useDelegatesFiltersStore from 'modules/delegates/stores/delegatesFiltersStore';

export function DelegatesShowExpiredFilter({ ...props }: { sx?: ThemeUIStyleObject }): JSX.Element {
  const [showExpired, setShowExpiredFilter] = useDelegatesFiltersStore(
    state => [state.filters.showExpired, state.setShowExpiredFilter],
    shallow
  );

  const handleChecked = () => {
    setShowExpiredFilter(!showExpired);
  };

  return (
    <Box {...props}>
      <Label variant="thinLabel" sx={{ fontSize: 2, alignItems: 'center' }}>
        <Checkbox checked={showExpired} onChange={handleChecked} />
        Show Expired Delegates
      </Label>
    </Box>
  );
}
