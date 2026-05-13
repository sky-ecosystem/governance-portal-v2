/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { Box, Button, Card, Divider, Flex, Text } from 'theme-ui';
import Icon from 'modules/app/components/Icon';
import ActivePollsBox from './ActivePollsBox';
import { useContext, useEffect } from 'react';
import { BallotContext } from '../../context/BallotContext';
import LocalIcon from 'modules/app/components/Icon';
import { ExternalLink } from 'modules/app/components/ExternalLink';
import TxIndicators from 'modules/app/components/TxIndicators';
import { useNetwork } from 'modules/app/hooks/useNetwork';
import { useAccount } from 'wagmi';
import { InternalLink } from 'modules/app/components/InternalLink';
import { TXMined } from 'modules/web3/types/transaction';
import { MIN_MKR_REQUIRED_FOR_GASLESS_VOTING_DISPLAY } from 'modules/polling/polling.constants';
import { fetchJson } from 'lib/fetchJson';
import useSWR from 'swr';
import SkeletonThemed from 'modules/app/components/SkeletonThemed';
import { GASLESS_RATE_LIMIT_IN_MS } from 'modules/polling/polling.constants';
import { parseEther } from 'viem';
import EtherscanLink from 'modules/web3/components/EtherscanLink';

export default function ReviewBox({
  account,
  activePollCount,
  activePollIds,
  ballotPollIds
}: {
  account: string;
  activePollCount: number;
  activePollIds: number[];
  ballotPollIds: string[];
}): JSX.Element {
  const {
    ballotStep,
    setStep,
    ballotCount,
    transaction,
    submissionMethod,
    setSubmissionMethod,
    submitBallot,
    submitBallotGasless,
    isVotePrepared,
    submissionError
  } = useContext(BallotContext);
  const network = useNetwork();
  const { connector } = useAccount();

  const { data: precheckData } = useSWR(
    account && ballotPollIds && ballotPollIds.length > 0 && network
      ? `/api/polling/precheck?network=${network}&voter=${account}&pollIds=${ballotPollIds.join(',')}`
      : null,
    fetchJson
  );

  const hasMkrRequired = precheckData?.hasMkrRequired;
  const recentlyUsedGaslessVoting = precheckData?.recentlyUsedGaslessVoting;
  const alreadyVoted = precheckData?.alreadyVoted;
  const cacheExpired =
    precheckData?.recentlyUsedGaslessVoting &&
    Date.now() - parseInt(precheckData?.recentlyUsedGaslessVoting) > GASLESS_RATE_LIMIT_IN_MS;
  const relayFunded =
    parseEther(precheckData?.relayBalance || '0') > 0n &&
    !(precheckData?.gaslessDisabled?.toString().toLowerCase() === 'true');

  const validationPassed =
    precheckData?.hasMkrRequired &&
    (!precheckData?.recentlyUsedGaslessVoting || cacheExpired) &&
    !precheckData?.alreadyVoted &&
    relayFunded;

  // Detect if the current user is using a gnosis safe, and change the UI for signatures
  const isGnosisSafe = connector?.id === 'safe';

  const canUseGasless = !isGnosisSafe && validationPassed;

  useEffect(() => {
    if (!canUseGasless) {
      setSubmissionMethod('standard');
    }

    if (canUseGasless) {
      setSubmissionMethod('gasless');
    }
  }, [canUseGasless]);

  // Done on the first step, we decide which is the appropiate selected method
  const onClickSubmitBallot = () => {
    if (canUseGasless) {
      setSubmissionMethod('gasless');
    } else {
      setSubmissionMethod('standard');
    }

    setStep('method-select');
  };

  const displayError = submissionError || 'Something went wrong with your transaction.';

  return (
    <Box>
      {ballotStep === 'initial' && (
        <ActivePollsBox activePollCount={activePollCount} activePollIds={activePollIds}>
          <Flex p={3} sx={{ flexDirection: 'column', width: '100%', m: '0' }}>
            <Button
              onClick={onClickSubmitBallot}
              data-testid="submit-ballot-button"
              variant="primaryLarge"
              disabled={!ballotCount || ballotStep !== 'initial'}
              sx={{ width: '100%' }}
            >
              Submit Your Ballot ({ballotCount} vote{ballotCount === 1 ? '' : 's'})
            </Button>
          </Flex>
          <Box>
            <ExternalLink
              href="https://manual.makerdao.com/governance/voting-in-makerdao/gasless-poll-voting"
              title="Learn more about gasless voting"
              styles={{ color: 'text' }}
            >
              <Flex sx={{ alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                <LocalIcon name="sparkles" color="primary" size={3} />{' '}
                <Text sx={{ ml: 2 }}>Poll voting is now gasless!</Text>
              </Flex>
            </ExternalLink>
          </Box>
        </ActivePollsBox>
      )}

      {ballotStep === 'method-select' && (
        <Card variant="compact" p={0}>
          {submissionMethod === 'gasless' && (
            <Box>
              <Box p={3}>
                <Text sx={{ fontWeight: 'semiBold' }} as="p">
                  Gasless voting via Arbitrum
                </Text>
                <Text sx={{ mt: 2 }}>
                  Submit your vote by signing your ballot and sending it to the polling contract on Arbitrum
                  via our relayer.
                </Text>

                <Flex sx={{ alignItems: 'center', mt: 3 }}>
                  <Box sx={{ pt: '3px', mr: 1 }}>
                    <Icon name="info" color="textSecondary" size={14} />
                  </Box>
                  <Text sx={{ fontSize: 1, color: 'textSecondary' }}>
                    You don&apos;t need to switch networks.
                  </Text>
                </Flex>
                <Button
                  onClick={() => {
                    submitBallotGasless();
                  }}
                  variant="primaryLarge"
                  data-testid="submit-ballot-gasless-button"
                  disabled={
                    !ballotCount || !!(transaction && transaction?.status !== 'error') || !canUseGasless
                  }
                  sx={{ mt: 3, width: '100%' }}
                >
                  Proceed with gasless voting
                </Button>
                <Box>
                  <Flex sx={{ alignItems: 'center', justifyContent: 'center', mt: 3 }}>
                    <LocalIcon name="sparkles" color="primary" size={3} />
                    <Text sx={{ ml: 2 }}>The transaction fee is covered by Maker.</Text>
                  </Flex>
                  <Box>
                    <ExternalLink
                      title="Learn more"
                      href={'https://manual.makerdao.com/governance/voting-in-makerdao/gasless-poll-voting'}
                    >
                      <Text as="p" sx={{ fontSize: [1, 3], textAlign: 'center' }}>
                        Learn more
                        <Icon sx={{ ml: 2 }} name="arrowTopRight" size={2} />
                      </Text>
                    </ExternalLink>
                  </Box>
                </Box>
              </Box>

              <Divider />

              <Box p={3}>
                <Button
                  onClick={() => {
                    setSubmissionMethod('standard');
                  }}
                  variant="primaryOutline"
                  data-testid="switch-to-legacy-voting-button"
                  sx={{ width: '100%' }}
                >
                  <Flex sx={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Switch to legacy voting</Text>
                  </Flex>
                </Button>
              </Box>
            </Box>
          )}
          {submissionMethod === 'standard' && (
            <Box>
              <Box p={3}>
                <Text sx={{ fontWeight: 'semiBold' }} as="p">
                  Legacy voting on Mainnet
                </Text>
                <Text sx={{ mt: 2 }}>
                  Submit your vote by creating a transaction and sending it to the polling contract on
                  Ethereum Mainnet.
                </Text>

                <Flex sx={{ alignItems: 'center', mt: 3 }}>
                  <Box sx={{ pt: '3px', mr: 1 }}>
                    <Icon name="info" color="textSecondary" size={14} />
                  </Box>
                  <Text sx={{ fontSize: 1, color: 'textSecondary' }}>
                    This used to be the default method for voting.
                  </Text>
                </Flex>
                <Button
                  onClick={() => {
                    submitBallot();
                  }}
                  data-testid="submit-ballot-legacy-button"
                  variant="primaryLarge"
                  disabled={
                    !ballotCount || !!(transaction && transaction?.status !== 'error') || !isVotePrepared
                  }
                  sx={{ mt: 3, width: '100%' }}
                >
                  Proceed with legacy voting
                </Button>
                <Box>
                  <Flex sx={{ alignItems: 'center', justifyContent: 'center', mt: 3 }}>
                    <Text>You pay the transaction fee.</Text>
                  </Flex>
                  <Box>
                    <ExternalLink href="https://manual.makerdao.com/" title="Learn more">
                      <Text as="p" sx={{ fontSize: [1, 3], textAlign: 'center' }}>
                        Learn more
                        <Icon sx={{ ml: 2 }} name="arrowTopRight" size={2} />
                      </Text>
                    </ExternalLink>
                  </Box>
                </Box>
              </Box>

              <Divider />

              <Box p={3}>
                <Button
                  onClick={() => {
                    setSubmissionMethod('gasless');
                  }}
                  variant="primaryOutline"
                  disabled={!canUseGasless}
                  data-testid="switch-to-gasless-votting-button"
                  sx={{ width: '100%' }}
                >
                  <Flex sx={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Switch to gasless voting</Text>
                  </Flex>
                </Button>
                <Flex sx={{ flexDirection: 'column', mt: 3 }}>
                  <Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text as="p" variant="caps">
                      Eligibility Criteria
                    </Text>
                    <ExternalLink
                      href="https://manual.makerdao.com/governance/voting-in-makerdao/gasless-poll-voting/"
                      title="Learn more"
                    >
                      <Text as="p" sx={{ fontSize: [1, 3], textAlign: 'center', color: 'accentBlue' }}>
                        Learn more
                        <Icon sx={{ ml: 2 }} name="arrowTopRight" size={2} />
                      </Text>
                    </ExternalLink>
                  </Flex>
                  <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Text as="p" variant="secondary" sx={{ fontSize: 1 }}>
                      Address has at least {MIN_MKR_REQUIRED_FOR_GASLESS_VOTING_DISPLAY} MKR of polling weight
                    </Text>
                    <Text>
                      {!precheckData ? (
                        <SkeletonThemed width="30px" height="18px" />
                      ) : hasMkrRequired ? (
                        <Icon name="checkmark" color="bull" sx={{ size: '13px' }} />
                      ) : (
                        <Icon name="close" color="bear" sx={{ size: '13px' }} />
                      )}
                    </Text>
                  </Flex>
                  <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                    <Text as="p" variant="secondary" sx={{ fontSize: 1 }}>
                      Address has not used the relayer in the last 10 minutes
                    </Text>
                    <Text>
                      {!precheckData ? (
                        <SkeletonThemed width="30px" height="18px" />
                      ) : !recentlyUsedGaslessVoting ? (
                        <Icon name="checkmark" color="bull" sx={{ size: '13px' }} />
                      ) : (
                        <Icon name="close" color="bear" sx={{ size: '13px' }} />
                      )}
                    </Text>
                  </Flex>
                  <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                    <Text as="p" variant="secondary" sx={{ fontSize: 1 }}>
                      Address has not voted in any included poll
                    </Text>
                    <Text>
                      {!precheckData ? (
                        <SkeletonThemed width="30px" height="18px" />
                      ) : !alreadyVoted ? (
                        <Icon name="checkmark" color="bull" sx={{ size: '13px' }} />
                      ) : (
                        <Icon name="close" color="bear" sx={{ size: '13px' }} />
                      )}
                    </Text>
                  </Flex>

                  <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                    <Text as="p" variant="secondary" sx={{ fontSize: 1 }}>
                      Address is not a multisig wallet
                    </Text>
                    <Text>
                      {!isGnosisSafe ? (
                        <Icon name="checkmark" color="bull" sx={{ size: '13px' }} />
                      ) : (
                        <Icon name="close" color="bear" sx={{ size: '13px' }} />
                      )}
                    </Text>
                  </Flex>
                </Flex>
              </Box>
              {!relayFunded && (
                <>
                  <Divider />
                  <Flex sx={{ flexDirection: 'column', p: 3, pt: 1 }}>
                    <Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text as="p" variant="secondary" sx={{ fontSize: 1 }}>
                        Relayer Status
                      </Text>
                      <Text>
                        {relayFunded ? (
                          <Icon name="checkmark" color="bull" sx={{ size: '13px' }} />
                        ) : (
                          <Icon name="close" color="bear" sx={{ size: '13px' }} />
                        )}
                      </Text>
                    </Flex>
                  </Flex>
                </>
              )}
            </Box>
          )}
        </Card>
      )}

      {ballotStep === 'submitting' && (
        <Card variant="compact" p={3}>
          <Flex sx={{ alignItems: 'center', justifyContent: 'center', mt: 4 }}>
            <TxIndicators.Pending sx={{ width: 6 }} />
          </Flex>
          <Text
            mt={3}
            as="p"
            sx={{ textAlign: 'center', fontSize: 16, color: 'secondaryEmphasis', fontWeight: '500' }}
          >
            Please use your wallet to sign your {submissionMethod === 'gasless' ? 'ballot' : 'transaction'}
          </Text>
          <Flex sx={{ justifyContent: 'center' }}>
            <Button
              mt={3}
              mb={4}
              onClick={() => {
                setStep('method-select');
              }}
              variant="textual"
              sx={{ color: 'secondaryEmphasis', textAlign: 'center', fontSize: 12 }}
            >
              Cancel vote submission
            </Button>
          </Flex>
        </Card>
      )}

      {ballotStep === 'awaiting-relayer' && (
        <Card variant="compact" p={3}>
          <Flex sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <TxIndicators.Pending sx={{ width: 6 }} />
          </Flex>
          <Text
            as="p"
            sx={{ textAlign: 'center', fontSize: 16, color: 'secondaryEmphasis', fontWeight: '500', mt: 3 }}
          >
            Sending Ballot to Relayer
          </Text>
        </Card>
      )}

      {ballotStep === 'in-relayer-queue' && (
        <Card variant="compact" p={3}>
          <Flex sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <TxIndicators.Pending sx={{ width: 6 }} />
          </Flex>
          <Text
            as="p"
            sx={{ textAlign: 'center', fontSize: 16, color: 'secondaryEmphasis', fontWeight: '500', mt: 3 }}
          >
            Transaction in Relayer Queue
          </Text>
        </Card>
      )}

      {ballotStep === 'stuck-in-queue' && (
        <Card variant="compact" p={3}>
          <Flex sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <TxIndicators.Pending sx={{ width: 6 }} />
          </Flex>
          <Text
            as="p"
            sx={{ textAlign: 'center', fontSize: 16, color: 'secondaryEmphasis', fontWeight: '500', mt: 3 }}
          >
            Transaction is taking longer than expected. Please reach out on Discord for support or try again
            later.
          </Text>
        </Card>
      )}

      {ballotStep === 'tx-pending' && (
        <Card variant="compact" p={3}>
          <Flex sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <TxIndicators.Pending sx={{ width: 6 }} />
          </Flex>
          <Text
            as="p"
            sx={{ textAlign: 'center', fontSize: 16, color: 'secondaryEmphasis', fontWeight: '500', mt: 3 }}
          >
            Transaction Pending
          </Text>

          {transaction && (
            <EtherscanLink
              type="transaction"
              hash={(transaction as TXMined).hash}
              network={transaction?.gaslessNetwork ?? network}
              styles={{ justifyContent: 'center', width: '100%' }}
            />
          )}
        </Card>
      )}

      {ballotStep === 'tx-error' && (
        <Card variant="compact" p={3}>
          <Flex sx={{ alignItems: 'center', justifyContent: 'center', mt: 4 }}>
            <TxIndicators.Failed sx={{ width: 6 }} />
          </Flex>
          <Text
            mt={3}
            as="p"
            sx={{ textAlign: 'center', fontSize: 16, color: 'secondaryEmphasis', fontWeight: '500' }}
          >
            Transaction Failed.
          </Text>
          <Text
            mt={3}
            as="p"
            sx={{ textAlign: 'center', fontSize: 14, color: 'secondaryEmphasis', wordBreak: 'break-word' }}
          >
            {displayError} Please try again.
          </Text>
          <Flex sx={{ justifyContent: 'center' }}>
            <InternalLink href={'/polling/review'} title="Back">
              <Button
                pb={3}
                variant="textual"
                sx={{
                  borderColor: 'primary',
                  color: 'secondaryEmphasis',
                  fontSize: 2,
                  width: 'max-content',
                  margin: 'auto'
                }}
                onClick={() => setStep('method-select')}
              >
                Go back
              </Button>
            </InternalLink>
          </Flex>
        </Card>
      )}
    </Box>
  );
}
