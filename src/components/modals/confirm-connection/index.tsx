'use client';

import { Flex, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { useModal } from '@/context/modal';
import { BUTTON_VARIANT } from '@/resources/constants';

import { ModalButtons } from '../modal-buttons';
import { ModalHeader } from '../modal-header';

type ConfirmDataProps = {
  connection: string;
  href: string;
};

export function ConfirmConnectionModal() {
  const { destroyModal, data } = useModal<ConfirmDataProps>();
  const t = useTranslations();
  const router = useRouter();
  const [loggingOut, setIsLoggingOut] = useState<boolean>(false);
  const { connection, href }: ConfirmDataProps = data;

  const handleConnection = () => {
    setIsLoggingOut(true);
    router.push(href);
  };

  return (
    <>
      <ModalHeader title={`${t('common.connect')} ${connection}?`} />
      <Flex direction="column">
        <Text c="dark.7">{t('modals.confirmConnection.description', { connection })}</Text>
        <Text c="dark.7" mb="sm" maw={600}>
          {t('modals.confirmConnection.description2', { connection })}
        </Text>
        <Flex mb="sm">
          <Text c="red.9">{t('modals.confirmConnection.important')}</Text>
          <Text c="dark.7">{t('modals.confirmConnection.importantDescription')}</Text>
        </Flex>
        <Text c="dark.7">{t('modals.confirmConnection.confirmQuestion')}</Text>
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
              children: `${t('common.connect')} ${connection}`,
              onClick: handleConnection,
              loading: loggingOut
            }
          ]}
        />
      </Flex>
    </>
  );
}
