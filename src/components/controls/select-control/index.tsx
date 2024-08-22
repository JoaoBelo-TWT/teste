import { SelectProps } from '@mantine/core';
import { Controller, FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';

import { Select } from '@/components/ui/select';

export function SelectControl<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  data,
  className,
  name,
  control,
  ...rest
}: UseControllerProps<TFieldValues, TName> & Readonly<SelectProps>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select {...field} onChange={(value) => field.onChange(value)} data={data} {...rest} ref={field.ref} />
      )}
    />
  );
}
