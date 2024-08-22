'use client';

import { Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useMemo, useCallback } from 'react';

import EditableDetailsList from '@/components/lists/editable-details';
import { updateDashboardName } from '@/lib/mutations/update-dashboard-name';
import { showResponseToast } from '@/utils/server-actions/show-response-toast';

export function DashboardNameSettings({
  dashboardId,
  dashboardName,
  viewOnly
}: {
  dashboardId: string;
  dashboardName: string;
  viewOnly?: boolean;
}) {
  const t = useTranslations();

  const updateWebsiteNameAction = useCallback(
    async (name: string) => {
      const response = await updateDashboardName({ id: dashboardId, name });
      showResponseToast({ response, showSuccessMessages: true });
    },
    [dashboardId]
  );

  const memoizedDashboardDetails = useMemo(
    () => [{ value: dashboardName, onSave: updateWebsiteNameAction }],
    [dashboardName, updateWebsiteNameAction]
  );
  return (
    <>
      <Text fw={500}>{t('website.dashboards.dashboardName')}</Text>
      <EditableDetailsList viewOnly={viewOnly} details={memoizedDashboardDetails} mt={0} />
    </>
  );
}
