'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { AccessLevel, GetMeQuery, GetOrganizationsQuery } from '@/__generated__/graphql';
import { saveCurrentOnboardingPath } from '@/app/[locale]/(onboarding)/actions/save-current-onboarding-path';
import { SelectControl } from '@/components/controls/select-control';
import { Button } from '@/components/ui/button';
import { TextInput } from '@/components/ui/text-input';
import { UploadArea } from '@/components/ui/upload-area';
import { updateWebsiteImage } from '@/lib/mutations/update-website-image';
import { routes } from '@/routes/routes';
import { fileToBase64 } from '@/utils/files/file-to-base64';
import { showResponseToast } from '@/utils/server-actions/show-response-toast';

import { CreateWebsite } from './action';
import classes from './index.module.css';
import { WebsiteFormData, websiteFormSchema } from './schema';

export function WebsiteForm({
  data,
  userData,
  defaultOrganizationId,
  isOnboarding
}: Readonly<{
  data: GetOrganizationsQuery;
  userData: GetMeQuery;
  defaultOrganizationId: string;
  isOnboarding?: boolean;
}>) {
  const t = useTranslations();
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { isSubmitSuccessful, isSubmitting, errors }
  } = useForm<WebsiteFormData>({
    defaultValues: {
      name: '',
      organizationId: defaultOrganizationId,
      image: null
    },
    resolver: zodResolver(websiteFormSchema(t))
  });

  const [submitError, setSubmitError] = useState<boolean>(false);

  const options = data.organizations.edges.map(({ node: { id, name } }) => ({ label: name, value: id }));

  const filteredOptions = options.filter(
    (option) =>
      !userData.me.permissions?.some(
        (permission) =>
          (permission.accessLevel.toUpperCase() as AccessLevel) === AccessLevel.Read &&
          permission.organizationId === option.value
      )
  );

  const formAction: () => Promise<void> = handleSubmit(async ({ name, image, organizationId }) => {
    const response = await CreateWebsite({ name, organizationId });
    const websiteId = response?.data?.createWebsite.id;

    showResponseToast({ response });
    if (response.errorMessage) {
      setSubmitError(true);
    } else {
      setSubmitError(false);
    }

    if (websiteId && image) {
      const imageBase64 = await fileToBase64(image);
      const fileUploadResponse = await updateWebsiteImage({ websiteId, imageBase64 });

      showResponseToast({ response: fileUploadResponse });
    }

    if (websiteId) {
      const route = routes.website.setup.domain.path(organizationId, websiteId);
      if (isOnboarding) {
        saveCurrentOnboardingPath(route);
      }

      router.push(route);
    }
  });

  return (
    <form action={formAction} className={classes['website-form']}>
      <div className={classes['website-form__controls-container']}>
        {data.organizations.edges.length > 1 && (
          <SelectControl
            ta="start"
            allowDeselect={false}
            error={errors.organizationId?.message}
            control={control}
            name="organizationId"
            data={filteredOptions}
            label={t('onboarding.setup.step2.organizationLabel')}
          />
        )}
        <TextInput
          w={'100%'}
          error={errors.name?.message}
          placeholder={t('onboarding.setup.step2.namePlaceholder')}
          {...register('name')}
        />
        <div className={classes['website-form__upload-button']}>
          <UploadArea control={control} name="image" selectedImageFile={watch('image')} />
          {errors.image?.message && (
            <Text fz="sm" c="var(--mantine-color-error)">
              {errors.image?.message}
            </Text>
          )}
        </div>
      </div>

      <Button type="submit" variant="filled" size="md" loading={(isSubmitSuccessful || isSubmitting) && !submitError}>
        {t('onboarding.setup.continueButton')}
      </Button>
    </form>
  );
}
