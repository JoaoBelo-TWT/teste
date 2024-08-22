'use client';

import { ComboboxData } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { ModalError } from '@/components/modals/error';
import { ModalHeader } from '@/components/modals/modal-header';
import { useModal } from '@/context/modal';

import { CreateActivityGoalForm } from '../../forms/create-activity-goal-form';

interface CreateActivityGoalModalProps {
  data?: { dashboardId?: string; customerFunnelStages?: ComboboxData };
}

export function CreateActivityGoalModal() {
  const t = useTranslations('modals.activityGoal');
  const { data }: CreateActivityGoalModalProps | undefined = useModal();

  const dashboardId = data?.dashboardId;
  const customerFunnelStages = data?.customerFunnelStages;

  if (!dashboardId || !customerFunnelStages) return <ModalError />;

  return (
    <>
      <ModalHeader title={t('title')} />
      <CreateActivityGoalForm dashboardId={dashboardId} customerFunnelStages={customerFunnelStages} />
    </>
  );
}
