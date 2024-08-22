/* eslint-disable i18next/no-literal-string */
export const DetailPageFilter = {
  PAID_AND_ORGANIC: 'paidAndOrganic',
  PAID: 'paid',
  ORGANIC: 'organic'
} as const;

export type DetailPageFilterType = (typeof DetailPageFilter)[keyof typeof DetailPageFilter];

export type FilterProps = {
  setFilter: (type: DetailPageFilterType | null) => void;
  filter: DetailPageFilterType | null;
};
