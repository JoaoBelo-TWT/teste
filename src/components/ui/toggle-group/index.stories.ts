import type { Meta, StoryObj } from '@storybook/react';

import { ToggleGroup } from '.';

const meta: Meta<typeof ToggleGroup> = {
  title: 'UI/ToggleGroup',
  component: ToggleGroup,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      defaultValue: false,
      description: 'Is toggle disabled'
    }
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof ToggleGroup>;

export const Default: Story = {
  args: {
    data: ['Item 1', 'Item 2', 'Item 3']
  }
};
