'use client';

import { ComboboxData } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { ActivityGoal } from '@/__generated__/graphql';
import { ModalError } from '@/components/modals/error';
import { ModalHeader } from '@/components/modals/modal-header';
import { useModal } from '@/context/modal';

import { EditActivityGoalForm } from '../../forms/edit-activity-goal-form';

interface EditActivityGoalModalProps {
  data?: { dashboardId?: string; customerFunnelStages?: ComboboxData; activityGoal: ActivityGoal };
}

export function EditActivityGoalModal() {
  const t = useTranslations('modals.activityGoal');
  const { data }: EditActivityGoalModalProps | undefined = useModal();

  const dashboardId = data?.dashboardId;
  const customerFunnelStages = data?.customerFunnelStages;
  const activityGoal = data?.activityGoal;

  if (!dashboardId || !customerFunnelStages || !activityGoal) return <ModalError />;

  return (
    <>
      <ModalHeader title={t('title')} />
      <EditActivityGoalForm
        activityGoal={activityGoal}
        dashboardId={dashboardId}
        customerFunnelStages={customerFunnelStages}
      />
    </>
  );
}
