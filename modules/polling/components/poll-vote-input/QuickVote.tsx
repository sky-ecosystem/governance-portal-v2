/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { useState, useEffect, useContext } from 'react';
import { Text, Flex, Button } from 'theme-ui';
import invariant from 'tiny-invariant';
import { PollListItem, Poll } from 'modules/polling/types';
import {
  extractCurrentPollVote,
  isInputFormatChooseFree,
  isInputFormatRankFree,
  isInputFormatSingleChoice
} from 'modules/polling/helpers/utils';
import { useAllUserVotes } from 'modules/polling/hooks/useAllUserVotes';
import Stack from 'modules/app/components/layout/layouts/Stack';
import RankedChoiceSelect from './RankedChoiceSelect';
import SingleSelect from './SingleSelect';
import ChoiceSummary from '../ChoiceSummary';
import VotingStatus from '../PollVotingStatus';
import { useAccount } from 'modules/app/hooks/useAccount';
import { BallotContext } from '../../context/BallotContext';
import ChooseFreeSelect from './ChooseFreeSelect';
import { useMKRVotingWeight } from 'modules/mkr/hooks/useMKRVotingWeight';
import { config } from 'lib/config';

type Props = {
  poll: PollListItem | Poll;
  showStatus?: boolean;
  showReviewButton?: boolean;
  disabled?: boolean;
  onSubmit?: () => void;
  buttonVariant?: string;
};

const QuickVote = ({
  poll,
  showStatus,
  showReviewButton,
  disabled = false,
  onSubmit,
  buttonVariant
}: Props): React.ReactElement => {
  const { account, voteDelegateContractAddress } = useAccount();
  const { data: votingWeight, loading } = useMKRVotingWeight({ address: account });
  const { data: allUserVotes } = useAllUserVotes(
    voteDelegateContractAddress ? voteDelegateContractAddress : account
  );

  const { ballot, previousBallot, transaction, updateVoteFromBallot } = useContext(BallotContext);

  const addedChoice = ballot[poll.pollId];

  const [choice, setChoice] = useState<number | number[] | null>(addedChoice?.option ?? null);

  const [editing, setEditing] = useState(false);

  const isChoiceValid = Array.isArray(choice) ? choice.length > 0 : choice !== null;
  const voteIsPending = transaction && transaction.status !== 'mined' ? true : false;
  const currentVote = extractCurrentPollVote(poll, allUserVotes);
  const previousVote = previousBallot[poll.pollId] ? previousBallot[poll.pollId].option : null;
  const hasVotedOnThisPollBefore = currentVote !== null || previousVote !== null;

  useEffect(() => {
    setChoice(null);
  }, [account]);

  useEffect(() => {
    if (addedChoice) {
      setChoice(addedChoice?.option);
    } else {
      // If it's removed from ballot, update UI
      setChoice(null);
      setEditing(!hasVotedOnThisPollBefore);
    }
  }, [addedChoice]);

  const submit = () => {
    invariant(isChoiceValid);
    updateVoteFromBallot(poll.pollId, { option: choice as number | number[] });
    setEditing(false);
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <Stack gap={2}>
      <Flex
        sx={{
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexDirection: 'row'
        }}
      >
        <Text variant="caps">Your vote</Text>
        {showStatus && <VotingStatus poll={poll} />}
      </Flex>

      {choice !== null && !editing && (
        <ChoiceSummary
          showActions={!voteIsPending && !disabled}
          poll={poll}
          choice={choice}
          edit={() => setEditing(true)}
          showReviewButton={showReviewButton}
        />
      )}
      {choice === null && hasVotedOnThisPollBefore && !editing && (
        <ChoiceSummary
          showActions={!voteIsPending && !disabled}
          poll={poll}
          choice={previousVote !== null ? previousVote : (currentVote as number | number[])}
          edit={() => setEditing(true)}
          showReviewButton={showReviewButton}
        />
      )}

      {editing && (
        <div>
          {isInputFormatRankFree(poll.parameters) && (
            <RankedChoiceSelect poll={poll} setChoice={setChoice} choice={choice as number[] | null} />
          )}
          {isInputFormatSingleChoice(poll.parameters) && (
            <SingleSelect poll={poll} setChoice={setChoice} choice={choice as number | null} />
          )}
          {isInputFormatChooseFree(poll.parameters) && (
            <ChooseFreeSelect poll={poll} setChoice={setChoice} choice={choice as number[] | null} />
          )}
          <Button
            data-testid="button-add-vote-to-ballot"
            variant={buttonVariant ? buttonVariant : 'primary'}
            sx={{ width: '100%', mt: 3 }}
            onClick={() => {
              submit();
            }}
            mt={2}
            disabled={!isChoiceValid || !votingWeight || !(votingWeight.total > 0n) || config.READ_ONLY}
          >
            {loading
              ? 'Loading MKR balance...'
              : !votingWeight || !(votingWeight.total > 0n)
              ? 'Deposit MKR to vote'
              : addedChoice
              ? 'Update vote'
              : 'Add vote to ballot'}
          </Button>
        </div>
      )}
    </Stack>
  );
};

export default QuickVote;
