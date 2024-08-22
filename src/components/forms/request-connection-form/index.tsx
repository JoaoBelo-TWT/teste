'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { TextInput } from '@/components/ui/text-input';
import { toaster } from '@/components/ui/toast';

import { RequestConnection } from './action';
import classes from './index.module.css';
import { RequestConnectionFormData, RequestConnectionSchema } from './schemas';

export function RequestConnectionForm() {
  const t = useTranslations();
  const [disableInput, setDisableInput] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors, isSubmitting, isLoading }
  } = useForm<RequestConnectionFormData>({
    mode: 'onSubmit',
    resolver: zodResolver(RequestConnectionSchema(t)),
    defaultValues: {
      requestedConnection: undefined
    }
  });

  const formAction: () => Promise<void> = handleSubmit(async (formData) => {
    const response = await RequestConnection({ ...formData });

    if (response.successMessage) {
      toaster.success({ title: t('actions.requestConnection.successMessage') });
      setValue('requestedConnection', '');
      setDisableInput(true);
    } else {
      toaster.error({ title: t('actions.requestConnection.errorMessage') });
    }
  });

  return (
    <form action={formAction} className={classes['request-connection-form__wrapper']}>
      <Text fz="body2" lh="body2" c="dark.7" mb={12}>
        {t('onboarding.setup.step3.requestConnectionTitle')}
      </Text>
      <div className={classes['request-connection-form']}>
        <TextInput
          fz="body2"
          lh="body2"
          disabled={disableInput}
          classNames={{ input: classes['request-connection-form__container'] }}
          rightSection={
            <Button
              disabled={!watch('requestedConnection')}
              loading={isSubmitting || isLoading}
              size="small"
              type="submit"
              variant="outline"
              mr={78}
              miw="100"
              bg="white"
            >
              {t('onboarding.setup.submitButton')}
            </Button>
          }
          error={errors?.requestedConnection?.message}
          placeholder={t('onboarding.setup.step3.requestConnection')}
          {...register('requestedConnection')}
        />
      </div>
    </form>
  );
}
