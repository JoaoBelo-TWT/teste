import { SearchParams } from './types';

export interface CurrentPaginationConfig {
  query: {
    take: number;
    skip: number;
  };
  info: {
    pageSize: number;
    pageIndex: number;
  };
}
export const getCurrentPagination = (searchParams: SearchParams) => {
  const { pageIndex, pageSize } = searchParams;
  const currentPageIndex = Number(pageIndex) || 0;
  const currentPageSize = Number(pageSize) || 20;
  return {
    query: {
      take: currentPageSize,
      skip: currentPageSize * currentPageIndex
    },
    info: {
      pageSize: currentPageSize,
      pageIndex: currentPageIndex
    }
  };
};
