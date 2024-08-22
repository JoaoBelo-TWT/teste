import { Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { removeDashboard } from '@/app/[locale]/(onboarding)/actions/remove-dashboard';
import { ModalHeader } from '@/components/modals/modal-header';
import { toaster } from '@/components/ui/toast';
import { useModal } from '@/context/modal';
import { BUTTON_VARIANT, SPACING } from '@/resources/constants';

import { ModalError } from '../error';
import { ModalButtons } from '../modal-buttons';

export interface DashboardDeleteModalProps {
  dashboardId?: string;
}

export function DashboardDeleteModal() {
  const t = useTranslations();
  const { data, destroyModal } = useModal<DashboardDeleteModalProps>();
  const [loading, setIsLoading] = useState<boolean>(false);

  if (!data?.dashboardId) return <ModalError />;

  const handleClick = async () => {
    if (data.dashboardId) {
      setIsLoading(true);
      const response = await removeDashboard(data.dashboardId);

      if (response.successMessage) {
        toaster.success({ title: t('actions.deleteDashboard.successMessage') });
      } else {
        toaster.error({ title: t('actions.deleteDashboard.errorMessage') });
      }
      setIsLoading(false);
    }

    destroyModal();
  };

  return (
    <>
      <ModalHeader title={t('modals.deleteDashboard.title')} />
      <Text>{t('modals.deleteDashboard.description')}</Text>
      <Text mb={SPACING.sm}>{t('modals.deleteDashboard.description2')}</Text>
      <Text mb={SPACING.lg}>{t('common.cantBeUndone')}</Text>
      <ModalButtons
        buttons={[
          {
            disabled: loading,
            variant: BUTTON_VARIANT.OUTLINE,
            onClick: destroyModal,
            children: t('common.cancel')
          },
          {
            loading,
            variant: BUTTON_VARIANT.DANGER,
            onClick: handleClick,
            children: t('common.delete')
          }
        ]}
      />
    </>
  );
}
