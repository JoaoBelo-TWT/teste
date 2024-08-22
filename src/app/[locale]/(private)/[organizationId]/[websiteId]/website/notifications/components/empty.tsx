import { Flex, Paper, Text } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

import { SPACING } from '@/resources/constants';

export default async function EmptyNotifications() {
  const t = await getTranslations();
  return (
    <>
      <Paper mt={SPACING.md} radius="md" bg="dark.1" mb={SPACING.sm} w="100%" h={100} />
      <Paper radius="md" bg="dark.1" mb={SPACING.sm} w="100%" h={100} />
      <Paper radius="md" bg="dark.1" mb={SPACING.sm} w="100%" h={100}>
        <Flex align="center" justify="center" h={100}>
          <Text fz={SPACING.md} fw={500}>
            {t('common.noNotifications')}
          </Text>
        </Flex>
      </Paper>
      <Paper radius="md" bg="dark.1" mb={SPACING.sm} w="100%" h={100} />
      <Paper radius="md" bg="dark.1" mb={SPACING.sm} w="100%" h={100} />
    </>
  );
}
