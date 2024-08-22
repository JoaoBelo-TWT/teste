import { Box, Text } from '@mantine/core';
import clsx from 'clsx';

import { AvatarImage } from './Image';
import classes from './index.module.css';
import { AvatarChipProps } from './types';

export const AvatarChip = ({ label, image, variant = 'filled', ...boxProps }: AvatarChipProps) => {
  const textColor = `var(--mantine-color-dark-${variant === 'filled' ? '6' : '8'})`;

  return (
    <Box
      data-image={!!image}
      className={clsx(classes['avatar-chip'], variant === 'outlined' && classes['avatar-chip--outlined'])}
      {...boxProps}
    >
      {image && (
        <Box
          className={`${classes['avatar-chip__image-container']}
           ${classes['avatar-chip__image-container']}--${variant}`}
        >
          <img height={32} width={32} alt="avatar image" src={image} />
        </Box>
      )}
      {label && (
        <Text truncate="end" c={textColor}>
          {label}
        </Text>
      )}
    </Box>
  );
};

AvatarChip.Image = AvatarImage;
