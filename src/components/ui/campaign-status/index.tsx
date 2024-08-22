import { Flex, FlexProps, Text } from '@mantine/core';

type CampaignStatusProps = FlexProps & {
  status?: string;
  dateInterval?: string;
};

export function CampaignStatus(props: Readonly<CampaignStatusProps>) {
  const statusColor = props?.status?.toLowerCase() === 'active' ? 'var(--system-green-600-color)' : undefined;
  const { status, dateInterval, ...restProps } = props;

  if (!status && !dateInterval) {
    return null;
  }

  return (
    <Flex gap={4} align="center" {...restProps}>
      {status && (
        <Text fz="caption" fw={400} lh="body2" c={statusColor} tt="uppercase">
          {status}
        </Text>
      )}
      {dateInterval && status && (
        <Text fz="caption" fw={400} lh="body2" c="var(--mantine-color-dark-7)">
          •
        </Text>
      )}
      {dateInterval && (
        <Text fz="caption" fw={400} lh="body2" tt="uppercase" c="var(--mantine-color-dark-7)">
          {dateInterval}
        </Text>
      )}
    </Flex>
  );
}
