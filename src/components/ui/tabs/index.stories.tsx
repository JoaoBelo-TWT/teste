import { Badge } from '@mantine/core';
import { Plus } from '@phosphor-icons/react/dist/ssr/Plus';
import type { Meta, StoryObj } from '@storybook/react';

import { Tabs } from '.';

const meta: Meta<typeof Tabs> = {
  title: 'UI/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    value: {
      control: { type: 'select' },
      options: ['gallery', 'messages', 'settings'],
      description: 'Active tab value'
    },
    children: {
      description:
        'The children components(Tab, List, Panel) are document on <a href="https://mantine.dev/core/tabs">mantine ui</a> as the component maintains it original behavior'
    }
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    children: [
      <>
        <Tabs.List>
          <Tabs.Tab value="gallery">Gallery</Tabs.Tab>
          <Tabs.Tab value="messages">Messages</Tabs.Tab>
          <Tabs.Tab
            value="settings"
            rightSection={
              <>
                <Plus />
                <Badge size="xs" circle>
                  1
                </Badge>
              </>
            }
          >
            Settings
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="gallery">Gallery tab content</Tabs.Panel>
        <Tabs.Panel value="messages">Messages tab content</Tabs.Panel>
        <Tabs.Panel value="settings">Settings tab content</Tabs.Panel>
      </>
    ]
  }
};
