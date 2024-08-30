import { Skeleton } from '@mantine/core';

import funnelChartClasses from '@/components/charts/funnel-chart/index.module.css';

export function FunnelChartSkeleton() {
  return (
    <div className={funnelChartClasses['funnel-chart__container']}>
      <div className={funnelChartClasses['funnel-chart__header']}>
        <Skeleton height={32} width={250} />
        <div className={funnelChartClasses['funnel-chart__events']}>
          <Skeleton height={16} width={100} />
          <Skeleton height={32} width={200} radius={'xl'} />
        </div>
      </div>
      <Skeleton height={'75%'} width={'100%'} radius={'md'} />
    </div>
  );
}
