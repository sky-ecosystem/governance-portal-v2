# Poll Parameters

The governance portal reads and parses the poll parameters defined on each poll on the [MakerDAO community repo](https://github.com/sky-ecosystem/community/tree/master/governance/polls).

Each poll file includes some markdown on the header, currently (July 2022) there are 2 kinds of poll parameters, the legacy ones and the new ones that describe the voting options in more detail.
The legacy poll parameters only determine if a poll is ranked-choice (IRV) or plurality. The new poll parameters have more options.

## Legacy poll parameters:

Example of a plurality poll. It is always assumed that "Abstain" is the 0 choice.

```
---
title: Short Ratification Poll for MIP10c7-SP2 - Modify Oracle Data Models - May 30, 2022
summary: Signal your support or opposition for MIP10c7-SP2 - Modify Data Models for BTC/USD, LINK/USD, MANA/USD, USDT/USD, and YFI/USD.
discussion_link: https://forum.makerdao.com/t/mip10c7-sp2-modify-data-models-for-btc-usd-link-usd-mana-usd-usdt-usd-yfi-usd-data-model/15235
vote_type: Plurality Voting
categories:
   - MIPs
   - Medium Impact
options:
   0: Abstain
   1: Yes
   2: No
start_date: 2022-05-30T16:00:00
end_date: 2022-06-02T16:00:00
---
```

Example of a ranked-choice poll. It is always assumed that "Abstain" is the 0 choice.

```
---
title: Increase the UNIV2DAIUSDC-A Maximum Debt Ceiling - August 2, 2021
summary: Rank your preferred options for adjusting the UNIV2DAIUSDC-A Maximum Debt Ceiling.
discussion_link: https://forum.makerdao.com/t/signal-request-adjust-univ2daiusdc-a-dc-iam-line/9481/
vote_type: Ranked Choice IRV
categories:
  - Risk Variable
options:
   0: Abstain
   1: Increase Maximum Debt Ceiling to 250 million DAI (+200M)
   2: Increase Maximum Debt Ceiling to 150 million DAI (+100M)
   3: Increase Maximum Debt Ceiling to 100 million DAI (+50M)
   4: Keep Maximum Debt Ceiling set to 50 million DAI (+0)
start_date: 2021-08-02T16:00:00
end_date: 2021-08-05T16:00:00
---

```

## New poll parameters

The new poll parameters transform the "Ranked Choice IRV" and "Plurality Voting" into 3 different options:

- Input format
  - Defines how the users will select the options:
    - single-choice : only select one option
    - rank-free: ranked-choice selection
    - choose-free: choose multiple options
- Victory conditions
  - Defines the algorithm used to determine the winner
    - plurality:
    - instant-runoff:
    - approval:
    - comparison:
    - default:
- Result display.
  - Defines how the governance portal will display in the UI the voted options.

When combining these 3 options we can get the ranked-choice, plurality or other vote types, such as approval.
We also introduced the "version" option, version 2.0.0, which refers to the new polls. Not all the options can be combined together, for example rank-free has to be combined with an instant-runoff victory condition.

### Input format

| single-choice | Current Single Choice input UI as used for plurality     |
| ------------- | -------------------------------------------------------- |
| rank-free     | Current Ranked Choice input UI as used for Ranked Choice |
| choose-free   | UI to Select n options from list of options              |

### Victory conditions:

Victory conditions is an array of values that determine the winning condition of the algorithm.

Currently we support plurality, majority, approval, instant-runoff (IRV), "and", and comparison (comparison acts as a safe check).

| victory_conditions | summary                                                                                                                            |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| majority           | Condition returns true for the option with more than 50% of the total vote-weight - false for others                               |
| plurality          | Condition returns true for the option with more vote weight than any other option - false for others                               |
| instant-runoff     | Condition returns true for the option winning when applying the IRV algorithm - false for others                                   |
| "comparison"       | Condition returns true for <option(s)> if expression <option/value><comparator><option/value> evaluates to true - false for others |
| no-victor          | Condition returns false for every option (marking a poll that is not supposed to result in a winning option)                       |
| default-<option>   | Condition returns true for <option> if no other option returns true on all other victory conditions                                |
| approval           | Condition returns true for the option with the most approval - false for others                                                    |

### Result display:

| result_display                                                 |                                                                                                                    |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| single-vote-breakdown                                          | Displays current breakdown UI for Plurality                                                                        |
| instant-runoff-breakdown                                       | Displays current breakdown UI for Ranked Choice                                                                    |
| condition-summary (Not implemented)                            | Displays a table that lists each victory condition and shows whether it evaluates to true or false for each option |
| score-<option/value><operator><option/value> (Not implemented) | Displays an output score where score = <option/value><operator><option/value>                                      |
| approval-breakdown                                             | Displays current breakdown UI for Plurality - but with approval scores.                                            |
| weight-breakdown (Not implemented)                             | Displays current breakdown UI for Plurality - but with weighted scores.                                            |

### New plurality voting:

```
---
title: POLL PARAMETERS Single choice plurality
summary: something
discussion_link: link
parameters:
    input_format: single-choice
    victory_conditions:
        - { type : plurality }
    result_display: single-vote-breakdown
version: v2.0.0
options:
  0: Abstain
  1: Yes
  2: No
start_date: 2022-03-06T16:00:00
end_date: 2025-11-05T16:00:00
---

```

### New ranked choice voting:

```
---

title: POLL PARAMETERS Rank Free Instant Runoff
summary: something
discussion_link: link
parameters:
  input_format: rank-free
  victory_conditions:
    - { type : instant-runoff }
  result_display: instant-runoff-breakdown
version: v2.0.0
options:
  0: Option 1
  1: Option 2
  2: Option 3
  3: Option 4
  4: Option 5
start_date: 2022-03-06T16:00:00
end_date: 2025-11-05T16:00:00

---
```

### Approval voting

Approval voting allows user to select multiple options but should only allow the user to choose one if they select "Abstain" or "None of the above". To do this we use the "options" field on the "input-format".

Example:

- input_format
  type: approval
  options: [1,2,3] : Determine that the user can only select multiple 1,2,3. Option number 4 or 0 will be exclusive.
- { type: 'approval', options: [1,2,3] } : Determine the options that will count as "approved", in theory it should match the input format options.

```
---
title: Approval
summary: something
discussion_link: link
parameters:
  input_format:
    type: choose-free
    options: [1,2,3]
    abstain: [0]
  victory_conditions:
      - { type : approval }
  result_display: approval-breakdown
version: v2.0.0
options:
  0: Abstain
  1: Approve
  2: Approve (With plan B)
  3: Approve (With plan C)
  4: None of the above
start_date: 2022-03-06T16:00:00
end_date: 2025-11-05T16:00:00
---

```

Approval voting can be combined also with other conditions like "Comparison" and "Default".

#### Comparison

The victory condition "comparison" indicates that for the selected options to be declared the winner, they need to satisfy the "comparator" threshold. In the following example, the options 0,1,4 need at least 10,000 MKR to be determined as winners.

\*\*NOTE: The "options" field is ignored for now, and the comparison applies to all the options"

```
parameters:
  input_format:
    type: choose-free
    options: [1,2,3]
    abstain: [0]
  victory_conditions:
    - { type : approval }
    - { type : comparison, options: [1,2,3], comparator : '>=', value: 10000 }
  result_display: approval-breakdown
```

#### Default

The default option determines which option will be selected if none of the previous conditions are met.

```
parameters:
  input_format:
    type: choose-free
    options: [1,2,3]
    abstain: [0]
  victory_conditions:
    - { type : approval }
    - { type : default, value : 2 }
  result_display: approval-breakdown
```

### AND logic.

Victory conditions use the IF / ELSE logic. The winner will be determined by the first of the conditions being met. If we want to create an AND condition, the victory_conditions need to be grouped in an AND condition.

In the following example, the victory conditions require that:

- There's an approval winner and it needs to have at least 10,000 MKR.
- If the previous condition is not met, default to option 2 as winner.

In this example, if the most voted option is the option 1, but the amount of MKR is less than 10,000 MKR, the winner will be option 2.

```
parameters:
  input_format:
    type: choose-free
    options: [1,2,3]
    abstain: [0]
  victory_conditions:
    - {
        type: 'and',
        conditions: [
          { type : approval },
          { type : comparison, comparator : '>=', value: 10000 }
        ]
      }
    - { type : default, value : 2 }
  result_display: approval-breakdown
```

If we also want to add a requirement that an option has to have more than 50% of the votes to be determined as the winner, we would do:

```
parameters:
  input_format:
    type: choose-free
    options: [1,2,3]
    abstain: [0]
  victory_conditions:
    - {
        type: 'and',
        conditions: [
          { type : approval },
          { type: majority, percent: 50 },
          { type : comparison, comparator : '>=', value: 10000 }
        ]
      }
    - { type : default, value : 2 }
  result_display: approval-breakdown
```

### Example of the new poll parameters on a poll

We have created several test polls that can be found at: https://github.com/makerdao-dux/community/tree/dux/goerli-polls/governance/polls/poll-parameters
