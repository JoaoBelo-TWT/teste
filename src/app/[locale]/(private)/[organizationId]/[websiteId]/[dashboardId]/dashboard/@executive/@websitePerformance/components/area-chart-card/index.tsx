import { Box, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { AreaChart } from '@/components/charts/area-chart';
import { CustomAreaChartProps } from '@/components/charts/area-chart/types';
import { BaseCard } from '@/components/ui/base-card';
import { useNavigationStore } from '@/context/navigation/store';
import { SPACING } from '@/resources/constants';

import classes from './index.module.css';

export function AreaChartCard({ ...props }: Readonly<CustomAreaChartProps>) {
  const t = useTranslations('dashboard.overview.activityCard.trafficCard');
  const { filters } = useNavigationStore();
  const { timeframe } = filters;

  return (
    <BaseCard
      paperProps={{ classNames: { root: classes['area-chart-card__root'] } }}
      headerProps={{
        title: (
          <Box mb={SPACING.md}>
            <Text fz="stat3" lh="body2">
              {t('title')}
            </Text>
            {timeframe && (
              <Text fz={14} c="dark.7">
                {timeframe?.replace(/([a-z])([A-Z])/g, '$1 $2')}
              </Text>
            )}
          </Box>
        )
      }}
    >
      <AreaChart {...props} />
    </BaseCard>
  );
}
