/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { useState } from 'react';
import { Box, Text, Flex, Heading } from 'theme-ui';
import Icon from 'modules/app/components/Icon';
import { Delegate } from '../types';
import { DialogOverlay, DialogContent } from 'modules/app/components/Dialog';
import BoxWithClose from 'modules/app/components/BoxWithClose';

const ParticipationBreakdownModal = () => {
  const [overlayOpen, setOverlayOpen] = useState(false);

  return (
    <>
      <Flex onClick={() => setOverlayOpen(true)} sx={{ cursor: 'pointer', ml: 2 }}>
        <Icon name="info" color="primary" />
      </Flex>
      {overlayOpen && (
        <DialogOverlay isOpen={overlayOpen} onDismiss={() => setOverlayOpen(false)}>
          <DialogContent ariaLabel="Delegate voting stats info">
            <BoxWithClose close={() => setOverlayOpen(false)}>
              <Flex
                sx={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Heading sx={{ mb: 3 }}>Delegate participation</Heading>
                <Text as="p" sx={{ mb: 3 }}>
                  - Poll participation: The percentage of polling votes the delegate has participated in.
                </Text>
                <Text as="p" sx={{ mb: 3 }}>
                  - Executive participation: The percentage of executive votes the delegate has participated
                  in.
                </Text>
                <Text as="p" sx={{ mb: 3 }}>
                  - Communication: The percentage of votes for which the delegate has publicly communicated
                  their reasoning in addition to voting. It combines stats for polls and executives.
                </Text>
                <Text as="p">These stats are updated weekly by the GovAlpha Core Unit.</Text>
              </Flex>
            </BoxWithClose>
          </DialogContent>
        </DialogOverlay>
      )}
    </>
  );
};

export function DelegateParticipationMetrics({ delegate }: { delegate: Delegate }): React.ReactElement {
  const styles = {
    row: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 3,
      marginBottom: 3
    },
    text: {
      color: 'textSecondary',
      fontWeight: 'semiBold',
      fontSize: 3
    }
  };
  return (
    <Box p={[3, 4]}>
      <Flex sx={{ alignItems: 'center', mb: 3 }}>
        <Text
          as="p"
          sx={{
            fontSize: '18px',
            fontWeight: 'semiBold'
          }}
        >
          Participation Breakdown
        </Text>
        <ParticipationBreakdownModal />
      </Flex>

      <Box sx={styles.row}>
        <Text as="p" sx={styles.text}>
          Poll Participation
        </Text>
        <Text as="p" sx={styles.text} ml={2}>
          {delegate.pollParticipation || 'Untracked'}
        </Text>
      </Box>
      <Box sx={styles.row}>
        <Text as="p" sx={styles.text}>
          Executive Participation
        </Text>
        <Text as="p" sx={styles.text} ml={2}>
          {delegate.executiveParticipation || 'Untracked'}
        </Text>
      </Box>
      <Box sx={styles.row}>
        <Text as="p" sx={styles.text}>
          Communication
        </Text>
        <Text as="p" sx={styles.text} ml={2}>
          {delegate.communication || 'Untracked'}
        </Text>
      </Box>
    </Box>
  );
}
