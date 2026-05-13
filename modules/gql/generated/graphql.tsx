/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigFloat: any;
  BigInt: any;
  Cursor: any;
  Datetime: any;
};

/** A connection to a list of `ActivePollByIdRecord` values. */
export type ActivePollByIdConnection = {
  __typename?: 'ActivePollByIdConnection';
  /** A list of edges which contains the `ActivePollByIdRecord` and cursor to aid in pagination. */
  edges: Array<ActivePollByIdEdge>;
  /** A list of `ActivePollByIdRecord` objects. */
  nodes: Array<Maybe<ActivePollByIdRecord>>;
};

/** A `ActivePollByIdRecord` edge in the connection. */
export type ActivePollByIdEdge = {
  __typename?: 'ActivePollByIdEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `ActivePollByIdRecord` at the end of the edge. */
  node?: Maybe<ActivePollByIdRecord>;
};

/** The return type of our `activePollById` query. */
export type ActivePollByIdRecord = {
  __typename?: 'ActivePollByIdRecord';
  blockCreated?: Maybe<Scalars['Int']>;
  creator?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['Int']>;
  multiHash?: Maybe<Scalars['String']>;
  pollId?: Maybe<Scalars['Int']>;
  startDate?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
};

/** A filter to be used against `ActivePollByIdRecord` object types. All fields are combined with a logical ‘and.’ */
export type ActivePollByIdRecordFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ActivePollByIdRecordFilter>>;
  /** Filter by the object’s `blockCreated` field. */
  blockCreated?: InputMaybe<IntFilter>;
  /** Filter by the object’s `creator` field. */
  creator?: InputMaybe<StringFilter>;
  /** Filter by the object’s `endDate` field. */
  endDate?: InputMaybe<IntFilter>;
  /** Filter by the object’s `multiHash` field. */
  multiHash?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<ActivePollByIdRecordFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ActivePollByIdRecordFilter>>;
  /** Filter by the object’s `pollId` field. */
  pollId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `startDate` field. */
  startDate?: InputMaybe<IntFilter>;
  /** Filter by the object’s `url` field. */
  url?: InputMaybe<StringFilter>;
};

/** A connection to a list of `ActivePollByMultihashRecord` values. */
export type ActivePollByMultihashConnection = {
  __typename?: 'ActivePollByMultihashConnection';
  /** A list of edges which contains the `ActivePollByMultihashRecord` and cursor to aid in pagination. */
  edges: Array<ActivePollByMultihashEdge>;
  /** A list of `ActivePollByMultihashRecord` objects. */
  nodes: Array<Maybe<ActivePollByMultihashRecord>>;
};

/** A `ActivePollByMultihashRecord` edge in the connection. */
export type ActivePollByMultihashEdge = {
  __typename?: 'ActivePollByMultihashEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `ActivePollByMultihashRecord` at the end of the edge. */
  node?: Maybe<ActivePollByMultihashRecord>;
};

/** The return type of our `activePollByMultihash` query. */
export type ActivePollByMultihashRecord = {
  __typename?: 'ActivePollByMultihashRecord';
  blockCreated?: Maybe<Scalars['Int']>;
  creator?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['Int']>;
  multiHash?: Maybe<Scalars['String']>;
  pollId?: Maybe<Scalars['Int']>;
  startDate?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
};

/** A filter to be used against `ActivePollByMultihashRecord` object types. All fields are combined with a logical ‘and.’ */
export type ActivePollByMultihashRecordFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ActivePollByMultihashRecordFilter>>;
  /** Filter by the object’s `blockCreated` field. */
  blockCreated?: InputMaybe<IntFilter>;
  /** Filter by the object’s `creator` field. */
  creator?: InputMaybe<StringFilter>;
  /** Filter by the object’s `endDate` field. */
  endDate?: InputMaybe<IntFilter>;
  /** Filter by the object’s `multiHash` field. */
  multiHash?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<ActivePollByMultihashRecordFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ActivePollByMultihashRecordFilter>>;
  /** Filter by the object’s `pollId` field. */
  pollId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `startDate` field. */
  startDate?: InputMaybe<IntFilter>;
  /** Filter by the object’s `url` field. */
  url?: InputMaybe<StringFilter>;
};

/** A `ActivePollsRecord` edge in the connection. */
export type ActivePollEdge = {
  __typename?: 'ActivePollEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `ActivePollsRecord` at the end of the edge. */
  node?: Maybe<ActivePollsRecord>;
};

/** A connection to a list of `ActivePollsRecord` values. */
export type ActivePollsConnection = {
  __typename?: 'ActivePollsConnection';
  /** A list of edges which contains the `ActivePollsRecord` and cursor to aid in pagination. */
  edges: Array<ActivePollEdge>;
  /** A list of `ActivePollsRecord` objects. */
  nodes: Array<Maybe<ActivePollsRecord>>;
};

/** The return type of our `activePolls` query. */
export type ActivePollsRecord = {
  __typename?: 'ActivePollsRecord';
  blockCreated?: Maybe<Scalars['Int']>;
  creator?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['Int']>;
  multiHash?: Maybe<Scalars['String']>;
  pollId?: Maybe<Scalars['Int']>;
  startDate?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
};

/** A filter to be used against `ActivePollsRecord` object types. All fields are combined with a logical ‘and.’ */
export type ActivePollsRecordFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ActivePollsRecordFilter>>;
  /** Filter by the object’s `blockCreated` field. */
  blockCreated?: InputMaybe<IntFilter>;
  /** Filter by the object’s `creator` field. */
  creator?: InputMaybe<StringFilter>;
  /** Filter by the object’s `endDate` field. */
  endDate?: InputMaybe<IntFilter>;
  /** Filter by the object’s `multiHash` field. */
  multiHash?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<ActivePollsRecordFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ActivePollsRecordFilter>>;
  /** Filter by the object’s `pollId` field. */
  pollId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `startDate` field. */
  startDate?: InputMaybe<IntFilter>;
  /** Filter by the object’s `url` field. */
  url?: InputMaybe<StringFilter>;
};

/** A `AllCurrentVotesRecord` edge in the connection. */
export type AllCurrentVoteEdge = {
  __typename?: 'AllCurrentVoteEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `AllCurrentVotesRecord` at the end of the edge. */
  node?: Maybe<AllCurrentVotesRecord>;
};

/** A connection to a list of `AllCurrentVotesArrayRecord` values. */
export type AllCurrentVotesArrayConnection = {
  __typename?: 'AllCurrentVotesArrayConnection';
  /** A list of edges which contains the `AllCurrentVotesArrayRecord` and cursor to aid in pagination. */
  edges: Array<AllCurrentVotesArrayEdge>;
  /** A list of `AllCurrentVotesArrayRecord` objects. */
  nodes: Array<Maybe<AllCurrentVotesArrayRecord>>;
};

/** A `AllCurrentVotesArrayRecord` edge in the connection. */
export type AllCurrentVotesArrayEdge = {
  __typename?: 'AllCurrentVotesArrayEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `AllCurrentVotesArrayRecord` at the end of the edge. */
  node?: Maybe<AllCurrentVotesArrayRecord>;
};

/** The return type of our `allCurrentVotesArray` query. */
export type AllCurrentVotesArrayRecord = {
  __typename?: 'AllCurrentVotesArrayRecord';
  blockTimestamp?: Maybe<Scalars['Datetime']>;
  optionId?: Maybe<Scalars['Int']>;
  optionIdRaw?: Maybe<Scalars['String']>;
  pollId?: Maybe<Scalars['Int']>;
  voter?: Maybe<Scalars['String']>;
};

/** A filter to be used against `AllCurrentVotesArrayRecord` object types. All fields are combined with a logical ‘and.’ */
export type AllCurrentVotesArrayRecordFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<AllCurrentVotesArrayRecordFilter>>;
  /** Filter by the object’s `blockTimestamp` field. */
  blockTimestamp?: InputMaybe<DatetimeFilter>;
  /** Negates the expression. */
  not?: InputMaybe<AllCurrentVotesArrayRecordFilter>;
  /** Filter by the object’s `optionId` field. */
  optionId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `optionIdRaw` field. */
  optionIdRaw?: InputMaybe<StringFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<AllCurrentVotesArrayRecordFilter>>;
  /** Filter by the object’s `pollId` field. */
  pollId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `voter` field. */
  voter?: InputMaybe<StringFilter>;
};

/** A connection to a list of `AllCurrentVotesRecord` values. */
export type AllCurrentVotesConnection = {
  __typename?: 'AllCurrentVotesConnection';
  /** A list of edges which contains the `AllCurrentVotesRecord` and cursor to aid in pagination. */
  edges: Array<AllCurrentVoteEdge>;
  /** A list of `AllCurrentVotesRecord` objects. */
  nodes: Array<Maybe<AllCurrentVotesRecord>>;
};

/** The return type of our `allCurrentVotes` query. */
export type AllCurrentVotesRecord = {
  __typename?: 'AllCurrentVotesRecord';
  blockTimestamp?: Maybe<Scalars['Datetime']>;
  optionId?: Maybe<Scalars['Int']>;
  optionIdRaw?: Maybe<Scalars['String']>;
  pollId?: Maybe<Scalars['Int']>;
};

/** A filter to be used against `AllCurrentVotesRecord` object types. All fields are combined with a logical ‘and.’ */
export type AllCurrentVotesRecordFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<AllCurrentVotesRecordFilter>>;
  /** Filter by the object’s `blockTimestamp` field. */
  blockTimestamp?: InputMaybe<DatetimeFilter>;
  /** Negates the expression. */
  not?: InputMaybe<AllCurrentVotesRecordFilter>;
  /** Filter by the object’s `optionId` field. */
  optionId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `optionIdRaw` field. */
  optionIdRaw?: InputMaybe<StringFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<AllCurrentVotesRecordFilter>>;
  /** Filter by the object’s `pollId` field. */
  pollId?: InputMaybe<IntFilter>;
};

/** A `AllDelegatesRecord` edge in the connection. */
export type AllDelegateEdge = {
  __typename?: 'AllDelegateEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `AllDelegatesRecord` at the end of the edge. */
  node?: Maybe<AllDelegatesRecord>;
};

/** A connection to a list of `AllDelegatesRecord` values. */
export type AllDelegatesConnection = {
  __typename?: 'AllDelegatesConnection';
  /** A list of edges which contains the `AllDelegatesRecord` and cursor to aid in pagination. */
  edges: Array<AllDelegateEdge>;
  /** A list of `AllDelegatesRecord` objects. */
  nodes: Array<Maybe<AllDelegatesRecord>>;
};

/** The return type of our `allDelegates` query. */
export type AllDelegatesRecord = {
  __typename?: 'AllDelegatesRecord';
  blockTimestamp?: Maybe<Scalars['Datetime']>;
  delegate?: Maybe<Scalars['String']>;
  voteDelegate?: Maybe<Scalars['String']>;
};

/** A filter to be used against `AllDelegatesRecord` object types. All fields are combined with a logical ‘and.’ */
export type AllDelegatesRecordFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<AllDelegatesRecordFilter>>;
  /** Filter by the object’s `blockTimestamp` field. */
  blockTimestamp?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `delegate` field. */
  delegate?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<AllDelegatesRecordFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<AllDelegatesRecordFilter>>;
  /** Filter by the object’s `voteDelegate` field. */
  voteDelegate?: InputMaybe<StringFilter>;
};

/** A `AllEsmJoinsRecord` edge in the connection. */
export type AllEsmJoinEdge = {
  __typename?: 'AllEsmJoinEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `AllEsmJoinsRecord` at the end of the edge. */
  node?: Maybe<AllEsmJoinsRecord>;
};

/** A connection to a list of `AllEsmJoinsRecord` values. */
export type AllEsmJoinsConnection = {
  __typename?: 'AllEsmJoinsConnection';
  /** A list of edges which contains the `AllEsmJoinsRecord` and cursor to aid in pagination. */
  edges: Array<AllEsmJoinEdge>;
  /** A list of `AllEsmJoinsRecord` objects. */
  nodes: Array<Maybe<AllEsmJoinsRecord>>;
};

/** The return type of our `allEsmJoins` query. */
export type AllEsmJoinsRecord = {
  __typename?: 'AllEsmJoinsRecord';
  blockTimestamp?: Maybe<Scalars['Datetime']>;
  joinAmount?: Maybe<Scalars['BigFloat']>;
  txFrom?: Maybe<Scalars['String']>;
  txHash?: Maybe<Scalars['String']>;
};

/** A filter to be used against `AllEsmJoinsRecord` object types. All fields are combined with a logical ‘and.’ */
export type AllEsmJoinsRecordFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<AllEsmJoinsRecordFilter>>;
  /** Filter by the object’s `blockTimestamp` field. */
  blockTimestamp?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `joinAmount` field. */
  joinAmount?: InputMaybe<BigFloatFilter>;
  /** Negates the expression. */
  not?: InputMaybe<AllEsmJoinsRecordFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<AllEsmJoinsRecordFilter>>;
  /** Filter by the object’s `txFrom` field. */
  txFrom?: InputMaybe<StringFilter>;
  /** Filter by the object’s `txHash` field. */
  txHash?: InputMaybe<StringFilter>;
};

/** A `AllEsmV2JoinsRecord` edge in the connection. */
export type AllEsmV2JoinEdge = {
  __typename?: 'AllEsmV2JoinEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `AllEsmV2JoinsRecord` at the end of the edge. */
  node?: Maybe<AllEsmV2JoinsRecord>;
};

/** A connection to a list of `AllEsmV2JoinsRecord` values. */
export type AllEsmV2JoinsConnection = {
  __typename?: 'AllEsmV2JoinsConnection';
  /** A list of edges which contains the `AllEsmV2JoinsRecord` and cursor to aid in pagination. */
  edges: Array<AllEsmV2JoinEdge>;
  /** A list of `AllEsmV2JoinsRecord` objects. */
  nodes: Array<Maybe<AllEsmV2JoinsRecord>>;
};

/** The return type of our `allEsmV2Joins` query. */
export type AllEsmV2JoinsRecord = {
  __typename?: 'AllEsmV2JoinsRecord';
  blockTimestamp?: Maybe<Scalars['Datetime']>;
  joinAmount?: Maybe<Scalars['BigFloat']>;
  txFrom?: Maybe<Scalars['String']>;
  txHash?: Maybe<Scalars['String']>;
};

/** A filter to be used against `AllEsmV2JoinsRecord` object types. All fields are combined with a logical ‘and.’ */
export type AllEsmV2JoinsRecordFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<AllEsmV2JoinsRecordFilter>>;
  /** Filter by the object’s `blockTimestamp` field. */
  blockTimestamp?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `joinAmount` field. */
  joinAmount?: InputMaybe<BigFloatFilter>;
  /** Negates the expression. */
  not?: InputMaybe<AllEsmV2JoinsRecordFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<AllEsmV2JoinsRecordFilter>>;
  /** Filter by the object’s `txFrom` field. */
  txFrom?: InputMaybe<StringFilter>;
  /** Filter by the object’s `txHash` field. */
  txHash?: InputMaybe<StringFilter>;
};

