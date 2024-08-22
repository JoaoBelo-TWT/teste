'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Flex, Text } from '@mantine/core';
import { Info } from '@phosphor-icons/react';
import { ArrowSquareOut } from '@phosphor-icons/react/dist/ssr';
import { X } from '@phosphor-icons/react/dist/ssr/X';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { SelectorsQuery } from '@/__generated__/graphql';
import { saveCurrentOnboardingPath } from '@/app/[locale]/(onboarding)/actions/save-current-onboarding-path';
import { Button } from '@/components/ui/button';
import { IconButton } from '@/components/ui/icon-button';
import { Popover } from '@/components/ui/popover';
import { TextInput } from '@/components/ui/text-input';
import { LEARN_MORE_ABOUT_PARAMS_URL, SPACING } from '@/resources/constants';
import { routes } from '@/routes/routes';
import { showResponseToast } from '@/utils/server-actions/show-response-toast';

import { UpsertSelector } from './actions/upset-website-selector';
import classes from './index.module.css';
import { ConnectFormsFormData, ConnectFormsFormSchema } from './schema';

export function ConnectFormsForm({
  websiteId,
  organizationId,
  isOnboarding,
  websiteSelectors,
  continueButtonCopy,
  isEmbeddedInForm,
  successCallback
}: Readonly<{
  websiteId: string;
  organizationId: string;
  isOnboarding?: boolean;
  websiteSelectors: SelectorsQuery | null | undefined;
  continueButtonCopy?: string;
  isEmbeddedInForm?: boolean;
  successCallback?: () => void;
}>) {
  const t = useTranslations();
  const router = useRouter();

  const existingForm = useMemo(
    () => ({
      forms:
        websiteSelectors?.selectors?.map((selector) => ({
          url: selector?.link ?? '',
          field: selector?.querySelector ?? ''
        })) ?? []
    }),
    [websiteSelectors?.selectors]
  );

  const defaultForm = {
    url: '',
    field: ''
  };

  const defaultValues = existingForm.forms.length > 0 ? existingForm : { forms: [defaultForm] };

  const {
    control,
    handleSubmit,
    register,
    formState: { isSubmitting, isSubmitSuccessful, errors }
  } = useForm<ConnectFormsFormData>({
    mode: 'onSubmit',
    defaultValues,
    resolver: zodResolver(ConnectFormsFormSchema(t))
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'forms'
  });

  const formAction: () => Promise<void> = handleSubmit(async (formData) => {
    const response = await UpsertSelector(
      formData.forms.map((form) => ({ websiteId, link: form.url, querySelector: form.field }))
    );

    showResponseToast({ response });

    if (response.successMessage) {
      const route = routes.website.setup.config.path(organizationId, websiteId);
      if (isOnboarding) {
        saveCurrentOnboardingPath(route);
      }
      if (isEmbeddedInForm) {
        router.push(route);
      }
      successCallback?.();
    }
  });

  return (
    <form action={formAction} className={classes['connect-forms-form']}>
      {fields.map((_, index) => (
        <Flex key={index} align="start" justify="start" gap={SPACING.sm} w="100%">
          <TextInput
            label={index < 1 && t('onboarding.setup.step4.urlLabel')}
            flex={1}
            error={errors.forms?.[index]?.url?.message}
            placeholder={t('onboarding.setup.step4.websitePlaceholder')}
            {...register(`forms.${index}.url` as const)}
          />
          <TextInput
            label={
              index < 1 && (
                <Flex w={'100%'}>
                  <Text flex={1} fz="caption2">
                    {t('onboarding.setup.step4.fieldLabel').toUpperCase()}
                  </Text>
                  <Popover
                    width={350}
                    label={
                      <>
                        <Text fz={14}>{t('onboarding.setup.step4.tooltipLabel')}</Text>
                        <Flex gap={5} align="center">
                          <Text fz={14}>{t('onboarding.setup.step4.tooltipLabel2')}</Text>
                          <a style={{ color: 'white' }} target="_blank" href={LEARN_MORE_ABOUT_PARAMS_URL}>
                            <Text fz={14} td="underline">
                              {t('onboarding.setup.step4.tooltipLabel3')}
                            </Text>
                          </a>
                          <ArrowSquareOut size={14} weight="bold" />
                        </Flex>
                      </>
                    }
                  >
                    <Flex gap={SPACING.xxs} align="center" c="dark.9">
                      <Info size={16} />
                      {
                        <>
                          <Text fz="caption2" td="underline">
                            {t('onboarding.setup.step4.learnMore')}
                          </Text>
                        </>
                      }
                    </Flex>
                  </Popover>
                </Flex>
              )
            }
            labelProps={{
              w: '100%'
            }}
            error={errors.forms?.[index]?.field?.message}
            placeholder={t('onboarding.setup.step4.queryPlaceholder')}
            {...register(`forms.${index}.field` as const)}
          />
          {fields.length > 1 && (
            <Flex align="center" h={47} mt={index < 1 ? 25 : 0}>
              <IconButton c="black" variant="subtle" onClick={() => remove(index)}>
                <X />
              </IconButton>
            </Flex>
          )}
        </Flex>
      ))}
      <Button mb={SPACING.lg} type="button" onClick={() => append(defaultForm)} variant="outline" size="md">
        + {t('onboarding.setup.step4.addAnotherUrl')}
      </Button>
      <Button type="submit" variant="filled" size="md" loading={isSubmitting || isSubmitSuccessful}>
        {continueButtonCopy ?? t('onboarding.setup.continueButton')}
      </Button>
    </form>
  );
}
