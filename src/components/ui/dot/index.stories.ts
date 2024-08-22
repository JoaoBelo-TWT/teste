import type { Meta, StoryObj } from '@storybook/react';

import { Dot } from '.';

const meta: Meta<typeof Dot> = {
  title: 'UI/Dot',
  component: Dot, // Used as an example component for Storybook metadata
  parameters: {
    layout: 'centered'
  }
};

export default meta;

type Story = StoryObj<typeof Dot>;

export const Default: Story = {};
