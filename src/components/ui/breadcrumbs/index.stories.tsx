import type { Meta, StoryObj } from '@storybook/react';

import { Breadcrumbs } from '.';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'UI/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    variant: 'large',
    items: [
      { label: 'Dashboard', href: '' },
      { label: 'Campaigns', href: '' },
      { label: 'Web Emails', href: '' }
    ]
  },
  argTypes: {
    variant: {
      options: ['default', 'large'],
      control: { type: 'radio' },
      defaultValue: 'default'
    }
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Dashboard', href: '' },
      { label: 'Campaigns', href: '' },
      { label: 'Web Emails', href: '' }
    ]
  }
};
