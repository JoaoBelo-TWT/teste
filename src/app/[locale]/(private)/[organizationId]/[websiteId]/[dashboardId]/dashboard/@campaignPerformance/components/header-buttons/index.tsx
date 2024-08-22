'use client';

import { useCombobox } from '@mantine/core';
import { FunnelSimple, SortAscending } from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';

import { CampaignSorting, CampaignStatusInput } from '@/__generated__/graphql';
import { Button } from '@/components/ui/button';
import { Dropdown } from '@/components/ui/dropdown';
import { useNavigationStore } from '@/context/navigation/store';
import { DashboardQueryParams } from '@/types/constants/dashboard-query-params';

import classes from './index.module.css';

export function HeaderButtons() {
  const t = useTranslations();
  const comboboxStatus = useCombobox();
  const comboboxSorting = useCombobox();

  const { filters, setFilters } = useNavigationStore();

  const statusOptions = [
    {
      value: CampaignStatusInput.All,
      label: t('dashboard.overview.campaignsCard.filters.campaignStatus.dropdownOptions.all')
    },
    {
      value: CampaignStatusInput.Active,
      label: t('dashboard.overview.campaignsCard.filters.campaignStatus.dropdownOptions.active')
    },
    {
      value: CampaignStatusInput.Inactive,
      label: t('dashboard.overview.campaignsCard.filters.campaignStatus.dropdownOptions.inactive')
    }
  ];
  const sortingOptions = [
    {
      value: CampaignSorting.MostRecent,
      label: t('dashboard.overview.campaignsCard.filters.campaignSorting.dropdownOptions.mostRecent')
    },
    {
      value: CampaignSorting.OldestFirst,
      label: t('dashboard.overview.campaignsCard.filters.campaignSorting.dropdownOptions.oldestFirst')
    },
    {
      value: CampaignSorting.TopPerforming,
      label: t('dashboard.overview.campaignsCard.filters.campaignSorting.dropdownOptions.topPerforming')
    }
  ];

  return (
    <div className={classes['header-buttons__container']}>
      <Dropdown
        store={comboboxStatus}
        data={statusOptions}
        headerLabel={t('common.display')}
        onOptionSubmit={(value) => {
          setFilters({ [DashboardQueryParams.campaignStatus.key]: value as CampaignStatusInput });
          comboboxStatus.closeDropdown();
        }}
      >
        <Button
          variant="light"
          size="medium"
          leftSection={<FunnelSimple size={16} />}
          onClick={() => comboboxStatus.toggleDropdown()}
        >
          {statusOptions.find((option) => option.value === filters.campaignStatus)?.label}
        </Button>
      </Dropdown>

      <Dropdown
        store={comboboxSorting}
        data={sortingOptions}
        headerLabel={t('dashboard.overview.campaignsCard.filters.campaignSorting.dropdownHeader')}
        onOptionSubmit={(value) => {
          setFilters({ [DashboardQueryParams.campaignSorting.key]: value as CampaignSorting });
          comboboxSorting.closeDropdown();
        }}
      >
        <Button
          variant="light"
          size="medium"
          leftSection={<SortAscending size={16} />}
          onClick={() => comboboxSorting.toggleDropdown()}
        >
          {sortingOptions.find((option) => option.value === filters.campaignSorting)?.label}
        </Button>
      </Dropdown>
    </div>
  );
}
