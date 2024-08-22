'use client';

import { useTranslations } from 'next-intl';

import { GetMeQuery } from '@/__generated__/graphql';
import { updateUser } from '@/app/[locale]/(onboarding)/account/setup/actions/update-user';
import EditableDetailsList from '@/components/lists/editable-details';
import { updateUserImage } from '@/lib/mutations/update-user-image';
import { showResponseToast } from '@/utils/server-actions/show-response-toast';

export default function PersonalSettingsList({
  meData
}: Readonly<{
  meData: GetMeQuery;
}>) {
  const t = useTranslations('personal-settings');

  const updateFirstNameAction = async (firstName?: string) => {
    const response = await updateUser({
      id: meData.me.id,
      firstName: firstName ?? meData.me.firstName
    });
    showResponseToast({ response, showSuccessMessages: true });
  };

  const updateImageUrlAction = async (imageBase64: string) => {
    const response = await updateUserImage({
      userId: meData.me.id,
      imageBase64
    });
    showResponseToast({ response, showSuccessMessages: true });
  };

  const updateLastNameAction = async (lastName?: string) => {
    const response = await updateUser({
      id: meData.me.id,
      lastName: lastName ?? meData.me.lastName
    });
    showResponseToast({ response, showSuccessMessages: true });
  };

  const initialPersonalDetails = [
    { label: t('firstName'), value: meData.me.firstName, onSave: updateFirstNameAction },
    { label: t('lastName'), value: meData.me.lastName, onSave: updateLastNameAction },
    {
      label: t('profileImage'),
      value: meData.me.imageUrl,
      onSave: updateImageUrlAction,
      type: 'image'
    },
    { label: t('email'), value: meData.me.email }
  ];

  return <EditableDetailsList details={initialPersonalDetails} />;
}
