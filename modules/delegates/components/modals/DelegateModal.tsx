/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { useState, useEffect } from 'react';
import { Box } from 'theme-ui';
import { useMkrBalance } from 'modules/mkr/hooks/useMkrBalance';
import { Delegate, DelegateInfo, DelegatePaginated } from '../../types';
import { BoxWithClose } from 'modules/app/components/BoxWithClose';
import { InputDelegateMkr } from './InputDelegateMkr';
import { ApprovalContent } from './Approval';
import { TxDisplay } from './TxDisplay';
import { ConfirmContent } from './Confirm';
import { useTokenAllowance } from 'modules/web3/hooks/useTokenAllowance';
import { useDelegateLock } from 'modules/delegates/hooks/useDelegateLock';
import { useApproveUnlimitedToken } from 'modules/web3/hooks/useApproveUnlimitedToken';
import { useAccount } from 'modules/app/hooks/useAccount';
import { Tokens } from 'modules/web3/constants/tokens';
import { formatValue } from 'lib/string';
import DelegateAvatarName from '../DelegateAvatarName';
import { DialogContent, DialogOverlay } from 'modules/app/components/Dialog';
import { TxStatus } from 'modules/web3/constants/transaction';

type Props = {
  isOpen: boolean;
  onDismiss: () => void;
  delegate: Delegate | DelegatePaginated | DelegateInfo;
  mutateTotalStaked: (amount?: bigint) => void;
  mutateMKRDelegated: () => void;
  title?: string;
  refetchOnDelegation?: boolean;
};

export const DelegateModal = ({
  isOpen,
  onDismiss,
  delegate,
  mutateTotalStaked,
  mutateMKRDelegated,
  title = 'Deposit into delegate contract',
  refetchOnDelegation = true
}: Props): JSX.Element => {
  const { account } = useAccount();

  const voteDelegateAddress = delegate.voteDelegateAddress;
  const [mkrToDeposit, setMkrToDeposit] = useState(0n);
  const [confirmStep, setConfirmStep] = useState(false);
  const [txStatus, setTxStatus] = useState<TxStatus>(TxStatus.IDLE);
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();

  const { data: mkrBalance, mutate: mutateMkrBalance } = useMkrBalance(account);

  const { data: mkrAllowance, mutate: mutateTokenAllowance } = useTokenAllowance(
    Tokens.MKR,
    100000000n,
    account,
    voteDelegateAddress
  );

  const approve = useApproveUnlimitedToken({
    name: Tokens.MKR,
    addressToApprove: voteDelegateAddress,
    onStart: (hash: `0x${string}`) => {
      setTxHash(hash);
      setTxStatus(TxStatus.LOADING);
    },
    onSuccess: () => {
      // Once the approval is successful, return to tx idle so we can lock
      setTxStatus(TxStatus.IDLE);
      setTxHash(undefined);
      mutateTokenAllowance();
      lock.retryPrepare();
    },
    onError: () => {
      setTxStatus(TxStatus.ERROR);
    }
  });

  const lock = useDelegateLock({
    voteDelegateAddress,
    mkrToDeposit,
    onStart: (hash: `0x${string}`) => {
      setTxHash(hash);
      setTxStatus(TxStatus.LOADING);
    },
    onSuccess: (hash: `0x${string}`) => {
      setTxHash(hash);
      setTxStatus(TxStatus.SUCCESS);
      refetchOnDelegation ? mutateTotalStaked() : mutateTotalStaked(mkrToDeposit);
      mutateMKRDelegated();
      mutateMkrBalance();
    },
    onError: () => {
      setTxStatus(TxStatus.ERROR);
    },
    enabled: !!mkrAllowance && !!mkrToDeposit
  });

  const onClose = () => {
    setTxStatus(TxStatus.IDLE);
    setTxHash(undefined);
    onDismiss();
  };

  useEffect(() => {
    // Reset the confirmation step
    setConfirmStep(false);
  }, [isOpen]);

  return (
    <>
      <DialogOverlay isOpen={isOpen} onDismiss={onClose}>
        <DialogContent ariaLabel="Delegate modal" widthDesktop="580px">
          <BoxWithClose close={onClose}>
            <Box>
              {txStatus !== TxStatus.IDLE ? (
                <TxDisplay
                  txStatus={txStatus}
                  setTxStatus={setTxStatus}
                  txHash={txHash}
                  setTxHash={setTxHash}
                  onDismiss={onClose}
                  title={`Delegating to ${delegate.name}`}
                  description={`Congratulations, you delegated ${formatValue(
                    mkrToDeposit,
                    'wad',
                    6
                  )} MKR to ${delegate.name}.`}
                >
                  <Box sx={{ textAlign: 'left', margin: '0 auto', p: 3 }}>
                    <DelegateAvatarName delegate={delegate} />
                  </Box>
                </TxDisplay>
              ) : (
                <>
                  {mkrAllowance ? (
                    confirmStep ? (
                      <ConfirmContent
                        mkrToDeposit={mkrToDeposit}
                        delegate={delegate}
                        onClick={() => {
                          setTxStatus(TxStatus.INITIALIZED);
                          lock.execute();
                        }}
                        disabled={
                          mkrToDeposit === 0n ||
                          mkrToDeposit > (mkrBalance || 0n) ||
                          lock.isLoading ||
                          !lock.prepared
                        }
                        onBack={() => setConfirmStep(false)}
                      />
                    ) : (
                      <InputDelegateMkr
                        title={title}
                        description="Input the amount of MKR to deposit into the delegate contract."
                        onChange={setMkrToDeposit}
                        balance={mkrBalance}
                        buttonLabel="Delegate MKR"
                        onClick={() => setConfirmStep(true)}
                        showAlert={true}
                      />
                    )
                  ) : (
                    <ApprovalContent
                      onClick={() => {
                        setTxStatus(TxStatus.INITIALIZED);
                        approve.execute();
                      }}
                      disabled={approve.isLoading || !approve.prepared}
                      title={'Approve Delegate Contract'}
                      buttonLabel={'Approve Delegate Contract'}
                      description={
                        'Approve the transfer of MKR tokens to the delegate contract to deposit your MKR.'
                      }
                    />
                  )}
                </>
              )}
            </Box>
          </BoxWithClose>
        </DialogContent>
      </DialogOverlay>
    </>
  );
};
