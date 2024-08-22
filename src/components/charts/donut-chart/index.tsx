'use client';

import {
  Box,
  createVarsResolver,
  factory,
  getThemeColor,
  rem,
  useProps,
  useResolvedStylesApi,
  useStyles
} from '@mantine/core';
import React, { useState } from 'react';
import { Cell, Pie, PieChart as ReChartsPieChart, ResponsiveContainer, Sector, Tooltip } from 'recharts';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';

import { ChartTooltip } from '../chart-tooltip';

import classes from './index.module.css';
import { DonutChartFactory, DonutChartProps } from './types';

const defaultProps: Partial<DonutChartProps> = {
  withTooltip: true,
  withLabelsLine: true,
  paddingAngle: 0,
  thickness: 20,
  size: 200,
  strokeWidth: 1,
  startAngle: 0,
  endAngle: 360,
  tooltipDataSource: 'all'
};

const varsResolver = createVarsResolver<DonutChartFactory>((theme, { strokeColor, labelColor, withLabels, size }) => ({
  root: {
    '--chart-stroke-color': strokeColor ? getThemeColor(strokeColor, theme) : undefined,
    '--chart-labels-color': labelColor ? getThemeColor(labelColor, theme) : undefined,
    '--chart-size': withLabels ? rem(size + 80) : rem(size)
  }
}));

/** Does the magic of changing the weight of the hovered section */
const renderActiveShape = (shape: PieSectorDataItem, size: number) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = shape;
  const activeInnerRadius = (innerRadius ?? size / 2 - 20) * 0.95;

  return (
    <Sector
      cx={cx}
      cy={cy}
      innerRadius={activeInnerRadius}
      outerRadius={outerRadius}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={fill}
    />
  );
};

const DONUT_CHART = 'DonutChart';

export const DonutChart = factory<DonutChartFactory>((_props, ref) => {
  const props = useProps(DONUT_CHART, defaultProps, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    data,
    withTooltip,
    tooltipAnimationDuration,
    tooltipProps,
    pieProps,
    paddingAngle,
    withLabels,
    withLabelsLine,
    size,
    thickness,
    strokeWidth,
    startAngle,
    endAngle,
    tooltipDataSource,
    caption,
    figure,
    children,
    pieChartProps,
    valueFormatter,
    ...others
  } = props;

  const getStyles = useStyles<DonutChartFactory>({
    name: DONUT_CHART,
    classes,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver
  });

  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi<DonutChartFactory>({
    classNames,
    styles,
    props
  });

  const [hoveredCell, setHoveredCell] = useState<number | number[] | undefined>();

  const handleMouseEnter = (index: number) => {
    setHoveredCell(index);
  };

  const handleMouseLeave = () => {
    setHoveredCell(undefined);
  };
  const cells = data.map((item) => (
    <Cell
      id={item.name}
      key={`${item.name}-${item.value}-${item.color}`}
      fill={item.color}
      stroke="var(--chart-stroke-color, var(--mantine-color-body))"
      strokeWidth={strokeWidth}
    />
  ));

  const radiusBase = size / 2;

  return (
    <Box ref={ref} size={size} {...getStyles('root')} {...others}>
      <ResponsiveContainer>
        <ReChartsPieChart {...pieChartProps}>
          <Pie
            data={data}
            innerRadius={radiusBase - thickness}
            outerRadius={radiusBase}
            dataKey="value"
            activeIndex={hoveredCell}
            activeShape={(shape: PieSectorDataItem) => renderActiveShape(shape, size)}
            isAnimationActive={false}
            paddingAngle={paddingAngle}
            startAngle={startAngle}
            endAngle={endAngle}
            label={
              withLabels
                ? {
                    fill: 'var(--chart-labels-color, var(--mantine-color-dimmed))',
                    fontSize: 12,
                    fontFamily: 'var(--mantine-font-family)'
                  }
                : false
            }
            labelLine={
              withLabelsLine
                ? {
                    stroke: 'var(--chart-label-color, var(--mantine-color-dimmed))',
                    strokeWidth: 1
                  }
                : false
            }
            onMouseEnter={(_, index) => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            {...pieProps}
          >
            {cells}
          </Pie>
          <circle
            x="50%"
            y="50%"
            cx={radiusBase}
            cy={radiusBase}
            r={radiusBase * 0.8 - thickness}
            fill="var(--mantine-color-dark-1)"
          />
          <g x="50%" y="50%" transform={`translate(${radiusBase}, ${radiusBase})`}>
            <text textAnchor="middle" dominantBaseline="middle" fill="black" {...getStyles('figure')}>
              {figure}
            </text>

            <text dy="3em" textAnchor="middle" dominantBaseline="middle" fill="black" {...getStyles('caption')}>
              {caption}
            </text>
          </g>
          {withTooltip && (
            <Tooltip
              animationDuration={tooltipAnimationDuration}
              isAnimationActive={false}
              content={({ payload }) => (
                <ChartTooltip
                  payload={data as never}
                  classNames={resolvedClassNames}
                  styles={resolvedStyles}
                  type="radial"
                  segmentId={tooltipDataSource === 'segment' ? payload?.[0]?.name : undefined}
                  valueFormatter={valueFormatter}
                />
              )}
              {...tooltipProps}
            />
          )}
        </ReChartsPieChart>
      </ResponsiveContainer>
    </Box>
  );
});
