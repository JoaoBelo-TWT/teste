'use client';

import { useCombobox } from '@mantine/core';
import { FunnelSimple } from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Dropdown } from '@/components/ui/dropdown';

import { DetailPageFilter, DetailPageFilterType, FilterProps } from './types';

export function FilterDropdown({ setFilter, filter }: Readonly<FilterProps>) {
  const t = useTranslations();
  const store = useCombobox();

  const filterOptions = [
    { value: DetailPageFilter.PAID_AND_ORGANIC, label: t('website.filter.paidAndOrganic') },
    { value: DetailPageFilter.ORGANIC, label: t('website.filter.organic') },
    { value: DetailPageFilter.PAID, label: t('website.filter.paid') }
  ];

  return (
    <Dropdown
      store={store}
      data={filterOptions}
      headerLabel={t('common.sortBy')}
      onOptionSubmit={(value) => {
        setFilter(filter === (value as DetailPageFilterType) ? null : (value as DetailPageFilterType));
        store.closeDropdown();
      }}
    >
      <Button
        variant="light"
        size="medium"
        leftSection={<FunnelSimple size={16} />}
        onClick={() => store.toggleDropdown()}
      >
        {t(`website.filter.${filter}`)}
      </Button>
    </Dropdown>
  );
}
