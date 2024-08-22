'use client';

import { Text } from '@mantine/core';
import { Plus } from '@phosphor-icons/react/dist/ssr';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { useModal } from '@/context/modal';
import { MODALS } from '@/resources/constants';

export function ExpensesModalButton() {
  const params = useParams<{ dashboardId: string }>();
  const { setModal, setData } = useModal();
  const t = useTranslations();

  useEffect(() => {
    setData(params.dashboardId);
  }, [setData, params.dashboardId]);

  return (
    <Button
      leftSection={<Plus size={16} color="black" />}
      variant="light"
      onClick={() => setModal(MODALS.ADD_EXPENSE)}
      radius={'xl'}
    >
      <Text> {t('modals.createExpense.title')}</Text>
    </Button>
  );
}
