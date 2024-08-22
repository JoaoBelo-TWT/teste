import { FlexProps } from '@mantine/core';

import { StatVariantType } from '@/types/common';

export interface StatItemProps extends FlexProps {
  value: string | number;
  label: string;
  variant?: StatVariantType;
  loading?: boolean;
}
