import type { AvatarProps } from '@mantine/core';
import { ArrowsClockwise } from '@phosphor-icons/react';
import { StoryObj, Meta } from '@storybook/react';

import { Avatar } from '.';

const meta: Meta<AvatarProps> = {
  title: 'UI/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

export default meta;

export type Story = StoryObj<AvatarProps>;

export const DefaultAvatar: Story = {
  args: {
    radius: 'lg',
    size: 32,
    children: 'SB',
    color: 'var(--flat-orange-color)',
    alt: 'Example logo'
  }
};

export const IconAvatar: Story = {
  args: {
    radius: 'lg',
    size: 24,
    children: <ArrowsClockwise width={16} height={16} weight="light" color="var(--mantine-color-dark-9)" />,
    color: 'var(--flat-gree-color)',
    alt: 'Example logo 2'
  }
};
