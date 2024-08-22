import { Table, TableTrProps } from '@mantine/core';

export const TableRow = ({ isSubRow = false, ...props }: TableTrProps & { isSubRow?: boolean }) => (
  <Table.Tr {...props} data-sub-row={isSubRow} />
);
