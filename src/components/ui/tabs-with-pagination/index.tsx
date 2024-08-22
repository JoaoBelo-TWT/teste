'use client';

import { Flex, Text } from '@mantine/core';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { Tabs } from '@/components/ui/tabs';
import useFilteredQueryParams from '@/hooks/use-filtered-query-params';
import { cleanupParams } from '@/utils/strings/cleanup-params';

import { toaster } from '../toast';
import { Tooltip } from '../tooltip';

export interface NavigationTab {
  label: string;
  href: string;
}
export default function TabsWithPagination({
  tabsPerPage = 3,
  tabs,
  onClickLoadMoreTabs,
  truncateText,
  preserveQueryParams
}: Readonly<{
  tabsPerPage?: number;
  tabs: NavigationTab[];
  onClickLoadMoreTabs: () => void;
  truncateText?: boolean;
  preserveQueryParams?: string[];
}>) {
  const t = useTranslations();
  const [page, setPage] = useState<number>(0);
  const [displayedTabs, setDisplayedTabs] = useState<NavigationTab[]>(tabs.slice(0, tabsPerPage));
  const [enableNextButton, setEnableNextButton] = useState<boolean>(true);
  const filteredQueryParams = useFilteredQueryParams({ preserveQueryParams });

  useEffect(() => {
    if (tabs.slice(page * tabsPerPage, (page + 1) * tabsPerPage).length > 0) {
      setDisplayedTabs(tabs.slice(page * tabsPerPage, (page + 1) * tabsPerPage));
    } else {
      setEnableNextButton(false);
      setPage(page - 1);
      toaster.info({ title: t('website.connections.toasts.info.noMoreCampaigns') });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, tabs]);

  const tabItems = displayedTabs.map((tab, index) => (
    <Link
      key={tab.label + index}
      style={{ color: 'inherit', textDecoration: 'inherit' }}
      href={cleanupParams(filteredQueryParams, tab.href)}
    >
      <Tabs.Tab value={tab.label}>
        {truncateText && tab.label.length > 22 ? (
          <Tooltip multiline label={tab.label}>
            <Text truncate={truncateText} maw={truncateText ? 200 : undefined}>
              {tab.label}
            </Text>
          </Tooltip>
        ) : (
          <Text>{tab.label}</Text>
        )}
      </Tabs.Tab>
    </Link>
  ));

  const enablePreviousButton = page > 0;

  return (
    <Tabs>
      <Tabs.List>
        <Flex
          mt="auto"
          mb="auto"
          onClick={() => {
            if (enablePreviousButton) {
              setPage(page - 1);
              setEnableNextButton(true);
            }
          }}
          style={{
            color: 'inherit',
            textDecoration: 'inherit',
            opacity: enablePreviousButton ? 1 : 0.25,
            cursor: enablePreviousButton ? 'pointer' : 'default'
          }}
        >
          <CaretLeft size={16} weight="bold" />
        </Flex>
        {tabItems}
        <Flex
          mt="auto"
          mb="auto"
          onClick={() => {
            const nextDisplayedTabs = tabs.slice((page + 1) * tabsPerPage, (page + 2) * tabsPerPage);
            if (nextDisplayedTabs.length > 0) {
              setPage(page + 1);
            } else if (onClickLoadMoreTabs) {
              onClickLoadMoreTabs();
              setPage(page + 1);
            }
          }}
          style={{
            color: 'inherit',
            textDecoration: 'inherit',
            opacity: enableNextButton && onClickLoadMoreTabs !== undefined ? 1 : 0.25,
            cursor: enableNextButton && onClickLoadMoreTabs !== undefined ? 'pointer' : 'default',
            /* eslint-disable i18next/no-literal-string */
            pointerEvents: enableNextButton && onClickLoadMoreTabs !== undefined ? 'initial' : 'none'
          }}
        >
          <CaretRight size={16} weight="bold" />
        </Flex>
      </Tabs.List>
    </Tabs>
  );
}
