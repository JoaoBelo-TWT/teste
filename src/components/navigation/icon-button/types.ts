import { ActionIconProps } from '@mantine/core';
import { Url } from 'next/dist/shared/lib/router/router';

import { DropdownData } from '@/components/ui/dropdown/types';

export interface IconButtonProps extends ActionIconProps {
  href?: Url;
  prefetch?: boolean;
  regex?: RegExp | string;
  dropdownData?: DropdownData;
  onClick?: () => void;
  onMouseEnter?: () => void;
  label?: string;
  headerLabel?: string;
  tooltip?: string;
}
