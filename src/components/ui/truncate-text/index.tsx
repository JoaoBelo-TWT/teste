import { Box, Flex, Text } from '@mantine/core';
import { useState, useEffect, useRef } from 'react';

import { SPACING } from '@/resources/constants';

import { Tooltip } from '../tooltip';

import classes from './index.module.css';
import { TruncateTextProps } from './types';

export function TruncateText({ text, maxSizePercentage }: Readonly<TruncateTextProps>) {
  const [isTruncated, setIsTruncated] = useState<boolean>(false);

  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      const element = boxRef.current;
      if (element) {
        setIsTruncated(element.scrollWidth > element.clientWidth);
      }
    };

    checkOverflow();
    /* eslint-disable i18next/no-literal-string */
    window.addEventListener('resize', checkOverflow); // Re-check on window resize

    return () => {
      window.removeEventListener('resize', checkOverflow); // Cleanup on unmount
    };
  }, []);

  return (
    <Flex gap={SPACING.xs} maw="100%">
      <Text
        fz={14}
        ref={boxRef}
        className={classes['truncate-text__text-container']}
        style={{
          maxWidth: maxSizePercentage ? `${maxSizePercentage}vw` : 'initial'
        }}
      >
        {text}
      </Text>
      {isTruncated && (
        <Tooltip multiline label={text} maw={'90vw'} position="bottom-end">
          <Box className={classes['truncate-text__tooltip']}>...</Box>
        </Tooltip>
      )}
    </Flex>
  );
}

export default TruncateText;
