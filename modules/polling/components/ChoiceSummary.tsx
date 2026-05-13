/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { Text, Flex, Box, Button } from 'theme-ui';
import { getNumberWithOrdinal } from 'lib/utils';
import { ABSTAIN } from '../polling.constants';
import Icon from 'modules/app/components/Icon';
import { Poll, PollListItem } from '../types';
import { useContext } from 'react';
import { BallotContext } from '../context/BallotContext';
import { InternalLink } from 'modules/app/components/InternalLink';
import { isInputFormatChooseFree, isInputFormatRankFree, isInputFormatSingleChoice } from '../helpers/utils';
import { config } from 'lib/config';

const ChoiceSummary = ({
  choice,
  poll,
  edit,
  showActions,
  showReviewButton,
  ...props
}: {
  poll: PollListItem | Poll;
  edit: () => void;
  showActions: boolean;
  showReviewButton?: boolean;
  choice: number | number[];
}): React.ReactElement => {
  const { removeVoteFromBallot, isPollOnBallot } = useContext(BallotContext);

  const onBallot = isPollOnBallot(poll.pollId);

  return (
    <Box {...props}>
      {isInputFormatSingleChoice(poll.parameters) && (
        <Box sx={{ backgroundColor: 'onSurfaceAlt', p: 3, mb: 2, borderRadius: 'medium' }}>
          <Text data-testid="choice">{choice === ABSTAIN ? 'Abstain' : poll.options[choice as number]}</Text>
        </Box>
      )}
      {isInputFormatRankFree(poll.parameters) &&
        (choice as number[]).map((id, index) => (
          <Flex
            sx={{ backgroundColor: 'onSurfaceAlt', py: 2, px: 3, mb: 2, borderRadius: 'medium' }}
            key={id}
          >
            <Flex sx={{ flexDirection: 'column' }}>
              <Text sx={{ variant: 'text.caps', fontSize: 1 }}>{getNumberWithOrdinal(index + 1)} choice</Text>
              <Text data-testid="choice">{poll.options[id]}</Text>
            </Flex>
          </Flex>
        ))}
      {isInputFormatChooseFree(poll.parameters) &&
        (choice as number[]).map(id => (
          <Flex
            sx={{ backgroundColor: 'onSurfaceAlt', py: 2, px: 3, mb: 2, borderRadius: 'medium' }}
            key={id}
          >
            <Flex sx={{ flexDirection: 'column' }}>
              <Text data-testid="choice">{poll.options[id]}</Text>
            </Flex>
          </Flex>
        ))}
      <Flex sx={{ justifyContent: 'space-between' }}>
        {showActions && (
          <Button
            data-testid="edit-poll-choice"
            onClick={() => {
              edit();
            }}
            variant={'smallOutline'}
            sx={{
              display: 'inline-flex',
              flexDirection: 'row',
              alignItems: 'center',
              mt: 1
            }}
          >
            <Icon name="edit" size={3} sx={{ mr: 1 }} />
            Edit choice{isInputFormatSingleChoice(poll.parameters) ? '' : 's'}
          </Button>
        )}
        {onBallot && showActions && (
          <Button
            data-testid="remove-ballot-choice"
            onClick={() => {
              removeVoteFromBallot(poll.pollId);
            }}
            variant={'smallOutline'}
            sx={{
              display: 'inline-flex',
              flexDirection: 'row',
              alignItems: 'center',
              ml: 2,
              mt: 1
            }}
          >
            {' '}
            <Icon sx={{ mr: 1 }} size={3} name={'ballot'} />
            Remove vote
          </Button>
        )}
      </Flex>
      {showReviewButton && onBallot && (
        <InternalLink href="/polling/review" title="Review & submit your ballot">
          <Button
            variant="primaryLarge"
            sx={{ width: '100%', cursor: 'pointer', mt: 3 }}
            disabled={config.READ_ONLY}
          >
            Review & Submit Your Ballot
          </Button>
        </InternalLink>
      )}
    </Box>
  );
};

export default ChoiceSummary;
