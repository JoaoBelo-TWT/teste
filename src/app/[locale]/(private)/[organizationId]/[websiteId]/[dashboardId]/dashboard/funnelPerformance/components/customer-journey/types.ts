import { ReactElement } from 'react';

import { GetDashboardCustomerJourneyQuery } from '@/__generated__/graphql';
import { FunnelChartProps } from '@/components/charts/funnel-chart/types';

export interface JourneyProps {
  viewOnly?: boolean;
  dashboardJourneyData: GetDashboardCustomerJourneyQuery['dashboardCustomerJourney'];
}
export interface JourneyUIProps {
  viewOnly?: boolean;
  params?: { organizationId: string; websiteId: string; dashboardId: string };
  headerTitle: string | ReactElement;
  funnels: FunnelChartProps[];
  headerChildren?: ReactElement;
  endContent?: ReactElement;
}
