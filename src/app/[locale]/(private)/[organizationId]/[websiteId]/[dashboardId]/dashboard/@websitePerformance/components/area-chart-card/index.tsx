import { Text } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { AreaChart } from '@/components/charts/area-chart';
import { CustomAreaChartProps } from '@/components/charts/area-chart/types';
import { BaseCard } from '@/components/ui/base-card';

import classes from './index.module.css';

export function AreaChartCard({ ...props }: Readonly<CustomAreaChartProps>) {
  const t = useTranslations('dashboard.overview.activityCard.trafficCard');

  return (
    <BaseCard
      paperProps={{ classNames: { root: classes['area-chart-card__root'] } }}
      headerProps={{
        title: (
          <Text fz="stat3" lh="body2">
            {t('title')}
          </Text>
        )
      }}
    >
      <AreaChart {...props} />
    </BaseCard>
  );
}
