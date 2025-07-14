/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import React, { useState } from 'react';
import { Heading, Text, Box, Button, Flex, Input, Label } from 'theme-ui';
import Icon from 'modules/app/components/Icon';
import { useBreakpointIndex } from '@theme-ui/match-media';
import PrimaryLayout from 'modules/app/components/layout/layouts/Primary';
import SidebarLayout from 'modules/app/components/layout/layouts/Sidebar';
import Stack from 'modules/app/components/layout/layouts/Stack';
import Tabs from 'modules/app/components/Tabs';
import PollCreateModal from 'modules/polling/components/PollCreateModal';
import SystemStatsSidebar from 'modules/app/components/SystemStatsSidebar';
import ResourceBox from 'modules/app/components/ResourceBox';
import { validatePollFromRawURL } from 'modules/polling/helpers/validator';
import { Poll } from 'modules/polling/types';
import Hash from 'ipfs-only-hash';
import { formatDateWithTime } from 'lib/datetime';
import { markdownToHtml } from 'lib/markdown';
import { HeadComponent } from 'modules/app/components/layout/Head';
import { useAccount } from 'modules/app/hooks/useAccount';
import { InternalLink } from 'modules/app/components/InternalLink';
import { ExternalLink } from 'modules/app/components/ExternalLink';
import { PollMarkdownEditor } from 'modules/polling/components/PollMarkdownEditor';
import { config } from 'lib/config';

const generateIPFSHash = async (data, options) => {
  // options object has the key encoding which defines the encoding type
  // of the data string that has been passed in
  const bufferData = Buffer.from(data, options.encoding || 'ascii');
  const hash = await Hash.of(bufferData);
  return hash;
};

const editMarkdown = (content, title) => {
  //replace title from markdown content with the title in the frontmatter
  return content.replace(/^<h1>.*<\/h1>|^<h2>.*<\/h2>/, `<h2>${title}</h2>`);
};

