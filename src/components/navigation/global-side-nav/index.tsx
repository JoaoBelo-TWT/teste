import { ActionIcon, Flex, Text } from '@mantine/core';
import { Bell, Camera, Database, Gear, Path, SquaresFour } from '@phosphor-icons/react/dist/ssr';
import { Url } from 'next/dist/shared/lib/router/router';
import { getTranslations } from 'next-intl/server';
import React, { Suspense } from 'react';

import { Avatar } from '@/components/ui/avatar';
import { fetchDashboardsData } from '@/lib/fetch-dashboards-data';
import { SPACING } from '@/resources/constants';
import { routes } from '@/routes/routes';

import { NavLogo } from '../nav-logo';
import { NavigationAwareItem } from '../navigation-aware-item';

import { OrganizationButtonWrapper } from './buttons/organizations-button-wrapper';
import { WebsiteButtonWrapper } from './buttons/website-button-wrapper';
import classes from './index.module.css';

export async function GlobalSideNav({
  websiteId,
  organizationId
}: Readonly<{
  websiteId?: string;
  organizationId?: string;
}>) {
  const t = await getTranslations();
  const dashboardsData = await fetchDashboardsData(websiteId);

  const dashboardsList = dashboardsData?.dashboards?.edges?.map(({ node: { id, name } }) => ({
    label: (
      <div className={classes['global-side-nav__option-description']}>
        <Text fz="heading4" lh="body2">
          {name}
        </Text>
      </div>
    ),
    value: id,
    href: organizationId && websiteId && routes.dashboard.dashboard.path(organizationId, websiteId, id)
  }));

  const firstDashboardRoute =
    organizationId && websiteId && dashboardsList && dashboardsList?.length > 0 && dashboardsList[0].href;

  const navigationItems = [
    {
      regex:
        /* eslint-disable max-len */
        // eslint-disable-next-line i18next/no-literal-string
        '.*/(dashboard|campaign-performance|channel-performance|funnel-performance)(/|$)',
      /* eslint-enable max-len */
      icon: <SquaresFour size={24} />,
      dropdownData: dashboardsList,
      href: firstDashboardRoute ?? routes.homePage.path,
      headerLabel: t('general.navigation.yourDashboards')
    },
    {
      // eslint-disable-next-line i18next/no-literal-string
      regex: '.*/website/connections',
      icon: <Database size={24} />,
      href: organizationId && websiteId ? routes.website.connections.path(organizationId, websiteId) : '',
      label: t('general.navigation.connections')
    },
    {
      icon: <Path size={24} />,
      disabled: true
    },
    {
      icon: <Camera size={24} />,
      disabled: true
    },
    {
      // eslint-disable-next-line i18next/no-literal-string
      regex: '.*/website/notifications',
      icon: <Bell size={24} />,
      label: t('general.navigation.notifications'),
      href: organizationId && websiteId ? routes.website.notifications.path(organizationId, websiteId) : ''
    },
    {
      // eslint-disable-next-line i18next/no-literal-string
      regex: '.*/website/(details|dashboards)',
      label: t('general.navigation.settings'),
      href: organizationId && websiteId ? routes.website.details.path(organizationId, websiteId) : '',
      icon: <Gear size={24} />
    }
  ];

  return (
    <nav className={classes['global-side-nav']}>
      <NavLogo href={firstDashboardRoute || routes.homePage.path} />
      <div className={classes['global-side-nav__content']}>
        <Flex
          direction="column"
          align="center"
          justify="center"
          pt={{ base: SPACING.xxl }}
          pb={{ base: SPACING.xs, lg: 0 }}
          gap={{ base: SPACING.lg }}
          h="100%"
        >
          {navigationItems.map((item, index) => (
            <NavigationAwareItem
              key={`${item.label}+${index}`}
              disabled={item.disabled}
              label={item.label}
              size={48}
              regex={item.regex}
              href={item.href as Url}
              dropdownData={item.dropdownData}
              headerLabel={item.headerLabel}
            >
              {item.icon}
            </NavigationAwareItem>
          ))}
        </Flex>
        <Flex direction="column" align="center" justify="center" pt={{ base: SPACING.md }}></Flex>
        <Flex
          direction="column"
          align="center"
          justify="center"
          mb={{ xs: SPACING.sm, lg: SPACING.lg }}
          gap={SPACING.xs}
        >
          {organizationId && websiteId ? (
            <>
              <Suspense key={`${organizationId}-${websiteId}`} fallback={<Avatar radius="xl" size={32} />}>
                <WebsiteButtonWrapper organizationId={organizationId} activeWebsiteId={websiteId} />
              </Suspense>
              <Suspense key={organizationId} fallback={<Avatar radius="xl" size={32} />}>
                <OrganizationButtonWrapper organizationId={organizationId} websiteId={websiteId} />
              </Suspense>
            </>
          ) : (
            <>
              <ActionIcon radius="xl" loading size={32} />
              <ActionIcon radius="xl" loading size={32} />
            </>
          )}
        </Flex>
      </div>
    </nav>
  );
}
