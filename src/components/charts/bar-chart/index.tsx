'use client';

import { BarChart as MantineBarChart, type BarChartProps } from '@mantine/charts';

export function BarChart({ ...props }: Readonly<BarChartProps>) {
  return <MantineBarChart {...props} />;
}
