/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { Flex, Grid, Box, Text, Link as ExternalLink, Heading } from 'theme-ui';
import { ViewMore } from 'modules/home/components/ViewMore';
import Skeleton from 'modules/app/components/SkeletonThemed';
import { useEffect, useState } from 'react';
import { fetchDelegationMetrics } from 'modules/delegates/api/fetchDelegationMetrics';
import { useNetwork } from 'modules/app/hooks/useNetwork';

type StatsProps = {
  title: string;
  infoUnits: {
    title: string;
    value: string | JSX.Element;
  }[];
  viewMoreUrl?: string;
};

const Stats = ({ title, infoUnits, viewMoreUrl }: StatsProps): JSX.Element => {
  return (
    <>
      {/* Desktop */}
      <Box sx={{ display: ['none', 'block'] }}>
        <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Heading>{title}</Heading>
          {viewMoreUrl && (
            <ExternalLink href={viewMoreUrl} target="_blank">
              <ViewMore />
            </ExternalLink>
          )}
        </Flex>

        <Flex sx={{ mx: 0, px: 5, pb: 3, backgroundColor: 'background', borderRadius: 'small' }}>
          <Flex m={3} sx={{ width: '100%', justifyContent: 'space-evenly' }}>
            {infoUnits.map(unit => (
              <Box key={unit.title} data-testid={unit.title}>
                <Box>
                  <Text sx={{ fontSize: 2, color: 'textSecondary' }}>{unit.title}</Text>
                </Box>
                <Box mt={2} data-testid={`${unit.title}-value`}>
                  <Text sx={{ fontSize: 5 }}>{unit.value}</Text>
                </Box>
              </Box>
            ))}
          </Flex>
        </Flex>
      </Box>

      {/* Mobile */}
      <Box sx={{ display: ['block', 'none'], backgroundColor: 'background' }}>
        <Grid sx={{ p: 0 }}>
          <Flex sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Heading>{title}</Heading>
            {viewMoreUrl && (
              <ExternalLink href={viewMoreUrl} target="_blank">
                <ViewMore />
              </ExternalLink>
            )}
          </Flex>

          {infoUnits.map(unit => (
            <Flex key={`${unit.title}-mobile`} sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text sx={{ fontSize: 2, color: 'textSecondary' }}>{unit.title}</Text>
              <Text sx={{ fontSize: 2 }}>{unit.value}</Text>
            </Flex>
          ))}
        </Grid>
      </Box>
    </>
  );
};

type Props = {
  mkrInChief?: string;
};

export function GovernanceStats({ mkrInChief }: Props): JSX.Element {
  const network = useNetwork();
  const [totalMKRDelegated, setTotalMKRDelegated] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDelegationMetrics() {
      try {
        const metrics = await fetchDelegationMetrics(network);
        setTotalMKRDelegated(metrics.totalMkrDelegated);
      } catch (error) {
        console.error('Failed to fetch delegation metrics:', error);
        setTotalMKRDelegated('0');
      } finally {
        setLoading(false);
      }
    }

    if (network) {
      loadDelegationMetrics();
    }
  }, [network]);
  const infoUnits = [
    {
      title: 'MKR Delegated',
      value: !loading && totalMKRDelegated ? (
        `${Number(totalMKRDelegated).toLocaleString(undefined, { maximumFractionDigits: 0 })} MKR`
      ) : (
        <Skeleton />
      )
    },
    {
      title: 'MKR in Chief',
      value: mkrInChief ? `${mkrInChief} MKR` : <Skeleton />
    }
  ];

  return <Stats title="MKR in Legacy Governance" infoUnits={infoUnits} viewMoreUrl="" />;
}
