'use client';

import { ChartLegend } from '@mantine/charts';
import {
  factory,
  useProps,
  useMantineTheme,
  useResolvedStylesApi,
  useStyles,
  getThemeColor,
  Box,
  createVarsResolver
} from '@mantine/core';
import { useFormatter } from 'next-intl';
import { useId, useState } from 'react';
import {
  CartesianGrid,
  Legend,
  AreaChart as ReChartsAreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

import { formatNumber } from '../../../utils/formatters/numbers';
import { ChartTooltip } from '../chart-tooltip';
import classes from '../grid-chart.module.css';

import { AreaSplit } from './area-split';
import { renderChartArea } from './chart-area';
import { renderDotArea } from './dot-area';
import { renderReferenceLineItem } from './reference-line';
import { getDefaultSplitOffset } from './split-offset';
import { CustomAreaChartProps, CustomAreaChartFactory } from './types';

const defaultProps: Partial<CustomAreaChartProps> = {
  withXAxis: true,
  withYAxis: true,
  withDots: true,
  withTooltip: true,
  connectNulls: true,
  strokeWidth: 2,
  tooltipAnimationDuration: 0,
  fillOpacity: 0.2,
  tickLine: 'y',
  strokeDasharray: '5 5',
  curveType: 'monotone',
  gridAxis: 'x',
  type: 'default',
  splitColors: ['green.7', 'red.7'],
  orientation: 'horizontal',
  areaChartProps: {
    width: 250,
    margin: { left: 0, bottom: 0, right: 0, top: 5 },
    innerRadius: '24px'
  }
};

function valueToPercent(value: number) {
  return `${(value * 100).toFixed(0)}%`;
}

const varsResolver = createVarsResolver<CustomAreaChartFactory>((theme, { textColor, gridColor }) => ({
  root: {
    '--chart-text-color': textColor ? getThemeColor(textColor, theme) : undefined,
    '--chart-grid-color': gridColor ? getThemeColor(gridColor, theme) : undefined
  }
}));

const AREA_CHART = 'AreaChart';

export const AreaChart = factory<CustomAreaChartFactory>((_props, ref) => {
  const props = useProps(AREA_CHART, defaultProps, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    data,
    series,
    dataKey,
    withXAxis,
    withYAxis,
    curveType,
    gridProps,
    withDots,
    tickLine,
    strokeDasharray,
    gridAxis,
    unit,
    yAxisProps,
    xAxisProps,
    dotProps,
    activeDotProps,
    strokeWidth,
    tooltipAnimationDuration,
    type,
    legendProps,
    tooltipProps,
    withLegend,
    withTooltip,
    areaChartProps,
    fillOpacity,
    splitColors,
    splitOffset,
    connectNulls,
    onMouseLeave,
    orientation,
    referenceLines,
    dir,
    valueFormatter,
    setHoveredValue,
    ...others
  } = props;

  const theme = useMantineTheme();
  const baseId = useId();
  const splitId = `${baseId}-split`;
  const withXTickLine = gridAxis !== 'none' && (tickLine === 'x' || tickLine === 'xy');
  const withYTickLine = gridAxis !== 'none' && (tickLine === 'y' || tickLine === 'xy');
  const isAnimationActive = (tooltipAnimationDuration ?? 0) > 0;
  const stacked = type === 'stacked' || type === 'percent';
  const [highlightedArea, setHighlightedArea] = useState<string | null>(null);
  const shouldHighlight = highlightedArea !== null;
  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    setHighlightedArea(null);
    onMouseLeave?.(event);
  };

  const format = useFormatter();
  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi<CustomAreaChartFactory>({
    classNames,
    styles,
    props
  });

  const getStyles = useStyles<CustomAreaChartFactory>({
    name: AREA_CHART,
    classes: classes as never,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver
  });

  const areas = series.map((item) =>
    renderChartArea({
      baseId,
      splitId,
      shouldHighlight,
      highlightedArea,
      item,
      theme,
      styles: getStyles('area'),
      curveType,
      stacked,
      type,
      strokeWidth,
      connectNulls
    })
  );

  const dotsAreas = series.map((item) =>
    renderDotArea({
      styles: getStyles('area'),
      shouldHighlight,
      highlightedArea,
      theme,
      item,
      stacked,
      curveType,
      strokeWidth,
      connectNulls,
      dotProps
    })
  );

  const referenceLinesItems = referenceLines?.map((line) =>
    renderReferenceLineItem({
      theme,
      item: line,
      styles: getStyles('referenceLine')
    })
  );

  return (
    <Box ref={ref} {...getStyles('root')} onMouseLeave={handleMouseLeave} dir={dir ?? 'ltr'} {...others}>
      <ResponsiveContainer {...getStyles('container')}>
        <ReChartsAreaChart
          data={data}
          stackOffset={type === 'percent' ? 'expand' : undefined}
          layout={orientation}
          {...areaChartProps}
        >
          {withLegend && (
            <Legend
              verticalAlign="top"
              content={(payload) => (
                <ChartLegend
                  payload={payload.payload}
                  onHighlight={setHighlightedArea}
                  legendPosition={legendProps?.verticalAlign ?? 'top'}
                  classNames={resolvedClassNames}
                  styles={resolvedStyles}
                  series={series}
                />
              )}
              height={44}
              {...legendProps}
            />
          )}

          <CartesianGrid
            strokeDasharray={strokeDasharray}
            vertical={gridAxis === 'y' || gridAxis === 'xy'}
            horizontal={gridAxis === 'x' || gridAxis === 'xy'}
            {...getStyles('grid')}
            {...gridProps}
          />

          <XAxis
            hide={!withXAxis}
            {...(orientation === 'vertical' ? { type: 'number' } : { dataKey })}
            tick={{ transform: 'translate(0, 10)', fontSize: 12, fill: 'currentColor' }}
            stroke=""
            interval="preserveStartEnd"
            tickLine={withXTickLine ? { stroke: 'currentColor' } : false}
            minTickGap={5}
            {...getStyles('axis')}
            {...xAxisProps}
          />

          <YAxis
            hide={!withYAxis}
            axisLine={false}
            {...(orientation === 'vertical' ? { dataKey, type: 'category' } : { type: 'number' })}
            tickLine={withYTickLine ? { stroke: 'currentColor' } : false}
            tick={{ transform: 'translate(-10, 0)', fontSize: 12, fill: 'currentColor' }}
            allowDecimals
            unit={unit}
            tickFormatter={type === 'percent' ? valueToPercent : valueFormatter}
            {...getStyles('axis')}
            {...yAxisProps}
          />

          {withTooltip && (
            <Tooltip
              animationDuration={tooltipAnimationDuration}
              isAnimationActive={isAnimationActive}
              position={{ y: 0 }}
              cursor={{
                stroke: 'var(--chart-grid-color)',
                strokeWidth: 1,
                strokeDasharray
              }}
              content={({ payload }) => (
                <ChartTooltip
                  type="area"
                  valueFormatter={(value) =>
                    valueFormatter
                      ? valueFormatter(value)
                      : formatNumber({
                          value,
                          nextIntlFormatter: format,
                          options: { style: 'decimal', notation: 'compact' }
                        })
                  }
                  payload={payload as never}
                  unit={unit}
                  classNames={resolvedClassNames}
                  styles={resolvedStyles}
                  series={series}
                />
              )}
              {...tooltipProps}
            />
          )}

          {/* This tooltip is used to get hovered value */}
          {setHoveredValue && (
            <Tooltip
              cursor={false}
              content={({ payload }) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                setHoveredValue?.(payload?.at(0)?.payload[payload?.at(0)?.name ?? ''] as number);
                return null;
              }}
            />
          )}
          {type === 'split' && (
            <defs>
              <AreaSplit
                colors={splitColors}
                id={splitId}
                offset={splitOffset ?? getDefaultSplitOffset({ data, series })}
                fillOpacity={fillOpacity}
              />
            </defs>
          )}

          {areas}
          {referenceLinesItems}
          {withDots && dotsAreas}
        </ReChartsAreaChart>
      </ResponsiveContainer>
    </Box>
  );
});
