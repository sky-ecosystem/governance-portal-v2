/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import Skeleton, { SkeletonTheme, SkeletonProps, SkeletonThemeProps } from 'react-loading-skeleton';
import { useThemeUI } from 'theme-ui';

const SkeletonThemed = (props: SkeletonProps): React.ReactElement => {
  const { theme } = useThemeUI();

  const colorProps: SkeletonThemeProps = {
    baseColor: theme?.colors?.skeletonColor as string,
    highlightColor: theme?.colors?.skeletonHighlightColor as string
  };

  return (
    <SkeletonTheme {...{ ...colorProps }}>
      <Skeleton {...props} />
    </SkeletonTheme>
  );
};

export default SkeletonThemed;
