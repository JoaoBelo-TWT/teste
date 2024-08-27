'use client';

import { useParams } from 'next/navigation';
import { useFormatter, useTranslations } from 'next-intl';
import { useCallback, useMemo } from 'react';

import { Channels, HubspotIntegrationStatus, SalesforceIntegrationStatus } from '@/__generated__/graphql';
import { useNavigationStore } from '@/context/navigation/store';
import { useQueryChannelPerformance } from '@/lib/react-query/dashboard/executive/use-query-channel-performance';
import { useQueryWebsite } from '@/lib/react-query/website/use-query-website';
import { formatNumber } from '@/utils/formatters/numbers';
import { getAcronymOrAbbreviateString } from '@/utils/strings/abbreviate-strings';

import { TitleWithTooltip } from '../../../components/title-with-tooltip';
import { HeaderButtons } from '../header-buttons';

import ChannelPerformanceEmpty from './empty';
import { ChannelPerformanceUI } from './ui';

export default function ChannelPerformance() {
  const t = useTranslations();
  const format = useFormatter();

  const { dashboardId, websiteId, organizationId } = useParams<{
    dashboardId: string;
    websiteId: string;
    organizationId: string;
  }>();
  const { filters } = useNavigationStore();

  const { data } = useQueryChannelPerformance({
    dashboardId,
    dashboardTimeframe: filters.timeframe,
    channelSorting: filters.channelSorting
  });

  const { data: website } = useQueryWebsite(websiteId);
  const connectedToCRM =
    website?.website.salesforceIntegrationStatus === SalesforceIntegrationStatus.Active ||
    website?.website.hubspotIntegrationStatus === HubspotIntegrationStatus.Active;

  const channelPerformancesArrayClient = useMemo(() => data?.dashboardChannelPerformance, [data]);

  const channelPerformancesArray = useMemo(() => channelPerformancesArrayClient, [channelPerformancesArrayClient]);

  const channelColors = useMemo(
    () => ({
      [Channels.Direct]: {
        color: 'var(--chart-color-soft-blue)',
        gradient: 'var(--gradient-blue-card)'
      },
      [Channels.Email]: {
        color: 'var(--chart-color-soft-pink)',
        gradient: 'var(--gradient-pink-card)'
      },
      [Channels.Other]: {
        color: 'var(--chart-color-soft-gold)',
        gradient: 'var(--gradient-gold-card)'
      },
      [Channels.Referrals]: {
        color: 'var(--chart-color-soft-green)',
        gradient: 'var(--gradient-green-card)'
      },
      [Channels.Search]: {
        color: 'var(--chart-color-soft-bronze)',
        gradient: 'var(--gradient-bronze-card)'
      },
      [Channels.Social]: {
        color: 'var(--mantine-color-dark-3)',
        gradient: 'var(--gradient-silver-card)'
      }
    }),
    []
  );

  const getCardColor = useCallback(
    (channel: Channels) =>
      channelColors[channel as unknown as keyof typeof channelColors] || { color: '', gradient: '' },
    [channelColors]
  );

  const getFunnelsFiltersOptions = useCallback(() => {
    if (!channelPerformancesArray.channelsPerformance) return [];

    return channelPerformancesArray.channelsPerformance.map((c) => ({
      value: c.stageId,
      label: c.stageName
    }));
  }, [channelPerformancesArray]);

  const selectedFunnel = useMemo(
    () =>
      channelPerformancesArray?.channelsPerformance?.find((c) => c.stageId === filters.channel) ??
      channelPerformancesArray?.channelsPerformance?.find((c) => c),
    [channelPerformancesArray, filters.channel]
  );

  const donutChartFigure = useMemo(
    () =>
      formatNumber({
        value: selectedFunnel?.count ?? 0,
        nextIntlFormatter: format,
        options: { notation: 'compact' }
      }),
    [format, selectedFunnel?.count]
  );

  const toTitleCase = (str: string): string =>
    str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());

  const sectionsData = useMemo(
    () =>
      !selectedFunnel
        ? []
        : selectedFunnel.channels
            .filter((c) => channelColors[c as unknown as keyof typeof channelColors] !== null)
            .map((c) => {
              const selectedColor = getCardColor(c.name);
              return {
                ...c,
                name: toTitleCase(c.name),
                value: c.count,
                color: selectedColor?.color,
                colorGradient: selectedColor?.gradient
              };
            }),
    [selectedFunnel, channelColors, getCardColor]
  );

  const sortedSectionsData = useMemo(() => sectionsData?.sort((a, b) => b.count - a.count), [sectionsData]);
  if (!channelPerformancesArray?.isSetup) {
    return (
      <ChannelPerformanceEmpty
        variant="no-goals"
        dashboardId={dashboardId}
        websiteId={websiteId}
        organizationId={organizationId}
      />
    );
  }

  if (!channelPerformancesArray.hasEvents) {
    return (
      <ChannelPerformanceEmpty
        variant="no-data"
        dashboardId={dashboardId}
        websiteId={websiteId}
        organizationId={organizationId}
      />
    );
  }

  return (
    <ChannelPerformanceUI
      headerTitle={
        <TitleWithTooltip
          title={t('dashboard.overview.performanceCard.title')}
          tooltip={t('dashboard.tooltips.channelPerformance')}
        />
      }
      headerChildren={<HeaderButtons funnelsFilterOptions={getFunnelsFiltersOptions()} />}
      donutChart={{
        data: sortedSectionsData,
        figure: donutChartFigure,
        caption: selectedFunnel?.name
      }}
      selectedFunnel={selectedFunnel?.name || t('common.noChannel')}
      performanceCards={sortedSectionsData.map((section) => ({
        title: section.name,
        color: section.colorGradient,
        channelName: getAcronymOrAbbreviateString({
          value: selectedFunnel?.name,
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
          options: { style: 'currency', currency: section.currency, notation: 'compact', maximumFractionDigits: 0 }
        }),
        perChannel: formatNumber({
          value: section.perStage,
          nextIntlFormatter: format,
          options: { style: 'currency', currency: section.currency, notation: 'compact', maximumFractionDigits: 0 }
        }),
        href:
          typeof section.name === 'string' && section.name.toLowerCase() !== 'other' && connectedToCRM
            ? `channel-performance/${section.name.toLowerCase()}?timeframe=${filters.timeframe}`
            : undefined
      }))}
    />
  );
}
