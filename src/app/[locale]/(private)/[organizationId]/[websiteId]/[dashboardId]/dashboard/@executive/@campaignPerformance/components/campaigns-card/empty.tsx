'use client';

import { SimpleGrid } from '@mantine/core';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';

import { BaseCard } from '@/components/ui/base-card';
import { Overlay } from '@/components/ui/overlay';
import { StatsList } from '@/components/ui/stats-list';
import { SPACING } from '@/resources/constants';

import { FiguresCard } from '../figures-card';

import classes from './index.module.css';
import { mockCampaigns } from './mock';

export function CampaignsCardEmpty() {
  const t = useTranslations();
  /* eslint-disable i18next/no-literal-string */
  return (
    <BaseCard
      headerProps={{
        title: t('dashboard.overview.campaignsCard.title')
      }}
    >
      <div className={classes['campaigns-card__container']}>
        <StatsList
          variant="large"
          list={[
            {
              label: t('dashboard.overview.campaignsCard.totalVisits'),
              value: '5.21K'
            },
            {
              label: t('dashboard.overview.campaignsCard.totalConversions'),
              value: '66'
            }
          ]}
          w={'100%'}
          colProps={{ span: 'content' }}
          pl={SPACING.sm}
        />
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={{ base: 8, md: 16 }} verticalSpacing={{ base: 8, md: 16 }}>
          {mockCampaigns.map((campaign) => (
            <FiguresCard
              key={campaign.title}
              title={campaign.title}
              status={campaign.status}
              dateInterval={`${dayjs(campaign.startDate).format('MMM DD')} -
               ${dayjs(campaign.endDate).format('MMM DD')}`}
              urlSourcesImages={campaign.urlSourcesImages?.slice(0, 4) ?? []}
              additionalAvatars={campaign.urlSourcesImages.length - 4 > 0 ? campaign.urlSourcesImages.length - 4 : 0}
              data={campaign.data}
            />
          ))}
        </SimpleGrid>
        <Overlay title={t('common.noData')} />
      </div>
    </BaseCard>
  );
}
