import { ComboboxData } from '@mantine/core';

import { GetMeQuery } from '@/__generated__/graphql';

export type Step1FormProps = {
  accountData: GetMeQuery['me'];
  companyRoles: ComboboxData;
};
