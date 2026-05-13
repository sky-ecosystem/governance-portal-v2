/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { useState, useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import ErrorPage from 'modules/app/components/ErrorPage';
import { Flex, Spinner, Text } from 'theme-ui';
import { isDefaultNetwork } from 'modules/web3/helpers/networks';
import PrimaryLayout from 'modules/app/components/layout/layouts/Primary';
import { HeadComponent } from 'modules/app/components/layout/Head';
import { useNetwork } from 'modules/app/hooks/useNetwork';
import { useSkyExecutiveDetail } from 'modules/executive/hooks/useSkyExecutiveDetail';
import SkyExecutiveDetailView from 'modules/executive/components/SkyExecutiveDetailView';
import { ErrorBoundary } from 'modules/app/components/ErrorBoundary';
import { fetchJson } from 'lib/fetchJson';
import { SkyExecutiveDetailResponse } from 'modules/executive/types';

const LoadingIndicator = () => (
  <PrimaryLayout sx={{ maxWidth: 'dashboard' }}>
    <Flex sx={{ justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
      <Spinner size={48} />
      <Text ml={3} sx={{ fontSize: 4 }}>
        Loading Sky executive...
      </Text>
    </Flex>
  </PrimaryLayout>
);

export default function SkyExecutivePage({
  executive: prefetchedExecutive
}: {
  executive?: SkyExecutiveDetailResponse;
}): JSX.Element {
  const [_executive, _setExecutive] = useState<SkyExecutiveDetailResponse>();
  const [error, setError] = useState<string>();
  const router = useRouter();
  const { query } = router;
  const network = useNetwork();
  const proposalId = query['proposal-id'] as string;

  // Use the Sky executive detail hook
  const { executive: skyExecutive, error: skyError, isValidating } = useSkyExecutiveDetail(
    proposalId
  );

  // fetch executive contents at run-time if on any network other than the default
  useEffect(() => {
    if (!network) return;
    if (!isDefaultNetwork(network) && query['proposal-id']) {
      fetchJson(`/api/sky/executives/${query['proposal-id']}?network=${network}`)
        .then(response => {
          _setExecutive(response);
        })
        .catch(setError);
    }
  }, [query['proposal-id'], network]);

  // Check for fallback state first
  if (router.isFallback) {
    return <LoadingIndicator />;
  }

  // Show loading state if still loading
  if (isValidating && !skyExecutive && !prefetchedExecutive) {
    return <LoadingIndicator />;
  }

  // Determine which executive to use
  const executive = skyExecutive || prefetchedExecutive || (isDefaultNetwork(network) ? null : _executive);

  // Handle error cases
  if ((error || skyError) && !executive) {
    return (
      <PrimaryLayout sx={{ maxWidth: 'dashboard' }}>
        <ErrorPage
          statusCode={404}
          title="Sky executive proposal either does not exist, or could not be fetched at this time"
        />
      </PrimaryLayout>
    );
  }

  // Loading check for non-default networks
  if (!isDefaultNetwork(network) && !_executive && !executive) {
    return <LoadingIndicator />;
  }

  // Final check - if no executive found
  if (!executive) {
    return (
      <PrimaryLayout sx={{ maxWidth: 'dashboard' }}>
        <ErrorPage
          statusCode={404}
          title="Sky executive proposal either does not exist, or could not be fetched at this time"
        />
      </PrimaryLayout>
    );
  }

  return (
    <ErrorBoundary componentName="Sky Executive Page">
      <HeadComponent
        title={`Sky Executive ${executive.title || executive.key}`}
        description={`See the details of the Sky executive proposal ${executive.title || executive.key}.`}
      />
      <SkyExecutiveDetailView executive={executive} />
    </ErrorBoundary>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // For Sky executives, we'll try to fetch from the Sky API
  const proposalId = (params || {})['proposal-id'] as string;
  
  let executive: SkyExecutiveDetailResponse | null = null;
  
  try {
    // Try to fetch Sky executive data
    executive = await fetchJson(`/api/sky/executives/${proposalId}`);
  } catch (error) {
    // If Sky executive not found, that's okay - we'll handle it in the component
    console.log(`Sky executive ${proposalId} not found during static generation`);
  }

  return {
    revalidate: 60, // Revalidate every minute for Sky executives
    props: {
      executive
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // For now, we'll generate paths dynamically since Sky executives are fetched from an API
  // In the future, we could pre-generate paths for the most recent Sky executives
  return {
    paths: [],
    fallback: true
  };
};