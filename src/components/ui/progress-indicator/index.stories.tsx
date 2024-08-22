import { Box } from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react';

import { ProgressIndicator } from '.';

const meta: Meta<typeof ProgressIndicator> = {
  title: 'UI/ProgressIndicator',
  component: ProgressIndicator,
  decorators: [
    (Story) => (
      <Box w={400}>
        <Story />
      </Box>
    )
  ],
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    'aria-label': {
      control: { type: 'text' },
      defaultValue: { summary: '' },
      description: 'Accessibility label'
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 }
    }
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof ProgressIndicator>;

export const Default: Story = {
  args: {
    value: 50
  }
};
