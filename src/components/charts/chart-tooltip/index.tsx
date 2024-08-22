import { ChartSeries } from '@mantine/charts';
import {
  Box,
  BoxProps,
  ElementProps,
  factory,
  Factory,
  getThemeColor,
  StylesApiProps,
  useProps,
  useStyles,
  useMantineTheme
} from '@mantine/core';

import classes from './index.module.css';

type ChartSeriesLabels = Record<string, string | undefined>;

export function getSeriesLabels(series: ChartSeries[] | undefined): ChartSeriesLabels {
  if (!series) {
    return {};
  }

  return series.reduce<ChartSeriesLabels>((acc, item) => {
    acc[item.name] = item.label;
    return acc;
  }, {});
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

function getData(item: Record<string, unknown>, type: 'area' | 'radial') {
  if (type === 'radial') {
    return item.value as number;
  }

  return (item.payload as Record<string, number>)[item.dataKey as string];
}

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
}

export type ChartTooltipFactory = Factory<{
  props: ChartTooltipProps;
  ref: HTMLDivElement;
  stylesNames: ChartTooltipStylesNames;
}>;

const defaultProps: Partial<ChartTooltipProps> = {
  type: 'area'
};

const CHART_TOOLTIP = 'ChartTooltip';

export const ChartTooltip = factory<ChartTooltipFactory>((_props, ref) => {
  const props = useProps(CHART_TOOLTIP, defaultProps, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    payload,
    label,
    unit,
    type,
    segmentId,
    mod,
    series,
    valueFormatter,
    ...others
  } = props;

  const getStyles = useStyles<ChartTooltipFactory>({
    name: CHART_TOOLTIP,
    classes,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled
  });

  if (!payload) {
    return null;
  }
  const theme = useMantineTheme();
  const filteredPayload = getFilteredChartTooltipPayload(payload, segmentId);
  const labels = getSeriesLabels(series);
  const items = filteredPayload.map((item, index) => (
    <div key={item.name as string} {...getStyles('tooltipItem')}>
      <div {...getStyles('tooltipItemBody')}>
        <Box
          h={17}
          w={4}
          style={{
            borderRadius: 4,
            /* eslint-disable i18next/no-literal-string */
            background:
              (item.payload as { color?: string })?.color ??
              getThemeColor(series?.[index]?.color || (item.color as string), theme),
            filter: index === 0 && filteredPayload.length > 1 ? 'brightness(1.5)' : 'none'
          }}
        />
        <div {...getStyles('tooltipItemName')}>{labels[item.name as string] ?? item.name}</div>
      </div>
      <div {...getStyles('tooltipItemData')}>
        {typeof valueFormatter === 'function' ? valueFormatter(getData(item, type)) : getData(item, type ?? 'area')}
        {unit}
      </div>
    </div>
  ));

  return (
    <Box {...getStyles('tooltip')} mod={[{ type }, mod]} ref={ref} {...others}>
      {label && <div {...getStyles('tooltipLabel')}>{label}</div>}
      <div {...getStyles('tooltipBody')}>{items}</div>
    </Box>
  );
});
