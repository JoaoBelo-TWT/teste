'use client';

import { Paper, Text } from '@mantine/core';
import dayjs from 'dayjs';
import { useFormatter, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import { AreaChart } from '@/components/charts/area-chart';
import { formatNumber } from '@/utils/formatters/numbers';

import classes from './index.module.css';
import { ActivityGoalCardProps } from './types';

export default function ActivityGoalCard({ dashboardActivityGoal }: Readonly<ActivityGoalCardProps>) {
  const t = useTranslations('dashboard.overview.activityGoalCard');
  const format = useFormatter();

  const [numberOfEvents, setNumberOfEvents] = useState<number | undefined>(undefined);

  const currentNumberOfEvents = useMemo(
    () => numberOfEvents ?? dashboardActivityGoal?.currentNumberOfEvents ?? 0,
    [dashboardActivityGoal?.currentNumberOfEvents, numberOfEvents]
  );
  const totalEventsAmount = useMemo(
    () => dashboardActivityGoal?.totalNumberOfEvents,
    [dashboardActivityGoal?.totalNumberOfEvents]
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
    () => `${abbreviatedTotalEventsAmount} ${dashboardActivityGoal.customerFunnelStageName}`,
    [abbreviatedTotalEventsAmount, dashboardActivityGoal.customerFunnelStageName]
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
    () => t('completesIn', { days: dashboardActivityGoal?.completesInDays }),
    [dashboardActivityGoal?.completesInDays, t]
  );

  const chartData = useMemo(
    () =>
      dashboardActivityGoal?.activityGoalProgress.map((agp) => ({
        date: dayjs(agp.date).unix(),
        activityGoalProgress: agp.value
      })) ?? [],
    [dashboardActivityGoal?.activityGoalProgress]
  );

  const chartXMin = useMemo(() => chartData.at(0)?.date ?? dayjs().unix(), [chartData]);
  const chartXMax = useMemo(() => chartData.at(-1)?.date ?? dayjs().unix(), [chartData]);
  // 20% more than the max value to have some space at the top of the chart
  const maxYValueInData = useMemo(
    () => Math.max(...(dashboardActivityGoal?.activityGoalProgress.map((agp) => agp.value ?? 0) ?? [0])),
    [dashboardActivityGoal?.activityGoalProgress]
  );
  const chartYMax = useMemo(
    () => 1.2 * (maxYValueInData > totalEventsAmount ? maxYValueInData : totalEventsAmount),
    [maxYValueInData, totalEventsAmount]
  );

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
        w={'100%'}
        h={'100%'}
        withXAxis={false}
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
          scale: 'time',
          type: 'number'
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
                color: 'var(--color-pale-blue)',
                offset: '0%', // Start of the gradient
                opacity: 1 // Full opacity
              },
              {
                color: 'var(--color-maya-blue)',
                offset: '100%', // End of the gradient
                opacity: 1 // Full opacity
              }
            ],
            radius: 24,
            color: 'var(--system-blue-600-color)'
          }
        ]}
      />
    </Paper>
  );
}
