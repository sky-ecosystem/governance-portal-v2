/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { useBreakpointIndex } from '@theme-ui/match-media';
import SkeletonThemed from 'modules/app/components/SkeletonThemed';
import { useSpellData } from 'modules/executive/hooks/useSpellData';
import { Proposal } from 'modules/executive/types';
import { useLockedMkr } from 'modules/mkr/hooks/useLockedMkr';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { Grid, Button, Flex, Close, Text, Box, Label, Checkbox } from 'theme-ui';
import { useAccount } from 'modules/app/hooks/useAccount';
import { formatValue } from 'lib/string';
import EtherscanLink from 'modules/web3/components/EtherscanLink';
import { useNetwork } from 'modules/app/hooks/useNetwork';

export default function DefaultVoteModalView({
  proposal,
  close,
  vote,
  voteDisabled,
  currentSlate,
  isHat,
  spellAddress,
  hatChecked,
  showHatCheckbox,
  setHatChecked
}: {
  proposal?: Proposal;
  close: () => void;
  vote: () => void;
  voteDisabled: boolean;
  currentSlate: string[];
  isHat: boolean;
  spellAddress: string;
  hatChecked: boolean;
  showHatCheckbox: boolean;
  setHatChecked: Dispatch<SetStateAction<boolean>>;
}): React.ReactElement {
  const bpi = useBreakpointIndex();
  const network = useNetwork();

  const { votingAccount } = useAccount();
  const { data: lockedMkr, mutate: mutateLockedMkr } = useLockedMkr(votingAccount);
  const { data: spellData, mutate: mutateSpellData } = useSpellData(spellAddress);

  // revalidate on mount
  useEffect(() => {
    mutateLockedMkr();
    mutateSpellData();
  }, []);

  const mkrSupporting = spellData ? BigInt(spellData.mkrSupport) : 0n;
  const hasVotingWeight = !!lockedMkr && lockedMkr > 0n;

  const afterVote =
    currentSlate && currentSlate.includes(spellAddress)
      ? mkrSupporting
      : lockedMkr && spellData
      ? lockedMkr + BigInt(spellData.mkrSupport)
      : 0n;

  const GridBox = ({ bpi, children }) => (
    <Box
      sx={
        bpi === 0
          ? { height: '64px', p: 2, px: 3, width: '100%', borderBottom: '1px solid #D4D9E1' }
          : { height: '78px', px: 3, py: 2, borderRight: '1px solid #D4D9E1' }
      }
    >
      {children}
    </Box>
  );

  const votingMessage =
    currentSlate && currentSlate.includes(spellAddress) && currentSlate.length > 1
      ? 'Concentrate all my MKR on this proposal'
      : currentSlate && !currentSlate.includes(spellAddress) && isHat
      ? 'Add MKR to secure the protocol'
      : 'Submit Vote';

  return (
    <Flex sx={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
      <Close
        aria-label="close"
        sx={{ height: '20px', width: '20px', p: 0, alignSelf: 'flex-end' }}
        onClick={close}
      />

      <Text variant="heading" sx={{ fontSize: 6 }}>
        Confirm Vote
      </Text>
      <Text sx={{ display: ['none', 'block'], marginTop: 3, color: 'onSecondary', fontSize: [3, 4] }}>
        You are voting for the following executive proposal:
      </Text>
      <Flex
        sx={{
          mt: 2,
          p: 3,
          width: '100%',
          mx: 3,
          backgroundColor: 'background',
          textAlign: 'center',
          fontSize: [3, 4],
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Text as="p" sx={{ fontSize: [3, 4], fontWeight: 'bold', mb: 3 }}>
          {proposal ? proposal.title : 'Unknown Spell'}
        </Text>
        <EtherscanLink hash={spellAddress} type="address" network={network} showAddress />
      </Flex>
      <Grid
        columns={[1, 3, 3, 3]}
        gap={0}
        sx={{
          width: '100%',
          minHeight: ['modal.height.mobile', 'modal.height.desktop'],
          borderRadius: 'small',
          border: '1px solid #D4D9E1',
          mt: 3,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <GridBox bpi={bpi}>
          <Text as="p" color="onSecondary" sx={{ fontSize: 3 }}>
            Your voting weight
          </Text>
          {lockedMkr !== undefined ? (
            <Text as="p" color="text" mt={[0, 2]} sx={{ fontSize: 3, fontWeight: 'medium' }}>
              {formatValue(lockedMkr, 'wad', 6)} MKR
            </Text>
          ) : (
            <Box sx={{ mt: [0, 2] }}>
              <SkeletonThemed />
            </Box>
          )}
        </GridBox>
        <GridBox bpi={bpi}>
          <Text as="p" color="onSecondary" sx={{ fontSize: 3 }}>
            MKR supporting
          </Text>
          {spellData !== undefined ? (
            <Text as="p" color="text" mt={[0, 2]} sx={{ fontSize: 3, fontWeight: 'medium' }}>
              {formatValue(mkrSupporting)} MKR
            </Text>
          ) : (
            <Box sx={{ mt: [0, 2] }}>
              <SkeletonThemed />
            </Box>
          )}
        </GridBox>
        <Box sx={{ height: ['64px', '78px'], p: 3, pt: 2 }}>
          <Text as="p" color="onSecondary" sx={{ fontSize: 3 }}>
            After vote cast
          </Text>
          {lockedMkr !== undefined && spellData !== undefined ? (
            <Text as="p" color="text" mt={[0, 2]} sx={{ fontSize: 3, fontWeight: 'medium' }}>
              {formatValue(afterVote)} MKR
            </Text>
          ) : (
            <Box sx={{ mt: [0, 2] }}>
              <SkeletonThemed />
            </Box>
          )}
        </Box>
      </Grid>

      <Box sx={{ width: '100%', marginTop: 3 }}>
        <Button
          variant="primaryLarge"
          sx={{ width: '100%' }}
          onClick={() => {
            vote();
          }}
          data-testid="vote-modal-vote-btn"
          disabled={!hasVotingWeight || voteDisabled}
        >
          {votingMessage}
        </Button>

        {showHatCheckbox ? (
          <Label
            sx={{
              mt: 3,
              p: 0,
              fontWeight: 400,
              alignItems: 'center',
              color: 'textSecondary',
              lineHeight: '0px',
              fontSize: [1, 2]
            }}
          >
            <Checkbox
              sx={{ width: '18px', height: '18px' }}
              checked={hatChecked}
              onChange={event => {
                setHatChecked(event.target.checked);
              }}
            />
            Keep my MKR on old proposal to secure the Maker protocol
          </Label>
        ) : null}
      </Box>
    </Flex>
  );
}
