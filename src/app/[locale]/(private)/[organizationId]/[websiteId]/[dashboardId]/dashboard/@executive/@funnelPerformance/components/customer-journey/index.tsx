'use client';

import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { HubspotIntegrationStatus, SalesforceIntegrationStatus } from '@/__generated__/graphql';
import { getCardRadius, getGradientRadius } from '@/components/charts/funnel-chart';
import { FunnelChartProps } from '@/components/charts/funnel-chart/types';
import { TitleWithTooltip } from '@/components/ui/title-with-tooltip';
import { useNavigationStore } from '@/context/navigation/store';
import { useQueryFunnelPerformance } from '@/lib/react-query/dashboard/executive/query-funnel-performance';
import { useQueryWebsite } from '@/lib/react-query/website/query-website';

import { HeaderButtons } from '../header-buttons';

import { CustomerJourneyEmpty } from './empty';
import { CustomerJourneyUI } from './ui';

export default function CustomerJourney() {
  const t = useTranslations('dashboard');

  const { dashboardId, websiteId, organizationId } = useParams<{
    dashboardId: string;
    websiteId: string;
    organizationId: string;
  }>();

  const { filters } = useNavigationStore();

  const { data: funnelPerformance } = useQueryFunnelPerformance({
    dashboardId,
    dashboardTimeframe: filters.timeframe
  });
  const { data: website } = useQueryWebsite(websiteId);

  const connectedToCRM =
    website?.website.salesforceIntegrationStatus === SalesforceIntegrationStatus.Active ||
    website?.website.hubspotIntegrationStatus === HubspotIntegrationStatus.Active;

  const data: FunnelChartProps[] = useMemo(() => {
    let firstChanelValue = 0;
    return (
      funnelPerformance.dashboardCustomerJourney?.journeys?.map((item, index, array) => {
        const value = array.slice(index).reduce((sum, currentItem) => sum + (currentItem?.conversionEvents || 0), 0);

        if (index === 0) {
          firstChanelValue = value;
        }
        const percentageChange = Math.min((value / firstChanelValue) * 100, 100);

        return {
          id: item.id,
          title: item.name,
          trackedEventDescription: item?.events?.at(0)?.name ?? '',
          figureValue: value.toString(),
          figureLabel: t('overview.customerJourneyCard.conversionEvents'),
          percentage: percentageChange / 100,
          percentageChange,
          isPercentageVisible: index !== 0,
          rootStyles: {
            ...getCardRadius({ index, totalItems: funnelPerformance.dashboardCustomerJourney.journeys?.length })
          },
          gradientStyles: {
            ...getGradientRadius({ index, totalItems: funnelPerformance.dashboardCustomerJourney.journeys?.length })
          }
        };
      }) ?? []
    );
  }, [funnelPerformance.dashboardCustomerJourney, t]);

  if (!funnelPerformance.dashboardCustomerJourney.isSetup) {
    return (
      <CustomerJourneyEmpty
        variant="no-goals"
        dashboardId={dashboardId}
        websiteId={websiteId}
        organizationId={organizationId}
      />
    );
  }

  if (!funnelPerformance.dashboardCustomerJourney.hasEvents) {
    return (
      <CustomerJourneyEmpty
        variant="no-data"
        dashboardId={dashboardId}
        websiteId={websiteId}
        organizationId={organizationId}
      />
    );
  }

  return (
    <CustomerJourneyUI
      viewOnly={!connectedToCRM}
      headerTitle={
        <TitleWithTooltip title={t('overview.customerJourneyCard.title')} tooltip={t('tooltips.funnelPerformance')} />
      }
      headerChildren={<HeaderButtons />}
      funnels={data}
    />
  );
}
