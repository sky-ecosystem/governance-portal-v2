/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { Text, Alert } from 'theme-ui';
import { keyframes } from '@emotion/react';
import { ExternalLink } from '../../ExternalLink';
import React from 'react';
import Icon from '../../Icon';

const scroll = keyframes({
  from: { transform: 'translate(90vw, 0)' },
  to: { transform: 'translate(-90vw, 0)' }
});

const Banner = ({
  content,
  variant = 'banner',
  href
}: {
  content: string | React.ReactElement;
  variant?: string;
  href?: string;
}): React.ReactElement => {
  const arrow = href ? <Icon name="chevron_right" size={2} sx={{ ml: 2 }} /> : null;
  const textComponent = (
    <Text
      as="p"
      sx={{
        display: 'inline-block',
        animation: `${scroll} 30s linear infinite`,
        color: 'white',
        whiteSpace: 'nowrap',
        m: 0,
        p: 0
      }}
    >
      {content} {arrow}
    </Text>
  );

  return (
    <Alert
      variant={variant}
      sx={{
        fontSize: 2,
        borderRadius: 0,
        fontWeight: 'normal',
        textAlign: 'center',
        px: 3,
        py: 2,
        width: '100vw',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
      }}
    >
      {typeof content === 'string' ? (
        href ? (
          <ExternalLink href={href} title="" styles={{ color: 'white' }}>
            {textComponent}
          </ExternalLink>
        ) : (
          <div>{textComponent}</div>
        )
      ) : (
        content
      )}
    </Alert>
  );
};

export default Banner;
