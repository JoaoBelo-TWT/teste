'use client';

import { useTranslations } from 'next-intl';
import React, { useEffect, useRef, useState } from 'react';
import {
  BarChart as RechartBarChart,
  Bar,
  XAxis,
  LabelList,
  Label,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
  Tooltip as TooltipRecharts
} from 'recharts';

import { ChartTooltip } from '@/components/charts/chart-tooltip';
import { useNavigationStore } from '@/context/navigation/store';
import { COLORS } from '@/resources/constants';

import CustomizedAxisTick from './custom-axis';
import { renderCustomizedLabel } from './custom-label';
import classes from './index.module.css';
import { BarChartProps } from './types';
import { gradientsList, strokeList, verticalCoordinatesGenerator } from './utils';

export default function BarChart({ data }: BarChartProps) {
  const t = useTranslations();
  const containerRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState<number>(0);
  const { filters } = useNavigationStore();
  const withOrganic = data?.[0]?.organicCount !== null && data?.[0]?.organicCount !== undefined;
  // eslint-disable-next-line i18next/no-literal-string
  const mainTotalName = !withOrganic ? 'totalCount' : 'paidCount';

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setChartWidth(Math.max(containerRef.current.offsetWidth, data.length * 200));
      }
    };

    handleResize();
    // eslint-disable-next-line i18next/no-literal-string
    window.addEventListener('resize', handleResize);
    // eslint-disable-next-line i18next/no-literal-string
    return () => window.removeEventListener('resize', handleResize);
  }, [data.length]);

  const dataWithColors = data.map((item, index) => ({
    ...item,
    color: strokeList[index < 4 ? index : index % 4]
  }));

  return (
    <div ref={containerRef}>
      <div className={classes['bar-chart']}>
        <ResponsiveContainer width={chartWidth} height={500}>
          <RechartBarChart
            barCategoryGap={0}
            data={dataWithColors}
            margin={{
              top: 50,
              right: 0,
              left: 0,
              bottom: 0
            }}
          >
            <CartesianGrid
              fill={COLORS.gray}
              horizontal={false}
              x={0}
              y={-40}
              height={453}
              syncWithTicks={false}
              verticalCoordinatesGenerator={(props) => verticalCoordinatesGenerator(props.width, data.length)}
            />
            <defs>
              <linearGradient id={gradientsList[0]} x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor={COLORS.colorPaleBlue} />
                <stop offset="100%" stopColor={COLORS.colorMayaBlue} />
              </linearGradient>
              <linearGradient id={gradientsList[1]} x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor={COLORS.colorLightAqua} />
                <stop offset="100%" stopColor={COLORS.colorGreenSoft} />
              </linearGradient>
              <linearGradient id={gradientsList[2]} x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor={COLORS.colorPinkSoft} />
                <stop offset="100%" stopColor={COLORS.colorPurpleThunder} />
              </linearGradient>
              <linearGradient id={gradientsList[3]} x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor={COLORS.colorYellowSoft} />
                <stop offset="100%" stopColor={COLORS.flatOrange600} />
              </linearGradient>
            </defs>
            <Label />
            {withOrganic && (
              <TooltipRecharts
                cursor={{ fill: 'transparent' }}
                content={(content) => {
                  const payload = content.payload as unknown as { name: string; value: number }[];
                  return (
                    <ChartTooltip
                      label={filters.timeframe.replace(/([a-z])([A-Z])/g, '$1 $2')}
                      type="area"
                      payload={payload as never}
                      unit={''}
                      series={[
                        {
                          // eslint-disable-next-line i18next/no-literal-string
                          name: 'paidCount',
                          label: t('website.paid').toLowerCase(),
                          color: 'var(--color-pink-flamingo)'
                        },
                        {
                          // eslint-disable-next-line i18next/no-literal-string
                          name: 'organicCount',
                          label: t('website.organic').toLowerCase(),
                          color: 'var(--color-green-soft)'
                        }
                      ]}
                    />
                  );
                }}
              />
            )}

            <XAxis dataKey="name" axisLine={false} tickLine={false} height={88} tick={<CustomizedAxisTick />} />
            <Bar dataKey={mainTotalName} stackId="a" height={100}>
              {data.map((_, index) => (
                <Cell
                  strokeWidth={1}
                  key={`cell-${index}`}
                  fill={`url(#${gradientsList[index < 4 ? index : index % 4]})`}
                  stroke={strokeList[index < 4 ? index : index % 4]}
                />
              ))}
            </Bar>
            <Bar dataKey="organicCount" stackId="a">
              {data.map((_, index) => (
                <Cell
                  strokeWidth={1}
                  fill={`url(#${gradientsList[index < 4 ? index : index % 4]})`}
                  stroke={strokeList[index < 4 ? index : index % 4]}
                  key={`cell-${index}`}
                  fillOpacity={0.3}
                />
              ))}

              <LabelList
                style={{ fontSize: '14px' }}
                dataKey="totalCount"
                position="top"
                stroke="none"
                fill="#2B2039"
                offset={15}
                content={(props) =>
                  renderCustomizedLabel({
                    ...props,
                    data: dataWithColors,
                    organicTranslation: t('website.organic'),
                    paidTranslation: t('website.paid')
                  })
                }
              />
            </Bar>
          </RechartBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
