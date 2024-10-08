import type { AreaChartSeries, ChartData } from './types';

interface GetSplitOffsetInput {
  data: ChartData;
  dataKey: string;
}

export function getSplitOffset({ data, dataKey }: GetSplitOffsetInput) {
  const dataMax = Math.max(...data.map((item) => item[dataKey] as number));
  const dataMin = Math.min(...data.map((item) => item[dataKey] as number));

  if (dataMax <= 0) {
    return 0;
  }
  if (dataMin >= 0) {
    return 1;
  }

  return dataMax / (dataMax - dataMin);
}

interface GetDefaultSplitOffsetInput {
  data: ChartData;
  series: AreaChartSeries[];
}

export function getDefaultSplitOffset({ data, series }: GetDefaultSplitOffsetInput) {
  if (series.length === 1) {
    const dataKey = series[0].name;
    return getSplitOffset({ data, dataKey });
  }

  return 0.5;
}
