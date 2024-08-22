import { Skeleton } from '@mantine/core';

import { BaseCard } from '@/components/ui/base-card';

import conversionRateCardClasses from '../../conversion-rate-card/index.module.css';
import topSourcesCardClasses from '../../top-sources-card/index.module.css';

export function ConversionRateCardSkeleton() {
  return (
    <BaseCard
      headerProps={{
        title: <Skeleton height={32} width={180} />
      }}
      paperProps={{ classNames: { root: topSourcesCardClasses['top-sources-card__card-root'] } }}
    >
      <div className={conversionRateCardClasses['conversion-rate-card__container']}>
        <div className={conversionRateCardClasses['conversion-rate-card__figure-container']}>
          <Skeleton height={24} width={80} />
          <Skeleton height={24} circle />
        </div>
        <Skeleton height={12} width={80} />
      </div>
    </BaseCard>
  );
}
