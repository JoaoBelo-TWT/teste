'use client';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useParams } from 'next/navigation';
import { useFormatter, useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { DashboardTimeframe } from '@/__generated__/graphql';
import { AvatarChip } from '@/components/ui/avatar-chip';
import { useNavigationStore } from '@/context/navigation/store';
import { useQueryWebsitePerformance } from '@/lib/react-query/dashboard/executive/use-query-website-performance';
import { beautifyUrl } from '@/utils/formatters/beutify-url';
import { formatNumber } from '@/utils/formatters/numbers';

import { TitleWithTooltip } from '../../../components/title-with-tooltip';

import { WebSiteActivityEmpty } from './empty';
import { WebSiteActivityUI } from './ui';

dayjs.extend(utc);

export default function WebSiteActivity() {
  const t = useTranslations('dashboard');
  const format = useFormatter();

  const { dashboardId } = useParams<{ dashboardId: string }>();
  const { filters } = useNavigationStore();

  const { data } = useQueryWebsitePerformance({
    dashboardId,
    dashboardTimeframe: filters.timeframe,
    pageViewsSorting: filters.pagesSorting,
    take: 5
  });

  const tableData = useMemo(
    () =>
      data.dashboardWebsiteActivity?.pageViews.slice(0, 5).map((pageView) => ({
        page: {
          text: pageView.page,
          imageSrc: data.dashboardWebsiteActivity?.websiteImageUrl
        },
        views: pageView.views,
        conversions: pageView.conversions
      })) ?? [],
    [data]
  );

  const topSources = useMemo(
    () => data.dashboardWebsiteActivity?.sources.slice(0, 4).map((source) => source.imageUrl) ?? [],
    [data.dashboardWebsiteActivity]
  );

  const additionalSources = useMemo(
    () => (data.dashboardWebsiteActivity?.totalSources ?? topSources.length) - topSources.length,
    [data.dashboardWebsiteActivity, topSources]
  );

  const conversionRate = useMemo(
    () =>
      formatNumber({
        value: data.dashboardWebsiteActivity?.conversionRate ?? 0,
        nextIntlFormatter: format,
        options: { style: 'percent' }
      }),
    [data.dashboardWebsiteActivity?.conversionRate, format]
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
    () => data.dashboardWebsiteActivity?.traffic.findLastIndex((traffic) => traffic.pageViews) ?? 0,
    [data.dashboardWebsiteActivity?.traffic]
  );

  const chartData = useMemo(
    () =>
      data.dashboardWebsiteActivity?.traffic.map((traffic, index) => ({
        traffic: traffic.pageViews,
        date: getChartDate(traffic.date),
        hideDot: index !== lastDataPointIndexWithValue
      })) ?? [],
    [data.dashboardWebsiteActivity?.traffic, getChartDate, lastDataPointIndexWithValue]
  );

  const chartYMax = useMemo(() => 1.2 * Math.max(...chartData.map((val) => val.traffic ?? 0)), [chartData]);
  const chartXMin = useMemo(() => Math.min(...chartData.map((val) => val.traffic ?? 0)), [chartData]);
  const chartXMax = useMemo(() => Math.max(...chartData.map((val) => val.traffic ?? 0)), [chartData]);

  if (!data.dashboardWebsiteActivity?.hasEvents) {
    return <WebSiteActivityEmpty />;
  }

  const websiteVisits: number = data.dashboardWebsiteActivity.traffic.reduce(
    (sum: number, obj) => sum + (obj.pageViews ?? 0),
    0
  );

  return (
    <WebSiteActivityUI
      headerTitle={
        <TitleWithTooltip title={t('overview.activityCard.title')} tooltip={t('tooltips.websitePerformance')} />
      }
      headerChildren={
        data.dashboardWebsiteActivity?.domain ? (
          <AvatarChip
            variant="outlined"
            label={beautifyUrl(data.dashboardWebsiteActivity?.domain)}
            image={data.dashboardWebsiteActivity?.websiteImageUrl}
          />
        ) : undefined
      }
      table={{
        headers: [
          t('overview.activityCard.topPagesCard.page'),
          t('overview.activityCard.topPagesCard.views'),
          t('overview.activityCard.topPagesCard.conversions')
        ],
        data: tableData
      }}
      websiteVisits={websiteVisits}
      topSources={{ additionalSources, data: topSources }}
      conversionRate={{ figure: conversionRate, src: topSources.at(0) ?? '' }}
      chart={{ data: chartData, XMax: chartXMax, YMax: chartYMax, XMin: chartXMin }}
      websiteUrl={beautifyUrl(data.dashboardWebsiteActivity?.domain)}
    />
  );
}
