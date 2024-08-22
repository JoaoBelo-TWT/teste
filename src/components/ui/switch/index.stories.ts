import type { Meta, StoryObj } from '@storybook/react';

import { Switch } from '.';

const meta: Meta<typeof Switch> = {
  title: 'UI/Switch',
  component: Switch,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    'aria-label': {
      control: { type: 'text' },
      defaultValue: { summary: '' },
      description: 'Accessibility label'
    },
    checked: {
      control: { type: 'boolean' },
      description: 'Toggle check state'
    }
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {};
