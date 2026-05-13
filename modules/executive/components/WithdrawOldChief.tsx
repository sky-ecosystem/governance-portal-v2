/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { useState } from 'react';
import { Button, Flex, Text, Box, Alert } from 'theme-ui';
import Stack from 'modules/app/components/layout/layouts/Stack';
import TxIndicators from 'modules/app/components/TxIndicators';

import { BoxWithClose } from 'modules/app/components/BoxWithClose';
import { useApproveUnlimitedToken } from 'modules/web3/hooks/useApproveUnlimitedToken';
import { useOldChiefFree } from 'modules/mkr/hooks/useOldChiefFree';
import { useAccount } from 'modules/app/hooks/useAccount';
import { formatValue } from 'lib/string';
import { useTokenAllowance } from 'modules/web3/hooks/useTokenAllowance';
import { Tokens } from 'modules/web3/constants/tokens';
import { DialogContent, DialogOverlay } from 'modules/app/components/Dialog';
import { useChainId, useReadContract } from 'wagmi';
import { chiefOldAbi, chiefOldAddress } from 'modules/contracts/generated';
import { TxStatus } from 'modules/web3/constants/transaction';

// Note this only works on mainnet
// TODO: Check that the amounts for allowance are correct
// TODO: Test with e2e
const ModalContent = ({ close, ...props }) => {
  const { account, voteProxyOldContractAddress, voteProxyOldHotAddress } = useAccount();
  const chainId = useChainId();
  const [txStatus, setTxStatus] = useState<TxStatus>(TxStatus.IDLE);

  const { data: allowance, mutate: mutateTokenAllowance } = useTokenAllowance(
    Tokens.IOU_OLD,
    100000000n,
    account,
    voteProxyOldContractAddress ? undefined : chiefOldAddress[chainId]
  );

  const approve = useApproveUnlimitedToken({
    name: Tokens.IOU_OLD,
    addressToApprove: chiefOldAddress[chainId],
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

  const allowanceOk = voteProxyOldContractAddress ? true : allowance; // no need for IOU approval when using vote proxy

  const lockedMkrKeyOldChief = voteProxyOldContractAddress || account;

  const { data: lockedMkr } = useReadContract({
    address: chiefOldAddress[chainId],
    abi: chiefOldAbi,
    chainId,
    functionName: 'deposits',
    args: [lockedMkrKeyOldChief as `0x${string}`],
    scopeKey: `/user/mkr-locked-old-chief/${lockedMkrKeyOldChief}`,
    query: {
      enabled: !!lockedMkrKeyOldChief
    }
  });

  const free = useOldChiefFree({
    mkrToWithdraw: lockedMkr || 0n,
    onStart: () => {
      setTxStatus(TxStatus.LOADING);
    },
    onSuccess: () => {
      setTxStatus(TxStatus.SUCCESS);
      close();
    },
    onError: () => {
      setTxStatus(TxStatus.ERROR);
      close();
    },
    enabled: !!lockedMkr
  });

  return (
    <BoxWithClose close={close} {...props}>
      <Box>
        {txStatus !== TxStatus.IDLE && (
          <Stack sx={{ textAlign: 'center' }}>
            <Text variant="microHeading">
              {txStatus === TxStatus.LOADING ? 'Transaction Pending' : 'Confirm Transaction'}
            </Text>

            <Flex sx={{ justifyContent: 'center' }}>
              <TxIndicators.Pending sx={{ width: 6 }} />
            </Flex>

            {txStatus !== TxStatus.LOADING && (
              <Box>
                <Text sx={{ color: 'secondaryEmphasis', fontSize: 3 }}>
                  Please use your wallet to confirm this transaction.
                </Text>
                <Text
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
          <Stack gap={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Text variant="microHeading">Withdraw MKR from Chief</Text>
              <Text sx={{ color: 'text', fontSize: 3, mt: 3 }}>
                You are withdrawing <b>{lockedMkr ? formatValue(lockedMkr) : '---'} MKR</b> from the old Chief
                contract back to your wallet.
              </Text>
            </Box>
            {voteProxyOldContractAddress && voteProxyOldHotAddress && (
              <Alert variant="notice" sx={{ fontWeight: 'normal' }}>
                You are using the hot wallet for a voting proxy. MKR will be withdrawn to the cold wallet.
              </Alert>
            )}
            <Button
              sx={{ flexDirection: 'column', width: '100%', alignItems: 'center' }}
              disabled={!lockedMkr || free.isLoading || !free.prepared}
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
              <Text variant="microHeading" mb={2}>
                Approve voting contract
              </Text>
              <Text sx={{ color: 'secondaryEmphasis', fontSize: 3 }}>
                Approve the transfer of IOU tokens to the voting contract to withdraw your MKR.
              </Text>
            </Box>

            <Button
              data-testid="button-approve-voting-contract"
              sx={{ flexDirection: 'column', width: '100%', alignItems: 'center' }}
              disabled={approve.isLoading || !approve.prepared}
              onClick={() => {
                setTxStatus(TxStatus.INITIALIZED);
                approve.execute();
              }}
            >
              Approve
            </Button>
          </Stack>
        )}
      </Box>
    </BoxWithClose>
  );
};

const WithdrawOldChief = (props): JSX.Element => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <DialogOverlay isOpen={showDialog} onDismiss={() => setShowDialog(false)}>
        <DialogContent ariaLabel="Executive Vote" widthDesktop="520px">
          <ModalContent sx={{ px: [3, null] }} close={() => setShowDialog(false)} />
        </DialogContent>
      </DialogOverlay>
      <Button
        onClick={() => setShowDialog(true)}
        {...props}
        variant="primary"
        sx={{
          height: '26px',
          py: 0,
          mx: 1,
          textTransform: 'uppercase',
          fontWeight: 'bold',
          fontSize: '10px'
        }}
      >
        Withdraw
      </Button>
    </>
  );
};

export default WithdrawOldChief;
