/* eslint-disable i18next/no-literal-string */
export const DetailTableSort = {
  PHASE_ASCENDING: 'phaseAscending',
  PHASE_DESCENDING: 'phaseDescending',
  REGION: 'region',
  PAGE_URL: 'pageUrl',
  EMAIL: 'email',
  PLATFORM_URL: 'platformUrl'
} as const;

export type DetailTableSortType = (typeof DetailTableSort)[keyof typeof DetailTableSort];

export type SortProps = {
  setSort: (type: DetailTableSortType | null) => void;
  sort: DetailTableSortType | null;
};
