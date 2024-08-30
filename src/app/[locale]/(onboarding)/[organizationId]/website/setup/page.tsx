import { Flex } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

import { TextContent } from '@/components/ui/text-content';
import { LeftRightWrapper } from '@/components/wrappers/left-right';
import { ProgressContainer } from '@/components/wrappers/progress-container';
import { getMe } from '@/lib/react-query/user/query-me';
import { getQueryPaginatedWebsites } from '@/lib/react-query/website/query-paginated-websites';
import { SPACING } from '@/resources/constants';
import { routes } from '@/routes/routes';
import { OnboardingFlowType } from '@/types/enums/new-dashboard-query-params';

import { OnboardingContinueButton } from '../../../components/onboarding-continue-button';
import { OnboardingImage } from '../../[websiteId]/dashboard-create/(dashboard)/components/image';

import { WebsiteCreateCloseButton } from './components/close-button';

export default async function SetupPage({ params: { organizationId } }: { params: { organizationId: string } }) {
  const t = await getTranslations();
  const user = await getMe();
  const data = await getQueryPaginatedWebsites({
    first: 100,
    filters: {
      organizationId: {
        eq: organizationId
      }
    }
  });
  const isOnboarding =
    user.me.currentOnboardingPath === null && data.pages.flatMap((page) => page.websites.edges).length === 0;

  const steps = [
    { label: t('onboarding.setup.step2.stepper') },
    { label: t('onboarding.setup.step3.stepper') },
    { label: t('onboarding.setup.step4.stepper') },
    { label: t('onboarding.setup.step5.stepper') },
    { label: t('onboarding.setup.step6.stepper') }
  ];

  /* eslint-disable i18next/no-literal-string */
  return (
    <>
      <ProgressContainer
        steps={steps}
        activeStep={-1}
        flexProps={{ align: 'stretch' }}
        rightHeaderContent={isOnboarding ? undefined : <WebsiteCreateCloseButton />}
      >
        <LeftRightWrapper
          gridProps={{ mih: 'auto', h: 'auto' }}
          rightFlexProps={{ maw: 'auto' }}
          leftContent={
            <Flex gap={{ base: SPACING.sm, md: SPACING.lg }} direction="column" w="100%" align="start" p={SPACING.lg}>
              <TextContent
                title={t('onboarding.setup.step1.title', { name: user.me.firstName })}
                description={t('onboarding.setup.step1.description')}
              />
              <OnboardingContinueButton
                isOnboarding={isOnboarding}
                text={t('onboarding.setup.continueButton')}
                href={routes.website.setup.name.path(organizationId)}
              />
            </Flex>
          }
          rightContent={<OnboardingImage flow={OnboardingFlowType.WEBSITE} />}
        />
      </ProgressContainer>
    </>
  );
}
