import { useCombobox } from '@mantine/core';
import { CaretDown } from '@phosphor-icons/react/dist/ssr';
import { Controller, FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';

import { Button } from '@/components/ui/button';

import { Dropdown } from '../dropdown';
import { TextInput } from '../text-input';

import classes from './index.module.css';
import { InputWithDropdownProps } from './types';

export function InputWithDropdown<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  data,
  className,
  name,
  control,
  dropdownControlName,
  ...rest
}: UseControllerProps<TFieldValues, TName> &
  Readonly<InputWithDropdownProps & { dropdownControlName: FieldPath<TFieldValues> }>) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: (eventSource) => {
      if (eventSource === 'keyboard') {
        combobox.selectActiveOption();
      } else {
        combobox.updateSelectedOptionIndex('active');
      }
    }
  });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextInput
          error={fieldState.error?.message}
          {...field}
          leftSectionProps={{ className: classes['input-with-dropdown__left-section'] }}
          classNames={{ input: classes['input-with-dropdown__input'], label: classes['input-with-dropdown__label'] }}
          {...rest}
          onFocus={() => {
            combobox.closeDropdown();
          }}
          leftSection={
            <Controller
              name={dropdownControlName}
              control={control}
              render={({ field: dropdownField }) => (
                <Dropdown
                  width="target"
                  store={combobox}
                  data={data}
                  offset={5}
                  withinPortal
                  isLightMode
                  onOptionSubmit={(value) => {
                    dropdownField.onChange(value);
                    combobox.closeDropdown();
                  }}
                >
                  <Button
                    type="button"
                    onClick={() => combobox.toggleDropdown()}
                    pl={0}
                    pr={0}
                    variant="transparent"
                    fw="400"
                    color="dark"
                    fullWidth
                    rightSection={<CaretDown />}
                  >
                    {data.find((item) => item.value === dropdownField.value)?.label}
                  </Button>
                </Dropdown>
              )}
            />
          }
        />
      )}
    />
  );
}
