'use client';

import { SimpleGrid } from '@mantine/core';
import clsx from 'clsx';

import { BaseCard } from '@/components/ui/base-card';

import { DonutChartWrapper } from '../donut-chart-wrapper';
import { StatusCard } from '../status-card';

import classes from './index.module.css';
import { ChannelPerformanceUIProps } from './types';

export function ChannelPerformanceUI({
  headerTitle,
  headerChildren,
  donutChart,
  performanceCards,
  selectedFunnel,
  endContent
}: Readonly<ChannelPerformanceUIProps>) {
  const donutChartFigureLength = donutChart.figure?.length ?? 0;
  return (
    <BaseCard
      id="channel-performance"
      headerProps={{
        title: headerTitle,
        children: headerChildren
      }}
    >
      <div className={classes['channel-performance__container']}>
        <div className={classes['channel-performance__chart-container']}>
          <DonutChartWrapper
            mx="auto"
            tooltipAnimationDuration={300}
            strokeWidth={0}
            classNames={{
              caption: classes['channel-performance__caption'],
              figure: clsx(
                classes['channel-performance__figure'],
                classes[`channel-performance__figure--${donutChartFigureLength > 20 ? 'small' : 'large'}`]
              )
            }}
            tooltipDataSource="segment"
            data={donutChart.data}
            figure={donutChart.figure}
            caption={donutChart.caption}
          />
        </div>
        <div className={classes['channel-performance__grid-container']}>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={{ base: 8, md: 24 }} verticalSpacing={{ base: 8, md: 24 }}>
            {performanceCards.map((section) => (
              <StatusCard
                key={section.title}
                title={section.title}
                color={section.color}
                channelName={selectedFunnel}
                channelCount={section.channelCount}
                spend={section.spend}
                perChannel={section.perChannel}
                href={section?.href}
              />
            ))}
          </SimpleGrid>
        </div>
        {endContent}
      </div>
    </BaseCard>
  );
}
