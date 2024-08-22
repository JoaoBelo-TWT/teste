import { BoxProps, ImageProps } from '@mantine/core';

export interface AvatarChipProps extends BoxProps {
  variant?: 'filled' | 'outlined';
  label: string | null | undefined;
  image?: string;
}

export type AvatarChipImageProps = ImageProps & { alt: string };
