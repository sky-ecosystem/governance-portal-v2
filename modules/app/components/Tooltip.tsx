/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

// this component passes through to @reach/tooltip on desktop,
// and on mobile, renders a button that opens a sheet

import { DialogOverlay, DialogContent } from '@reach/dialog';
import Tooltip from '@reach/tooltip';

import { useBreakpointIndex } from '@theme-ui/match-media';
import { Box } from 'theme-ui';
import { useState } from 'react';

export default function TooltipComponent({ children, label, disable = false, ...props }): JSX.Element {
  if (disable) return <div>{children}</div>;
  const bpi = useBreakpointIndex();
  const [isOpen, setOpen] = useState(false);
  return bpi === 0 ? (
    <Box onClick={() => setOpen(true)}>
      {children}
      <DialogOverlay isOpen={isOpen} onDismiss={() => setOpen(false)} sx={{ zIndex: 2 }}>
        <DialogContent sx={{ variant: 'dialog.mobile' }}>
          <Box {...props}>{label}</Box>
        </DialogContent>
      </DialogOverlay>
    </Box>
  ) : (
    <Tooltip
      sx={{
        bg: 'surface',
        borderColor: 'secondary',
        color: 'text',
        fontSize: 3,
        borderRadius: 'medium',
        zIndex: 2
      }}
      label={label}
      {...props}
    >
      {children}
    </Tooltip>
  );
}
