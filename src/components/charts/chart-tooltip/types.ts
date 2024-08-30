import { ChartSeries } from '@mantine/charts';
import { BoxProps, ElementProps, Factory, StylesApiProps } from '@mantine/core';

export type ChartTooltipStylesNames =
  | 'tooltip'
  | 'tooltipItem'
  | 'tooltipItemBody'
  | 'tooltipItemColor'
  | 'tooltipItemName'
  | 'tooltipItemData'
  | 'tooltipLabel'
  | 'tooltipBody';

export interface ChartTooltipProps extends BoxProps, StylesApiProps<ChartTooltipFactory>, ElementProps<'div'> {
  /** Main tooltip label */
  label?: React.ReactNode;

  /** Chart data provided by recharts */
  payload: Record<string, string | React.ReactNode>[] | undefined;

  /** Data units, provided by parent component */
  unit?: string;

  /** Tooltip type that determines the content and styles,
   * `area` for LineChart, AreaChart and BarChart, `radial`
   *  for DonutChart and PieChart, `'area'` by default */
  type: 'area' | 'radial';

  /** Id of the segment to display data for. Only applicable when `type="radial"`. If not set, all data is rendered. */
  segmentId?: string;

  /** Chart series data, applicable only for `area` type */
  series?: ChartSeries[];

  /** A function to format values */
  valueFormatter?: (value: number) => string;

  variant?: 'default' | 'compare-past-period';
}

export type ChartTooltipFactory = Factory<{
  props: ChartTooltipProps;
  ref: HTMLDivElement;
  stylesNames: ChartTooltipStylesNames;
}>;

export interface ComparePreviousDataTooltipProps {
  date: string;
  value: number;
  previousValue: number;
  originalDate: string;
}

export type ChartSeriesLabels = Record<string, string | undefined>;
