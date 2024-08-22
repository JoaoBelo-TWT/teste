'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Flex, InputLabel, Loader } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { auth0GetUser } from '@/app/[locale]/(onboarding)/(email-verification)/verify-email/action/auth0-get-user';
import { updateUser } from '@/app/[locale]/(onboarding)/account/setup/actions/update-user';
import { saveCurrentOnboardingPath } from '@/app/[locale]/(onboarding)/actions/save-current-onboarding-path';
import { SelectControl } from '@/components/controls/select-control';
import { ButtonForm } from '@/components/ui/button-form';
import { TextInput, labelProps } from '@/components/ui/text-input';
import { useEffectOnceWhen } from '@/hooks/use-effect-once';
import { routes } from '@/routes/routes';
import { showResponseToast } from '@/utils/server-actions/show-response-toast';

import classes from './index.module.css';
import { Step1FormData, Step1Schema } from './schemas';
import { Step1FormProps } from './types';

export function Step1Form({ accountData, companyRoles }: Readonly<Step1FormProps>) {
  const t = useTranslations();
  const router = useRouter();
  const [disabledFields, setDisabledFields] = useState<boolean>(true);

  const defaultValues = {
    firstName: accountData.firstName ?? '',
    lastName: accountData.lastName ?? '',
    companyRoleId: accountData.companyRoleId ?? ''
  };

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitSuccessful, isSubmitting }
  } = useForm<Step1FormData>({
    resolver: zodResolver(Step1Schema(t)),
    mode: 'onSubmit',
    defaultValues
  });

  const handleGetUserName = () => {
    auth0GetUser().then((res) => {
      if (res.data?.given_name) {
        /* eslint-disable i18next/no-literal-string */
        setValue('firstName', res.data?.given_name);
      }
      if (res.data?.family_name) {
        setValue('lastName', res.data?.family_name);
      }
      setDisabledFields(false);
    });
  };

  useEffectOnceWhen(() => {
    handleGetUserName();
  }, true);

  const formAction: () => Promise<void> = handleSubmit(async (formData) => {
    const response = await updateUser({
      id: accountData.id,
      ...formData
    });

    showResponseToast({ response });

    if (response?.successMessage) {
      const route = accountData.defaultOrganizationId ? routes.homePage.path : routes.account.setup.step2.path;

      if (!accountData.defaultOrganizationId) {
        saveCurrentOnboardingPath(route);
      }

      router.push(route);
    }
  });

  return (
    <form action={formAction} className={classes['form-1']}>
      <div className={classes['form-1__name']}>
        <Flex align="center">
          <InputLabel {...labelProps} htmlFor={`first-name-input`} id="first-name-input-label">
            {t('onboarding.account.step1.name')}
          </InputLabel>
          {disabledFields && <Loader size={10} />}
        </Flex>
        <div className={classes['form-1__name-input']}>
          <TextInput
            defaultValue={defaultValues.firstName}
            w={'50%'}
            error={errors?.firstName?.message}
            placeholder={t('onboarding.account.step1.first')}
            {...register('firstName')}
            id="first-name-input"
            disabled={disabledFields}
          />
          <TextInput
            w={'50%'}
            defaultValue={defaultValues.lastName}
            error={errors?.lastName?.message}
            placeholder={t('onboarding.account.step1.last')}
            {...register('lastName')}
            disabled={disabledFields}
          />
        </div>
      </div>

      <SelectControl
        label={t('onboarding.account.step2.role')}
        placeholder={t('onboarding.account.step2.rolePlaceholder')}
        error={errors.companyRoleId?.message}
        control={control}
        allowDeselect={false}
        name="companyRoleId"
        data={companyRoles}
        defaultValue={defaultValues.companyRoleId}
      />
      <TextInput label={t('onboarding.account.step1.email')} defaultValue={accountData.email} disabled />
      <div className={classes['form-1__button-container']}>
        <ButtonForm variant="filled" type="submit" size="large" loading={isSubmitSuccessful || isSubmitting}>
          {t('common.continue')}
        </ButtonForm>
      </div>
    </form>
  );
}
