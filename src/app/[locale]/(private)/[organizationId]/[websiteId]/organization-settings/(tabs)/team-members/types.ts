import { SortingOrder } from '@/__generated__/graphql';

type TableQueryParams = {
  pageIndex?: number;
  pageSize?: number;
  sortingField?: string;
  sortingDirection?: SortingOrder;
};

export type OrganizationSettingsTeamMembersProps = {
  params: { organizationId: string };
  searchParams: TableQueryParams;
};
