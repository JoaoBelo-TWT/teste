import { Flex, Text, Title } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

import { LeftRightWrapper } from '@/components/wrappers/left-right';
import { SPACING } from '@/resources/constants';

import { StepsList } from './steps-list';

export async function GoogleAddsSetupCard({
  websiteId,
  organizationId,
  redirectToConnectionsPage = false
}: Readonly<{
  websiteId: string;
  organizationId: string;
  redirectToConnectionsPage?: boolean;
}>) {
  const t = await getTranslations();

  return (
    <LeftRightWrapper
      leftContent={
        <Flex direction="column" gap={SPACING.sm}>
          <img
            alt={t('website.connectGoogleAdds.title')}
            src={`${process.env.NEXT_PUBLIC_IMAGES_HOST_URL}icons/googleString.webp`}
            width={166}
            height={40}
          />
          <Title order={2}>{t('website.connectGoogleAdds.title')}</Title>
          <Text fz="body1" c="dark.7" lh="body2" fw={400}>
            {t('website.connectGoogleAdds.description')}
          </Text>
          <Text fz="body1" c="dark.7" lh="body2" fw={500}>
            {t('website.connectGoogleAdds.description1')}
          </Text>
        </Flex>
      }
      rightContent={
        <StepsList
          websiteId={websiteId}
          organizationId={organizationId}
          redirectToConnectionsPage={redirectToConnectionsPage}
        />
      }
    />
  );
}
