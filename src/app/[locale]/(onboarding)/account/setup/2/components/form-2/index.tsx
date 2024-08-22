'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { createOrganization, updateOrganization } from '@/app/[locale]/(onboarding)/account/setup/actions/update-user';
import { SelectControl } from '@/components/controls/select-control';
import { ButtonForm } from '@/components/ui/button-form';
import { TextInput } from '@/components/ui/text-input';
import { routes } from '@/routes/routes';
import { showResponseToast } from '@/utils/server-actions/show-response-toast';

import { saveCurrentOnboardingPath } from '../../../../../actions/save-current-onboarding-path';

import classes from './index.module.css';
import { Step2Schema, Step2FormData } from './schemas';
import { Step2FormProps } from './types';

export function Step2Form({
  organizationData,
  companyIndustries,
  companySizes,
  isOnboarding
}: Readonly<Step2FormProps>) {
  const t = useTranslations();
  const router = useRouter();

  const defaultValues = {
    name: organizationData?.node.name ?? '',
    companyIndustryId: organizationData?.node.companyIndustryId ?? '',
    companySizeId: organizationData?.node.companySizeId ?? ''
  };

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitSuccessful, isSubmitting }
  } = useForm<Step2FormData>({
    resolver: zodResolver(Step2Schema(t)),
    mode: 'onSubmit',
    defaultValues
  });

  const formAction: () => Promise<void> = handleSubmit(async (formData) => {
    if (!organizationData?.node.id) {
      const response = await createOrganization({
        ...formData
      });
      if (response?.successMessage && response?.data !== null) {
        const newOrg = response.data && response.data.data;
        if (newOrg) {
          const route = routes.website.setup.start?.path(newOrg.createOrganization.id);
          if (isOnboarding) {
            saveCurrentOnboardingPath(route);
          }

          router.push(route);
        }
      }

      showResponseToast({ response });
    } else {
      const response = await updateOrganization({
        id: organizationData.node.id,
        ...formData
      });

      if (response.successMessage && response.data !== null) {
        const updatedOrg = response?.data?.data;
        if (updatedOrg) {
          const route = routes.website.setup.start?.path(updatedOrg.updateOrganization.id);
          if (isOnboarding) {
            saveCurrentOnboardingPath(route);
          }

          router.push(route);
        }
      }

      showResponseToast({ response });
    }
  });

  return (
    <form action={formAction} className={classes['form-2']}>
      <TextInput
        error={errors?.name?.message}
        defaultValue={defaultValues.name}
        label={t('onboarding.account.step1.company')}
        placeholder={t('onboarding.account.step1.companyName')}
        {...register('name')}
      />

      <SelectControl
        label={t('onboarding.account.step2.industry')}
        placeholder={t('onboarding.account.step2.industryPlaceholder')}
        error={errors.companyIndustryId?.message}
        control={control}
        allowDeselect={false}
        name="companyIndustryId"
        data={companyIndustries}
        defaultValue={defaultValues.companyIndustryId}
      />

      <SelectControl
        label={t('onboarding.account.step2.companySize')}
        placeholder={t('onboarding.account.step2.companySizePlaceholder')}
        error={errors.companySizeId?.message}
        control={control}
        allowDeselect={false}
        name="companySizeId"
        data={companySizes}
        defaultValue={defaultValues.companySizeId}
      />

      <div className={classes['form-2__button-container']}>
        <ButtonForm variant="filled" type="submit" size="medium" loading={isSubmitSuccessful || isSubmitting}>
          {t('common.continue')}
        </ButtonForm>
      </div>
    </form>
  );
}
