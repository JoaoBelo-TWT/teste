'use client';

import { Plus } from '@phosphor-icons/react';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { routes } from '@/routes/routes';
import { OnboardingFlowType } from '@/types/enums/new-dashboard-query-params';

import { WelcomeCardUI } from './ui';

interface WelcomeCardEmptyProps {
  variant: 'no-goals' | 'no-data';
}
export function WelcomeCardEmpty({ variant }: Readonly<WelcomeCardEmptyProps>) {
  const t = useTranslations();
  const { dashboardId, organizationId, websiteId } = useParams<{
    dashboardId: string;
    organizationId: string;
    websiteId: string;
  }>();

  const renderButton = useMemo(
    () =>
      variant === 'no-goals' ? (
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
      ) : (
        <Link href={routes.website.connections.path(organizationId, websiteId)}>
          <Button leftSection={<Plus size={16} />} size="large" variant="filled">
            {t('common.connectWebsite')}
          </Button>
        </Link>
      ),
    [dashboardId, organizationId, t, variant, websiteId]
  );

  return (
    <WelcomeCardUI
      variant="empty"
      caption={`${dayjs().format('MMMM')} 1 - ${dayjs().format('MMMM')} ${dayjs().daysInMonth()}`}
      heroMessage={t('dashboard.overview.welcomeCard.title.empty')}
      description={
        variant === 'no-goals' ? t('dashboard.overview.welcomeCard.noCustomerFunnels') : t('common.noWebsiteConnected')
      }
      bottomCards={[
        {
          label: t('dashboard.overview.welcomeCard.leadGen'),
          value: '2.75K'
        },
        {
          label: t('dashboard.overview.welcomeCard.conversion'),
          value: '35,29%'
        },
        {
          label: t('dashboard.overview.welcomeCard.cac'),
          value: '$4.16'
        },
        {
          label: t('dashboard.overview.welcomeCard.newCustomers'),
          value: '970'
        }
      ]}
      ctaButton={renderButton}
    />
  );
}
