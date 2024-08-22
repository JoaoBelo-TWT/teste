'use client';

import { Flex, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { useModal } from '@/context/modal';
import { SPACING } from '@/resources/constants';

export function ModalError() {
  const { destroyModal } = useModal();
  const t = useTranslations();

  return (
    <Flex direction="column" gap={SPACING.xs} miw={350}>
      <Text>{t('modals.error.description')}</Text>
      <Flex gap={SPACING.xs} justify="start">
        <Button onClick={() => destroyModal()} variant="filled">
          {t('modals.error.closeButton')}
        </Button>
      </Flex>
    </Flex>
  );
}
