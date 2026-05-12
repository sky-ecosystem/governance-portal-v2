/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import fs from 'fs';
import os from 'os';
import { DEFAULT_NETWORK, SupportedNetworks } from 'modules/web3/constants/networks';
import { config } from 'lib/config';
import Redis from 'ioredis';
import packageJSON from '../../package.json';
import logger from 'lib/logger';
import { ONE_DAY_IN_MS, ONE_HOUR_IN_MS, ONE_WEEK_IN_MS } from 'modules/app/constants/time';
import { executiveProposalsCacheKey } from './constants/cache-keys';

let isConnected = true;

const redis = config.REDIS_URL
  ? new Redis(config.REDIS_URL, {
      connectTimeout: 10000
    })
  : null;

if (redis) {
  redis.on('error', error => {
    logger.error(error.message);
    // TODO: Handle error and find better ways to manage reconnects and redis connection status (TODO: Read ioRedis docs)
    isConnected = false;
  });
}

const redisCacheEnabled = () => {
  const isRedisCache = !!config.REDIS_URL;

  return isRedisCache && redis && isConnected;
};

// Mem cache does not work on local instances of nextjs because nextjs creates clean memory states each time.
const memoryCache = {};

function getFilePath(name: string, network: string, expiryMs?: number): string {
  const date = new Date().toISOString().substring(0, 10);

  return `${os.tmpdir()}/gov-portal-version-${packageJSON.version}-${network}-${name}${
    expiryMs && expiryMs > ONE_DAY_IN_MS ? '' : '-' + date
  }`;
}

export const cacheDel = (name: string, network: SupportedNetworks, expiryMs?: number): void => {
  if (redisCacheEnabled()) {
    // if clearing proposals, we need to find all of them first
    if (name === 'proposals') {
      const deleteProposalKeys = async () => {
        let cursor = '0';
        do {
          const pipeline = (redis as Redis).pipeline();
          const [nextCursor, keys] = await (redis as Redis).scan(
            cursor,
            'MATCH',
            '*proposals*',
            'COUNT',
            '100'
          );

          if (keys.length > 0) {
            logger.debug('cacheDel pattern: *proposals* ', cursor, keys.length);
            pipeline.del(...keys);
          }

          await pipeline.exec();
          cursor = nextCursor;
        } while (cursor !== '0');
      };

      deleteProposalKeys().catch(error => {
        logger.error('Error deleting proposal keys:', error);
      });
    } else {
      // getFilePath appends today's date when expiryMs <= ONE_DAY_IN_MS (or is absent).
      // Callers like the invalidate endpoint don't know each key's original TTL, so
      // delete both variants — the undated key (long-TTL writes) and the dated key
      // (short-TTL writes for today).
      const pathStable = getFilePath(name, network, ONE_WEEK_IN_MS);
      const pathDated = getFilePath(name, network);
      logger.debug('cacheDel redis: ', pathStable, pathDated);
      redis?.del(pathStable, pathDated);
    }
  } else {
    const path = getFilePath(name, network, expiryMs);
    try {
      logger.debug('cacheDel: ', path);
      memoryCache[path] = null;
      fs.unlinkSync(path);
    } catch (e) {
      logger.error(`cacheDel: ${e.message}`);
    }
  }
};

export const getCacheInfo = async (name: string, network: SupportedNetworks): Promise<any> => {
  if (!config.USE_CACHE || config.USE_CACHE === 'false') {
    return Promise.resolve(null);
  }

  try {
    const currentNetwork = network || DEFAULT_NETWORK.network;
    const path = getFilePath(name, currentNetwork);

    if (redisCacheEnabled()) {
      // if fetching proposals cache info, there are likely multiple keys cached due to different query params
      // we'll return the ttl for first proposals key we find
      if (name === executiveProposalsCacheKey) {
        const [, keys] = await (redis as Redis).scan('0', 'MATCH', '*proposals*', 'COUNT', '1');
        if (keys.length > 0) {
          const ttl = await redis?.ttl(keys[0]);
          return ttl;
        }
      } else {
        const ttl = await redis?.ttl(path);
        return ttl;
      }
    }
  } catch (e) {
    logger.error(e);
  }
};

