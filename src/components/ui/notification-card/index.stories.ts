import type { Meta, StoryObj } from '@storybook/react';

import { NotificationCard } from '.';

const meta: Meta<typeof NotificationCard> = {
  title: 'UI/NotificationCard',
  component: NotificationCard,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    title: {
      control: 'text'
    },
    message: {
      control: 'text'
    },
    createdAt: {
      control: 'text'
    }
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof NotificationCard>;

export const Default: Story = {
  args: {
    title: 'Sync Failure: Data Validation Error',
    message:
      'Data validation failed during the sync process. One or more records did not meet the validation criteria.',
    createdAt: 'Yesterday'
  }
};
