/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { useState } from 'react';
import { Button, Flex, Text, Box, Alert, Link } from 'theme-ui';
import { DialogOverlay, DialogContent } from 'modules/app/components/Dialog';

import Stack from 'modules/app/components/layout/layouts/Stack';
import { MKRInput } from './MKRInput';
import TxIndicators from 'modules/app/components/TxIndicators';
import { BoxWithClose } from 'modules/app/components/BoxWithClose';
import { useLockedMkr } from 'modules/mkr/hooks/useLockedMkr';
import { useApproveUnlimitedToken } from 'modules/web3/hooks/useApproveUnlimitedToken';
import { useAccount } from 'modules/app/hooks/useAccount';
import { useTokenAllowance } from 'modules/web3/hooks/useTokenAllowance';
import { useFree } from '../hooks/useFree';
import { Tokens } from 'modules/web3/constants/tokens';
import { useChainId } from 'wagmi';
import { chiefAddress } from 'modules/contracts/generated';
import { TxStatus } from 'modules/web3/constants/transaction';

const ModalContent = ({ close, mutateLockedMkr, ...props }) => {
  const { account, voteProxyContractAddress, voteProxyHotAddress } = useAccount();
  const chainId = useChainId();

  const [mkrToWithdraw, setMkrToWithdraw] = useState(0n);
  const [txStatus, setTxStatus] = useState<TxStatus>(TxStatus.IDLE);

  const { data: allowance, mutate: mutateTokenAllowance } = useTokenAllowance(
    Tokens.IOU,
    100000000n,
    account,
    voteProxyContractAddress ? undefined : chiefAddress[chainId]
  );

  const approve = useApproveUnlimitedToken({
    name: Tokens.IOU,
    addressToApprove: chiefAddress[chainId],
    onStart: () => {
      setTxStatus(TxStatus.LOADING);
    },
    onSuccess: () => {
      // Once the approval is successful, return to tx idle so we can free
      setTxStatus(TxStatus.IDLE);
      mutateTokenAllowance();
    },
    onError: () => {
      setTxStatus(TxStatus.ERROR);
    }
  });

  const allowanceOk = voteProxyContractAddress ? true : allowance; // no need for IOU approval when using vote proxy

  const { data: lockedMkr } = useLockedMkr(voteProxyContractAddress || account);

  const free = useFree({
    mkrToWithdraw,
    onStart: () => {
      setTxStatus(TxStatus.LOADING);
    },
    onSuccess: () => {
      setTxStatus(TxStatus.SUCCESS);
      mutateLockedMkr?.();
    },
    onError: () => {
      setTxStatus(TxStatus.ERROR);
    },
    enabled: !!allowanceOk
  });

  return (
    <BoxWithClose close={close} {...props}>
      <Box>
        {txStatus !== TxStatus.IDLE && (
          <Stack sx={{ textAlign: 'center' }}>
            <Text as="p" variant="microHeading">
              {txStatus === TxStatus.LOADING
                ? 'Transaction Pending'
                : txStatus === TxStatus.SUCCESS
                ? 'Transaction Successful'
                : txStatus === TxStatus.ERROR
                ? 'Transaction Error'
                : 'Confirm Transaction'}
            </Text>

            <Flex sx={{ justifyContent: 'center' }}>
              {txStatus === TxStatus.SUCCESS ? (
                <TxIndicators.Success sx={{ width: 6 }} />
              ) : txStatus === TxStatus.ERROR ? (
                <TxIndicators.Failed sx={{ width: 6 }} />
              ) : (
                <TxIndicators.Pending sx={{ width: 6 }} />
              )}
            </Flex>

            {txStatus === TxStatus.INITIALIZED && (
              <Box>
                <Text as="p" sx={{ color: 'secondaryEmphasis', fontSize: 3 }}>
                  Please use your wallet to confirm this transaction.
                </Text>
                <Text
                  as="p"
                  sx={{ color: 'secondary', cursor: 'pointer', fontSize: 2, mt: 2 }}
                  onClick={() => setTxStatus(TxStatus.IDLE)}
                >
                  Cancel
                </Text>
              </Box>
            )}
          </Stack>
        )}
        {txStatus === TxStatus.IDLE && allowanceOk && (
          <Stack gap={2}>
            <Box sx={{ textAlign: 'center' }}>
              <Text as="p" variant="microHeading" mb={2}>
                Withdraw from voting contract
              </Text>
              <Text as="p" sx={{ color: 'secondaryEmphasis', fontSize: 3 }}>
                Input the amount of MKR to withdraw from the voting contract.
              </Text>
            </Box>

            <Box>
              <MKRInput
                onChange={setMkrToWithdraw}
                balance={lockedMkr}
                value={mkrToWithdraw}
                balanceText="MKR in contract:"
              />
            </Box>

            {voteProxyContractAddress && account === voteProxyHotAddress && (
              <Alert variant="notice" sx={{ fontWeight: 'normal' }}>
                You are using the hot wallet for a voting proxy. MKR will be withdrawn to the cold wallet.
              </Alert>
            )}
            <Button
              sx={{ flexDirection: 'column', width: '100%', alignItems: 'center', mt: 3 }}
              disabled={
                mkrToWithdraw === 0n ||
                !lockedMkr ||
                mkrToWithdraw > lockedMkr ||
                free.isLoading ||
                !free.prepared
              }
              data-testid="button-withdraw-mkr"
              onClick={() => {
                setTxStatus(TxStatus.INITIALIZED);
                free.execute();
              }}
            >
              Withdraw MKR
            </Button>
          </Stack>
        )}
        {txStatus === TxStatus.IDLE && !allowanceOk && (
          <Stack gap={3} {...props}>
            <Box sx={{ textAlign: 'center' }}>
              <Text as="p" variant="microHeading" mb={2}>
                Approve voting contract
              </Text>
              <Text as="p" sx={{ color: 'secondaryEmphasis', fontSize: 3 }}>
                Approve the transfer of IOU tokens to the voting contract to withdraw your MKR.
              </Text>
            </Box>

            <Button
              sx={{ flexDirection: 'column', width: '100%', alignItems: 'center' }}
              disabled={approve.isLoading || !approve.prepared}
              onClick={() => {
                setTxStatus(TxStatus.INITIALIZED);
                approve.execute();
              }}
              data-testid="withdraw-approve-button"
            >
              Approve
            </Button>
          </Stack>
        )}
      </Box>
    </BoxWithClose>
  );
};

const Withdraw = (props): JSX.Element => {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <>
      <DialogOverlay isOpen={showDialog} onDismiss={() => setShowDialog(false)}>
        <DialogContent ariaLabel="Executive Vote" widthDesktop="520px">
          <ModalContent
            sx={{ px: [3, null] }}
            close={() => setShowDialog(false)}
            mutateLockedMkr={props.mutateLockedMkr}
          />
        </DialogContent>
      </DialogOverlay>
      {props.link ? (
        <Link
          onClick={() => setShowDialog(true)}
          sx={{ textDecoration: 'underline', cursor: 'pointer', color: 'inherit' }}
        >
          {props.link}
        </Link>
      ) : (
        <Button
          variant="mutedOutline"
          onClick={() => setShowDialog(true)}
          {...props}
          data-testid="withdraw-button"
        >
          Withdraw
        </Button>
      )}
    </>
  );
};

export default Withdraw;
