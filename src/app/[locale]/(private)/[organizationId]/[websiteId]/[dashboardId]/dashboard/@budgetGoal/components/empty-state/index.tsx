'use client';

import { Flex, Text, Title } from '@mantine/core';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

import { BaseCard } from '@/components/ui/base-card';
import { Button } from '@/components/ui/button';
import { useModal } from '@/context/modal';
import { MODALS, SPACING } from '@/resources/constants';

import { DashboardPathParams } from '../../../types';

export default function BudgetGoalEmptyState() {
  const t = useTranslations('dashboard.overview.budgetGoalCard');
  const { setModal, setData } = useModal();
  const { dashboardId } = useParams<DashboardPathParams>();

  const handleClick = useCallback(() => {
    setData(dashboardId);
    setModal(MODALS.CREATE_BUDGET_GOAL);
  }, [dashboardId, setData, setModal]);

  return (
    <BaseCard paperProps={{ shadow: '0' }}>
      <Flex direction="column" align="center" justify="center" gap={SPACING.xxs}>
        <Title order={3} mb={SPACING.sm}>
          {t('title')}
        </Title>
        <Text mb={SPACING.xs}>{t('empty')}</Text>

        <Button onClick={handleClick} variant="filled">
          + {t('addButton')}
        </Button>
      </Flex>
    </BaseCard>
  );
}
