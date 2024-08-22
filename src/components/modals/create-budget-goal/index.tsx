'use client';

import { useTranslations } from 'next-intl';

import { ModalError } from '@/components/modals/error';
import { ModalHeader } from '@/components/modals/modal-header';
import { useModal } from '@/context/modal';

import { CreateBudgetGoalForm } from '../../forms/create-budget-goal-form';

export function CreateBudgetGoalModal() {
  const t = useTranslations('modals.budgetGoal');
  const { data: dashboardId } = useModal();

  if (!dashboardId) return <ModalError />;

  return (
    <>
      <ModalHeader title={t('title')} />
      <CreateBudgetGoalForm dashboardId={dashboardId as string} />
    </>
  );
}
