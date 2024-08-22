'use client';

import { X } from '@phosphor-icons/react';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import { IconButton } from '@/components/ui/icon-button';
import { useModal } from '@/context/modal';
import { MODALS } from '@/resources/constants';

import { DashboardCreateModalProps } from './close-modal';

export function DashboardCreateCloseButton({ href, clearOnboardingStep }: Readonly<DashboardCreateModalProps>) {
  const { setData, setModal } = useModal();
  const params = useParams<{ dashboardId: string }>();
  useEffect(() => {
    setData({ dashboardId: params.dashboardId, href, clearOnboardingStep });
  }, [params, href, clearOnboardingStep, setData]);

  return (
    <IconButton
      color="var(--mantine-color-dark-9)"
      size={44}
      radius={100}
      onClick={() => setModal(MODALS.CREATE_CLOSE_DASHBOARD)}
    >
      <X />
    </IconButton>
  );
}
