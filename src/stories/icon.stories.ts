import { Heart } from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'UI/Icons',
  component: Heart, // Used as an example component for Storybook metadata
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    size: {
      control: 'number',
      defaultValue: 32,
      description: 'Size of the icon'
    },
    color: {
      control: 'color',
      defaultValue: '#000000',
      description: 'Color of the icon'
    }
  },
  tags: ['autodocs']
};

export default meta;

type IconProps = {
  size?: number | string;
  color?: string;
  weight?: 'bold' | 'duotone' | 'fill' | 'light' | 'regular' | 'thin';
};

type Story = StoryObj<IconProps>;

export const Default: Story = {
  args: {
    size: 24,
    color: 'black',
    weight: 'regular'
  }
};

export const Large: Story = {
  args: {
    size: 48,
    color: 'gray',
    weight: 'bold'
  }
};

export const Small: Story = {
  args: {
    size: 16,
    color: 'white',
    weight: 'regular'
  }
};
