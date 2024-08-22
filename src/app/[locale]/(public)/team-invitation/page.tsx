import { getSession } from '@auth0/nextjs-auth0';
import { Flex, Box } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

import { ItemCard } from '@/components/ui/item-card';
import { TextContent } from '@/components/ui/text-content';
import { SPACING } from '@/resources/constants';

import { SplitContentContainer } from '../../(onboarding)/components/container';

import { AuthorizedTeamInvitation } from './components/authorized-team-invitation';
import { UnauthorizedTeamInvitation } from './components/unauthorized-team-invitation';

interface TeamInvitationPageProps {
  searchParams: {
    organizationId: string;
    organizationName: string;
    organizationImage: string;
    email: string;
  };
}

export default async function TeamInvitationPage({ searchParams }: Readonly<TeamInvitationPageProps>) {
  const t = await getTranslations('onboarding.teamInvitation');
  const session = await getSession();
  const { organizationId, organizationName, email, organizationImage } = searchParams;

  return (
    <SplitContentContainer withHeader={false}>
      <Box>
        <img src={`${process.env.NEXT_PUBLIC_IMAGES_HOST_URL}logos/source-text-logo.svg`} alt={'Source Logo'} />
        <Flex mt={SPACING.xl} direction="column" maw={500}>
          <TextContent title={t('title', { organizationName })} mb={SPACING.md} />
          {organizationName && (
            <ItemCard
              radius="sm"
              mb={SPACING.lg}
              itemImage={
                organizationImage && organizationImage !== 'null'
                  ? organizationImage
                  : process.env.NEXT_PUBLIC_DEFAULT_IMG_URL
              }
              itemName={organizationName}
            />
          )}

          {!session?.user && (
            <UnauthorizedTeamInvitation
              email={email}
              organizationImage={organizationImage}
              organizationName={organizationName}
            />
          )}
          {session?.user && <AuthorizedTeamInvitation organizationId={organizationId} />}
        </Flex>
      </Box>
    </SplitContentContainer>
  );
}
