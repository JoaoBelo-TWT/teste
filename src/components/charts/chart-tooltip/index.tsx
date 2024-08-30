import { Box, factory, getThemeColor, useProps, useStyles, useMantineTheme } from '@mantine/core';

import { ComparePastPeriodTooltip } from './compare-past-period-tooltip';
import classes from './index.module.css';
import { ChartTooltipFactory } from './types';
import { CHART_TOOLTIP, defaultProps, getData, getFilteredChartTooltipPayload, getSeriesLabels } from './utils';

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
    variant = 'default',
    ...others
  } = props;

  if (variant === 'compare-past-period') {
    return <ComparePastPeriodTooltip {...props} />;
  }

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
