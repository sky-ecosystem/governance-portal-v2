import { PollListItem } from 'modules/polling/types';
import { PollInputFormat, PollResultDisplay, PollVictoryConditions } from 'modules/polling/polling.constants';

export const mockPollList: PollListItem[] = [
  {
    pollId: 967,
    startDate: new Date('2023-03-14T16:00:00.000Z'),
    endDate: new Date('2023-03-27T16:00:00.000Z'),
    slug: 'QmXUiHqH',
    type: PollInputFormat.singleChoice,
    parameters: {
      inputFormat: {
        type: PollInputFormat.singleChoice,
        abstain: [0],
        options: []
      },
      resultDisplay: PollResultDisplay.singleVoteBreakdown,
      victoryConditions: [
        {
          type: PollVictoryConditions.plurality
        }
      ]
    },
    title: 'Ratification Poll for Starknet CU Budget Extension (SNE-001) (MIP14c2-SP4) - March 13, 2023',
    summary:
      'This Protocol DAI Transfer subproposal requests 123,000 DAI to fund Starknet Engineering as bridge funding until June 2023.',
    options: { '0': 'Abstain', '1': 'Yes', '2': 'No' },
    tags: ['high-impact', 'misc-funding', 'ratification', 'mips']
  },
  {
    pollId: 966,
    startDate: new Date('2023-03-14T16:00:00.000Z'),
    endDate: new Date('2023-03-27T16:00:00.000Z'),
    slug: 'QmRfBShL',
    type: PollInputFormat.singleChoice,
    parameters: {
      inputFormat: {
        type: PollInputFormat.singleChoice,
        abstain: [0],
        options: []
      },
      resultDisplay: PollResultDisplay.singleVoteBreakdown,
      victoryConditions: [
        {
          type: PollVictoryConditions.plurality
        }
      ]
    },
    title:
      'Ratification Poll for Protocol Engineering Facilitator Onboarding (MIP41c4-SP42) - March 13, 2023',
    summary:
      'This subproposal onboards Prototech Labs LLC as a Facilitator for the Protocol Engineering (PECU-001) Core Unit.',
    options: { '0': 'Abstain', '1': 'Yes', '2': 'No' },
    tags: ['high-impact', 'ratification', 'mips']
  },
  {
    pollId: 965,
    startDate: new Date('2023-03-14T16:00:00.000Z'),
    endDate: new Date('2023-03-27T16:00:00.000Z'),
    slug: 'QmYcQDa3',
    type: PollInputFormat.singleChoice,
    parameters: {
      inputFormat: {
        type: PollInputFormat.singleChoice,
        abstain: [0],
        options: []
      },
      resultDisplay: PollResultDisplay.singleVoteBreakdown,
      victoryConditions: [
        {
          type: PollVictoryConditions.plurality
        }
      ]
    },
    title: 'Ratification Poll for Risk Facilitator Onboarding (RISK-001) (MIP41c4-SP41) - March 13, 2023',
    summary:
      'This subproposal onboards BA Labs, LLC as a Facilitator for the Risk (RISK-001) Core Unit, represented by @rema and @monet-supply',
    options: { '0': 'Abstain', '1': 'Yes', '2': 'No' },
    tags: ['high-impact', 'ratification', 'mips']
  },
  {
    pollId: 964,
    startDate: new Date('2023-03-14T16:00:00.000Z'),
    endDate: new Date('2023-03-27T16:00:00.000Z'),
    slug: 'Qmc6GPBi',
    type: PollInputFormat.singleChoice,
    parameters: {
      inputFormat: {
        type: PollInputFormat.singleChoice,
        abstain: [0],
        options: []
      },
      resultDisplay: PollResultDisplay.singleVoteBreakdown,
      victoryConditions: [
        {
          type: PollVictoryConditions.plurality
        }
      ]
    },
    title:
      'Ratification Poll for Expand Facilitator Definition to Allow Entities (MIP4c2-SP34) - March 13, 2023',
    summary:
      'This amendment MIP proposes to eliminate any reference to a facilitator as an individual and replace it with the term authorized accounts.',
    options: { '0': 'Abstain', '1': 'Yes', '2': 'No' },
    tags: ['medium-impact', 'misc-governance', 'ratification', 'mips']
  },
  {
    pollId: 963,
    startDate: new Date('2023-03-13T16:00:00.000Z'),
    endDate: new Date('2023-03-27T16:00:00.000Z'),
    slug: 'QmT9Novb',
    type: PollInputFormat.singleChoice,
    parameters: {
      inputFormat: {
        type: PollInputFormat.singleChoice,
        abstain: [0],
        options: []
      },
      resultDisplay: PollResultDisplay.singleVoteBreakdown,
      victoryConditions: [
        {
          type: PollVictoryConditions.plurality
        }
      ]
    },
    title: 'Ratification Poll for D3M to Spark Lend (MIP116) - March 13, 2023',
    summary:
      'Phoenix Labs proposes a D3M be instantiated to provide DAI liquidity to Spark Lend at 0xC13e21B648A5Ee794902342038FF3aDAB66BE987.',
    options: { '0': 'Abstain', '1': 'Yes', '2': 'No' },
    tags: ['high-impact', 'ratification', 'mips', 'd3m']
  },
  {
    pollId: 962,
    startDate: new Date('2023-03-13T16:00:00.000Z'),
    endDate: new Date('2023-03-27T16:00:00.000Z'),
    slug: 'QmTJBUXJ',
    type: PollInputFormat.singleChoice,
    parameters: {
      inputFormat: {
        type: PollInputFormat.singleChoice,
        abstain: [0],
        options: []
      },
      resultDisplay: PollResultDisplay.singleVoteBreakdown,
      victoryConditions: [
        {
          type: PollVictoryConditions.plurality
        }
      ]
    },
    title: 'Ratification Poll for Phoenix Labs - Spark Lend Launch (SPF) (MIP55c3-SP16) - March 13, 2023',
    summary:
      'This SPF requests 347,100 DAI for all expenses to launch Spark Lend and maintain it for a year.',
    options: { '0': 'Abstain', '1': 'Yes', '2': 'No' },
    tags: ['high-impact', 'misc-funding', 'ratification', 'mips']
  },
  {
    pollId: 961,
    startDate: new Date('2023-03-13T16:00:00.000Z'),
    endDate: new Date('2023-03-27T16:00:00.000Z'),
    slug: 'QmdLRZGM',
    type: PollInputFormat.singleChoice,
    parameters: {
      inputFormat: {
        type: PollInputFormat.singleChoice,
        abstain: [0],
        options: []
      },
      resultDisplay: PollResultDisplay.singleVoteBreakdown,
      victoryConditions: [
        {
          type: PollVictoryConditions.plurality
        }
      ]
    },
    title: 'Ratification Poll for Onboarding Retro as CES-001 Facilitator (MIP41c4-SP40) - March 13, 2023',
    summary: 'MIP41c4-SP40 onboards Retro as Facilitator for the Collateral Engineering Services Core Unit.',
    options: { '0': 'Abstain', '1': 'Yes', '2': 'No' },
    tags: ['high-impact', 'ratification', 'mips']
  },
  {
    pollId: 960,
    startDate: new Date('2023-03-13T16:00:00.000Z'),
    endDate: new Date('2023-03-27T16:00:00.000Z'),
    slug: 'Qmbndmkr',
    type: PollInputFormat.singleChoice,
    parameters: {
      inputFormat: {
        type: PollInputFormat.singleChoice,
        abstain: [0],
        options: []
      },
      resultDisplay: PollResultDisplay.singleVoteBreakdown,
      victoryConditions: [
        {
          type: PollVictoryConditions.plurality
        }
      ]
    },
    title: 'Ratification Poll for the Constitution MIP Set - March 13, 2023',
    summary:
      'The Constitution MIP Set (MIP101 through MIP114) introduces the Maker Constitution and the Scope Framework as well as containing MIP102c2-SP1 which amends multiple MIPs.',
    options: { '0': 'Abstain', '1': 'Yes', '2': 'No' },
    tags: [
      'high-impact',
      'real-world-assets',
      'misc-governance',
      'collateral-offboard',
      'misc-funding',
      'ratification',
      'mips',
      'budget',
      'endgame'
    ]
  },
  {
    pollId: 978,
    startDate: new Date('2023-03-13T16:00:00.000Z'),
    endDate: new Date('2023-03-27T16:00:00.000Z'),
    slug: 'QmT54pXF',
    type: PollInputFormat.rankFree,
    parameters: {
      inputFormat: {
        type: PollInputFormat.rankFree,
        abstain: [0],
        options: []
      },
      resultDisplay: PollResultDisplay.instantRunoffBreakdown,
      victoryConditions: [
        {
          type: PollVictoryConditions.instantRunoff
        }
      ]
    },
    title:
      'Budget Ratification Poll for Modifying Sidestream Auction Services Core Unit Budget (SAS-001) (MIP40c3-SP95) - March 13, 2023',
    summary:
      'MIP40c3-SP95 modifies the DAI budget for the SAS-001 Core Unit, continuing operations from 2023-04-01 until 2024-03-31.',
    options: {
      '0': 'Abstain',
      '1': 'Approve existing budget - 1,130,392.56 DAI',
      '2': 'Approve reduced budget - 850,950 DAI',
      '3': 'Reject budget'
    },
    tags: ['high-impact', 'ratification', 'mips', 'budget']
  },
  {
    pollId: 976,
    startDate: new Date('2023-03-13T16:00:00.000Z'),
    endDate: new Date('2023-03-27T16:00:00.000Z'),
    slug: 'QmUqdiXM',
    type: PollInputFormat.rankFree,
    parameters: {
      inputFormat: {
        type: PollInputFormat.rankFree,
        abstain: [0],
        options: []
      },
      resultDisplay: PollResultDisplay.instantRunoffBreakdown,
      victoryConditions: [
        {
          type: PollVictoryConditions.instantRunoff
        }
      ]
    },
    title:
      'Ratification Poll for Modify Data Insights Core Unit Budget (DIN-001) (MIP40c3-SP96) - March 13, 2023',
    summary:
      'Data Insights is requesting a budget renewal with the intention to support the transition to Endgame.',
    options: {
      '0': 'Abstain',
      '1': 'Approve existing budget - 1,080,001 DAI',
      '2': 'Approve reduced budget - 972,000.90 DAI',
      '3': 'Reject budget'
    },
    tags: ['high-impact', 'ratification', 'mips', 'budget']
  },
  {
    pollId: 975,
    startDate: new Date('2023-03-13T16:00:00.000Z'),
    endDate: new Date('2023-03-27T16:00:00.000Z'),
    slug: 'QmcNS7iz',
    type: PollInputFormat.rankFree,
    parameters: {
      inputFormat: {
        type: PollInputFormat.rankFree,
        abstain: [0],
        options: []
      },
      resultDisplay: PollResultDisplay.instantRunoffBreakdown,
      victoryConditions: [
        {
          type: PollVictoryConditions.instantRunoff
        }
      ]
    },
    title:
      'Budget Ratification Poll for Modifying Strategic Finance Core Unit Budget, SF-001 (MIP40c3-SP93) - March 13, 2023',
    summary: 'MIP40c3-SP93 adds the DAI budget for the Strategic Finance Core Unit (SF-001).',
    options: {
      '0': 'Abstain',
      '1': 'Approve Base budget - 2,409,015 DAI',
      '2': 'Approve Bear budget - 1,981,140 DAI',
      '3': 'Reject budget'
    },
    tags: ['high-impact', 'ratification', 'mips', 'budget']
  },
  {
    pollId: 974,
    startDate: new Date('2023-03-13T16:00:00.000Z'),
    endDate: new Date('2023-03-27T16:00:00.000Z'),
    slug: 'QmSsENPv',
    type: PollInputFormat.rankFree,
    parameters: {
      inputFormat: {
        type: PollInputFormat.rankFree,
        abstain: [0],
        options: []
      },
      resultDisplay: PollResultDisplay.instantRunoffBreakdown,
      victoryConditions: [
        {
          type: PollVictoryConditions.instantRunoff
        }
      ]
    },
    title: 'Ratification Poll for Modify Risk Core Unit Budget (RISK-001) (MIP40c3-SP92) - March 13, 2023',
    summary:
      'MIP40c3-SP92 renews the Risk Core Unit (RISK-001) budget from March 1, 2023, through February 29, 2024.',
    options: {
      '0': 'Abstain',
      '1': 'Approve existing budget - 2,760,000 DAI',
      '2': 'Approve reduced budget - 2,484,000 DAI',
      '3': 'Reject budget'
    },
    tags: ['high-impact', 'ratification', 'mips', 'budget']
  },
  {
    pollId: 973,
    startDate: new Date('2023-03-13T16:00:00.000Z'),
    endDate: new Date('2023-03-27T16:00:00.000Z'),
    slug: 'QmWTwKiQ',
    type: PollInputFormat.singleChoice,
    parameters: {
      inputFormat: {
        type: PollInputFormat.singleChoice,
        abstain: [0],
        options: []
      },
      resultDisplay: PollResultDisplay.singleVoteBreakdown,
      victoryConditions: [
        {
          type: PollVictoryConditions.plurality
        }
      ]
    },
    title:
      'Budget Ratification Poll for GovAlpha Core Unit MKR Budget Q2 2023 (MIP40c3-SP91) - March 13, 2023',
    summary:
      'This budget adds an MKR compensation plan for GovAlpha (GOV-001) covering the period from 2022-08-01 onwards.',
    options: { '0': 'Abstain', '1': 'Yes', '2': 'No' },
    tags: ['high-impact', 'ratification', 'mips', 'budget']
  },
  {
    pollId: 972,
    startDate: new Date('2023-03-13T16:00:00.000Z'),
    endDate: new Date('2023-03-27T16:00:00.000Z'),
    slug: 'QmXoH4rE',
    type: PollInputFormat.rankFree,
    parameters: {
      inputFormat: {
        type: PollInputFormat.rankFree,
        abstain: [0],
        options: []
      },
      resultDisplay: PollResultDisplay.instantRunoffBreakdown,
      victoryConditions: [
        {
          type: PollVictoryConditions.instantRunoff
        }
      ]
    },
    title:
      'Budget Ratification Poll for GovAlpha Core Unit DAI Budget 2023-2024 (MIP40c3-SP90) - March 13, 2023',
    summary:
      'MIP40c3-SP90 provides voters with a choice of three DAI budgets for the GovAlpha Core Unit for 12 months, starting on 2023-04-01 and ending on 2024-03-31.',
    options: {
      '0': 'Abstain',
      '1': 'Approve BasePlus budget - 904,805 DAI',
      '2': 'Approve Base budget - 805,805 DAI',
      '3': 'Approve SuperBear budget - 674,905 DAI',
      '4': 'Reject budget'
    },
    tags: ['high-impact', 'ratification', 'mips', 'budget']
  },
  {
    pollId: 971,
    startDate: new Date('2023-03-13T16:00:00.000Z'),
    endDate: new Date('2023-03-27T16:00:00.000Z'),
    slug: 'QmU8DR2f',
    type: PollInputFormat.singleChoice,
    parameters: {
      inputFormat: {
        type: PollInputFormat.singleChoice,
        abstain: [0],
        options: []
      },
      resultDisplay: PollResultDisplay.singleVoteBreakdown,
      victoryConditions: [
        {
          type: PollVictoryConditions.plurality
        }
      ]
    },
    title: 'Ratification Poll for Modify Core Unit Budget (DECO-001) (MIP40c3-SP89) - March 13, 2023',
    summary: 'End streaming of new funds and vesting of MKR to DECO on May 31st.',
    options: { '0': 'Abstain', '1': 'Yes', '2': 'No' },
    tags: ['high-impact', 'ratification', 'mips', 'budget']
  },
  {
    pollId: 970,
    startDate: new Date('2023-03-13T16:00:00.000Z'),
    endDate: new Date('2023-03-27T16:00:00.000Z'),
    slug: 'QmWpo8BJ',
    type: PollInputFormat.rankFree,
    parameters: {
      inputFormat: {
        type: PollInputFormat.rankFree,
        abstain: [0],
        options: []
      },
      resultDisplay: PollResultDisplay.instantRunoffBreakdown,
      victoryConditions: [
        {
          type: PollVictoryConditions.instantRunoff
        }
      ]
    },
    title: 'Budget Ratification Poll for TechOps Core Unit DAI Budget (MIP40c3-SP88) - March 13, 2023',
    summary:
      'MIP40c3-SP88 renews the TechOps Core Unit (TECH-001) annual budget from April 1st 2023 through to March 31st 2024.',
    options: {
      '0': 'Abstain',
      '1': 'Approve NewBase budget - 1,666,722 DAI',
      '2': 'Approve NewBear budget - 1,368,924 DAI',
      '3': 'Reject budget'
    },
    tags: ['high-impact', 'ratification', 'mips', 'budget']
  },
  {
    pollId: 969,
    startDate: new Date('2023-03-13T16:00:00.000Z'),
    endDate: new Date('2023-03-27T16:00:00.000Z'),
    slug: 'QmNSsw6o',
    type: PollInputFormat.singleChoice,
    parameters: {
      inputFormat: {
        type: PollInputFormat.singleChoice,
        abstain: [0],
        options: []
      },
      resultDisplay: PollResultDisplay.singleVoteBreakdown,
      victoryConditions: [
        {
          type: PollVictoryConditions.plurality
        }
      ]
    },
    title:
      'Ratification Poll for Modifying Sidestream Auction Services Core Unit Mandate - SAS-001 (MIP39c2-SP39) - March 13, 2023',
    summary: 'MIP39c2-SP39 modifies the mandate of SAS-001 - Sidestream Auction Services Core Unit.',
    options: { '0': 'Abstain', '1': 'Yes', '2': 'No' },
    tags: ['high-impact', 'ratification', 'mips', 'core-unit-onboard']
  },
  {
    pollId: 968,
    startDate: new Date('2023-03-13T16:00:00.000Z'),
    endDate: new Date('2023-03-27T16:00:00.000Z'),
    slug: 'Qmdzxxw4',
    type: PollInputFormat.singleChoice,
    parameters: {
      inputFormat: {
        type: PollInputFormat.singleChoice,
        abstain: [0],
        options: []
      },
      resultDisplay: PollResultDisplay.singleVoteBreakdown,
      victoryConditions: [
        {
          type: PollVictoryConditions.plurality
        }
      ]
    },
    title:
      'Ratification Poll for Requesting Protocol DAI Transfer to fund TechOps CU for March 2023 (MIP14c2-SP5) - March 13, 2023',
    summary: 'This Protocol DAI Transfer subproposal requests 138,894 DAI to fund TechOps for March 2023.',
    options: { '0': 'Abstain', '1': 'Yes', '2': 'No' },
    tags: ['high-impact', 'misc-funding', 'ratification', 'mips']
  },
  {
    pollId: 982,
    startDate: new Date('2023-03-20T16:00:00.000Z'),
    endDate: new Date('2023-03-23T16:00:00.000Z'),
    slug: 'QmQ1fYm3',
    type: PollInputFormat.rankFree,
    parameters: {
      inputFormat: {
        type: PollInputFormat.rankFree,
        abstain: [0],
        options: []
      },
      resultDisplay: PollResultDisplay.instantRunoffBreakdown,
      victoryConditions: [
        {
          type: PollVictoryConditions.instantRunoff
        }
      ]
    },
    title: 'PSM Parameter Normalization - March 20, 2023',
    summary: 'Rank your preferred options for PSM parameters.',
    options: {
      '0': 'Abstain',
      '1': 'Option 1 - Diversify Stablecoin Reserves',
      '2': 'Option 2 - Maintain USDC as the Primary Reserve',
      '3': 'Reject options'
    },
    tags: []
  },
  {
    pollId: 983,
    startDate: new Date('2023-03-20T16:00:00.000Z'),
    endDate: new Date('2023-03-23T16:00:00.000Z'),
    slug: 'QmbrGz9x',
    type: PollInputFormat.singleChoice,
    parameters: {
      inputFormat: {
        type: PollInputFormat.singleChoice,
        abstain: [0],
        options: []
      },
      resultDisplay: PollResultDisplay.singleVoteBreakdown,
      victoryConditions: [
        {
          type: PollVictoryConditions.plurality
        }
      ]
    },
    title:
      'Short Ratification Poll for RWA Foundation Broker Onboarding & Expensing for Professional Services (MIP58c4-SP1) - March 20, 2023',
    summary:
      'A DAO Resolution to instruct the directors of the RWA Foundation to onboard with a new prime broker and to expense legal and accounting fees for services provided by professional services firms to the RWA Foundation.',
    options: { '0': 'Abstain', '1': 'Yes', '2': 'No' },
    tags: []
  },
  {
    pollId: 980,
    startDate: new Date('2023-03-13T16:00:59.000Z'),
    endDate: new Date('2023-03-16T16:00:00.000Z'),
    slug: 'QmNTSr9j',
    type: PollInputFormat.singleChoice,
    parameters: {
      inputFormat: {
        type: PollInputFormat.singleChoice,
        abstain: [0],
        options: []
      },
      resultDisplay: PollResultDisplay.singleVoteBreakdown,
      victoryConditions: [
        {
          type: PollVictoryConditions.plurality
        }
      ]
    },
    title: 'Increase the MIP65 (RWA007-A) Debt Ceiling - March 13, 2023',
    summary: 'Signal your support or opposition to increasing the MIP65 Debt Ceiling to 1.25 billion DAI.',
    options: { '0': 'Abstain', '1': 'Yes', '2': 'No' },
    tags: ['high-impact', 'real-world-assets', 'risk-parameter']
  },
  {
    pollId: 977,
    startDate: new Date('2023-03-13T16:00:00.000Z'),
    endDate: new Date('2023-03-16T16:00:00.000Z'),
    slug: 'QmYDns9V',
    type: PollInputFormat.singleChoice,
    parameters: {
      inputFormat: {
        type: PollInputFormat.singleChoice,
        abstain: [0],
        options: []
      },
      resultDisplay: PollResultDisplay.singleVoteBreakdown,
      victoryConditions: [
        {
          type: PollVictoryConditions.plurality
        }
      ]
    },
    title: 'Short Ratification Poll for Vault Setting Amendment Subproposal (MIP92c5-SP1) - March 13, 2023',
    summary:
      'This proposal suggests settings and strategies for the deployment of PSM funds into the yearn vault described in MIP92.',
    options: { '0': 'Abstain', '1': 'Yes', '2': 'No' },
    tags: ['medium-impact', 'collateral-onboard', 'risk-parameter', 'ratification', 'mips', 'psm']
  },
  {
    pollId: 981,
    startDate: new Date('2023-03-13T16:01:35.000Z'),
    endDate: new Date('2023-03-16T16:00:00.000Z'),
    slug: 'QmRJSSGW',
    type: PollInputFormat.singleChoice,
    parameters: {
      inputFormat: {
        type: PollInputFormat.singleChoice,
        abstain: [0],
        options: []
      },
      resultDisplay: PollResultDisplay.singleVoteBreakdown,
      victoryConditions: [
        {
          type: PollVictoryConditions.plurality
        }
      ]
    },
    title: 'Remove the DC-IAM from MIP65 (RWA007-A) - March 13, 2023',
    summary: 'Signal your support or opposition to removing the DC-IAM from MIP65 (RWA007-A).',
    options: { '0': 'Abstain', '1': 'Yes', '2': 'No' },
    tags: ['high-impact', 'real-world-assets', 'risk-parameter']
  },
  {
    pollId: 979,
    startDate: new Date('2023-03-13T16:00:00.000Z'),
    endDate: new Date('2023-03-16T16:00:00.000Z'),
    slug: 'QmfZ2nxw',
    type: PollInputFormat.singleChoice,
    parameters: {
      inputFormat: {
        type: PollInputFormat.singleChoice,
        abstain: [0],
        options: []
      },
      resultDisplay: PollResultDisplay.singleVoteBreakdown,
      victoryConditions: [
        {
          type: PollVictoryConditions.plurality
        }
      ]
    },
    title: 'Return Excess MIP65 Funds to Surplus Buffer - March 13, 2023',
    summary:
      'Signal your support or opposition to the resolution for the return of excess funds from the MIP65 (RWA007-A) structure.',
    options: { '0': 'Abstain', '1': 'Yes', '2': 'No' },
    tags: ['low-impact', 'real-world-assets']
  },
  {
    pollId: 957,
    startDate: new Date('2023-03-06T16:00:00.000Z'),
    endDate: new Date('2023-03-09T16:00:00.000Z'),
    slug: 'QmYBegVf',
    type: PollInputFormat.singleChoice,
    parameters: {
      inputFormat: {
        type: PollInputFormat.singleChoice,
        abstain: [0],
        options: []
      },
      resultDisplay: PollResultDisplay.singleVoteBreakdown,
      victoryConditions: [
        {
          type: PollVictoryConditions.plurality
        }
      ]
    },
    title: 'Short Ratification Poll for Phoenix Labs Initial Funding (MIP55c3-SP15) - March 6, 2023',
    summary:
      'This SPF requests 50,000 DAI for legal and incorporation expenses of Phoenix Labs, an R&D company focused on creating new products for MakerDAO.',
    options: { '0': 'Abstain', '1': 'Yes', '2': 'No' },
    tags: ['medium-impact', 'misc-funding', 'ratification', 'mips', 'endgame']
  },
  {
    pollId: 958,
    startDate: new Date('2023-03-06T16:00:00.000Z'),
    endDate: new Date('2023-03-09T16:00:00.000Z'),
    slug: 'QmcLGa49',
    type: PollInputFormat.singleChoice,
    parameters: {
      inputFormat: {
        type: PollInputFormat.singleChoice,
        abstain: [0],
        options: []
      },
      resultDisplay: PollResultDisplay.singleVoteBreakdown,
      victoryConditions: [
        {
          type: PollVictoryConditions.plurality
        }
      ]
    },
    title: 'Decrease the RETH-A Dust Parameter - March 6, 2023',
    summary:
      'Signal your support or opposition to decrease the Dust Parameter from 15,000 DAI to 7,500 DAI for the RETH-A vault type.',
    options: { '0': 'Abstain', '1': 'Yes', '2': 'No' },
    tags: ['medium-impact', 'risk-parameter']
  },
  {
    pollId: 956,
    startDate: new Date('2023-02-27T16:00:00.000Z'),
    endDate: new Date('2023-03-02T16:00:00.000Z'),
    slug: 'QmXGgakY',
    type: PollInputFormat.singleChoice,
    parameters: {
      inputFormat: {
        type: PollInputFormat.singleChoice,
        abstain: [0],
        options: []
      },
      resultDisplay: PollResultDisplay.singleVoteBreakdown,
      victoryConditions: [
        {
          type: PollVictoryConditions.plurality
        }
      ]
    },
    title: 'PPG - Open Market Committee Proposal - February 27, 2023',
    summary:
      'Signal your support or opposition to included parameter changes based on the recommendation of the Maker Open Market Committee.',
    options: { '0': 'Abstain', '1': 'Yes', '2': 'No' },
    tags: ['high-impact', 'risk-parameter', 'momc', 'd3m']
  },
  {
    pollId: 952,
    startDate: new Date('2023-02-13T16:00:00.000Z'),
    endDate: new Date('2023-02-27T16:00:00.000Z'),
    slug: 'QmRh87bm',
    type: PollInputFormat.singleChoice,
    parameters: {
      inputFormat: {
        type: PollInputFormat.singleChoice,
        abstain: [0],
        options: []
      },
      resultDisplay: PollResultDisplay.singleVoteBreakdown,
      victoryConditions: [
        {
          type: PollVictoryConditions.plurality
        }
      ]
    },
    title: 'Ratification Poll for $100M of Cogent Bank Loan Participations (MIP95) - February 13, 2023',
    summary:
      'Cogent Bank, an FDIC regulated Florida commercial bank, proposes participating $100M of loans to MakerDAO’s existing RWA Master Participation Trust, on the same terms and with the same legal documents as Huntingdon Valley Bank.',
    options: { '0': 'Abstain', '1': 'Yes', '2': 'No' },
    tags: ['high-impact', 'real-world-assets', 'collateral-onboard', 'ratification', 'mips']
  },
  {
    pollId: 951,
    startDate: new Date('2023-02-13T16:00:00.000Z'),
    endDate: new Date('2023-02-27T16:00:00.000Z'),
    slug: 'QmSYNed5',
    type: PollInputFormat.singleChoice,
    parameters: {
      inputFormat: {
        type: PollInputFormat.singleChoice,
        abstain: [0],
        options: []
      },
      resultDisplay: PollResultDisplay.singleVoteBreakdown,
      victoryConditions: [
        {
          type: PollVictoryConditions.plurality
        }
      ]
    },
    title:
      'Ratification Poll for Amend Interim Facilitator Appointment Process (MIP4c2-SP30) - February 13, 2023',
    summary:
      'The existing Interim Facilitator process has proved to be less than ideal when applied. Primarily the issues are a lack of speedy resolution and inflexibility.',
    options: { '0': 'Abstain', '1': 'Yes', '2': 'No' },
    tags: ['high-impact', 'misc-governance', 'ratification', 'mips']
  },
  {
    pollId: 950,
    startDate: new Date('2023-02-13T16:00:00.000Z'),
    endDate: new Date('2023-02-27T16:00:00.000Z'),
    slug: 'QmQjv36P',
    type: PollInputFormat.singleChoice,
    parameters: {
      inputFormat: {
        type: PollInputFormat.singleChoice,
        abstain: [0],
        options: []
      },
      resultDisplay: PollResultDisplay.singleVoteBreakdown,
      victoryConditions: [
        {
          type: PollVictoryConditions.plurality
        }
      ]
    },
    title:
      'Ratification Poll for Amend MIP62 to Allow for Changing Communication Responsibilities (MIP4c2-SP33) - February 13, 2023',
    summary:
      'This amendment is intended to replace GovComms as the responsible party for communicating offboardings through MIP62 and to prevent the requirement for a token vote in the event we run into this same issue in the future.',
    options: { '0': 'Abstain', '1': 'Yes', '2': 'No' },
    tags: ['low-impact', 'misc-governance', 'collateral-offboard', 'ratification', 'mips']
  }
];
