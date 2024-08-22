import { NumberInput, rem, type NumberInputProps } from '@mantine/core';
import { WarningCircle } from '@phosphor-icons/react/dist/ssr';
import { Controller, FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';

import { SPACING } from '@/resources/constants';

import classes from './index.module.css';

export function HeroControl<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  className,
  name,
  control,
  error,
  ...rest
}: UseControllerProps<TFieldValues, TName> & Readonly<NumberInputProps>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <NumberInput
          {...field}
          labelProps={{ fz: rem('12px'), fw: '400', tt: 'uppercase' }}
          rightSection={error && <WarningCircle size={SPACING.sm} weight="fill" color="var(--system-red-color)" />}
          classNames={{ input: classes['hero-control__input'] }}
          onChange={(value) => field.onChange(value)}
          error={error}
          {...rest}
          ref={field.ref}
        />
      )}
    />
  );
}
