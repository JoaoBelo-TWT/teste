'use client';

import { Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import EditableDetailsList from '@/components/lists/editable-details';
import { toaster } from '@/components/ui/toast';
import { useMutationUpdateDashboard } from '@/lib/react-query/dashboard/mutation-update-dashboard';

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

  const mutate = useMutationUpdateDashboard(dashboardId, {
    onSuccess: () => {
      toaster.success({
        title: t('actions.updateDashboardName.successMessage')
      });
    },
    onError: () => {
      toaster.success({
        title: t('actions.updateDashboardName.errorMessage')
      });
    }
  });

  const memoizedDashboardDetails = useMemo(
    () => [
      {
        value: dashboardName,
        // eslint-disable-next-line @typescript-eslint/require-await
        onSave: async (name: string) => {
          mutate.mutate({ id: dashboardId, name });
        }
      }
    ],
    [dashboardId, dashboardName, mutate]
  );
  return (
    <>
      <Text fw={500}>{t('website.dashboards.dashboardName')}</Text>
      <EditableDetailsList viewOnly={viewOnly} details={memoizedDashboardDetails} mt={0} />
    </>
  );
}
