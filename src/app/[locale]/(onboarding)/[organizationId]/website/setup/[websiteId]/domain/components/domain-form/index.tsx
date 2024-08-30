'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { GetWebsiteQuery } from '@/__generated__/graphql';
import { saveCurrentOnboardingPath } from '@/app/[locale]/(onboarding)/actions/save-current-onboarding-path';
import { Button } from '@/components/ui/button';
import { TextInput } from '@/components/ui/text-input';
import { toaster } from '@/components/ui/toast';
import { useMutationUpdateWebsite } from '@/lib/react-query/website/mutation-update-website';
import { routes } from '@/routes/routes';

import classes from './index.module.css';
import { DomainFormData, DomainFormSchema } from './schema';

export function DomainForm({
  data,
  organizationId,
  isOnboarding
}: Readonly<{ data: GetWebsiteQuery; organizationId: string; isOnboarding?: boolean }>) {
  const t = useTranslations();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, errors }
  } = useForm<DomainFormData>({
    mode: 'onSubmit',
    defaultValues: {
      domain: data.website.domain ?? '',
      id: data.website.id
    },
    resolver: zodResolver(DomainFormSchema)
  });

  const mutate = useMutationUpdateWebsite(data.website.id, {
    onSuccess: () => {
      toaster.success({ title: t('common.success') });
      const route = routes.website.setup.forms.path(organizationId, data.website.id);
      if (isOnboarding) {
        saveCurrentOnboardingPath(route);
      }

      router.push(route);
    },
    onError: () => toaster.error({ title: t('common.success') })
  });

  const formAction: () => Promise<void> = handleSubmit(({ domain, id }) => {
    mutate.mutate({ id, domain });
  });

  return (
    <form action={formAction} className={classes['domain-form']}>
      <TextInput
        w={'100%'}
        error={errors.domain?.message}
        placeholder={t('onboarding.setup.step5.websitePlaceholder')}
        {...register('domain')}
      />

      <Button type="submit" variant="filled" size="md" loading={isSubmitting || isSubmitSuccessful}>
        {t('onboarding.setup.continueButton')}
      </Button>
    </form>
  );
}
