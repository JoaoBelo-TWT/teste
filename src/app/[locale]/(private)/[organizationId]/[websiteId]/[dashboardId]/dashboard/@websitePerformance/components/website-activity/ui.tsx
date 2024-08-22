'use client';

import { useTranslations } from 'next-intl';

import { BaseCard } from '@/components/ui/base-card';

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
  const t = useTranslations('dashboard.overview.activityCard.trafficCard');

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
                withYAxis={false}
                gridAxis={'none'}
                withTooltip={true}
                curveType={'bump'}
                dataKey={'date'}
                withDots={true}
                splitColors={['green.7', 'red.7']}
                areaChartProps={{
                  width: 400,
                  margin: { left: 0, bottom: 0 },
                  innerRadius: '24px'
                }}
                xAxisProps={{
                  height: 58,
                  domain: [chart.XMin, chart.XMax]
                }}
                yAxisProps={{
                  display: 'hidden',
                  domain: [0, chart.YMax]
                }}
                fillOpacity={0.3}
                data={chart.data}
                series={[
                  {
                    // eslint-disable-next-line i18next/no-literal-string
                    name: 'traffic',
                    label: t('tooltip'),
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
                    radius: 24,
                    color: 'var(--color-purple-600)'
                  }
                ]}
              />
            </div>
          )}
        </div>
        {endContent}
      </div>
    </BaseCard>
  );
}
