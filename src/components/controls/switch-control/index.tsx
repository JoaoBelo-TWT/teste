import { SwitchProps } from '@mantine/core';
import { Controller, FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';

import { Switch } from '@/components/ui/switch';

export function SwitchControl<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  className,
  name,
  control,
  ...rest
}: UseControllerProps<TFieldValues, TName> & Readonly<SwitchProps>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Switch
          {...field}
          {...rest}
          checked={field.value}
          onChange={(value) => field.onChange(value)}
          ref={field.ref}
        />
      )}
    />
  );
}