/** A connection to a list of `AllLocksSummedRecord` values. */
export type AllLocksSummedConnection = {
  __typename?: 'AllLocksSummedConnection';
  /** A list of edges which contains the `AllLocksSummedRecord` and cursor to aid in pagination. */
  edges: Array<AllLocksSummedEdge>;
  /** A list of `AllLocksSummedRecord` objects. */
  nodes: Array<Maybe<AllLocksSummedRecord>>;
};

/** A `AllLocksSummedRecord` edge in the connection. */
export type AllLocksSummedEdge = {
  __typename?: 'AllLocksSummedEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `AllLocksSummedRecord` at the end of the edge. */
  node?: Maybe<AllLocksSummedRecord>;
};

/** The return type of our `allLocksSummed` query. */
export type AllLocksSummedRecord = {
  __typename?: 'AllLocksSummedRecord';
  blockNumber?: Maybe<Scalars['Int']>;
  blockTimestamp?: Maybe<Scalars['Datetime']>;
  fromAddress?: Maybe<Scalars['String']>;
  hash?: Maybe<Scalars['String']>;
  immediateCaller?: Maybe<Scalars['String']>;
  lockAmount?: Maybe<Scalars['BigFloat']>;
  lockTotal?: Maybe<Scalars['BigFloat']>;
};

/** A filter to be used against `AllLocksSummedRecord` object types. All fields are combined with a logical ‘and.’ */
export type AllLocksSummedRecordFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<AllLocksSummedRecordFilter>>;
  /** Filter by the object’s `blockNumber` field. */
  blockNumber?: InputMaybe<IntFilter>;
  /** Filter by the object’s `blockTimestamp` field. */
  blockTimestamp?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `fromAddress` field. */
  fromAddress?: InputMaybe<StringFilter>;
  /** Filter by the object’s `hash` field. */
  hash?: InputMaybe<StringFilter>;
  /** Filter by the object’s `immediateCaller` field. */
  immediateCaller?: InputMaybe<StringFilter>;
  /** Filter by the object’s `lockAmount` field. */
  lockAmount?: InputMaybe<BigFloatFilter>;
  /** Filter by the object’s `lockTotal` field. */
  lockTotal?: InputMaybe<BigFloatFilter>;
  /** Negates the expression. */
  not?: InputMaybe<AllLocksSummedRecordFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<AllLocksSummedRecordFilter>>;
};

/** A filter to be used against BigFloat fields. All fields are combined with a logical ‘and.’ */
export type BigFloatFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['BigFloat']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['BigFloat']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['BigFloat']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['BigFloat']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['BigFloat']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['BigFloat']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['BigFloat']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['BigFloat']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['BigFloat']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['BigFloat']>>;
};

/** A connection to a list of `BuggyVoteAddressMkrWeightsAtTimeRecord` values. */
export type BuggyVoteAddressMkrWeightsAtTimeConnection = {
  __typename?: 'BuggyVoteAddressMkrWeightsAtTimeConnection';
  /** A list of edges which contains the `BuggyVoteAddressMkrWeightsAtTimeRecord` and cursor to aid in pagination. */
  edges: Array<BuggyVoteAddressMkrWeightsAtTimeEdge>;
  /** A list of `BuggyVoteAddressMkrWeightsAtTimeRecord` objects. */
  nodes: Array<Maybe<BuggyVoteAddressMkrWeightsAtTimeRecord>>;
};

/** A `BuggyVoteAddressMkrWeightsAtTimeRecord` edge in the connection. */
export type BuggyVoteAddressMkrWeightsAtTimeEdge = {
  __typename?: 'BuggyVoteAddressMkrWeightsAtTimeEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `BuggyVoteAddressMkrWeightsAtTimeRecord` at the end of the edge. */
  node?: Maybe<BuggyVoteAddressMkrWeightsAtTimeRecord>;
};

/** The return type of our `buggyVoteAddressMkrWeightsAtTime` query. */
export type BuggyVoteAddressMkrWeightsAtTimeRecord = {
  __typename?: 'BuggyVoteAddressMkrWeightsAtTimeRecord';
  mkrSupport?: Maybe<Scalars['BigFloat']>;
  optionId?: Maybe<Scalars['Int']>;
  optionIdRaw?: Maybe<Scalars['String']>;
  voter?: Maybe<Scalars['String']>;
};

/** A filter to be used against `BuggyVoteAddressMkrWeightsAtTimeRecord` object types. All fields are combined with a logical ‘and.’ */
export type BuggyVoteAddressMkrWeightsAtTimeRecordFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<BuggyVoteAddressMkrWeightsAtTimeRecordFilter>>;
  /** Filter by the object’s `mkrSupport` field. */
  mkrSupport?: InputMaybe<BigFloatFilter>;
  /** Negates the expression. */
  not?: InputMaybe<BuggyVoteAddressMkrWeightsAtTimeRecordFilter>;
  /** Filter by the object’s `optionId` field. */
  optionId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `optionIdRaw` field. */
  optionIdRaw?: InputMaybe<StringFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<BuggyVoteAddressMkrWeightsAtTimeRecordFilter>>;
  /** Filter by the object’s `voter` field. */
  voter?: InputMaybe<StringFilter>;
};

/** A connection to a list of `BuggyVoteMkrWeightsAtTimeRankedChoiceRecord` values. */
export type BuggyVoteMkrWeightsAtTimeRankedChoiceConnection = {
  __typename?: 'BuggyVoteMkrWeightsAtTimeRankedChoiceConnection';
  /** A list of edges which contains the `BuggyVoteMkrWeightsAtTimeRankedChoiceRecord` and cursor to aid in pagination. */
  edges: Array<BuggyVoteMkrWeightsAtTimeRankedChoiceEdge>;
  /** A list of `BuggyVoteMkrWeightsAtTimeRankedChoiceRecord` objects. */
  nodes: Array<Maybe<BuggyVoteMkrWeightsAtTimeRankedChoiceRecord>>;
};

/** A `BuggyVoteMkrWeightsAtTimeRankedChoiceRecord` edge in the connection. */
export type BuggyVoteMkrWeightsAtTimeRankedChoiceEdge = {
  __typename?: 'BuggyVoteMkrWeightsAtTimeRankedChoiceEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `BuggyVoteMkrWeightsAtTimeRankedChoiceRecord` at the end of the edge. */
  node?: Maybe<BuggyVoteMkrWeightsAtTimeRankedChoiceRecord>;
};

/** The return type of our `buggyVoteMkrWeightsAtTimeRankedChoice` query. */
export type BuggyVoteMkrWeightsAtTimeRankedChoiceRecord = {
  __typename?: 'BuggyVoteMkrWeightsAtTimeRankedChoiceRecord';
  mkrSupport?: Maybe<Scalars['BigFloat']>;
  optionIdRaw?: Maybe<Scalars['String']>;
};

/** A filter to be used against `BuggyVoteMkrWeightsAtTimeRankedChoiceRecord` object types. All fields are combined with a logical ‘and.’ */
export type BuggyVoteMkrWeightsAtTimeRankedChoiceRecordFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<BuggyVoteMkrWeightsAtTimeRankedChoiceRecordFilter>>;
  /** Filter by the object’s `mkrSupport` field. */
  mkrSupport?: InputMaybe<BigFloatFilter>;
  /** Negates the expression. */
  not?: InputMaybe<BuggyVoteMkrWeightsAtTimeRankedChoiceRecordFilter>;
  /** Filter by the object’s `optionIdRaw` field. */
  optionIdRaw?: InputMaybe<StringFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<BuggyVoteMkrWeightsAtTimeRankedChoiceRecordFilter>>;
};

/** A `CombinedChiefAndMkrBalancesRecord` edge in the connection. */
export type CombinedChiefAndMkrBalanceEdge = {
  __typename?: 'CombinedChiefAndMkrBalanceEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CombinedChiefAndMkrBalancesRecord` at the end of the edge. */
  node?: Maybe<CombinedChiefAndMkrBalancesRecord>;
};

/** A connection to a list of `CombinedChiefAndMkrBalancesAtTimeRecord` values. */
export type CombinedChiefAndMkrBalancesAtTimeConnection = {
  __typename?: 'CombinedChiefAndMkrBalancesAtTimeConnection';
  /** A list of edges which contains the `CombinedChiefAndMkrBalancesAtTimeRecord` and cursor to aid in pagination. */
  edges: Array<CombinedChiefAndMkrBalancesAtTimeEdge>;
  /** A list of `CombinedChiefAndMkrBalancesAtTimeRecord` objects. */
  nodes: Array<Maybe<CombinedChiefAndMkrBalancesAtTimeRecord>>;
};

/** A `CombinedChiefAndMkrBalancesAtTimeRecord` edge in the connection. */
export type CombinedChiefAndMkrBalancesAtTimeEdge = {
  __typename?: 'CombinedChiefAndMkrBalancesAtTimeEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CombinedChiefAndMkrBalancesAtTimeRecord` at the end of the edge. */
  node?: Maybe<CombinedChiefAndMkrBalancesAtTimeRecord>;
};

/** The return type of our `combinedChiefAndMkrBalancesAtTime` query. */
export type CombinedChiefAndMkrBalancesAtTimeRecord = {
  __typename?: 'CombinedChiefAndMkrBalancesAtTimeRecord';
  address?: Maybe<Scalars['String']>;
  mkrAndChiefBalance?: Maybe<Scalars['BigFloat']>;
};

/** A filter to be used against `CombinedChiefAndMkrBalancesAtTimeRecord` object types. All fields are combined with a logical ‘and.’ */
export type CombinedChiefAndMkrBalancesAtTimeRecordFilter = {
  /** Filter by the object’s `address` field. */
  address?: InputMaybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<CombinedChiefAndMkrBalancesAtTimeRecordFilter>>;
  /** Filter by the object’s `mkrAndChiefBalance` field. */
  mkrAndChiefBalance?: InputMaybe<BigFloatFilter>;
  /** Negates the expression. */
  not?: InputMaybe<CombinedChiefAndMkrBalancesAtTimeRecordFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<CombinedChiefAndMkrBalancesAtTimeRecordFilter>>;
};

/** A connection to a list of `CombinedChiefAndMkrBalancesRecord` values. */
export type CombinedChiefAndMkrBalancesConnection = {
  __typename?: 'CombinedChiefAndMkrBalancesConnection';
  /** A list of edges which contains the `CombinedChiefAndMkrBalancesRecord` and cursor to aid in pagination. */
  edges: Array<CombinedChiefAndMkrBalanceEdge>;
  /** A list of `CombinedChiefAndMkrBalancesRecord` objects. */
  nodes: Array<Maybe<CombinedChiefAndMkrBalancesRecord>>;
};

/** A connection to a list of `CombinedChiefAndMkrBalancesCurrentlyRecord` values. */
export type CombinedChiefAndMkrBalancesCurrentlyConnection = {
  __typename?: 'CombinedChiefAndMkrBalancesCurrentlyConnection';
  /** A list of edges which contains the `CombinedChiefAndMkrBalancesCurrentlyRecord` and cursor to aid in pagination. */
  edges: Array<CombinedChiefAndMkrBalancesCurrentlyEdge>;
  /** A list of `CombinedChiefAndMkrBalancesCurrentlyRecord` objects. */
  nodes: Array<Maybe<CombinedChiefAndMkrBalancesCurrentlyRecord>>;
};

/** A `CombinedChiefAndMkrBalancesCurrentlyRecord` edge in the connection. */
export type CombinedChiefAndMkrBalancesCurrentlyEdge = {
  __typename?: 'CombinedChiefAndMkrBalancesCurrentlyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CombinedChiefAndMkrBalancesCurrentlyRecord` at the end of the edge. */
  node?: Maybe<CombinedChiefAndMkrBalancesCurrentlyRecord>;
};

/** The return type of our `combinedChiefAndMkrBalancesCurrently` query. */
export type CombinedChiefAndMkrBalancesCurrentlyRecord = {
  __typename?: 'CombinedChiefAndMkrBalancesCurrentlyRecord';
  address?: Maybe<Scalars['String']>;
  mkrAndChiefBalance?: Maybe<Scalars['BigFloat']>;
};

/** A filter to be used against `CombinedChiefAndMkrBalancesCurrentlyRecord` object types. All fields are combined with a logical ‘and.’ */
export type CombinedChiefAndMkrBalancesCurrentlyRecordFilter = {
  /** Filter by the object’s `address` field. */
  address?: InputMaybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<CombinedChiefAndMkrBalancesCurrentlyRecordFilter>>;
  /** Filter by the object’s `mkrAndChiefBalance` field. */
  mkrAndChiefBalance?: InputMaybe<BigFloatFilter>;
  /** Negates the expression. */
  not?: InputMaybe<CombinedChiefAndMkrBalancesCurrentlyRecordFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<CombinedChiefAndMkrBalancesCurrentlyRecordFilter>>;
};

/** The return type of our `combinedChiefAndMkrBalances` query. */
export type CombinedChiefAndMkrBalancesRecord = {
  __typename?: 'CombinedChiefAndMkrBalancesRecord';
  address?: Maybe<Scalars['String']>;
  mkrAndChiefBalance?: Maybe<Scalars['BigFloat']>;
};

/** A filter to be used against `CombinedChiefAndMkrBalancesRecord` object types. All fields are combined with a logical ‘and.’ */
export type CombinedChiefAndMkrBalancesRecordFilter = {
  /** Filter by the object’s `address` field. */
  address?: InputMaybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<CombinedChiefAndMkrBalancesRecordFilter>>;
  /** Filter by the object’s `mkrAndChiefBalance` field. */
  mkrAndChiefBalance?: InputMaybe<BigFloatFilter>;
  /** Negates the expression. */
  not?: InputMaybe<CombinedChiefAndMkrBalancesRecordFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<CombinedChiefAndMkrBalancesRecordFilter>>;
};

/** A connection to a list of `CurrentVoteRecord` values. */
export type CurrentVoteConnection = {
  __typename?: 'CurrentVoteConnection';
  /** A list of edges which contains the `CurrentVoteRecord` and cursor to aid in pagination. */
  edges: Array<CurrentVoteEdge>;
  /** A list of `CurrentVoteRecord` objects. */
  nodes: Array<Maybe<CurrentVoteRecord>>;
};

/** A `CurrentVoteRecord` edge in the connection. */
export type CurrentVoteEdge = {
  __typename?: 'CurrentVoteEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CurrentVoteRecord` at the end of the edge. */
  node?: Maybe<CurrentVoteRecord>;
};

/** A connection to a list of `CurrentVoteRankedChoiceRecord` values. */
export type CurrentVoteRankedChoiceConnection = {
  __typename?: 'CurrentVoteRankedChoiceConnection';
  /** A list of edges which contains the `CurrentVoteRankedChoiceRecord` and cursor to aid in pagination. */
  edges: Array<CurrentVoteRankedChoiceEdge>;
  /** A list of `CurrentVoteRankedChoiceRecord` objects. */
  nodes: Array<Maybe<CurrentVoteRankedChoiceRecord>>;
};

/** A `CurrentVoteRankedChoiceRecord` edge in the connection. */
export type CurrentVoteRankedChoiceEdge = {
  __typename?: 'CurrentVoteRankedChoiceEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CurrentVoteRankedChoiceRecord` at the end of the edge. */
  node?: Maybe<CurrentVoteRankedChoiceRecord>;
};

