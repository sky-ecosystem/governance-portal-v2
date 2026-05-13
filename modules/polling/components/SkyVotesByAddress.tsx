/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { Box, Button, Flex, Text } from 'theme-ui';
import { useBreakpointIndex } from '@theme-ui/match-media';
import { InternalLink } from 'modules/app/components/InternalLink';
import AddressIconBox from 'modules/address/components/AddressIconBox';
import { useMemo, useState } from 'react';
import Icon from 'modules/app/components/Icon';
import { SkyPollTallyResponse } from 'pages/api/sky/polls/tally/[poll-id]';
import { SkyPollDetailResponse } from 'pages/api/sky/polls/[poll-id-or-slug]';
import EtherscanLink from 'modules/web3/components/EtherscanLink';
import { chainIdToNetworkName } from 'modules/web3/helpers/chain';

type Props = {
  tally: SkyPollTallyResponse;
  poll: SkyPollDetailResponse;
};

const INITIAL_VOTES_COUNT = 10;

const SkyVotesByAddress = ({ tally, poll }: Props): JSX.Element => {
  const bpi = useBreakpointIndex();
  const { votesByAddress: votes, totalSkyParticipation } = tally;
  const [sortBy, setSortBy] = useState({
    type: 'sky',
    order: 1
  });
  const [showAllVotes, setShowAllVotes] = useState(false);

  const changeSort = type => {
    if (sortBy.type === type) {
      setSortBy({
        type,
        order: sortBy.order === 1 ? -1 : 1
      });
    } else {
      setSortBy({
        type,
        order: 1
      });
    }
  };

  const loadMoreVotes = () => {
    setShowAllVotes(true);
  };

  const filteredVotes = useMemo(() => {
    let sorted: typeof votes | undefined;

    switch (sortBy.type) {
      case 'sky':
        sorted = votes?.sort((a, b) => {
          const aSKY = Number(a.skySupport);
          const bSKY = Number(b.skySupport);
          return sortBy.order === 1 ? (aSKY > bSKY ? -1 : 1) : aSKY > bSKY ? 1 : -1;
        });
        break;
      case 'address':
        sorted = votes?.sort((a, b) =>
          sortBy.order === 1 ? (a.voter > b.voter ? -1 : 1) : a.voter > b.voter ? 1 : -1
        );
        break;
      case 'option':
        sorted = votes?.sort((a, b) =>
          sortBy.order === 1 ? (a.ballot[0] > b.ballot[0] ? -1 : 1) : a.ballot[0] > b.ballot[0] ? 1 : -1
        );
        break;
      default:
        sorted = votes;
    }

    return showAllVotes ? sorted : sorted?.slice(0, INITIAL_VOTES_COUNT);
  }, [votes, sortBy.type, sortBy.order, showAllVotes]);

  const getOptionName = (optionId: number) => {
    return poll.options[optionId] || `Option ${optionId}`;
  };

  const calculatePercentage = (skySupport: string) => {
    const support = Number(skySupport);
    const total = Number(totalSkyParticipation);
    return total > 0 ? ((support / total) * 100).toFixed(1) : '0.0';
  };

  return (
    <Flex sx={{ flexDirection: 'column', alignItems: 'center' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse'
        }}
      >
        <thead>
          <tr>
            <Text
              as="th"
              sx={{ textAlign: 'left', cursor: 'pointer', pb: 2, width: '32%' }}
              variant="caps"
              onClick={() => changeSort('address')}
            >
              Address
              {sortBy.type === 'address' ? (
                sortBy.order === 1 ? (
                  <Icon name="chevron_down" size={2} sx={{ ml: 1 }} />
                ) : (
                  <Icon name="chevron_up" size={2} sx={{ ml: 1 }} />
                )
              ) : (
                ''
              )}
            </Text>
            <Text
              as="th"
              sx={{ textAlign: 'left', cursor: 'pointer', pb: 2, width: '38%' }}
              variant="caps"
              onClick={() => changeSort('option')}
            >
              Option
              {sortBy.type === 'option' ? (
                sortBy.order === 1 ? (
                  <Icon name="chevron_down" size={2} sx={{ ml: 1 }} />
                ) : (
                  <Icon name="chevron_up" size={2} sx={{ ml: 1 }} />
                )
              ) : (
                ''
              )}
            </Text>
            {bpi > 3 && (
              <Text
                as="th"
                sx={{ textAlign: 'left', cursor: 'pointer', pb: 2, width: '10%' }}
                variant="caps"
                onClick={() => changeSort('sky')}
              >
                Vote %
                {sortBy.type === 'sky' ? (
                  sortBy.order === 1 ? (
                    <Icon name="chevron_down" size={2} sx={{ ml: 1 }} />
                  ) : (
                    <Icon name="chevron_up" size={2} sx={{ ml: 1 }} />
                  )
                ) : (
                  ''
                )}
              </Text>
            )}
            <Text
              as="th"
              sx={{ textAlign: ['right', 'right', 'left'], cursor: 'pointer', pb: 2, width: '15%' }}
              variant="caps"
              data-testid="sky-header"
              onClick={() => changeSort('sky')}
            >
              SKY
              {sortBy.type === 'sky' ? (
                sortBy.order === 1 ? (
                  <Icon name="chevron_down" size={2} sx={{ ml: 1 }} />
                ) : (
                  <Icon name="chevron_up" size={2} sx={{ ml: 1 }} />
                )
              ) : (
                ''
              )}
            </Text>

            {bpi > 1 && (
              <Text
                as="th"
                sx={{ textAlign: 'right', cursor: 'pointer', pb: 2, width: ['10%'] }}
                variant="caps"
              >
                Verify
              </Text>
            )}
          </tr>
        </thead>
        <tbody>
          {filteredVotes ? (
            <>
              {filteredVotes.map((v, i) => (
                <tr key={`voter-${v.voter}-${i}`} data-testid="vote-by-address">
                  <Text
                    as="td"
                    sx={{ pb: 2, fontSize: [1, 3], verticalAlign: 'top', wordBreak: 'break-word' }}
                  >
                    <InternalLink href={`/address/${v.voter}`} title="View address detail">
                      <AddressIconBox
                        address={v.voter}
                        width={bpi < 1 ? 31 : 41}
                        limitTextLength={bpi < 1 ? 15 : 0}
                      />
                    </InternalLink>
                  </Text>
                  <Box
                    as="td"
                    sx={{
                      pb: 2,
                      fontSize: [1, 3],
                      color: 'textSecondary'
                    }}
                  >
                    {getOptionName(v.ballot[0])}
                  </Box>
                  {bpi > 3 && (
                    <Text as="td" sx={{ textAlign: 'left', pb: 2, fontSize: [1, 3] }}>
                      {calculatePercentage(v.skySupport)}%
                    </Text>
                  )}
                  <Text
                    as="td"
                    data-testid={`vote-sky-${v.voter}`}
                    sx={{ textAlign: ['right', 'right', 'left'], pb: 2, fontSize: [1, 3] }}
                  >
                    {`${Number(v.skySupport).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 0
                    })}${bpi > 3 ? ' SKY' : ''}`}
                  </Text>
                  {bpi > 1 && (
                    <Text
                      as="td"
                      data-testid={`vote-sky-${v.hash}`}
                      sx={{ textAlign: 'right', pb: 2, fontSize: [1, 3] }}
                    >
                      <EtherscanLink
                        hash={v.hash}
                        type="transaction"
                        styles={{ justifyContent: 'flex-end' }}
                        network={chainIdToNetworkName(v.chainId)}
                        prefix=""
                      />
                    </Text>
                  )}
                </tr>
              ))}
            </>
          ) : (
            <tr key={0}>
              <td colSpan={3}>
                <Text color="text" variant="allcaps">
                  Loading
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {filteredVotes && votes && filteredVotes.length < votes.length && (
        <Button
          onClick={loadMoreVotes}
          variant="outline"
          data-testid="button-show-more-poll-voters"
          sx={{ mt: 3 }}
        >
          <Text color="text" variant="caps">
            Show all votes
          </Text>
        </Button>
      )}
    </Flex>
  );
};

export default SkyVotesByAddress;
