'use client';

import { ComboboxData } from '@mantine/core';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

import { ActivityGoal } from '@/__generated__/graphql';
import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';
import { useModal } from '@/context/modal';
import { MODALS } from '@/resources/constants';

export function OpenActivityModalButton({
  text,
  customerFunnelStages,
  dashboardId,
  variant,
  isEdit,
  activityGoal
}: Readonly<{
  customerFunnelStages?: ComboboxData;
  dashboardId?: string;
  text?: string;
  variant?: string;
  isEdit: boolean;
  activityGoal?: ActivityGoal;
}>) {
  const t = useTranslations();
  const params = useParams<{ dashboardId: string }>();
  const { setData, setModal } = useModal();
  const noFunnels = !customerFunnelStages || customerFunnelStages?.length <= 0;

  const handleClick = useCallback(() => {
    if (isEdit) {
      setData({ dashboardId: dashboardId ?? params.dashboardId, customerFunnelStages, activityGoal });
      setModal(MODALS.EDIT_ACTIVITY_GOAL);
    } else {
      setData({ dashboardId: dashboardId ?? params.dashboardId, customerFunnelStages });
      setModal(MODALS.CREATE_ACTIVITY_GOAL);
    }
  }, [customerFunnelStages, params.dashboardId, setData, setModal, dashboardId, isEdit, activityGoal]);

  const button = (
    <Button disabled={noFunnels} size="small" onClick={handleClick} variant={variant ?? 'light'}>
      {text ?? t('common.add')}
    </Button>
  );

  return (
    <>
      {noFunnels ? (
        <Tooltip position="bottom-end" maw={310} label={t('dashboard.overview.activityGoalCard.noFunnels')}>
          {button}
        </Tooltip>
      ) : (
        button
      )}
    </>
  );
}
