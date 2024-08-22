import { Title, Text, TitleProps, TextProps, BoxProps, Box } from '@mantine/core';

import { SPACING } from '@/resources/constants';

import classes from './index.module.css';

export interface TextContentProps extends BoxProps {
  title: string;
  description?: string;
  titleProps?: TitleProps;
  descriptionProps?: TextProps;
}

export function TextContent({ title, description, titleProps, descriptionProps, ...rest }: Readonly<TextContentProps>) {
  return (
    <Box className={classes['text-content']} {...rest}>
      <Title order={2} {...titleProps}>
        {title}
      </Title>
      {description && (
        <Text mb={SPACING.md} fz="body1" c="dark.7" lh="body2" fw={400} {...descriptionProps}>
          {description}
        </Text>
      )}
    </Box>
  );
}
