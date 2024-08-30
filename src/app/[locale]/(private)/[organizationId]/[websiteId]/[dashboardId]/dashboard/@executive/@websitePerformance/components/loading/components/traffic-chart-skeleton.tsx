import { Skeleton } from '@mantine/core';

import { BaseCard } from '@/components/ui/base-card';

import areaChartCardClasses from '../../area-chart-card/index.module.css';

export function TrafficChartSkeleton() {
  return (
    <BaseCard
      paperProps={{ classNames: { root: areaChartCardClasses['area-chart-card__root'] } }}
      headerProps={{
        title: <Skeleton height={32} width={180} />,
        children: <Skeleton height={36} circle />
      }}
    >
      <Skeleton height={'80%'} style={{ marginBottom: '20px' }} />
    </BaseCard>
  );
}
