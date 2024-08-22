'use client';

import { Flex } from '@mantine/core';
import { notFound, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { ContentContainer } from '@/components/layouts/content-container';
import { ShareCard } from '@/components/sections/website-setup-card/share-card';
import { StepsList } from '@/components/sections/website-setup-card/steps-list';
import { TextContent } from '@/components/ui/text-content';
import { LeftRightWrapper } from '@/components/wrappers/left-right';
import { SPACING } from '@/resources/constants';

export default function ShareWebsiteSetup() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const websiteId = searchParams?.get('websiteId');
  const snippetUrl = searchParams?.get('snippetUrl');

  if (!websiteId || !snippetUrl) {
    notFound();
  }

  return (
    <ContentContainer noBackButton>
      <LeftRightWrapper
        leftContent={
          <Flex direction="column" gap={SPACING.sm}>
            <TextContent
              title={t('onboarding.setup.step6.title')}
              description={t('onboarding.setup.step6.description')}
            />
            <ShareCard websiteId={websiteId} />
          </Flex>
        }
        rightContent={<StepsList websiteId={websiteId} hideContinueButton={false} />}
      />
    </ContentContainer>
  );
}
