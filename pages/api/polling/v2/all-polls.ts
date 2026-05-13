/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { NextApiRequest, NextApiResponse } from 'next';
import { getPollsPaginated } from 'modules/polling/api/fetchPolls';
import withApiHandler from 'modules/app/api/withApiHandler';
import { DEFAULT_NETWORK, SupportedNetworks } from 'modules/web3/constants/networks';
import validateQueryParam from 'modules/app/api/validateQueryParam';
import { PollInputFormat, PollOrderByEnum, PollStatusEnum } from 'modules/polling/polling.constants';
import { PollsPaginatedResponse } from 'modules/polling/types/pollsResponse';

/**
 * @swagger
 * paths:
 *  /api/polling/v2/all-polls:
 *    get:
 *      tags:
 *        - "polls"
 *      description: Returns a paginated list of polls according to the specified filters and sorting.
 *      summary: Returns a paginated list of polls
 *      produces:
 *        - "application/json"
 *      parameters:
 *        - name: network
 *          in: query
 *          description: The network to query the polls for. Defaults to mainnet.
 *          schema:
 *            type: string
 *            enum: [tenderly, mainnet]
 *          default: "mainnet"
 *        - name: pageSize
 *          in: query
 *          description: The number of polls to return per page. Defaults to 20.
 *          schema:
 *            type: integer
 *            minimum: 1
 *            maximum: 30
 *          default: 20
 *        - name: page
 *          in: query
 *          description: The page number to return. Defaults to 1
 *          schema:
 *            type: integer
 *            minimum: 1
 *          default: 1
 *        - name: title
 *          in: query
 *          description: The title or portion of the title to filters the polls for.
 *          schema:
 *            type: string
 *        - name: orderBy
 *          in: query
 *          description: The sorting criteria used to order the polls returned. Defaults to NEAREST_END
 *          schema:
 *            type: string
 *            enum: [NEAREST_END, FURTHEST_END, NEAREST_START, FURTHEST_START]
 *          default: "NEAREST_END"
 *        - name: tags
 *          in: query
 *          description: The tags to filter the polls by.
 *          schema:
 *            type: array
 *            items:
 *              type: string
 *        - name: status
 *          in: query
 *          description: The status the poll is in. Whether active or ended.
 *          schema:
 *            type: string
 *            enum: [ACTIVE, ENDED]
 *        - name: type
 *          in: query
 *          description: The input format type of the poll.
 *          schema:
 *            type: string
 *            enum: [single-choice, rank-free, choose-free]
 *        - name: startDate
 *          in: query
 *          description: Minimum start date of the polls returned.
 *          schema:
 *            type: string
 *            format: date-time
 *        - name: endDate
 *          in: query
 *          description: Maximum end date of the polls returned
 *          schema:
 *            type: string
 *            format: date-time
 *      responses:
 *        200:
 *          description: A paginated list of polls matching the specified filters and sorting.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/PollsPaginatedResponse'
 * components:
 *  schemas:
 *    Tag:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        shortname:
 *          type: string
 *        longname:
 *          type: string
 *        description:
 *          type: string
 *        recommend_ui:
 *          type: boolean
 *        related_link:
 *          type: string
 *        precedence:
 *          type: integer
 *        required:
 *          - id
 *          - shortname
 *          - longname
 *    TagCount:
 *      allOf:
 *        - #ref: '#/components/schemas/Tag'
 *        - type: object
 *          properties:
 *            count:
 *              type: integer
 *          required:
 *            -count
 *    PollListItem:
 *      type: object
 *      properties:
 *        pollId:
 *          type: number
 *        startDate:
 *          type: string
 *          format: date-time
 *        endDate:
 *          type: string
 *          format: date-time
 *        slug:
 *          type: string
 *        title:
 *          type: string
 *        summary:
 *          type: string
 *        options:
 *          type: array
 *          items:
 *            type: string
 *        type:
 *          type: string
 *          enum:
 *            - single-choice
 *            - rank-free
 *            - choose-free
 *        tags:
 *          type: array
 *          items:
 *            type: string
 *    PollsPaginatedResponse:
 *      type: object
 *      properties:
 *        paginationInfo:
 *          type: object
 *          properties:
 *            totalCount:
 *              type: number
 *            page:
 *              type: number
 *            numPages:
 *              type: number
 *            hasNextPage:
 *              type: boolean
 *        stats:
 *          type: object
 *          properties:
 *            active:
 *              type: number
 *            finished:
 *              type: number
 *            total:
 *              type: number
 *        polls:
 *          $ref: '#/components/schemas/PollListItem'
 *        tags:
 *          type: array
 *          items:
 *            #ref: '#/components/schemas/TagCount'
 */

export default withApiHandler(async (req: NextApiRequest, res: NextApiResponse<PollsPaginatedResponse>) => {
  const network = validateQueryParam(req.query.network, 'string', {
    defaultValue: DEFAULT_NETWORK.network,
    validValues: [SupportedNetworks.TENDERLY, SupportedNetworks.MAINNET]
  }) as SupportedNetworks;

  const pageSize = validateQueryParam(req.query.pageSize, 'number', {
    defaultValue: 20,
    minValue: 1,
    maxValue: 30
  }) as number;

  const page = validateQueryParam(req.query.page, 'number', {
    defaultValue: 1,
    minValue: 1
  }) as number;

  const title = validateQueryParam(req.query.title, 'string', {
    defaultValue: null
  }) as string | null;

  const orderBy = validateQueryParam(req.query.orderBy, 'string', {
    defaultValue: PollOrderByEnum.nearestEnd,
    validValues: [
      PollOrderByEnum.nearestEnd,
      PollOrderByEnum.furthestEnd,
      PollOrderByEnum.nearestStart,
      PollOrderByEnum.furthestStart
    ]
  }) as PollOrderByEnum;

  const tags = validateQueryParam(req.query.tags, 'array', {
    defaultValue: null
  }) as string[] | null;

  const status = validateQueryParam(req.query.status, 'string', {
    defaultValue: null,
    validValues: [PollStatusEnum.active, PollStatusEnum.ended]
  }) as PollStatusEnum | null;

  const type =
    ((
      validateQueryParam(req.query.type, 'array', {
        defaultValue: null
      }) as string[] | null
    )
      ?.map(t =>
        validateQueryParam(t, 'string', {
          defaultValue: null,
          validValues: [PollInputFormat.singleChoice, PollInputFormat.rankFree, PollInputFormat.chooseFree]
        })
      )
      .filter(t => !!t) as PollInputFormat[] | undefined) || null;

  const startDate = validateQueryParam(req.query.startDate, 'date', {
    defaultValue: null
  }) as Date | null;

  const endDate = validateQueryParam(req.query.endDate, 'date', {
    defaultValue: null
  }) as Date | null;

  const pollsResponse = await getPollsPaginated({
    network,
    pageSize,
    page,
    title,
    orderBy,
    tags,
    status,
    type,
    startDate,
    endDate
  });

  res.setHeader('Cache-Control', 's-maxage=15, stale-while-revalidate');
  res.status(200).json(pollsResponse);
});
