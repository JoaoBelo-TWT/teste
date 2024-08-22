import { Table as BaseTable, Box } from '@mantine/core';
import { SortAscending, SortDescending } from '@phosphor-icons/react/dist/ssr';
import {
  ExpandedState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getExpandedRowModel,
  flexRender,
  PaginationState,
  SortingState
} from '@tanstack/react-table';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React, { useCallback, useMemo, useState } from 'react';

import { SortingOrder } from '@/__generated__/graphql';

import { Overlay } from '../overlay';

import classes from './index.module.css';
import { TableLoadingOverlay } from './LoadingOverlay';
import { TablePagination } from './Pagination';
import { TableRow } from './Row';
import { TableProps, ItemContract } from './types';

export function Table<Item extends ItemContract>({
  columns,
  data,
  pagination,
  sorting,
  highlightOnHover,
  isLoading = false,
  noHeader,
  hiddenHeaderColIndex,
  boxProps,
  tableProps,
  showEmpty,
  tableClassName
}: Readonly<TableProps<Item>>) {
  const hasPagination = !!pagination;
  const hasSorting = !!sorting;
  const { pageIndex, pageSize } = pagination || {}; // NOSONAR
  const { columnsSorting } = sorting ?? {};
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const t = useTranslations();
  const memoizedPagination = useMemo(
    () =>
      hasPagination
        ? {
            pageIndex,
            pageSize
          }
        : undefined,
    [pageIndex, pageSize, hasPagination]
  );

  const memoizedSorting = useMemo(() => (hasSorting ? columnsSorting : undefined), [hasSorting, columnsSorting]);

  const renderSortingIcon = useCallback((sorted: SortingOrder) => {
    if (sorted === SortingOrder.Asc) {
      return <SortAscending size={16} />;
    }
    if (sorted === SortingOrder.Desc) {
      return <SortDescending size={16} />;
    }
    return null;
  }, []);

  const table = useReactTable({
    data,
    columns,
    manualSorting: true,
    state: {
      expanded,
      pagination: hasPagination ? (memoizedPagination as PaginationState) : undefined,
      sorting: hasSorting ? (memoizedSorting as SortingState) : undefined
    },
    onExpandedChange: setExpanded,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    getSubRows: (row) => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    manualPagination: true,
    onPaginationChange: pagination?.setPagination,
    pageCount: pagination?.totalPageCount,
    getRowId: (row) => row.id,
    onSortingChange: sorting?.onSortingChange
  });

  return (
    <Box {...boxProps}>
      <Box pos="relative">
        {showEmpty && <Overlay title={t('common.noDataSimple')} />}
        <TableLoadingOverlay isVisible={isLoading} />
        <BaseTable
          highlightOnHover={highlightOnHover}
          classNames={{
            table: classes.table,
            th: classes.table__header,
            td: classes.table__data,
            tbody: classes.table__body,
            tr: classes.table__row
          }}
          className={tableClassName}
          {...tableProps}
        >
          {!noHeader && (
            <BaseTable.Thead>
              {table.getHeaderGroups().map((headerGroup, parentIndex) => (
                <TableRow key={headerGroup.id + parentIndex}>
                  {headerGroup.headers.map((header, index) => {
                    if (hiddenHeaderColIndex?.includes(index)) {
                      return <BaseTable.Th key={header.id + index + parentIndex} />;
                    }
                    return (
                      <BaseTable.Th
                        className={clsx(header.column.getCanSort() && classes.table__th_pointer)}
                        key={header.id + index + parentIndex}
                        colSpan={header.colSpan}
                        {...(header.column.getCanSort() ? { onClick: header.column.getToggleSortingHandler() } : {})}
                      >
                        <div className={classes.table__th_content}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {renderSortingIcon(header.column.getIsSorted() as SortingOrder)}
                        </div>
                      </BaseTable.Th>
                    );
                  })}
                </TableRow>
              ))}
            </BaseTable.Thead>
          )}

          <BaseTable.Tbody>
            {table.getRowModel().rows.map((row, parentIndex) => (
              <TableRow key={row.id + parentIndex} isSubRow={row.depth > 0}>
                {row.getVisibleCells().map((cell, index) => (
                  <BaseTable.Td key={cell.id + index + parentIndex}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </BaseTable.Td>
                ))}
              </TableRow>
            ))}
          </BaseTable.Tbody>
        </BaseTable>
      </Box>
      {hasPagination && (
        <TablePagination
          setPageIndex={table.setPageIndex}
          showRowsPerPage
          withFirstLastPageButtons
          pageIndex={table.getState().pagination.pageIndex}
          totalRowCount={table.getPageOptions().length}
          pageSize={table.getState().pagination.pageSize}
          numberOfPages={table.getPageCount()}
          setPageSize={table.setPageSize}
        />
      )}
    </Box>
  );
}
