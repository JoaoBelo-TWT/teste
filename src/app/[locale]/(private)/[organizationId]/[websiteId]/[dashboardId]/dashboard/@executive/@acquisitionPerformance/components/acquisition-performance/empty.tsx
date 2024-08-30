'use client';

import { Plus } from '@phosphor-icons/react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Overlay } from '@/components/ui/overlay';
import { routes } from '@/routes/routes';
import { EmptyStateProps } from '@/types/common';
import { OnboardingFlowType } from '@/types/enums/new-dashboard-query-params';

import { mockChartData } from './mock';
import { AcquisitionPerformanceUI } from './ui';

export default function AcquisitionPerformanceEmpty({
  variant = 'no-goals',
  websiteId,
  dashboardId,
  organizationId
}: Readonly<EmptyStateProps>) {
  const t = useTranslations();
  return (
    <AcquisitionPerformanceUI
      headerTitle={t('dashboard.overview.acquisitionPerformanceCard.title')}
      chart={{ data: mockChartData, XMax: 200, YMax: 200, XMin: 200 }}
      endContent={
        variant === 'no-goals' ? (
          <Overlay
            title={t('common.noCustomerFunnels')}
            endContent={
              <Link
                href={routes.dashboard.dashboardCreate.customerFunnel.path(
                  organizationId,
                  websiteId,
                  dashboardId,
                  // TODO: SA-635 - When we have multiple dashboard types we can fetch this from the API
                  OnboardingFlowType.EXECUTIVE
                )}
              >
                <Button leftSection={<Plus size={16} />} size="large" variant="filled">
                  {t('common.addCustomerFunnels')}
                </Button>
              </Link>
            }
          />
        ) : (
          <Overlay
            title={t('common.noWebsiteConnected')}
            endContent={
              <Link href={routes.website.connections.path(organizationId, websiteId)}>
                <Button leftSection={<Plus size={16} />} size="large" variant="filled">
                  {t('common.connectWebsite')}
                </Button>
              </Link>
            }
          />
        )
      }
    />
  );
}
