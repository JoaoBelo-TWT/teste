import { SimpleGrid, Skeleton } from '@mantine/core';
import clsx from 'clsx';

import { BaseCard } from '@/components/ui/base-card';

import channelPerformanceClasses from '../channel-performance/index.module.css';
import headerButtonsClasses from '../header-buttons/index.module.css';

import { CardsSkeleton } from './components/cards-skeleton';
import classes from './index.module.css';

export function ChannelPerformanceSkeleton() {
  return (
    <BaseCard
      headerProps={{
        title: <Skeleton height={32} width={350} />,
        children: (
          <div className={headerButtonsClasses['header-buttons__container']}>
            <Skeleton height={44} width={150} radius={'xl'} />
            <Skeleton height={44} width={150} radius={'xl'} />
          </div>
        )
      }}
    >
      <div className={channelPerformanceClasses['channel-performance__container']}>
        <div
          className={clsx(
            classes['loading__chart-container'],
            channelPerformanceClasses['channel-performance__chart-container']
          )}
        >
          <Skeleton height={300} circle />
        </div>
        <div className={channelPerformanceClasses['channel-performance__grid-container']}>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={{ base: 8, md: 24 }} verticalSpacing={{ base: 8, md: 24 }}>
            <CardsSkeleton />
          </SimpleGrid>
        </div>
      </div>
    </BaseCard>
  );
}
