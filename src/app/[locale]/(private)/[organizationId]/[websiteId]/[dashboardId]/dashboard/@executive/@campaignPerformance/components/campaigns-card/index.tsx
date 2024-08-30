'use client';

import { SimpleGrid } from '@mantine/core';
import dayjs from 'dayjs';
import { useParams } from 'next/navigation';
import { useFormatter, useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { HubspotIntegrationStatus, SalesforceIntegrationStatus } from '@/__generated__/graphql';
import { BaseCard } from '@/components/ui/base-card';
import { StatsList } from '@/components/ui/stats-list';
import { TitleWithTooltip } from '@/components/ui/title-with-tooltip';
import { useNavigationStore } from '@/context/navigation/store';
import { useQueryPaginatedCampaigns } from '@/lib/react-query/dashboard/executive/query-paginated-campaigns';
import { useQueryWebsite } from '@/lib/react-query/website/query-website';
import { SPACING } from '@/resources/constants';
import { routes } from '@/routes/routes';
import { formatNumber } from '@/utils/formatters/numbers';
import { getAcronymOrAbbreviateString } from '@/utils/strings/abbreviate-strings';

import { DashboardPathParams } from '../../../../types';
import { FiguresCard } from '../figures-card';
import { HeaderButtons } from '../header-buttons';
import { ShowMoreButton } from '../show-more-button';

import { CampaignsCardEmpty } from './empty';
import classes from './index.module.css';

export default function CampaignsCard() {
  const t = useTranslations();
  const format = useFormatter();

  const { websiteId, organizationId, dashboardId } = useParams<DashboardPathParams>();

  const { filters } = useNavigationStore();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useQueryPaginatedCampaigns({
    dashboardId,
    dashboardTimeframe: filters.timeframe,
    status: filters.campaignStatus,
    sorting: filters.campaignSorting,
    take: 4
  });

  const { data: website } = useQueryWebsite(websiteId);

  const connectedToCRM =
    website?.website.salesforceIntegrationStatus === SalesforceIntegrationStatus.Active ||
    website?.website.hubspotIntegrationStatus === HubspotIntegrationStatus.Active;

  const campaigns = useMemo(() => data.pages.map((value) => value.dashboardCampaignsList.campaigns).flat(), [data]);

  const cards = useMemo(
    () =>
      campaigns.map((campaign, index) => {
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
              connectedToCRM
                ? routes.dashboard.campaignPerformance.path(
                    organizationId,
                    websiteId,
                    dashboardId,
                    campaign.name,
                    filters.timeframe
                  )
                : undefined
            }
          />
        );
      }),
    [campaigns, t, format, connectedToCRM, organizationId, websiteId, dashboardId, filters.timeframe]
  );

  const lastPage = data.pages[data.pages.length - 1]?.dashboardCampaignsList;
  const showMoreCount = (lastPage?.totalCampaigns ?? 0) - campaigns.length;

  if (!lastPage?.hasEvents || campaigns.length === 0) {
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
                value: lastPage?.totalVisits ?? 0,
                nextIntlFormatter: format,
                options: { notation: 'compact' }
              })
            },
            {
              label: t('dashboard.overview.campaignsCard.totalConversions'),
              value: formatNumber({
                value: lastPage?.totalConversions ?? 0,
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
          {cards}
        </SimpleGrid>
        {hasNextPage && (
          <div className={classes['campaigns-card__button-container']}>
            <ShowMoreButton campaignsLength={showMoreCount} onClick={fetchNextPage} isLoading={isFetchingNextPage} />
          </div>
        )}
      </div>
    </BaseCard>
  );
}
