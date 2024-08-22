'use client';

import { useSuspenseQuery } from '@apollo/client';
import dayjs from 'dayjs';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useFormatter, useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { DashboardOverviewStatus } from '@/__generated__/graphql';
import conversionCoralGradient from '@/assets/images/gradients/Conversion_Coral.svg';
import marketingMintGradient from '@/assets/images/gradients/Marketing_Mint.svg';
import { useNavigationStore } from '@/context/navigation/store';
import { getDashboardOverviewQuery } from '@/lib/apollo/queries/dashboard-overview';
import { DATE_FORMATS } from '@/resources/constants';
import { formatNumber } from '@/utils/formatters/numbers';

import { WelcomeCardEmpty } from './empty';
import classes from './index.module.css';
import { WelcomeCardProps } from './types';
import { WelcomeCardUI } from './ui';

/* eslint-disable i18next/no-literal-string */
/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const utc = require('dayjs/plugin/utc');
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
dayjs.extend(utc);

export function WelcomeCard({ name, dashboardOverview: dashboardOverviewServer }: Readonly<WelcomeCardProps>) {
  const t = useTranslations();
  const format = useFormatter();
  const { filters, triggers } = useNavigationStore();
  const { dashboardId } = useParams<{ dashboardId: string }>();

  const { data: dashboardOverviewClient } = useSuspenseQuery(getDashboardOverviewQuery, {
    variables: {
      dashboardId,
      dashboardTimeframe: filters.timeframe
    },
    skip: !triggers.welcome
  });

  const dashboardOverview = useMemo(
    () => dashboardOverviewClient?.dashboardOverview ?? dashboardOverviewServer,
    [dashboardOverviewClient?.dashboardOverview, dashboardOverviewServer]
  );

  // By default, dayjs operates in UTC. When subtracting time, it remains in UTC,
  // which might display a different local date due to time zone offsets. For example,
  // 2024-08-20 23:59 UTC could be Aug 21 locally in a UTC+2 time zone.
  const timeframeCaption = useMemo(() => {
    // Parse the original endDate and subtract 1 minute
    const adjustedEndDate = dayjs(dashboardOverview?.endDate).utc().subtract(1, 'minute');

    // Format both startDate and adjustedEndDate
    const formattedStartDate = dayjs(dashboardOverview?.startDate).utc().format(DATE_FORMATS.COMPACT);
    const formattedEndDate = adjustedEndDate.format(DATE_FORMATS.COMPACT);

    // Return the formatted timeframe caption
    return `${formattedStartDate} - ${formattedEndDate}`;
  }, [dashboardOverview?.endDate, dashboardOverview?.startDate]);

  if (!dashboardOverview?.isSetup) {
    return <WelcomeCardEmpty variant="no-goals" />;
  }

  if (!dashboardOverview?.hasEvents) {
    return <WelcomeCardEmpty variant="no-data" />;
  }

  const getStatusValues = () => {
    let gradientSrc: unknown;
    let heroMessage: string;
    switch (dashboardOverview?.status) {
      case DashboardOverviewStatus.Orange:
        gradientSrc = conversionCoralGradient;
        heroMessage = t('dashboard.overview.welcomeCard.title.orange', {
          name
        });
        break;
      case DashboardOverviewStatus.Green:
      default:
        gradientSrc = marketingMintGradient;
        heroMessage = t('dashboard.overview.welcomeCard.title.green', {
          name
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
          label: dashboardOverview?.leads?.name,
          value: formatNumber({
            value: dashboardOverview?.leads?.count ?? 0,
            nextIntlFormatter: format,
            options: { notation: 'compact' }
          })
        },
        {
          label: t('dashboard.overview.welcomeCard.conversion'),
          value: formatNumber({
            value: dashboardOverview?.websiteConversionRate ?? 0,
            nextIntlFormatter: format,
            options: { style: 'percent' }
          })
        },
        {
          label: t('dashboard.overview.welcomeCard.cac'),
          value: formatNumber({
            value: dashboardOverview?.cac ?? 0,
            nextIntlFormatter: format,
            options: { style: 'currency', currency: dashboardOverview?.cacCurrency, notation: 'compact' }
          })
        },
        {
          label: dashboardOverview?.newCustomers?.name,
          value: formatNumber({
            value: dashboardOverview?.newCustomers?.count ?? 0,
            nextIntlFormatter: format,
            options: { notation: 'compact' }
          })
        }
      ]}
    />
  );
}
