'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { TextInput } from '@/components/ui/text-input';
import { toaster } from '@/components/ui/toast';
import { SPACING } from '@/resources/constants';
import { routes } from '@/routes/routes';

import { ConnectGoogleAdds } from './action';
import classes from './index.module.css';
import { ConnectGoogleAddsFormData, ConnectGoogleAddsSchema } from './schemas';

export function ConnectGoogleAddsForm({
  websiteId,
  organizationId,
  redirectToConnectionsPage
}: {
  websiteId: string;
  organizationId: string;
  redirectToConnectionsPage?: boolean;
}) {
  const t = useTranslations();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting, isLoading }
  } = useForm<ConnectGoogleAddsFormData>({
    mode: 'onSubmit',
    resolver: zodResolver(ConnectGoogleAddsSchema(t)),
    defaultValues: {
      customerId: undefined
    }
  });

  // TODO: Add "formData" object to the async arrow function
  const formAction: () => Promise<void> = handleSubmit(async () => {
    // TODO: pass {...formData} to the ConnectGoogleAdds function and do the integration there
    const response = await ConnectGoogleAdds();

    if (response.successMessage) {
      toaster.success({ title: t('actions.googleAdsConnection.successMessage') });

      if (redirectToConnectionsPage) {
        router.push(routes.website.connections.path(organizationId, websiteId));
      } else {
        router.back();
      }
    } else {
      toaster.error({ title: t('actions.googleAdsConnection.errorMessage') });
    }
  });

  return (
    <form action={formAction} className={classes['connect-google-ads-form__wrapper']}>
      <TextInput
        label={t('website.connectGoogleAdds.googleCustomerId')}
        mb={SPACING.xl}
        fz="body2"
        lh="body2"
        error={errors?.customerId?.message}
        placeholder={t('website.connectGoogleAdds.placeholder')}
        {...register('customerId')}
      />

      <Button disabled={!watch('customerId')} loading={isSubmitting || isLoading} size="medium" type="submit">
        {t('website.connectGoogleAdds.connectButton')}
      </Button>
    </form>
  );
}
