import type { Meta, StoryObj } from '@storybook/react';

import { LabelChip } from '.';

const meta: Meta<typeof LabelChip> = {
  title: 'UI/Label-chip',
  component: LabelChip,
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

type Story = StoryObj<typeof LabelChip>;

export const Default: Story = {
  args: {
    label: 'Recommended'
  }
};
