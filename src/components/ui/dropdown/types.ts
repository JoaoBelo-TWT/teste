import { ComboboxOptionProps, ComboboxProps } from '@mantine/core';
import { Url } from 'next/dist/shared/lib/router/router';
import { ReactElement } from 'react';

export type DropdownData = {
  value: string | undefined;
  label: string | React.ReactNode;
  href?: Url;
  preFetch?: boolean;
  disabled?: boolean;
  comboboxOptions?: Omit<ComboboxOptionProps, 'value'>;
  onClick?: () => void;
  rightContent?: ReactElement;
  leftContent?: ReactElement;
}[];

export interface DropdownProps extends ComboboxProps {
  data: DropdownData;
  children: React.ReactNode;
  headerLabel?: string | React.ReactNode;
  isLightMode?: boolean;
  closeOnPageScroll?: boolean;
  onMouseLeave?: () => void;
  onMouseEnter?: () => void;
  onClick?: () => void;
  onDropdownMouseLeave?: () => void;
  onDropdownMouseEnter?: () => void;
  onDropdownClickAny?: () => void;
  noPadding?: boolean;
  viewOnly?: boolean;
  maxDropdownHeight?: number;
}
