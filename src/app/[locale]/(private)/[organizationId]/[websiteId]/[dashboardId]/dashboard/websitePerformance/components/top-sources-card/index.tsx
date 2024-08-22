import { Text } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { Avatar } from '@/components/ui/avatar';
import { BaseCard } from '@/components/ui/base-card';

import classes from './index.module.css';
import { TopSourcesCardProps } from './types';

export function TopSourcesCard({ data, additionalSources }: Readonly<TopSourcesCardProps>) {
  const t = useTranslations('dashboard.overview.activityCard.topSourcesCard');
  const avatars = data?.map((value, index) => (
    <Avatar key={`${value}-${index}`} src={value} alt="Source image" size={56} />
  ));

  return (
    <BaseCard
      headerProps={{
        title: (
          <Text fz="stat3" lh="body2">
            {t('title')}
          </Text>
        )
      }}
      paperProps={{ classNames: { root: classes['top-sources-card__card-root'] } }}
    >
      <div className={classes['top-sources-card__avatars-container']}>
        <Avatar.Group>{avatars}</Avatar.Group>
        {additionalSources !== 0 && <Text>+{additionalSources}</Text>}
      </div>
    </BaseCard>
  );
}
