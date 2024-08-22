import { rem, type TextareaProps, type InputLabelProps, Textarea } from '@mantine/core';
import { WarningCircle } from '@phosphor-icons/react/dist/ssr';
import { forwardRef } from 'react';

import { SPACING } from '@/resources/constants';

import classes from './index.module.css';

export const labelProps: InputLabelProps = { fz: rem('12px'), fw: '400', tt: 'uppercase', mx: SPACING.xs };

export const TextAreaInput = forwardRef<HTMLTextAreaElement, TextareaProps>(({ error, ...rest }, ref) => (
  <Textarea
    labelProps={labelProps}
    classNames={
      rest.classNames ?? {
        input: classes['text-area__input']
      }
    }
    ref={ref}
    error={error}
    rightSection={error && <WarningCircle size={SPACING.sm} weight="fill" color="var(--system-red-color)" />}
    {...rest}
  />
));

TextAreaInput.displayName = 'TextAreaInput';
