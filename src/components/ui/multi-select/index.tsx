import { MultiSelect as MantineMultiSelect, rem, type MultiSelectProps } from '@mantine/core';
import { CaretDown, WarningCircle } from '@phosphor-icons/react/dist/ssr';
import { forwardRef } from 'react';

import classes from './index.module.css';

export const MultiSelect = forwardRef<HTMLInputElement, MultiSelectProps>(({ error, ...props }, ref) => (
  <MantineMultiSelect
    error={error}
    labelProps={{
      fz: rem('12px'),
      fw: '400',
      tt: 'uppercase',
      mx: 8
    }}
    comboboxProps={{ offset: 0 }}
    rightSectionWidth={error ? '56px' : 'auto'}
    rightSection={
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingRight: '16px' }}>
        {error && <WarningCircle size={16} weight="fill" color="var(--system-red-color)" />}
        <CaretDown size={16} color="var(--mantine-color-dark-9)" />
      </div>
    }
    radius="xs"
    ref={ref}
    classNames={{
      dropdown: classes['multi-select__dropdown'],
      input: classes['multi-select__input'],
      option: classes['multi-select__option']
    }}
    {...props}
  ></MantineMultiSelect>
));

MultiSelect.displayName = 'MultiSelect';