/** The return type of our `currentVoteRankedChoice` query. */
export type CurrentVoteRankedChoiceRecord = {
  __typename?: 'CurrentVoteRankedChoiceRecord';
  blockId?: Maybe<Scalars['Int']>;
  optionIdRaw?: Maybe<Scalars['String']>;
};

/** A filter to be used against `CurrentVoteRankedChoiceRecord` object types. All fields are combined with a logical ‘and.’ */
export type CurrentVoteRankedChoiceRecordFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<CurrentVoteRankedChoiceRecordFilter>>;
  /** Filter by the object’s `blockId` field. */
  blockId?: InputMaybe<IntFilter>;
  /** Negates the expression. */
  not?: InputMaybe<CurrentVoteRankedChoiceRecordFilter>;
  /** Filter by the object’s `optionIdRaw` field. */
  optionIdRaw?: InputMaybe<StringFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<CurrentVoteRankedChoiceRecordFilter>>;
};

/** The return type of our `currentVote` query. */
export type CurrentVoteRecord = {
  __typename?: 'CurrentVoteRecord';
  blockId?: Maybe<Scalars['Int']>;
  optionId?: Maybe<Scalars['Int']>;
};

/** A filter to be used against `CurrentVoteRecord` object types. All fields are combined with a logical ‘and.’ */
export type CurrentVoteRecordFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<CurrentVoteRecordFilter>>;
  /** Filter by the object’s `blockId` field. */
  blockId?: InputMaybe<IntFilter>;
  /** Negates the expression. */
  not?: InputMaybe<CurrentVoteRecordFilter>;
  /** Filter by the object’s `optionId` field. */
  optionId?: InputMaybe<IntFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<CurrentVoteRecordFilter>>;
};

/** A filter to be used against Datetime fields. All fields are combined with a logical ‘and.’ */
export type DatetimeFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Datetime']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Datetime']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Datetime']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Datetime']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Datetime']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Datetime']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Datetime']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Datetime']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Datetime']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Datetime']>>;
};

/** A connection to a list of `HotOrColdWeightAtTimeRecord` values. */
export type HotOrColdWeightAtTimeConnection = {
  __typename?: 'HotOrColdWeightAtTimeConnection';
  /** A list of edges which contains the `HotOrColdWeightAtTimeRecord` and cursor to aid in pagination. */
  edges: Array<HotOrColdWeightAtTimeEdge>;
  /** A list of `HotOrColdWeightAtTimeRecord` objects. */
  nodes: Array<Maybe<HotOrColdWeightAtTimeRecord>>;
};

/** A `HotOrColdWeightAtTimeRecord` edge in the connection. */
export type HotOrColdWeightAtTimeEdge = {
  __typename?: 'HotOrColdWeightAtTimeEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `HotOrColdWeightAtTimeRecord` at the end of the edge. */
  node?: Maybe<HotOrColdWeightAtTimeRecord>;
};

/** The return type of our `hotOrColdWeightAtTime` query. */
export type HotOrColdWeightAtTimeRecord = {
  __typename?: 'HotOrColdWeightAtTimeRecord';
  address?: Maybe<Scalars['String']>;
  totalWeight?: Maybe<Scalars['BigFloat']>;
};

/** A filter to be used against `HotOrColdWeightAtTimeRecord` object types. All fields are combined with a logical ‘and.’ */
export type HotOrColdWeightAtTimeRecordFilter = {
  /** Filter by the object’s `address` field. */
  address?: InputMaybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<HotOrColdWeightAtTimeRecordFilter>>;
  /** Negates the expression. */
  not?: InputMaybe<HotOrColdWeightAtTimeRecordFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<HotOrColdWeightAtTimeRecordFilter>>;
  /** Filter by the object’s `totalWeight` field. */
  totalWeight?: InputMaybe<BigFloatFilter>;
};

/** A connection to a list of `HotOrColdWeightRecord` values. */
export type HotOrColdWeightConnection = {
  __typename?: 'HotOrColdWeightConnection';
  /** A list of edges which contains the `HotOrColdWeightRecord` and cursor to aid in pagination. */
  edges: Array<HotOrColdWeightEdge>;
  /** A list of `HotOrColdWeightRecord` objects. */
  nodes: Array<Maybe<HotOrColdWeightRecord>>;
};

/** A connection to a list of `HotOrColdWeightCurrentlyRecord` values. */
export type HotOrColdWeightCurrentlyConnection = {
  __typename?: 'HotOrColdWeightCurrentlyConnection';
  /** A list of edges which contains the `HotOrColdWeightCurrentlyRecord` and cursor to aid in pagination. */
  edges: Array<HotOrColdWeightCurrentlyEdge>;
  /** A list of `HotOrColdWeightCurrentlyRecord` objects. */
  nodes: Array<Maybe<HotOrColdWeightCurrentlyRecord>>;
};

/** A `HotOrColdWeightCurrentlyRecord` edge in the connection. */
export type HotOrColdWeightCurrentlyEdge = {
  __typename?: 'HotOrColdWeightCurrentlyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `HotOrColdWeightCurrentlyRecord` at the end of the edge. */
  node?: Maybe<HotOrColdWeightCurrentlyRecord>;
};

/** The return type of our `hotOrColdWeightCurrently` query. */
export type HotOrColdWeightCurrentlyRecord = {
  __typename?: 'HotOrColdWeightCurrentlyRecord';
  address?: Maybe<Scalars['String']>;
  totalWeight?: Maybe<Scalars['BigFloat']>;
};

/** A filter to be used against `HotOrColdWeightCurrentlyRecord` object types. All fields are combined with a logical ‘and.’ */
export type HotOrColdWeightCurrentlyRecordFilter = {
  /** Filter by the object’s `address` field. */
  address?: InputMaybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<HotOrColdWeightCurrentlyRecordFilter>>;
  /** Negates the expression. */
  not?: InputMaybe<HotOrColdWeightCurrentlyRecordFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<HotOrColdWeightCurrentlyRecordFilter>>;
  /** Filter by the object’s `totalWeight` field. */
  totalWeight?: InputMaybe<BigFloatFilter>;
};

/** A `HotOrColdWeightRecord` edge in the connection. */
export type HotOrColdWeightEdge = {
  __typename?: 'HotOrColdWeightEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `HotOrColdWeightRecord` at the end of the edge. */
  node?: Maybe<HotOrColdWeightRecord>;
};

/** The return type of our `hotOrColdWeight` query. */
export type HotOrColdWeightRecord = {
  __typename?: 'HotOrColdWeightRecord';
  address?: Maybe<Scalars['String']>;
  totalWeight?: Maybe<Scalars['BigFloat']>;
};

/** A filter to be used against `HotOrColdWeightRecord` object types. All fields are combined with a logical ‘and.’ */
export type HotOrColdWeightRecordFilter = {
  /** Filter by the object’s `address` field. */
  address?: InputMaybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<HotOrColdWeightRecordFilter>>;
  /** Negates the expression. */
  not?: InputMaybe<HotOrColdWeightRecordFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<HotOrColdWeightRecordFilter>>;
  /** Filter by the object’s `totalWeight` field. */
  totalWeight?: InputMaybe<BigFloatFilter>;
};

/** A filter to be used against Int fields. All fields are combined with a logical ‘and.’ */
export type IntFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Int']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Int']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Int']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Int']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Int']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Int']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Int']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Int']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Int']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

/** A connection to a list of `MkrDelegatedToRecord` values. */
export type MkrDelegatedToConnection = {
  __typename?: 'MkrDelegatedToConnection';
  /** A list of edges which contains the `MkrDelegatedToRecord` and cursor to aid in pagination. */
  edges: Array<MkrDelegatedToEdge>;
  /** A list of `MkrDelegatedToRecord` objects. */
  nodes: Array<Maybe<MkrDelegatedToRecord>>;
};

/** A `MkrDelegatedToRecord` edge in the connection. */
export type MkrDelegatedToEdge = {
  __typename?: 'MkrDelegatedToEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `MkrDelegatedToRecord` at the end of the edge. */
  node?: Maybe<MkrDelegatedToRecord>;
};

/** The return type of our `mkrDelegatedTo` query. */
export type MkrDelegatedToRecord = {
  __typename?: 'MkrDelegatedToRecord';
  blockNumber?: Maybe<Scalars['Int']>;
  blockTimestamp?: Maybe<Scalars['Datetime']>;
  fromAddress?: Maybe<Scalars['String']>;
  hash?: Maybe<Scalars['String']>;
  immediateCaller?: Maybe<Scalars['String']>;
  lockAmount?: Maybe<Scalars['BigFloat']>;
};

/** A filter to be used against `MkrDelegatedToRecord` object types. All fields are combined with a logical ‘and.’ */
export type MkrDelegatedToRecordFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<MkrDelegatedToRecordFilter>>;
  /** Filter by the object’s `blockNumber` field. */
  blockNumber?: InputMaybe<IntFilter>;
  /** Filter by the object’s `blockTimestamp` field. */
  blockTimestamp?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `fromAddress` field. */
  fromAddress?: InputMaybe<StringFilter>;
  /** Filter by the object’s `hash` field. */
  hash?: InputMaybe<StringFilter>;
  /** Filter by the object’s `immediateCaller` field. */
  immediateCaller?: InputMaybe<StringFilter>;
  /** Filter by the object’s `lockAmount` field. */
  lockAmount?: InputMaybe<BigFloatFilter>;
  /** Negates the expression. */
  not?: InputMaybe<MkrDelegatedToRecordFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<MkrDelegatedToRecordFilter>>;
};

/** A connection to a list of `MkrDelegatedToV2Record` values. */
export type MkrDelegatedToV2Connection = {
  __typename?: 'MkrDelegatedToV2Connection';
  /** A list of edges which contains the `MkrDelegatedToV2Record` and cursor to aid in pagination. */
  edges: Array<MkrDelegatedToV2Edge>;
  /** A list of `MkrDelegatedToV2Record` objects. */
  nodes: Array<Maybe<MkrDelegatedToV2Record>>;
};

/** A `MkrDelegatedToV2Record` edge in the connection. */
export type MkrDelegatedToV2Edge = {
  __typename?: 'MkrDelegatedToV2Edge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `MkrDelegatedToV2Record` at the end of the edge. */
  node?: Maybe<MkrDelegatedToV2Record>;
};

/** The return type of our `mkrDelegatedToV2` query. */
export type MkrDelegatedToV2Record = {
  __typename?: 'MkrDelegatedToV2Record';
  blockNumber?: Maybe<Scalars['Int']>;
  blockTimestamp?: Maybe<Scalars['Datetime']>;
  delegateContractAddress?: Maybe<Scalars['String']>;
  fromAddress?: Maybe<Scalars['String']>;
  hash?: Maybe<Scalars['String']>;
  immediateCaller?: Maybe<Scalars['String']>;
  lockAmount?: Maybe<Scalars['BigFloat']>;
};

/** A filter to be used against `MkrDelegatedToV2Record` object types. All fields are combined with a logical ‘and.’ */
export type MkrDelegatedToV2RecordFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<MkrDelegatedToV2RecordFilter>>;
  /** Filter by the object’s `blockNumber` field. */
  blockNumber?: InputMaybe<IntFilter>;
  /** Filter by the object’s `blockTimestamp` field. */
  blockTimestamp?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `delegateContractAddress` field. */
  delegateContractAddress?: InputMaybe<StringFilter>;
  /** Filter by the object’s `fromAddress` field. */
  fromAddress?: InputMaybe<StringFilter>;
  /** Filter by the object’s `hash` field. */
  hash?: InputMaybe<StringFilter>;
  /** Filter by the object’s `immediateCaller` field. */
  immediateCaller?: InputMaybe<StringFilter>;
  /** Filter by the object’s `lockAmount` field. */
  lockAmount?: InputMaybe<BigFloatFilter>;
  /** Negates the expression. */
  not?: InputMaybe<MkrDelegatedToV2RecordFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<MkrDelegatedToV2RecordFilter>>;
};

/** A connection to a list of `MkrLockedDelegateArrayRecord` values. */
export type MkrLockedDelegateArrayConnection = {
  __typename?: 'MkrLockedDelegateArrayConnection';
  /** A list of edges which contains the `MkrLockedDelegateArrayRecord` and cursor to aid in pagination. */
  edges: Array<MkrLockedDelegateArrayEdge>;
  /** A list of `MkrLockedDelegateArrayRecord` objects. */
  nodes: Array<Maybe<MkrLockedDelegateArrayRecord>>;
};

/** A `MkrLockedDelegateArrayRecord` edge in the connection. */
export type MkrLockedDelegateArrayEdge = {
  __typename?: 'MkrLockedDelegateArrayEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `MkrLockedDelegateArrayRecord` at the end of the edge. */
  node?: Maybe<MkrLockedDelegateArrayRecord>;
};

/** The return type of our `mkrLockedDelegateArray` query. */
export type MkrLockedDelegateArrayRecord = {
  __typename?: 'MkrLockedDelegateArrayRecord';
  blockNumber?: Maybe<Scalars['Int']>;
  blockTimestamp?: Maybe<Scalars['Datetime']>;
  fromAddress?: Maybe<Scalars['String']>;
  hash?: Maybe<Scalars['String']>;
  immediateCaller?: Maybe<Scalars['String']>;
  lockAmount?: Maybe<Scalars['BigFloat']>;
  lockTotal?: Maybe<Scalars['BigFloat']>;
};

/** A filter to be used against `MkrLockedDelegateArrayRecord` object types. All fields are combined with a logical ‘and.’ */
export type MkrLockedDelegateArrayRecordFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<MkrLockedDelegateArrayRecordFilter>>;
  /** Filter by the object’s `blockNumber` field. */
  blockNumber?: InputMaybe<IntFilter>;
  /** Filter by the object’s `blockTimestamp` field. */
  blockTimestamp?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `fromAddress` field. */
  fromAddress?: InputMaybe<StringFilter>;
  /** Filter by the object’s `hash` field. */
  hash?: InputMaybe<StringFilter>;
  /** Filter by the object’s `immediateCaller` field. */
  immediateCaller?: InputMaybe<StringFilter>;
  /** Filter by the object’s `lockAmount` field. */
  lockAmount?: InputMaybe<BigFloatFilter>;
  /** Filter by the object’s `lockTotal` field. */
  lockTotal?: InputMaybe<BigFloatFilter>;
  /** Negates the expression. */
  not?: InputMaybe<MkrLockedDelegateArrayRecordFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<MkrLockedDelegateArrayRecordFilter>>;
};

/** A `MkrLockedDelegateArrayTotalsRecord` edge in the connection. */
export type MkrLockedDelegateArrayTotalEdge = {
  __typename?: 'MkrLockedDelegateArrayTotalEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `MkrLockedDelegateArrayTotalsRecord` at the end of the edge. */
  node?: Maybe<MkrLockedDelegateArrayTotalsRecord>;
};

