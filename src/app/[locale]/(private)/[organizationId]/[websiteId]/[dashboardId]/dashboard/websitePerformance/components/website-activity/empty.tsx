'use client';

import { useTranslations } from 'next-intl';

import { Overlay } from '@/components/ui/overlay';

import { mockChartData, mockTableData, mockTopSources } from './mock';
import { WebSiteActivityUI } from './ui';

export function WebSiteActivityEmpty() {
  const t = useTranslations();

  return (
    <WebSiteActivityUI
      headerTitle={t('dashboard.overview.activityCard.title')}
      table={{
        headers: [
          t('dashboard.overview.activityCard.topPagesCard.page'),
          t('dashboard.overview.activityCard.topPagesCard.views'),
          t('dashboard.overview.activityCard.topPagesCard.conversions')
        ],
        data: mockTableData
      }}
      websiteVisits={858}
      topSources={{ additionalSources: 150, data: mockTopSources }}
      conversionRate={{ figure: '53%', src: '' }}
      chart={{ data: mockChartData, XMax: 401, YMax: 481, XMin: 4 }}
      endContent={<Overlay title={t('common.noData')} />}
    />
  );
}
