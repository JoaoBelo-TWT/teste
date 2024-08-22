'use client';

import { useCombobox } from '@mantine/core';
import { DotsThreeVertical, Trash } from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo } from 'react';

import { Dropdown } from '@/components/ui/dropdown';
import { SPACING } from '@/resources/constants';

export function RemoveDropdown({ handleDelete }: { handleDelete: () => void }) {
  const t = useTranslations();
  const moreOptionsStore = useCombobox();

  const onDelete = useCallback(() => {
    handleDelete();
    moreOptionsStore.closeDropdown();
  }, [handleDelete, moreOptionsStore]);

  const moreOptions = useMemo(
    () => [
      {
        value: '',
        label: t('common.remove'),
        onClick: onDelete,
        leftContent: <Trash size={SPACING.sm} />
      }
    ],
    [t, onDelete]
  );

  return (
    <Dropdown
      position="bottom-end"
      store={moreOptionsStore}
      data={moreOptions}
      onClick={() => moreOptionsStore.openDropdown()}
      withinPortal={false}
      noPadding
    >
      <DotsThreeVertical size={25} />
    </Dropdown>
  );
}
