'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Text } from '@mantine/core';
import clsx from 'clsx';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  CreateCustomerFunnelStageEventConditionInput,
  EventType,
  UrlCondition,
  VisitorType
} from '@/__generated__/graphql';
import { saveCurrentOnboardingPath } from '@/app/[locale]/(onboarding)/actions/save-current-onboarding-path';
import { ModalButtons } from '@/components/modals/modal-buttons';
import { BaseCard } from '@/components/ui/base-card';
import { Button } from '@/components/ui/button';
import { Tabs } from '@/components/ui/tabs';
import { TextInput } from '@/components/ui/text-input';
import { Tooltip } from '@/components/ui/tooltip';
import { useModal } from '@/context/modal';
import { BUTTON_VARIANT, SPACING } from '@/resources/constants';
import { routes } from '@/routes/routes';
import { showResponseToast } from '@/utils/server-actions/show-response-toast';

import { UpdateCustomerFunnelStage } from './action';
import { ActionTab } from './action-tab';
import classes from './index.module.css';
import { PageViewTab } from './page-view-tab';
import { UpdateStageEventsFormData, UpdateStageEventsSchema } from './schema';
import { StageEventFormProps } from './types';

export const STAGE_EVENT_FORM_ID = 'stage-event-form';

export function StageEventForm({
  funnelStageId,
  nextStageId,
  dashboardId,
  data,
  flow,
  isOnboarding,
  isOnEditModal,
  hideSubmitButton
}: Readonly<StageEventFormProps>) {
  const t = useTranslations();
  const params = useParams<{ organizationId: string; websiteId: string }>();
  const { destroyModal } = useModal();

  const initialValues: UpdateStageEventsFormData = {
    name: '',
    pageViewConditions: [
      {
        pageUrl: '',
        visitorType: VisitorType.Unique
      }
    ],
    actionConditions: [
      {
        destinationUrlCondition: UrlCondition.Matches,
        startingUrlCondition: UrlCondition.Matches,
        startingUrl: null,
        destinationUrl: null
      }
    ]
  };

  const router = useRouter();
  const [activeEventType, setActiveEventType] = useState<EventType>(data?.eventType ?? EventType.PageView);

  const {
    handleSubmit,
    control,
    register,
    formState: { errors, touchedFields, isSubmitting, isValid }
  } = useForm<UpdateStageEventsFormData>({
    mode: 'onSubmit',
    defaultValues: data?.values ?? initialValues,
    resolver: zodResolver(UpdateStageEventsSchema(t))
  });

  const disabledPageViewTab = data?.values !== undefined && data?.values.pageViewConditions?.length === 0;
  const disabledActionTab = data?.values !== undefined && data?.values.actionConditions?.length === 0;

  const formAction: () => Promise<void> = handleSubmit(async ({ name, actionConditions, pageViewConditions }) => {
    const conditions =
      activeEventType === EventType.PageView
        ? (pageViewConditions as CreateCustomerFunnelStageEventConditionInput[])
        : (actionConditions as CreateCustomerFunnelStageEventConditionInput[]);

    const response = await UpdateCustomerFunnelStage({
      id: funnelStageId,
      customerFunnelStageEvents: [{ name, eventType: activeEventType, customerFunnelStageEventConditions: conditions }]
    });
    if (isOnEditModal) {
      destroyModal();
    }
    showResponseToast({ response, showSuccessMessages: true });

    // Only redirect if its not being used in a modal
    if (response.successMessage && !isOnEditModal && dashboardId) {
      let route: string;
      if (nextStageId) {
        route = routes.dashboard.dashboardCreate.createStageEvents.path(
          params.organizationId,
          params.websiteId,
          dashboardId,
          nextStageId,
          flow
        );
      } else {
        route = routes.dashboard.dashboardCreate.allSet.path(params.organizationId, params.websiteId, dashboardId);
      }
      if (isOnboarding) {
        saveCurrentOnboardingPath(route);
      }

      router.push(route);
    }
  });

  const handleTabChange = (value: string | null) => setActiveEventType(value as EventType);

  return (
    <>
      <form id={STAGE_EVENT_FORM_ID} action={formAction} className={clsx(classes['stage-event-form'])} noValidate>
        <BaseCard
          paperProps={{
            classNames: {
              root: clsx(classes['stage-event-form__card-root'])
            }
          }}
        >
          <div className={clsx(classes['stage-event-form__header-input-container'])}>
            <Text mb={SPACING.sm} fz="caption2" lh="body2" c="dark.9" tt="uppercase">
              {t('common.eventName')}
            </Text>
            <TextInput
              error={errors.name?.message}
              variant="unstyled"
              placeholder={t('onboarding.stages.form.namePlaceholder')}
              classNames={{
                input: classes['stage-event-form__header-input']
              }}
              autoFocus
              {...register('name')}
            />
          </div>
          <Tabs keepMounted={false} value={activeEventType} onChange={handleTabChange}>
            <Tabs.List classNames={{ list: classes['stage-event-form__tabs-list'] }}>
              <Tabs.Tab
                c={errors.pageViewConditions ? 'red.8' : 'dark.9'}
                disabled={disabledPageViewTab}
                value={EventType.PageView}
                classNames={{ tab: classes['stage-event-form__tabs-tab'] }}
              >
                {disabledPageViewTab ? (
                  <Tooltip label={t('onboarding.stages.form.disabledTooltip')}>
                    <Box>{t('onboarding.stages.form.pageViewTab')}</Box>
                  </Tooltip>
                ) : (
                  t('onboarding.stages.form.pageViewTab')
                )}
              </Tabs.Tab>
              <Tabs.Tab
                c={errors.actionConditions ? 'red.8' : 'dark.9'}
                disabled={disabledActionTab}
                value={EventType.Action}
              >
                {disabledActionTab ? (
                  <Tooltip label={t('onboarding.stages.form.disabledTooltip')}>
                    <Box>{t('onboarding.stages.form.actionTab')}</Box>
                  </Tooltip>
                ) : (
                  t('onboarding.stages.form.actionTab')
                )}
              </Tabs.Tab>
            </Tabs.List>

            <PageViewTab errors={errors} control={control} register={register} />
            <ActionTab
              touchedFields={touchedFields.actionConditions}
              errors={errors}
              control={control}
              register={register}
            />
          </Tabs>
        </BaseCard>

        {!hideSubmitButton && (
          <Button
            type="submit"
            variant="filled"
            size="small"
            className={classes['stage-event-form__submit-button']}
            loading={isSubmitting && isValid}
          >
            {t('onboarding.stages.form.continueButton')}
          </Button>
        )}
      </form>
      {isOnEditModal && (
        <ModalButtons
          buttons={[
            {
              variant: BUTTON_VARIANT.OUTLINE,
              disabled: isSubmitting,
              onClick: destroyModal,
              children: t('common.cancel')
            },
            {
              loading: isSubmitting && isValid,
              disabled: isSubmitting && isValid,
              onClick: formAction,
              children: t('common.save')
            }
          ]}
        />
      )}
    </>
  );
}
