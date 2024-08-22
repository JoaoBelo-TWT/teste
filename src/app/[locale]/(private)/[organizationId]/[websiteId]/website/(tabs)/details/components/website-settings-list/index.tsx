'use client';

import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { GetWebsiteQuery } from '@/__generated__/graphql';
import EditableDetailsList from '@/components/lists/editable-details';
import { updateWebsiteDomain } from '@/lib/mutations/update-website-domain';
import { updateWebsiteImage } from '@/lib/mutations/update-website-image';
import { updateWebsiteName } from '@/lib/mutations/update-website-name';
import { showResponseToast } from '@/utils/server-actions/show-response-toast';

export default function WebsiteDetailsList({
  websiteData,
  viewOnly
}: Readonly<{ websiteData: GetWebsiteQuery; viewOnly?: boolean }>) {
  const t = useTranslations('website.details');

  const updateWebsiteDomainAction = async (domain: string) => {
    const response = await updateWebsiteDomain({ id: websiteData.website.id, domain });
    showResponseToast({ response, showSuccessMessages: true });
  };

  const updateWebsiteNameAction = async (name: string) => {
    const response = await updateWebsiteName({ id: websiteData.website.id, name });
    showResponseToast({ response, showSuccessMessages: true });
  };

  const updateWebsiteImageAction = async (imageBase64: string) => {
    const response = await updateWebsiteImage({ websiteId: websiteData.website.id, imageBase64 });
    showResponseToast({ response, showSuccessMessages: true });
  };

  const createdByName = useMemo(
    () => `${websiteData?.website?.user?.firstName} ${websiteData?.website?.user?.lastName}`,
    [websiteData]
  );

  const initialWebsiteDetails = [
    { label: t('detailsList.name'), value: websiteData?.website.name, onSave: updateWebsiteNameAction },
    {
      label: t('detailsList.image'),
      value: websiteData?.website.imageUrl,
      type: 'image',
      onSave: updateWebsiteImageAction
    },
    { label: t('detailsList.organization'), value: websiteData?.website.organization.name },
    {
      label: t('detailsList.websiteUrl'),
      value: websiteData?.website.domain,
      onSave: updateWebsiteDomainAction
    },
    { label: t('detailsList.createdBy'), value: createdByName },
    { label: t('detailsList.dateCreated'), value: dayjs(websiteData?.website.createdAt).format('YYYY-MM-DD') }
  ];

  return <EditableDetailsList viewOnly={viewOnly} details={initialWebsiteDetails} />;
}
