'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { DashboardType } from '@/__generated__/graphql';
import { saveCurrentOnboardingPath } from '@/app/[locale]/(onboarding)/actions/save-current-onboarding-path';
import { ButtonForm } from '@/components/ui/button-form';
import { TextInput } from '@/components/ui/text-input';
import { routes } from '@/routes/routes';
import { OnboardingFlowType } from '@/types/enums/new-dashboard-query-params';
import { showResponseToast } from '@/utils/server-actions/show-response-toast';

import { createDashboard } from './action';
import classes from './index.module.css';
import { CreateDashboardFormData, CreateDashboardSchema } from './schema';

export function CreateDashboardForm({
  flow,
  organizationId,
  websiteId,
  isOnboarding
}: Readonly<{ flow: OnboardingFlowType; organizationId: string; websiteId: string; isOnboarding?: boolean | null }>) {
  const t = useTranslations();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting }
  } = useForm<CreateDashboardFormData>({
    resolver: zodResolver(CreateDashboardSchema(t)),
    mode: 'onSubmit',
    defaultValues: {
      name: ''
    }
  });

  const formAction: () => Promise<void> = handleSubmit(async ({ name }) => {
    const response = await createDashboard({ name, websiteId, dashboardType: DashboardType.Executive });

    showResponseToast({ response });

    if (response?.successMessage) {
      const route = routes.dashboard.dashboardCreate.goals.path(
        organizationId,
        websiteId,
        response.data?.createDashboard.id ?? '',
        flow
      );
      if (isOnboarding) {
        saveCurrentOnboardingPath(route);
      }
      router.push(route);
    }
  });

  return (
    <form action={formAction} className={classes['create-dashboard']}>
      <TextInput
        error={errors?.name?.message}
        label={t('dashboard.new.dashboardNameLabel')}
        placeholder={t('dashboard.new.dashboardNamePlaceholder')}
        {...register('name')}
      />

      <div>
        <ButtonForm variant="filled" type="submit" size="small" loading={isSubmitSuccessful || isSubmitting}>
          {t('common.continue')}
        </ButtonForm>
      </div>
    </form>
  );
}
