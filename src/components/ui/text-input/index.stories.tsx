import type { TextInputProps } from '@mantine/core';
import { Button } from '@mantine/core';
import { CaretDown } from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/react';

import { TextInput } from '.';

const meta: Meta<TextInputProps> = {
  title: 'UI/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered'
  },
  tags: []
};

export default meta;

type Story = StoryObj<TextInputProps>;

export const Default: Story = {
  args: {
    label: 'TITLE',
    placeholder: 'Input placeholder',
    radius: 'xs'
  }
};

export const DefaultError: Story = {
  args: {
    label: 'TITLE',
    placeholder: 'Input placeholder',
    radius: 'xs',
    error: true
  }
};

export const WithDropDown: Story = {
  args: {
    labelProps: {
      fz: '12px',
      fw: '400'
    },
    label: 'TITLE',
    placeholder: 'Input placeholder',
    radius: 'xs',
    leftSectionWidth: '87px',
    leftSection: (
      <Button pl={0} pr={0} variant="transparent" fw="400" color="dark" fullWidth rightSection={<CaretDown />}>
        Matches
      </Button>
    )
  }
};
