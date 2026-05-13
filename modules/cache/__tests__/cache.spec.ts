/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import fs from 'fs';
import { config } from '../../../lib/config';
import os from 'os';

import packageJSON from '../../../package.json';
import { cacheSet } from '../cache';
import { vi } from 'vitest';

vi.mock('lib/config');

const cacheFile = `/${os.tmpdir()}/gov-portal-version-${packageJSON.version}-mainnet-test-${new Date()
  .toISOString()
  .substring(0, 10)}`;

describe('Cache', () => {
  beforeAll(() => {
    config.USE_CACHE = 'true';
    config.REDIS_URL = '';
  });

  afterAll(() => {
    config.USE_CACHE = '';
    if (fs.existsSync(cacheFile)) fs.unlinkSync(cacheFile);
  });

  test('cacheSet creates a file', async () => {
    await cacheSet('test', 'test');
    expect(fs.existsSync(cacheFile)).toBe(true);
  });
});
