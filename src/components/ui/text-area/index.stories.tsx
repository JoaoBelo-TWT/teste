import type { TextareaProps } from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react';
import { TextAreaInput } from '.';


const meta: Meta<TextareaProps> = {
  title: 'UI/TextAreaInput',
  component: TextAreaInput,
  parameters: {
    layout: 'centered'
  },
  tags: []
};

export default meta;

type Story = StoryObj<TextareaProps>;

export const Default: Story = {
  args: {
    label: 'MESSAGE',
    placeholder: 'Enter your message',
    radius: 'xs'
  }
};

export const DefaultError: Story = {
  args: {
    label: 'MESSAGE',
    placeholder: 'Enter your message',
    radius: 'xs',
    error: true
  }
};
