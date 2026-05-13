/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { DelegateStatusEnum, DelegateTypeEnum } from '../delegates.constants';

export type DelegateRepoInformation = {
  voteDelegateAddress: string;
  picture?: string;
  name: string;
  externalUrl: string;
  description: string;
  combinedParticipation?: string;
  pollParticipation?: string;
  executiveParticipation?: string;
  communication?: string;
  cuMember?: boolean;
  tags?: string[];
};

export type GQLDelegationHistory = {
  amount: string;
  accumulatedAmount: string;
  delegator: string;
  blockNumber: number;
  timestamp: string;
  txnHash: string;
  delegate: {
    id: string;
  };
  isLockstake: boolean;
};

export type DelegateContractInformation = {
  address: string;
  voteDelegateAddress: string;
  blockTimestamp: string;
  mkrDelegated: string;
  proposalsSupported: number;
  mkrLockedDelegate: MKRLockedDelegateAPIResponse[];
  delegationHistory?: GQLDelegationHistory[];
  delegateVersion?: number | null;
  lastVoteDate: number | null;
};

export type Delegate = {
  id: string;
  name: string;
  address: string;
  voteDelegateAddress: string;
  description: string;
  picture: string;
  status: DelegateStatusEnum;
  lastVoteDate: number | null;
  expired: boolean;
  isAboutToExpire: boolean;
  expirationDate?: Date | null;
  externalUrl?: string;
  combinedParticipation?: string;
  pollParticipation?: string;
  executiveParticipation?: string;
  communication?: string;
  cuMember?: boolean;
  mkrDelegated: string;
  proposalsSupported: number;
  execSupported: CMSProposal | undefined;
  mkrLockedDelegate: MKRLockedDelegateAPIResponse[];
  blockTimestamp: string;
  delegateVersion?: number | null;
  previous?: {
    address: string;
    voteDelegateAddress: string;
  };
  next?: {
    address: string;
    voteDelegateAddress: string;
  };
};

export type DelegateListItem = {
  voteDelegateAddress: string;
  picture?: string;
  name: string;
  externalUrl: string;
  combinedParticipation?: string;
  pollParticipation?: string;
  executiveParticipation?: string;
  communication?: string;
  tags?: string[];
};

export type DelegatePaginated = Omit<
  Delegate,
  | 'id'
  | 'blockTimestamp'
  | 'picture'
  | 'description'
  | 'lastVoteDate'
  | 'externalUrl'
  | 'execSupported'
  | 'mkrLockedDelegate'
> & {
  picture?: string;
  creationDate: Date;
  delegatorCount: number;
  lastVoteDate?: Date;
  execSupported?: {
    title: string;
    address: string;
  };
  version: number;
};

export type DelegationHistory = {
  address: string;
  lockAmount: string;
  events: DelegationHistoryEvent[];
};

export type DelegationHistoryWithExpirationDate = DelegationHistory & {
  expirationDate?: Date | null;
  isAboutToExpire: boolean;
  isExpired: boolean;
  isRenewedToV2: boolean;
};

export type DelegationHistoryEvent = {
  lockAmount: string;
  blockTimestamp: string;
  hash: string;
  isLockstake?: boolean;
};

export type MKRLockedDelegateAPIResponse = {
  fromAddress: string;
  immediateCaller: string;
  delegateContractAddress: string;
  lockAmount: string;
  blockNumber: number;
  blockTimestamp: string;
  lockTotal: string;
  callerLockTotal: string;
  hash: string;
  isLockstake?: boolean;
};

export type MKRDelegatedToResponse = MKRLockedDelegateAPIResponse & {
  hash: string;
  immediateCaller: string;
};

export type DelegateExecSupport = {
  voteDelegate: string;
  votedProposals: string[];
};

export type AllDelegatesEntry = {
  blockTimestamp: Date;
  delegate: string;
  voteDelegate: string;
  delegateVersion?: number | null;
  creationDate?: string;
};

export type AllDelegatesEntryWithName = AllDelegatesEntry & {
  name?: string;
  picture?: string;
  delegateType: DelegateTypeEnum;
  blockTimestamp: Date;
  expirationDate?: Date | null;
  expired: boolean;
  isAboutToExpire: boolean;
  previous?: {
    address: string;
    voteDelegateAddress: string;
  };
  next?: {
    address: string;
    voteDelegateAddress: string;
  };
};

export type DelegateInfo = Omit<DelegateRepoInformation, 'externalUrl' | 'description'> & {
  address: string;
  status: DelegateStatusEnum;
  blockTimestamp: Date;
  expirationDate?: Date | null;
  expired: boolean;
  isAboutToExpire: boolean;
  previous?: {
    address: string;
    voteDelegateAddress: string;
  };
  next?: {
    address: string;
    voteDelegateAddress: string;
  };
  delegateVersion?: number | null;
};
