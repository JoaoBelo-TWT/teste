import { Title } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

import { getClient } from '@/lib/apollo/apollo-client';
import { getAccountSetupOptionsQuery } from '@/lib/apollo/queries/account-setup-options';
import { fetchMeData } from '@/lib/fetch-me-data';
import { SPACING } from '@/resources/constants';
import { nextCacheTags } from '@/types/constants/next-cache-tags';

import { mapToLabelValue } from '../2/utils';

import { Step1Form } from './components/form-1';

export default async function Step1() {
  const t = await getTranslations('onboarding.account.step1');
  const user = await fetchMeData();

  const { data: accountSetupOptionsData } = await getClient().query({
    query: getAccountSetupOptionsQuery,
    context: {
      fetchOptions: {
        next: {
          tags: [nextCacheTags.accounts.step2]
        }
      }
    }
  });

  const companyRoles = mapToLabelValue(accountSetupOptionsData.companyRoles);

  return (
    <>
      <Title maw={450} order={2} mb={SPACING.sm}>
        {t('title')}
      </Title>
      <Step1Form accountData={user.me} companyRoles={companyRoles} />
    </>
  );
}
