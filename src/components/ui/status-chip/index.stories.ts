import type { Meta, StoryObj } from '@storybook/react';

import { StatusChip } from '.';

const meta: Meta<typeof StatusChip> = {
  title: 'UI/Status-chip',
  component: StatusChip,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    label: {
      control: 'text'
    }
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof StatusChip>;

export const Default: Story = {
  args: {
    label: 'Off track'
  }
};
