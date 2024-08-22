'use client';

import { useCombobox } from '@mantine/core';
import { FunnelSimple } from '@phosphor-icons/react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Dropdown } from '@/components/ui/dropdown';

import { DeepDiveSort, DeepDiveSortProps, DeepDiveSortType } from './types';

export function DeepDiveSortDropdown({ setSort, sort, useQueryParam }: Readonly<DeepDiveSortProps>) {
  const t = useTranslations();
  const store = useCombobox();

  const filterOptions = [
    { value: DeepDiveSort.MostRecent, label: t('deepDives.sort.MostRecent') },
    { value: DeepDiveSort.MostConversions, label: t('deepDives.sort.MostConversions') }
  ];

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <Dropdown
      store={store}
      data={filterOptions}
      headerLabel={t('common.sortBy')}
      onOptionSubmit={(value) => {
        if (useQueryParam) {
          const params = new URLSearchParams(searchParams.toString());
          params.set('sort', value);
          router.replace(`${pathname}?${params.toString()}`);
        } else {
          setSort?.(sort === (value as DeepDiveSortType) ? null : (value as DeepDiveSortType));
        }
        store.closeDropdown();
      }}
    >
      <Button
        variant="light"
        size="medium"
        leftSection={<FunnelSimple size={16} />}
        onClick={() => store.toggleDropdown()}
      >
        {t(`deepDives.sort.${sort}`)}
      </Button>
    </Dropdown>
  );
}
