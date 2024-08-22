import { Flex, Title } from '@mantine/core';
import { Info } from '@phosphor-icons/react';

import { Tooltip } from '@/components/ui/tooltip';

export function TitleWithTooltip({ title, tooltip }: { title: string; tooltip: string }) {
  return (
    <Flex align="center" justify="center" gap={10}>
      <Title order={3}>{title}</Title>
      <Tooltip position="bottom-start" maw={310} label={tooltip}>
        <Info size={24} />
      </Tooltip>
    </Flex>
  );
}
