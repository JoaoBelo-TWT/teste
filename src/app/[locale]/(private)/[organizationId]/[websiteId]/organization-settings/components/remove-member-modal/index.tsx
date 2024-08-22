'use client';

import { Flex, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { ModalError } from '@/components/modals/error';
import { ModalButtons } from '@/components/modals/modal-buttons';
import { ModalHeader } from '@/components/modals/modal-header';
import { useModal } from '@/context/modal';
import { BUTTON_VARIANT, SPACING } from '@/resources/constants';
import { showResponseToast } from '@/utils/server-actions/show-response-toast';

import { removePermission } from './action';

interface ModalData {
  name?: string;
  permissionId?: string;
}

export function RemoveTeamMemberModal() {
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { destroyModal, data } = useModal();

  const { name, permissionId } = data as ModalData;

  const handleRemove = async () => {
    setIsLoading(true);
    if (permissionId) {
      const response = await removePermission(permissionId);

      if (response.successMessage) {
        destroyModal();
      }

      showResponseToast({ response });
    }

    setIsLoading(false);
  };

  if (!name && !permissionId) return <ModalError />;

  return (
    <>
      <ModalHeader title={t('organization-settings.removeTeamMember')} />
      <Flex mb={SPACING.sm} gap={5}>
        <Text>{`${t('organization-settings.removeTeamMemberDescription')} `}</Text>
        <Text fw="500">{name}?</Text>
      </Flex>
      <ModalButtons
        buttons={[
          {
            variant: BUTTON_VARIANT.OUTLINE,
            onClick: destroyModal,
            children: t('common.cancel'),
            disabled: isLoading
          },
          {
            variant: BUTTON_VARIANT.FILLED,
            onClick: handleRemove,
            children: t('organization-settings.yesRemove'),
            loading: isLoading
          }
        ]}
      />
    </>
  );
}
