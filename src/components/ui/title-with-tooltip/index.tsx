import { Box, Flex, Text, Title } from '@mantine/core';
import { Info } from '@phosphor-icons/react';

import { Tooltip } from '@/components/ui/tooltip';

export function TitleWithTooltip({
  title,
  description,
  tooltip
}: {
  title: string;
  tooltip: string;
  description?: string;
}) {
  return (
    <Box>
      <Flex align="center" justify="center" gap={10}>
        <Title order={3}>{title}</Title>
        <Tooltip position="bottom-start" maw={360} label={tooltip}>
          <Info size={24} />
        </Tooltip>
      </Flex>
      {description && (
        <Text mt={4} fz={14} c="dark.7">
          {description}
        </Text>
      )}
    </Box>
  );
}
