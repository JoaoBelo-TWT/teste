'use client';

import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { Sun, Moon } from '@phosphor-icons/react';

const ThemeToggler = () => {
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  return (
    <ActionIcon onClick={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')} variant="transparent">
      {colorScheme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
    </ActionIcon>
  );
};

export default ThemeToggler;
