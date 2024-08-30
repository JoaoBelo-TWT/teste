'use client';

import { useCombobox } from '@mantine/core';
import { SortAscending } from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { PageViewsSorting } from '@/__generated__/graphql';
import { Button } from '@/components/ui/button';
import { Dropdown } from '@/components/ui/dropdown';
import { useNavigationStore } from '@/context/navigation/store';
import { DashboardQueryParams } from '@/types/constants/dashboard-query-params';

export function PagesSorting() {
  const t = useTranslations();
  const comboboxChannel = useCombobox();
  const { filters, setFilters } = useNavigationStore();

  const sortingOptions = useMemo(
    () => [
      {
        value: PageViewsSorting.MostViews,
        label: t('dashboard.overview.activityCard.topPagesCard.filters.pagesViewsSorting.dropdownOptions.mostViews')
      },
      {
        value: PageViewsSorting.MostConversions,
        label: t(
          'dashboard.overview.activityCard.topPagesCard.filters.pagesViewsSorting.dropdownOptions.mostConversions'
        )
      }
    ],
    [t]
  );

  return (
    <Dropdown
      store={comboboxChannel}
      data={sortingOptions}
      headerLabel={t('common.display')}
      onOptionSubmit={(value) => {
        setFilters({ [DashboardQueryParams.pagesSorting.key]: value as PageViewsSorting });
        comboboxChannel.closeDropdown();
      }}
    >
      <Button
        variant="light"
        size="medium"
        leftSection={<SortAscending size={16} />}
        onClick={() => comboboxChannel.toggleDropdown()}
      >
        {sortingOptions.find((option) => (option.value) === filters.pagesSorting)?.label}
      </Button>
    </Dropdown>
  );
}
