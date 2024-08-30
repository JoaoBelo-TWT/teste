import { AreaChart } from '@/components/charts/area-chart';
import { CustomAreaChartProps } from '@/components/charts/area-chart/types';
import { BaseCard } from '@/components/ui/base-card';

import classes from './index.module.css';

export function AreaChartCard({ ...props }: Readonly<CustomAreaChartProps>) {
  return (
    <BaseCard paperProps={{ classNames: { root: classes['area-chart-card__root'] } }}>
      <AreaChart {...props} />
    </BaseCard>
  );
}
