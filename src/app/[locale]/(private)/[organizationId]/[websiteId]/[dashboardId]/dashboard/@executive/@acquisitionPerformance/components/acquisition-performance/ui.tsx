'use client';

import { Flex, Title } from '@mantine/core';
import { useFormatter, useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { BaseCard } from '@/components/ui/base-card';
import { useNavigationStore } from '@/context/navigation/store';
import { roundUpToNext } from '@/utils/charts/round-up-to-next';
import { getLabelInterval } from '@/utils/charts/x-axis-interval';
import { formatNumber } from '@/utils/formatters/numbers';

import { AreaChartCard } from '../area-chart-card';

import classes from './index.module.css';
import { AcquisitionPerformanceUIProps } from './types';

export function AcquisitionPerformanceUI({
  endContent,
  headerTitle,
  headerChildren,
  chart
}: Readonly<AcquisitionPerformanceUIProps>) {
  const format = useFormatter();
  const { filters } = useNavigationStore();
  const { channel } = filters;
  const t = useTranslations();

  const labelInterval = useMemo(() => getLabelInterval(chart?.data), [chart?.data]);

  return (
    <BaseCard id="acquisition-performance" headerProps={{ title: headerTitle, children: headerChildren }}>
      <div className={classes['acquisition-performance__wrapper']}>
        <div className={classes['acquisition-performance__container']}>
          {chart.data.length > 0 ? (
            <AreaChartCard
              mt={10}
              w={'100%'}
              h={'95%'}
              withXAxis={true}
              withYAxis={true}
              gridAxis={'none'}
              withTooltip={true}
              curveType={'bump'}
              dataKey={'date'}
              withDots={false}
              strokeDasharray="0"
              splitColors={['green.7', 'red.7']}
              areaChartProps={{
                margin: { left: -5, bottom: 0, right: 20, top: 10 }
              }}
              xAxisProps={{
                height: 35,
                interval: labelInterval,
                domain: [chart.XMin, chart.XMax]
              }}
              yAxisProps={{
                tickFormatter: (tick) =>
                  formatNumber({
                    value: (tick as number) ?? 0,
                    nextIntlFormatter: format,
                    options: { notation: 'compact' }
                  }),
                domain: [0, roundUpToNext(chart.YMax)]
              }}
              fillOpacity={0.3}
              data={chart.data}
              series={[
                {
                  // eslint-disable-next-line i18next/no-literal-string
                  name: 'value',
                  label: t('dashboard.overview.activityCard.trafficCard.tooltip'),
                  gradientStops: [
                    {
                      color: 'var(--color-purple-soft)',
                      offset: '0%', // Start of the gradient
                      opacity: 1 // Full opacity
                    },
                    {
                      color: 'var(--color-purple-soft)',
                      offset: '100%', // End of the gradient
                      opacity: 0.01 // Full opacity
                    }
                  ],
                  color: 'var(--color-purple-600)'
                }
              ]}
              tooltipVariant="compare-past-period"
              tooltipLabel={` ${channel}`}
            />
          ) : (
            <Flex h={353} w="100%" align="center" justify="center">
              <Title fw={700} fz={22}>
                {t('common.noDataGraph')}
              </Title>
            </Flex>
          )}
        </div>
        {endContent}
      </div>
    </BaseCard>
  );
}
