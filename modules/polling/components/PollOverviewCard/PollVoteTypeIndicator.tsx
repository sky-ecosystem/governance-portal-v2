/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { useState } from 'react';
import {
  hasVictoryConditionApproval,
  hasVictoryConditionInstantRunOff,
  hasVictoryConditionMajority,
  hasVictoryConditionPlurality
} from 'modules/polling/helpers/utils';
import { Poll, PollListItem } from 'modules/polling/types';
import { Box, Flex, Text, Heading } from 'theme-ui';
import Icon from 'modules/app/components/Icon';
import { DialogOverlay, DialogContent } from 'modules/app/components/Dialog';
import BoxWithClose from 'modules/app/components/BoxWithClose';

const PollTypesModal = ({ iconName }) => {
  const [overlayOpen, setOverlayOpen] = useState(false);

  return (
    <>
      <Flex onClick={() => setOverlayOpen(true)} sx={{ cursor: 'pointer', ml: 1 }}>
        <Icon name={iconName} color="primary" />
      </Flex>
      {overlayOpen && (
        <DialogOverlay isOpen={overlayOpen} onDismiss={() => setOverlayOpen(false)}>
          <DialogContent ariaLabel="Poll types modal">
            <BoxWithClose close={() => setOverlayOpen(false)}>
              <Flex
                sx={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Heading sx={{ mb: 3 }}>Poll types</Heading>
                <Text as="p" sx={{ mb: 3 }}>
                  - Ranked-choice polls: require multiple-choice ballots in ranked order, and determine the
                  winning vote option by finding the one with an absolute majority in MKR voting weight (as in
                  &gt;50% of the total participating MKR, excluding abstains). In the first round of IRV, only
                  first-choice votes are counted. In case no vote option meets the victory requirements, the
                  least popular vote option (except abstain) is eliminated and the votes applied to that
                  option are instead applied to the voters’ next ranked option. This repeats until the victory
                  conditions have been met by one vote option. If no winning option can be found, tally
                  results are shown as if no IRV rounds were run.
                </Text>
                <Text as="p" sx={{ mb: 3 }}>
                  - Plurality polls: require single-choice ballots and determines the winning vote option by
                  finding the one with the highest MKR voting weight in relative terms.
                </Text>
                <Text as="p" sx={{ mb: 3 }}>
                  - Approval polls: require multiple-choice ballots in unranked order, and determines the
                  winning vote option by finding the one with a relative majority in MKR voting weight. When
                  used in situations where no winner is required, an absolute majority (ie. &gt;50% of the
                  total participating MKR excluding abstains) victory condition may also be applied as opposed
                  to a relative majority.
                </Text>
                <Text as="p">
                  - Majority polls: require single-choice ballots and determines the winning vote option by
                  finding the one with an absolute majority in MKR voting weight, being &gt;50% of the total
                  participating MKR (excluding abstains).
                </Text>
              </Flex>
            </BoxWithClose>
          </DialogContent>
        </DialogOverlay>
      )}
    </>
  );
};

export function PollVoteTypeIndicator({ poll }: { poll: PollListItem | Poll }): React.ReactElement {
  const isRanked = hasVictoryConditionInstantRunOff(poll.parameters.victoryConditions);
  const isPlurality = hasVictoryConditionPlurality(poll.parameters.victoryConditions);
  const isApproval = hasVictoryConditionApproval(poll.parameters.victoryConditions);
  const isMajority = hasVictoryConditionMajority(poll.parameters.victoryConditions);
  return (
    <Box>
      {isRanked && (
        <Flex sx={{ alignItems: 'center' }}>
          <Text variant="caps">Ranked-choice poll</Text>
          <PollTypesModal iconName={'stackedVotes'} />
        </Flex>
      )}
      {isPlurality && (
        <Flex sx={{ alignItems: 'center' }}>
          <Text variant="caps">Plurality poll</Text>
          <PollTypesModal iconName={'info'} />
        </Flex>
      )}
      {isApproval && (
        <Flex sx={{ alignItems: 'center' }}>
          <Text variant="caps">Approval poll</Text>
          <PollTypesModal iconName={'info'} />
        </Flex>
      )}

      {isMajority && !isPlurality && !isApproval && !isRanked && (
        <Flex sx={{ alignItems: 'center' }}>
          <Text variant="caps">Majority poll</Text>
          <PollTypesModal iconName={'info'} />
        </Flex>
      )}
    </Box>
  );
}
