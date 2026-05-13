/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import React from 'react';
import { Box, ThemeUIStyleObject } from 'theme-ui';
import { keyframes } from '@emotion/react';
const spin = keyframes`
  50% { 
    transform: rotate(180deg); 
    opacity: 0.3;
  }
  100% { transform: rotate(360deg);  }
`;
function Circle({
  sxs,
  color,
  mobile
}: {
  sxs: ThemeUIStyleObject;
  color: string;
  mobile: boolean;
}): React.ReactElement {
  return (
    <Box
      sx={{
        background: `linear-gradient(180deg, ${color} 0%, #f3efbd 100%);`,
        borderRadius: '100%',
        filter: 'blur(2px)',
        transformOrigin: '80% 20%',
        animation: mobile ? undefined : `${spin} 10s cubic-bezier(.8, 0, .2, 1) infinite alternate`,
        transition: mobile ? undefined : 'all 300ms linear',
        ...sxs
      }}
    />
  );
}
export default function CirclesBackground({
  children,
  activeColor,
  mobile
}: {
  children: React.ReactNode;
  activeColor: string;
  mobile: boolean;
}): React.ReactElement {
  return (
    <Box
      sx={{
        position: 'relative'
      }}
    >
      <Circle
        color={activeColor}
        mobile={mobile}
        sxs={{
          width: '100px',
          height: '100px',
          position: 'absolute',
          left: '50%',
          top: '20px',
          zIndex: '1'
        }}
      />

      <Circle
        color={activeColor}
        mobile={mobile}
        sxs={{
          width: '300px',
          height: '300px',
          transform: 'rotate(-90deg)',
          position: 'absolute',
          left: '-100px',
          top: '100px',
          filter: 'blur(2px)',
          transformOrigin: '60% 60%',

          zIndex: '1'
        }}
      />

      <Circle
        color={activeColor}
        mobile={mobile}
        sxs={{
          width: '300px',
          height: '300px',
          transform: 'rotate(90deg)',
          position: 'absolute',
          right: '-15px',
          bottom: '0px',
          filter: 'blur(2px)',

          zIndex: '1'
        }}
      />

      <Circle
        color={activeColor}
        mobile={mobile}
        sxs={{
          width: '100px',
          height: '100px',
          transform: 'rotate(90deg)',
          position: 'absolute',
          right: '400px',
          bottom: '0px',
          filter: 'blur(2px)',

          zIndex: '1'
        }}
      />
      <Box sx={{ position: 'relative', pt: 3, zIndex: '10' }}>{children}</Box>
    </Box>
  );
}
