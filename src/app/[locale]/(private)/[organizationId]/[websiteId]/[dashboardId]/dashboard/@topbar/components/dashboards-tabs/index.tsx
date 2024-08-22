'use client';

import { CaretLeft, CaretRight, Plus } from '@phosphor-icons/react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import { GetDashboardsQuery } from '@/__generated__/graphql';
import { Tabs } from '@/components/ui/tabs';
import { routes } from '@/routes/routes';

const dashboardsPerPage = 3;

export default function DashboardsTabs({
  organizationId,
  websiteId,
  dashboardId,
  dashboards,
  isAdmin
}: Readonly<{
  organizationId: string;
  websiteId: string;
  dashboardId: string;
  dashboards: GetDashboardsQuery['dashboards']['edges'];
  isAdmin: boolean;
}>) {
  const selectedDashboardIndex = useMemo(
    () => dashboards.findIndex((dashboard) => dashboard.node.id === dashboardId) + 1,
    [dashboardId, dashboards]
  );
  const [page, setPage] = useState<number>(Math.ceil(selectedDashboardIndex / dashboardsPerPage));
  const [displayedDashboards, setDisplayedDashboards] = useState<GetDashboardsQuery['dashboards']['edges']>(
    dashboards.slice(0, dashboardsPerPage)
  );

  useEffect(() => {
    setDisplayedDashboards(dashboards.slice((page - 1) * dashboardsPerPage, page * dashboardsPerPage));
  }, [page, dashboards]);

  const dashboardsTabs = displayedDashboards.map((dashboard) => (
    <Link
      key={dashboard.node.id}
      style={{ color: 'inherit', textDecoration: 'inherit' }}
      href={{
        pathname: routes.dashboard.homePage.path(organizationId, websiteId, dashboard.node.id)
      }}
    >
      <Tabs.Tab value={dashboard.node.id}>{dashboard.node.name}</Tabs.Tab>
    </Link>
  ));

  const enablePreviousButton = useMemo(() => page > 1, [page]);
  const enableNextButton = useMemo(() => page < dashboards.length / dashboardsPerPage, [page, dashboards]);

  return (
    <Tabs.List>
      <span // NOSONAR
        onClick={() => {
          if (enablePreviousButton) {
            setPage(page - 1);
          }
        }}
        style={{
          color: 'inherit',
          textDecoration: 'inherit',
          opacity: enablePreviousButton ? 1 : 0.25,
          cursor: enablePreviousButton ? 'pointer' : 'default'
        }}
      >
        <Tabs.Tab value="previous-page" styles={{ tab: { cursor: enablePreviousButton ? 'pointer' : 'default' } }}>
          <CaretLeft size={16} weight="bold" />
        </Tabs.Tab>
      </span>
      {dashboardsTabs}
      <span // NOSONAR
        onClick={() => {
          if (enableNextButton) {
            setPage(page + 1);
          }
        }}
        style={{
          color: 'inherit',
          textDecoration: 'inherit',
          opacity: enableNextButton ? 1 : 0.25,
          cursor: enableNextButton ? 'pointer' : 'default'
        }}
      >
        <Tabs.Tab value="next-page" styles={{ tab: { cursor: enableNextButton ? 'pointer' : 'default' } }}>
          <CaretRight size={16} weight="bold" />
        </Tabs.Tab>
      </span>
      {isAdmin && (
        <Tabs.Tab value="add-dashboard">
          <Link
            href={routes.dashboard.new.path(organizationId, websiteId)}
            style={{ color: 'inherit', textDecoration: 'inherit' }}
          >
            <Plus size={16} weight="bold" />
          </Link>
        </Tabs.Tab>
      )}
    </Tabs.List>
  );
}
