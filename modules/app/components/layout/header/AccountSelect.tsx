/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import React, { useEffect, useState } from 'react';
import { Box, Flex, Text, Button, Close, ThemeUICSSObject, Alert } from 'theme-ui';
import Icon from '../../Icon';
import useTransactionStore from 'modules/web3/stores/transactions';
import AccountBox from './AccountBox';
import TransactionBox from './TransactionBox';
import VotingWeight from './VotingWeight';
import ConnectWalletButton from 'modules/web3/components/ConnectWalletButton';
import { NetworkAlertModal, ChainIdError } from 'modules/web3/components/NetworkAlertModal';
import { ErrorBoundary } from '../../ErrorBoundary';
import { useRouter } from 'next/router';
import { isSupportedChain } from 'modules/web3/helpers/chain';
import logger from 'lib/logger';
import { DialogContent, DialogOverlay } from '../../Dialog';
import { useAccount as useAccountWagmi, useConnect, useDisconnect } from 'wagmi';
import { useAccount } from 'modules/app/hooks/useAccount';
import { SupportedConnectors } from 'modules/web3/constants/networks';
import { ExternalLink } from 'modules/app/components/ExternalLink';
import { icons } from 'lib/theme/icons';

const closeButtonStyle: ThemeUICSSObject = {
  height: 4,
  width: 4,
  p: 0,
  position: 'relative',
  top: '-4px',
  left: '8px'
};

const AccountSelect = (): React.ReactElement => {
  const router = useRouter();
  const isFirefox = typeof window !== 'undefined' && navigator.userAgent.toLowerCase().includes('firefox');

  const { connectors, connect } = useConnect({
    mutation: {
      onSuccess: () => {
        close();
      },
      onError: (e, { connector }) => {
        logger.error(e);
        let message = '';

        if ('id' in connector && e.toString().includes('ProviderNotFoundError') && connector.id === 'safe') {
          message = 'Please try connecting from within the Safe{Wallet} app.';
        } else {
          message = 'Something went wrong. Select an option to connect.';
        }

        setError(message);
      }
    }
  });

  const { disconnect } = useDisconnect();
  const { connector: connectedConnector, chainId } = useAccountWagmi();
  const { account: address } = useAccount();

  const [pending, txs] = useTransactionStore(state => [
    state.transactions.findIndex(tx => tx.status === 'pending') > -1,
    state.transactions
  ]);

  const [showDialog, setShowDialog] = useState(false);
  const [changeWallet, setChangeWallet] = useState(false);
  const [chainIdError, setChainIdError] = useState<ChainIdError>(null);

  const close = () => {
    setShowDialog(false);
    setError(null);
  };

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setShowDialog(false);
  }, [router.pathname]);

  useEffect(() => {
    const unsupportedNetwork = chainId && !isSupportedChain(chainId);
    if (unsupportedNetwork) {
      setChainIdError('unsupported network');
    } else {
      setChainIdError(null);
    }
  }, [chainId]);

  const walletOptions = connectors.map((connector, index) => (
    <Flex
      key={connector.id}
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between',
        mt: index !== 0 ? 3 : 0,
        flexDirection: 'column'
      }}
    >
      <Flex sx={{ alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
        <Flex sx={{ alignItems: 'center' }}>
          {(() => {
            const potentialIconName =
              connector.id === 'safe' ? SupportedConnectors.GNOSIS_SAFE : connector.name;
            const iconName = potentialIconName in icons ? potentialIconName : 'wallet';
            return <Icon name={iconName} color="text" />;
          })()}
          <Text sx={{ ml: 3 }}>{connector.name}</Text>
        </Flex>
        <Button
          sx={{ minWidth: '120px' }}
          variant="mutedOutline"
          key={connector.id}
          onClick={() => connect({ connector })}
          data-testid={`select-wallet-${connector.id}`}
          disabled={connectedConnector?.id === connector.id}
        >
          {connectedConnector?.id === connector.id ? 'Connected' : 'Select'}
        </Button>
      </Flex>
      {isFirefox && connector.id === 'metaMaskSDK' && (
        <Alert variant="notice" sx={{ mt: 2, fontSize: 1, width: '100%' }}>
          <span>
            MetaMask is temporarily experiencing issues on Firefox. See{' '}
            <ExternalLink
              href="https://github.com/MetaMask/metamask-extension/pull/31119"
              styles={{ color: 'primary', textDecoration: 'underline' }}
              title="link to https://github.com/MetaMask/metamask-extension/pull/31119"
            >
              <span>this issue</span>
            </ExternalLink>{' '}
            for more details.
          </span>
        </Alert>
      )}
    </Flex>
  ));

  const BackButton = ({ onClick }) => (
    <Flex sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
      <Button variant="textual" color="primary" sx={{ fontSize: 3, px: 0 }} onClick={onClick}>
        <Icon name="chevron_left" color="primary" sx={{ size: '10px', mr: 2 }} />
        Back
      </Button>
      <Close
        sx={closeButtonStyle}
        aria-label="close"
        data-testid="wallet-modal-close-button"
        onClick={close}
      />
    </Flex>
  );

  return (
    <Box sx={{ ml: ['auto', 3, 0] }}>
      <NetworkAlertModal chainIdError={chainIdError} deactivate={disconnect} />
      <ConnectWalletButton
        onClickConnect={() => {
          setShowDialog(true);
        }}
        address={address}
        pending={pending}
      />

      <DialogOverlay isOpen={showDialog} onDismiss={close}>
        <DialogContent ariaLabel="Change Wallet">
          {changeWallet ? (
            <>
              <BackButton onClick={() => setChangeWallet(false)} />
              {walletOptions}
              {error && (
                <Text sx={{ mt: 3 }} variant="error">
                  {error}
                </Text>
              )}
            </>
          ) : (
            <>
              <Flex sx={{ flexDirection: 'row', justifyContent: 'space-between', mb: 3, mt: 1 }}>
                <Text variant="microHeading">{address ? 'Account' : 'Select a Wallet'}</Text>
                <Close
                  aria-label="close"
                  sx={closeButtonStyle}
                  data-testid="wallet-modal-close-button"
                  onClick={close}
                />
              </Flex>
              {address ? (
                <>
                  <ErrorBoundary componentName="Account Details">
                    <AccountBox
                      address={address}
                      accountName={connectedConnector?.name}
                      change={() => setChangeWallet(true)}
                      disconnect={disconnect}
                    />
                  </ErrorBoundary>
                  <Box sx={{ borderBottom: '1px solid secondaryMuted', py: 1 }}>
                    <ErrorBoundary componentName="Voting Weight">
                      <VotingWeight />
                    </ErrorBoundary>
                  </Box>
                  {txs?.length > 0 && <TransactionBox txs={txs} />}
                  <Button
                    variant="primaryOutline"
                    onClick={close}
                    sx={{ display: ['block', 'none'], width: '100%', mt: 4, mb: 2, py: 3 }}
                  >
                    Close
                  </Button>
                </>
              ) : (
                <Flex sx={{ flexDirection: 'column' }}>
                  {walletOptions}
                  {error && (
                    <Text sx={{ mt: 3 }} variant="error">
                      {error}
                    </Text>
                  )}
                </Flex>
              )}
            </>
          )}
        </DialogContent>
      </DialogOverlay>
    </Box>
  );
};

export default AccountSelect;
