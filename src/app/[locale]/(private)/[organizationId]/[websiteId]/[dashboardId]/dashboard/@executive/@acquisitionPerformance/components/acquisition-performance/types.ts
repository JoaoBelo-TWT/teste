import { ChartData } from '@mantine/charts';
import { ReactElement } from 'react';

import { GetDashboardCustomerJourneyQuery } from '@/__generated__/graphql';

export interface AcquisitionPerformanceProps {
  acquisitionPerformanceProps: GetDashboardCustomerJourneyQuery['dashboardCustomerJourney'];
}
export interface AcquisitionPerformanceUIProps {
  params?: { organizationId: string; websiteId: string; dashboardId: string };
  headerTitle: string | ReactElement;
  headerChildren?: ReactElement;
  chart: { YMax: number; XMax: number; XMin: number; data: ChartData };
  endContent?: React.ReactElement;
}

export interface ChartDataItem {
  value: number | undefined;
  date: string | Date;
  originalDate: string | Date;
  hideDot: boolean;
  previousValue: number | undefined;
}
