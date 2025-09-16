/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { NextApiRequest, NextApiResponse } from 'next';
import withApiHandler from 'modules/app/api/withApiHandler';
import { config } from 'lib/config';
import logger from 'lib/logger';

type RateLimitInfo = {
  limit: number;
  used: number;
  remaining: number;
  reset: number;
} | null;

type TokenStatus = {
  rateLimit: RateLimitInfo;
  error?: string;
  configured: boolean;
};

async function getRateLimit(token: string, tokenName: string): Promise<TokenStatus> {
  if (!token) {
    return {
      rateLimit: null,
      error: 'Token not configured',
      configured: false
    };
  }

  try {
    const resp = await fetch('https://api.github.com/rate_limit', {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json'
      }
    });

    if (!resp.ok) {
      const errorBody = await resp.text();
      let errorMessage = `HTTP ${resp.status}: ${resp.statusText}`;

      try {
        const errorJson = JSON.parse(errorBody);
        errorMessage = errorJson.message || errorMessage;
      } catch {
        errorMessage = errorBody || errorMessage;
      }

      logger.error(`GitHub API rate limit check failed for ${tokenName}:`, errorMessage);

      if (resp.status === 401) {
        return {
          rateLimit: null,
          error: 'Invalid or expired token',
          configured: true
        };
      } else if (resp.status === 403) {
        return {
          rateLimit: null,
          error: 'Token lacks required permissions or rate limited',
          configured: true
        };
      }

      return {
        rateLimit: null,
        error: errorMessage,
        configured: true
      };
    }

    const info = await resp.json();

    if (!info?.rate) {
      logger.error(`Unexpected GitHub API response format for ${tokenName}:`, info);
      return {
        rateLimit: null,
        error: 'Invalid response format from GitHub API',
        configured: true
      };
    }

    return {
      rateLimit: {
        limit: info.rate.limit,
        used: info.rate.used,
        remaining: info.rate.remaining,
        reset: info.rate.reset
      },
      configured: true
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Failed to check rate limit for ${tokenName}:`, errorMessage);

    if (errorMessage.includes('ECONNREFUSED') || errorMessage.includes('ETIMEDOUT')) {
      return {
        rateLimit: null,
        error: 'Network connectivity issue',
        configured: true
      };
    }

    return {
      rateLimit: null,
      error: `Failed to fetch rate limit: ${errorMessage}`,
      configured: true
    };
  }
}

export default withApiHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const [token1Status, token2Status, token3Status] = await Promise.allSettled([
      getRateLimit(config.GITHUB_TOKEN, 'GITHUB_TOKEN'),
      getRateLimit(config.GITHUB_TOKEN_2 || config.GITHUB_TOKEN, 'GITHUB_TOKEN_2'),
      getRateLimit(config.GITHUB_TOKEN_3 || config.GITHUB_TOKEN, 'GITHUB_TOKEN_3')
    ]);

    const getResult = (result: PromiseSettledResult<TokenStatus>): TokenStatus => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        logger.error('Promise rejection in getRateLimit:', result.reason);
        return {
          rateLimit: null,
          error: `Unexpected error: ${result.reason?.message || result.reason}`,
          configured: false
        };
      }
    };

    const response = {
      tokens: {
        1: getResult(token1Status),
        2: getResult(token2Status),
        3: getResult(token3Status)
      },
      summary: {
        totalConfigured: [token1Status, token2Status, token3Status].filter(
          r => r.status === 'fulfilled' && r.value.configured
        ).length,
        totalWorking: [token1Status, token2Status, token3Status].filter(
          r => r.status === 'fulfilled' && r.value.rateLimit !== null
        ).length,
        hasAnyWorkingToken: [token1Status, token2Status, token3Status].some(
          r => r.status === 'fulfilled' && r.value.rateLimit !== null
        )
      }
    };

    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate');
    res.status(200).json(response);
  } catch (error) {
    logger.error('Unexpected error in github-tokens endpoint:', error);
    throw error;
  }
});
