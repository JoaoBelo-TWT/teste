'use client';

import dayjs from 'dayjs';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo } from 'react';

import { Channels, DashboardTimeframe } from '@/__generated__/graphql';
import { TitleWithTooltip } from '@/components/ui/title-with-tooltip';
import { useNavigationStore } from '@/context/navigation/store';
import { useEffectOnceWhen } from '@/hooks/use-effect-once';
import { useQueryAcquisitionPerformance } from '@/lib/react-query/dashboard/executive/query-acquisition-performance';
import { useQueryChannelPerformance } from '@/lib/react-query/dashboard/executive/query-channel-performance';
import { DashboardQueryParams } from '@/types/constants/dashboard-query-params';

import { DashboardPathParams } from '../../../../types';
import { HeaderButtons } from '../header-buttons';

import AcquisitionPerformanceEmpty from './empty';
import { ChartDataItem } from './types';
import { AcquisitionPerformanceUI } from './ui';
import { fillDataForPeriod, fillDataGaps, fillPreviousValues, getDatePeriod, getDateRange } from './utils';

export default function AcquisitionPerformance() {
  const t = useTranslations('dashboard');
  const { filters, setFilters } = useNavigationStore();
  const { timeframe, acquisitionChannel, channel } = filters;
  const { dashboardId, websiteId, organizationId } = useParams<DashboardPathParams>();

  const { data } = useQueryChannelPerformance({
    dashboardId,
    dashboardTimeframe: filters.timeframe,
    channelSorting: filters.channelSorting
  });

  const channelPerformancesArray = data?.dashboardChannelPerformance;

  const getFunnelsFiltersOptions = useCallback(() => {
    if (!channelPerformancesArray.channelsPerformance) return [];

    return channelPerformancesArray.channelsPerformance.map((c) => ({
      value: c.stageId,
      label: c.stageName
    }));
  }, [channelPerformancesArray]);

  const funnelsFilterOptions = getFunnelsFiltersOptions();

  useEffectOnceWhen(() => {
    if (funnelsFilterOptions.length > 0) {
      setFilters({
        [DashboardQueryParams.channel.key]: funnelsFilterOptions[0].label
      });
    }
  }, true);

  const funnelStageName = useMemo(() => {
    if (channel === '') {
      if (funnelsFilterOptions.length > 0) {
        return funnelsFilterOptions[0].label;
      }
      return undefined;
    }
    return channel;
  }, [channel, funnelsFilterOptions]);

  const { data: acquisitionData } = useQueryAcquisitionPerformance({
    dashboardId,
    dashboardTimeframe: timeframe,
    funnelStageName,
    channel: acquisitionChannel === '' ? undefined : (acquisitionChannel as Channels)
  });

  const getChartDateFormat = useMemo(
    () => (date: string | Date) => {
      switch (filters.timeframe) {
        case DashboardTimeframe.LastDay:
          return `${dayjs(date).format('HH')}h`;
        case DashboardTimeframe.ThisWeek:
          return dayjs(date).format('MMM DD');
        case DashboardTimeframe.ThisMonth:
          return dayjs(date).format('MMM DD');
        case DashboardTimeframe.ThisYear:
          return dayjs(date).format('MMM');
        default:
          return dayjs(date).format('DD');
      }
    },
    [filters.timeframe]
  );

  const lastDataPointIndexWithValue = useMemo(
    () =>
      acquisitionData.dashboardAcquisitionPerformance.acquisitionPerformance.findLastIndex((item) => item.count) ?? 0,
    [acquisitionData.dashboardAcquisitionPerformance.acquisitionPerformance]
  );

  const chartData = useMemo(() => {
    let newData: ChartDataItem[] = acquisitionData.dashboardAcquisitionPerformance.acquisitionPerformance.map(
      (item, index, arr) => ({
        value: item.count,
        date: getChartDateFormat(item.date),
        originalDate: item.date,
        hideDot: index !== lastDataPointIndexWithValue,
        previousValue: index > 0 ? arr[index - 1].count : undefined
      })
    );
    newData = fillDataGaps(newData, getChartDateFormat, timeframe);
    // prepare the date range values to populate the missing chart data
    const { start, end, increment, unit } = getDatePeriod(timeframe);
    const dates = getDateRange(start, end, increment, unit);
    // add mock data to fill graph for requested timeframe
    newData = fillDataForPeriod(dates, newData, getChartDateFormat, timeframe);
    // add empty data from the start of the timeframe to the first found valid value
    // this will make the graphic line always start at the beginning of the timeframe
    newData = fillPreviousValues(newData);
    return newData;
  }, [
    acquisitionData.dashboardAcquisitionPerformance.acquisitionPerformance,
    getChartDateFormat,
    lastDataPointIndexWithValue,
    timeframe
  ]);

  const chartYMax = useMemo(() => 1.2 * Math.max(...chartData.map((val) => val.value ?? 0)), [chartData]);
  const chartXMin = useMemo(() => Math.min(...chartData.map((val) => val.value ?? 0)), [chartData]);
  const chartXMax = useMemo(() => Math.max(...chartData.map((val) => val.value ?? 0)), [chartData]);

  if (
    !acquisitionData.dashboardAcquisitionPerformance.isSetup &&
    acquisitionData.dashboardAcquisitionPerformance.acquisitionPerformance.length === 0
  ) {
    return (
      <AcquisitionPerformanceEmpty
        variant="no-data"
        dashboardId={dashboardId}
        websiteId={websiteId}
        organizationId={organizationId}
      />
    );
  }

  if (funnelsFilterOptions.length === 0) {
    return (
      <AcquisitionPerformanceEmpty dashboardId={dashboardId} websiteId={websiteId} organizationId={organizationId} />
    );
  }

  return (
    <AcquisitionPerformanceUI
      chart={{
        data: chartData,
        YMax: chartYMax,
        XMax: chartXMax,
        XMin: chartXMin
      }}
      headerTitle={
        <TitleWithTooltip
          title={t('overview.acquisitionPerformanceCard.title')}
          tooltip={t('tooltips.acquisitionPerformance')}
          description={timeframe.replace(/([a-z])([A-Z])/g, '$1 $2')}
        />
      }
      headerChildren={<HeaderButtons funnelsFilterOptions={getFunnelsFiltersOptions()} />}
    />
  );
}
