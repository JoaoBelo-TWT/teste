/* eslint-disable i18next/no-literal-string */

'use client';

import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

import { GetWebsiteQuery } from '@/__generated__/graphql';
import EditableDetailsList from '@/components/lists/editable-details';
import { toaster } from '@/components/ui/toast';
import { useMutationUpdateWebsite } from '@/lib/react-query/website/mutation-update-website';
import { useMutationUpdateWebsiteImage } from '@/lib/react-query/website/mutation-update-website-image';

export default function WebsiteDetailsList({
  websiteData,
  viewOnly
}: Readonly<{ websiteData: GetWebsiteQuery; viewOnly?: boolean }>) {
  const t = useTranslations();

  const mutationOptions = {
    onSuccess: () => {
      toaster.success({
        title: t('common.success')
      });
    },
    onError: () =>
      toaster.success({
        title: t('common.error')
      })
  };

  const mutateData = useMutationUpdateWebsite(websiteData.website.id, mutationOptions);
  const mutateImage = useMutationUpdateWebsiteImage(websiteData.website.id, mutationOptions);

  // eslint-disable-next-line @typescript-eslint/require-await
  const updateWebsiteImageAction = async (imageBase64: string) => {
    mutateImage.mutate({ websiteId: websiteData.website.id, imageBase64 });
  };

  const updateHandler = useCallback(
    // eslint-disable-next-line @typescript-eslint/require-await
    async (value: string, type: string) => {
      mutateData.mutate({ id: websiteData.website.id, [type]: value });
    },
    [mutateData, websiteData.website.id]
  );

  const initialWebsiteDetails = [
    {
      label: t('website.details.detailsList.name'),
      value: websiteData?.website.name,
      onSave: (value: string) => updateHandler(value, 'name')
    },
    {
      label: t('website.details.detailsList.image'),
      value: websiteData?.website.imageUrl,
      type: 'image',
      onSave: updateWebsiteImageAction
    },
    { label: t('website.details.detailsList.organization'), value: websiteData?.website.organization.name },
    {
      label: t('website.details.detailsList.websiteUrl'),
      value: websiteData?.website.domain,
      onSave: async (value: string) => updateHandler(value, 'url')
    },
    {
      label: t('website.details.detailsList.createdBy'),
      value: `${websiteData?.website?.user?.firstName} ${websiteData?.website?.user?.lastName}`
    },
    {
      label: t('website.details.detailsList.dateCreated'),
      value: dayjs(websiteData?.website.createdAt).format('YYYY-MM-DD')
    }
  ];

  return <EditableDetailsList viewOnly={viewOnly} details={initialWebsiteDetails} />;
}
