/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import Stack from 'modules/app/components/layout/layouts/Stack';
import { Poll, PollListItem } from 'modules/polling/types';
import { Box, Button } from 'theme-ui';

type props = {
  poll: PollListItem | Poll;
  choice: number[] | null;
  setChoice: (choices: number[]) => void;
};

export default function ChooseFreeSelect({ poll, choice, setChoice }: props): React.ReactElement {
  const selectOption = (index: number) => {
    // Check if is abstain
    const isAbstain = poll.parameters.inputFormat.abstain.indexOf(index) !== -1;

    if (isAbstain) {
      setChoice([index]);
      return;
    }

    // Check if is exclusive ( can not be selected at the same time than other options)
    const isExclusive =
      poll.parameters.inputFormat.options.length > 0 &&
      poll.parameters.inputFormat.options.indexOf(index) === -1;
    if (isExclusive) {
      setChoice([index]);
      return;
    }

    // Remove if already selected
    if (choice && choice.indexOf(index) !== -1) {
      setChoice(choice.filter(c => c !== index));
      return;
    }

    // Add new selected option, but first remove exclusive and abstain
    const newChoices = choice
      ? choice.filter(c => {
          const isAbstain = poll.parameters.inputFormat.abstain.indexOf(c) !== -1;
          const isExclusive =
            poll.parameters.inputFormat.options.length > 0 &&
            poll.parameters.inputFormat.options.indexOf(c) === -1;
          return !isAbstain && !isExclusive;
        })
      : [];
    setChoice([...newChoices, index]);
  };

  return (
    <Box>
      <Stack gap={2}>
        {Object.keys(poll.options).map(option => {
          return (
            <Button
              key={`choose-free-${poll.pollId}-${option}`}
              onClick={() => selectOption(parseInt(option))}
              variant={choice && choice.indexOf(parseInt(option)) !== -1 ? 'primaryOutline' : 'outline'}
            >
              {poll.options[option]}
            </Button>
          );
        })}
      </Stack>
    </Box>
  );
}
