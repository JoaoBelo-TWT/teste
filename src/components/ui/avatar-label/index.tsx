import { AvatarProps, Flex, MantineStyleProp, Text } from '@mantine/core';
import { ReactNode } from 'react';

import { SPACING } from '@/resources/constants';

import { Avatar } from '../avatar';

export function AvatarWithLabel({
  imageSrc,
  label,
  description,
  avatarProps,
  avatarStyle
}: {
  imageSrc?: string | null;
  label: string | ReactNode;
  description?: string | ReactNode;
  avatarProps?: AvatarProps;
  avatarStyle?: MantineStyleProp;
}) {
  return (
    <Flex gap={SPACING.xs} align="center">
      {(imageSrc || avatarProps?.name) && (
        <Avatar size={32} {...avatarProps} style={avatarStyle}>
          {imageSrc && <img src={imageSrc} width={32} height={32} alt={'icon'} />}
        </Avatar>
      )}
      {/* eslint-disable-next-line i18next/no-literal-string */}
      <Flex direction="column" gap={SPACING.xxs} maw="100%" style={{ overflow: 'hidden' }}>
        {typeof label === 'string' ? (
          <Text fz="body2" lh="body2">
            {label}
          </Text>
        ) : (
          label
        )}
        {description && typeof description === 'string' ? (
          <Text fz="body2" lh="body2" c="dark.5">
            {description}
          </Text>
        ) : (
          description
        )}
      </Flex>
    </Flex>
  );
}
