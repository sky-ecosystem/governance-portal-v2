/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import TagComponent from 'modules/app/components/Tag';
import useUiFiltersStore from 'modules/app/stores/uiFilters';
import shallow from 'zustand/shallow';
import { Tag, TagCount } from 'modules/app/types/tag';
import { Box } from 'theme-ui';
import pollTagsDefinitions from 'modules/tags/constants/poll-tags-definitions.json';

export function PollCategoryTag({
  tag,
  allTags,
  disableTagFilter = false
}: {
  tag: string | Tag;
  allTags?: TagCount[];
  disableTagFilter?: boolean;
}): React.ReactElement {
  let foundTag = allTags?.find(t => t.id === tag);
  
  // If not found in allTags, look it up in poll-tags-definitions.json
  if (!foundTag && typeof tag === 'string') {
    const tagDefinition = pollTagsDefinitions.find(t => t.id === tag);
    if (tagDefinition) {
      foundTag = {
        id: tagDefinition.id,
        shortname: tagDefinition.shortname,
        longname: tagDefinition.longname,
        description: tagDefinition.description,
        related_link: tagDefinition.related_link,
        recommend_ui: tagDefinition.recommend_ui,
        precedence: tagDefinition.precedence,
        count: 0
      } as TagCount;
    }
  }
  
  // Fallback to tag as TagCount if still not found
  if (!foundTag && typeof tag === 'object') {
    foundTag = { ...tag, count: 0 } as TagCount;
  }

  const [categoryFilter, setCategoryFilter] = useUiFiltersStore(
    state => [state.pollFilters.categoryFilter, state.setCategoryFilter],
    shallow
  );

  const categories = {
    'collateral-onboard': {
      color: 'tagColorOne',
      backgroundColor: 'tagColorOneBg'
    },
    oracle: {
      color: 'tagColorTwo',
      backgroundColor: 'tagColorTwoBg'
    },
    'oracle-whitelist': {
      color: 'tagColorTwo',
      backgroundColor: 'tagColorTwoBg'
    },
    'oracle-feed': {
      color: 'tagColorTwo',
      backgroundColor: 'tagColorTwoBg'
    },
    ratification: {
      color: 'tagColorThree',
      backgroundColor: 'tagColorThreeBg'
    },
    inclusion: {
      color: 'tagColorThree',
      backgroundColor: 'tagColorThreeBg'
    },
    'real-world-assets': {
      color: 'tagColorFour',
      backgroundColor: 'tagColorFourBg'
    },
    'risk-parameter': {
      color: 'tagColorFive',
      backgroundColor: 'tagColorFiveBg'
    },
    technical: {
      color: 'tagColorSix',
      backgroundColor: 'tagColorSixBg'
    },
    'misc-governance': {
      color: 'tagColorSeven',
      backgroundColor: 'tagColorSevenBg'
    },
    delegates: {
      color: 'tagColorEight',
      backgroundColor: 'tagColorEightBg'
    },
    mips: {
      color: 'tagColorEight',
      backgroundColor: 'tagColorEightBg'
    },
    budget: {
      color: 'tagColorNine',
      backgroundColor: 'tagColorNineBg'
    },
    auctions: {
      color: 'tagColorTen',
      backgroundColor: 'tagColorTenBg'
    },
    greenlight: {
      color: 'tagColorEleven',
      backgroundColor: 'tagColorElevenBg'
    },
    d3m: {
      color: 'tagColorTwelve',
      backgroundColor: 'tagColorTwelveBg'
    },
    'misc-funding': {
      color: 'tagColorThirteen',
      backgroundColor: 'tagColorThirteenBg'
    },
    'core-unit-onboard': {
      color: 'tagColorFourteen',
      backgroundColor: 'tagColorFourteenBg'
    },

    'mcd-launch': {
      color: 'tagColorFifteen',
      backgroundColor: 'tagColorFifteenBg'
    },

    'collateral-offboard': {
      color: 'tagColorSixteen',
      backgroundColor: 'tagColorSixteenBg'
    },
    surplus: {
      color: 'tagColorSeventeen',
      backgroundColor: 'tagColorSeventeenBg'
    },
    dsr: {
      color: 'tagColorSeventeen',
      backgroundColor: 'tagColorSeventeenBg'
    },
    momc: {
      color: 'tagColorSeventeen',
      backgroundColor: 'tagColorSeventeenBg'
    },
    psm: {
      color: 'tagColorEleven',
      backgroundColor: 'tagColorElevenBg'
    },
    'black-thursday': {
      color: 'black',
      backgroundColor: '#00000014'
    },
    bridge: {
      color: 'tagColorThirteen',
      backgroundColor: 'tagColorThirteenBg'
    }
  };

  return foundTag ? (
    <Box
      sx={{
        cursor: !disableTagFilter ? 'pointer' : 'inherit'
      }}
      onClick={() => {
        if (!disableTagFilter) {
          setCategoryFilter(
            categoryFilter.includes(foundTag.id)
              ? categoryFilter.filter(c => c !== foundTag.id)
              : [...categoryFilter, foundTag.id]
          );
        }
      }}
      title={`See all ${foundTag.id} polls`}
    >
      <TagComponent
        tag={foundTag}
        color={
          foundTag.id
            ? categories[foundTag.id]?.color
            : tag
            ? categories[tag as string]?.color
            : 'tagColorOne'
        }
        backgroundColor={
          foundTag.id
            ? categories[foundTag.id]?.backgroundColor
            : tag
            ? categories[tag as string]?.backgroundColor
            : 'tagColorOneBg'
        }
      />
    </Box>
  ) : (
    <></>
  );
}
