import type { Meta, StoryObj } from '@storybook/react';

import { CircleFlagProps } from './types';

import { CircleFlag } from '.';

const meta: Meta<CircleFlagProps> = {
  title: 'UI/Circle-flag',
  component: CircleFlag,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    countryCode: {
      control: { type: 'text' },
      description: 'Country code (e.g., "us" for the United States, "fr" for France)'
    },
    height: {
      control: { type: 'number' },
      description: 'Height of the flag image'
    },
    width: {
      control: { type: 'number' },
      description: 'Width of the flag image'
    },
    alt: {
      control: { type: 'text' },
      description: 'Alt text for the flag image'
    }
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<CircleFlagProps>;

export const Default: Story = {
  args: {
    countryCode: 'us',
    height: 32,
    width: 32,
    alt: 'USA Flag'
  }
};

export const SmallUKFlag: Story = {
  args: {
    countryCode: 'gb',
    height: 50,
    width: 50,
    alt: 'UK Flag'
  }
};

export const LargeCanadaFlag: Story = {
  args: {
    countryCode: 'ca',
    height: 150,
    width: 150,
    alt: 'Canada Flag'
  }
};
