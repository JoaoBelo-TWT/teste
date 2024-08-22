import { ChartData } from '@mantine/charts';
import { ReactElement } from 'react';

import { GetDashboardWebsiteActivityQuery } from '@/__generated__/graphql';

import { ConversionRateCardProps } from '../conversion-rate-card/types';
import { TableCardProps } from '../table-card/types';
import { TopSourcesCardProps } from '../top-sources-card/types';

export interface WebSiteActivityProps {
  dashboardWebsiteActivityData: GetDashboardWebsiteActivityQuery['dashboardWebsiteActivity'];
}

export interface WebSiteActivityUIProps {
  headerTitle: string | ReactElement;
  headerChildren?: ReactElement;
  table?: TableCardProps;
  topSources?: TopSourcesCardProps;
  websiteVisits?: number;
  conversionRate?: ConversionRateCardProps;
  chart?: { YMax: number; XMax: number; XMin: number; data: ChartData };
  endContent?: ReactElement;
  websiteUrl?: string | null;
}
