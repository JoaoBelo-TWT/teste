
import { Skeleton, Table, TableCaption, TableTbody, TableTd, TableTh, TableThead, TableTr } from '@mantine/core';

import { BaseCard } from '@/components/ui/base-card';

import tableCardClasses from '../../table-card/index.module.css';

export function TableCardSkeleton() {
  const rows = Array.from({ length: 5 }).map(() => (
    <TableTr key={crypto.randomUUID()} className={tableCardClasses['table-card__tr']}>
      <TableTd w={'60%'}>
        <div className={tableCardClasses['table-card__td']}>
          <Skeleton height={40} width={32} circle />
          <Skeleton height={18} width={150} />
        </div>
      </TableTd>
      <TableTd>
        <Skeleton height={18} width={50} />
      </TableTd>
      <TableTd>
        <Skeleton height={18} width={50} />
      </TableTd>
    </TableTr>
  ));

  return (
    <BaseCard paperProps={{ classNames: { root: tableCardClasses['table-card__root'] } }}>
      <div className={tableCardClasses['table-card__header']}>
        <Skeleton height={32} width={120} />
        <Skeleton height={32} circle />
      </div>
      <div className={tableCardClasses['table-card__controls']}>
        <Skeleton height={32} width={150} radius={'xl'} />
      </div>
      <div className={tableCardClasses['table-card__table-container']}>
        <Table classNames={{ th: tableCardClasses['table-card__th'] }} verticalSpacing={12}>
          <TableThead>
            <TableTr className={tableCardClasses['table-card__table-header-row']}>
              <TableTh>
                <Skeleton height={18} width={50} />
              </TableTh>
              <TableTh>
                <Skeleton height={18} width={50} />
              </TableTh>
              <TableTh>
                <Skeleton height={18} width={80} />
              </TableTh>
            </TableTr>
          </TableThead>
          <TableTbody>{rows}</TableTbody>
          <TableCaption className={tableCardClasses['table-card__table-caption']} h={48}>
            <Skeleton height={18} width={150} />
          </TableCaption>
        </Table>
      </div>
    </BaseCard>
  );
}
