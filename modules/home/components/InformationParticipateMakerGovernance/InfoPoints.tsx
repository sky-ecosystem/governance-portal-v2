/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { InternalLink } from 'modules/app/components/InternalLink';
import { Text } from 'theme-ui';

export type InfoPoint = {
  number: string;
  title: string;
  titleFirst: string;
  titleSecond: string;

  description: React.ReactNode;
  color: string;
  links: {
    linkHref: string;
    linkTitle: string;
  }[];
};

export const infoPoints: InfoPoint[] = [
  {
    number: '01',
    title: 'Understand off-chain governance',
    titleFirst: 'Understand',
    titleSecond: 'off-chain governance',
    links: [
      {
        linkHref: 'https://manual.makerdao.com/governance/voting-in-makerdao/off-chain-governance',
        linkTitle: 'Learn more about off-chain governance'
      }
    ],

    color: '#1AAB9B',
    description:
      "Off-chain governance refers to processes for making decisions that don't require on-chain voting and gathering feedback prior to on-chain voting. Off-chain governance happens on the Maker Governance Forum, where the community meets to propose and discuss new proposals. Anyone can participate in off-chain governance."
  },
  {
    number: '02',
    color: '#1ACCA7',
    title: 'Understand on-chain governance',
    titleFirst: 'Understand',
    titleSecond: 'on-chain governance',
    links: [
      {
        linkHref: 'https://manual.makerdao.com/governance/voting-in-makerdao/on-chain-governance',
        linkTitle: 'Learn more about on-chain governance'
      }
    ],

    description:
      'On-chain governance refers to Governance Polls and Executive Votes, which are formalized governance proposals that require on-chain voting. Anyone who owns MKR tokens can participate in these votes using their wallet.'
  },
  {
    number: '03',
    color: '#4B68FF',
    title: 'Set up your voting wallet',
    titleFirst: 'Set up your',
    titleSecond: 'voting wallet',
    links: [],

    description:
      'Connect a web3 wallet (eg. MetaMask, WalletConnect) that holds your MKR tokens and start participating! Users that hold many MKR tokens or use their wallet for other uses besides Maker governance might want to consider more secure methods of setting up a voting wallet, such as using a hardware wallet or setting up a vote proxy.'
  },
  {
    number: '04',
    color: '#9A4BFF',
    title: 'Delegate your voting power',
    titleFirst: 'Option 1:',
    titleSecond: 'Delegate your voting power',
    links: [
      {
        linkHref: 'https://manual.makerdao.com/delegation/overview/what-is-delegation',
        linkTitle: 'Learn more about delegation'
      },
      {
        linkHref: 'https://vote.makerdao.com/delegates',
        linkTitle: 'Choose a suitable delegate'
      }
    ],

    description:
      "Vote delegation is a mechanism through which MKR holders can entrust their voting power to one or more chosen delegates. These delegates can then vote using the MKR delegated to them. Delegating your voting power is a good option if you're not willing to invest much time and gas costs in active participation. Note that delegates can never directly access the MKR tokens delegated to them."
  },
  {
    number: '05',
    color: '#E64BFF',
    title: 'Vote manually',
    titleFirst: 'Option 2:',
    titleSecond: 'Vote manually',
    links: [
      {
        linkHref: 'https://vote.makerdao.com/polling',
        linkTitle: 'Start voting on active governance polls'
      }
    ],

    description: (
      <Text>
        If you prefer to participate in Maker governance manually instead of delegating, then you are able to
        start participating once your voting wallet is set up.{' '}
        <InternalLink href="/executive" title="Executives" styles={{ fontWeight: 'semiBold' }}>
          <Text>Find the latest Executive Proposal</Text>
        </InternalLink>{' '}
        and vote on it by depositing your MKR tokens to the voting contract. By doing so you contribute to
        protecting the protocol against governance attacks. You are able to withdraw your MKR tokens anytime.
        Next,{' '}
        <InternalLink href="/polling" title="Polls" styles={{ fontWeight: 'semiBold' }}>
          <Text>start voting on the active governance polls</Text>
        </InternalLink>
        .
      </Text>
    )
  }
];
