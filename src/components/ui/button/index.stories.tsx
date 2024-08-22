import type { ButtonProps } from '@mantine/core';
import { ArrowDown, ArrowUp } from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '.';

const meta: Meta<ButtonProps> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    size: {
      control: { type: 'text' },
      description: 'Button size (e.g., "small", "medium", "large")'
    },
    color: {
      control: { type: 'color' },
      description: 'Button color'
    },
    gradient: {
      control: { type: 'text' },
      description: 'Gradient configuration for variant="gradient"'
    },
    loading: {
      control: { type: 'boolean' },
      description: 'If true, shows a loading indicator'
    },
    autoContrast: {
      control: { type: 'boolean' },
      description: 'Auto contrast for text color based on background'
    },
    'data-disabled': {
      control: { type: 'boolean' },
      description: 'Button data-disabled attribute'
    },
    variant: {
      control: { type: 'select' },
      options: ['filled', 'light', 'outline', 'transparent', 'white', 'subtle', 'default', 'gradient'],
      description: 'Button variant'
    },
    children: {
      control: { type: 'text' },
      description: 'Button content'
    }
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<ButtonProps>;

export const DefaultButton: Story = {
  args: {
    variant: 'filled',
    size: 'medium',
    children: 'Primary'
  }
};

export const SmallButton: Story = {
  args: {
    variant: 'filled',
    size: 'small',
    children: 'Primary'
  }
};

export const LargeButton: Story = {
  args: {
    variant: 'filled',
    size: 'large',
    children: 'Primary'
  }
};

export const LargeLoadingButton: Story = {
  args: {
    variant: 'filled',
    size: 'large',
    loading: true,
    'data-disabled': true,
    disabled: true,
    children: 'Primary'
  }
};

export const SizeVariants: Story = {
  args: {
    size: 'medium',
    children: 'Medium Button'
  }
};

export const WithSections: Story = {
  args: {
    size: 'medium',
    leftSection: <ArrowDown />,
    rightSection: <ArrowUp />,
    children: 'Button with Icons'
  }
};

export const GradientButton: Story = {
  args: {
    size: 'medium',
    variant: 'gradient',
    gradient: { from: 'indigo', to: 'cyan' },
    children: 'Gradient Button'
  }
};

export const LoadingButton: Story = {
  args: {
    size: 'medium',
    loading: true,
    children: 'Loading Button'
  }
};
