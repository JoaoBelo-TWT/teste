import { Text } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { Avatar } from '@/components/ui/avatar';
import { BaseCard } from '@/components/ui/base-card';

import classes from './index.module.css';
import { ConversionRateCardProps } from './types';

export function ConversionRateCard({ figure, src }: Readonly<ConversionRateCardProps>) {
  const t = useTranslations('dashboard.overview.activityCard.conversionRateCard');

  return (
    <BaseCard
      headerProps={{
        title: (
          <Text fz="stat3" lh="body2">
            {t('title')}
          </Text>
        )
      }}
      paperProps={{ classNames: { root: classes['conversion-rate-card__card-root'] } }}
    >
      <div className={classes['conversion-rate-card__figure-container']}>
        <Text c="var(--brand-navy-color)" fz="stat3" lh="body2">
          {figure}
        </Text>
        <Avatar src={src} size={24} />
      </div>
    </BaseCard>
  );
}
