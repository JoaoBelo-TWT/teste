'use client';

import { useTranslations } from 'next-intl';

import { BudgetGoal } from '@/__generated__/graphql';
import { ModalError } from '@/components/modals/error';
import { ModalHeader } from '@/components/modals/modal-header';
import { useModal } from '@/context/modal';

import { EditBudgetGoalForm } from '../../forms/edit-budget-goal-form';

type ModalData = {
  dashboardId: string;
  budgetGoal: BudgetGoal;
};
export function EditBudgetGoalModal() {
  const t = useTranslations('modals.budgetGoal');
  const {
    data
  }: {
    data: ModalData;
  } = useModal();

  if (!data?.dashboardId || !data?.budgetGoal) return <ModalError />;

  return (
    <>
      <ModalHeader title={t('editTitle')} />
      <EditBudgetGoalForm dashboardId={data.dashboardId} budgetGoal={data.budgetGoal} />
    </>
  );
}
