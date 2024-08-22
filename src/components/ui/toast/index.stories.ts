import type { Meta, StoryObj } from '@storybook/react';

import { Toast } from './Toast';
import { ToastProps, ToastVariant } from './types';

const meta: Meta<ToastProps> = {
  title: 'UI/Toast',
  component: Toast,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Toast title'
    },
    description: {
      control: { type: 'text' },
      description: 'Toast description'
    },
    variant: {
      control: { type: 'select' },
      options: Object.values(ToastVariant),
      description: 'Toast variant'
    }
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<ToastProps>;

export const Default: Story = {
  args: {
    variant: ToastVariant.Info,
    title: 'Details will be provided in this informational message.'
  }
};
