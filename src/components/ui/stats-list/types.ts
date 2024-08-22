import { GridColProps, GridProps } from '@mantine/core';

import { StatVariantType } from '@/types/common';

import { StatItemProps } from '../stat-item/types';

export interface StatsListProps extends GridProps {
  list: StatItemProps[];
  variant?: StatVariantType;
  colProps?: GridColProps;
  loading?: boolean;
}
