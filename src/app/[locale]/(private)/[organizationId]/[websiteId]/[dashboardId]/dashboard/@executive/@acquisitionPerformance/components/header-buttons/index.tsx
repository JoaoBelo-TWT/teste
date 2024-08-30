'use client';

import { useCombobox } from '@mantine/core';
import { SortAscending } from '@phosphor-icons/react';
import { FunnelSimple } from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';

import { Channels } from '@/__generated__/graphql';
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

  const { channel, acquisitionChannel } = filters;
  const selectedChannel = funnelsFilterOptions.find((f) => f?.value === channel)?.label || channel;

  const channelFilterOptions = [
    {
      value: '',
      label: t('general.channels.all')
    },
    {
      value: Channels.Direct,
      label: t('general.channels.direct')
    },
    {
      value: Channels.Email,
      label: t('general.channels.email')
    },
    {
      value: Channels.Other,
      label: t('general.channels.other')
    },
    {
      value: Channels.Referrals,
      label: t('general.channels.referrals')
    },
    {
      value: Channels.Search,
      label: t('general.channels.search')
    },
    {
      value: Channels.Social,
      label: t('general.channels.social')
    }
  ];
  return (
    <div className={classes['header-buttons__container']}>
      <Dropdown
        store={comboboxChannel}
        data={funnelsFilterOptions}
        headerLabel={t('common.funnelStage')}
        onOptionSubmit={(value) => {
          setFilters({
            [DashboardQueryParams.channel.key]: funnelsFilterOptions.find((funnel) => funnel.value === value)?.label
          });
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
        data={channelFilterOptions}
        headerLabel={t('common.channel')}
        onOptionSubmit={(value) => {
          setFilters({ [DashboardQueryParams.acquisitionChannel.key]: value as Channels });
          comboboxPerformance.closeDropdown();
        }}
      >
        <Button
          variant="light"
          size="medium"
          leftSection={<SortAscending size={16} />}
          onClick={() => comboboxPerformance.toggleDropdown()}
        >
          {acquisitionChannel
            ? channelFilterOptions.find((option) => option.value === acquisitionChannel)?.label
            : channelFilterOptions[0].label}
        </Button>
      </Dropdown>
    </div>
  );
}
