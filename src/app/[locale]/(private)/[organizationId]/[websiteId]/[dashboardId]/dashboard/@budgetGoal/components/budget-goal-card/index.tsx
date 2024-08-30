'use client';

import { Flex, Paper, Text, Title } from '@mantine/core';
import { PencilSimple } from '@phosphor-icons/react/dist/ssr';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useFormatter, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import { AccessLevel } from '@/__generated__/graphql';
import { AreaChart } from '@/components/charts/area-chart';
import { Button } from '@/components/ui/button';
import { useQueryBudgetGoal } from '@/lib/react-query/dashboard/executive/query-budget-goal';
import { useMe } from '@/lib/react-query/user/query-me';
import { DATE_FORMATS, SPACING } from '@/resources/constants';
import { routes } from '@/routes/routes';
import { formatNumber } from '@/utils/formatters/numbers';
import { debounce } from '@/utils/functions';

import { DashboardPathParams } from '../../../types';
import BudgetGoalEmptyState from '../empty-state';

import { ExpensesModalButton } from './expenses-modal-button';
import classes from './index.module.css';

interface DashboardBudgetType {
  date: number;
  name?: string;
  budget: number;
}

export default function BudgetGoalCard() {
  const t = useTranslations();
  const format = useFormatter();
  const { organizationId, websiteId, dashboardId } = useParams<DashboardPathParams>();

  const { data: me } = useMe();
  const { data: budgetGoal } = useQueryBudgetGoal(dashboardId);

  const [budget, setBudget] = useState<number | undefined>(0);
  const debouncedSetBudget = useMemo(
    () =>
      debounce((newBudget) => {
        setBudget(newBudget as number | undefined);
      }, 5),
    []
  );

  const userHasAdminOrEditorAccess = me.me.permissions
    ?.find((entry) => entry.organizationId === organizationId)
    ?.accessLevel?.toUpperCase() as AccessLevel;
  const usedBudgetAmount = budget ?? budgetGoal.dashboardBudget?.usedAmount ?? 0;
  const totalBudgetAmount = budgetGoal.dashboardBudget?.totalAmount;
  const budgetCurrency = budgetGoal.dashboardBudget?.currency || 'USD';
  const isRecurring = budgetGoal.dashboardBudget?.recurring;

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
    () => `${t('dashboard.overview.budgetGoalCard.goal')} ${abbreviatedMonthlyBudget}`,
    [abbreviatedMonthlyBudget, t]
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
    () =>
      isRecurring
        ? t('dashboard.overview.budgetGoalCard.renewsIn', { days: budgetGoal.dashboardBudget?.renewsIn })
        : '',
    [budgetGoal.dashboardBudget?.renewsIn, isRecurring, t]
  );

  const chartData = useMemo(() => {
    if (!budgetGoal.dashboardBudget?.budgetUsage) return [];

    let cumulativeBudget = 0;

    const data = budgetGoal.dashboardBudget.budgetUsage
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((bu) => {
        cumulativeBudget += bu?.amount ?? 0;
        return {
          date: dayjs(bu.date).unix(),
          budget: cumulativeBudget,
          name: undefined
        } as DashboardBudgetType;
      });

    if (data.length > 0) {
      data[0].name = dayjs(data[0].date).format(DATE_FORMATS.COMPACT_WEEKDAY).toString();
    }

    if (data.length > 1) {
      data[data.length - 1].name = t('common.today');
    }

    return data;
  }, [budgetGoal.dashboardBudget, t]);

  // const chartXMin = useMemo(() => chartData.at(0)?.date ?? dayjs().unix(), [chartData]);
  // const chartXMax = useMemo(() => chartData.at(-1)?.date ?? dayjs().unix(), [chartData]);
  // 20% more than the max value to have some space at the top of the chart
  const maxYValueInData = useMemo(
    () => Math.max(...(budgetGoal.dashboardBudget?.budgetUsage.map((bu) => bu.amount ?? 0) ?? [0])),
    [budgetGoal.dashboardBudget?.budgetUsage]
  );
  const chartYMax = useMemo(
    () => 1.2 * (maxYValueInData > totalBudgetAmount ? maxYValueInData : totalBudgetAmount),
    [maxYValueInData, totalBudgetAmount]
  );

  if (!budgetGoal.dashboardBudget?.isSetup) {
    return <BudgetGoalEmptyState />;
  }

  return (
    <Paper classNames={{ root: classes['budget-goal-card__root'] }}>
      <Flex className={classes['budget-goal-card__header']} w="100%" mb={SPACING.sm} align="center">
        <Title fw={700} fz={26}>
          {t('dashboard.overview.budgetGoalCard.goals')}
        </Title>
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
            leftSection={<PencilSimple size={18} />}
            size="md"
          >
            {t('dashboard.overview.budgetGoalCard.edit')}
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
        w={'calc(100% - 70px)'}
        h={100}
        ml={35}
        mr={35}
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
        setHoveredValue={debouncedSetBudget}
        splitColors={['green.7', 'red.7']}
        xAxisProps={{
          // eslint-disable-next-line i18next/no-literal-string
          dataKey: 'name'
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
            radius: 0,
            color: 'var(--system-green-600-color)'
          }
        ]}
      />
    </Paper>
  );
}