/** A connection to a list of `MkrLockedDelegateArrayTotalsRecord` values. */
export type MkrLockedDelegateArrayTotalsConnection = {
  __typename?: 'MkrLockedDelegateArrayTotalsConnection';
  /** A list of edges which contains the `MkrLockedDelegateArrayTotalsRecord` and cursor to aid in pagination. */
  edges: Array<MkrLockedDelegateArrayTotalEdge>;
  /** A list of `MkrLockedDelegateArrayTotalsRecord` objects. */
  nodes: Array<Maybe<MkrLockedDelegateArrayTotalsRecord>>;
};

/** The return type of our `mkrLockedDelegateArrayTotals` query. */
export type MkrLockedDelegateArrayTotalsRecord = {
  __typename?: 'MkrLockedDelegateArrayTotalsRecord';
  blockNumber?: Maybe<Scalars['Int']>;
  blockTimestamp?: Maybe<Scalars['Datetime']>;
  callerLockTotal?: Maybe<Scalars['BigFloat']>;
  fromAddress?: Maybe<Scalars['String']>;
  hash?: Maybe<Scalars['String']>;
  immediateCaller?: Maybe<Scalars['String']>;
  lockAmount?: Maybe<Scalars['BigFloat']>;
  lockTotal?: Maybe<Scalars['BigFloat']>;
};

/** A filter to be used against `MkrLockedDelegateArrayTotalsRecord` object types. All fields are combined with a logical ‘and.’ */
export type MkrLockedDelegateArrayTotalsRecordFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<MkrLockedDelegateArrayTotalsRecordFilter>>;
  /** Filter by the object’s `blockNumber` field. */
  blockNumber?: InputMaybe<IntFilter>;
  /** Filter by the object’s `blockTimestamp` field. */
  blockTimestamp?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `callerLockTotal` field. */
  callerLockTotal?: InputMaybe<BigFloatFilter>;
  /** Filter by the object’s `fromAddress` field. */
  fromAddress?: InputMaybe<StringFilter>;
  /** Filter by the object’s `hash` field. */
  hash?: InputMaybe<StringFilter>;
  /** Filter by the object’s `immediateCaller` field. */
  immediateCaller?: InputMaybe<StringFilter>;
  /** Filter by the object’s `lockAmount` field. */
  lockAmount?: InputMaybe<BigFloatFilter>;
  /** Filter by the object’s `lockTotal` field. */
  lockTotal?: InputMaybe<BigFloatFilter>;
  /** Negates the expression. */
  not?: InputMaybe<MkrLockedDelegateArrayTotalsRecordFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<MkrLockedDelegateArrayTotalsRecordFilter>>;
};

/** A connection to a list of `MkrLockedDelegateArrayTotalsV2Record` values. */
export type MkrLockedDelegateArrayTotalsV2Connection = {
  __typename?: 'MkrLockedDelegateArrayTotalsV2Connection';
  /** A list of edges which contains the `MkrLockedDelegateArrayTotalsV2Record` and cursor to aid in pagination. */
  edges: Array<MkrLockedDelegateArrayTotalsV2Edge>;
  /** A list of `MkrLockedDelegateArrayTotalsV2Record` objects. */
  nodes: Array<Maybe<MkrLockedDelegateArrayTotalsV2Record>>;
};

/** A `MkrLockedDelegateArrayTotalsV2Record` edge in the connection. */
export type MkrLockedDelegateArrayTotalsV2Edge = {
  __typename?: 'MkrLockedDelegateArrayTotalsV2Edge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `MkrLockedDelegateArrayTotalsV2Record` at the end of the edge. */
  node?: Maybe<MkrLockedDelegateArrayTotalsV2Record>;
};

/** The return type of our `mkrLockedDelegateArrayTotalsV2` query. */
export type MkrLockedDelegateArrayTotalsV2Record = {
  __typename?: 'MkrLockedDelegateArrayTotalsV2Record';
  blockNumber?: Maybe<Scalars['Int']>;
  blockTimestamp?: Maybe<Scalars['Datetime']>;
  callerLockTotal?: Maybe<Scalars['BigFloat']>;
  delegateContractAddress?: Maybe<Scalars['String']>;
  fromAddress?: Maybe<Scalars['String']>;
  hash?: Maybe<Scalars['String']>;
  immediateCaller?: Maybe<Scalars['String']>;
  lockAmount?: Maybe<Scalars['BigFloat']>;
  lockTotal?: Maybe<Scalars['BigFloat']>;
};

/** A filter to be used against `MkrLockedDelegateArrayTotalsV2Record` object types. All fields are combined with a logical ‘and.’ */
export type MkrLockedDelegateArrayTotalsV2RecordFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<MkrLockedDelegateArrayTotalsV2RecordFilter>>;
  /** Filter by the object’s `blockNumber` field. */
  blockNumber?: InputMaybe<IntFilter>;
  /** Filter by the object’s `blockTimestamp` field. */
  blockTimestamp?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `callerLockTotal` field. */
  callerLockTotal?: InputMaybe<BigFloatFilter>;
  /** Filter by the object’s `delegateContractAddress` field. */
  delegateContractAddress?: InputMaybe<StringFilter>;
  /** Filter by the object’s `fromAddress` field. */
  fromAddress?: InputMaybe<StringFilter>;
  /** Filter by the object’s `hash` field. */
  hash?: InputMaybe<StringFilter>;
  /** Filter by the object’s `immediateCaller` field. */
  immediateCaller?: InputMaybe<StringFilter>;
  /** Filter by the object’s `lockAmount` field. */
  lockAmount?: InputMaybe<BigFloatFilter>;
  /** Filter by the object’s `lockTotal` field. */
  lockTotal?: InputMaybe<BigFloatFilter>;
  /** Negates the expression. */
  not?: InputMaybe<MkrLockedDelegateArrayTotalsV2RecordFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<MkrLockedDelegateArrayTotalsV2RecordFilter>>;
};

/** A connection to a list of `MkrLockedDelegateRecord` values. */
export type MkrLockedDelegateConnection = {
  __typename?: 'MkrLockedDelegateConnection';
  /** A list of edges which contains the `MkrLockedDelegateRecord` and cursor to aid in pagination. */
  edges: Array<MkrLockedDelegateEdge>;
  /** A list of `MkrLockedDelegateRecord` objects. */
  nodes: Array<Maybe<MkrLockedDelegateRecord>>;
};

/** A `MkrLockedDelegateRecord` edge in the connection. */
export type MkrLockedDelegateEdge = {
  __typename?: 'MkrLockedDelegateEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `MkrLockedDelegateRecord` at the end of the edge. */
  node?: Maybe<MkrLockedDelegateRecord>;
};

/** The return type of our `mkrLockedDelegate` query. */
export type MkrLockedDelegateRecord = {
  __typename?: 'MkrLockedDelegateRecord';
  blockNumber?: Maybe<Scalars['Int']>;
  blockTimestamp?: Maybe<Scalars['Datetime']>;
  fromAddress?: Maybe<Scalars['String']>;
  hash?: Maybe<Scalars['String']>;
  immediateCaller?: Maybe<Scalars['String']>;
  lockAmount?: Maybe<Scalars['BigFloat']>;
  lockTotal?: Maybe<Scalars['BigFloat']>;
};

/** A filter to be used against `MkrLockedDelegateRecord` object types. All fields are combined with a logical ‘and.’ */
export type MkrLockedDelegateRecordFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<MkrLockedDelegateRecordFilter>>;
  /** Filter by the object’s `blockNumber` field. */
  blockNumber?: InputMaybe<IntFilter>;
  /** Filter by the object’s `blockTimestamp` field. */
  blockTimestamp?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `fromAddress` field. */
  fromAddress?: InputMaybe<StringFilter>;
  /** Filter by the object’s `hash` field. */
  hash?: InputMaybe<StringFilter>;
  /** Filter by the object’s `immediateCaller` field. */
  immediateCaller?: InputMaybe<StringFilter>;
  /** Filter by the object’s `lockAmount` field. */
  lockAmount?: InputMaybe<BigFloatFilter>;
  /** Filter by the object’s `lockTotal` field. */
  lockTotal?: InputMaybe<BigFloatFilter>;
  /** Negates the expression. */
  not?: InputMaybe<MkrLockedDelegateRecordFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<MkrLockedDelegateRecordFilter>>;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
};

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  activePollById: ActivePollByIdConnection;
  activePollByMultihash: ActivePollByMultihashConnection;
  activePolls: ActivePollsConnection;
  allCurrentVotes: AllCurrentVotesConnection;
  allCurrentVotesArray: AllCurrentVotesArrayConnection;
  allDelegates: AllDelegatesConnection;
  allEsmJoins: AllEsmJoinsConnection;
  allEsmV2Joins: AllEsmV2JoinsConnection;
  allLocksSummed: AllLocksSummedConnection;
  buggyVoteAddressMkrWeightsAtTime: BuggyVoteAddressMkrWeightsAtTimeConnection;
  buggyVoteMkrWeightsAtTimeRankedChoice: BuggyVoteMkrWeightsAtTimeRankedChoiceConnection;
  combinedChiefAndMkrBalances: CombinedChiefAndMkrBalancesConnection;
  combinedChiefAndMkrBalancesAtTime: CombinedChiefAndMkrBalancesAtTimeConnection;
  combinedChiefAndMkrBalancesCurrently: CombinedChiefAndMkrBalancesCurrentlyConnection;
  currentVote: CurrentVoteConnection;
  currentVoteRankedChoice: CurrentVoteRankedChoiceConnection;
  hotOrColdWeight: HotOrColdWeightConnection;
  hotOrColdWeightAtTime: HotOrColdWeightAtTimeConnection;
  hotOrColdWeightCurrently: HotOrColdWeightCurrentlyConnection;
  mkrDelegatedTo: MkrDelegatedToConnection;
  mkrDelegatedToV2: MkrDelegatedToV2Connection;
  mkrLockedDelegate: MkrLockedDelegateConnection;
  mkrLockedDelegateArray: MkrLockedDelegateArrayConnection;
  mkrLockedDelegateArrayTotals: MkrLockedDelegateArrayTotalsConnection;
  mkrLockedDelegateArrayTotalsV2: MkrLockedDelegateArrayTotalsV2Connection;
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID'];
  /** Exposes the root query type nested one level down. This is helpful for Relay 1 which can only query top level fields if they are in a particular form. */
  query: Query;
  timeToBlockNumber: TimeToBlockNumberConnection;
  totalMkrWeightProxyAndNoProxyByAddress: TotalMkrWeightProxyAndNoProxyByAddressConnection;
  totalMkrWeightProxyAndNoProxyByAddressAtTime: TotalMkrWeightProxyAndNoProxyByAddressAtTimeConnection;
  totalMkrWeightProxyAndNoProxyByAddressCurrently: TotalMkrWeightProxyAndNoProxyByAddressCurrentlyConnection;
  uniqueVoters: UniqueVotersConnection;
  voteAddressMkrWeightsAtTime: VoteAddressMkrWeightsAtTimeConnection;
  voteMkrWeightsAtTimeRankedChoice: VoteMkrWeightsAtTimeRankedChoiceConnection;
  voteOptionMkrWeights: VoteOptionMkrWeightsConnection;
  voteOptionMkrWeightsAtTime: VoteOptionMkrWeightsAtTimeConnection;
  voteOptionMkrWeightsCurrently: VoteOptionMkrWeightsCurrentlyConnection;
};

/** The root query type which gives access points into the data universe. */
export type QueryActivePollByIdArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  argPollId: Scalars['Int'];
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<ActivePollByIdRecordFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

/** The root query type which gives access points into the data universe. */
export type QueryActivePollByMultihashArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  argPollMultihash: Scalars['String'];
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<ActivePollByMultihashRecordFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

/** The root query type which gives access points into the data universe. */
export type QueryActivePollsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<ActivePollsRecordFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

/** The root query type which gives access points into the data universe. */
export type QueryAllCurrentVotesArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  argAddress: Scalars['String'];
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<AllCurrentVotesRecordFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

/** The root query type which gives access points into the data universe. */
export type QueryAllCurrentVotesArrayArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  argAddress: Array<InputMaybe<Scalars['String']>>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<AllCurrentVotesArrayRecordFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

/** The root query type which gives access points into the data universe. */
export type QueryAllDelegatesArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<AllDelegatesRecordFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

/** The root query type which gives access points into the data universe. */
export type QueryAllEsmJoinsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<AllEsmJoinsRecordFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

/** The root query type which gives access points into the data universe. */
export type QueryAllEsmV2JoinsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<AllEsmV2JoinsRecordFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

/** The root query type which gives access points into the data universe. */
export type QueryAllLocksSummedArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<AllLocksSummedRecordFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  unixtimeEnd: Scalars['Int'];
  unixtimeStart: Scalars['Int'];
};

/** The root query type which gives access points into the data universe. */
export type QueryBuggyVoteAddressMkrWeightsAtTimeArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  argPollId: Scalars['Int'];
  argUnix: Scalars['Int'];
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<BuggyVoteAddressMkrWeightsAtTimeRecordFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

/** The root query type which gives access points into the data universe. */
export type QueryBuggyVoteMkrWeightsAtTimeRankedChoiceArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  argPollId: Scalars['Int'];
  argUnix: Scalars['Int'];
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<BuggyVoteMkrWeightsAtTimeRankedChoiceRecordFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

/** The root query type which gives access points into the data universe. */
export type QueryCombinedChiefAndMkrBalancesArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  argBlockNumber: Scalars['Int'];
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<CombinedChiefAndMkrBalancesRecordFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

/** The root query type which gives access points into the data universe. */
export type QueryCombinedChiefAndMkrBalancesAtTimeArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  argUnix: Scalars['Int'];
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<CombinedChiefAndMkrBalancesAtTimeRecordFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

/** The root query type which gives access points into the data universe. */
export type QueryCombinedChiefAndMkrBalancesCurrentlyArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<CombinedChiefAndMkrBalancesCurrentlyRecordFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

/** The root query type which gives access points into the data universe. */
export type QueryCurrentVoteArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  argAddress: Scalars['String'];
  argPollId: Scalars['Int'];
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<CurrentVoteRecordFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

/** The root query type which gives access points into the data universe. */
export type QueryCurrentVoteRankedChoiceArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  argAddress: Scalars['String'];
  argPollId: Scalars['Int'];
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<CurrentVoteRankedChoiceRecordFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

/** The root query type which gives access points into the data universe. */
export type QueryHotOrColdWeightArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  argBlockNumber: Scalars['Int'];
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<HotOrColdWeightRecordFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

/** The root query type which gives access points into the data universe. */
export type QueryHotOrColdWeightAtTimeArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  argUnix: Scalars['Int'];
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<HotOrColdWeightAtTimeRecordFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

/** The root query type which gives access points into the data universe. */
export type QueryHotOrColdWeightCurrentlyArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<HotOrColdWeightCurrentlyRecordFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

/** The root query type which gives access points into the data universe. */
export type QueryMkrDelegatedToArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  argAddress: Scalars['String'];
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<MkrDelegatedToRecordFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

/** The root query type which gives access points into the data universe. */
export type QueryMkrDelegatedToV2Args = {
  after?: InputMaybe<Scalars['Cursor']>;
  argAddress: Scalars['String'];
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<MkrDelegatedToV2RecordFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

/** The root query type which gives access points into the data universe. */
export type QueryMkrLockedDelegateArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  argAddress: Scalars['String'];
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<MkrLockedDelegateRecordFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  unixtimeEnd: Scalars['Int'];
  unixtimeStart: Scalars['Int'];
};

