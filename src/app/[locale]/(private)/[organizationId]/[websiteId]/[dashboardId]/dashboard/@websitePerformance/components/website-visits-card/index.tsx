'use client';

import { Box, Flex, Text } from '@mantine/core';
import { useTranslations, useFormatter } from 'next-intl';

import { BaseCard } from '@/components/ui/base-card';
import { useNavigationStore } from '@/context/navigation/store';
import { formatNumber } from '@/utils/formatters/numbers';

import classes from './index.module.css';

export function WebsiteVisitsCard({ visits }: { visits: number }) {
  const t = useTranslations('dashboard.overview.activityCard.websiteVisitsCard');
  const { filters } = useNavigationStore();
  const { timeframe } = filters;
  const format = useFormatter();

  return (
    <BaseCard
      headerProps={{
        title: (
          <Text fz="stat3" lh="body2">
            {t('title')}
          </Text>
        )
      }}
      paperProps={{ classNames: { root: classes['website-visits-card__card-root'] } }}
    >
      <Flex flex={1} h={'100%'} direction="column" justify="space-between">
        {timeframe && (
          <Text fz={14} c="dark.7">
            {timeframe?.replace(/([a-z])([A-Z])/g, '$1 $2')}
          </Text>
        )}
        <Box>
          <Text fz={24}>
            {formatNumber({
              value: visits || 0,
              nextIntlFormatter: format,
              options: { notation: 'compact' }
            })}
          </Text>
          <Text fz={12} c="dark.7">
            {t('visits')}
          </Text>
        </Box>
      </Flex>
    </BaseCard>
  );
}
