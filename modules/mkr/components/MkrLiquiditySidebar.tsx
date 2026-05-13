/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { useState } from 'react';
import { Card, Flex, Text, Box, Heading, IconButton } from 'theme-ui';
import useSWR from 'swr';
import Icon from 'modules/app/components/Icon';
import Skeleton from 'modules/app/components/SkeletonThemed';
import Stack from 'modules/app/components/layout/layouts/Stack';
import { formatValue } from 'lib/string';
import { parseEther } from 'viem';
import { SupportedNetworks } from 'modules/web3/constants/networks';
import { networkNameToChainId } from 'modules/web3/helpers/chain';
import { config } from 'lib/config';
import { useChainId, useReadContracts } from 'wagmi';
import { mkrAbi, mkrAddress as mkrAddressMapping } from 'modules/contracts/generated';
import { getPublicClient } from 'modules/web3/helpers/getPublicClient';

const aaveLendingPoolCore = '0x3dfd23A6c5E8BbcFc9581d2E864a68feb6a076d3';
const aaveV2Amkr = '0xc713e5E149D5D0715DcD1c156a020976e7E56B88';
const uniswapV2MkrEthPool = '0xC2aDdA861F89bBB333c90c492cB837741916A225';
const uniswapV2MkrDaiPool = '0x517f9dd285e75b599234f7221227339478d0fcc8';
const uniswapV3MkrEthPointThreePercentPool = '0xe8c6c9227491C0a8156A0106A0204d881BB7E531';
const uniswapV3MkrEthOnePercentPool = '0x3aFdC5e6DfC0B0a507A8e023c9Dce2CAfC310316';
const sushiswapAddress = '0xba13afecda9beb75de5c56bbaf696b880a5a50dd';
const compoundCTokenAddress = '0x95b4eF2869eBD94BEb4eEE400a99824BF5DC325b';

async function getBalancerV1Mkr(mkrAddress: string) {
  const resp = await fetch(
    `https://gateway-arbitrum.network.thegraph.com/api/${config.SUBGRAPH_API_KEY}/subgraphs/id/93yusydMYauh7cfe9jEfoGABmwnX4GffHd7in8KJi1XB`,
    {
      method: 'post',
      body: JSON.stringify({
        query: `
          query PostsForPools {
            pools(where: {tokensList_contains: ["${mkrAddress}"], publicSwap: true}) {
              tokens {
                address
                balance
                symbol
              }
            }
          }
          `
      })
    }
  );
  const json = await resp.json();
  const balancerNum = json.data.pools
    .flatMap(pool => pool.tokens)
    .reduce((sum, token) => (token.symbol === 'MKR' ? parseFloat(token.balance) : 0) + sum, 0);
  return parseEther(parseInt(balancerNum).toString());
}

async function getBalancerV2Mkr(mkrAddress: string) {
  const resp = await fetch(
    `https://gateway-arbitrum.network.thegraph.com/api/${config.SUBGRAPH_API_KEY}/subgraphs/id/C4ayEZP2yTXRAB8vSaTrgN4m9anTe9Mdm2ViyiAuV9TV`,
    {
      method: 'post',
      body: JSON.stringify({
        query: `
          query PostsForPools {
            pools(where: {tokensList_contains: ["${mkrAddress}"]}) {
              tokens {
                address
                balance
                symbol
              }
            }
          }
          `
      })
    }
  );
  const json = await resp.json();
  const balancerNum = json.data.pools
    .flatMap(pool => pool.tokens)
    .reduce(
      (sum, token) =>
        (token.address.toLowerCase() === mkrAddress.toLowerCase() ? parseFloat(token.balance) : 0) + sum,
      0
    );
  return parseEther(parseInt(balancerNum).toString());
}

async function getCompoundMkr(network: SupportedNetworks) {
  if (network !== SupportedNetworks.MAINNET) return 0n;

  const chainId = networkNameToChainId(network);
  const publicClient = getPublicClient(chainId);

  const compoundMkr = await publicClient.readContract({
    address: mkrAddressMapping[chainId],
    abi: mkrAbi,
    functionName: 'balanceOf',
    args: [compoundCTokenAddress]
  });

  return compoundMkr;
}

