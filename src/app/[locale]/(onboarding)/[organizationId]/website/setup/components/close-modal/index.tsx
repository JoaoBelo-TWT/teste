'use client';

import { Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { removeWebsite } from '@/app/[locale]/(onboarding)/actions/remove-website';
import { ModalButtons } from '@/components/modals/modal-buttons';
import { ModalHeader } from '@/components/modals/modal-header';
import { useModal } from '@/context/modal';
import { BUTTON_VARIANT } from '@/resources/constants';
import { routes } from '@/routes/routes';

export interface DashboardCreateModalProps {
  href?: string;
  clearOnboardingStep?: boolean;
}

type ModalData = {
  dashboardId?: string;
  websiteId: string;
};

export function WebsiteCreationCloseModal() {
  const t = useTranslations();
  const router = useRouter();
  const { destroyModal, data } = useModal<ModalData>();

  const handleClick = async () => {
    await removeWebsite(data.websiteId);
    router.push(routes.homePage.path);
    destroyModal();
  };

  return (
    <>
      <ModalHeader title={t('modals.closeWebsiteCreation.title')} />
      <Text>{t('modals.closeWebsiteCreation.description')}</Text>
      <Text>{t('modals.closeWebsiteCreation.description1')}</Text>
      <ModalButtons
        buttons={[
          {
            variant: BUTTON_VARIANT.OUTLINE,
            onClick: destroyModal,
            children: t('common.cancel')
          },
          {
            variant: BUTTON_VARIANT.FILLED,
            onClick: handleClick,
            children: t('common.leave')
          }
        ]}
      />
    </>
  );
}
