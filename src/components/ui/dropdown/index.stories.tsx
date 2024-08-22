import { Text, useCombobox } from '@mantine/core';
import { IceCream } from '@phosphor-icons/react/dist/ssr';
import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from '../avatar';
import { Button } from '../button';

import type { DropdownProps } from './types';

import { Dropdown } from './index';

const meta: Meta<DropdownProps> = {
  title: 'UI/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered'
  },
  argTypes: {},
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<{ props: Omit<DropdownProps, 'children'>; buttonLabel: string }>;

const optionTemplate = (label: string) => (
  <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '16px', alignItems: 'center', padding: '0px 8px' }}>
    <Avatar color="rgba(255, 200, 0, 1)" autoContrast opacity={100} variant="filled">
      <IceCream size={16} />
    </Avatar>
    <Text>{label}</Text>
  </div>
);

const DropdownWithHook = ({ props, buttonLabel }: { props: Omit<DropdownProps, 'children'>; buttonLabel: string }) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: (eventSource) => {
      if (eventSource === 'keyboard') {
        combobox.selectActiveOption();
      } else {
        combobox.updateSelectedOptionIndex('active');
      }
    }
  });

  return (
    <Dropdown store={combobox} {...props}>
      <Button variant="light" size="medium" onClick={() => combobox.toggleDropdown()}>
        {buttonLabel}
      </Button>
    </Dropdown>
  );
};
export const Default: Story = {
  render: (args) => <DropdownWithHook {...args} />
};

Default.args = {
  props: {
    width: 'auto',
    data: [
      {
        value: '1',
        label: optionTemplate('Option 1')
      },
      {
        value: '2',
        label: optionTemplate('Option 2')
      },
      {
        value: '3',
        label: optionTemplate('Option 3')
      }
    ]
  },
  buttonLabel: ' Dark Mode'
};

export const LightMode: Story = {
  render: (args) => <DropdownWithHook {...args} />
};

LightMode.args = {
  props: {
    width: 'auto',
    isLightMode: true,
    data: [
      {
        value: '1',
        label: 'Option 1'
      },
      {
        value: '2',
        label: 'Option 2'
      },
      {
        value: '3',
        label: 'Option 3'
      }
    ]
  },
  buttonLabel: 'Light Mode'
};
