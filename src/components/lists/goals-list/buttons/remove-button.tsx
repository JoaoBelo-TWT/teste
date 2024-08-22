'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { useModal } from '@/context/modal';
import { MODALS } from '@/resources/constants';

import { RemoveActivity as RemoveActivityAction, RemoveBudget as RemoveBudgetAction } from '../action';

import { RemoveDropdown } from './remove-dropdown';
import { RemoveProps } from './types';

export function RemoveButton({ id, variant, isEdit, type = 'budget' }: Readonly<RemoveProps>) {
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setModal, setData } = useModal();

  const handleDelete = async () => {
    if (id) {
      setIsLoading(true);
      if (type === 'budget') {
        await RemoveBudgetAction(id);
      } else {
        await RemoveActivityAction(id);
      }

      setIsLoading(false);
    }
  };

  const handleConfirmDelete = () => {
    setData({ id });
    setModal(type === 'budget' ? MODALS.DELETE_BUDGET_GOAL : MODALS.DELETE_ACTIVITY_GOAL);
  };

  if (isEdit) {
    return <RemoveDropdown handleDelete={handleConfirmDelete} />;
  }

  return (
    <Button onClick={handleDelete} variant={variant ?? 'white'} size="small" loading={isLoading}>
      {t('common.remove')}
    </Button>
  );
}
