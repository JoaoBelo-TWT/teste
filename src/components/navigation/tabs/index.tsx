'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { Tabs } from '@/components/ui/tabs';
import useFilteredQueryParams from '@/hooks/use-filtered-query-params';
import { cleanupParams } from '@/utils/strings/cleanup-params';

export interface NavigationTab {
  label: string;
  href: string;
}

export default function NavigationTabs({
  tabs,
  preserveQueryParams = []
}: {
  tabs: NavigationTab[];
  preserveQueryParams?: string[];
}) {
  const pathname = usePathname();
  const currentPath = useMemo(() => `/${pathname?.split('/').slice(2).join('/')}`, [pathname]);

  const filteredQueryParams = useFilteredQueryParams({ preserveQueryParams });

  function cleanupHref(str: string) {
    if (str.endsWith('/?')) {
      return str.slice(0, -2);
    }
    if (str.endsWith('/')) {
      return str.slice(0, -1);
    }
    return str;
  }

  return (
    <Tabs value={currentPath} variant="header">
      <Tabs.List>
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            style={{ color: 'inherit', textDecoration: 'inherit' }}
            href={cleanupParams(filteredQueryParams, tab.href)}
          >
            <Tabs.Tab value={cleanupHref(tab.href)}>{tab.label}</Tabs.Tab>
          </Link>
        ))}
      </Tabs.List>
    </Tabs>
  );
}
