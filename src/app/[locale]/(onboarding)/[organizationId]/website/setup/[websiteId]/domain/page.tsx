import { Flex } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

import { LogoutButton } from '@/components/navigation/logout-button';
import { TextContent } from '@/components/ui/text-content';
import { fetchMeData } from '@/lib/fetch-me-data';
import { fetchWebsiteData } from '@/lib/fetch-website-data';

import { ProgressContainer } from '../../../../../../../../components/wrappers/progress-container';
import { WebsiteCreateCloseButton } from '../../components/close-button';

import { DomainForm } from './components/domain-form';

export default async function DomainPage({
  params
}: Readonly<{ params: { organizationId: string; websiteId: string } }>) {
  const t = await getTranslations();
  const user = await fetchMeData();

  const { websiteId, organizationId } = params;
  const data = await fetchWebsiteData(websiteId);

  const steps = [
    { label: t('onboarding.setup.step2.stepper') },
    { label: t('onboarding.setup.step3.stepper') },
    { label: t('onboarding.setup.step4.stepper') },
    { label: t('onboarding.setup.step5.stepper') },
    { label: t('onboarding.setup.step6.stepper') }
  ];

  return (
    <ProgressContainer
      padded
      steps={steps}
      activeStep={1}
      rightHeaderContent={user.me.currentOnboardingPath ? <LogoutButton /> : <WebsiteCreateCloseButton />}
    >
      <Flex ta="center" align="center" justify="center" maw={500} direction="column">
        <TextContent title={t('onboarding.setup.step5.title')} description={t('onboarding.setup.step5.description')} />
        {data && (
          <DomainForm data={data} organizationId={organizationId} isOnboarding={!!user.me.currentOnboardingPath} />
        )}
      </Flex>
    </ProgressContainer>
  );
}
