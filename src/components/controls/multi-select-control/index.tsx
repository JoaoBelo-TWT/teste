import { MultiSelectProps } from '@mantine/core';
import { Control, Controller, FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';

import { MultiSelect } from '@/components/ui/multi-select';

export function MultiSelectControl<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  data,
  className,
  name,
  control,
  ...rest
}: UseControllerProps<TFieldValues, TName> & Readonly<MultiSelectProps> & { control: Control<TFieldValues> }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <MultiSelect {...field} onChange={(value) => field.onChange(value)} data={data} {...rest} ref={field.ref} />
      )}
    />
  );
}
