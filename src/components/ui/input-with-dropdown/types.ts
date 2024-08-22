import type { TextInputProps } from '@mantine/core';

import { DropdownData } from '@/components/ui/dropdown/types';

export interface Control {
  data: DropdownData;
}

export type InputWithDropdownProps = TextInputProps & Control;
