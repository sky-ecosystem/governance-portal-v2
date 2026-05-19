/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { DEFAULT_NETWORK, SupportedNetworks } from 'modules/web3/constants/networks';
import { cacheGet, cacheSet } from 'modules/cache/cache';
import { fetchGithubGraphQL } from 'lib/github';
import { CMSProposal, Proposal } from 'modules/executive/types';
import { parseExecutive } from './parseExecutive';
import invariant from 'tiny-invariant';
import { markdownToHtml } from 'lib/markdown';
import { EXEC_PROPOSAL_INDEX } from '../executive.constants';
import { analyzeSpell, getExecutiveMKRSupport } from './analyzeSpell';
import { ZERO_ADDRESS } from 'modules/web3/constants/addresses';
import logger from 'lib/logger';
import { getExecutiveProposalsCacheKey, githubExecutivesCacheKey } from 'modules/cache/constants/cache-keys';
import { ONE_HOUR_IN_MS } from 'modules/app/constants/time';
import { allGithubExecutives } from 'modules/gql/queries/github/allGithubExecutives';
import { trimProposalKey } from '../helpers/trimProposalKey';

export async function getGithubExecutives(network: SupportedNetworks): Promise<CMSProposal[]> {
  const cachedProposals = await cacheGet(githubExecutivesCacheKey, network);
  if (cachedProposals) {
    return JSON.parse(cachedProposals);
  }

  const proposalIndex = await (await fetch(EXEC_PROPOSAL_INDEX)).json();

  const githubRepo = {
    owner: 'sky-ecosystem',
    repo: 'community',
    page: 'governance/votes'
  };

  const githubResponse = await fetchGithubGraphQL(githubRepo, allGithubExecutives);
  const proposals = githubResponse.repository.object.entries
    .filter(entry => entry.type === 'blob')
    .map(file => {
      try {
        const pathParts = file.path.split('/');
        const last = pathParts.pop();
        const path = `https://raw.githubusercontent.com/${githubRepo.owner}/${
          githubRepo.repo
        }/master/${pathParts.join('/')}/${encodeURIComponent(last)}`;
        return parseExecutive(file.object.text, proposalIndex, path, SupportedNetworks.MAINNET); //always use mainnet proposal index for now
      } catch (e) {
        logger.error(`getGithubExecutives: network ${network}`, e);
        // Catch error and return null if failed fetching one proposal
        return null;
      }
    });

  const filteredProposals: CMSProposal[] = proposals
    .filter(x => !!x)
    .filter(x => x?.address !== ZERO_ADDRESS) as CMSProposal[];

  const sortedProposals = filteredProposals
    .sort((a, b) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime())
    .sort(a => (a.active ? -1 : 1)) // Sort by active first
    .slice(0, 100);

  cacheSet(githubExecutivesCacheKey, JSON.stringify(sortedProposals), network);

  return sortedProposals;
}

async function getGithubExecutivesWithMKR(network: SupportedNetworks): Promise<CMSProposal[]> {
  const proposals = await getGithubExecutives(network);

  const mkrSupports = await Promise.all(
    proposals.map(async proposal => {
      const mkrSupport = await getExecutiveMKRSupport(proposal.address, network);
      return {
        ...proposal,
        spellData: {
          mkrSupport
        }
      };
    })
  );

  return mkrSupports;
}

export async function getExecutiveProposals({
  start = 0,
  limit = 5,
  sortBy = 'active',
  startDate = 0,
  endDate = 0,
  network = DEFAULT_NETWORK.network
}: {
  start?: number;
  limit?: number;
  sortBy?: 'date' | 'mkr' | 'active';
  startDate?: number;
  endDate?: number;
  network?: SupportedNetworks;
}): Promise<Proposal[]> {
  const currentNetwork = network === SupportedNetworks.TENDERLY ? SupportedNetworks.MAINNET : network;

  const cacheKey = getExecutiveProposalsCacheKey(start, limit, sortBy, startDate, endDate);

  logger.debug('Getting executives with key: ', cacheKey);

  const cachedProposals = await cacheGet(cacheKey, currentNetwork);
  if (cachedProposals) {
    return JSON.parse(cachedProposals);
  }
  const proposals =
    sortBy === 'mkr'
      ? await getGithubExecutivesWithMKR(currentNetwork)
      : await getGithubExecutives(currentNetwork);

  const sorted = proposals.sort((a, b) => {
    if (sortBy === 'mkr') {
      const bSupport = b.spellData ? b.spellData?.mkrSupport || 0 : 0;
      const aSupport = a.spellData ? a.spellData?.mkrSupport || 0 : 0;
      return BigInt(bSupport) > BigInt(aSupport) ? 1 : -1;
    } else if (sortBy === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return a.active ? -1 : 1; // Sort by active first
    }
  });

  // Filter by dates
  const filtered = sorted.filter(proposal => {
    if (startDate && new Date(proposal.date).getTime() < startDate) return false;
    if (endDate && new Date(proposal.date).getTime() > endDate) return false;
    return true;
  });

  const subset = filtered.slice(start, start + limit);

  const analyzedProposals = await Promise.all(
    subset.map(async p => {
      return {
        ...p,
        content: p.content?.substring(0, 100) + '...',
        about: p.about?.substring(0, 100) + '...',
        spellData: await analyzeSpell(p.address, currentNetwork)
      };
    })
  );

  cacheSet(cacheKey, JSON.stringify(analyzedProposals), currentNetwork, ONE_HOUR_IN_MS);

  return analyzedProposals;
}

export async function getExecutiveProposal(
  proposalId: string,
  network?: SupportedNetworks
): Promise<Proposal | null> {
  const net = network ? network : DEFAULT_NETWORK.network;

  const currentNetwork = net === SupportedNetworks.TENDERLY ? SupportedNetworks.MAINNET : net;

  const proposals = await getGithubExecutives(currentNetwork);

  const proposal = proposals.find(
    proposal =>
      trimProposalKey(proposal.key) === proposalId ||
      proposal.key === proposalId ||
      proposal.address.toLowerCase() === proposalId.toLowerCase()
  );
  if (!proposal) return null;
  invariant(proposal, `proposal not found for proposal id ${proposalId}`);

  const spellData = await analyzeSpell(proposal.address, currentNetwork);
  const content = await markdownToHtml(proposal.about || '');
  return {
    ...proposal,
    spellData,
    content
  };
}
