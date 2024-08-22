'use client';

import { X } from '@phosphor-icons/react';
import { useParams } from 'next/navigation';
import { useCallback } from 'react';

import { IconButton } from '@/components/ui/icon-button';
import { useModal } from '@/context/modal';
import { MODALS } from '@/resources/constants';

export function WebsiteCreateCloseButton() {
  const { setData, setModal } = useModal();
  const params = useParams<{ dashboardId: string, websiteId: string }>();

  const openModal = useCallback(() => {
    setData({ dashboardId: params.dashboardId, websiteId: params.websiteId });
    setModal(MODALS.CREATE_WEBSITE_CLOSE);
  }, [params, setData, setModal]);

  return (
    <IconButton color="var(--mantine-color-dark-9)" size={44} radius={100} onClick={openModal}>
      <X />
    </IconButton>
  );
}
