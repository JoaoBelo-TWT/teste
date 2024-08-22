import { CSSProperties } from 'react';

export type FunnelChartProps = {
  id: string;
  title: string;
  trackedEventDescription: string;
  trackedEventImage?: string;
  figureValue: string;
  figureLabel: string;
  percentage?: number;
  isPercentageVisible?: boolean;
  rootStyles?: CSSProperties;
  gradientStyles?: CSSProperties;
  percentageChange: number;
};
