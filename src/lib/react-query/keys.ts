/* eslint-disable i18next/no-literal-string */
import { CampaignSorting, CampaignStatusInput, DashboardTimeframe, PageViewsSorting } from '@/__generated__/graphql';

export const meKeys = {
  all: ['me']
};

export const websiteKeys = {
  all: ['website'],

  single: (websiteId: string) => [...websiteKeys.all, 'single', websiteId],

  connectionStatus: (websiteId: string) => [...websiteKeys.single(websiteId), 'connection-status'],

  selectors: (websiteId: string) => [...websiteKeys.single(websiteId), 'selectors'],

  paginated: (filters: unknown) => [...websiteKeys.all, 'paginated', filters]
};

export const notificationKeys = {
  all: ['notification'],

  single: (websiteId: string) => [...websiteKeys.all, 'single', websiteId],

  paginated: (websiteId: string, take: number) => [...notificationKeys.single(websiteId), 'paginated', take]
};

export const dashboardKeys = {
  all: ['dashboard'],

  single: (dashboardId: string) => [...dashboardKeys.all, 'single', dashboardId],

  funnels: (dashboardId: string) => [...dashboardKeys.single(dashboardId), 'funnel'],

  goals: (dashboardId: string) => [...dashboardKeys.single(dashboardId), 'goals'],

  campaignPaginated: (
    dashboardId: string,
    dashboardTimeframe: DashboardTimeframe,
    status: CampaignStatusInput,
    sorting: CampaignSorting,
    take: number
  ) => [...dashboardKeys.single(dashboardId), 'campaign', 'paginated', dashboardTimeframe, status, sorting, take],

  websitePerformance: (
    dashboardId: string,
    dashboardTimeframe: DashboardTimeframe,
    sorting: PageViewsSorting,
    take: number
  ) => [...dashboardKeys.single(dashboardId), 'website-performance', dashboardTimeframe, sorting, take],

  section: (
    sectionName: string,
    dashboardId: string,
    timeFrame: string | null = null,
    channelSorting: string | null = null,
    funnelSorting: string | null = null
  ) => [...dashboardKeys.single(dashboardId), 'section', sectionName, timeFrame, channelSorting, funnelSorting]
};

export const organizationKeys = {
  all: ['organization'],

  single: (organizationId: string) => [...organizationKeys.all, 'single', organizationId]
};
