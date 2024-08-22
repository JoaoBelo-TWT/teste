/* eslint-disable i18next/no-literal-string */
import { Flex, Text, Title } from '@mantine/core';
import getConfig from 'next/config';

import { Dot } from '@/components/ui/dot';

export default function HealthPage() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {
    publicRuntimeConfig: { version }
  } = getConfig();

  return (
    <Flex justify="center" align="center" direction="column" w="100%">
      <Title order={2}>App Status</Title>
      <Dot />
      {version}
      <Text c="blue">The application is up and running</Text>
    </Flex>
  );
}
