'use client';

import { useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { DonutChart } from '@/components/charts/donut-chart';
import { DonutChartWrapperProps } from '@/components/charts/donut-chart/types';

export function DonutChartWrapper({ ...props }: Readonly<DonutChartWrapperProps>) {
  const theme = useMantineTheme();

  const isMdOrLarger = useMediaQuery(`(min-width: ${theme.breakpoints.md})`, true, {
    getInitialValueInEffect: false
  });

  return <DonutChart size={isMdOrLarger ? 400 : 200} thickness={8} {...props} />;
}
