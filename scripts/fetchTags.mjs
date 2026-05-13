/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import fetch from 'node-fetch';

import fs from 'fs';

// Fetch and write information from the community repo, during build time, to be used by the gov portal
async function main() {
  try {
    console.log('Downloading tags information from the community repo.');

    // poll-tags mapping
    const urlPollTags =
      'https://raw.githubusercontent.com/makerdao/community/master/governance/polls/meta/poll-tags.json';
    const pollTags = await fetch(urlPollTags);
    const dataPollTags = await pollTags.json();
    fs.writeFileSync(
      './modules/tags/constants/poll-tags-mapping.json',
      JSON.stringify(dataPollTags, null, 2)
    );

    console.log('Downloaded poll-tags mapping.');

    //poll tags
    const urlTags =
      'https://raw.githubusercontent.com/makerdao/community/master/governance/polls/meta/tags.json';
    const tags = await fetch(urlTags);
    const dataTags = await tags.json();
    fs.writeFileSync(
      './modules/tags/constants/poll-tags-definitions.json',
      JSON.stringify(dataTags, null, 2)
    );

    console.log('Downloaded poll tags.');
  } catch (e) {
    console.error('Error downloading info from the community repo', e.message);
  }
}

main();
