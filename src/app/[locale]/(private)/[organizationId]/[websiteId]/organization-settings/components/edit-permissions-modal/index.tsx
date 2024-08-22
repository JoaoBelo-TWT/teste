'use client';

import { Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { AccessLevel } from '@/__generated__/graphql';
import { ModalError } from '@/components/modals/error';
import { ModalButtons } from '@/components/modals/modal-buttons';
import { ModalHeader } from '@/components/modals/modal-header';
import { useModal } from '@/context/modal';
import { BUTTON_VARIANT, SPACING } from '@/resources/constants';
import { showResponseToast } from '@/utils/server-actions/show-response-toast';

import { editPermission } from './action';

export interface EditPermissionsModalProps {
  name?: string;
  permission?: string;
  accessLevel?: AccessLevel;
  permissionId?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export function EditPermissionsModal() {
  const t = useTranslations('organization-settings');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data } = useModal();
  const { name, permissionId, accessLevel, onConfirm, onCancel } = data as EditPermissionsModalProps;

  if (!name || !permissionId || !accessLevel || !onConfirm || !onCancel) return <ModalError />;

  const handleEdit = async () => {
    setIsLoading(true);
    if (permissionId) {
      const response = await editPermission({ id: permissionId, accessLevel });

      if (response.successMessage) {
        onConfirm();
      }

      showResponseToast({ response, showSuccessMessages: true });
    }

    setIsLoading(false);
  };

  return (
    <>
      <ModalHeader title={t('editPermissionsTitle')} close={onCancel} />
      <Text mb={SPACING.sm}>{t('editPermissionsDescription', { name })}</Text>
      <ModalButtons
        buttons={[
          {
            variant: BUTTON_VARIANT.OUTLINE,
            onClick: onCancel,
            children: t('cancelButton'),
            disabled: isLoading
          },
          {
            variant: BUTTON_VARIANT.FILLED,
            onClick: handleEdit,
            children: t('confirmButton'),
            loading: isLoading
          }
        ]}
      />
    </>
  );
}
