/* eslint-disable max-len */
import type {
  ChartSeries,
  BaseChartStylesNames,
  ChartLegendStylesNames,
  ChartTooltipStylesNames,
  GridChartBaseProps,
  ChartReferenceLineProps
} from '@mantine/charts';
import type {
  BoxProps,
  StylesApiProps,
  ElementProps,
  MantineColor,
  Factory,
  MantineComponent,
  MantineTheme
} from '@mantine/core';
import { CSSProperties, Dispatch, SVGProps, SetStateAction } from 'react';
import { type DotProps, AreaChart as ReChartsAreaChart } from 'recharts';
import { CurveType } from 'recharts/types/shape/Curve';

export interface AreaChartSeries extends ChartSeries {
  strokeDasharray?: string | number;
  gradientStops: SVGProps<SVGStopElement>[];
  radius?: string | number;
}

export type AreaChartType = 'default' | 'stacked' | 'percent' | 'split';

export type AreaChartCurveType = 'bump' | 'linear' | 'natural' | 'monotone' | 'step' | 'stepBefore' | 'stepAfter';

export type AreaChartStylesNames = 'area' | BaseChartStylesNames | ChartLegendStylesNames | ChartTooltipStylesNames;

export type AreaChartCSSVariables = {
  root: '--chart-text-color' | '--chart-grid-color';
};

export type CustomDotProps = Omit<DotProps, 'ref'> & {
  name?: string;
  hideAll?: boolean;
  payload?: {
    [key: string]: unknown;
    hideDot?: boolean;
  };
};

export interface CustomAreaChartProps
  extends BoxProps,
    GridChartBaseProps,
    StylesApiProps<CustomAreaChartFactory>,
    ElementProps<'div'> {
  setHoveredValue?: Dispatch<SetStateAction<number | undefined>>;

  /** An array of objects with `name` and `color` keys. Determines which data should be consumed from the `data` array. */
  series: AreaChartSeries[];

  /** Controls how chart areas are positioned relative to each other, `'default'` by default */
  type?: AreaChartType;

  /** Type of the curve, `'monotone'` by default */
  curveType?: AreaChartCurveType;

  /** Determines whether dots should be displayed, `true` by default */
  withDots?: boolean;

  /** Props passed down to all dots. Ignored if `withDots={false}` is set. */
  dotProps?: CustomDotProps;

  /** Props passed down to all active dots. Ignored if `withDots={false}` is set. */
  activeDotProps?: CustomDotProps;

  /** Stroke width for the chart areas, `2` by default */
  strokeWidth?: number;

  /** Props passed down to recharts `AreaChart` component */
  areaChartProps?: React.ComponentPropsWithoutRef<typeof ReChartsAreaChart>;

  /** Controls fill opacity of all areas, `0.2` by default */
  fillOpacity?: number;

  /** A tuple of colors used when `type="split"` is set, ignored in all other cases. A tuple may include theme colors reference or any valid CSS colors `['green.7', 'red.7']` by default. */
  splitColors: [MantineColor, MantineColor];

  /** Offset for the split gradient. By default, value is inferred from `data` and `series` if possible. Must be generated from the data array with `getSplitOffset` function. */
  splitOffset?: number;

  /** Determines whether points with `null` values should be connected, `true` by default */
  connectNulls?: boolean;
}

export type CustomAreaChartFactory = Factory<{
  props: CustomAreaChartProps;
  ref: HTMLDivElement;
  stylesNames: AreaChartStylesNames;
  vars: AreaChartCSSVariables;
}>;

export declare const AreaChart: MantineComponent<{
  props: CustomAreaChartProps;
  ref: HTMLDivElement;
  stylesNames: AreaChartStylesNames;
  vars: AreaChartCSSVariables;
}>;

export type ChartData = Record<string, unknown>[];

export type DotAreaProps = {
  item: AreaChartSeries;
  theme: MantineTheme;
  highlightedArea: string | null;
  shouldHighlight: boolean;
  curveType: CurveType | undefined;
  strokeWidth: number | undefined;
  connectNulls: boolean | undefined;
  stacked: boolean;
  activeDotProps?: CustomDotProps;
  dotProps?: CustomDotProps;
  styles: { className: string; style: CSSProperties };
};

export type AreaProps = {
  baseId: string;
  splitId: string;
  item: AreaChartSeries;
  theme: MantineTheme;
  styles: { className: string; style: CSSProperties };
  strokeWidth: number | undefined;
  connectNulls: boolean | undefined;
  curveType: CurveType | undefined;
  highlightedArea: string | null;
  shouldHighlight: boolean;
  stacked: boolean;
  type: 'split' | 'default' | 'stacked' | 'percent' | undefined;
};

export type ReferenceLineProps = {
  theme: MantineTheme;
  item: ChartReferenceLineProps;
  styles: { className: string; style: CSSProperties };
};
