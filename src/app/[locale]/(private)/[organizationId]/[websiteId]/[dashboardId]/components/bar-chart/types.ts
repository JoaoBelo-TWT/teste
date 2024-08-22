import { CSSProperties } from 'react';
import { LabelPosition } from 'recharts/types/component/Label';
import { ViewBox } from 'recharts/types/util/types';

import { CustomerFunnelOverview } from '@/__generated__/graphql';

export interface BarChartProps {
  data: CustomerFunnelOverview[];
}

export interface ExtendedCustomerFunnelOverview extends CustomerFunnelOverview {
  color?: string;
}

export interface FunnelOverviewData {
  offset?: number | undefined;
  name?: string | undefined;
  x?: string | number;
  y?: string | number;
  width?: string | number;
  height?: string | number;
  strokeWidth?: string | undefined | number;
  fill?: string | undefined | number;
  stroke?: string | undefined | number;
  style?: CSSProperties;
  position?: LabelPosition;
  value?: number | string;
  viewBox?: ViewBox;
  data: ExtendedCustomerFunnelOverview[];
  organicTranslation: string;
  paidTranslation: string;
}
