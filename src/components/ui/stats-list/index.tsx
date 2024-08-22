'use client';

import { Grid } from '@mantine/core';

import { SPACING } from '@/resources/constants';

import { StatItem } from '../stat-item';

import { StatsListProps } from './types';

export function StatsList({ list, variant = 'default', colProps, loading, ...rest }: StatsListProps) {
  return (
    <Grid gutter={variant !== 'default' ? { xs: 60 } : { xs: SPACING.lg }} {...rest}>
      {list.map((stat, index) => (
        // eslint-disable-next-line i18next/no-literal-string
        <Grid.Col key={stat.label + index} span={'auto'} {...colProps}>
          <StatItem label={stat.label} value={stat.value} variant={stat.variant || variant} loading={loading} />
        </Grid.Col>
      ))}
    </Grid>
  );
}
