/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { Flex, Box, Text } from 'theme-ui';
import { STEPS } from 'modules/migration/steps';

// TODO type the prop with steps enum
export function MigrationSteps({ activeStep }: { activeStep: string }): JSX.Element {
  return (
    <Flex sx={{ justifyContent: 'space-evenly', my: 3 }}>
      {Object.values(STEPS).map(step => {
        const isActiveStep = activeStep === step;
        return (
          <Flex key={step} sx={{ flexDirection: 'column' }}>
            <Box sx={{ height: '3px', width: '185px', bg: isActiveStep ? 'primary' : 'secondary' }} />
            <Text
              as="p"
              variant="text.caps"
              sx={{
                textAlign: 'center',
                mt: 2,
                fontWeight: 'bold',
                color: isActiveStep ? 'primary' : 'secondary'
              }}
            >
              {step}
            </Text>
          </Flex>
        );
      })}
    </Flex>
  );
}
