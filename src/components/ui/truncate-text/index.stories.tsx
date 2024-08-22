import type { TextareaProps } from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react';
import { TruncateText } from '.';
import { TruncateTextProps } from './types';

const meta: Meta<TruncateTextProps> = {
  title: 'UI/TruncateText',
  component: TruncateText,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    text: {
      control: { type: 'text' }
    }
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<TruncateTextProps>;

export const Default: Story = {
  args: {
    text: 'This is a large text string that should be truncated very large indeed super large'
  }
};
