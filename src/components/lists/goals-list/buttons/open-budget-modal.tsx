'use client';

import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

import { BudgetGoal } from '@/__generated__/graphql';
import { Button } from '@/components/ui/button';
import { useModal } from '@/context/modal';
import { MODALS } from '@/resources/constants';

export function OpenBudgetModalButton({
  dashboardId,
  isEdit = false,
  text,
  variant,
  budgetGoal
}: {
  dashboardId?: string;
  isEdit?: boolean;
  text?: string;
  variant?: string;
  budgetGoal?: BudgetGoal | null;
}) {
  const t = useTranslations();
  const params = useParams<{ dashboardId: string }>();
  const { setModal, setData } = useModal();

  const handleClick = useCallback(() => {
    if (isEdit) {
      setData({ dashboardId: dashboardId ?? params.dashboardId, budgetGoal });
      setModal(MODALS.EDIT_BUDGET_GOAL);
    } else {
      setData(dashboardId ?? params.dashboardId);
      setModal(MODALS.CREATE_BUDGET_GOAL);
    }
  }, [params.dashboardId, setData, setModal, dashboardId, isEdit, budgetGoal]);

  return (
    <Button size="small" onClick={handleClick} variant={variant ?? 'light'}>
      {text ?? t('common.add')}
    </Button>
  );
}
