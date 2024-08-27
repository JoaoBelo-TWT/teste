'use client';

import dayjs from 'dayjs';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useFormatter, useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { DashboardOverviewStatus, PixelScriptGenerationStatus } from '@/__generated__/graphql';
import conversionCoralGradient from '@/assets/images/gradients/Conversion_Coral.svg';
import marketingMintGradient from '@/assets/images/gradients/Marketing_Mint.svg';
import { useNavigationStore } from '@/context/navigation/store';
import { useQueryWelcomeCard } from '@/lib/react-query/dashboard/executive/use-query-welcome-card';
import { useMe } from '@/lib/react-query/use-query-fetch-me';
import { useQueryWebsite } from '@/lib/react-query/website/use-query-website';
import { DATE_FORMATS } from '@/resources/constants';
import { formatNumber } from '@/utils/formatters/numbers';

import { WelcomeCardEmpty } from './empty';
import classes from './index.module.css';
import { WelcomeCardUI } from './ui';

/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, i18next/no-literal-string
const utc = require('dayjs/plugin/utc');
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
dayjs.extend(utc);

export function WelcomeCard() {
  const t = useTranslations();
  const format = useFormatter();
  const { filters } = useNavigationStore();
  const { dashboardId, websiteId } = useParams<{ dashboardId: string; websiteId: string }>();

  const { data: me } = useMe();

  const { data } = useQueryWelcomeCard({
    dashboardId,
    dashboardTimeframe: filters.timeframe
  });

  const { data: website } = useQueryWebsite(websiteId);

  // By default, dayjs operates in UTC. When subtracting time, it remains in UTC,
  // which might display a different local date due to time zone offsets. For example,
  // 2024-08-20 23:59 UTC could be Aug 21 locally in a UTC+2 time zone.
  const timeframeCaption = useMemo(() => {
    // Parse the original endDate and subtract 1 minute
    const adjustedEndDate = dayjs(data.dashboardOverview?.endDate).utc().subtract(1, 'minute');

    // Format both startDate and adjustedEndDate
    const formattedStartDate = dayjs(data.dashboardOverview?.startDate).utc().format(DATE_FORMATS.COMPACT);
    const formattedEndDate = adjustedEndDate.format(DATE_FORMATS.COMPACT);

    // Return the formatted timeframe caption
    return `${formattedStartDate} - ${formattedEndDate}`;
  }, [data.dashboardOverview]);

  if (!data.dashboardOverview?.isSetup) {
    return <WelcomeCardEmpty variant="no-goals" />;
  }

  if (website.website.pixelScriptGenerationStatus !== PixelScriptGenerationStatus.Completed) {
    return <WelcomeCardEmpty variant="no-data" />;
  }

  const getStatusValues = () => {
    let gradientSrc: unknown;
    let heroMessage: string;
    switch (data.dashboardOverview?.status) {
      case DashboardOverviewStatus.Orange:
        gradientSrc = conversionCoralGradient;
        heroMessage = t('dashboard.overview.welcomeCard.title.orange', {
          name: me.me.firstName
        });
        break;
      case DashboardOverviewStatus.Green:
      default:
        gradientSrc = marketingMintGradient;
        heroMessage = t('dashboard.overview.welcomeCard.title.green', {
          name: me.me.firstName
        });
        break;
    }

    return {
      gradientSrc: gradientSrc as StaticImport,
      heroMessage
    };
  };

  return (
    <WelcomeCardUI
      background={
        <Image
          fill
          src={getStatusValues().gradientSrc}
          alt="Background"
          className={classes['welcome-card__image']}
          priority
        />
      }
      caption={timeframeCaption}
      heroMessage={getStatusValues().heroMessage}
      bottomCards={[
        {
          label: data.dashboardOverview?.leads?.name,
          value: formatNumber({
            value: data.dashboardOverview?.leads?.count ?? 0,
            nextIntlFormatter: format,
            options: { notation: 'compact' }
          })
        },
        {
          label: t('dashboard.overview.welcomeCard.conversion'),
          value: formatNumber({
            value: data.dashboardOverview?.websiteConversionRate ?? 0,
            nextIntlFormatter: format,
            options: { style: 'percent' }
          })
        },
        {
          label: t('dashboard.overview.welcomeCard.cac'),
          value: formatNumber({
            value: data.dashboardOverview?.cac ?? 0,
            nextIntlFormatter: format,
            options: {
              style: 'currency',
              currency: data.dashboardOverview?.cacCurrency,
              notation: 'compact'
            }
          })
        },
        {
          label: data.dashboardOverview?.newCustomers?.name,
          value: formatNumber({
            value: data.dashboardOverview?.newCustomers?.count ?? 0,
            nextIntlFormatter: format,
            options: { notation: 'compact' }
          })
        }
      ]}
    />
  );
}
