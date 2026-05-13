/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { Flex, Text } from 'theme-ui';
import { SkyExecutiveDetailResponse } from 'modules/executive/types';
import { StatusText } from 'modules/app/components/StatusText';
import { getSkyStatusText } from 'modules/executive/helpers/getStatusText';

type SkyExecutiveStatusBoxProps = {
  executive: SkyExecutiveDetailResponse;
  skyOnHat?: bigint;
};

const SkyExecutiveStatusBox = ({ executive, skyOnHat }: SkyExecutiveStatusBoxProps): JSX.Element => {
  const statusText = getSkyStatusText({
    spellData: executive.spellData,
    skyOnHat
  });

  return (
    <Flex sx={{ py: 2, justifyContent: 'center', fontSize: [1, 2], color: 'onSecondary' }}>
      <StatusText testId="sky-executive-status">
        {statusText}
      </StatusText>
    </Flex>
  );
};

export default SkyExecutiveStatusBox;