/** The root query type which gives access points into the data universe. */
export type QueryMkrLockedDelegateArrayArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  argAddress: Array<InputMaybe<Scalars['String']>>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<MkrLockedDelegateArrayRecordFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  unixtimeEnd: Scalars['Int'];
  unixtimeStart: Scalars['Int'];
};

/** The root query type which gives access points into the data universe. */
export type QueryMkrLockedDelegateArrayTotalsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  argAddress: Array<InputMaybe<Scalars['String']>>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<MkrLockedDelegateArrayTotalsRecordFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  unixtimeEnd: Scalars['Int'];
  unixtimeStart: Scalars['Int'];
};

/** The root query type which gives access points into the data universe. */
export type QueryMkrLockedDelegateArrayTotalsV2Args = {
  after?: InputMaybe<Scalars['Cursor']>;
  argAddress: Array<InputMaybe<Scalars['String']>>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<MkrLockedDelegateArrayTotalsV2RecordFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  unixtimeEnd: Scalars['Int'];
  unixtimeStart: Scalars['Int'];
};

/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID'];
};

/** The root query type which gives access points into the data universe. */
export type QueryTimeToBlockNumberArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  argUnix: Scalars['Int'];
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<IntFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

/** The root query type which gives access points into the data universe. */
export type QueryTotalMkrWeightProxyAndNoProxyByAddressArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  argAddress: Scalars['String'];
  argBlockNumber: Scalars['Int'];
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<TotalMkrWeightProxyAndNoProxyByAddressRecordFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

/** The root query type which gives access points into the data universe. */
export type QueryTotalMkrWeightProxyAndNoProxyByAddressAtTimeArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  argAddress: Scalars['String'];
  argUnix: Scalars['Int'];
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<TotalMkrWeightProxyAndNoProxyByAddressAtTimeRecordFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

/** The root query type which gives access points into the data universe. */
export type QueryTotalMkrWeightProxyAndNoProxyByAddressCurrentlyArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  argAddress: Scalars['String'];
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<TotalMkrWeightProxyAndNoProxyByAddressCurrentlyRecordFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

/** The root query type which gives access points into the data universe. */
export type QueryUniqueVotersArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  argPollId: Scalars['Int'];
  before?: InputMaybe<Scalars['Cursor']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

/** The root query type which gives access points into the data universe. */
export type QueryVoteAddressMkrWeightsAtTimeArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  argPollId: Scalars['Int'];
  argUnix: Scalars['Int'];
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<VoteAddressMkrWeightsAtTimeRecordFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

/** The root query type which gives access points into the data universe. */
export type QueryVoteMkrWeightsAtTimeRankedChoiceArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  argPollId: Scalars['Int'];
  argUnix: Scalars['Int'];
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<VoteMkrWeightsAtTimeRankedChoiceRecordFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

/** The root query type which gives access points into the data universe. */
export type QueryVoteOptionMkrWeightsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  argBlockNumber: Scalars['Int'];
  argPollId: Scalars['Int'];
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<VoteOptionMkrWeightsRecordFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

/** The root query type which gives access points into the data universe. */
export type QueryVoteOptionMkrWeightsAtTimeArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  argPollId: Scalars['Int'];
  argUnix: Scalars['Int'];
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<VoteOptionMkrWeightsAtTimeRecordFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

/** The root query type which gives access points into the data universe. */
export type QueryVoteOptionMkrWeightsCurrentlyArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  argPollId: Scalars['Int'];
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<VoteOptionMkrWeightsCurrentlyRecordFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

/** A filter to be used against String fields. All fields are combined with a logical ‘and.’ */
export type StringFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['String']>;
  /** Ends with the specified string (case-sensitive). */
  endsWith?: InputMaybe<Scalars['String']>;
  /** Ends with the specified string (case-insensitive). */
  endsWithInsensitive?: InputMaybe<Scalars['String']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['String']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['String']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['String']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['String']>>;
  /** Contains the specified string (case-sensitive). */
  includes?: InputMaybe<Scalars['String']>;
  /** Contains the specified string (case-insensitive). */
  includesInsensitive?: InputMaybe<Scalars['String']>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['String']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['String']>;
  /** Matches the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  like?: InputMaybe<Scalars['String']>;
  /** Matches the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  likeInsensitive?: InputMaybe<Scalars['String']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['String']>;
  /** Does not end with the specified string (case-sensitive). */
  notEndsWith?: InputMaybe<Scalars['String']>;
  /** Does not end with the specified string (case-insensitive). */
  notEndsWithInsensitive?: InputMaybe<Scalars['String']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['String']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['String']>>;
  /** Does not contain the specified string (case-sensitive). */
  notIncludes?: InputMaybe<Scalars['String']>;
  /** Does not contain the specified string (case-insensitive). */
  notIncludesInsensitive?: InputMaybe<Scalars['String']>;
  /** Does not match the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLike?: InputMaybe<Scalars['String']>;
  /** Does not match the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLikeInsensitive?: InputMaybe<Scalars['String']>;
  /** Does not match the specified pattern using the SQL standard's definition of a regular expression. */
  notSimilarTo?: InputMaybe<Scalars['String']>;
  /** Does not start with the specified string (case-sensitive). */
  notStartsWith?: InputMaybe<Scalars['String']>;
  /** Does not start with the specified string (case-insensitive). */
  notStartsWithInsensitive?: InputMaybe<Scalars['String']>;
  /** Matches the specified pattern using the SQL standard's definition of a regular expression. */
  similarTo?: InputMaybe<Scalars['String']>;
  /** Starts with the specified string (case-sensitive). */
  startsWith?: InputMaybe<Scalars['String']>;
  /** Starts with the specified string (case-insensitive). */
  startsWithInsensitive?: InputMaybe<Scalars['String']>;
};

/** A connection to a list of `Int` values. */
export type TimeToBlockNumberConnection = {
  __typename?: 'TimeToBlockNumberConnection';
  /** A list of edges which contains the `Int` and cursor to aid in pagination. */
  edges: Array<TimeToBlockNumberEdge>;
  /** A list of `Int` objects. */
  nodes: Array<Maybe<Scalars['Int']>>;
};

/** A `Int` edge in the connection. */
export type TimeToBlockNumberEdge = {
  __typename?: 'TimeToBlockNumberEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Int` at the end of the edge. */
  node?: Maybe<Scalars['Int']>;
};

/** A connection to a list of `TotalMkrWeightProxyAndNoProxyByAddressAtTimeRecord` values. */
export type TotalMkrWeightProxyAndNoProxyByAddressAtTimeConnection = {
  __typename?: 'TotalMkrWeightProxyAndNoProxyByAddressAtTimeConnection';
  /** A list of edges which contains the `TotalMkrWeightProxyAndNoProxyByAddressAtTimeRecord` and cursor to aid in pagination. */
  edges: Array<TotalMkrWeightProxyAndNoProxyByAddressAtTimeEdge>;
  /** A list of `TotalMkrWeightProxyAndNoProxyByAddressAtTimeRecord` objects. */
  nodes: Array<Maybe<TotalMkrWeightProxyAndNoProxyByAddressAtTimeRecord>>;
};

/** A `TotalMkrWeightProxyAndNoProxyByAddressAtTimeRecord` edge in the connection. */
export type TotalMkrWeightProxyAndNoProxyByAddressAtTimeEdge = {
  __typename?: 'TotalMkrWeightProxyAndNoProxyByAddressAtTimeEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `TotalMkrWeightProxyAndNoProxyByAddressAtTimeRecord` at the end of the edge. */
  node?: Maybe<TotalMkrWeightProxyAndNoProxyByAddressAtTimeRecord>;
};

/** The return type of our `totalMkrWeightProxyAndNoProxyByAddressAtTime` query. */
export type TotalMkrWeightProxyAndNoProxyByAddressAtTimeRecord = {
  __typename?: 'TotalMkrWeightProxyAndNoProxyByAddressAtTimeRecord';
  address?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['BigFloat']>;
};

/** A filter to be used against `TotalMkrWeightProxyAndNoProxyByAddressAtTimeRecord` object types. All fields are combined with a logical ‘and.’ */
export type TotalMkrWeightProxyAndNoProxyByAddressAtTimeRecordFilter = {
  /** Filter by the object’s `address` field. */
  address?: InputMaybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<TotalMkrWeightProxyAndNoProxyByAddressAtTimeRecordFilter>>;
  /** Negates the expression. */
  not?: InputMaybe<TotalMkrWeightProxyAndNoProxyByAddressAtTimeRecordFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<TotalMkrWeightProxyAndNoProxyByAddressAtTimeRecordFilter>>;
  /** Filter by the object’s `weight` field. */
  weight?: InputMaybe<BigFloatFilter>;
};

/** A connection to a list of `TotalMkrWeightProxyAndNoProxyByAddressRecord` values. */
export type TotalMkrWeightProxyAndNoProxyByAddressConnection = {
  __typename?: 'TotalMkrWeightProxyAndNoProxyByAddressConnection';
  /** A list of edges which contains the `TotalMkrWeightProxyAndNoProxyByAddressRecord` and cursor to aid in pagination. */
  edges: Array<TotalMkrWeightProxyAndNoProxyByAddressEdge>;
  /** A list of `TotalMkrWeightProxyAndNoProxyByAddressRecord` objects. */
  nodes: Array<Maybe<TotalMkrWeightProxyAndNoProxyByAddressRecord>>;
};

/** A connection to a list of `TotalMkrWeightProxyAndNoProxyByAddressCurrentlyRecord` values. */
export type TotalMkrWeightProxyAndNoProxyByAddressCurrentlyConnection = {
  __typename?: 'TotalMkrWeightProxyAndNoProxyByAddressCurrentlyConnection';
  /** A list of edges which contains the `TotalMkrWeightProxyAndNoProxyByAddressCurrentlyRecord` and cursor to aid in pagination. */
  edges: Array<TotalMkrWeightProxyAndNoProxyByAddressCurrentlyEdge>;
  /** A list of `TotalMkrWeightProxyAndNoProxyByAddressCurrentlyRecord` objects. */
  nodes: Array<Maybe<TotalMkrWeightProxyAndNoProxyByAddressCurrentlyRecord>>;
};

/** A `TotalMkrWeightProxyAndNoProxyByAddressCurrentlyRecord` edge in the connection. */
export type TotalMkrWeightProxyAndNoProxyByAddressCurrentlyEdge = {
  __typename?: 'TotalMkrWeightProxyAndNoProxyByAddressCurrentlyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `TotalMkrWeightProxyAndNoProxyByAddressCurrentlyRecord` at the end of the edge. */
  node?: Maybe<TotalMkrWeightProxyAndNoProxyByAddressCurrentlyRecord>;
};

/** The return type of our `totalMkrWeightProxyAndNoProxyByAddressCurrently` query. */
export type TotalMkrWeightProxyAndNoProxyByAddressCurrentlyRecord = {
  __typename?: 'TotalMkrWeightProxyAndNoProxyByAddressCurrentlyRecord';
  address?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['BigFloat']>;
};

/** A filter to be used against `TotalMkrWeightProxyAndNoProxyByAddressCurrentlyRecord` object types. All fields are combined with a logical ‘and.’ */
export type TotalMkrWeightProxyAndNoProxyByAddressCurrentlyRecordFilter = {
  /** Filter by the object’s `address` field. */
  address?: InputMaybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<TotalMkrWeightProxyAndNoProxyByAddressCurrentlyRecordFilter>>;
  /** Negates the expression. */
  not?: InputMaybe<TotalMkrWeightProxyAndNoProxyByAddressCurrentlyRecordFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<TotalMkrWeightProxyAndNoProxyByAddressCurrentlyRecordFilter>>;
  /** Filter by the object’s `weight` field. */
  weight?: InputMaybe<BigFloatFilter>;
};

/** A `TotalMkrWeightProxyAndNoProxyByAddressRecord` edge in the connection. */
export type TotalMkrWeightProxyAndNoProxyByAddressEdge = {
  __typename?: 'TotalMkrWeightProxyAndNoProxyByAddressEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `TotalMkrWeightProxyAndNoProxyByAddressRecord` at the end of the edge. */
  node?: Maybe<TotalMkrWeightProxyAndNoProxyByAddressRecord>;
};

/** The return type of our `totalMkrWeightProxyAndNoProxyByAddress` query. */
export type TotalMkrWeightProxyAndNoProxyByAddressRecord = {
  __typename?: 'TotalMkrWeightProxyAndNoProxyByAddressRecord';
  address?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['BigFloat']>;
};

/** A filter to be used against `TotalMkrWeightProxyAndNoProxyByAddressRecord` object types. All fields are combined with a logical ‘and.’ */
export type TotalMkrWeightProxyAndNoProxyByAddressRecordFilter = {
  /** Filter by the object’s `address` field. */
  address?: InputMaybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<TotalMkrWeightProxyAndNoProxyByAddressRecordFilter>>;
  /** Negates the expression. */
  not?: InputMaybe<TotalMkrWeightProxyAndNoProxyByAddressRecordFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<TotalMkrWeightProxyAndNoProxyByAddressRecordFilter>>;
  /** Filter by the object’s `weight` field. */
  weight?: InputMaybe<BigFloatFilter>;
};

/** A `BigInt` edge in the connection. */
export type UniqueVoterEdge = {
  __typename?: 'UniqueVoterEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `BigInt` at the end of the edge. */
  node?: Maybe<Scalars['BigInt']>;
};

/** A connection to a list of `BigInt` values. */
export type UniqueVotersConnection = {
  __typename?: 'UniqueVotersConnection';
  /** A list of edges which contains the `BigInt` and cursor to aid in pagination. */
  edges: Array<UniqueVoterEdge>;
  /** A list of `BigInt` objects. */
  nodes: Array<Maybe<Scalars['BigInt']>>;
};

/** A connection to a list of `VoteAddressMkrWeightsAtTimeRecord` values. */
export type VoteAddressMkrWeightsAtTimeConnection = {
  __typename?: 'VoteAddressMkrWeightsAtTimeConnection';
  /** A list of edges which contains the `VoteAddressMkrWeightsAtTimeRecord` and cursor to aid in pagination. */
  edges: Array<VoteAddressMkrWeightsAtTimeEdge>;
  /** A list of `VoteAddressMkrWeightsAtTimeRecord` objects. */
  nodes: Array<Maybe<VoteAddressMkrWeightsAtTimeRecord>>;
};

/** A `VoteAddressMkrWeightsAtTimeRecord` edge in the connection. */
export type VoteAddressMkrWeightsAtTimeEdge = {
  __typename?: 'VoteAddressMkrWeightsAtTimeEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `VoteAddressMkrWeightsAtTimeRecord` at the end of the edge. */
  node?: Maybe<VoteAddressMkrWeightsAtTimeRecord>;
};

/** The return type of our `voteAddressMkrWeightsAtTime` query. */
export type VoteAddressMkrWeightsAtTimeRecord = {
  __typename?: 'VoteAddressMkrWeightsAtTimeRecord';
  mkrSupport?: Maybe<Scalars['BigFloat']>;
  optionId?: Maybe<Scalars['Int']>;
  optionIdRaw?: Maybe<Scalars['String']>;
  voter?: Maybe<Scalars['String']>;
};

