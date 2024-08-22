import { SelectProps } from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react';

import { Select } from '.';

const meta: Meta<SelectProps> = {
  title: 'UI/Select',
  component: Select
};

export default meta;

export type Story = StoryObj<SelectProps>;

export const Default: Story = {
  args: {
    label: 'Title',
    withCheckIcon: false,
    placeholder: 'Select an Option',
    data: [
      '1',
      '2',
      '24039482094823049840928423093480492383409820934820938420938420948209348203498928304928304982039482938420349820489890'
    ]
  }
};

export const DefaultError: Story = {
  args: {
    label: 'Title',
    withCheckIcon: false,
    placeholder: 'Select an Option',
    data: [
      '1',
      '2',
      '24039482094823049840928423093480492383409820934820938420938420948209348203498928304928304982039482938420349820489890'
    ],
    error: true
  }
};