export default function MkrLiquiditySidebar({
  network,
  className
}: {
  network: SupportedNetworks;
  className?: string;
}): JSX.Element {
  const [expanded, setExpanded] = useState({});
  const chainId = useChainId();

  const mkrAddress = mkrAddressMapping[chainId];

  const liquidityCallParams = {
    address: mkrAddress,
    abi: mkrAbi,
    chainId,
    functionName: 'balanceOf'
  } as const;

  const {
    data: [
      aaveV1,
      aaveV2,
      uniswapV2MkrEth,
      uniswapV2MkrDai,
      uniswapV3MkrEthPointThreePercent,
      uniswapV3MkrEthOnePercent,
      sushi
    ] = []
  } = useReadContracts({
    contracts: [
      {
        ...liquidityCallParams,
        args: [aaveLendingPoolCore]
      },
      {
        ...liquidityCallParams,
        args: [aaveV2Amkr]
      },
      {
        ...liquidityCallParams,
        args: [uniswapV2MkrEthPool]
      },
      {
        ...liquidityCallParams,
        args: [uniswapV2MkrDaiPool]
      },
      {
        ...liquidityCallParams,
        args: [uniswapV3MkrEthPointThreePercentPool]
      },
      {
        ...liquidityCallParams,
        args: [uniswapV3MkrEthOnePercentPool]
      },
      {
        ...liquidityCallParams,
        args: [sushiswapAddress]
      }
    ],
    allowFailure: false,
    scopeKey: `mkr-liquidity-${chainId}`
  });

  const { data: balancerV1 } = useSWR(
    `${mkrAddress}/mkr-liquidity-balancer-v1`,
    () => getBalancerV1Mkr(mkrAddress),
    { refreshInterval: 60000 }
  );

  const { data: balancerV2 } = useSWR(
    `${mkrAddress}/mkr-liquidity-balancer-v2`,
    () => getBalancerV2Mkr(mkrAddress),
    { refreshInterval: 60000 }
  );

  const { data: compound } = useSWR(`${mkrAddress}/mkr-liquidity-compound`, () => getCompoundMkr(network), {
    refreshInterval: 60000
  });

  const mkrPools = [
    [
      'Balancer',
      balancerV1 && balancerV2 && balancerV1 + balancerV2,
      [
        ['Balancer V1', balancerV1],
        ['Balancer V2', balancerV2]
      ]
    ],
    [
      'Aave',
      aaveV1 && aaveV2 && aaveV1 + aaveV2,
      [
        ['Aave V1', aaveV1],
        ['Aave V2', aaveV2]
      ]
    ],
    [
      'Uniswap',
      uniswapV2MkrEth &&
        uniswapV2MkrDai &&
        uniswapV3MkrEthPointThreePercent &&
        uniswapV3MkrEthOnePercent &&
        uniswapV2MkrEth + uniswapV2MkrDai + uniswapV3MkrEthPointThreePercent + uniswapV3MkrEthOnePercent,
      [
        ['Uniswap V2 (MKR/DAI)', uniswapV2MkrDai],
        ['Uniswap V3 (MKR/ETH 0.3%)', uniswapV3MkrEthPointThreePercent],
        ['Uniswap V3 (MKR/ETH 1%)', uniswapV3MkrEthOnePercent],
        ['Uniswap V2 (MKR/ETH)', uniswapV2MkrEth]
      ]
    ],
    ['Sushi', sushi],
    ['Compound', compound]
  ].sort((a, b) => (a[1] && b[1] ? (a[1] > b[1] ? -1 : 1) : 0));

  const totalLiquidity = `${formatValue(
    mkrPools.reduce((acc, cur) => acc + ((cur[1] as bigint | undefined) || 0n), 0n)
  )} MKR`;

  const PoolComponent = pool => {
    const [poolName, poolLiquidity, subpools] = pool;
    return (
      <Flex key={poolName} sx={{ flexDirection: 'column' }}>
        <Flex sx={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <Flex sx={{ alignItems: 'center' }}>
            <Text sx={{ fontSize: 3, color: 'textSecondary' }}>MKR in {poolName}</Text>
            {subpools && (
              <Box sx={{ ml: 1 }}>
                <Flex
                  sx={{
                    bg: 'background',
                    size: 'auto',
                    width: '17px',
                    height: '17px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 'round'
                  }}
                >
                  <IconButton
                    aria-label={`${poolName} pools expand`}
                    onClick={() =>
                      setExpanded({
                        ...expanded,
                        [poolName]: !expanded[poolName]
                      })
                    }
                  >
                    <Icon size={2} name={expanded[poolName] ? 'minus' : 'plus'} color="textSecondary" />
                  </IconButton>
                </Flex>
              </Box>
            )}
          </Flex>
          <Text variant="h2" sx={{ fontSize: 3 }}>
            {poolLiquidity ? (
              `${formatValue(poolLiquidity)} MKR`
            ) : (
              <Box sx={{ width: 6 }}>
                <Skeleton />
              </Box>
            )}
          </Text>
        </Flex>
        {subpools && expanded[poolName] && (
          <Flex sx={{ flexDirection: 'column' }}>
            {subpools.map(subpool => {
              const [subpoolName, subpoolLiquidity] = subpool;
              return (
                <Flex
                  key={subpoolName}
                  sx={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    mt: 2,
                    ml: 3
                  }}
                >
                  <Flex sx={{ alignItems: 'center' }}>
                    <Text sx={{ fontSize: 2, color: 'textSecondary' }}>MKR in {subpoolName}</Text>
                  </Flex>
                  <Text variant="h2" sx={{ fontSize: 2, color: 'textSecondary' }}>
                    {subpoolLiquidity ? (
                      `${formatValue(subpoolLiquidity)} MKR`
                    ) : (
                      <Box sx={{ width: 6 }}>
                        <Skeleton />
                      </Box>
                    )}
                  </Text>
                </Flex>
              );
            })}
          </Flex>
        )}
      </Flex>
    );
  };

  return (
    <Box sx={{ display: ['none', 'block'] }} className={className}>
      <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 2, mt: 4 }}>
        <Heading as="h3" variant="microHeading">
          MKR Liquidity
        </Heading>
        <Text sx={{ fontSize: 4 }}>{totalLiquidity}</Text>
      </Flex>
      <Card variant="compact">
        <Stack gap={3}>{mkrPools.map(p => PoolComponent(p))}</Stack>
      </Card>
    </Box>
  );
}
