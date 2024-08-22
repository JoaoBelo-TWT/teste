'use client';

import { Box, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { SelectorsQuery } from '@/__generated__/graphql';
// eslint-disable-next-line max-len
import { ConnectFormsForm } from '@/app/[locale]/(onboarding)/[organizationId]/website/setup/[websiteId]/forms/components/connect-forms-form';
import { useModal } from '@/context/modal';

import { ModalHeader } from '../modal-header';

export interface FunnelDeleteModalProps {
  websiteId: string;
  organizationId: string;
  websiteSelectors: SelectorsQuery | null | undefined;
  reload: () => void;
}

export function UpsertQuerySelectorsModal() {
  const t = useTranslations('modals.upsertQuerySelectors');
  const { destroyModal, data } = useModal<FunnelDeleteModalProps>();

  return (
    <Box maw={686}>
      <ModalHeader title={t('title')} />
      <Text c="dark.7" mb={20}>
        {t('description')}
      </Text>

      <ConnectFormsForm
        websiteId={data.websiteId}
        organizationId={data.organizationId}
        websiteSelectors={data.websiteSelectors}
        isOnboarding={false}
        continueButtonCopy={t('continueButton')}
        successCallback={destroyModal}
      />
    </Box>
  );
}
