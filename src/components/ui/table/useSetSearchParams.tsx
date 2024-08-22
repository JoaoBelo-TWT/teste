'use client';

import { PaginationState } from '@tanstack/react-table';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const concatPrefix = (name: string, prefix: string | null | undefined) => {
  if (prefix) {
    return `${prefix}${name.charAt(0).toUpperCase() + name.slice(1)}`;
  }
  return name;
};
export const useSetSearchParams = (
  pagination: PaginationState,
  pageIndex: number,
  pageSize: number,
  prefix?: string | null,
  field?: string | null,
  direction?: string | null,
  anchor?: string
) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    params.set(concatPrefix('pageIndex', prefix), pageIndex.toString());
    params.set(concatPrefix('pageSize', prefix), pageSize.toString());
    if (field && direction) {
      params.set(concatPrefix('sortingField', prefix), field);
      params.set(concatPrefix('sortingDirection', prefix), direction);
    } else {
      params.delete(concatPrefix('sortingField', prefix));
      params.delete(concatPrefix('sortingDirection', prefix));
    }

    router.replace(`${pathname}?${params.toString()}${anchor ? `#${anchor}` : ''}`);
  }, [field, direction, pageIndex, pageSize, pagination, pathname, router, searchParams, anchor, prefix]);
};
