'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { GetWebsiteQuery } from '@/__generated__/graphql';
import { saveCurrentOnboardingPath } from '@/app/[locale]/(onboarding)/actions/save-current-onboarding-path';
import { Button } from '@/components/ui/button';
import { TextInput } from '@/components/ui/text-input';
import { updateWebsiteDomain } from '@/lib/mutations/update-website-domain';
import { routes } from '@/routes/routes';
import { showResponseToast } from '@/utils/server-actions/show-response-toast';

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

  const formAction: () => Promise<void> = handleSubmit(async ({ domain, id }) => {
    const response = await updateWebsiteDomain({ id, domain });
    showResponseToast({ response });

    if (response?.successMessage) {
      const route = routes.website.setup.forms.path(organizationId, data.website.id);
      if (isOnboarding) {
        saveCurrentOnboardingPath(route);
      }

      router.push(route);
    }
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
