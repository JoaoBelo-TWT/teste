import { Box } from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react';

import { FunnelChartProps } from './types';

import { FunnelChart } from './index';

const meta: Meta<FunnelChartProps> = {
  title: 'Charts/FunnelChart',
  component: FunnelChart,
  parameters: {
    layout: 'centered'
  },
  decorators: [
    (Story) => (
      <Box w={300} h={512}>
        <Story />
      </Box>
    )
  ],
  argTypes: {
    percentage: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      defaultValue: { summary: 100 }
    },
    isPercentageVisible: {
      control: 'boolean'
    }
  },
  tags: ['autodocs']
};

export default meta;

export type Story = StoryObj<FunnelChartProps>;

export const Default: Story = {
  args: {
    title: 'Stage 1',
    trackedEventDescription: 'From Hubspot',
    figureValue: '122',
    figureLabel: 'conversion events',
    percentage: 100
  }
};
