/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { useState } from 'react';
import { Button, Flex, Close, Text } from 'theme-ui';
import Icon from 'modules/app/components/Icon';
import { Proposal } from 'modules/executive/types';
import { TxInProgress } from 'modules/app/components/TxInProgress';
import { TxFinal } from 'modules/app/components/TxFinal';
import DefaultVoteModalView from './DefaultView';
import { DialogContent, DialogOverlay } from 'modules/app/components/Dialog';
import { TxStatus } from 'modules/web3/constants/transaction';
import { useAccount } from 'modules/app/hooks/useAccount';
import { useVotedProposals } from 'modules/executive/hooks/useVotedProposals';
import { useAllSlates } from 'modules/executive/hooks/useAllSlates';
import { useMkrOnHat } from 'modules/executive/hooks/useMkrOnHat';
import { useHat } from 'modules/executive/hooks/useHat';
import { sortBytesArray } from 'lib/utils';
import { encodeAbiParameters, keccak256 } from 'viem';
import { useDelegateVote } from 'modules/executive/hooks/useDelegateVote';
import { useVoteProxyVote } from 'modules/executive/hooks/useVoteProxyVote';
import { useChiefVote } from 'modules/executive/hooks/useChiefVote';

type Props = {
  close: () => void;
  proposal?: Proposal;
  address?: string;
};

const VoteModal = ({ close, proposal, address }: Props): JSX.Element => {
  const [txStatus, setTxStatus] = useState<TxStatus>(TxStatus.IDLE);
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();

  const { voteProxyContractAddress, voteDelegateContractAddress } = useAccount();

  const spellAddress = proposal ? proposal.address : address ? address : '';

  const [hatChecked, setHatChecked] = useState(true);
  const { data: currentSlate, mutate: mutateVotedProposals } = useVotedProposals();

  const { data: allSlates } = useAllSlates();
  const { mutate: mutateMkrOnHat } = useMkrOnHat();

  const { data: hat } = useHat();

  const isHat = !!hat && hat === spellAddress;
  const showHatCheckbox =
    !!hat && spellAddress !== hat && currentSlate.includes(hat) && !currentSlate.includes(spellAddress);

  const proposals = (
    hatChecked && showHatCheckbox ? sortBytesArray([hat, spellAddress]) : [spellAddress]
  ) as `0x${string}`[];

  const encodedParam = encodeAbiParameters([{ name: 'yays', type: 'address[]' }], [proposals]);
  const slate = keccak256(`0x${encodedParam.slice(-64 * proposals.length)}`);
  const slateAlreadyExists = allSlates && allSlates.findIndex(l => l === slate) > -1;
  const slateOrProposals = slateAlreadyExists ? slate : proposals;

  const voteHookParams = {
    slateOrProposals,
    onStart: (hash: `0x${string}`) => {
      setTxStatus(TxStatus.LOADING);
      setTxHash(hash);
    },
    onSuccess: (hash: `0x${string}`) => {
      mutateVotedProposals();
      mutateMkrOnHat();
      setTxStatus(TxStatus.SUCCESS);
      setTxHash(hash);
    },
    onError: () => {
      setTxStatus(TxStatus.ERROR);
    }
  };

  const delegateVote = useDelegateVote({
    ...voteHookParams,
    enabled: !!voteDelegateContractAddress
  });
  const proxyVote = useVoteProxyVote({
    ...voteHookParams,
    enabled: !!voteProxyContractAddress
  });
  const chiefVote = useChiefVote({
    ...voteHookParams,
    enabled: !voteDelegateContractAddress && !voteProxyContractAddress
  });

  const vote = () => {
    setTxStatus(TxStatus.INITIALIZED);
    if (voteDelegateContractAddress) {
      delegateVote.execute();
    } else if (voteProxyContractAddress) {
      proxyVote.execute();
    } else {
      chiefVote.execute();
    }
  };

  const voteDisabled = voteDelegateContractAddress
    ? delegateVote.isLoading || !delegateVote.prepared
    : voteProxyContractAddress
    ? proxyVote.isLoading || !proxyVote.prepared
    : chiefVote.isLoading || !chiefVote.prepared;

  return (
    <DialogOverlay isOpen={true} onDismiss={close}>
      <DialogContent ariaLabel="Executive Vote" widthDesktop="640px">
        {txStatus === TxStatus.IDLE && (
          <DefaultVoteModalView
            proposal={proposal}
            close={close}
            vote={vote}
            voteDisabled={voteDisabled}
            currentSlate={currentSlate}
            isHat={isHat}
            spellAddress={spellAddress}
            hatChecked={hatChecked}
            showHatCheckbox={showHatCheckbox}
            setHatChecked={setHatChecked}
          />
        )}

        {(txStatus === TxStatus.LOADING || txStatus === TxStatus.INITIALIZED) && (
          <TxInProgress txStatus={txStatus} setTxStatus={setTxStatus} txHash={txHash} setTxHash={setTxHash} />
        )}

        {txStatus === TxStatus.SUCCESS && (
          <TxFinal
            title="Transaction Sent"
            description={
              <Flex sx={{ alignItems: 'center', mt: 1 }}>
                <Icon name="info" color="textSecondary" />
                <Text as="p" variant="secondary" sx={{ ml: 1 }}>
                  Your vote may take a few minutes to appear in the Voting Portal
                </Text>
              </Flex>
            }
            buttonLabel="Close"
            onClick={close}
            txHash={txHash}
            success={true}
          />
        )}
        {txStatus === TxStatus.ERROR && <Error close={close} />}
      </DialogContent>
    </DialogOverlay>
  );
};

const Error = ({ close }) => (
  <Flex sx={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
    <Close
      aria-label="close"
      sx={{ height: '20px', width: '20px', p: 0, alignSelf: 'flex-end' }}
      onClick={close}
    />
    <Text as="p" variant="heading" sx={{ fontSize: 6 }}>
      Transaction Failed.
    </Text>
    <Flex sx={{ flexDirection: 'column', alignItems: 'center' }}>
      <Icon name="reviewFailed" size={5} sx={{ my: 3 }} />
      <Text as="p" sx={{ color: 'onSecondary', fontWeight: 'medium', fontSize: '16px' }}>
        Something went wrong with your transaction. Please try again.
      </Text>
      <Button
        onClick={close}
        sx={{ mt: 5, borderColor: 'primary', width: '100%', color: 'primary' }}
        variant="outline"
      >
        Close
      </Button>
    </Flex>
  </Flex>
);

export default VoteModal;
