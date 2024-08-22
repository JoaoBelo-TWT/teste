'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { HeroControl } from '@/components/controls/hero-control';
import { SelectControl } from '@/components/controls/select-control';
import { ButtonForm } from '@/components/ui/button-form';
import { useModal } from '@/context/modal';
import { ActivityGoalFormData, ActivityGoalSchema } from '@/types/goals';
import { showResponseToast } from '@/utils/server-actions/show-response-toast';

import { UpdateActivityGoal } from './action';
import classes from './index.module.css';
import { ActivityGoalFormProps } from './types';

export function EditActivityGoalForm({
  dashboardId,
  activityGoal,
  customerFunnelStages
}: Readonly<ActivityGoalFormProps>) {
  const t = useTranslations();
  const { destroyModal } = useModal();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitSuccessful, isSubmitting }
  } = useForm<ActivityGoalFormData>({
    mode: 'onSubmit',
    resolver: zodResolver(ActivityGoalSchema(t)),
    defaultValues: {
      numberOfEvents: activityGoal.numberOfEvents,
      customerFunnelStageId: activityGoal.customerFunnelStageId
    }
  });

  const formAction: () => Promise<void> = handleSubmit(async (formData) => {
    const response = await UpdateActivityGoal({ ...formData, dashboardId, id: activityGoal.id });

    if (response) {
      destroyModal();
      showResponseToast({ response, showSuccessMessages: true });
    } else {
      showResponseToast({ response });
    }
  });

  return (
    <form action={formAction} className={classes['edit-activity-goal-form']}>
      <HeroControl
        data-autofocus
        error={errors?.numberOfEvents?.message}
        label={t('modals.activityGoal.numberOfEventsLabel')}
        hideControls
        thousandSeparator=","
        placeholder="1,000"
        control={control}
        variant="unstyled"
        name="numberOfEvents"
      />
      <SelectControl
        label={t('modals.activityGoal.customerFunnelStageLabel')}
        w={'100%'}
        error={errors?.customerFunnelStageId?.message}
        control={control}
        allowDeselect={false}
        name="customerFunnelStageId"
        data={customerFunnelStages}
      />

      <div className={classes['edit-activity-goal-form__submit-container']}>
        <ButtonForm
          variant="outline"
          onClick={destroyModal}
          size="large"
          w={198}
          disabled={isSubmitSuccessful || isSubmitting}
        >
          {t('common.cancel')}
        </ButtonForm>
        <ButtonForm variant="filled" type="submit" size="large" w={198} loading={isSubmitSuccessful || isSubmitting}>
          {t('common.save')}
        </ButtonForm>
      </div>
    </form>
  );
}
