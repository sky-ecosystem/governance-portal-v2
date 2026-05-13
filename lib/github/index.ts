/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { Octokit } from '@octokit/core';
import { GraphQlQueryResponseData } from '@octokit/graphql';
import { config } from 'lib/config';
import { RepositoryInfo } from 'modules/delegates/api/getDelegatesRepositoryInfo';

// Handle errors of configuration by disabling oktokit

const token1 = config.GITHUB_TOKEN;
const token2 = config.GITHUB_TOKEN_2 ? config.GITHUB_TOKEN_2 : config.GITHUB_TOKEN;
const token3 = config.GITHUB_TOKEN_3 ? config.GITHUB_TOKEN_3 : config.GITHUB_TOKEN;

let kitIndex = 0;

const octokits: Octokit[] = [];

try {
  octokits[0] = new Octokit({ auth: token1 });
  octokits[1] = new Octokit({ auth: token2 });
  octokits[2] = new Octokit({ auth: token3 });
} catch (e) {
  console.warn(
    'WARNING: GitHub token not configured correctly. Vote delegates and/or executives will not be fetched'
  );
}

export type GithubPage = {
  name: string;
  path: string;
  url: string;
  download_url: string;
  type: string;
};

const getNextToken = () => {
  if (kitIndex >= octokits.length - 1) {
    kitIndex = 0;
  } else {
    kitIndex++;
  }

  return octokits[kitIndex];
};

export async function fetchGitHubPage(owner: string, repo: string, path: string): Promise<GithubPage[]> {
  const octokit = getNextToken();
  const { data } = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    mediaType: {
      format: 'raw'
    },
    owner,
    repo,
    path
  });

  return data as GithubPage[];
}

export async function fetchGithubGraphQL(
  { owner, repo, page }: RepositoryInfo,
  query: string
): Promise<GraphQlQueryResponseData> {
  const octokit = getNextToken();
  const data = await octokit.graphql(query, { owner, name: repo, expression: `master:${page}` });

  return data as GraphQlQueryResponseData;
}
