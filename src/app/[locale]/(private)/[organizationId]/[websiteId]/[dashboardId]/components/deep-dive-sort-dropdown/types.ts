/* eslint-disable i18next/no-literal-string */
export enum DeepDiveSort {
  MostConversions = 'MostConversions',
  MostRecent = 'MostRecent'
}

export type DeepDiveSortType = (typeof DeepDiveSort)[keyof typeof DeepDiveSort];

export type DeepDiveSortProps = {
  setSort?: (type: DeepDiveSortType | null) => void;
  sort: DeepDiveSortType | null;
  useQueryParam?: string;
};