/** A filter to be used against `VoteAddressMkrWeightsAtTimeRecord` object types. All fields are combined with a logical ‘and.’ */
export type VoteAddressMkrWeightsAtTimeRecordFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<VoteAddressMkrWeightsAtTimeRecordFilter>>;
  /** Filter by the object’s `mkrSupport` field. */
  mkrSupport?: InputMaybe<BigFloatFilter>;
  /** Negates the expression. */
  not?: InputMaybe<VoteAddressMkrWeightsAtTimeRecordFilter>;
  /** Filter by the object’s `optionId` field. */
  optionId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `optionIdRaw` field. */
  optionIdRaw?: InputMaybe<StringFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<VoteAddressMkrWeightsAtTimeRecordFilter>>;
  /** Filter by the object’s `voter` field. */
  voter?: InputMaybe<StringFilter>;
};

/** A connection to a list of `VoteMkrWeightsAtTimeRankedChoiceRecord` values. */
export type VoteMkrWeightsAtTimeRankedChoiceConnection = {
  __typename?: 'VoteMkrWeightsAtTimeRankedChoiceConnection';
  /** A list of edges which contains the `VoteMkrWeightsAtTimeRankedChoiceRecord` and cursor to aid in pagination. */
  edges: Array<VoteMkrWeightsAtTimeRankedChoiceEdge>;
  /** A list of `VoteMkrWeightsAtTimeRankedChoiceRecord` objects. */
  nodes: Array<Maybe<VoteMkrWeightsAtTimeRankedChoiceRecord>>;
};

/** A `VoteMkrWeightsAtTimeRankedChoiceRecord` edge in the connection. */
export type VoteMkrWeightsAtTimeRankedChoiceEdge = {
  __typename?: 'VoteMkrWeightsAtTimeRankedChoiceEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `VoteMkrWeightsAtTimeRankedChoiceRecord` at the end of the edge. */
  node?: Maybe<VoteMkrWeightsAtTimeRankedChoiceRecord>;
};

/** The return type of our `voteMkrWeightsAtTimeRankedChoice` query. */
export type VoteMkrWeightsAtTimeRankedChoiceRecord = {
  __typename?: 'VoteMkrWeightsAtTimeRankedChoiceRecord';
  mkrSupport?: Maybe<Scalars['BigFloat']>;
  optionIdRaw?: Maybe<Scalars['String']>;
};

/** A filter to be used against `VoteMkrWeightsAtTimeRankedChoiceRecord` object types. All fields are combined with a logical ‘and.’ */
export type VoteMkrWeightsAtTimeRankedChoiceRecordFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<VoteMkrWeightsAtTimeRankedChoiceRecordFilter>>;
  /** Filter by the object’s `mkrSupport` field. */
  mkrSupport?: InputMaybe<BigFloatFilter>;
  /** Negates the expression. */
  not?: InputMaybe<VoteMkrWeightsAtTimeRankedChoiceRecordFilter>;
  /** Filter by the object’s `optionIdRaw` field. */
  optionIdRaw?: InputMaybe<StringFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<VoteMkrWeightsAtTimeRankedChoiceRecordFilter>>;
};

/** A `VoteOptionMkrWeightsRecord` edge in the connection. */
export type VoteOptionMkrWeightEdge = {
  __typename?: 'VoteOptionMkrWeightEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `VoteOptionMkrWeightsRecord` at the end of the edge. */
  node?: Maybe<VoteOptionMkrWeightsRecord>;
};

/** A connection to a list of `VoteOptionMkrWeightsAtTimeRecord` values. */
export type VoteOptionMkrWeightsAtTimeConnection = {
  __typename?: 'VoteOptionMkrWeightsAtTimeConnection';
  /** A list of edges which contains the `VoteOptionMkrWeightsAtTimeRecord` and cursor to aid in pagination. */
  edges: Array<VoteOptionMkrWeightsAtTimeEdge>;
  /** A list of `VoteOptionMkrWeightsAtTimeRecord` objects. */
  nodes: Array<Maybe<VoteOptionMkrWeightsAtTimeRecord>>;
};

/** A `VoteOptionMkrWeightsAtTimeRecord` edge in the connection. */
export type VoteOptionMkrWeightsAtTimeEdge = {
  __typename?: 'VoteOptionMkrWeightsAtTimeEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `VoteOptionMkrWeightsAtTimeRecord` at the end of the edge. */
  node?: Maybe<VoteOptionMkrWeightsAtTimeRecord>;
};

/** The return type of our `voteOptionMkrWeightsAtTime` query. */
export type VoteOptionMkrWeightsAtTimeRecord = {
  __typename?: 'VoteOptionMkrWeightsAtTimeRecord';
  mkrSupport?: Maybe<Scalars['BigFloat']>;
  optionId?: Maybe<Scalars['Int']>;
};

/** A filter to be used against `VoteOptionMkrWeightsAtTimeRecord` object types. All fields are combined with a logical ‘and.’ */
export type VoteOptionMkrWeightsAtTimeRecordFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<VoteOptionMkrWeightsAtTimeRecordFilter>>;
  /** Filter by the object’s `mkrSupport` field. */
  mkrSupport?: InputMaybe<BigFloatFilter>;
  /** Negates the expression. */
  not?: InputMaybe<VoteOptionMkrWeightsAtTimeRecordFilter>;
  /** Filter by the object’s `optionId` field. */
  optionId?: InputMaybe<IntFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<VoteOptionMkrWeightsAtTimeRecordFilter>>;
};

/** A connection to a list of `VoteOptionMkrWeightsRecord` values. */
export type VoteOptionMkrWeightsConnection = {
  __typename?: 'VoteOptionMkrWeightsConnection';
  /** A list of edges which contains the `VoteOptionMkrWeightsRecord` and cursor to aid in pagination. */
  edges: Array<VoteOptionMkrWeightEdge>;
  /** A list of `VoteOptionMkrWeightsRecord` objects. */
  nodes: Array<Maybe<VoteOptionMkrWeightsRecord>>;
};

/** A connection to a list of `VoteOptionMkrWeightsCurrentlyRecord` values. */
export type VoteOptionMkrWeightsCurrentlyConnection = {
  __typename?: 'VoteOptionMkrWeightsCurrentlyConnection';
  /** A list of edges which contains the `VoteOptionMkrWeightsCurrentlyRecord` and cursor to aid in pagination. */
  edges: Array<VoteOptionMkrWeightsCurrentlyEdge>;
  /** A list of `VoteOptionMkrWeightsCurrentlyRecord` objects. */
  nodes: Array<Maybe<VoteOptionMkrWeightsCurrentlyRecord>>;
};

/** A `VoteOptionMkrWeightsCurrentlyRecord` edge in the connection. */
export type VoteOptionMkrWeightsCurrentlyEdge = {
  __typename?: 'VoteOptionMkrWeightsCurrentlyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `VoteOptionMkrWeightsCurrentlyRecord` at the end of the edge. */
  node?: Maybe<VoteOptionMkrWeightsCurrentlyRecord>;
};

/** The return type of our `voteOptionMkrWeightsCurrently` query. */
export type VoteOptionMkrWeightsCurrentlyRecord = {
  __typename?: 'VoteOptionMkrWeightsCurrentlyRecord';
  mkrSupport?: Maybe<Scalars['BigFloat']>;
  optionId?: Maybe<Scalars['Int']>;
};

/** A filter to be used against `VoteOptionMkrWeightsCurrentlyRecord` object types. All fields are combined with a logical ‘and.’ */
export type VoteOptionMkrWeightsCurrentlyRecordFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<VoteOptionMkrWeightsCurrentlyRecordFilter>>;
  /** Filter by the object’s `mkrSupport` field. */
  mkrSupport?: InputMaybe<BigFloatFilter>;
  /** Negates the expression. */
  not?: InputMaybe<VoteOptionMkrWeightsCurrentlyRecordFilter>;
  /** Filter by the object’s `optionId` field. */
  optionId?: InputMaybe<IntFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<VoteOptionMkrWeightsCurrentlyRecordFilter>>;
};

/** The return type of our `voteOptionMkrWeights` query. */
export type VoteOptionMkrWeightsRecord = {
  __typename?: 'VoteOptionMkrWeightsRecord';
  blockTimestamp?: Maybe<Scalars['Datetime']>;
  mkrSupport?: Maybe<Scalars['BigFloat']>;
  optionId?: Maybe<Scalars['Int']>;
};

/** A filter to be used against `VoteOptionMkrWeightsRecord` object types. All fields are combined with a logical ‘and.’ */
export type VoteOptionMkrWeightsRecordFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<VoteOptionMkrWeightsRecordFilter>>;
  /** Filter by the object’s `blockTimestamp` field. */
  blockTimestamp?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `mkrSupport` field. */
  mkrSupport?: InputMaybe<BigFloatFilter>;
  /** Negates the expression. */
  not?: InputMaybe<VoteOptionMkrWeightsRecordFilter>;
  /** Filter by the object’s `optionId` field. */
  optionId?: InputMaybe<IntFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<VoteOptionMkrWeightsRecordFilter>>;
};

