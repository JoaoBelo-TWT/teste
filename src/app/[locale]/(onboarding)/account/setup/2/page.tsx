import { Title } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

import { getClient } from '@/lib/apollo/apollo-client';
import { getAccountSetupOptionsQuery } from '@/lib/apollo/queries/account-setup-options';
import { getOrganizationsQuery } from '@/lib/apollo/queries/onboarding-organizations';
import { getMe } from '@/lib/react-query/user/query-me';
import { SPACING } from '@/resources/constants';
import { nextCacheTags } from '@/types/constants/next-cache-tags';

import { Step2Form } from './components/form-2';
import { mapToLabelValue } from './utils';

export default async function Step2() {
  const t = await getTranslations('onboarding.account');
  const user = await getMe();

  const { data: organizationData } = await getClient().query({
    query: getOrganizationsQuery,
    variables: {
      first: 1,
      filters: {
        userId: {
          eq: user.me.id
        }
      }
    }
  });

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

  const companyIndustries = mapToLabelValue(accountSetupOptionsData.companyIndustries);
  const companySizes = mapToLabelValue(accountSetupOptionsData.companySizes);

  return (
    <>
      <Title maw={450} order={2} mb={SPACING.md}>
        {t('step1.title')}
      </Title>
      <Step2Form
        organizationData={organizationData.organizations.edges.at(0)}
        companyIndustries={companyIndustries}
        companySizes={companySizes}
        isOnboarding={!!user.me.currentOnboardingPath}
      />
    </>
  );
}
