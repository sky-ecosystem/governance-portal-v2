/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { useEffect, useRef, useState } from 'react';
import { Box } from 'theme-ui';
import { select } from 'd3-selection';
import { pack, hierarchy } from 'd3-hierarchy';
import { useRouter } from 'next/router';
import { cutMiddle } from 'lib/string';
import { SkyPollDetailResponse } from 'pages/api/sky/polls/[poll-id-or-slug]';
import { SkyPollTallyResponse } from 'pages/api/sky/polls/tally/[poll-id]';
import { getVoteColor } from 'modules/polling/helpers/getVoteColor';
import { PollInputFormat, PollResultDisplay } from 'modules/polling/polling.constants';
import { PollParameters } from 'modules/polling/types';

type CircleProps = {
  poll: SkyPollDetailResponse;
  tally: SkyPollTallyResponse;
  diameter: number;
};

export const CirclesSvg = ({ poll, tally, diameter }: CircleProps): JSX.Element => {
  if (!poll || !tally || !diameter) return <Box>Loading</Box>;
  const ref = useRef<SVGSVGElement>(null);
  const router = useRouter();

  const data = {
    title: 'votes',
    children: tally.votesByAddress
  };

  const handleVoterClick = event => {
    const address = event.target.__data__.data.voter;
    router.push({ pathname: `/address/${address}` });
  };

  useEffect(() => {
    const svgElement = select(ref.current);
    svgElement.selectAll('*').remove();

    const width = diameter;
    const height = diameter;

    svgElement
      .attr('width', width)
      .attr('height', height)
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('class', 'bubble');

    const bubble = pack().size([diameter, diameter]).padding(1);

    const nodes = hierarchy(data).sum(function (d) {
      return Number(d.skySupport);
    });

    const node = svgElement
      .selectAll('.node')
      .data(bubble(nodes).descendants())
      .enter()
      .filter(function (d) {
        return d.children == null;
      })
      .append('g')
      .attr('class', 'node')
      .attr('transform', function (d) {
        return `translate(${d.x},${d.y})`;
      });

    node.append('title').text(d => {
      return d.data.voter;
    });

    node
      .append('circle')
      .attr('r', function (d) {
        return d.r;
      })
      .style('fill', d => {
        // Convert poll parameters for compatibility with getVoteColor
        const pollParameters: PollParameters = {
          inputFormat: {
            type: (poll.parameters?.inputFormat?.type || 'single-choice') as PollInputFormat,
            abstain: poll.parameters?.inputFormat?.abstain || [0],
            options: poll.parameters?.inputFormat?.options || []
          },
          resultDisplay: (poll.parameters?.resultDisplay || 'single-vote-breakdown') as PollResultDisplay,
          victoryConditions: poll.parameters?.victoryConditions || []
        };
        return getVoteColor(d.data.ballot[0], pollParameters, true);
      })
      .style('cursor', 'pointer')
      .on('click', handleVoterClick);

    node
      .append('text')
      .attr('dy', '.2em')
      .style('text-anchor', 'middle')
      .text(function (d) {
        return cutMiddle(d.data.voter);
      })
      .attr('font-size', function (d) {
        return d.r / 4.5;
      })
      .attr('fill', '#FFF')
      .style('cursor', 'pointer')
      .on('click', handleVoterClick);

    select(self.frameElement).style('height', `${diameter}px`);
  }, [tally, diameter, poll]);

  return (
    <Box>
      <svg ref={ref} />
    </Box>
  );
};

type Props = {
  poll: SkyPollDetailResponse;
  tally: SkyPollTallyResponse;
};

const SkyVoteWeightVisual = ({ poll, tally }: Props): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(500);

  useEffect(() => {
    setWidth(ref.current ? ref.current.offsetWidth : 300);
  }, [ref.current]);

  return (
    <div ref={ref}>
      <CirclesSvg diameter={width} poll={poll} tally={tally} />
    </div>
  );
};

export default SkyVoteWeightVisual;
