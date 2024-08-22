'use client';

import { Flex, Paper, Text } from '@mantine/core';
import { Pencil } from '@phosphor-icons/react/dist/ssr';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useFormatter, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import { AreaChart } from '@/components/charts/area-chart';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/ui/header';
import { SPACING } from '@/resources/constants';
import { routes } from '@/routes/routes';
import { formatNumber } from '@/utils/formatters/numbers';
import { debounce } from '@/utils/functions';

import { DashboardPathParams } from '../../../types';

import { ExpensesModalButton } from './expenses-modal-button';
import classes from './index.module.css';
import { BudgetGoalCardProps } from './types';

export default function BudgetGoalCard({ dashboardBudget, userHasAdminOrEditorAccess }: Readonly<BudgetGoalCardProps>) {
  const t = useTranslations('dashboard.overview.budgetGoalCard');
  const format = useFormatter();
  const { organizationId, websiteId, dashboardId } = useParams<DashboardPathParams>();

  const [budget, setBudget] = useState<number | undefined>(0);

  const debouncedSetBudget = useMemo(
    () =>
      debounce((newBudget) => {
        setBudget(newBudget as number | undefined);
      }, 100),
    []
  );

  const usedBudgetAmount = budget ?? dashboardBudget?.usedAmount ?? 0;
  const totalBudgetAmount = dashboardBudget?.totalAmount;
  const budgetCurrency = dashboardBudget?.currency || 'USD';
  const isRecurring = dashboardBudget?.recurring;

  const abbreviatedMonthlyBudget = useMemo(
    () =>
      formatNumber({
        value: totalBudgetAmount,
        nextIntlFormatter: format,
        options: { style: 'currency', currency: budgetCurrency, notation: 'compact' }
      }),
    [budgetCurrency, format, totalBudgetAmount]
  );

  const figureLabel = useMemo(
    () => `Budget ${abbreviatedMonthlyBudget} ${isRecurring ? dashboardBudget?.recurringRepeat : ''}`,
    [abbreviatedMonthlyBudget, dashboardBudget?.recurringRepeat, isRecurring]
  );

  const figure = useMemo(
    () =>
      formatNumber({
        value: usedBudgetAmount,
        nextIntlFormatter: format,
        options: { style: 'currency', currency: budgetCurrency, notation: 'compact' }
      }),
    [usedBudgetAmount, budgetCurrency, format]
  );

  const additionalInfo = useMemo(
    () => (isRecurring ? t('renewsIn', { days: dashboardBudget?.renewsIn }) : ''),
    [dashboardBudget?.renewsIn, isRecurring, t]
  );

  const chartData = useMemo(
    () =>
      dashboardBudget?.budgetUsage.map((bu) => ({
        date: dayjs(bu.date).unix(),
        budget: bu.amount
      })) ?? [],
    [dashboardBudget]
  );

  const chartXMin = useMemo(() => chartData.at(0)?.date ?? dayjs().unix(), [chartData]);
  const chartXMax = useMemo(() => chartData.at(-1)?.date ?? dayjs().unix(), [chartData]);
  // 20% more than the max value to have some space at the top of the chart
  const maxYValueInData = useMemo(
    () => Math.max(...(dashboardBudget?.budgetUsage.map((bu) => bu.amount ?? 0) ?? [0])),
    [dashboardBudget?.budgetUsage]
  );
  const chartYMax = useMemo(
    () => 1.2 * (maxYValueInData > totalBudgetAmount ? maxYValueInData : totalBudgetAmount),
    [maxYValueInData, totalBudgetAmount]
  );

  return (
    <Paper classNames={{ root: classes['budget-goal-card__root'] }}>
      <Flex className={classes['budget-goal-card__header']} w="100%" mb={SPACING.sm}>
        <Header title={t('goals')} />
        <Link
          href={{
            pathname: routes.website.dashboards.path(organizationId, websiteId),
            query: { dashboardId },
            hash: `goals-${dashboardId}`
          }}
          scroll={false}
        >
          <Button
            className={classes['budget-goal-card__header-button']}
            variant="light"
            leftSection={<Pencil size={16} />}
          >
            {t('edit')}
          </Button>
        </Link>
      </Flex>
      <div className={classes['budget-goal-card__header']}>
        <div className={classes['budget-goal-card__header--text']}>
          <Text fz="caption2" lh="body2" tt="uppercase">
            {figureLabel}
          </Text>
          <Text
            c={usedBudgetAmount > totalBudgetAmount ? 'var(--system-red-color)' : 'var(--brand-navy-color)'}
            fz="stat3"
            lh="body2"
          >
            {figure}
          </Text>
          <Text c="var(--mantine-color-dark-7)" lh="body2" fz="caption">
            {additionalInfo}
          </Text>
        </div>
        {userHasAdminOrEditorAccess && <ExpensesModalButton />}
      </div>
      <AreaChart
        w={'100%'}
        h={'100%'}
        mih={140}
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
        setHoveredValue={debouncedSetBudget}
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
        referenceLines={[
          {
            y: totalBudgetAmount,
            label: abbreviatedMonthlyBudget,
            color: 'dark.6',
            width: 1
          }
        ]}
        fillOpacity={1}
        data={chartData}
        series={[
          {
            // eslint-disable-next-line i18next/no-literal-string
            name: 'budget',
            gradientStops: [
              {
                color: 'var(--color-green-soft)',
                offset: '0%', // Start of the gradient
                opacity: 1 // Full opacity
              },
              {
                color: 'var(--color-light-aqua)',
                offset: '100%', // End of the gradient
                opacity: 1 // Full opacity
              }
            ],
            radius: 24,
            color: 'var(--system-green-600-color)'
          }
        ]}
      />
    </Paper>
  );
}
