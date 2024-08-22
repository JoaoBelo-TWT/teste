'use client';

import { useSuspenseQuery } from '@apollo/client';
import { SimpleGrid } from '@mantine/core';
import dayjs from 'dayjs';
import { useParams } from 'next/navigation';
import { useFormatter, useTranslations } from 'next-intl';
import { useEffect, useMemo } from 'react';

import { BaseCard } from '@/components/ui/base-card';
import { StatsList } from '@/components/ui/stats-list';
import { useNavigationStore } from '@/context/navigation/store';
import { getDashboardCampaignsQuery } from '@/lib/apollo/queries/dashboard-campaigns';
import { SPACING } from '@/resources/constants';
import { routes } from '@/routes/routes';
import { formatNumber } from '@/utils/formatters/numbers';
import { getAcronymOrAbbreviateString } from '@/utils/strings/abbreviate-strings';

import { TitleWithTooltip } from '../../../components/title-with-tooltip';
import { DashboardPathParams } from '../../../types';
import { FiguresCard } from '../figures-card';
import { HeaderButtons } from '../header-buttons';
import { ShowMoreButton } from '../show-more-button';

import { CampaignsCardEmpty } from './empty';
import classes from './index.module.css';
import { CampaignsProps } from './types';

export default function CampaignsCard({
  viewOnly,
  dashboardCampaignsData: dashboardCampaignsDataServer
}: Readonly<CampaignsProps>) {
  const t = useTranslations();
  const format = useFormatter();

  const { websiteId, organizationId, dashboardId } = useParams<DashboardPathParams>();

  const { filters, triggers } = useNavigationStore();

  const { data: dashboardCampaignsDataClient, fetchMore } = useSuspenseQuery(getDashboardCampaignsQuery, {
    variables: {
      dashboardId,
      dashboardTimeframe: filters.timeframe,
      status: filters.campaignStatus,
      sorting: filters.campaignSorting,
      take: filters.campaignCards || 4
    },
    skip: !triggers.campaigns
  });

  useEffect(() => {
    fetchMore({
      variables: {
        take: filters.campaignCards
      }
    });
  }, [filters.campaignCards, fetchMore]);

  const dashboardCampaigns = useMemo(
    () => dashboardCampaignsDataClient?.dashboardCampaignsList ?? dashboardCampaignsDataServer,
    [dashboardCampaignsDataClient?.dashboardCampaignsList, dashboardCampaignsDataServer]
  );

  const cards = useMemo(
    () =>
      dashboardCampaigns?.campaigns.map((campaign, index) => {
        const leadsFunnelName =
          getAcronymOrAbbreviateString({ value: campaign?.leads?.name }) ??
          t('dashboard.overview.campaignsCard.figuresCard.leads');
        const customersFunnelName =
          getAcronymOrAbbreviateString({ value: campaign?.customers?.name }) ??
          t('dashboard.overview.campaignsCard.figuresCard.customers');

        return (
          <FiguresCard
            key={campaign.name + index}
            title={campaign.name}
            status={campaign.status}
            dateInterval={`${dayjs(campaign.startDate).format('MMM DD')} - ${dayjs(campaign.endDate).format('MMM DD')}`}
            urlSourcesImages={campaign.urlSourcesImages?.slice(0, 4) ?? []}
            additionalAvatars={campaign.urlSourcesImages.length - 4 > 0 ? campaign.urlSourcesImages.length - 4 : 0}
            data={[
              {
                label: t('dashboard.overview.campaignsCard.figuresCard.visits'),
                value: formatNumber({
                  value: campaign?.visits ?? 0,
                  nextIntlFormatter: format,
                  options: { notation: 'compact' }
                })
              },
              {
                label: leadsFunnelName,
                value: formatNumber({
                  value: campaign?.leads?.count ?? 0,
                  nextIntlFormatter: format,
                  options: { notation: 'compact' }
                })
              },
              {
                label: customersFunnelName,
                value: formatNumber({
                  value: campaign?.customers?.count ?? 0,
                  nextIntlFormatter: format,
                  options: { notation: 'compact' }
                })
              },
              {
                label: t('deepDives.stats.spend'),
                value: formatNumber({
                  value: campaign?.spend ?? 0,
                  nextIntlFormatter: format,
                  options: { style: 'currency', currency: campaign?.currency, notation: 'compact' }
                })
              },
              {
                label: t('deepDives.stats.cac'),
                value: formatNumber({
                  value: campaign?.cac ?? 0,
                  nextIntlFormatter: format,
                  options: { style: 'currency', currency: campaign?.currency, notation: 'compact' }
                })
              }
            ]}
            href={
              viewOnly
                ? undefined
                : routes.dashboard.campaignPerformance.path(
                    organizationId,
                    websiteId,
                    dashboardId,
                    campaign.name,
                    filters.timeframe
                  )
            }
          />
        );
      }),
    [dashboardCampaigns?.campaigns, format, t, dashboardId, organizationId, websiteId, filters.timeframe, viewOnly]
  );

  const showCardsNumber = useMemo(() => filters.campaignCards, [filters.campaignCards]);

  const showMoreCount = useMemo(
    () => (dashboardCampaigns?.totalCampaigns ?? 0) - +showCardsNumber,
    [dashboardCampaigns?.totalCampaigns, showCardsNumber]
  );

  const showMoreButton = useMemo(
    () => showCardsNumber < (dashboardCampaigns?.totalCampaigns ?? Infinity),
    [dashboardCampaigns?.totalCampaigns, showCardsNumber]
  );

  if (!dashboardCampaigns?.hasEvents || dashboardCampaigns.campaigns.length === 0) {
    return <CampaignsCardEmpty />;
  }

  return (
    <BaseCard
      id="campaign-performance"
      headerProps={{
        title: (
          <TitleWithTooltip
            title={t('dashboard.overview.campaignsCard.title')}
            tooltip={t('dashboard.tooltips.campaignPerformance')}
          />
        ),
        children: <HeaderButtons />
      }}
    >
      <div className={classes['campaigns-card__container']}>
        <StatsList
          variant="large"
          list={[
            {
              label: t('dashboard.overview.campaignsCard.totalVisits'),
              value: formatNumber({
                value: dashboardCampaigns?.totalVisits ?? 0,
                nextIntlFormatter: format,
                options: { notation: 'compact' }
              })
            },
            {
              label: t('dashboard.overview.campaignsCard.totalConversions'),
              value: formatNumber({
                value: dashboardCampaigns?.totalConversions ?? 0,
                nextIntlFormatter: format,
                options: { notation: 'compact' }
              })
            }
          ]}
          w={'100%'}
          colProps={{ span: 'content' }}
          pl={SPACING.sm}
        />
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={{ base: 8, md: 16 }} verticalSpacing={{ base: 8, md: 16 }}>
          {cards?.slice(0, +showCardsNumber)}
        </SimpleGrid>
        {showMoreButton && (
          <div className={classes['campaigns-card__button-container']}>
            <ShowMoreButton campaignsLength={showMoreCount} />
          </div>
        )}
      </div>
    </BaseCard>
  );
}
