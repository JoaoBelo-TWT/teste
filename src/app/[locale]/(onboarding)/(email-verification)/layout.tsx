import { Flex } from '@mantine/core';

import { ContentContainer } from '@/components/layouts/content-container';

export default function EmailVerificationLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ContentContainer>
      <Flex maw={500} direction="column" ta="center" align="center">
        {children}
      </Flex>
    </ContentContainer>
  );
}