const CreateText = ({ children }) => {
  return (
    <Box
      mb={3}
      sx={{
        width: '100%',
        border: '1px solid',
        borderColor: 'secondary',
        borderRadius: 'small',
        minHeight: '42px',
        padding: 2
      }}
    >
      {children}
    </Box>
  );
};
const PollingCreate = (): React.ReactElement => {
  const bpi = useBreakpointIndex();
  const [loading, setLoading] = useState(false);
  const [pollUrl, setPollUrl] = useState('');
  const [poll, setPoll] = useState<Poll | undefined>();
  const [pollErrors, setPollErrors] = useState<string[]>([]);
  const [contentHtml, setContentHtml] = useState<string>('');
  const [creating, setCreating] = useState(false);
  const { account } = useAccount();

  const resetForm = () => {
    setPoll(undefined);
    setContentHtml('');
  };
  const urlValidation = async url => {
    setLoading(true);
    resetForm();

    try {
      const result = await validatePollFromRawURL(url, {
        pollId: 0,
        multiHash: '',
        slug: '',
        startDate: new Date(0),
        endDate: new Date(0),
        url: pollUrl
      });
      if (result.valid) {
        const poll = result.parsedData;
        if (poll) {
          poll.multiHash = await generateIPFSHash(result.wholeDoc, {});
          poll.slug = poll.multiHash.slice(0, 8);
        }
        setPoll(poll);
        setPollErrors([]);
        if (poll) setContentHtml(await markdownToHtml(poll.content));
      } else {
        setPollErrors(result.errors);
      }
      setLoading(false);
    } catch (e) {
      setPollErrors(['Error loading poll data']);
      setLoading(false);
    }
  };

  return (
    <PrimaryLayout sx={{ maxWidth: 'dashboard' }}>
      <HeadComponent title="Create Poll" />

      <Stack gap={3}>
        <Heading mb={2} as="h4">
          Create Poll
        </Heading>
        <SidebarLayout>
          <Box>
            <Stack gap={2}>
              <InternalLink href={'/polling'} title="View polling page">
                <Button variant="mutedOutline" sx={{ width: 'max-content' }}>
                  <Icon name="chevron_left" sx={{ size: 2, mr: 2 }} />
                  Back to All Polls
                </Button>
              </InternalLink>
              <Stack gap={3}>
                <Tabs
                  tabListStyles={{ pl: [3, 4] }}
                  tabTitles={['Poll Creator', 'Poll Markdown Checker']}
                  tabPanels={[
                    <Box key={0} sx={{ p: [3, 4] }}>
                      <Box>
                        <Label htmlFor="url">URL</Label>
                        <Flex sx={{ flexDirection: 'row' }}>
                          <Input name="url" mb={3} onChange={e => setPollUrl(e.target.value)} />
                          <Button
                            variant="smallOutline"
                            onClick={() => urlValidation(pollUrl)}
                            sx={{ height: '42px', width: '80px', ml: 3 }}
                          >
                            {loading ? 'Loading...' : 'Validate'}
                          </Button>
                        </Flex>
                      </Box>
                      <Text color="red" sx={{ display: pollErrors?.length > 0 ? 'inherit' : 'none' }}>
                        Errors: {pollErrors.join(', ')}
                      </Text>
                      <Label>MultiHash</Label>
                      <CreateText>{poll?.multiHash}</CreateText>
                      <Label>Slug</Label>
                      <CreateText>{poll?.slug}</CreateText>
                      <Label>Title</Label>
                      <CreateText>{poll?.title}</CreateText>
                      <Label>Summary</Label>
                      <CreateText>{poll?.summary}</CreateText>
                      <Label>Vote Options</Label>
                      <CreateText>
                        {poll &&
                          Object.keys(poll.options).map((option, i) => (
                            <Text key={i}>{`${option}: ${poll.options[option]}`}</Text>
                          ))}
                      </CreateText>
                      <Label>Input Format</Label>
                      <CreateText>{poll?.parameters.inputFormat.type}</CreateText>
                      <Label>Abstain Options</Label>
                      <CreateText>{poll?.parameters.inputFormat.abstain}</CreateText>
                      <Label>Victory Conditions</Label>
                      <CreateText>
                        {poll?.parameters.victoryConditions.map(v => (
                          <Box key={`victory-condition-${v.type}`}>{JSON.stringify(v)}</Box>
                        ))}
                      </CreateText>
                      <Label>Result Display</Label>
                      <CreateText>{poll?.parameters.resultDisplay}</CreateText>
                      <Label>Category</Label>
                      <CreateText>{poll?.tags.map(t => t.longname).join(', ')}</CreateText>
                      <Label>Poll Start Time</Label>
                      <CreateText>{poll && formatDateWithTime(poll.startDate)}</CreateText>
                      <Label>Poll End Time</Label>
                      <CreateText>{poll && formatDateWithTime(poll.endDate)}</CreateText>
                      <Label>Poll Duration</Label>
                      <CreateText>
                        {poll &&
                          `${
                            (new Date(poll.endDate).getTime() - new Date(poll.startDate).getTime()) / 86400000
                          } days`}
                      </CreateText>
                      <Label>Discussion Link</Label>
                      {poll && poll.discussionLink ? (
                        <ExternalLink href={poll.discussionLink} styles={{ p: 0 }} title="View discussion">
                          <CreateText>{poll && poll.discussionLink}</CreateText>
                        </ExternalLink>
                      ) : (
                        <CreateText> </CreateText>
                      )}
                      <Label>Proposal</Label>
                      <CreateText>
                        <Box
                          sx={{ variant: 'markdown.default', p: [3, 4] }}
                          dangerouslySetInnerHTML={{ __html: editMarkdown(contentHtml, poll?.title) }}
                        />
                      </CreateText>
                      <Flex>
                        <Button
                          variant="primary"
                          data-testid="button-create-poll"
                          onClick={() => setCreating(true)}
                          disabled={
                            typeof poll === 'undefined' ||
                            pollErrors.length > 0 ||
                            !account ||
                            config.READ_ONLY
                          }
                        >
                          Create Poll
                        </Button>
                        <Button variant="outline" sx={{ ml: 4 }} onClick={() => resetForm()}>
                          Reset Form
                        </Button>
                      </Flex>
                    </Box>,
                    <Box key={1} sx={{ p: [3, 4] }}>
                      <PollMarkdownEditor />
                    </Box>
                  ]}
                />
                {creating && (
                  <PollCreateModal close={() => setCreating(false)} poll={poll} setPoll={setPoll} />
                )}
              </Stack>
            </Stack>
          </Box>
          {bpi >= 3 && (
            <Stack gap={3}>
              <SystemStatsSidebar
                fields={['chief contract', 'mkr in chief', 'savings rate', 'total dai', 'debt ceiling']}
              />
              <ResourceBox type={'general'} />
            </Stack>
          )}
        </SidebarLayout>
      </Stack>
    </PrimaryLayout>
  );
};

export default PollingCreate;
