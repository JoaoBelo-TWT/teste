import { Flex } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

import { TextContent } from '@/components/ui/text-content';
import { fetchMeData } from '@/lib/fetch-me-data';
import { fetchSelectors } from '@/lib/fetch-selectors';
import { SPACING } from '@/resources/constants';

import { ProgressContainer } from '../../../../../../../../components/wrappers/progress-container';
import { WebsiteCreateCloseButton } from '../../components/close-button';

import { ConnectFormsForm } from './components/connect-forms-form';

export default async function FormsPage({
  params
}: Readonly<{ params: { organizationId: string; websiteId: string } }>) {
  const t = await getTranslations();
  const user = await fetchMeData();
  const { websiteId, organizationId } = params;
  const data = await fetchSelectors(params.websiteId);

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
      activeStep={2}
      rightHeaderContent={user.me.currentOnboardingPath ? undefined : <WebsiteCreateCloseButton />}
    >
      <Flex ta="center" align="center" justify="center" maw={800} direction="column">
        <TextContent
          mt={SPACING.xxl}
          title={t('onboarding.setup.step4.title')}
          description={t('onboarding.setup.step4.description')}
        />
        <ConnectFormsForm
          websiteSelectors={data}
          websiteId={websiteId}
          organizationId={organizationId}
          isOnboarding={!!user.me.currentOnboardingPath}
          isEmbeddedInForm={true}
        />
      </Flex>
    </ProgressContainer>
  );
}
