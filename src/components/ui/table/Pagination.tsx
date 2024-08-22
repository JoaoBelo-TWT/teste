import { ActionIcon, Box, Group, Select, Text } from '@mantine/core';
import { CaretDoubleLeft, CaretDoubleRight, CaretDown, CaretLeft, CaretRight } from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';

import classes from './index.module.css';
import { TablePaginationProps } from './types';

const defaultRowsPerPage = [5, 10, 15, 20, 25, 30, 50, 100].map((x) => x.toString());

export const TablePagination = ({
  pageSize,
  numberOfPages,
  pageIndex,
  withFirstLastPageButtons,
  setPageSize,
  setPageIndex,
  rowsPerPageOptions = defaultRowsPerPage,
  showRowsPerPage = false
}: TablePaginationProps) => {
  const t = useTranslations();
  const showFirstLastPageButtons = withFirstLastPageButtons ?? numberOfPages > 2;

  return (
    <Box className={classes.table__pagination}>
      {showRowsPerPage !== false && (
        <Group gap="xs">
          <Text>{t('components.table.pagination.rowsPerPage')}</Text>
          <Select
            classNames={{ root: classes['table__pagination-select'] }}
            allowDeselect={false}
            aria-labelledby={t('components.table.pagination.rowsPerPage')}
            data={rowsPerPageOptions}
            onChange={(value: null | string) => setPageSize(+(value as string))}
            value={pageSize.toString()}
            rightSection={<CaretDown />}
            withCheckIcon={false}
          />
        </Group>
      )}

      <Box className={classes['table__pagination-control-container']}>
        {showFirstLastPageButtons && (
          <ActionIcon
            aria-label="Go to first page"
            color="gray"
            disabled={pageIndex <= 0}
            onClick={() => setPageIndex(0)}
            variant="subtle"
          >
            <CaretDoubleLeft />
          </ActionIcon>
        )}
        <ActionIcon
          aria-label="Go to previous page"
          color="gray"
          disabled={pageIndex <= 0}
          onClick={() => setPageIndex(pageIndex - 1)}
          variant="subtle"
        >
          <CaretLeft />
        </ActionIcon>
      </Box>

      <Text>
        {t('components.table.pagination.page')} {`${pageIndex + 1} of ${numberOfPages}`}
      </Text>

      <Box className={classes['table__pagination-control-container']}>
        <ActionIcon
          aria-label="Go to next page"
          color="gray"
          disabled={pageIndex + 1 >= numberOfPages}
          onClick={() => setPageIndex(pageIndex + 1)}
          variant="subtle"
        >
          <CaretRight />
        </ActionIcon>
        {showFirstLastPageButtons && (
          <ActionIcon
            aria-label="Go to last page"
            color="gray"
            disabled={pageIndex + 1 >= numberOfPages}
            onClick={() => setPageIndex(numberOfPages - 1)}
            variant="subtle"
          >
            <CaretDoubleRight />
          </ActionIcon>
        )}
      </Box>
    </Box>
  );
};
