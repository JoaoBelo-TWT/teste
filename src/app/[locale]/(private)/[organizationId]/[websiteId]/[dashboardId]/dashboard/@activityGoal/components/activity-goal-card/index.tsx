'use client';

import { ComboboxData, Paper, Text } from '@mantine/core';
import dayjs from 'dayjs';
import { useParams } from 'next/navigation';
import { useFormatter, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import { AreaChart } from '@/components/charts/area-chart';
import { useQueryActivity } from '@/lib/react-query/dashboard/executive/use-query-activity';
import { useQueryFunnelStages } from '@/lib/react-query/dashboard/use-query-funnel-stages';
import { DATE_FORMATS } from '@/resources/constants';
import { formatNumber } from '@/utils/formatters/numbers';

import ActivityGoalEmptyState from '../empty-state';

import classes from './index.module.css';

interface DashboardActivityType {
  date: number;
  activityGoalProgress: number;
  name?: string;
}

export default function ActivityGoalCard() {
  const t = useTranslations();
  const format = useFormatter();

  const { dashboardId } = useParams<{
    dashboardId: string;
    websiteId: string;
    organizationId: string;
  }>();

  const { data: activity } = useQueryActivity(dashboardId);
  const { data: funnels } = useQueryFunnelStages(dashboardId);

  const customerFunnelStages: ComboboxData | undefined = funnels?.customerFunnelStages.edges.map((edge) => ({
    value: edge.node.id,
    label: edge.node.name
  }));

  const [numberOfEvents, setNumberOfEvents] = useState<number | undefined>(undefined);

  const currentNumberOfEvents = useMemo(
    () => numberOfEvents ?? activity.dashboardActivityGoal?.currentNumberOfEvents ?? 0,
    [activity.dashboardActivityGoal?.currentNumberOfEvents, numberOfEvents]
  );
  const totalEventsAmount = useMemo(
    () => activity.dashboardActivityGoal?.totalNumberOfEvents,
    [activity.dashboardActivityGoal?.totalNumberOfEvents]
  );

  const abbreviatedTotalEventsAmount = useMemo(
    () =>
      formatNumber({
        value: totalEventsAmount,
        nextIntlFormatter: format,
        options: { style: 'decimal', notation: 'compact' }
      }),
    [format, totalEventsAmount]
  );

  const figureLabel = useMemo(
    () =>
      `${t('dashboard.overview.activityGoalCard.goal')} 
    ${abbreviatedTotalEventsAmount} ${activity.dashboardActivityGoal.customerFunnelStageName} ${t('common.events')}`,
    [abbreviatedTotalEventsAmount, activity.dashboardActivityGoal.customerFunnelStageName, t]
  );

  const figure = useMemo(
    () =>
      formatNumber({
        value: currentNumberOfEvents,
        nextIntlFormatter: format,
        options: { style: 'decimal', notation: 'compact' }
      }),
    [currentNumberOfEvents, format]
  );

  const additionalInfo = useMemo(
    () =>
      t('dashboard.overview.activityGoalCard.completesIn', { days: activity.dashboardActivityGoal.completesInDays }),
    [activity.dashboardActivityGoal, t]
  );

  const chartData = useMemo(() => {
    const data =
      activity.dashboardActivityGoal.activityGoalProgress
        .map(
          (agp) =>
            ({
              date: dayjs(agp.date).unix(),
              activityGoalProgress: agp.value,
              name: undefined
            }) as DashboardActivityType
        )
        .filter((item) => item.activityGoalProgress !== null) ?? [];

    if (data.length > 0) {
      data[0].name = dayjs(data[0].date).format(DATE_FORMATS.COMPACT_WEEKDAY).toString();
    }

    if (data.length > 1) {
      data[data.length - 1].name = t('common.today');
    }

    return data;
  }, [activity.dashboardActivityGoal, t]);

  const chartXMin = useMemo(() => chartData.at(0)?.date ?? dayjs().unix(), [chartData]);
  const chartXMax = useMemo(() => chartData.at(-1)?.date ?? dayjs().unix(), [chartData]);
  // 20% more than the max value to have some space at the top of the chart
  const maxYValueInData = useMemo(
    () => Math.max(...(activity.dashboardActivityGoal.activityGoalProgress.map((agp) => agp.value ?? 0) ?? [0])),
    [activity.dashboardActivityGoal]
  );
  const chartYMax = useMemo(
    () => 1.2 * (maxYValueInData > totalEventsAmount ? maxYValueInData : totalEventsAmount),
    [maxYValueInData, totalEventsAmount]
  );

  if (!activity?.dashboardActivityGoal?.isSetup) {
    return <ActivityGoalEmptyState customerFunnelStages={customerFunnelStages} />;
  }

  return (
    <Paper classNames={{ root: classes['activity-goal-card__root'] }}>
      <div className={classes['activity-goal-card__header']}>
        <div className={classes['activity-goal-card__header--text']}>
          <Text fz="caption2" lh="body2" tt="uppercase">
            {figureLabel}
          </Text>
          <Text
            c={currentNumberOfEvents > totalEventsAmount ? 'var(--system-green-600-color)' : 'var(--brand-navy-color)'}
            fz="stat3"
            lh="body2"
          >
            {figure}
          </Text>
          <Text c="var(--mantine-color-dark-7)" lh="body2" fz="caption">
            {additionalInfo}
          </Text>
        </div>
      </div>
      <AreaChart
        w={'calc(100% - 70px)'}
        h={100}
        ml={35}
        mr={35}
        mb={15}
        withXAxis={true}
        withYAxis={false}
        gridAxis={'none'}
        withTooltip={false}
        curveType={'monotone'}
        dataKey={'date'}
        withDots={true}
        dotProps={{
          hideAll: true
        }}
        setHoveredValue={setNumberOfEvents}
        splitColors={['green.7', 'red.7']}
        xAxisProps={{
          display: 'hidden',
          domain: [chartXMin, chartXMax],
          // eslint-disable-next-line i18next/no-literal-string
          dataKey: 'name'
        }}
        yAxisProps={{
          display: 'hidden',
          domain: [0, chartYMax]
        }}
        referenceLines={[{ y: totalEventsAmount, label: abbreviatedTotalEventsAmount, color: 'dark.6' }]}
        fillOpacity={1}
        data={chartData}
        series={[
          {
            // eslint-disable-next-line i18next/no-literal-string
            name: 'activityGoalProgress',
            gradientStops: [
              {
                color: 'var(--color-maya-blue)',
                offset: '0%', // Start of the gradient
                opacity: 1 // Full opacity
              },
              {
                color: 'var(--color-pale-blue)',

                offset: '100%', // End of the gradient
                opacity: 1 // Full opacity
              }
            ],
            color: 'var(--system-blue-600-color)'
          }
        ]}
      />
    </Paper>
  );
}
