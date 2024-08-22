import type { Meta, StoryObj } from '@storybook/react';

import { Accordion } from '.';

const meta: Meta<typeof Accordion> = {
  title: 'UI/Accordion',
  component: Accordion,
  parameters: {
    accordionItems: [
      { id: 'executive', title: 'Executive', content: 'Executive content' },
      { id: 'paid', title: 'Paid', content: 'Paid content' },
      { id: 'campaign', title: 'Campaign', content: 'Campaign content' }
    ]
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    accordionItems: [
      { id: 'executive', title: 'Executive', content: 'Executive content' },
      { id: 'paid', title: 'Paid', content: 'Paid content' },
      { id: 'campaign', title: 'Campaign', content: 'Campaign content' }
    ]
  }
};