import { IntrospectionQuery } from 'graphql';
export default {
  __schema: {
    queryType: {
      name: 'Query'
    },
    mutationType: null,
    subscriptionType: null,
    types: [
      {
        kind: 'OBJECT',
        name: 'ActivePollByIdConnection',
        fields: [
          {
            name: 'edges',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'ActivePollByIdEdge',
                    ofType: null
                  }
                }
              }
            },
            args: []
          },
          {
            name: 'nodes',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'ActivePollByIdRecord',
                  ofType: null
                }
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'ActivePollByIdEdge',
        fields: [
          {
            name: 'cursor',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'node',
            type: {
              kind: 'OBJECT',
              name: 'ActivePollByIdRecord',
              ofType: null
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'ActivePollByIdRecord',
        fields: [
          {
            name: 'blockCreated',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'creator',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'endDate',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'multiHash',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'pollId',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'startDate',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'url',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'ActivePollByMultihashConnection',
        fields: [
          {
            name: 'edges',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'ActivePollByMultihashEdge',
                    ofType: null
                  }
                }
              }
            },
            args: []
          },
          {
            name: 'nodes',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'ActivePollByMultihashRecord',
                  ofType: null
                }
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'ActivePollByMultihashEdge',
        fields: [
          {
            name: 'cursor',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'node',
            type: {
              kind: 'OBJECT',
              name: 'ActivePollByMultihashRecord',
              ofType: null
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'ActivePollByMultihashRecord',
        fields: [
          {
            name: 'blockCreated',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'creator',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'endDate',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'multiHash',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'pollId',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'startDate',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'url',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'ActivePollEdge',
        fields: [
          {
            name: 'cursor',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'node',
            type: {
              kind: 'OBJECT',
              name: 'ActivePollsRecord',
              ofType: null
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'ActivePollsConnection',
        fields: [
          {
            name: 'edges',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'ActivePollEdge',
                    ofType: null
                  }
                }
              }
            },
            args: []
          },
          {
            name: 'nodes',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'ActivePollsRecord',
                  ofType: null
                }
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'ActivePollsRecord',
        fields: [
          {
            name: 'blockCreated',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'creator',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'endDate',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'multiHash',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'pollId',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'startDate',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'url',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'AllCurrentVoteEdge',
        fields: [
          {
            name: 'cursor',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'node',
            type: {
              kind: 'OBJECT',
              name: 'AllCurrentVotesRecord',
              ofType: null
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'AllCurrentVotesArrayConnection',
        fields: [
          {
            name: 'edges',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'AllCurrentVotesArrayEdge',
                    ofType: null
                  }
                }
              }
            },
            args: []
          },
          {
            name: 'nodes',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'AllCurrentVotesArrayRecord',
                  ofType: null
                }
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'AllCurrentVotesArrayEdge',
        fields: [
          {
            name: 'cursor',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'node',
            type: {
              kind: 'OBJECT',
              name: 'AllCurrentVotesArrayRecord',
              ofType: null
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'AllCurrentVotesArrayRecord',
        fields: [
          {
            name: 'blockTimestamp',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'optionId',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'optionIdRaw',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'pollId',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'voter',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'AllCurrentVotesConnection',
        fields: [
          {
            name: 'edges',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'AllCurrentVoteEdge',
                    ofType: null
                  }
                }
              }
            },
            args: []
          },
          {
            name: 'nodes',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'AllCurrentVotesRecord',
                  ofType: null
                }
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'AllCurrentVotesRecord',
        fields: [
          {
            name: 'blockTimestamp',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'optionId',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'optionIdRaw',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'pollId',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'AllDelegateEdge',
        fields: [
          {
            name: 'cursor',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'node',
            type: {
              kind: 'OBJECT',
              name: 'AllDelegatesRecord',
              ofType: null
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'AllDelegatesConnection',
        fields: [
          {
            name: 'edges',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'AllDelegateEdge',
                    ofType: null
                  }
                }
              }
            },
            args: []
          },
          {
            name: 'nodes',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'AllDelegatesRecord',
                  ofType: null
                }
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'AllDelegatesRecord',
        fields: [
          {
            name: 'blockTimestamp',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'delegate',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'voteDelegate',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'AllEsmJoinEdge',
        fields: [
          {
            name: 'cursor',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'node',
            type: {
              kind: 'OBJECT',
              name: 'AllEsmJoinsRecord',
              ofType: null
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'AllEsmJoinsConnection',
        fields: [
          {
            name: 'edges',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'AllEsmJoinEdge',
                    ofType: null
                  }
                }
              }
            },
            args: []
          },
          {
            name: 'nodes',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'AllEsmJoinsRecord',
                  ofType: null
                }
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'AllEsmJoinsRecord',
        fields: [
          {
            name: 'blockTimestamp',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'joinAmount',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'txFrom',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'txHash',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'AllEsmV2JoinEdge',
        fields: [
          {
            name: 'cursor',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'node',
            type: {
              kind: 'OBJECT',
              name: 'AllEsmV2JoinsRecord',
              ofType: null
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'AllEsmV2JoinsConnection',
        fields: [
          {
            name: 'edges',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'AllEsmV2JoinEdge',
                    ofType: null
                  }
                }
              }
            },
            args: []
          },
          {
            name: 'nodes',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'AllEsmV2JoinsRecord',
                  ofType: null
                }
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'AllEsmV2JoinsRecord',
        fields: [
          {
            name: 'blockTimestamp',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'joinAmount',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'txFrom',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'txHash',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'AllLocksSummedConnection',
        fields: [
          {
            name: 'edges',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'AllLocksSummedEdge',
                    ofType: null
                  }
                }
              }
            },
            args: []
          },
          {
            name: 'nodes',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'AllLocksSummedRecord',
                  ofType: null
                }
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'AllLocksSummedEdge',
        fields: [
          {
            name: 'cursor',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'node',
            type: {
              kind: 'OBJECT',
              name: 'AllLocksSummedRecord',
              ofType: null
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'AllLocksSummedRecord',
        fields: [
          {
            name: 'blockNumber',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'blockTimestamp',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'fromAddress',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'hash',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'immediateCaller',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'lockAmount',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'lockTotal',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'BuggyVoteAddressMkrWeightsAtTimeConnection',
        fields: [
          {
            name: 'edges',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'BuggyVoteAddressMkrWeightsAtTimeEdge',
                    ofType: null
                  }
                }
              }
            },
            args: []
          },
          {
            name: 'nodes',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'BuggyVoteAddressMkrWeightsAtTimeRecord',
                  ofType: null
                }
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'BuggyVoteAddressMkrWeightsAtTimeEdge',
        fields: [
          {
            name: 'cursor',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'node',
            type: {
              kind: 'OBJECT',
              name: 'BuggyVoteAddressMkrWeightsAtTimeRecord',
              ofType: null
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'BuggyVoteAddressMkrWeightsAtTimeRecord',
        fields: [
          {
            name: 'mkrSupport',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'optionId',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'optionIdRaw',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'voter',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'BuggyVoteMkrWeightsAtTimeRankedChoiceConnection',
        fields: [
          {
            name: 'edges',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'BuggyVoteMkrWeightsAtTimeRankedChoiceEdge',
                    ofType: null
                  }
                }
              }
            },
            args: []
          },
          {
            name: 'nodes',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'BuggyVoteMkrWeightsAtTimeRankedChoiceRecord',
                  ofType: null
                }
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'BuggyVoteMkrWeightsAtTimeRankedChoiceEdge',
        fields: [
          {
            name: 'cursor',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'node',
            type: {
              kind: 'OBJECT',
              name: 'BuggyVoteMkrWeightsAtTimeRankedChoiceRecord',
              ofType: null
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'BuggyVoteMkrWeightsAtTimeRankedChoiceRecord',
        fields: [
          {
            name: 'mkrSupport',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'optionIdRaw',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'CombinedChiefAndMkrBalanceEdge',
        fields: [
          {
            name: 'cursor',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'node',
            type: {
              kind: 'OBJECT',
              name: 'CombinedChiefAndMkrBalancesRecord',
              ofType: null
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'CombinedChiefAndMkrBalancesAtTimeConnection',
        fields: [
          {
            name: 'edges',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'CombinedChiefAndMkrBalancesAtTimeEdge',
                    ofType: null
                  }
                }
              }
            },
            args: []
          },
          {
            name: 'nodes',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'CombinedChiefAndMkrBalancesAtTimeRecord',
                  ofType: null
                }
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'CombinedChiefAndMkrBalancesAtTimeEdge',
        fields: [
          {
            name: 'cursor',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'node',
            type: {
              kind: 'OBJECT',
              name: 'CombinedChiefAndMkrBalancesAtTimeRecord',
              ofType: null
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'CombinedChiefAndMkrBalancesAtTimeRecord',
        fields: [
          {
            name: 'address',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'mkrAndChiefBalance',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'CombinedChiefAndMkrBalancesConnection',
        fields: [
          {
            name: 'edges',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'CombinedChiefAndMkrBalanceEdge',
                    ofType: null
                  }
                }
              }
            },
            args: []
          },
          {
            name: 'nodes',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'CombinedChiefAndMkrBalancesRecord',
                  ofType: null
                }
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'CombinedChiefAndMkrBalancesCurrentlyConnection',
        fields: [
          {
            name: 'edges',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'CombinedChiefAndMkrBalancesCurrentlyEdge',
                    ofType: null
                  }
                }
              }
            },
            args: []
          },
          {
            name: 'nodes',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'CombinedChiefAndMkrBalancesCurrentlyRecord',
                  ofType: null
                }
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'CombinedChiefAndMkrBalancesCurrentlyEdge',
        fields: [
          {
            name: 'cursor',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'node',
            type: {
              kind: 'OBJECT',
              name: 'CombinedChiefAndMkrBalancesCurrentlyRecord',
              ofType: null
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'CombinedChiefAndMkrBalancesCurrentlyRecord',
        fields: [
          {
            name: 'address',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'mkrAndChiefBalance',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'CombinedChiefAndMkrBalancesRecord',
        fields: [
          {
            name: 'address',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'mkrAndChiefBalance',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'CurrentVoteConnection',
        fields: [
          {
            name: 'edges',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'CurrentVoteEdge',
                    ofType: null
                  }
                }
              }
            },
            args: []
          },
          {
            name: 'nodes',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'CurrentVoteRecord',
                  ofType: null
                }
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'CurrentVoteEdge',
        fields: [
          {
            name: 'cursor',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'node',
            type: {
              kind: 'OBJECT',
              name: 'CurrentVoteRecord',
              ofType: null
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'CurrentVoteRankedChoiceConnection',
        fields: [
          {
            name: 'edges',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'CurrentVoteRankedChoiceEdge',
                    ofType: null
                  }
                }
              }
            },
            args: []
          },
          {
            name: 'nodes',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'CurrentVoteRankedChoiceRecord',
                  ofType: null
                }
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'CurrentVoteRankedChoiceEdge',
        fields: [
          {
            name: 'cursor',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'node',
            type: {
              kind: 'OBJECT',
              name: 'CurrentVoteRankedChoiceRecord',
              ofType: null
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'CurrentVoteRankedChoiceRecord',
        fields: [
          {
            name: 'blockId',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'optionIdRaw',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'CurrentVoteRecord',
        fields: [
          {
            name: 'blockId',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'optionId',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'HotOrColdWeightAtTimeConnection',
        fields: [
          {
            name: 'edges',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'HotOrColdWeightAtTimeEdge',
                    ofType: null
                  }
                }
              }
            },
            args: []
          },
          {
            name: 'nodes',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'HotOrColdWeightAtTimeRecord',
                  ofType: null
                }
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'HotOrColdWeightAtTimeEdge',
        fields: [
          {
            name: 'cursor',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'node',
            type: {
              kind: 'OBJECT',
              name: 'HotOrColdWeightAtTimeRecord',
              ofType: null
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'HotOrColdWeightAtTimeRecord',
        fields: [
          {
            name: 'address',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'totalWeight',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'HotOrColdWeightConnection',
        fields: [
          {
            name: 'edges',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'HotOrColdWeightEdge',
                    ofType: null
                  }
                }
              }
            },
            args: []
          },
          {
            name: 'nodes',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'HotOrColdWeightRecord',
                  ofType: null
                }
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'HotOrColdWeightCurrentlyConnection',
        fields: [
          {
            name: 'edges',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'HotOrColdWeightCurrentlyEdge',
                    ofType: null
                  }
                }
              }
            },
            args: []
          },
          {
            name: 'nodes',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'HotOrColdWeightCurrentlyRecord',
                  ofType: null
                }
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'HotOrColdWeightCurrentlyEdge',
        fields: [
          {
            name: 'cursor',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'node',
            type: {
              kind: 'OBJECT',
              name: 'HotOrColdWeightCurrentlyRecord',
              ofType: null
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'HotOrColdWeightCurrentlyRecord',
        fields: [
          {
            name: 'address',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'totalWeight',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'HotOrColdWeightEdge',
        fields: [
          {
            name: 'cursor',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'node',
            type: {
              kind: 'OBJECT',
              name: 'HotOrColdWeightRecord',
              ofType: null
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'HotOrColdWeightRecord',
        fields: [
          {
            name: 'address',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'totalWeight',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'MkrDelegatedToConnection',
        fields: [
          {
            name: 'edges',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'MkrDelegatedToEdge',
                    ofType: null
                  }
                }
              }
            },
            args: []
          },
          {
            name: 'nodes',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'MkrDelegatedToRecord',
                  ofType: null
                }
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'MkrDelegatedToEdge',
        fields: [
          {
            name: 'cursor',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'node',
            type: {
              kind: 'OBJECT',
              name: 'MkrDelegatedToRecord',
              ofType: null
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'MkrDelegatedToRecord',
        fields: [
          {
            name: 'blockNumber',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'blockTimestamp',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'fromAddress',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'hash',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'immediateCaller',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'lockAmount',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'MkrDelegatedToV2Connection',
        fields: [
          {
            name: 'edges',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'MkrDelegatedToV2Edge',
                    ofType: null
                  }
                }
              }
            },
            args: []
          },
          {
            name: 'nodes',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'MkrDelegatedToV2Record',
                  ofType: null
                }
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'MkrDelegatedToV2Edge',
        fields: [
          {
            name: 'cursor',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'node',
            type: {
              kind: 'OBJECT',
              name: 'MkrDelegatedToV2Record',
              ofType: null
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'MkrDelegatedToV2Record',
        fields: [
          {
            name: 'blockNumber',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'blockTimestamp',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'delegateContractAddress',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'fromAddress',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'hash',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'immediateCaller',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'lockAmount',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'MkrLockedDelegateArrayConnection',
        fields: [
          {
            name: 'edges',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'MkrLockedDelegateArrayEdge',
                    ofType: null
                  }
                }
              }
            },
            args: []
          },
          {
            name: 'nodes',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'MkrLockedDelegateArrayRecord',
                  ofType: null
                }
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'MkrLockedDelegateArrayEdge',
        fields: [
          {
            name: 'cursor',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'node',
            type: {
              kind: 'OBJECT',
              name: 'MkrLockedDelegateArrayRecord',
              ofType: null
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'MkrLockedDelegateArrayRecord',
        fields: [
          {
            name: 'blockNumber',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'blockTimestamp',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'fromAddress',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'hash',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'immediateCaller',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'lockAmount',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'lockTotal',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'MkrLockedDelegateArrayTotalEdge',
        fields: [
          {
            name: 'cursor',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'node',
            type: {
              kind: 'OBJECT',
              name: 'MkrLockedDelegateArrayTotalsRecord',
              ofType: null
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'MkrLockedDelegateArrayTotalsConnection',
        fields: [
          {
            name: 'edges',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'MkrLockedDelegateArrayTotalEdge',
                    ofType: null
                  }
                }
              }
            },
            args: []
          },
          {
            name: 'nodes',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'MkrLockedDelegateArrayTotalsRecord',
                  ofType: null
                }
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'MkrLockedDelegateArrayTotalsRecord',
        fields: [
          {
            name: 'blockNumber',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'blockTimestamp',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'callerLockTotal',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'fromAddress',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'hash',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'immediateCaller',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'lockAmount',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'lockTotal',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'MkrLockedDelegateArrayTotalsV2Connection',
        fields: [
          {
            name: 'edges',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'MkrLockedDelegateArrayTotalsV2Edge',
                    ofType: null
                  }
                }
              }
            },
            args: []
          },
          {
            name: 'nodes',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'MkrLockedDelegateArrayTotalsV2Record',
                  ofType: null
                }
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'MkrLockedDelegateArrayTotalsV2Edge',
        fields: [
          {
            name: 'cursor',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'node',
            type: {
              kind: 'OBJECT',
              name: 'MkrLockedDelegateArrayTotalsV2Record',
              ofType: null
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'MkrLockedDelegateArrayTotalsV2Record',
        fields: [
          {
            name: 'blockNumber',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'blockTimestamp',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'callerLockTotal',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'delegateContractAddress',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'fromAddress',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'hash',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'immediateCaller',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'lockAmount',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'lockTotal',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'MkrLockedDelegateConnection',
        fields: [
          {
            name: 'edges',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'MkrLockedDelegateEdge',
                    ofType: null
                  }
                }
              }
            },
            args: []
          },
          {
            name: 'nodes',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'MkrLockedDelegateRecord',
                  ofType: null
                }
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'MkrLockedDelegateEdge',
        fields: [
          {
            name: 'cursor',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'node',
            type: {
              kind: 'OBJECT',
              name: 'MkrLockedDelegateRecord',
              ofType: null
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'MkrLockedDelegateRecord',
        fields: [
          {
            name: 'blockNumber',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'blockTimestamp',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'fromAddress',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'hash',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'immediateCaller',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'lockAmount',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'lockTotal',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'INTERFACE',
        name: 'Node',
        fields: [
          {
            name: 'nodeId',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          }
        ],
        interfaces: [],
        possibleTypes: [
          {
            kind: 'OBJECT',
            name: 'Query'
          }
        ]
      },
      {
        kind: 'OBJECT',
        name: 'Query',
        fields: [
          {
            name: 'activePollById',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'ActivePollByIdConnection',
                ofType: null
              }
            },
            args: [
              {
                name: 'after',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'argPollId',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'before',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'filter',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'first',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'last',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'offset',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              }
            ]
          },
          {
            name: 'activePollByMultihash',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'ActivePollByMultihashConnection',
                ofType: null
              }
            },
            args: [
              {
                name: 'after',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'argPollMultihash',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'before',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'filter',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'first',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'last',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'offset',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              }
            ]
          },
          {
            name: 'activePolls',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'ActivePollsConnection',
                ofType: null
              }
            },
            args: [
              {
                name: 'after',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'before',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'filter',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'first',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'last',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'offset',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              }
            ]
          },
          {
            name: 'allCurrentVotes',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'AllCurrentVotesConnection',
                ofType: null
              }
            },
            args: [
              {
                name: 'after',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'argAddress',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'before',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'filter',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'first',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'last',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'offset',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              }
            ]
          },
          {
            name: 'allCurrentVotesArray',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'AllCurrentVotesArrayConnection',
                ofType: null
              }
            },
            args: [
              {
                name: 'after',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'argAddress',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'LIST',
                    ofType: {
                      kind: 'SCALAR',
                      name: 'Any'
                    }
                  }
                }
              },
              {
                name: 'before',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'filter',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'first',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'last',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'offset',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              }
            ]
          },
          {
            name: 'allDelegates',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'AllDelegatesConnection',
                ofType: null
              }
            },
            args: [
              {
                name: 'after',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'before',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'filter',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'first',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'last',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'offset',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              }
            ]
          },
          {
            name: 'allEsmJoins',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'AllEsmJoinsConnection',
                ofType: null
              }
            },
            args: [
              {
                name: 'after',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'before',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'filter',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'first',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'last',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'offset',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              }
            ]
          },
          {
            name: 'allEsmV2Joins',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'AllEsmV2JoinsConnection',
                ofType: null
              }
            },
            args: [
              {
                name: 'after',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'before',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'filter',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'first',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'last',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'offset',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              }
            ]
          },
          {
            name: 'allLocksSummed',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'AllLocksSummedConnection',
                ofType: null
              }
            },
            args: [
              {
                name: 'after',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'before',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'filter',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'first',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'last',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'offset',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'unixtimeEnd',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'unixtimeStart',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'buggyVoteAddressMkrWeightsAtTime',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'BuggyVoteAddressMkrWeightsAtTimeConnection',
                ofType: null
              }
            },
            args: [
              {
                name: 'after',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'argPollId',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'argUnix',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'before',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'filter',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'first',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'last',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'offset',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              }
            ]
          },
          {
            name: 'buggyVoteMkrWeightsAtTimeRankedChoice',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'BuggyVoteMkrWeightsAtTimeRankedChoiceConnection',
                ofType: null
              }
            },
            args: [
              {
                name: 'after',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'argPollId',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'argUnix',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'before',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'filter',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'first',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'last',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'offset',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              }
            ]
          },
          {
            name: 'combinedChiefAndMkrBalances',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CombinedChiefAndMkrBalancesConnection',
                ofType: null
              }
            },
            args: [
              {
                name: 'after',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'argBlockNumber',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'before',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'filter',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'first',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'last',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'offset',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              }
            ]
          },
          {
            name: 'combinedChiefAndMkrBalancesAtTime',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CombinedChiefAndMkrBalancesAtTimeConnection',
                ofType: null
              }
            },
            args: [
              {
                name: 'after',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'argUnix',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'before',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'filter',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'first',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'last',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'offset',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              }
            ]
          },
          {
            name: 'combinedChiefAndMkrBalancesCurrently',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CombinedChiefAndMkrBalancesCurrentlyConnection',
                ofType: null
              }
            },
            args: [
              {
                name: 'after',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'before',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'filter',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'first',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'last',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'offset',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              }
            ]
          },
          {
            name: 'currentVote',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CurrentVoteConnection',
                ofType: null
              }
            },
            args: [
              {
                name: 'after',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'argAddress',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'argPollId',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'before',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'filter',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'first',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'last',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'offset',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              }
            ]
          },
          {
            name: 'currentVoteRankedChoice',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'CurrentVoteRankedChoiceConnection',
                ofType: null
              }
            },
            args: [
              {
                name: 'after',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'argAddress',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'argPollId',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'before',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'filter',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'first',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'last',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'offset',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              }
            ]
          },
          {
            name: 'hotOrColdWeight',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'HotOrColdWeightConnection',
                ofType: null
              }
            },
            args: [
              {
                name: 'after',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'argBlockNumber',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'before',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'filter',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'first',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'last',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'offset',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              }
            ]
          },
          {
            name: 'hotOrColdWeightAtTime',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'HotOrColdWeightAtTimeConnection',
                ofType: null
              }
            },
            args: [
              {
                name: 'after',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'argUnix',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'before',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'filter',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'first',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'last',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'offset',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              }
            ]
          },
          {
            name: 'hotOrColdWeightCurrently',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'HotOrColdWeightCurrentlyConnection',
                ofType: null
              }
            },
            args: [
              {
                name: 'after',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'before',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'filter',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'first',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'last',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'offset',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              }
            ]
          },
          {
            name: 'mkrDelegatedTo',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'MkrDelegatedToConnection',
                ofType: null
              }
            },
            args: [
              {
                name: 'after',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'argAddress',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'before',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'filter',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'first',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'last',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'offset',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              }
            ]
          },
          {
            name: 'mkrDelegatedToV2',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'MkrDelegatedToV2Connection',
                ofType: null
              }
            },
            args: [
              {
                name: 'after',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'argAddress',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'before',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'filter',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'first',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'last',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'offset',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              }
            ]
          },
          {
            name: 'mkrLockedDelegate',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'MkrLockedDelegateConnection',
                ofType: null
              }
            },
            args: [
              {
                name: 'after',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'argAddress',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'before',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'filter',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'first',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'last',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'offset',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'unixtimeEnd',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'unixtimeStart',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'mkrLockedDelegateArray',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'MkrLockedDelegateArrayConnection',
                ofType: null
              }
            },
            args: [
              {
                name: 'after',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'argAddress',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'LIST',
                    ofType: {
                      kind: 'SCALAR',
                      name: 'Any'
                    }
                  }
                }
              },
              {
                name: 'before',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'filter',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'first',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'last',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'offset',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'unixtimeEnd',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'unixtimeStart',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'mkrLockedDelegateArrayTotals',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'MkrLockedDelegateArrayTotalsConnection',
                ofType: null
              }
            },
            args: [
              {
                name: 'after',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'argAddress',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'LIST',
                    ofType: {
                      kind: 'SCALAR',
                      name: 'Any'
                    }
                  }
                }
              },
              {
                name: 'before',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'filter',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'first',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'last',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'offset',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'unixtimeEnd',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'unixtimeStart',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'mkrLockedDelegateArrayTotalsV2',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'MkrLockedDelegateArrayTotalsV2Connection',
                ofType: null
              }
            },
            args: [
              {
                name: 'after',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'argAddress',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'LIST',
                    ofType: {
                      kind: 'SCALAR',
                      name: 'Any'
                    }
                  }
                }
              },
              {
                name: 'before',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'filter',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'first',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'last',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'offset',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'unixtimeEnd',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'unixtimeStart',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'node',
            type: {
              kind: 'INTERFACE',
              name: 'Node',
              ofType: null
            },
            args: [
              {
                name: 'nodeId',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              }
            ]
          },
          {
            name: 'nodeId',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any'
              }
            },
            args: []
          },
          {
            name: 'query',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'Query',
                ofType: null
              }
            },
            args: []
          },
          {
            name: 'timeToBlockNumber',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'TimeToBlockNumberConnection',
                ofType: null
              }
            },
            args: [
              {
                name: 'after',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'argUnix',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'before',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'filter',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'first',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'last',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'offset',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              }
            ]
          },
          {
            name: 'totalMkrWeightProxyAndNoProxyByAddress',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'TotalMkrWeightProxyAndNoProxyByAddressConnection',
                ofType: null
              }
            },
            args: [
              {
                name: 'after',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'argAddress',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'argBlockNumber',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'before',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'filter',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'first',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'last',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'offset',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              }
            ]
          },
          {
            name: 'totalMkrWeightProxyAndNoProxyByAddressAtTime',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'TotalMkrWeightProxyAndNoProxyByAddressAtTimeConnection',
                ofType: null
              }
            },
            args: [
              {
                name: 'after',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'argAddress',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'argUnix',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'before',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'filter',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'first',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'last',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'offset',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              }
            ]
          },
          {
            name: 'totalMkrWeightProxyAndNoProxyByAddressCurrently',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'TotalMkrWeightProxyAndNoProxyByAddressCurrentlyConnection',
                ofType: null
              }
            },
            args: [
              {
                name: 'after',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'argAddress',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'before',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'filter',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'first',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'last',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'offset',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              }
            ]
          },
          {
            name: 'uniqueVoters',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'UniqueVotersConnection',
                ofType: null
              }
            },
            args: [
              {
                name: 'after',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'argPollId',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'before',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'first',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'last',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'offset',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              }
            ]
          },
          {
            name: 'voteAddressMkrWeightsAtTime',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'VoteAddressMkrWeightsAtTimeConnection',
                ofType: null
              }
            },
            args: [
              {
                name: 'after',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'argPollId',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'argUnix',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'before',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'filter',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'first',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'last',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'offset',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              }
            ]
          },
          {
            name: 'voteMkrWeightsAtTimeRankedChoice',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'VoteMkrWeightsAtTimeRankedChoiceConnection',
                ofType: null
              }
            },
            args: [
              {
                name: 'after',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'argPollId',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'argUnix',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'before',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'filter',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'first',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'last',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'offset',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              }
            ]
          },
          {
            name: 'voteOptionMkrWeights',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'VoteOptionMkrWeightsConnection',
                ofType: null
              }
            },
            args: [
              {
                name: 'after',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'argBlockNumber',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'argPollId',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'before',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'filter',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'first',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'last',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'offset',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              }
            ]
          },
          {
            name: 'voteOptionMkrWeightsAtTime',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'VoteOptionMkrWeightsAtTimeConnection',
                ofType: null
              }
            },
            args: [
              {
                name: 'after',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'argPollId',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'argUnix',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'before',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'filter',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'first',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'last',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'offset',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              }
            ]
          },
          {
            name: 'voteOptionMkrWeightsCurrently',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'OBJECT',
                name: 'VoteOptionMkrWeightsCurrentlyConnection',
                ofType: null
              }
            },
            args: [
              {
                name: 'after',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'argPollId',
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'SCALAR',
                    name: 'Any'
                  }
                }
              },
              {
                name: 'before',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'filter',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'first',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'last',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              },
              {
                name: 'offset',
                type: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              }
            ]
          }
        ],
        interfaces: [
          {
            kind: 'INTERFACE',
            name: 'Node'
          }
        ]
      },
      {
        kind: 'OBJECT',
        name: 'TimeToBlockNumberConnection',
        fields: [
          {
            name: 'edges',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'TimeToBlockNumberEdge',
                    ofType: null
                  }
                }
              }
            },
            args: []
          },
          {
            name: 'nodes',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'TimeToBlockNumberEdge',
        fields: [
          {
            name: 'cursor',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'node',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'TotalMkrWeightProxyAndNoProxyByAddressAtTimeConnection',
        fields: [
          {
            name: 'edges',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'TotalMkrWeightProxyAndNoProxyByAddressAtTimeEdge',
                    ofType: null
                  }
                }
              }
            },
            args: []
          },
          {
            name: 'nodes',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'TotalMkrWeightProxyAndNoProxyByAddressAtTimeRecord',
                  ofType: null
                }
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'TotalMkrWeightProxyAndNoProxyByAddressAtTimeEdge',
        fields: [
          {
            name: 'cursor',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'node',
            type: {
              kind: 'OBJECT',
              name: 'TotalMkrWeightProxyAndNoProxyByAddressAtTimeRecord',
              ofType: null
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'TotalMkrWeightProxyAndNoProxyByAddressAtTimeRecord',
        fields: [
          {
            name: 'address',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'weight',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'TotalMkrWeightProxyAndNoProxyByAddressConnection',
        fields: [
          {
            name: 'edges',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'TotalMkrWeightProxyAndNoProxyByAddressEdge',
                    ofType: null
                  }
                }
              }
            },
            args: []
          },
          {
            name: 'nodes',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'TotalMkrWeightProxyAndNoProxyByAddressRecord',
                  ofType: null
                }
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'TotalMkrWeightProxyAndNoProxyByAddressCurrentlyConnection',
        fields: [
          {
            name: 'edges',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'TotalMkrWeightProxyAndNoProxyByAddressCurrentlyEdge',
                    ofType: null
                  }
                }
              }
            },
            args: []
          },
          {
            name: 'nodes',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'TotalMkrWeightProxyAndNoProxyByAddressCurrentlyRecord',
                  ofType: null
                }
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'TotalMkrWeightProxyAndNoProxyByAddressCurrentlyEdge',
        fields: [
          {
            name: 'cursor',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'node',
            type: {
              kind: 'OBJECT',
              name: 'TotalMkrWeightProxyAndNoProxyByAddressCurrentlyRecord',
              ofType: null
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'TotalMkrWeightProxyAndNoProxyByAddressCurrentlyRecord',
        fields: [
          {
            name: 'address',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'weight',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'TotalMkrWeightProxyAndNoProxyByAddressEdge',
        fields: [
          {
            name: 'cursor',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'node',
            type: {
              kind: 'OBJECT',
              name: 'TotalMkrWeightProxyAndNoProxyByAddressRecord',
              ofType: null
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'TotalMkrWeightProxyAndNoProxyByAddressRecord',
        fields: [
          {
            name: 'address',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'weight',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'UniqueVoterEdge',
        fields: [
          {
            name: 'cursor',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'node',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'UniqueVotersConnection',
        fields: [
          {
            name: 'edges',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'UniqueVoterEdge',
                    ofType: null
                  }
                }
              }
            },
            args: []
          },
          {
            name: 'nodes',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'SCALAR',
                  name: 'Any'
                }
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'VoteAddressMkrWeightsAtTimeConnection',
        fields: [
          {
            name: 'edges',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'VoteAddressMkrWeightsAtTimeEdge',
                    ofType: null
                  }
                }
              }
            },
            args: []
          },
          {
            name: 'nodes',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'VoteAddressMkrWeightsAtTimeRecord',
                  ofType: null
                }
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'VoteAddressMkrWeightsAtTimeEdge',
        fields: [
          {
            name: 'cursor',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'node',
            type: {
              kind: 'OBJECT',
              name: 'VoteAddressMkrWeightsAtTimeRecord',
              ofType: null
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'VoteAddressMkrWeightsAtTimeRecord',
        fields: [
          {
            name: 'mkrSupport',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'optionId',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'optionIdRaw',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'voter',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'VoteMkrWeightsAtTimeRankedChoiceConnection',
        fields: [
          {
            name: 'edges',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'VoteMkrWeightsAtTimeRankedChoiceEdge',
                    ofType: null
                  }
                }
              }
            },
            args: []
          },
          {
            name: 'nodes',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'VoteMkrWeightsAtTimeRankedChoiceRecord',
                  ofType: null
                }
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'VoteMkrWeightsAtTimeRankedChoiceEdge',
        fields: [
          {
            name: 'cursor',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'node',
            type: {
              kind: 'OBJECT',
              name: 'VoteMkrWeightsAtTimeRankedChoiceRecord',
              ofType: null
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'VoteMkrWeightsAtTimeRankedChoiceRecord',
        fields: [
          {
            name: 'mkrSupport',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'optionIdRaw',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'VoteOptionMkrWeightEdge',
        fields: [
          {
            name: 'cursor',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'node',
            type: {
              kind: 'OBJECT',
              name: 'VoteOptionMkrWeightsRecord',
              ofType: null
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'VoteOptionMkrWeightsAtTimeConnection',
        fields: [
          {
            name: 'edges',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'VoteOptionMkrWeightsAtTimeEdge',
                    ofType: null
                  }
                }
              }
            },
            args: []
          },
          {
            name: 'nodes',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'VoteOptionMkrWeightsAtTimeRecord',
                  ofType: null
                }
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'VoteOptionMkrWeightsAtTimeEdge',
        fields: [
          {
            name: 'cursor',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'node',
            type: {
              kind: 'OBJECT',
              name: 'VoteOptionMkrWeightsAtTimeRecord',
              ofType: null
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'VoteOptionMkrWeightsAtTimeRecord',
        fields: [
          {
            name: 'mkrSupport',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'optionId',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'VoteOptionMkrWeightsConnection',
        fields: [
          {
            name: 'edges',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'VoteOptionMkrWeightEdge',
                    ofType: null
                  }
                }
              }
            },
            args: []
          },
          {
            name: 'nodes',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'VoteOptionMkrWeightsRecord',
                  ofType: null
                }
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'VoteOptionMkrWeightsCurrentlyConnection',
        fields: [
          {
            name: 'edges',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'OBJECT',
                    name: 'VoteOptionMkrWeightsCurrentlyEdge',
                    ofType: null
                  }
                }
              }
            },
            args: []
          },
          {
            name: 'nodes',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'VoteOptionMkrWeightsCurrentlyRecord',
                  ofType: null
                }
              }
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'VoteOptionMkrWeightsCurrentlyEdge',
        fields: [
          {
            name: 'cursor',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'node',
            type: {
              kind: 'OBJECT',
              name: 'VoteOptionMkrWeightsCurrentlyRecord',
              ofType: null
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'VoteOptionMkrWeightsCurrentlyRecord',
        fields: [
          {
            name: 'mkrSupport',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'optionId',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'OBJECT',
        name: 'VoteOptionMkrWeightsRecord',
        fields: [
          {
            name: 'blockTimestamp',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'mkrSupport',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          },
          {
            name: 'optionId',
            type: {
              kind: 'SCALAR',
              name: 'Any'
            },
            args: []
          }
        ],
        interfaces: []
      },
      {
        kind: 'SCALAR',
        name: 'Any'
      }
    ],
    directives: []
  }
} as unknown as IntrospectionQuery;
