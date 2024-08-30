import { Box, factory, Flex, Text, useProps, useStyles } from '@mantine/core';
import dayjs from 'dayjs';
import { useFormatter, useTranslations } from 'next-intl';

import { DashboardTimeframe } from '@/__generated__/graphql';
import { useNavigationStore } from '@/context/navigation/store';
import { COLORS } from '@/resources/constants';
import { formatNumber } from '@/utils/formatters/numbers';

import classes from './index.module.css';
import { ChartTooltipFactory, ComparePreviousDataTooltipProps } from './types';
import { CHART_TOOLTIP, defaultProps, getFilteredChartTooltipPayload, getPercentageDifference } from './utils';

export const ComparePastPeriodTooltip = factory<ChartTooltipFactory>((_props, ref) => {
  const props = useProps(CHART_TOOLTIP, defaultProps, _props);
  const { filters } = useNavigationStore();
  const t = useTranslations();
  const format = useFormatter();

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

  const getChartDate = (date?: string) => {
    switch (filters.timeframe) {
      case DashboardTimeframe.LastDay:
        return `${dayjs(date).format('ddd MMM D, YYYY HH[h]')}`;
      case DashboardTimeframe.ThisWeek:
      case DashboardTimeframe.ThisMonth:
        return dayjs(date).utc().format('ddd MMM D, YYYY');
      case DashboardTimeframe.ThisYear:
        return dayjs(date).utc().format('MMM, YYYY');
      default:
        return dayjs(date).utc().format('DD');
    }
  };

  const getChartPeriod = () => {
    switch (filters.timeframe) {
      case DashboardTimeframe.LastDay:
        return t('dashboard.overview.activityCard.trafficCard.previousHour');
      case DashboardTimeframe.ThisWeek:
      case DashboardTimeframe.ThisMonth:
        return t('dashboard.overview.activityCard.trafficCard.previousDay');
      case DashboardTimeframe.ThisYear:
        return t('dashboard.overview.activityCard.trafficCard.previousMonth');
      default:
        return null;
    }
  };

  if (!payload) {
    return null;
  }
  const filteredPayload = getFilteredChartTooltipPayload(payload, segmentId);
  const data = filteredPayload[0]?.payload as unknown as ComparePreviousDataTooltipProps;

  if (!data) {
    return null;
  }

  const percentageDifference = getPercentageDifference(data.value, data.previousValue);
  const pastPeriodText = getChartPeriod();

  return (
    <Box {...getStyles('tooltip')} mod={[{ type }, mod]} ref={ref} {...others}>
      <div {...getStyles('tooltipBody')}>
        <div {...getStyles('tooltipItem')}>
          <div {...getStyles('tooltipItemBody')}>
            <Box
              h="100%"
              w={4}
              style={{
                borderRadius: 4,
                background: COLORS.colorPurple600
              }}
            />
            <Flex direction="column" gap={4}>
              {data.originalDate && (
                <Text tt="uppercase" c="dark.5" fz={12}>
                  {getChartDate(data.originalDate)}
                </Text>
              )}
              <Text tt="uppercase" c="white" fz={14}>
                {formatNumber({
                  value: data.value || 0,
                  nextIntlFormatter: format,
                  options: { notation: 'compact' }
                })}
                {label}
              </Text>
              {percentageDifference !== undefined && (
                <Flex mt={4} gap={4} align="center">
                  <Box pr={4} pl={4} pt={1} bg="dark.8" style={{ borderRadius: 3 }}>
                    <Text fz={12} fw={400} c={percentageDifference > 0 ? 'green' : 'red'}>
                      {percentageDifference > -1 && '+'}
                      {percentageDifference}%
                    </Text>
                  </Box>
                  {pastPeriodText && (
                    <Text c="dark.5" fz={12}>
                      {getChartPeriod()}
                    </Text>
                  )}
                </Flex>
              )}
            </Flex>
            <div {...getStyles('tooltipItemName')}></div>
          </div>
        </div>
      </div>
    </Box>
  );
});
