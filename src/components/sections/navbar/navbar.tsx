/* eslint-disable i18next/no-literal-string */
import { Group, Box } from '@mantine/core';
import Link from 'next/link';

import { routes } from '@/routes/routes';

import classes from './navbar.module.css';

export default function Navbar() {
  return (
    <Box pb={120}>
      <header className={classes.navbar__header}>
        <Group justify="space-between" h="100%">
          <Link href={routes.homePage.path}>
            <img
              src={process.env.NEXT_PUBLIC_DEFAULT_IMG_URL}
              alt="logo"
              width={40}
              height={40}
              className="rounded-md"
            />
          </Link>
        </Group>
      </header>
    </Box>
  );
}
