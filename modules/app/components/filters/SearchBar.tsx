/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { useEffect, useState } from 'react';
import { Box, Input, ThemeUIStyleObject, IconButton } from 'theme-ui';
import Icon from '../Icon';
import { debounce } from 'modules/app/helpers/debounce';

type Props = {
  sx?: ThemeUIStyleObject;
  onChange: (seach: string) => void;
  value: string | null;
  placeholder?: string;
  withSearchButton?: boolean;
  performSearchOnClear?: boolean;
};

export const SearchBar = ({
  onChange,
  value,
  placeholder = 'Search',
  withSearchButton,
  performSearchOnClear,
  ...props
}: Props): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (value) {
      setSearchTerm(value);
    }
  }, []);

  const handleInput = event => {
    setSearchTerm(event.target.value);
    if (!withSearchButton || (performSearchOnClear && event.target.value === '')) {
      debounce(onChange(event.target.value));
    }
  };

  const handleSearchButton = () => {
    onChange(searchTerm);
  };

  const handleKeyPress = event => {
    if (withSearchButton) {
      if (event.keyCode === 13) {
        onChange(searchTerm);
        return;
      } else if (event.keyCode === 27) {
        onChange('');
        setSearchTerm('');
      }
    }
  };

  useEffect(() => {
    if (!value) {
      setSearchTerm('');
    }
  }, [value]);

  const hasSearchTerm = !(!searchTerm || searchTerm === '');

  return (
    <Box sx={{ position: 'relative' }} {...props}>
      <Input
        name="search"
        onChange={handleInput}
        type={withSearchButton ? undefined : 'search'}
        value={searchTerm}
        onKeyUp={handleKeyPress}
        autoComplete="off"
        placeholder={placeholder}
        sx={{
          maxWidth: 250,
          borderRadius: 'round',
          px: 3,
          borderColor: hasSearchTerm ? 'primary' : 'auto',
          '&:focus': {
            borderColor: hasSearchTerm ? 'primary' : 'auto'
          },
          'input:invalid ~ span:after': {
            paddingLeft: '5px',
            position: 'absolute',
            cursor: 'pointer'
          }
        }}
      />
      {!hasSearchTerm && (
        <Box sx={{ position: 'absolute', top: 11, right: 13 }}>
          <Icon name="magnifying_glass" sx={{ color: 'textSecondary', size: 3 }} />
        </Box>
      )}
      {withSearchButton && hasSearchTerm && (
        <IconButton
          sx={{
            position: 'absolute',
            top: '5px',
            right: '5px',
            backgroundColor: 'primary',
            borderRadius: 'round'
          }}
          onClick={handleSearchButton}
        >
          <Icon name="magnifying_glass" sx={{ color: 'background', size: 3 }} />
        </IconButton>
      )}
    </Box>
  );
};
