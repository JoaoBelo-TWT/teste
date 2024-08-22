'use client';

import { Box, SimpleGrid } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { Overlay } from '@/components/ui/overlay';
import { SPACING } from '@/resources/constants';

import { FiguresCard } from '../../dashboard/@campaignPerformance/components/figures-card';
import { FiguresCardProps } from '../../dashboard/@campaignPerformance/components/figures-card/types';

import { mockSources } from './mock';

export function DetailSources({ sources }: { sources: FiguresCardProps[] }) {
  const t = useTranslations();
  const cards = useMemo(
    () =>
      (sources.length ? sources : mockSources).map((source) => (
        <FiguresCard
          key={source.title}
          title={source.title}
          urlSourcesImages={source.urlSourcesImages?.slice(0, 4) ?? []}
          additionalAvatars={Math.max(source.urlSourcesImages.length - 4, 0)}
          data={source.data}
        />
      )),
    [sources]
  );
  return (
    /* eslint-disable i18next/no-literal-string */
    <Box pos={'relative'}>
      {!sources.length && <Overlay title={t('common.noDataSimple')} />}

      <SimpleGrid
        mt={SPACING.lg}
        cols={{ base: 1, sm: 2 }}
        spacing={{ base: 8, md: 16 }}
        verticalSpacing={{ base: 8, md: 16 }}
      >
        {cards}
      </SimpleGrid>
    </Box>
  );
}
