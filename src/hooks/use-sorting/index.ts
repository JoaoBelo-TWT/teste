import { ColumnSort } from '@tanstack/react-table';
import { useState } from 'react';

import { SortingOrder } from '@/__generated__/graphql';

export function useSorting(initialField: string, initialOrder: SortingOrder) {
  const [sorting, setSorting] = useState<ColumnSort[]>([
    { id: initialField, desc: initialOrder === SortingOrder.Desc }
  ]);
  let direction;
  if (!sorting.length) {
    direction = initialOrder;
  } else {
    direction = sorting[0].desc ? SortingOrder.Desc : SortingOrder.Asc;
  }

  return {
    sorting,
    onSortingChange: setSorting,
    direction,
    field: sorting.length ? sorting[0].id : initialField
  };
}
