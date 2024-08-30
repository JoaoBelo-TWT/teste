'use client';

import { useFormatter, useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { BaseCard } from '@/components/ui/base-card';
import { roundUpToNext } from '@/utils/charts/round-up-to-next';
import { getLabelInterval } from '@/utils/charts/x-axis-interval';
import { formatNumber } from '@/utils/formatters/numbers';

import { AreaChartCard } from '../area-chart-card';
import { ConversionRateCard } from '../conversion-rate-card';
import { TableCard } from '../table-card';
import { WebsiteVisitsCard } from '../website-visits-card';

import classes from './index.module.css';
import { WebSiteActivityUIProps } from './types';

export function WebSiteActivityUI({
  headerTitle,
  headerChildren,
  table,
  conversionRate,
  websiteVisits,
  chart,
  endContent,
  websiteUrl
}: Readonly<WebSiteActivityUIProps>) {
  const t = useTranslations();
  const format = useFormatter();

  const labelInterval = useMemo(() => getLabelInterval(chart?.data), [chart?.data]);

  return (
    <BaseCard
      headerProps={{
        title: headerTitle,
        children: headerChildren
      }}
    >
      <div className={classes['website-activity__container']}>
        {table && (
          <div className={classes['website-activity__table']}>
            <TableCard headers={table.headers} data={table.data} websiteUrl={websiteUrl} />
          </div>
        )}
        <div className={classes['website-activity__container-right']}>
          <div className={classes['website-activity__top-cards']}>
            <WebsiteVisitsCard visits={websiteVisits || 0} />
            {conversionRate && <ConversionRateCard figure={conversionRate.figure} src={conversionRate.src} />}
          </div>
          {chart && (
            <div className={classes['website-activity__chart']}>
              <AreaChartCard
                w={'100%'}
                h={'100%'}
                withXAxis={true}
                withYAxis={true}
                gridAxis={'none'}
                withTooltip={true}
                curveType={'bump'}
                dataKey={'date'}
                withDots={true}
                strokeDasharray="0"
                splitColors={['green.7', 'red.7']}
                areaChartProps={{
                  margin: { left: 5, bottom: 0 },
                  innerRadius: '24px'
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
                tooltipLabel={` ${t('common.views')}`}
              />
            </div>
          )}
        </div>
        {endContent}
      </div>
    </BaseCard>
  );
}
