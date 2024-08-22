import { StoryObj, Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { useForm } from 'react-hook-form';

import { InputWithDropdown } from '.';

const meta: Meta<typeof InputWithDropdown> = {
  title: 'UI/InputWithDropdown',
  component: InputWithDropdown,
  parameters: {
    layout: 'centered'
  }
};

export default meta;

interface FormValues {
  inputWithDropdown: string;
}

export type Story = StoryObj<typeof InputWithDropdown>;

const Template: StoryFn = (args) => {
  const methods = useForm<FormValues>({
    defaultValues: { inputWithDropdown: '' }
  });
  const { control } = methods;

  return (
    <InputWithDropdown
      dropdownControlName={'inputWithDropdown'}
      name="inputWithDropdown"
      control={control}
      data={[
        { value: 'a', label: 'Option a' },
        { value: 'b', label: 'Option b' },
        { value: 'c', label: 'Option c' }
      ]}
      {...args}
    />
  );
};

export const Text = Template.bind({});

Text.args = {
  name: 'inputWithDropdown',
  placeholder: 'Input example',
  label: 'TITLE'
};
