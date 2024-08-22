import { Meta, StoryObj } from '@storybook/react';

import { Card } from '.';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered'
  }
};

export default meta;

export type Story = StoryObj<typeof Card>;

export const FirstCard: Story = {
  args: {
    href: '/',
    imageBgColor: 'var(--flat-orange-100-color)',
    imageAtl: 'Hot balloon',
    imageSrc: '/images/hot_air_balloon.webp',
    widgets: 4,
    title: 'Executive',
    description: 'Your favorite set of high-level essential metrics.'
  }
};

export const SecondCard: Story = {
  args: {
    href: '/',
    imageBgColor: 'var(--flat-blue-100-color)',
    imageAtl: 'Chat',
    imageSrc: '/images/chat.webp',
    widgets: 4,
    title: 'Organic',
    description: 'Track the impact of your organic traffic channels against your KPIs'
  }
};

export const ThirdCard: Story = {
  args: {
    href: '/',
    imageBgColor: 'var(--flat-green-100-color)',
    imageAtl: 'Flag',
    imageSrc: '/images/flag.webp',
    widgets: 6,
    title: 'Campaign',
    description: 'Metrics to monitor and dissect what’s driving your campaigns'
  }
};

export const ForthCard: Story = {
  args: {
    href: '/',
    imageBgColor: 'var(--flat-pink-100-color)',
    imageAtl: 'Pig',
    imageSrc: '/images/pig.webp',
    widgets: 3,
    title: 'Paid',
    description: 'Track the impact of your paid traffic channels against your KPIs'
  }
};
