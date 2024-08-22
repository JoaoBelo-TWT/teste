import type { ActionIconProps } from '@mantine/core';
import { CaretLeft, X } from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/react';

import { IconButton } from '.';

const meta: Meta<ActionIconProps> = {
  title: 'UI/Icon Button',
  component: IconButton,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    children: {
      description: 'Button icon'
    }
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<ActionIconProps>;

export const DefaultButton: Story = {
  args: {
    children: <CaretLeft width="16px" height="16px" />
  }
};

export const CrossSmallButton: Story = {
  args: {
    size: 36,
    radius: '100px',
    children: <CaretLeft width={16} height={16} />,
    disabled: false,
    color: 'dark',
    autoContrast: true
  }
};

export const CrossMediumButton: Story = {
  args: {
    size: 44,
    radius: '100px',
    children: <CaretLeft width={16} height={16} />,
    disabled: false,
    color: 'dark',
    autoContrast: true
  }
};

export const CrossLargeButton: Story = {
  args: {
    size: 56,
    radius: '100px',
    children: <X width={16} height={16} />,
    disabled: false,
    color: 'dark',
    autoContrast: true
  }
};
