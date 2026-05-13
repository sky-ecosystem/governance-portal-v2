/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { useState } from 'react';
import { Button, Flex, Text, Box, Link } from 'theme-ui';
import { DialogOverlay, DialogContent } from 'modules/app/components/Dialog';

import Stack from 'modules/app/components/layout/layouts/Stack';
import { MKRInput } from './MKRInput';
import TxIndicators from 'modules/app/components/TxIndicators';
import { BoxWithClose } from 'modules/app/components/BoxWithClose';
import { useMkrBalance } from 'modules/mkr/hooks/useMkrBalance';
import { useApproveUnlimitedToken } from 'modules/web3/hooks/useApproveUnlimitedToken';
import { useAccount } from 'modules/app/hooks/useAccount';
import { useTokenAllowance } from 'modules/web3/hooks/useTokenAllowance';
import { useLock } from '../hooks/useLock';
import { Tokens } from 'modules/web3/constants/tokens';
import { ExternalLink } from 'modules/app/components/ExternalLink';
import { useChainId } from 'wagmi';
import { chiefAddress } from 'modules/contracts/generated';
import { TxStatus } from 'modules/web3/constants/transaction';
import { config } from 'lib/config';

const ModalContent = ({
  close,
  showProxyInfo,
  mutateLockedMkr
}: {
  close: () => void;
  showProxyInfo?: boolean;
  mutateLockedMkr?: () => void;
}): React.ReactElement => {
  const [mkrToDeposit, setMkrToDeposit] = useState(0n);
  const [txStatus, setTxStatus] = useState<TxStatus>(TxStatus.IDLE);

  const { account, voteProxyContractAddress, voteProxyColdAddress } = useAccount();
  const chainId = useChainId();
  const { data: mkrBalance } = useMkrBalance(account);

  const { data: chiefAllowance, mutate: mutateTokenAllowance } = useTokenAllowance(
    Tokens.MKR,
    100000000n,
    account,
    account === voteProxyColdAddress ? (voteProxyContractAddress as string) : chiefAddress[chainId]
  );

  const approve = useApproveUnlimitedToken({
    name: Tokens.MKR,
    addressToApprove: voteProxyContractAddress || chiefAddress[chainId],
    onStart: () => {
      setTxStatus(TxStatus.LOADING);
    },
    onSuccess: () => {
      // Once the approval is successful, return to tx idle so we can lock
      setTxStatus(TxStatus.IDLE);
      mutateTokenAllowance();
    },
    onError: () => {
      setTxStatus(TxStatus.ERROR);
    }
  });

  const lock = useLock({
    mkrToDeposit,
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
    enabled: !!chiefAllowance
  });

  return (
    <BoxWithClose close={close}>
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
                <Text sx={{ color: 'secondaryEmphasis', fontSize: 3 }}>
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
        {txStatus === TxStatus.IDLE && chiefAllowance && (
          <Stack gap={2}>
            <Box sx={{ textAlign: 'center' }}>
              <Text as="p" variant="microHeading">
                Deposit into voting contract
              </Text>
              <Text as="p" sx={{ color: 'secondaryEmphasis', fontSize: 3, mt: 3 }}>
                Input the amount of MKR to deposit into the voting contract.
              </Text>
            </Box>

            <Box>
              <MKRInput value={mkrToDeposit} onChange={setMkrToDeposit} balance={mkrBalance} />
            </Box>

            <Button
              data-testid="button-deposit-mkr"
              sx={{ flexDirection: 'column', width: '100%', alignItems: 'center' }}
              disabled={
                mkrToDeposit === 0n || mkrToDeposit > (mkrBalance || 0n) || lock.isLoading || !lock.prepared
              }
              onClick={() => {
                setTxStatus(TxStatus.INITIALIZED);
                lock.execute();
              }}
            >
              Deposit MKR
            </Button>
          </Stack>
        )}
        {txStatus === TxStatus.IDLE && !chiefAllowance && (
          <Stack gap={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Text as="p" variant="microHeading">
                Approve voting contract
              </Text>
              <Text as="p" sx={{ color: 'secondaryEmphasis', fontSize: 3, mt: 3 }}>
                Approve the transfer of MKR to the voting contract.
              </Text>
            </Box>

            <Button
              sx={{ flexDirection: 'column', width: '100%', alignItems: 'center' }}
              disabled={approve.isLoading || !approve.prepared}
              onClick={() => {
                setTxStatus(TxStatus.INITIALIZED);
                approve.execute();
              }}
              data-testid="deposit-approve-button"
            >
              Approve
            </Button>
            {showProxyInfo && (
              <Text as="p" sx={{ fontSize: 2, mt: 3, color: 'textSecondary', textAlign: 'center' }}>
                Advanced users interested in creating a{' '}
                <ExternalLink
                  href="https://blog.makerdao.com/the-makerdao-voting-proxy-contract/"
                  title="Read about proxy contracts"
                >
                  <Text sx={{ color: 'accentBlue', fontSize: 2 }}>vote proxy contract</Text>
                </ExternalLink>{' '}
                instead of depositing directly into Chief can learn how to create one{' '}
                <ExternalLink
                  href="https://dux.makerdao.network/how-to-create-a-vote-proxy-manually-using-etherscan"
                  title="Etherscan guide"
                >
                  <Text sx={{ color: 'accentBlue', fontSize: 2 }}>here</Text>
                </ExternalLink>
              </Text>
            )}
          </Stack>
        )}
      </Box>
    </BoxWithClose>
  );
};

const Deposit = ({
  link,
  showProxyInfo,
  mutateLockedMkr
}: {
  link?: string;
  showProxyInfo?: boolean;
  mutateLockedMkr?: () => void;
}): JSX.Element => {
  const { account, voteProxyContractAddress, voteProxyHotAddress } = useAccount();
  const [showDialog, setShowDialog] = useState(false);

  const open = () => {
    if (account && voteProxyContractAddress && account === voteProxyHotAddress) {
      alert(
        'You are using the hot wallet for a voting proxy. ' +
          'You can only deposit from the cold wallet. ' +
          'Switch to that wallet to continue.'
      );
      return;
    }
    setShowDialog(true);
  };

  return (
    <>
      <DialogOverlay isOpen={showDialog} onDismiss={() => setShowDialog(false)}>
        <DialogContent ariaLabel="Executive Vote" widthDesktop="520px">
          <ModalContent
            close={() => setShowDialog(false)}
            showProxyInfo={showProxyInfo}
            mutateLockedMkr={mutateLockedMkr}
          />
        </DialogContent>
      </DialogOverlay>
      {link ? (
        <Link
          onClick={() => {
            open();
          }}
          sx={{ textDecoration: 'underline', cursor: 'pointer' }}
        >
          {link}
        </Link>
      ) : (
        <Button
          variant="mutedOutline"
          onClick={() => {
            open();
          }}
          disabled={config.READ_ONLY}
          data-testid="deposit-button"
        >
          Deposit
        </Button>
      )}
    </>
  );
};

export default Deposit;
