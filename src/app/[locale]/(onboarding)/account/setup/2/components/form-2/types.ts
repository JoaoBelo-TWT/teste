import { ComboboxData } from '@mantine/core';

import { GetOrganizationsQuery } from '@/__generated__/graphql';

export interface Step2FormProps {
  organizationData: GetOrganizationsQuery['organizations']['edges']['0'] | null | undefined;
  companyIndustries: ComboboxData;
  companySizes: ComboboxData;
  isOnboarding?: boolean;
}
