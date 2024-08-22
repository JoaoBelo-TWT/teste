'use client';

import { useSuspenseQuery } from '@apollo/client';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useParams } from 'next/navigation';
import { useFormatter, useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { DashboardTimeframe } from '@/__generated__/graphql';
import { AvatarChip } from '@/components/ui/avatar-chip';
import { useNavigationStore } from '@/context/navigation/store';
import { getDashboardWebsiteActivityQuery } from '@/lib/apollo/queries/dashboard-website-activity';
import { beautifyUrl } from '@/utils/formatters/beutify-url';
import { formatNumber } from '@/utils/formatters/numbers';

import { TitleWithTooltip } from '../../../components/title-with-tooltip';

import { WebSiteActivityEmpty } from './empty';
import { WebSiteActivityProps } from './types';
import { WebSiteActivityUI } from './ui';

dayjs.extend(utc);

export default function WebSiteActivity({
  dashboardWebsiteActivityData: dashboardWebsiteActivityDataServer
}: Readonly<WebSiteActivityProps>) {
  const t = useTranslations('dashboard');
  const format = useFormatter();

  const { dashboardId } = useParams<{ dashboardId: string }>();
  const { filters, triggers } = useNavigationStore();

  const { data: dashboardWebsiteActivityDataClient } = useSuspenseQuery(getDashboardWebsiteActivityQuery, {
    variables: {
      dashboardId,
      dashboardTimeframe: filters.timeframe,
      pageViewsSorting: filters.pagesSorting
    },
    skip: !triggers.activity
  });

  const dashboardWebsiteActivity = useMemo(
    () => dashboardWebsiteActivityDataClient?.dashboardWebsiteActivity ?? dashboardWebsiteActivityDataServer,
    [dashboardWebsiteActivityDataClient?.dashboardWebsiteActivity, dashboardWebsiteActivityDataServer]
  );

  const websiteImageSrc = useMemo(
    () => dashboardWebsiteActivity?.websiteImageUrl,
    [dashboardWebsiteActivity?.websiteImageUrl]
  );

  const headers = useMemo(
    () => [
      t('overview.activityCard.topPagesCard.page'),
      t('overview.activityCard.topPagesCard.views'),
      t('overview.activityCard.topPagesCard.conversions')
    ],
    [t]
  );

  const tableData = useMemo(
    () =>
      dashboardWebsiteActivity?.pageViews.slice(0, 5).map((pageView) => ({
        page: {
          text: pageView.page,
          imageSrc: websiteImageSrc
        },
        views: pageView.views,
        conversions: pageView.conversions
      })) ?? [],
    [dashboardWebsiteActivity?.pageViews, websiteImageSrc]
  );

  const topSources = useMemo(
    () => dashboardWebsiteActivity?.sources.slice(0, 4).map((source) => source.imageUrl) ?? [],
    [dashboardWebsiteActivity]
  );

  const additionalSources = useMemo(
    () => (dashboardWebsiteActivity?.totalSources ?? topSources.length) - topSources.length,
    [dashboardWebsiteActivity, topSources]
  );

  const conversionRate = useMemo(
    () =>
      formatNumber({
        value: dashboardWebsiteActivity?.conversionRate ?? 0,
        nextIntlFormatter: format,
        options: { style: 'percent' }
      }),
    [dashboardWebsiteActivity?.conversionRate, format]
  );

  const getChartDate = useMemo(
    () => (date: string) => {
      switch (filters.timeframe) {
        case DashboardTimeframe.LastDay:
          return `${dayjs(date).format('HH')}h`;
        case DashboardTimeframe.ThisWeek:
          return dayjs(date).utc().format('ddd');
        case DashboardTimeframe.ThisMonth:
          return dayjs(date).utc().format('DD');
        case DashboardTimeframe.ThisYear:
          return dayjs(date).utc().format('MMM');
        default:
          return dayjs(date).utc().format('DD');
      }
    },
    [filters.timeframe]
  );

  const lastDataPointIndexWithValue = useMemo(
    () => dashboardWebsiteActivity?.traffic.findLastIndex((traffic) => traffic.pageViews) ?? 0,
    [dashboardWebsiteActivity]
  );

  const chartData = useMemo(
    () =>
      dashboardWebsiteActivity?.traffic.map((traffic, index) => ({
        traffic: traffic.pageViews,
        date: getChartDate(traffic.date),
        hideDot: index !== lastDataPointIndexWithValue
      })) ?? [],
    [dashboardWebsiteActivity?.traffic, getChartDate, lastDataPointIndexWithValue]
  );

  const chartYMax = useMemo(() => 1.2 * Math.max(...chartData.map((data) => data.traffic ?? 0)), [chartData]);
  const chartXMin = useMemo(() => Math.min(...chartData.map((data) => data.traffic ?? 0)), [chartData]);
  const chartXMax = useMemo(() => Math.max(...chartData.map((data) => data.traffic ?? 0)), [chartData]);

  if (!dashboardWebsiteActivity?.hasEvents) {
    return <WebSiteActivityEmpty />;
  }

  const websiteVisits: number = dashboardWebsiteActivity.traffic.reduce(
    (sum: number, obj) => sum + (obj.pageViews ?? 0),
    0
  );

  return (
    <WebSiteActivityUI
      headerTitle={
        <TitleWithTooltip title={t('overview.activityCard.title')} tooltip={t('tooltips.websitePerformance')} />
      }
      headerChildren={
        dashboardWebsiteActivity?.domain ? (
          <AvatarChip
            variant="outlined"
            label={beautifyUrl(dashboardWebsiteActivity?.domain)}
            image={websiteImageSrc}
          />
        ) : undefined
      }
      table={{ headers, data: tableData }}
      websiteVisits={websiteVisits}
      topSources={{ additionalSources, data: topSources }}
      conversionRate={{ figure: conversionRate, src: topSources.at(0) ?? '' }}
      chart={{ data: chartData, XMax: chartXMax, YMax: chartYMax, XMin: chartXMin }}
      websiteUrl={beautifyUrl(dashboardWebsiteActivity?.domain)}
    />
  );
}
