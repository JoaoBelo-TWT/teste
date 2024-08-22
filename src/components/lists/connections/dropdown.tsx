'use client';

import { useCombobox } from '@mantine/core';
import { DotsThreeVertical } from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { Dropdown } from '@/components/ui/dropdown';

import classes from './index.module.css';
import { ItemProps } from './types';

export function MoreOptionsDropdown({ connection }: { connection: ItemProps }) {
  const t = useTranslations();
  const moreOptionsStore = useCombobox();

  const moreOptions = useMemo(
    () => [
      {
        value: connection.id,
        label: t('website.connections.table.remove'),
        disabled: true
      }
    ],
    [t, connection]
  );

  return (
    <div className={classes.connections__dropdown}>
      <Dropdown
        position="bottom-end"
        store={moreOptionsStore}
        data={moreOptions}
        headerLabel={t('website.connections.table.moreOptions')}
        onClick={() => moreOptionsStore.openDropdown()}
        withinPortal={false}
      >
        <DotsThreeVertical size={25} />
      </Dropdown>
    </div>
  );
}
