import type { Meta, StoryObj } from '@storybook/react';

import { ProgressIcon } from '.';

const meta: Meta<typeof ProgressIcon> = {
  title: 'UI/Progress-icon',
  component: ProgressIcon, // Used as an example component for Storybook metadata
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    isComplete: {
      control: 'boolean',
      defaultValue: false,
      description: 'Is complete'
    }
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof ProgressIcon>;

export const Default: Story = {
  args: {
    isComplete: false
  }
};

export const Complete: Story = {
  args: {
    isComplete: true
  }
};
