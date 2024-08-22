'use client';

import { useTranslations } from 'next-intl';

import { GetOrganizationPermissionsQuery, GetOrganizationQuery } from '@/__generated__/graphql';
import { updateOrganization } from '@/app/[locale]/(onboarding)/account/setup/actions/update-user';
import EditableDetailsList from '@/components/lists/editable-details';
import { updateOrganizationImage } from '@/lib/mutations/update-organization-image';
import { showResponseToast } from '@/utils/server-actions/show-response-toast';

export default function OrganizationDetailsList({
  organizationData,
  permissionsData,
  viewOnly
}: Readonly<{
  organizationData: GetOrganizationQuery;
  permissionsData: GetOrganizationPermissionsQuery;
  viewOnly?: boolean;
}>) {
  const t = useTranslations('organization-settings.organizationDetailsList');

  const updateOrganizationNameAction = async (name: string) => {
    const response = await updateOrganization({ id: organizationData.organization.id, name });
    showResponseToast({ response, showSuccessMessages: true });
  };

  const updateOrganizationImageAction = async (imageBase64: string) => {
    const response = await updateOrganizationImage({ organizationId: organizationData.organization.id, imageBase64 });
    showResponseToast({ response, showSuccessMessages: true });
  };

  const initialOrganizationDetails = [
    { label: t('name'), value: organizationData.organization.name, onSave: updateOrganizationNameAction },
    {
      label: t('image'),
      value: organizationData.organization.imageUrl,
      type: 'image',
      onSave: updateOrganizationImageAction
    },
    { label: t('teamMembers'), value: permissionsData.permissions.totalTeamMembers?.toString() }
  ];

  return <EditableDetailsList viewOnly={viewOnly} details={initialOrganizationDetails} />;
}
