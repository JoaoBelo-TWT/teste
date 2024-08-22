import type { Meta, StoryObj } from '@storybook/react';

import { AvatarChip } from '../avatar-chip';

import type { HeaderProps } from './types';

import { Header } from '.';

const meta: Meta<HeaderProps> = {
  title: 'UI/Header',
  component: Header
};

export default meta;

export type Story = StoryObj<HeaderProps>;

export const SimpleHeader: Story = {
  args: {
    title: 'Widget Title',
    children: (
      <AvatarChip
        image="https://pbs.twimg.com/profile_images/1257781502043013120/OHreXsqD_400x400.jpg"
        label="metalab.com"
        variant="outlined"
      />
    )
  }
};
