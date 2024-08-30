import { Flex } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

import { LogoutButton } from '@/components/navigation/logout-button';
import { TextContent } from '@/components/ui/text-content';
import { ProgressContainer } from '@/components/wrappers/progress-container';
import { getClient } from '@/lib/apollo/apollo-client';
import { getOrganizationsQuery } from '@/lib/apollo/queries/onboarding-organizations';
import { getMe } from '@/lib/react-query/user/query-me';

import { WebsiteCreateCloseButton } from '../components/close-button';

import { WebsiteForm } from './components/website-form';

export default async function websitePage({
  params: { organizationId }
}: Readonly<{ params: { organizationId: string } }>) {
  const t = await getTranslations('onboarding.setup');
  const user = await getMe();

  const { data } = await getClient().query({
    query: getOrganizationsQuery,
    variables: {
      first: 100
    }
  });

  const steps = [
    { label: t('step2.stepper') },
    { label: t('step3.stepper') },
    { label: t('step4.stepper') },
    { label: t('step5.stepper') },
    { label: t('step6.stepper') }
  ];

  return (
    <ProgressContainer
      padded
      steps={steps}
      activeStep={0}
      rightHeaderContent={user.me.currentOnboardingPath ? <LogoutButton /> : <WebsiteCreateCloseButton />}
    >
      <Flex ta="center" maw={600} direction="column">
        <TextContent title={t('step2.title')} description={t('step2.description')} />
        <WebsiteForm
          data={data}
          userData={user}
          defaultOrganizationId={organizationId}
          isOnboarding={!!user.me.currentOnboardingPath}
        />
      </Flex>
    </ProgressContainer>
  );
}
