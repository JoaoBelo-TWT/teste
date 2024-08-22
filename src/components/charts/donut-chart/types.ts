import type { BoxProps, ElementProps, Factory, MantineColor, StylesApiProps } from '@mantine/core';
import React from 'react';
import type { PieProps, PieChart as ReChartsPieChart, TooltipProps } from 'recharts';

export interface DonutChartCell {
  name: string;
  value: number;
  color: MantineColor;
}

export interface DonutChartProps extends BoxProps, StylesApiProps<DonutChartFactory>, ElementProps<'div'> {
  /** Data used to render chart */
  data: DonutChartCell[];

  /** Determines whether the tooltip should be displayed when one of the section is hovered, `true` by default */
  withTooltip?: boolean;

  /** Tooltip animation duration in ms, `0` by default */
  tooltipAnimationDuration?: number;

  /** Props passed down to `Tooltip` recharts component */
  tooltipProps?: Omit<TooltipProps<string, never>, 'ref'>;

  /** Props passed down to recharts `Pie` component */
  pieProps?: Omit<PieProps, 'ref'>;

  /** Controls color of the segments stroke, by default depends on color scheme */
  strokeColor?: MantineColor;

  /** Controls text color of all labels, by default depends on color scheme */
  labelColor?: MantineColor;

  /** Controls padding between segments, `0` by default */
  paddingAngle?: number;

  /** Determines whether each segment should have associated label, `false` by default */
  withLabels?: boolean;

  /** Determines whether segments labels should have lines that connect the segment with the label, `true` by default */
  withLabelsLine?: boolean;

  /** Controls thickness of the chart segments, `20` by default */
  thickness: number;

  /** Controls chart width and height, height is increased by
   * 40 if `withLabels` prop is set. Cannot be less than `thickness`. `80` by default */
  size: number;

  /** Controls width of segments stroke, `1` by default */
  strokeWidth?: number;

  /** Controls angle at which chart starts, `0` by default. Set to `180` to render the chart as semicircle. */
  startAngle?: number;

  /** Controls angle at which charts ends, `360` by default. Set to `0` to render the chart as semicircle. */
  endAngle?: number;

  /** Determines which data is displayed in the tooltip. `
   * 'all'` – display all values, `'segment'` – display only hovered segment. `'all'` by default. */
  tooltipDataSource?: 'segment' | 'all';

  /** Chart label, displayed in the center of the chart */
  figure?: string;

  /** Chart label, displayed in the center of the chart above figure */
  caption?: string;

  /** Additional elements rendered inside `PieChart` component */
  children?: React.ReactNode;

  /** Props passed down to recharts `PieChart` component */
  pieChartProps?: React.ComponentPropsWithoutRef<typeof ReChartsPieChart>;

  /** A function to format values inside the tooltip */
  valueFormatter?: (value: number) => string;
}

export type DonutChartWrapperProps = Omit<DonutChartProps, 'size' | 'thickness'>;

export type DonutChartStylesNames = 'root' | 'figure' | 'caption';
export type DonutChartCssVariables = {
  root: '--chart-stroke-color' | '--chart-labels-color' | '--chart-size';
};

export type DonutChartFactory = Factory<{
  props: DonutChartProps;
  ref: HTMLDivElement;
  stylesNames: DonutChartStylesNames;
  vars: DonutChartCssVariables;
}>;
