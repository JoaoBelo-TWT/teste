import { TextInput as MantineTextInput, rem, type TextInputProps, type InputLabelProps } from '@mantine/core';
import { WarningCircle } from '@phosphor-icons/react/dist/ssr';
import { forwardRef } from 'react';

import { SPACING } from '@/resources/constants';

import classes from './index.module.css';

export const labelProps: InputLabelProps = { fz: rem('12px'), fw: '400', tt: 'uppercase', mx: SPACING.xs };

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({ error, ...rest }, ref) => (
  <MantineTextInput
    labelProps={labelProps}
    classNames={
      rest.classNames ?? {
        input: classes['text-input__input']
      }
    }
    ref={ref}
    error={error}
    rightSection={error && <WarningCircle size={SPACING.sm} weight="fill" color="var(--system-red-color)" />}
    {...rest}
  />
));

TextInput.displayName = 'TextInput';
