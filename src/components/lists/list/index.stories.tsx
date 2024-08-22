import { Text } from '@mantine/core';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../../ui/button';

import type { ListProps } from './types';

import { List } from '.';

const meta: Meta<ListProps> = {
  title: 'Lists/DragAndDrop',
  component: List,
  parameters: {
    layout: 'padded'
  }
};

export default meta;

export type Story = StoryObj<ListProps>;

export const DragAndDropList = {
  args: {
    droppableId: 'test1',
    isDraggable: true,
    items: [
      {
        id: '1',
        children: (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                height: '100%',
                alignItems: 'center'
              }}
            >
              <Text>Leads</Text>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                height: '100%',
                alignItems: 'center',
                gap: '8px',
                paddingLeft: '16px',
                justifyContent: 'flex-end'
              }}
            >
              <Button size="small" variant="transparent">
                Remove
              </Button>
              <Button size="small" variant="light">
                Edit
              </Button>
            </div>
          </div>
        )
      },
      {
        id: '2',
        children: (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                height: '100%',
                alignItems: 'center'
              }}
            >
              <Text>Market Qualified Leads</Text>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                height: '100%',
                alignItems: 'center',
                gap: '8px',
                paddingLeft: '16px',
                justifyContent: 'flex-end'
              }}
            >
              <Button size="small" variant="transparent">
                Remove
              </Button>
              <Button size="small" variant="light">
                Edit
              </Button>
            </div>
          </div>
        )
      },
      {
        id: '3',
        children: (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                height: '100%',
                alignItems: 'center'
              }}
            >
              <Text>Sales Qualified Leads</Text>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                height: '100%',
                alignItems: 'center',
                gap: '8px',
                paddingLeft: '16px',
                justifyContent: 'flex-end'
              }}
            >
              <Button size="small" variant="transparent">
                Remove
              </Button>
              <Button size="small" variant="light">
                Edit
              </Button>
            </div>
          </div>
        )
      },
      {
        id: '4',
        children: (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'space-around'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                height: '100%',
                alignItems: 'center'
              }}
            >
              <Text>Customers</Text>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                height: '100%',
                alignItems: 'center',
                gap: '8px',
                paddingLeft: '16px',
                justifyContent: 'flex-end'
              }}
            >
              <Button size="small" variant="transparent">
                Remove
              </Button>
              <Button size="small" variant="light">
                Edit
              </Button>
            </div>
          </div>
        )
      }
    ]
  }
};
