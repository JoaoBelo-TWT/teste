import { Box, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { AddExpenseForm } from '@/components/forms/add-expenses-form';
import { ModalError } from '@/components/modals/error';
import { ModalHeader } from '@/components/modals/modal-header';
import { useModal } from '@/context/modal';
import { SPACING } from '@/resources/constants';

export function AddExpenseModal() {
  const t = useTranslations('modals.createExpense');
  const { data: dashboardId } = useModal();

  if (!dashboardId) return <ModalError />;

  return (
    // eslint-disable-next-line i18next/no-literal-string
    <Box display={'table-caption'}>
      <ModalHeader title={t('title')} />
      <Text c={'dark.7'} mb={SPACING.sm}>
        {t('subtitle')}
      </Text>
      <AddExpenseForm dashboardId={dashboardId as string} />
    </Box>
  );
}
