import { Box, Flex, Paper, PaperProps, Text } from '@mantine/core';
import { CloudCheck, Info, Code, WarningOctagon } from '@phosphor-icons/react/dist/ssr';

import { NotificationType } from '@/__generated__/graphql';
import { SPACING } from '@/resources/constants';

import { Notification } from './types';

const NotificationIcons: Record<NotificationType | 'default', () => JSX.Element> = {
  [NotificationType.SourcePixel]: () => <Code size={20} weight="bold" />,
  [NotificationType.SyncFailure]: () => <WarningOctagon size={20} weight="bold" />,
  [NotificationType.SyncComplete]: () => <CloudCheck size={20} weight="bold" />,
  default: () => <Info size={20} weight="bold" />
};

export function NotificationCard({
  type = 'default',
  message,
  title,
  createdAt,
  showDot,
  ...paperProps
}: PaperProps & Notification) {
  const NotificationIcon = NotificationIcons[type] ?? NotificationIcons.default;

  return (
    <Paper pos="relative" p={SPACING.sm} withBorder mih={100} radius="md" {...paperProps}>
      {showDot && <Box style={{ borderRadius: 100, position: 'absolute', left: 8, top: 8 }} h="8" w="8" bg="red" />}
      <Flex gap={SPACING.xs}>
        <Box mt={2}>
          <NotificationIcon />
        </Box>
        <Box>
          <Text>{title}</Text>
          <Text mb={5} fz={14} c="dark.7">
            {message}
          </Text>
          <Text fz={12} c="dark.5">
            {createdAt}
          </Text>
        </Box>
      </Flex>
    </Paper>
  );
}
