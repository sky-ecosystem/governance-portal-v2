/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { useState } from 'react';
import { Box, Text } from 'theme-ui';
import { Delegate, DelegateInfo, DelegatePaginated } from '../../types';
import { useMkrDelegatedByUser } from 'modules/mkr/hooks/useMkrDelegatedByUser';
import { BoxWithClose } from 'modules/app/components/BoxWithClose';
import { ApprovalContent, InputDelegateMkr, TxDisplay } from 'modules/delegates/components';
import { useTokenAllowance } from 'modules/web3/hooks/useTokenAllowance';
import { useDelegateFree } from 'modules/delegates/hooks/useDelegateFree';
import { useApproveUnlimitedToken } from 'modules/web3/hooks/useApproveUnlimitedToken';
import { useAccount } from 'modules/app/hooks/useAccount';
import { Tokens } from 'modules/web3/constants/tokens';
import { formatValue } from 'lib/string';
import DelegateAvatarName from '../DelegateAvatarName';
import { DialogContent, DialogOverlay } from 'modules/app/components/Dialog';
import { ExternalLink } from 'modules/app/components/ExternalLink';
import { TxStatus } from 'modules/web3/constants/transaction';

type Props = {
  isOpen: boolean;
  onDismiss: () => void;
  delegate: Delegate | DelegatePaginated | DelegateInfo;
  mutateTotalStaked: (amount?: bigint) => void;
  mutateMKRDelegated: () => void;
  refetchOnDelegation?: boolean;
};

export const UndelegateModal = ({
  isOpen,
  onDismiss,
  delegate,
  mutateTotalStaked,
  mutateMKRDelegated,
  refetchOnDelegation = true
}: Props): JSX.Element => {
  const { account } = useAccount();
  const voteDelegateAddress = delegate.voteDelegateAddress;
  const [mkrToWithdraw, setMkrToWithdraw] = useState(0n);
  const [txStatus, setTxStatus] = useState<TxStatus>(TxStatus.IDLE);
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();

  const { data: mkrDelegatedData } = useMkrDelegatedByUser(account, voteDelegateAddress);
  const sealDelegated = mkrDelegatedData?.sealDelegationAmount;
  const directDelegated = mkrDelegatedData?.directDelegationAmount;
  const { data: iouAllowance, mutate: mutateTokenAllowance } = useTokenAllowance(
    Tokens.IOU,
    100000000n,
    account,
    voteDelegateAddress
  );

  const approve = useApproveUnlimitedToken({
    name: Tokens.IOU,
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
      free.retryPrepare();
    },
    onError: () => {
      setTxStatus(TxStatus.ERROR);
    }
  });

  const free = useDelegateFree({
    voteDelegateAddress,
    mkrToWithdraw,
    onStart: (hash: `0x${string}`) => {
      setTxHash(hash);
      setTxStatus(TxStatus.LOADING);
    },
    onSuccess: (hash: `0x${string}`) => {
      setTxHash(hash);
      setTxStatus(TxStatus.SUCCESS);
      refetchOnDelegation ? mutateTotalStaked() : mutateTotalStaked(mkrToWithdraw * -1n);
      mutateMKRDelegated();
    },
    onError: () => {
      setTxStatus(TxStatus.ERROR);
    },
    enabled: !!iouAllowance && !!mkrToWithdraw
  });

  const onClose = () => {
    setTxStatus(TxStatus.IDLE);
    setTxHash(undefined);
    onDismiss();
  };

  return (
    <>
      <DialogOverlay isOpen={isOpen} onDismiss={onClose}>
        <DialogContent widthDesktop="580px" ariaLabel="Undelegate modal">
          <BoxWithClose close={onClose}>
            <Box>
              {txStatus !== TxStatus.IDLE ? (
                <TxDisplay
                  txStatus={txStatus}
                  setTxStatus={setTxStatus}
                  txHash={txHash}
                  setTxHash={setTxHash}
                  onDismiss={onClose}
                  title={'Undelegating MKR'}
                  description={`You undelegated ${formatValue(mkrToWithdraw, 'wad', 6)} from ${
                    delegate.name
                  }`}
                >
                  <Box sx={{ textAlign: 'left', margin: '0 auto', p: 3 }}>
                    <DelegateAvatarName delegate={delegate} />
                  </Box>
                </TxDisplay>
              ) : (
                <>
                  {directDelegated && iouAllowance ? (
                    <InputDelegateMkr
                      title="Withdraw from delegate contract"
                      description="Input the amount of MKR to withdraw from the delegate contract."
                      onChange={setMkrToWithdraw}
                      balance={directDelegated}
                      buttonLabel="Undelegate MKR"
                      onClick={() => {
                        setTxStatus(TxStatus.INITIALIZED);
                        free.execute();
                      }}
                      disabled={free.isLoading || !free.prepared}
                      showAlert={false}
                      disclaimer={
                        sealDelegated && sealDelegated > 0n ? (
                          <Text variant="smallText" sx={{ color: 'secondaryEmphasis', mt: 3 }}>
                            Your {formatValue(sealDelegated)} MKR delegated through the Seal module must be
                            undelegated from the{' '}
                            <ExternalLink title="Sky app" href="https://app.sky.money/?widget=seal">
                              <span>Sky app</span>
                            </ExternalLink>
                            .
                          </Text>
                        ) : undefined
                      }
                    />
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
                        'Approve the transfer of IOU tokens to the delegate contract to withdraw your MKR.'
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
