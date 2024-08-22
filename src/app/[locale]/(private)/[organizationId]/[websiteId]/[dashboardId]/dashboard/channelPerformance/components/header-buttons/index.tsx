'use client';

import { useCombobox } from '@mantine/core';
import { SortAscending } from '@phosphor-icons/react';
import { FunnelSimple } from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';

import { ChannelPerformanceSorting } from '@/__generated__/graphql';
import { Button } from '@/components/ui/button';
import { Dropdown } from '@/components/ui/dropdown';
import { useNavigationStore } from '@/context/navigation/store';
import { DashboardQueryParams } from '@/types/constants/dashboard-query-params';

import { HeaderButtonsProps } from '../../types';

import classes from './index.module.css';

export function HeaderButtons({ funnelsFilterOptions }: Readonly<HeaderButtonsProps>) {
  const t = useTranslations();
  const { setFilters, filters } = useNavigationStore();
  const comboboxChannel = useCombobox();
  const comboboxPerformance = useCombobox();

  const { channelSorting, channel } = filters;

  const performanceSortingOptions = [
    {
      value: ChannelPerformanceSorting.Cost,
      label: t('dashboard.overview.performanceCard.filters.performance.dropdownOptions.cost')
    },
    {
      value: ChannelPerformanceSorting.Performance,
      label: t('dashboard.overview.performanceCard.filters.performance.dropdownOptions.performance')
    },
    {
      value: ChannelPerformanceSorting.Spend,
      label: t('dashboard.overview.performanceCard.filters.performance.dropdownOptions.spend')
    }
  ];

  const selectedChannel =
    // eslint-disable-next-line max-len
    funnelsFilterOptions.find((f) => f?.value === channel)?.label || funnelsFilterOptions.find((f) => f)?.label; // NOSONAR

  return (
    <div className={classes['header-buttons__container']}>
      <Dropdown
        store={comboboxChannel}
        data={funnelsFilterOptions}
        headerLabel={t('common.display')}
        onOptionSubmit={(value) => {
          setFilters({ [DashboardQueryParams.channel.key]: value });
          comboboxChannel.closeDropdown();
        }}
      >
        <Button
          variant="light"
          size="medium"
          leftSection={<FunnelSimple size={16} />}
          onClick={() => comboboxChannel.toggleDropdown()}
        >
          {selectedChannel}
        </Button>
      </Dropdown>

      <Dropdown
        store={comboboxPerformance}
        data={performanceSortingOptions}
        headerLabel={t('dashboard.overview.performanceCard.filters.performance.dropdownHeader')}
        onOptionSubmit={(value) => {
          setFilters({ [DashboardQueryParams.channelSorting.key]: value as ChannelPerformanceSorting });
          comboboxPerformance.closeDropdown();
        }}
      >
        <Button
          variant="light"
          size="medium"
          leftSection={<SortAscending size={16} />}
          onClick={() => comboboxPerformance.toggleDropdown()}
        >
          {performanceSortingOptions.find((option) => option.value === channelSorting)?.label}
        </Button>
      </Dropdown>
    </div>
  );
}
