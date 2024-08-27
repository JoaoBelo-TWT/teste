'use client';

import { Plus } from '@phosphor-icons/react';
import Link from 'next/link';
import { useFormatter, useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Overlay } from '@/components/ui/overlay';
import { routes } from '@/routes/routes';
import { EmptyStateProps } from '@/types/common';
import { OnboardingFlowType } from '@/types/enums/new-dashboard-query-params';
import { formatNumber } from '@/utils/formatters/numbers';
import { getAcronymOrAbbreviateString } from '@/utils/strings/abbreviate-strings';

import { mockChannelPerformance } from './mock';
import { ChannelPerformanceUI } from './ui';

export default function ChannelPerformanceEmpty({
  variant = 'no-goals',
  dashboardId,
  websiteId,
  organizationId
}: Readonly<EmptyStateProps>) {
  const t = useTranslations();
  const format = useFormatter();
  return (
    <ChannelPerformanceUI
      headerTitle={t('dashboard.overview.performanceCard.title')}
      donutChart={{
        data: mockChannelPerformance,
        // eslint-disable-next-line i18next/no-literal-string
        figure: '2.75K',
        caption: t('dashboard.overview.performanceCard.statusCard.spend')
      }}
      selectedFunnel={t('onboarding.funnels.leads')}
      performanceCards={mockChannelPerformance.map((section) => ({
        title: section.name,
        color: section.colorGradient,
        channelName: getAcronymOrAbbreviateString({
          value: '0',
          lettersThresholdForAbbreviation: 8
        }),
        channelCount: formatNumber({
          value: section.value,
          nextIntlFormatter: format,
          options: { notation: 'compact' }
        }),
        spend: formatNumber({
          value: section.spend,
          nextIntlFormatter: format,
          options: { style: 'currency', currency: section.currency, notation: 'compact' }
        }),
        perChannel: formatNumber({
          value: section.perStage,
          nextIntlFormatter: format,
          options: { style: 'currency', currency: section.currency, notation: 'compact' }
        })
      }))}
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
