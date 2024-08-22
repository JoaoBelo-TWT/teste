import { Skeleton } from '@mantine/core';

import { BaseCard } from '@/components/ui/base-card';

import customerJourneyClasses from '../customer-journey/index.module.css';

import { FunnelChartSkeleton } from './components/funnel-chart-skeleton';

export function CustomerJourneySkeleton() {
  return (
    <BaseCard
      headerProps={{
        title: <Skeleton height={32} width={350} />,
        children: <Skeleton height={32} width={150} radius={'xl'} />
      }}
    >
      <div className={customerJourneyClasses['customer-journey__container']}>
        <FunnelChartSkeleton />
        <FunnelChartSkeleton />
      </div>
    </BaseCard>
  );
}
