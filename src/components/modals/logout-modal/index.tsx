'use client';

import { Flex, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { useModal } from '@/context/modal';
import { BUTTON_VARIANT, SPACING } from '@/resources/constants';
import { routes } from '@/routes/routes';

import { ModalButtons } from '../modal-buttons';
import { ModalHeader } from '../modal-header';

export function LogoutModal() {
  const { destroyModal } = useModal();
  const t = useTranslations();
  const router = useRouter();
  const [loggingOut, setIsLoggingOut] = useState<boolean>(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    router.push(routes.api.logout.path);
  };

  return (
    <>
      <ModalHeader title={t('modals.logout.title')} />
      <Flex direction="column" gap={SPACING.xs}>
        <Text>{loggingOut ? t('modals.logout.descriptionLogOut') : t('modals.logout.description')}</Text>
        <ModalButtons
          buttons={[
            {
              variant: BUTTON_VARIANT.OUTLINE,
              onClick: destroyModal,
              children: t('modals.logout.cancelButton'),
              disabled: loggingOut
            },
            {
              variant: BUTTON_VARIANT.FILLED,
              children: t('modals.logout.confirmButton'),
              onClick: handleLogout,
              loading: loggingOut
            }
          ]}
        />
      </Flex>
    </>
  );
}
