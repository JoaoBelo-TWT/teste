'use client';

import { ComboboxData, Flex, Text, Title } from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

import { BaseCard } from '@/components/ui/base-card';
import { Button } from '@/components/ui/button';
import { useModal } from '@/context/modal';
import { MODALS, SPACING } from '@/resources/constants';
import { routes } from '@/routes/routes';
import { OnboardingFlowType } from '@/types/enums/new-dashboard-query-params';

export default function ActivityGoalEmptyState({
  customerFunnelStages
}: Readonly<{
  customerFunnelStages: ComboboxData | undefined;
}>) {
  const t = useTranslations();
  const { setModal, setData } = useModal();
  const router = useRouter();

  const { dashboardId, websiteId, organizationId } = useParams<{
    dashboardId: string;
    websiteId: string;
    organizationId: string;
  }>();

  const noFunnels = customerFunnelStages && customerFunnelStages?.length <= 0;

  const handleClick = useCallback(() => {
    if (noFunnels) {
      router.push(
        routes.dashboard.dashboardCreate.customerFunnel.path(
          organizationId,
          websiteId,
          dashboardId,
          // TODO: SA-635 - When we have multiple dashboard types we can fetch this from the API
          OnboardingFlowType.EXECUTIVE
        )
      );
    } else {
      setData({ dashboardId, customerFunnelStages });
      setModal(MODALS.CREATE_ACTIVITY_GOAL);
    }
  }, [customerFunnelStages, dashboardId, setData, setModal, noFunnels, websiteId, organizationId, router]);

  return (
    <BaseCard paperProps={{ shadow: '0' }}>
      <Flex direction="column" align="center" justify="center" gap={SPACING.xxs}>
        <Title order={3} mb={SPACING.sm}>
          {t('dashboard.overview.activityGoalCard.title')}
        </Title>
        <Text mb={SPACING.xs} maw={320} ta="center">
          {noFunnels
            ? t('dashboard.overview.activityGoalCard.noFunnels')
            : t('dashboard.overview.activityGoalCard.empty')}
        </Text>
        <Button onClick={handleClick} variant="filled">
          + {noFunnels ? t('common.addCustomerFunnels') : t('dashboard.overview.activityGoalCard.addButton')}
        </Button>
      </Flex>
    </BaseCard>
  );
}
