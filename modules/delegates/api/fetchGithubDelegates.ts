/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { matterWrapper } from 'lib/matter';
import { GraphQlQueryResponseData } from '@octokit/graphql';
import { SupportedNetworks } from 'modules/web3/constants/networks';
import { cacheGet, cacheSet } from 'modules/cache/cache';
import { fetchGithubGraphQL, fetchGitHubPage, GithubPage } from 'lib/github';
import { markdownToHtml } from 'lib/markdown';
import { DelegateRepoInformation } from 'modules/delegates/types';
import { getDelegatesRepositoryInformation, RepositoryInfo } from './getDelegatesRepositoryInfo';
import { isAddress } from 'viem';
import { allGithubDelegates } from 'modules/gql/queries/github/allGithubDelegates';
import logger from 'lib/logger';
import { delegatesGithubCacheKey, getDelegateGithubCacheKey } from 'modules/cache/constants/cache-keys';
import { ONE_HOUR_IN_MS } from 'modules/app/constants/time';

// Parses the information on a delegate folder in github and extracts a DelegateRepoInformation parsed object
async function extractGithubInformation(
  owner: string,
  repo: string,
  folder: GithubPage
): Promise<DelegateRepoInformation | undefined> {
  try {
    const folderContents = await fetchGitHubPage(owner, repo, folder.path);

    const profileMd = folderContents.find(item => item.name === 'profile.md');

    const metricsMd = folderContents.find(item => item.name === 'metrics.md');

    const cuMemberMd = folderContents.find(item => item.name === 'cumember.md');

    // No profile found
    if (!profileMd) {
      return undefined;
    }

    const profileMdDoc = await (await fetch(profileMd?.download_url)).text();

    const {
      content,
      data: { name, external_profile_url, tags }
    } = matterWrapper(profileMdDoc);

    let metricsMdDoc;
    let metricsData;
    if (metricsMd) {
      metricsMdDoc = await (await fetch(metricsMd?.download_url)).text();
      const { data } = matterWrapper(metricsMdDoc);
      metricsData = data;
    }

    let cuMember = false;
    if (cuMemberMd) {
      cuMember = true;
    }

    const picture = folderContents.find(item => item.name.indexOf('avatar') !== -1);
    const html = await markdownToHtml(content);
    return {
      voteDelegateAddress: folder.name,
      name: name,
      picture: picture ? picture.download_url : undefined,
      externalUrl: external_profile_url,
      description: html,
      tags,
      combinedParticipation: metricsData.combined_participation,
      pollParticipation: metricsData.poll_participation,
      executiveParticipation: metricsData.exec_participation,
      communication: metricsData.communication,
      cuMember
    };
  } catch (e) {
    logger.error('extractGithubInformation: Error parsing folder from github delegate', e.message);
    return undefined;
  }
}

async function extractGithubInformationGraphQL(
  data: GraphQlQueryResponseData,
  delegatesRepositoryInfo: RepositoryInfo
): Promise<DelegateRepoInformation[]> {
  const entries = data.repository.object.entries;
  const promises = entries
    // Our query returns extraneous files in the delegates folder, but we only want addresses
    .filter(({ name }) => isAddress(name))
    .map(async delegateEntry => {
      const voteDelegateAddress = delegateEntry.name;

      const folderContents = delegateEntry.object.entries;
      const profileMd = folderContents.find(item => item.name === 'profile.md');

      const metricsMd = folderContents.find(item => item.name === 'metrics.md');

      const cuMemberMd = folderContents.find(item => item.name === 'cumember.md');

      // No profile found
      if (!profileMd) {
        return undefined;
      }

      const profileMdDoc = profileMd?.object?.text;

      const {
        content,
        data: { name, external_profile_url, tags }
      } = matterWrapper(profileMdDoc);

      const metricsMdDoc = metricsMd?.object?.text;
      const { data } = matterWrapper(metricsMdDoc);
      const metricsData = data;

      let cuMember = false;
      if (cuMemberMd) {
        cuMember = true;
      }

      const picture = folderContents.find(item => item.name.indexOf('avatar') !== -1);
      const html = await markdownToHtml(content);
      const vd = {
        voteDelegateAddress,
        name: name,

        // The graphql api unfortunately does not return the download_url or raw url for blobs/images. In this case we have to manually construct the delegate avatar picture url
        // In case the delegate repository gets migrated, reconsider this approach
        picture: picture
          ? `https://github.com/${delegatesRepositoryInfo.owner}/${delegatesRepositoryInfo.repo}/raw/master/${picture.path}`
          : undefined,
        externalUrl: external_profile_url,
        description: html,
        tags,
        combinedParticipation: metricsData.combined_participation,
        pollParticipation: metricsData.poll_participation,
        executiveParticipation: metricsData.exec_participation,
        communication: metricsData.communication,
        cuMember
      };
      return vd;
    });
  const delegatesInfo = await Promise.all(promises);
  return delegatesInfo;
}
export async function fetchGithubDelegates(
  network: SupportedNetworks
): Promise<{ error: boolean; data?: DelegateRepoInformation[] }> {
  const delegatesRepositoryInfo = getDelegatesRepositoryInformation(network);

  const existingDelegates = await cacheGet(delegatesGithubCacheKey, network, ONE_HOUR_IN_MS);

  if (existingDelegates) {
    return Promise.resolve({
      error: false,
      data: JSON.parse(existingDelegates)
    });
  }

  try {
    const allDelegates = await fetchGithubGraphQL(delegatesRepositoryInfo, allGithubDelegates);
    const results = await extractGithubInformationGraphQL(allDelegates, delegatesRepositoryInfo);

    // Filter out negatives
    const data = results.filter(i => !!i) as DelegateRepoInformation[];

    // Store in cache
    cacheSet(delegatesGithubCacheKey, JSON.stringify(data), network, ONE_HOUR_IN_MS);

    return {
      error: false,
      data
    };
  } catch (e) {
    logger.error('fetchGithubDelegates: Error fetching Github delegates ', e.message, 'Network', network);
    return { error: true };
  }
}

export async function fetchGithubDelegate(
  address: string,
  network: SupportedNetworks
): Promise<{ error: boolean; data?: DelegateRepoInformation }> {
  const delegatesRepositoryInfo = getDelegatesRepositoryInformation(network);

  const cacheKey = getDelegateGithubCacheKey(address);
  const existingDelegate = await cacheGet(cacheKey, network, ONE_HOUR_IN_MS);
  if (existingDelegate) {
    return Promise.resolve({
      error: false,
      data: JSON.parse(existingDelegate)
    });
  }

  try {
    // Fetch all folders inside the delegates folder
    const folders = await fetchGitHubPage(
      delegatesRepositoryInfo.owner,
      delegatesRepositoryInfo.repo,
      delegatesRepositoryInfo.page
    );

    const folder = folders.find(f => f.name.toLowerCase() === address.toLowerCase());

    const userInfo = folder
      ? await extractGithubInformation(delegatesRepositoryInfo.owner, delegatesRepositoryInfo.repo, folder)
      : undefined;

    // Store in cache
    if (userInfo) {
      cacheSet(cacheKey, JSON.stringify(userInfo), network, ONE_HOUR_IN_MS);
    }

    return {
      error: false,
      data: userInfo
    };
  } catch (e) {
    logger.error(
      'fetchGithubDelegate: Error fetching Github delegate ',
      address,
      e.message,
      'Network: ',
      network
    );
    return { error: true };
  }
}
