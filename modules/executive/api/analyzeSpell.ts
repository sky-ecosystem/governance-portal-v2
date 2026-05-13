/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

// nextCastTime returns when the spell is available for execution, accounting for office hours (only works if the spell has not been executed yet)
// eta returns when the spell is available for execution, not account for office hours

import { getChiefApprovals } from 'modules/web3/api/getChiefApprovals';
import { getSpellExecutionDate } from 'modules/web3/api/getSpellExecuationDate';
import { getSpellScheduledDate } from 'modules/web3/api/getSpellScheduledDate';
import { SupportedNetworks } from 'modules/web3/constants/networks';
import { SpellData } from '../types';
import logger from 'lib/logger';
import { networkNameToChainId } from 'modules/web3/helpers/chain';
import { getPublicClient } from 'modules/web3/helpers/getPublicClient';
import { chiefAbi, chiefAddress, dssSpellAbi } from 'modules/contracts/generated';

export const getExecutiveMKRSupport = async (
  address: string,
  network: SupportedNetworks
): Promise<string> => {
  try {
    const approvals = await getChiefApprovals(address, network);
    return approvals.toString();
  } catch (e) {
    logger.error(`getExecutiveMKRSupport: Error fetching approvals for ${address} on ${network}`, e);
    return new Promise<string>(res => res('0'));
  }
};

// executiveHash returns the hash of the executive proposal
export const analyzeSpell = async (address: string, network: SupportedNetworks): Promise<SpellData> => {
  const chainId = networkNameToChainId(network);

  // don't fetch spell data if not on mainnet
  if (network !== SupportedNetworks.MAINNET) {
    const approvals = await getChiefApprovals(address, network);

    return {
      hasBeenCast: undefined,
      hasBeenScheduled: false,
      eta: undefined,
      expiration: undefined,
      nextCastTime: undefined,
      datePassed: undefined,
      dateExecuted: undefined,
      mkrSupport: approvals.toString(),
      executiveHash: undefined,
      officeHours: undefined
    };
  }

  const publicClient = getPublicClient(chainId);
  const readSpellParameters = {
    address: address as `0x${string}`,
    abi: dssSpellAbi
  };

  const getScheduledDate = async (eta: bigint | undefined) => {
    try {
      const spellDate = await getSpellScheduledDate(eta, address, network);
      return spellDate;
    } catch (err) {
      return undefined;
    }
  };

  const getExecutionDate = async (done: boolean | undefined) => {
    try {
      const executionDate = await getSpellExecutionDate(done, address, network);
      return executionDate;
    } catch (err) {
      return undefined;
    }
  };

  const [
    { result: done },
    { result: responseNextCastTime },
    { result: responseEta },
    { result: responseExpiration },
    { result: responseMkrSupport },
    { result: responseExecutiveHash },
    { result: officeHours }
  ] = await publicClient.multicall({
    contracts: [
      { ...readSpellParameters, functionName: 'done' },
      { ...readSpellParameters, functionName: 'nextCastTime' },
      { ...readSpellParameters, functionName: 'eta' },
      { ...readSpellParameters, functionName: 'expiration' },
      {
        address: chiefAddress[chainId],
        abi: chiefAbi,
        functionName: 'approvals',
        args: [address as `0x${string}`]
      },
      // executiveHash
      { ...readSpellParameters, functionName: 'description' },
      { ...readSpellParameters, functionName: 'officeHours' }
    ]
  });

  const nextCastTime = Number(responseNextCastTime)
    ? new Date(Number(responseNextCastTime) * 1000)
    : undefined;
  const eta = Number(responseEta) ? new Date(Number(responseEta) * 1000) : undefined;
  const expiration = Number(responseExpiration) ? new Date(Number(responseExpiration) * 1000) : undefined;
  const mkrSupport = responseMkrSupport ? responseMkrSupport.toString() : '0';
  const executiveHash = responseExecutiveHash?.substr(
    responseExecutiveHash.indexOf('0x'),
    responseExecutiveHash.length
  );

  const [datePassed, dateExecuted] = await Promise.all([
    getScheduledDate(responseEta),
    getExecutionDate(done)
  ]);

  return {
    hasBeenCast: done,
    hasBeenScheduled: !!eta,
    eta,
    expiration,
    nextCastTime,
    datePassed,
    dateExecuted,
    mkrSupport,
    executiveHash,
    officeHours
  };
};
