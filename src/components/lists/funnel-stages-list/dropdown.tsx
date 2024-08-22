'use client';

import { useCombobox } from '@mantine/core';
import { DotsThreeVertical, PencilSimple, Trash } from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo } from 'react';

import { Dropdown } from '@/components/ui/dropdown';
import { SPACING } from '@/resources/constants';

export function MoreOptionsDropdown({
  handleDelete,
  handleRename
}: {
  handleDelete: () => void;
  handleRename: () => void;
}) {
  const t = useTranslations();
  const moreOptionsStore = useCombobox();

  const onRename = useCallback(() => {
    handleRename();
    moreOptionsStore.closeDropdown();
  }, [handleRename, moreOptionsStore]);

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
      },
      {
        value: '',
        label: t('common.rename'),
        onClick: onRename,
        leftContent: <PencilSimple size={SPACING.sm} />
      }
    ],
    [t, onDelete, onRename]
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
