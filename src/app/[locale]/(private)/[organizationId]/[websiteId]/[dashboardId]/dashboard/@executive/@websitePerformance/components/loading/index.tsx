import { Skeleton } from '@mantine/core';

import { BaseCard } from '@/components/ui/base-card';

import websiteActivityClasses from '../website-activity/index.module.css';

import { ConversionRateCardSkeleton } from './components/conversion-rate-card-skeleton';
import { TableCardSkeleton } from './components/table-card-skeleton';
import { TrafficChartSkeleton } from './components/traffic-chart-skeleton';
import { WebsiteVisitsCardSkeleton } from './components/website-visits-card-skeleton';

export function WebsiteActivitySkeleton() {
  return (
    <BaseCard
      headerProps={{
        title: <Skeleton height={32} width={300} />,
        children: <Skeleton height={32} width={180} radius={'xl'} />
      }}
    >
      <div className={websiteActivityClasses['website-activity__container']}>
        <div className={websiteActivityClasses['website-activity__table']}>
          <TableCardSkeleton />
        </div>
        <div className={websiteActivityClasses['website-activity__container-right']}>
          <div className={websiteActivityClasses['website-activity__top-cards']}>
            <WebsiteVisitsCardSkeleton />
            <ConversionRateCardSkeleton />
          </div>
          <div className={websiteActivityClasses['website-activity__chart']}>
            <TrafficChartSkeleton />
          </div>
        </div>
      </div>
    </BaseCard>
  );
}
