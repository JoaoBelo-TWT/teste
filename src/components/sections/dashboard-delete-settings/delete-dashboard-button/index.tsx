'use client';

import { Trash } from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { useModal } from '@/context/modal';
import { MODALS, SPACING } from '@/resources/constants';

export function DeleteDashboardButton({ dashboardId }: { dashboardId: string }) {
  const t = useTranslations();
  const { setModal, setData } = useModal();

  const handleConfirmDeleteDashboard = () => {
    setData({ dashboardId });
    setModal(MODALS.DELETE_DASHBOARD);
  };

  return (
    <Button
      leftSection={<Trash size={SPACING.sm} />}
      variant="danger"
      size="medium"
      onClick={handleConfirmDeleteDashboard}
    >
      {t('common.deleteDashboard')}
    </Button>
  );
}
