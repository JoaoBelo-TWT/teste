import { ChartSeries } from '@mantine/charts';

import { ChartSeriesLabels, ChartTooltipProps } from './types';

export function getData(item: Record<string, unknown>, type: 'area' | 'radial') {
  if (type === 'radial') {
    return item.value as number;
  }

  return (item.payload as Record<string, number>)[item.dataKey as string];
}

export function getFilteredChartTooltipPayload(
  payload: Record<string, React.ReactNode | string>[],
  segmentId?: string
) {
  // Filter the payload
  const duplicatesFilter = payload.filter((item) => item.fill !== 'none' || !item.color);

  // Filter by segmentId if provided
  const filteredBySegmentId = segmentId ? duplicatesFilter.filter((item) => item.name === segmentId) : duplicatesFilter;

  // Reverse the order of the filtered items, show organic first
  return filteredBySegmentId.reverse();
}

export function getSeriesLabels(series: ChartSeries[] | undefined): ChartSeriesLabels {
  if (!series) {
    return {};
  }

  return series.reduce<ChartSeriesLabels>((acc, item) => {
    acc[item.name] = item.label;
    return acc;
  }, {});
}

export function getPercentageDifference(currentTraffic?: number, previousTraffic?: number) {
  if (previousTraffic === undefined || previousTraffic === 0 || currentTraffic === undefined) {
    // Handle cases where previous traffic is undefined or 0 to avoid division by 0
    return undefined; // Or return 0 if that's more appropriate for your use case
  }

  const difference = currentTraffic - previousTraffic;
  const percentageDifference = (difference / previousTraffic) * 100;

  // Round to the nearest whole number and return
  return Math.round(percentageDifference);
}

export const defaultProps: Partial<ChartTooltipProps> = {
  type: 'area'
};

export const CHART_TOOLTIP = 'ChartTooltip';