export const cacheGet = async (
  name: string,
  network?: SupportedNetworks,
  expiryMs?: number,
  method: 'GET' | 'HGET' = 'GET',
  field = ''
): Promise<any> => {
  if (!config.USE_CACHE || config.USE_CACHE === 'false') {
    return Promise.resolve(null);
  }

  try {
    const currentNetwork = network || DEFAULT_NETWORK.network;
    const path = getFilePath(name, currentNetwork, expiryMs);

    if (redisCacheEnabled()) {
      // Get redis data if it exists
      const cachedData = method === 'GET' ? await redis?.get(path) : await redis?.hget(path, field);
      logger.debug(`Redis cache get for ${path}`);
      return cachedData || null;
    } else {
      // If fs does not exist as a module, return null (TODO: This shouldn't happen, consider removing this check)
      if (Object.keys(fs).length === 0) return null;
      const memCached = method === 'GET' ? memoryCache[path] : memoryCache[path]?.[field];

      if (memCached) {
        logger.debug(`mem cache hit: ${path}`);

        if (memCached.expiry && memCached.expiry < Date.now()) {
          logger.debug('mem cache expired');
          cacheDel(name, currentNetwork);
          return null;
        }

        return memCached.data;
      }

      if (fs.existsSync(path)) {
        // In nextjs serverless instances of API functions sometimes reset their in memory cache (they are different instances)
        // In order to have an expiry date we can also check the last time this file was accessed or it was created. This conditions having to pass the expiryMs on the cacheGet too
        const { birthtime } = fs.statSync(path);

        if (expiryMs && birthtime && birthtime.getTime() < Date.now() + expiryMs) {
          cacheDel(name, currentNetwork);
          return null;
        }

        logger.debug(`fs cache hit: ${path}`);
        return method === 'GET'
          ? fs.readFileSync(path).toString()
          : JSON.parse(fs.readFileSync(path).toString())[field];
      }
    }
  } catch (e) {
    logger.error(`CacheGet: Error getting cached data, ${name} - ${network}`, e.message);
    return null;
  }
};

export const cacheSet = (
  name: string,
  data: string | { [key: number]: string },
  network?: SupportedNetworks,
  expiryMs = ONE_HOUR_IN_MS,
  method: 'SET' | 'HSET' = 'SET'
): void => {
  if (!config.USE_CACHE || config.USE_CACHE === 'false') {
    return;
  }

  const currentNetwork = network || DEFAULT_NETWORK.network;

  const path = getFilePath(name, currentNetwork, expiryMs);

  try {
    if (redisCacheEnabled()) {
      // If redis cache is enabled, store in redis, with a TTL in seconds
      const expirySeconds = Math.round(expiryMs / 1000);
      logger.debug(`Redis cache set for ${path}, with TTL ${expirySeconds} seconds`);

      if (method === 'HSET' && typeof data !== 'string') {
        redis?.hset(path, data, err => {
          if (!err) {
            redis.expire(path, expirySeconds);
          }
        });
      } else {
        const checkedData = typeof data === 'string' ? data : JSON.stringify(data);
        redis?.set(path, checkedData, 'EX', expirySeconds);
      }
    } else {
      // File cache
      if (Object.keys(fs).length === 0) return;

      const checkedData = typeof data === 'string' ? data : JSON.stringify(data);
      fs.writeFileSync(path, checkedData);

      memoryCache[path] = {
        expiry: expiryMs ? Date.now() + expiryMs : null,
        checkedData
      };
    }
  } catch (e) {
    logger.error(`CacheSet: Error storing data in cache, ${name} - ${network}`, e.message);
  }
};
