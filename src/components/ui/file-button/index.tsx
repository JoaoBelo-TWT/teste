import { FileButton as MantineFileButton, Group, Text, ButtonProps, Flex } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';

import { SPACING } from '@/resources/constants';
import { fileToBase64 } from '@/utils/files/file-to-base64';

import { Button } from '../button';

export interface FileButtonProps extends ButtonProps {
  showSelectedFile?: boolean;
  accept?: string;
  showClearButton?: boolean;
  setValue?: (value: null | string) => void;
  clearButtonLabel?: string;
}

export default function FileButton({
  children,
  accept = 'image/png,image/jpeg',
  showSelectedFile = false,
  showClearButton = true,
  setValue,
  clearButtonLabel
}: FileButtonProps) {
  const [file, setFile] = useState<string | null | undefined>(null);
  const t = useTranslations();

  const handleFileChange = useCallback(
    async (newFile: File | null) => {
      const changeValue = setValue;
      if (newFile) {
        const imageBase64 = await fileToBase64(newFile);
        setFile(newFile.name);
        if (changeValue) {
          changeValue(imageBase64);
        }
      } else if (changeValue) {
        changeValue(null);
      }
    },
    [setValue]
  );

  return (
    <Flex gap={SPACING.xs} align="center">
      <Group justify="center">
        <MantineFileButton onChange={handleFileChange} accept={accept}>
          {(props) => (
            <Button variant="light" {...props}>
              {children}
            </Button>
          )}
        </MantineFileButton>
      </Group>

      {showClearButton && (
        <Button onClick={() => handleFileChange(null)} variant="white">
          {clearButtonLabel ?? t('common.remove')}
        </Button>
      )}

      {file && showSelectedFile && (
        <Text size="sm" ta="center">
          {file}
        </Text>
      )}
    </Flex>
  );
}
