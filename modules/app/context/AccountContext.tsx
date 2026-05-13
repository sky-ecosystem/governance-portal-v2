/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import React, { ReactNode } from 'react';
import { useVoteDelegateAddress } from 'modules/delegates/hooks/useVoteDelegateAddress';
import { useVoteProxyAddress } from '../hooks/useVoteProxyAddress';
import { useVoteProxyOldAddress } from '../hooks/useVoteProxyOldAddress';
import { useAccount } from 'wagmi';

interface AccountContextProps {
  account?: string;

  voteDelegateContractAddress?: string;

  voteProxyContractAddress?: string;
  voteProxyHotAddress?: string;
  voteProxyColdAddress?: string;

  voteProxyOldContractAddress?: string;
  voteProxyOldHotAddress?: string;
  voteProxyOldColdAddress?: string;

  // Voting account is either the normal wallet address, the delegateContract address or the vote proxy address
  votingAccount?: string;

  mutate?: () => void;
}

export const AccountContext = React.createContext<AccountContextProps>({ mutate: () => null });

type PropTypes = {
  children: ReactNode;
};

export const AccountProvider = ({ children }: PropTypes): React.ReactElement => {
  const { address: account } = useAccount();

  const { data: voteDelegateContractAddress, mutate: mutateVoteDelegate } = useVoteDelegateAddress(account);

  const { data: voteProxyResponse } = useVoteProxyAddress(account);
  const { data: voteProxyOldResponse } = useVoteProxyOldAddress(account);

  // In order of priority for voting: 1) Delegate contract, 2) Proxy 3) Wallet account
  const votingAccount = voteDelegateContractAddress
    ? voteDelegateContractAddress
    : voteProxyResponse?.voteProxyAddress
    ? voteProxyResponse?.voteProxyAddress
    : account;

  return (
    <AccountContext.Provider
      value={{
        account,

        voteDelegateContractAddress,

        voteProxyContractAddress: voteProxyResponse?.voteProxyAddress,
        voteProxyHotAddress: voteProxyResponse?.hotAddress,
        voteProxyColdAddress: voteProxyResponse?.coldAddress,

        voteProxyOldContractAddress: voteProxyOldResponse?.voteProxyAddress,
        voteProxyOldHotAddress: voteProxyOldResponse?.hotAddress,
        voteProxyOldColdAddress: voteProxyOldResponse?.coldAddress,

        votingAccount,

        mutate: () => {
          mutateVoteDelegate();
        }
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
