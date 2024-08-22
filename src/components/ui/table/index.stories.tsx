import { CaretUp, CaretDown } from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/react';
import { ColumnDef, PaginationState } from '@tanstack/react-table';
import React, { useState, useCallback, useEffect } from 'react';

import { CircleFlag } from '../circle-flag';
import countries from '../circle-flag/countries';
import { CountryCode } from '../circle-flag/types';
import { IconButton } from '../icon-button';

import { ItemContract, TableProps } from './types';

import { Table } from './index';

type Region = {
  countryCode: CountryCode;
  label: string;
};

type Entry = {
  id: string;
  region: Region;
  email: string;
  pageUrl: string;
  stage: string;
  searchTerm: string;
};

type Item = Entry & { subRows: Exclude<Entry, 'subRows'>[] };

const countriesKeys = Object.keys(countries) as CountryCode[];

const makeData = (numberOfRows: number, numberOfSubRows: number): Item[] =>
  Array.from({ length: numberOfRows }, (_, i) => ({
    id: `${i}`,
    region: {
      countryCode: countriesKeys[i],
      label: 'Austin, USA'
    },
    email: 'tom.haverford@overture.co',
    pageUrl: 'metalab.com/home',
    stage: 'Lead',
    searchTerm: '‘business help’',
    subRows: Array.from({ length: numberOfSubRows }, (_2, i2) => ({
      id: `${i}-${i2}`,
      region: {
        countryCode: countriesKeys[i],
        label: 'Austin, USA'
      },
      email: 'tom.haverford@overture.co',
      pageUrl: 'metalab.com/home',
      stage: 'Lead',
      searchTerm: '‘business help’'
    }))
  }));

const serverData = makeData(100, 3);

const StateWrapper = (args: TableProps<ItemContract>) => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5
  });

  const [data, setData] = useState<Item[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);

  const fetchData = useCallback(() => {
    const startRow = pageSize * pageIndex;
    const endRow = startRow + pageSize;

    setData(serverData.slice(startRow, endRow));

    setPageCount(Math.ceil(serverData.length / pageSize));
  }, [pageSize, pageIndex]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Table
      highlightOnHover={args.highlightOnHover}
      isLoading={args.isLoading}
      columns={args.columns as ColumnDef<Item>[]}
      data={data}
      pagination={{
        pageIndex,
        pageSize,
        setPagination,
        totalPageCount: pageCount
      }}
    />
  );
};

const meta: Meta<typeof Table> = {
  title: 'UI/Table',
  component: Table,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    highlightOnHover: {
      control: { type: 'boolean' },
      description: 'If there should be an highlight effect on row hover',
      defaultValue: false
    },
    isLoading: {
      control: { type: 'boolean' },
      description: 'If there should be a loading overlay',
      defaultValue: false
    },
    data: {
      description: `Array of items that are displayed as rows on the table, all items must have an **ID** property.
        \nTo display nested rows provide the **subRows** array property, the logic to render expand actions is configured at the columns prop`,
      control: false
    },
    columns: {
      description: `Columns definition are document on <a href="https://tanstack.com/table/v8/docs/guide/column-defs">react-table</a> as the table component uses react table internally.
      \nThe columns configuration allow to configure the header and cell with a custom render, this allows things such as rendering an expand subRows action on the parent row`,
      control: false
    },
    pagination: {
      description:
        'Pagination is optional, when a configuration is provided the component will display a pagination component connected with the table',
      control: false,
      defaultValue: undefined
    }
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Default: Story = {
  render: (args) => <StateWrapper {...args} />,
  args: {
    columns: [
      {
        accessorKey: 'region',
        header: 'Region',
        cell: ({ getValue, row }) => (
          <div
            style={{
              paddingLeft: `${row.depth * 32}px`
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {row.depth === 0 && (
                <CircleFlag
                  alt={(getValue() as Region).label}
                  countryCode={(getValue() as Region).countryCode}
                  width={24}
                  height={24}
                />
              )}
              {(getValue() as Region).label}
            </div>
          </div>
        )
      },
      {
        accessorKey: 'email',
        header: 'Email'
      },
      {
        accessorKey: 'pageUrl',
        header: 'Page URL'
      },
      {
        accessorKey: 'stage',
        header: 'STAGE'
      },

      {
        accessorKey: 'searchTerm',
        header: 'Search Term'
      },
      {
        header: 'Actions',
        cell: ({ row }) => (
          <div>
            {row.getCanExpand() && (
              <IconButton onClick={row.getToggleExpandedHandler()}>
                {row.getIsExpanded() ? <CaretUp /> : <CaretDown />}
              </IconButton>
            )}
          </div>
        )
      }
    ]
  }
};
