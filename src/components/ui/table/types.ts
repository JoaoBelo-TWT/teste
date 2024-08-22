import { BoxProps, TableProps as BaseTableProps } from '@mantine/core';
import { ColumnDef, ColumnSort, OnChangeFn, PaginationState, SortingState } from '@tanstack/react-table';

export interface ItemContract {
  id: string;
  subRows?: Omit<ItemContract, 'subRows'>[];
}

export interface SearchParams {
  pageIndex?: number;
  pageSize?: number;
}
export interface PaginationQuery {
  take: number;
  skip: number;
}
export interface TableProps<Item extends ItemContract> {
  highlightOnHover?: boolean;
  data: Item[];
  columns: ColumnDef<Item>[];
  isLoading?: boolean;
  pagination?: {
    pageIndex: number;
    pageSize: number;
    totalPageCount: number;
    setPagination: OnChangeFn<PaginationState>;
  };
  sorting?: {
    columnsSorting: ColumnSort[];
    onSortingChange: OnChangeFn<SortingState>;
  };
  noHeader?: boolean;
  hiddenHeaderColIndex?: number[];
  boxProps?: BoxProps;
  tableProps?: BaseTableProps;
  tableClassName?: string;
  showEmpty?: boolean;
}

export interface TablePaginationProps {
  totalRowCount: number;
  pageSize: number;
  numberOfPages: number;
  pageIndex: number;
  withFirstLastPageButtons?: boolean;
  showRowsPerPage?: boolean;
  rowsPerPageOptions?: string[];
  setPageSize: (page: number) => void;
  setPageIndex: (pageIndex: number) => void;
}
