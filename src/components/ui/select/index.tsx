import { Select as MantineSelect, rem, type SelectProps } from '@mantine/core';
import { CaretDown, WarningCircle } from '@phosphor-icons/react/dist/ssr';
import { forwardRef } from 'react';

import classes from './index.module.css';

export const Select = forwardRef<HTMLInputElement, SelectProps>(({ error, ...props }, ref) => (
  <MantineSelect
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
      dropdown: classes.select__dropdown,
      input: classes.select__input,
      option: classes.select__option
    }}
    {...props}
  ></MantineSelect>
));

Select.displayName = 'Select';
