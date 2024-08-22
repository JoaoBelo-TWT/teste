'use client';

import { useSuspenseQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { getCardRadius, getGradientRadius } from '@/components/charts/funnel-chart';
import { FunnelChartProps } from '@/components/charts/funnel-chart/types';
import { useNavigationStore } from '@/context/navigation/store';
import { getDashboardCustomerJourneyQuery } from '@/lib/apollo/queries/dashboard-customer-journey';

import { TitleWithTooltip } from '../../../components/title-with-tooltip';
import { HeaderButtons } from '../header-buttons';

import { CustomerJourneyEmpty } from './empty';
import { JourneyProps } from './types';
import { CustomerJourneyUI } from './ui';

export default function CustomerJourney({
  viewOnly = false,
  dashboardJourneyData: dashboardJourneyDataServer
}: Readonly<JourneyProps>) {
  const t = useTranslations('dashboard');

  const { dashboardId, websiteId, organizationId } = useParams<{
    dashboardId: string;
    websiteId: string;
    organizationId: string;
  }>();

  const { filters, triggers } = useNavigationStore();

  const { data: dashboardJourneyDataClient } = useSuspenseQuery(getDashboardCustomerJourneyQuery, {
    variables: {
      dashboardId,
      dashboardTimeframe: filters.timeframe
    },
    skip: !triggers.journeys
  });

  const customerJourneys = useMemo(
    () => dashboardJourneyDataClient?.dashboardCustomerJourney ?? dashboardJourneyDataServer,
    [dashboardJourneyDataClient, dashboardJourneyDataServer]
  );
  const data: FunnelChartProps[] = useMemo(() => {
    let firstChanelValue = 0;
    return (
      customerJourneys?.journeys?.map((item, index, array) => {
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
            ...getCardRadius({ index, totalItems: customerJourneys.journeys?.length })
          },
          gradientStyles: {
            ...getGradientRadius({ index, totalItems: customerJourneys.journeys?.length })
          }
        };
      }) ?? []
    );
  }, [customerJourneys, t]);

  if (!customerJourneys.isSetup) {
    return (
      <CustomerJourneyEmpty
        variant="no-goals"
        dashboardId={dashboardId}
        websiteId={websiteId}
        organizationId={organizationId}
      />
    );
  }

  if (!customerJourneys.hasEvents) {
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
      viewOnly={viewOnly}
      headerTitle={
        <TitleWithTooltip title={t('overview.customerJourneyCard.title')} tooltip={t('tooltips.funnelPerformance')} />
      }
      headerChildren={<HeaderButtons />}
      funnels={data}
    />
  );
}
