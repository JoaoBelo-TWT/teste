'use client';

import { Divider, Flex, Text, useCombobox } from '@mantine/core';
import { CalendarBlank } from '@phosphor-icons/react';
import dayjs from 'dayjs';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo } from 'react';

import { DashboardTimeframe } from '@/__generated__/graphql';
import { Button } from '@/components/ui/button';
import { Dropdown } from '@/components/ui/dropdown';
import { useNavigationStore } from '@/context/navigation/store';
import { DATE_FORMATS, SPACING } from '@/resources/constants';
import { DashboardQueryParams } from '@/types/constants/dashboard-query-params';

import classes from './index.module.css';

const today = dayjs();
/* eslint-disable i18next/no-literal-string */
const yesterday = today.subtract(1, 'day');
const startOfWeek = today.startOf('week').add(1, 'day'); // Assuming the week starts on Monday
const startOfMonth = today.startOf('month');
const startOfYear = today.startOf('year');
const weekGap = `${startOfWeek.format(DATE_FORMATS.COMPACT)} - ${yesterday.format(DATE_FORMATS.COMPACT)}`;
const monthGap = `${startOfMonth.format(DATE_FORMATS.COMPACT)} - ${yesterday.format(DATE_FORMATS.COMPACT)}`;
const yearGap = `${startOfYear.format(DATE_FORMATS.COMPACT)} - ${yesterday.format(DATE_FORMATS.COMPACT)}`;

export default function DashboardFilters() {
  const t = useTranslations();
  const comboboxTimeframe = useCombobox();
  const searchParams = useSearchParams();
  const { filters, setFilters } = useNavigationStore();
  const queryTimeframe = searchParams.get(DashboardQueryParams.timeframe.key);

  useEffect(() => {
    if (queryTimeframe) setFilters({ [DashboardQueryParams.timeframe.key]: queryTimeframe as DashboardTimeframe });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const timeframeOptions = useMemo(
    () => [
      { value: DashboardTimeframe.LastDay, label: t('dashboard.filters.timeframe.dropdownOptions.lastDay') },
      {
        value: DashboardTimeframe.ThisWeek,
        label: `${t('dashboard.filters.timeframe.dropdownOptions.thisWeek')} (${weekGap})`
      },
      {
        value: DashboardTimeframe.ThisMonth,
        label: `${t('dashboard.filters.timeframe.dropdownOptions.thisMonth')} (${monthGap})`
      },
      {
        value: DashboardTimeframe.ThisYear,
        label: `${t('dashboard.filters.timeframe.dropdownOptions.thisYear')} (${yearGap})`
      }
    ],
    [t]
  );

  const activeTimeFrameLabel = useMemo(
    () =>
      timeframeOptions
        .find((timeFrameOption) => timeFrameOption.value === filters.timeframe)
        ?.label.replace(/\s*\(.*\)/, ''),
    [timeframeOptions, filters.timeframe]
  );

  const activeTimeFrameInterval = useMemo(() => {
    switch (filters.timeframe) {
      case DashboardTimeframe.LastDay:
        return null;

      case DashboardTimeframe.ThisWeek:
        return weekGap;

      case DashboardTimeframe.ThisMonth:
        return monthGap;

      case DashboardTimeframe.ThisYear:
        return yearGap;

      default:
        return '';
    }
  }, [filters.timeframe]);

  return (
    <Flex>
      <Dropdown
        store={comboboxTimeframe}
        data={timeframeOptions}
        headerLabel={t('dashboard.filters.timeframe.dropdownHeader')}
        onOptionSubmit={(value) => {
          comboboxTimeframe.closeDropdown();
          setFilters({ [DashboardQueryParams.timeframe.key]: value as DashboardTimeframe });
          // Add timeframe param to url
          const url = new URL(window.location.href);
          url.searchParams.set(DashboardQueryParams.timeframe.key, value as DashboardTimeframe);
          window.history.replaceState({}, '', url.toString());
        }}
      >
        <Button
          variant="outline"
          size="medium"
          leftSection={<CalendarBlank size={16} />}
          onClick={() => comboboxTimeframe.toggleDropdown()}
          className={classes['dashboard-filters__single-button']}
        >
          <Flex>
            <Text fz={14}>{activeTimeFrameLabel}</Text>
            {filters.timeframe !== DashboardTimeframe.LastDay && (
              <Divider ml={SPACING.xs} color="dark.5" size="xs" p={SPACING.xxs} orientation="vertical" />
            )}

            <Text fz={14}>{activeTimeFrameInterval}</Text>
          </Flex>
        </Button>
      </Dropdown>
    </Flex>
  );
}
