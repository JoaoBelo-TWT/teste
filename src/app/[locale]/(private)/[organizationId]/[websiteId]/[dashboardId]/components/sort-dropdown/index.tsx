'use client';

import { useCombobox } from '@mantine/core';
import { SortAscending } from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Dropdown } from '@/components/ui/dropdown';

import { DetailTableSort, DetailTableSortType, SortProps } from './types';

export function SortDropdown({ setSort, sort }: Readonly<SortProps>) {
  const t = useTranslations();
  const store = useCombobox();
  const sortOptions = [
    { value: DetailTableSort.PHASE_ASCENDING, label: t('website.sort.phaseAscending') },
    { value: DetailTableSort.PHASE_DESCENDING, label: t('website.sort.phaseDescending') },
    { value: DetailTableSort.REGION, label: t('website.sort.region') },
    { value: DetailTableSort.PAGE_URL, label: t('website.sort.pageUrl') },
    { value: DetailTableSort.PLATFORM_URL, label: t('website.sort.platformUrl') },
    { value: DetailTableSort.EMAIL, label: t('website.sort.email') }
  ];

  return (
    <Dropdown
      store={store}
      data={sortOptions}
      headerLabel={t('common.sortBy')}
      onOptionSubmit={(value) => {
        setSort(sort === (value as DetailTableSortType) ? null : (value as DetailTableSortType));
        store.closeDropdown();
      }}
    >
      <Button
        variant="light"
        size="medium"
        leftSection={<SortAscending size={16} />}
        onClick={() => store.toggleDropdown()}
      >
        {t(`website.sort.${sort}`)}
      </Button>
    </Dropdown>
  );
}
