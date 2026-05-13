/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { useEffect } from 'react';
import { Button, Card, Flex, Text, Input, Spinner, Heading } from 'theme-ui';
import PrimaryLayout from 'modules/app/components/layout/layouts/Primary';
import { useState } from 'react';
import { useAccount } from 'modules/app/hooks/useAccount';
import { useVotedProposals } from 'modules/executive/hooks/useVotedProposals';
import VoteModal from 'modules/executive/components/VoteModal';
import { analyzeSpell } from 'modules/executive/api/analyzeSpell';
import { SpellData } from 'modules/executive/types';
import { SpellDetailsOverview } from 'modules/executive/components/SpellDetailsOverview';
import logger from 'lib/logger';
import { toast } from 'react-toastify';
import { useNetwork } from 'modules/app/hooks/useNetwork';

export default function CustomSpell(): JSX.Element {
  const [spellAddress, setSpellAddress] = useState<string | null>(null);
  const [spellData, setSpellData] = useState<SpellData | null | undefined>(undefined);
  const [loading, setLoading] = useState(false);
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

  const handleInput = e => {
    if (e.target.value === '') {
      setSpellData(undefined);
    }
    setSpellAddress(e.target.value);
  };

  const handleVote = () => {
    setVoting(true);
  };

  const fetchSpellData = async () => {
    setSpellData(undefined);
    setLoading(true);
    if (!spellAddress) {
      setSpellData(undefined);
      setLoading(false);
      return null;
    }
    try {
      const data = await analyzeSpell(spellAddress, network);
      if (data && data.executiveHash === undefined) {
        setSpellData(null);
      } else {
        setSpellData(data);
      }
      setLoading(false);
    } catch (err) {
      toast.error('Error fetching spell data');
      logger.error('fetchSpellData', err);
      setLoading(false);
    }
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
        <Input name="spellAddress" mb={3} onChange={handleInput} />
        <Flex sx={{ alignItems: 'center' }}>
          <Button disabled={!spellAddress || !account} onClick={handleVote} sx={{ mr: 3 }}>
            Vote for this address
          </Button>
          <Button disabled={!spellAddress} onClick={fetchSpellData}>
            Fetch spell details
          </Button>
          {loading && <Spinner size={20} ml={3} />}
        </Flex>
      </Card>
      {spellData !== undefined && (
        <>
          <Heading sx={{ mt: 4, mb: 3 }}>Spell details</Heading>
          <Card>
            <Flex sx={{ flexDirection: 'column' }}>
              {spellData === null && (
                <Flex sx={{ mt: 3 }}>
                  <Text>No spell details found</Text>
                </Flex>
              )}

              {!!spellData && <SpellDetailsOverview spellDetails={spellData} />}
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
