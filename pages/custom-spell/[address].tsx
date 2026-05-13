/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { useEffect } from 'react';
import { Button, Card, Flex, Text, Heading, Box } from 'theme-ui';
import PrimaryLayout from 'modules/app/components/layout/layouts/Primary';
import { useState } from 'react';
import { useAccount } from 'modules/app/hooks/useAccount';
import { useVotedProposals } from 'modules/executive/hooks/useVotedProposals';
import VoteModal from 'modules/executive/components/VoteModal';
import { analyzeSpell } from 'modules/executive/api/analyzeSpell';
import { SpellData } from 'modules/executive/types';
import { DEFAULT_NETWORK } from 'modules/web3/constants/networks';
import { SpellDetailsOverview } from 'modules/executive/components/SpellDetailsOverview';
import EtherscanLink from 'modules/web3/components/EtherscanLink';
import { useNetwork } from 'modules/app/hooks/useNetwork';

type Props = {
  spellAddress: string;
  spellDetails: SpellData | null | undefined;
};

export default function CustomSpellAddress({ spellAddress, spellDetails }: Props): JSX.Element {
  const [voting, setVoting] = useState(false);
  const network = useNetwork();
  const { account, votingAccount } = useAccount();

  const { data: votedProposals, mutate: mutateVotedProposals } = useVotedProposals();

  // revalidate votedProposals if connected address changes
  useEffect(() => {
    mutateVotedProposals();
  }, [votingAccount]);

  const hasVotedFor =
    votedProposals &&
    !!votedProposals.find(proposalAddress => proposalAddress.toLowerCase() === spellAddress?.toLowerCase());

  const handleVote = () => {
    setVoting(true);
  };

  return (
    <PrimaryLayout sx={{ maxWidth: [null, null, null, 'page', 'dashboard'] }}>
      <Heading>Custom Spell Voting</Heading>
      <Text as="p" sx={{ mt: 3, color: 'onSecondary' }}>
        This page can be used to vote on custom executive spells by manually entering the spell address.
        Fetching spell details for a custom executive spell might return some empty values in case they are
        not available, but it would still be possible to vote on the spell. Be cautious of malicious spells
        and only use this page in case of emergencies!
      </Text>
      <Heading sx={{ mt: 4, mb: 3 }}>Spell address</Heading>
      <Card>
        {spellAddress && (
          <Box sx={{ fontSize: [1, 4], mb: 3 }}>
            <EtherscanLink showAddress type="address" hash={spellAddress} network={network} />
          </Box>
        )}
        <Flex sx={{ alignItems: 'center' }}>
          <Button disabled={!spellAddress || !account} onClick={handleVote} sx={{ mr: 3 }}>
            Vote for this address
          </Button>
        </Flex>
      </Card>
      {spellDetails !== undefined && (
        <>
          <Heading sx={{ mt: 4, mb: 3 }}>Spell details</Heading>
          <Card>
            <Flex sx={{ flexDirection: 'column' }}>
              {spellDetails === null && (
                <Flex sx={{ mt: 3 }}>
                  <Text>No spell details found</Text>
                </Flex>
              )}

              {!!spellDetails && <SpellDetailsOverview spellDetails={spellDetails} />}
            </Flex>
          </Card>
        </>
      )}
      {hasVotedFor && (
        <>
          <Heading sx={{ mt: 4, mb: 3 }}>Your Vote</Heading>
          <Card>
            <Flex sx={{ mt: 3 }}>
              <Text>You are currently supporting this executive spell address</Text>
            </Flex>
          </Card>
        </>
      )}
      {voting && spellAddress && <VoteModal address={spellAddress} close={() => setVoting(false)} />}
    </PrimaryLayout>
  );
}

export async function getServerSideProps({ params }) {
  const spellAddress = (params || {})['address'] as string;
  const data = await analyzeSpell(spellAddress, DEFAULT_NETWORK.network);

  let spellDetails;

  if (data && data.executiveHash === undefined) {
    spellDetails = null;
  } else {
    spellDetails = data;
  }

  return {
    props: {
      spellAddress,
      spellDetails
    }
  };
}
