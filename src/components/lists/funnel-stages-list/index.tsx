'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { v4 as getRandomId } from 'uuid';

import { GetFunnelStagesQuery } from '@/__generated__/graphql';
import { saveCurrentOnboardingPath } from '@/app/[locale]/(onboarding)/actions/save-current-onboarding-path';
import { List } from '@/components/lists/list';
import { Button } from '@/components/ui/button';
import { routes } from '@/routes/routes';
import { OnboardingFlowType } from '@/types/enums/new-dashboard-query-params';
import { showResponseToast } from '@/utils/server-actions/show-response-toast';

import { UpsertFunnelStages } from './action';
import classes from './index.module.css';
import { Item } from './item';
import { CreateFunnelFormData, CreateFunnelSchema } from './schemas';

export const FORM_ID = 'funnel-stages-form';

export function FunnelStagesList({
  funnelStages,
  flow,
  isOnboarding,
  dashboardId,
  websiteId,
  organizationId,
  useModalsToEdit = false,
  viewOnly
}: Readonly<{
  funnelStages: GetFunnelStagesQuery | null | undefined;
  dashboardId: string;
  flow?: OnboardingFlowType;
  isOnboarding?: boolean;
  websiteId?: string;
  organizationId?: string;
  useModalsToEdit?: boolean;
  viewOnly?: boolean;
}>) {
  const t = useTranslations();
  const router = useRouter();

  const existingStages = useMemo(
    () =>
      funnelStages?.customerFunnelStages?.edges?.map((stage) => ({
        dashboardId,
        name: stage.node.name,
        id: stage.node.id
      })) ?? [],
    [funnelStages, dashboardId]
  );

  const defaultStages = useModalsToEdit
    ? []
    : [
        {
          dashboardId,
          name: t('onboarding.funnels.leads')
        },
        {
          dashboardId,
          name: t('onboarding.funnels.mqls')
        },
        {
          dashboardId,
          name: t('onboarding.funnels.sqls')
        },
        {
          dashboardId,
          name: t('onboarding.funnels.customers')
        }
      ];

  const defaultValues = {
    stages: existingStages.length > 0 ? existingStages : defaultStages
  };

  const {
    control,
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting, isLoading }
  } = useForm<CreateFunnelFormData>({
    mode: 'onSubmit',
    defaultValues,
    resolver: zodResolver(CreateFunnelSchema(t))
  });

  const { fields, remove, move, append, replace } = useFieldArray({ control, name: 'stages' });

  const items = watch('stages');

  const formAction: () => Promise<void> = handleSubmit(async (formData) => {
    const response = await UpsertFunnelStages(formData.stages);

    showResponseToast({ response, showSuccessMessages: true });

    if (response.successMessage) {
      // Reset the form to its current values to clear the dirty state

      replace(response.data?.upsertCustomerFunnelStage.map(({ __typename, ...rest }) => rest) || fields);
      reset({ stages: response.data?.upsertCustomerFunnelStage.map(({ __typename, ...rest }) => rest) || fields });

      if (websiteId && organizationId && !useModalsToEdit) {
        const route = routes.dashboard.dashboardCreate.createStageEvents.path(
          organizationId,
          websiteId,
          dashboardId,
          response.data?.upsertCustomerFunnelStage?.at(0)?.id ?? '',
          flow
        );

        if (isOnboarding) {
          saveCurrentOnboardingPath(route);
        }

        router.push(route);
      }
    }
  });

  return (
    <form id={FORM_ID} action={formAction} className={classes['funnel-stages-list__container']}>
      {fields.length > 0 && (
        <List
          showItemIndex
          move={move}
          isDraggable={!viewOnly}
          droppableId={'funnel-stages'}
          items={fields.map((field, index) => ({
            id: field.id,
            key: `${field.id}${index}${getRandomId()}`,
            children: (
              <Item
                onRemove={remove}
                index={index}
                value={items}
                register={register}
                editInlineInput={field.name === ''}
                errorMessage={errors?.stages?.[index]?.message}
                disableDelete={fields.length === 1}
                useModalsToEdit={useModalsToEdit}
                formAction={formAction}
                viewOnly={viewOnly}
                loading={index + 1 > existingStages.length && useModalsToEdit}
              />
            )
          }))}
        />
      )}
      {!viewOnly && (
        <div className={classes['funnel-stages-list__button-container']}>
          <Button
            variant="transparent"
            type="button"
            size="small"
            onClick={() => append({ name: '', dashboardId })}
            leftSection={<PlusCircle size={16} />}
          >
            {t('onboarding.funnels.addPhase')}
          </Button>
          {isDirty && useModalsToEdit && (
            <div className={classes['funnel-stages-list__confirm-buttons-container']}>
              <Button variant="outline" disabled={isLoading || isSubmitting} onClick={() => reset()}>
                {t('common.cancel')}
              </Button>
              <Button type="submit" disabled={isSubmitting || isLoading} loading={isSubmitting || isLoading}>
                {t('common.save')}
              </Button>
            </div>
          )}
        </div>
      )}
    </form>
  );
}
