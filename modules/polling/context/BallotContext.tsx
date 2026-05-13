/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { fetchJson } from 'lib/fetchJson';
import { localStorage } from 'modules/app/client/storage/localStorage';
import { useAccount } from 'modules/app/hooks/useAccount';
import { signTypedBallotData } from 'modules/web3/helpers/signTypedBallotData';
import { useNetwork } from 'modules/app/hooks/useNetwork';
import useTransactionsStore, {
  transactionsApi,
  transactionsSelectors
} from 'modules/web3/stores/transactions';
import { Transaction } from 'modules/web3/types/transaction';
import React, { ReactNode, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import shallow from 'zustand/shallow';
import { Ballot, BallotVote } from '../types/ballot';
import { parsePollOptions } from 'modules/polling/helpers/parsePollOptions';
import logger from 'lib/logger';
import { Transaction as ViemTransaction } from 'viem';
import { getGaslessNetwork } from 'modules/web3/helpers/chain';
import { getGaslessTransaction } from 'modules/web3/helpers/getGaslessTransaction';
import { isBefore, sub } from 'date-fns';

type BallotSteps =
  | 'initial'
  | 'method-select'
  | 'submitting'
  | 'awaiting-relayer'
  | 'in-relayer-queue'
  | 'stuck-in-queue'
  | 'tx-pending'
  | 'tx-error';
type BallotSubmissionMethod = 'standard' | 'gasless';

import { ONE_HOUR_IN_MS } from 'modules/app/constants/time';
import { useAllUserVotes } from '../hooks/useAllUserVotes';
import { SupportedNetworks } from 'modules/web3/constants/networks';

import { ONE_DAY_IN_MS } from 'modules/app/constants/time';
import { parseTxError } from 'modules/web3/helpers/errors';
import { backoffRetry } from 'lib/utils';
import { useWriteContractFlow } from 'modules/web3/hooks/useWriteContractFlow';
import { voteDelegateAbi } from 'modules/contracts/ethers/abis';
import { useChainId, usePublicClient, useSignTypedData } from 'wagmi';
import {
  pollingAbi,
  pollingAddress,
  pollingArbitrumAbi,
  pollingArbitrumAddress
} from 'modules/contracts/generated';
import { getGaslessPublicClient } from 'modules/web3/helpers/getPublicClient';
import { SupportedChainId } from 'modules/web3/constants/chainID';
import { config } from 'lib/config';

interface ContextProps {
  ballot: Ballot;
  transaction?: Transaction;
  previousBallot: Ballot;
  updateVoteFromBallot: (pollId: number, ballotVote: Partial<BallotVote>) => void;
  removeVoteFromBallot: (pollId: number) => void;
  addVoteToBallot: (pollId: number, ballotVote: Partial<BallotVote>) => void;
  isVotePrepared: boolean;
  submitBallot: () => void;
  submitBallotGasless: () => void;
  clearBallot: () => void;
  isPollOnBallot: (pollId: number) => boolean;
  ballotCount: number;
  setStep: (step: BallotSteps) => void;
  ballotStep: BallotSteps;
  submissionError?: string;
  submissionMethod: BallotSubmissionMethod | null;
  setSubmissionMethod: (method: BallotSubmissionMethod) => void;
  close: () => void;
}

export const BallotContext = React.createContext<ContextProps>({
  ballot: {},
  previousBallot: {},
  updateVoteFromBallot: (pollId: number, ballotVote: Partial<BallotVote>) => null,
  addVoteToBallot: (pollId: number, ballotVote: Partial<BallotVote>) => null,
  clearBallot: () => null,
  removeVoteFromBallot: (pollId: number) => null,
  isVotePrepared: false,
  submitBallot: () => null,
  submitBallotGasless: () => null,
  isPollOnBallot: (pollId: number) => false,
  ballotCount: 0,
  setStep: (step: BallotSteps) => null,
  submissionError: undefined,
  ballotStep: 'initial',
  submissionMethod: null,
  setSubmissionMethod: (method: BallotSubmissionMethod) => null,
  close: () => null
});

type PropTypes = {
  children: ReactNode;
};

export const BallotProvider = ({ children }: PropTypes): React.ReactElement => {
  // Current ballot
  const [ballot, setBallot] = useState<Ballot>({});
  // Used to track the active transaction
  const [txId, setTxId] = useState<string | null>(null);

  const [ballotStep, setBallotStep] = useState<BallotSteps>('initial');

  const [submissionError, setSubmissionError] = useState<string | undefined>();

  const [submissionMethod, setSubmissionMethod] = useState<BallotSubmissionMethod | null>(null);

  // Stores previous voted polls
  const [previousBallot, setPreviousBallot] = useState<Ballot>({});

  const { account, voteDelegateContractAddress, votingAccount } = useAccount();

  const publicClient = usePublicClient();
  const network = useNetwork();
  const chainId = useChainId();

  // Import the hook with the current user votes to mutate after voting.
  const { mutate: mutatePreviousVotes } = useAllUserVotes(votingAccount);

  const clearBallot = () => {
    updateBallot({});
  };

  const updateBallot = (val: Ballot) => {
    setBallot(val);
    localStorage.set(`ballot-${network}-${account}`, JSON.stringify(val), ONE_DAY_IN_MS);
  };

  const loadBallotFromStorage = async () => {
    const prevBallot = localStorage.get(`ballot-${network}-${account}`);
    if (prevBallot) {
      try {
        const parsed = JSON.parse(prevBallot);
        const votes = {};
        Object.keys(parsed).forEach(async pollId => {
          const vote = parsed[pollId] as BallotVote;

          // https://viem.sh/docs/actions/public/getTransactionReceipt#gettransactionreceipt
          const tx = vote.transactionHash
            ? await publicClient?.getTransactionReceipt({ hash: vote.transactionHash as `0x${string}` })
            : null;

          // If the vote has a confirmed transaction, do not add it to the ballot. If the transactionReceipt is null it means it has not been mined.
          tx?.type;
          if (!tx) {
            votes[pollId] = parsed[pollId];
          }
        });

        // Update the filtered ballot
        updateBallot(votes);
      } catch (e) {
        logger.error('loadBallotFromStorage: unable to load ballot from storage', e);
        // Do nothing
        updateBallot({});
      }
    } else {
      setBallot({});
    }
  };

  // Reset ballot on network change
  useEffect(() => {
    setPreviousBallot({});
    loadBallotFromStorage();
  }, [network, account]);

  // add vote to ballot

  const addVoteToBallot = (pollId: number, ballotVote: Partial<BallotVote>) => {
    setTxId(null);
    setStep('initial');
    const newBallot = {
      ...ballot,
      [pollId]: {
        ...ballotVote
      } as BallotVote
    };
    updateBallot(newBallot);
  };

  const removeVoteFromBallot = (pollId: number) => {
    setTxId(null);
    setStep('initial');

    const { [pollId]: pollToDelete, ...rest } = ballot;
    updateBallot(rest);
  };

  const updateVoteFromBallot = (pollId: number, ballotVote: Partial<BallotVote>) => {
    setTxId(null);
    setStep('initial');
    const newBallot = {
      ...ballot,
      [pollId]: {
        ...ballot[pollId],
        ...ballotVote
      }
    };
    updateBallot(newBallot);
  };

  // Helpers
  const isPollOnBallot = (pollId: number): boolean => {
    // Checks that the option voted is not null or undefined
    return ballot[pollId] && typeof ballot[pollId].option !== 'undefined' && ballot[pollId].option !== null;
  };

  // Ballot submission
  const [track, transaction] = useTransactionsStore(
    state => [state.track, txId ? transactionsSelectors.getTransaction(state, txId) : undefined],
    shallow
  );

  const onPendingHandler = (txHash: string) => {
    setStep('tx-pending');
    // Update ballot to include the txHash
    const votes = {};
    Object.keys(ballot).forEach(pollId => {
      votes[pollId] = ballot[pollId];
      votes[pollId].transactionHash = txHash;
    });

    updateBallot({
      ...votes
    });
  };

  const onMinedHandler = () => {
    // Set previous ballot
    setPreviousBallot({
      ...previousBallot,
      ...ballot
    });

    clearBallot();
    mutatePreviousVotes();
  };

  const onErrorHandler = (error: string | undefined) => {
    setSubmissionError(error);
    setStep('tx-error');
    toast.error('Error submitting ballot');
  };

  const trackPollVote = (
    voteTxCreator: () => Promise<ViemTransaction>,
    gaslessNetwork?: SupportedNetworks
  ) => {
    const txId = track(
      voteTxCreator,
      account,
      `Voting on ${Object.keys(ballot).length} poll${Object.keys(ballot).length > 1 ? 's' : ''}`,
      {
        pending: txHash => {
          onPendingHandler(txHash);
        },
        mined: txId => {
          onMinedHandler();
          transactionsApi
            .getState()
            .setMessage(
              txId,
              `Voted on ${Object.keys(ballot).length} poll${Object.keys(ballot).length > 1 ? 's' : ''}`
            );
        },
        error: (_, error) => {
          onErrorHandler(error);
        }
      },
      gaslessNetwork
    );
    setTxId(txId);
  };

  const pollIds: bigint[] = [];
  const pollOptions: string[] = [];

  Object.keys(ballot).forEach((key: string) => {
    if (isPollOnBallot(parseInt(key, 10))) {
      pollIds.push(BigInt(key));
      pollOptions.push(ballot[key].option);
    }
  });

  const optionIds = parsePollOptions(pollOptions).map(option => BigInt(option));

  const delegatePollVote = useWriteContractFlow({
    address: voteDelegateContractAddress as `0x${string}` | undefined,
    abi: voteDelegateAbi,
    functionName: 'votePoll',
    args: [pollIds, optionIds],
    chainId,
    enabled: !!voteDelegateContractAddress && !config.READ_ONLY,
    onStart: (txHash: string) => {
      onPendingHandler(txHash);
    },
    onSuccess: () => {
      onMinedHandler();
    },
    onError: (error: Error) => {
      onErrorHandler(error.message);
    }
  });

  const directPollVote = useWriteContractFlow({
    address: pollingAddress[chainId],
    abi: pollingAbi,
    functionName: 'vote',
    args: [pollIds, optionIds],
    chainId,
    enabled: !voteDelegateContractAddress && !config.READ_ONLY,
    onStart: (txHash: string) => {
      onPendingHandler(txHash);
    },
    onSuccess: () => {
      onMinedHandler();
    },
    onError: (error: Error) => {
      onErrorHandler(error.message);
    }
  });

  const { signTypedDataAsync } = useSignTypedData();

  const pollVote = voteDelegateContractAddress ? delegatePollVote : directPollVote;

  const isVotePrepared = submissionMethod === 'standard' && pollVote.prepared && !pollVote.isLoading;

  const submitBallot = () => {
    if (!pollVote.prepared || pollVote.isLoading) {
      return;
    }

    setStep('submitting');
    pollVote.execute();
  };

  const submitBallotGasless = async () => {
    if (!account) {
      return;
    }

    const pollIds: string[] = [];
    const pollOptions: string[] = [];

    setStep('submitting');

    Object.keys(ballot).forEach((key: string) => {
      if (isPollOnBallot(parseInt(key, 10))) {
        pollIds.push(key);
        pollOptions.push(ballot[key].option);
      }
    });

    const optionIds = parsePollOptions(pollOptions);

    const gaslessPublicClient = getGaslessPublicClient(chainId);

    const nonce = await gaslessPublicClient.readContract({
      address:
        chainId === SupportedChainId.TENDERLY
          ? pollingArbitrumAddress[SupportedChainId.ARBITRUMTESTNET]
          : pollingArbitrumAddress[SupportedChainId.ARBITRUM],
      abi: pollingArbitrumAbi,
      functionName: 'nonces',
      args: [account as `0x${string}`]
    });
    const signatureValues = {
      voter: account.toLowerCase(),
      pollIds,
      optionIds,
      nonce: Number(nonce),
      expiry: Math.trunc((Date.now() + 8 * ONE_HOUR_IN_MS) / 1000) //8 hour expiry
    };

    let signature;
    try {
      signature = await signTypedBallotData(signatureValues, signTypedDataAsync, network);
      setStep('awaiting-relayer');
    } catch (error) {
      toast.error(error);
      setSubmissionError(parseTxError(error));
      setStep('tx-error');
    }

    if (signature) {
      try {
        const gaslessTx = await fetchJson(`/api/polling/vote?network=${network}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ...signatureValues, signature, network })
        });

        setStep('in-relayer-queue');

        const voteTxCreator = () => getGaslessTransaction(gaslessPublicClient, gaslessTx.hash);
        trackPollVote(voteTxCreator, getGaslessNetwork(network));

        if (gaslessTx.status !== 'mined') {
          const url = `/api/polling/relayer-tx?network=${network}&txId=${gaslessTx.transactionId}`;
          backoffRetry(
            10,
            () =>
              fetchJson(url).then(tx => {
                // gaslessTx.status can be: 'pending' | 'sent' | 'submitted' | 'inmempool' | 'mined' | 'confirmed' | 'failed'
                if (tx.status === 'failed') {
                  logger.error('Gasless vote failed', tx);
                  // check if failed
                  setStep('tx-error');
                } else if (isBefore(new Date(gaslessTx.sentAt), sub(new Date(), { seconds: 30 }))) {
                  // if 30 seconds passed, let user know it might be stuck in queue
                  setStep('stuck-in-queue');
                } else {
                  throw new Error('Not mined');
                }
              }),
            5000
          );
        }
      } catch (error) {
        const errorMessage = error.message ? error.message : error;
        toast.error(errorMessage);
        setSubmissionError(errorMessage);
        setStep('tx-error');
      }
    }
  };

  const setStep = (step: BallotSteps) => {
    setBallotStep(step);
  };

  const close = () => {
    setTxId(null);
    setStep('initial');
    setSubmissionMethod(null);
  };

  useEffect(() => {
    loadBallotFromStorage();
  }, []);

  return (
    <BallotContext.Provider
      value={{
        ballot,
        previousBallot,
        clearBallot,
        addVoteToBallot,
        removeVoteFromBallot,
        updateVoteFromBallot,
        submitBallot,
        submitBallotGasless,
        isVotePrepared,
        transaction,
        isPollOnBallot,
        ballotCount: Object.keys(ballot).length,
        setStep,
        ballotStep,
        submissionError,
        submissionMethod,
        setSubmissionMethod,
        close
      }}
    >
      {children}
    </BallotContext.Provider>
  );
};
