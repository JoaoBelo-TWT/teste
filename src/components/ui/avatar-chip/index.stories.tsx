import type { Meta, StoryObj } from '@storybook/react';

import { AvatarChip } from '.';

const meta: Meta<typeof AvatarChip> = {
  title: 'UI/Avatar-chip',
  component: AvatarChip,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    label: {
      control: 'text'
    },
    variant: {
      options: ['outlined', 'filled'],
      control: { type: 'radio' },
      defaultValue: 'filled'
    },
    image: {
      // https://github.com/storybookjs/storybook/issues/11428
      control: 'object',
      description: 'The chip avatar, a Component of type AvatarChip.Image should be provided'
    }
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof AvatarChip>;

export const Default: Story = {
  args: {
    label: 'metalab.com',
    variant: 'filled',
    image: 'https://pbs.twimg.com/profile_images/1257781502043013120/OHreXsqD_400x400.jpg'
  }
};
