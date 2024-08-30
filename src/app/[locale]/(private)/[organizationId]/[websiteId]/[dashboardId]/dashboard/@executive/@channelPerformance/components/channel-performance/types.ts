import { ReactElement, ReactNode } from 'react';

import { DonutChartWrapperProps } from '@/components/charts/donut-chart/types';

import { StatusCardProps } from '../status-card/types';

export interface ChannelPerformanceProps {
  viewOnly?: boolean;
}

export interface ChannelPerformanceUIProps {
  headerTitle: string | ReactNode;
  headerChildren?: ReactElement;
  donutChart: DonutChartWrapperProps;
  performanceCards: StatusCardProps[];
  selectedFunnel: string;
  endContent?: ReactElement;
}
