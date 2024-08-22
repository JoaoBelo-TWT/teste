import { Checkbox, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { ModalButtons } from '@/components/modals/modal-buttons';
import { ModalHeader } from '@/components/modals/modal-header';
import { useModal } from '@/context/modal';
import { BUTTON_VARIANT, SPACING } from '@/resources/constants';
import { routes } from '@/routes/routes';

import { removeDashboard } from '../../../actions/remove-dashboard';
import { saveCurrentOnboardingPath } from '../../../actions/save-current-onboarding-path';

export interface DashboardCreateModalProps {
  dashboardId?: string;
  href?: string;
  clearOnboardingStep?: boolean;
}

export function DashboardCreateCloseModal() {
  const t = useTranslations();
  const router = useRouter();
  const [deleteDashboard, setDeleteDashboard] = useState<boolean>(false);
  const { data, destroyModal, setData } = useModal();
  const { dashboardId, href, clearOnboardingStep } = data as DashboardCreateModalProps;

  const handleClick = () => {
    if (dashboardId && deleteDashboard) {
      removeDashboard(dashboardId);
    }

    saveCurrentOnboardingPath(clearOnboardingStep ? null : href).then(() => {
      router.push(routes.homePage.path);
    });
    destroyModal();
    setData(null);
  };

  return (
    <>
      <ModalHeader title={t('modals.closeDashboardCreate.title')} />
      <Text mb={SPACING.sm}>{t('modals.closeDashboardCreate.description')}</Text>
      {dashboardId && typeof dashboardId === 'string' && (
        <Checkbox
          label={t('modals.closeDashboardCreate.deleteDashboard')}
          checked={deleteDashboard}
          onChange={(event) => setDeleteDashboard(event.currentTarget.checked)}
        />
      )}
      <ModalButtons
        buttons={[
          {
            variant: BUTTON_VARIANT.OUTLINE,
            onClick: destroyModal,
            children: t('common.cancel')
          },
          {
            variant: BUTTON_VARIANT.DANGER,
            onClick: handleClick,
            children: t('common.ok')
          }
        ]}
      />
    </>
  );
}
