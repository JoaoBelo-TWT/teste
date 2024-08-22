import { Box, Flex, Text } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

import { OnboardingContinueButton } from '@/app/[locale]/(onboarding)/components/onboarding-continue-button';
import { RequestConnectionForm } from '@/components/forms/request-connection-form';
import { ConnectionsList } from '@/components/lists/connections';
import { LogoutButton } from '@/components/navigation/logout-button';
import { AllSetCardHorizontal } from '@/components/ui/all-set-card-horizontal';
import { ProgressContainer } from '@/components/wrappers/progress-container';
import { fetchMeData } from '@/lib/fetch-me-data';
import { COLORS, SPACING } from '@/resources/constants';
import { routes } from '@/routes/routes';

import { WebsiteCreateCloseButton } from '../../components/close-button';

export default async function ConnectPage({
  params
}: Readonly<{ params: { websiteId: string; organizationId: string } }>) {
  const t = await getTranslations();
  const user = await fetchMeData();
  const { websiteId, organizationId } = params;

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
      activeStep={6}
      rightHeaderContent={user.me.currentOnboardingPath ? <LogoutButton /> : <WebsiteCreateCloseButton />}
    >
      <Flex pl={SPACING.lg} pr={SPACING.lg} maw={800} direction="column" w="100%">
        <AllSetCardHorizontal
          isOnboarding={false}
          href={organizationId ? routes.dashboard.new.path(organizationId, websiteId) : routes.homePage.path}
        />
        <Text mt={SPACING.lg} mb={-SPACING.sm} fz="xl" fw={500} c="dark.7" ta="center">
          {t('onboarding.keepConnecting')}
        </Text>

        <Box mb={SPACING.lg}>
          <ConnectionsList organizationId={organizationId} websiteId={websiteId} />
        </Box>
        <RequestConnectionForm />
        <Flex justify="center" align="center" mt={SPACING.lg}>
          <OnboardingContinueButton
            clearOnboardingStep={true}
            isOnboarding={true}
            text={t('onboarding.setup.step7.getStarted')}
            href={organizationId ? routes.dashboard.new.path(organizationId, websiteId) : routes.homePage.path}
            /* eslint-disable i18next/no-literal-string */
            buttonProps={{ c: 'white', bg: COLORS.systemGreen600, fw: 500, fz: 'body1' }}
          />
        </Flex>
      </Flex>
    </ProgressContainer>
  );
}
