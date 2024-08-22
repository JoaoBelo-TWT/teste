/* eslint-disable max-len */
/* eslint-disable i18next/no-literal-string */
import { getQueryParamIfDefined } from '@/utils/query-params/get-query-param-if-defined';

export enum Roles {
  ADMIN = 'Admin',
  WRITE = 'Write',
  READ = 'Read'
}

/**
 * IMPORTANT: (onboarding) routes must not be changed because they might be stored in the db
 * for some user's currentOnboardingPath
 */
export type RouteObject = {
  path: string | ((...args: string[]) => string);
  pattern: string;
  allowedRoles: Roles[];
  /* publicAccess variable will bypass any allowedRoles */
  publicAccess?: boolean;
};

export type NestedRouteObject = {
  [key: string]: RouteObject | NestedRouteObject;
};

export type Routes = {
  [key: string]: RouteObject | NestedRouteObject;
};

export const routes = {
  teamInvitation: { path: '/team-invitation', pattern: '/team-invitation', allowedRoles: [], publicAccess: true },
  homePage: { path: '/', pattern: '/', allowedRoles: [], publicAccess: true },
  aboutPage: {
    path: '/about',
    pattern: '/about',
    allowedRoles: [],
    publicAccess: true
  },
  contactPage: {
    path: '/contact',
    pattern: '/contact',
    allowedRoles: [],
    publicAccess: true
  },
  verifyEmail: {
    path: '/verify-email',
    pattern: '/verify-email',
    allowedRoles: [],
    publicAccess: true
  },
  emailVerified: {
    path: '/email-verified',
    pattern: '/email-verified',
    allowedRoles: [],
    publicAccess: true
  },
  share: {
    path: (websiteId: string, snippetUrl: string) => `/share?websiteId=${websiteId}&snippetUrl=${snippetUrl}`,
    pattern: '/share',
    allowedRoles: [],
    publicAccess: true
  },
  personalSettings: {
    path: (organizationId: string, websiteId: string) => `/${organizationId}/${websiteId}/personal-settings`,
    allowedRoles: [Roles.ADMIN, Roles.WRITE, Roles.READ],
    pattern: '/[id]/[id]/personal-settings'
  },
  dashboard: {
    campaignPerformance: {
      path: (
        organizationId: string,
        websiteId: string,
        dashboardId: string | null,
        campaignName?: string | null,
        timeframe?: string
      ) =>
        `/${organizationId}/${websiteId}/${dashboardId}/campaign-performance/?${getQueryParamIfDefined('campaignName', campaignName)}${getQueryParamIfDefined('timeframe', timeframe, !!campaignName)}`,
      pattern: '/[id]/[id]/[id]/campaign-performance',
      allowedRoles: [Roles.ADMIN, Roles.WRITE, Roles.READ]
    },
    campaignSourcePerformance: {
      path: (
        organizationId: string,
        websiteId: string,
        dashboardId: string | null,
        campaignId: string | null,
        sourceId: string
      ) => `/${organizationId}/${websiteId}/${dashboardId}/campaign-performance/${campaignId}/${sourceId}`,
      pattern: '/[id]/[id]/[id]/campaign-performance/[id]/[id]',
      allowedRoles: [Roles.ADMIN, Roles.WRITE, Roles.READ]
    },
    funnelPerformance: {
      path: (
        organizationId: string,
        websiteId: string,
        dashboardId: string | null,
        funnelId: string | null,
        timeframe?: string
      ) =>
        `/${organizationId}/${websiteId}/${dashboardId}/funnel-performance/${funnelId}/?${getQueryParamIfDefined('timeframe', timeframe)}`,
      pattern: '/[id]/[id]/[id]/funnel-performance/[id]',
      allowedRoles: [Roles.ADMIN, Roles.WRITE, Roles.READ]
    },
    funnelSourcePerformance: {
      path: (
        organizationId: string,
        websiteId: string,
        dashboardId: string | null,
        funnelId: string | null,
        sourceUrl: string,
        firstPageUrl: string,
        timeframe: string
      ) =>
        `/${organizationId}/${websiteId}/${dashboardId}/funnel-performance/${funnelId}/detail/?timeframe=${timeframe}&sourceUrl=${sourceUrl}&firstPageVisited=${firstPageUrl}`,
      pattern: `/[id]/[id]/[id]/funnel-performance/[id]/detail/`,
      allowedRoles: [Roles.ADMIN, Roles.WRITE, Roles.READ]
    },
    channelPerformance: {
      email: {
        path: (organizationId: string, websiteId: string, dashboardId?: string | null) =>
          `/${organizationId}/${websiteId}/${dashboardId}/channel-performance/email`,
        pattern: '/[id]/[id]/[id]/channel-performance/email',
        allowedRoles: [Roles.ADMIN, Roles.WRITE, Roles.READ]
      },
      referrals: {
        path: (organizationId: string, websiteId: string, dashboardId?: string | null) =>
          `/${organizationId}/${websiteId}/${dashboardId}/channel-performance/referrals`,
        pattern: '/[id]/[id]/[id]/channel-performance/referrals',
        allowedRoles: [Roles.ADMIN, Roles.WRITE, Roles.READ]
      },
      social: {
        path: (organizationId: string, websiteId: string, dashboardId?: string | null) =>
          `/${organizationId}/${websiteId}/${dashboardId}/channel-performance/social`,
        pattern: '/[id]/[id]/[id]/channel-performance/social',
        allowedRoles: [Roles.ADMIN, Roles.WRITE, Roles.READ]
      },
      direct: {
        path: (organizationId: string, websiteId: string, dashboardId?: string | null) =>
          `/${organizationId}/${websiteId}/${dashboardId}/channel-performance/direct`,
        pattern: '/[id]/[id]/[id]/channel-performance/direct',
        allowedRoles: [Roles.ADMIN, Roles.WRITE, Roles.READ]
      },
      search: {
        path: (organizationId: string, websiteId: string, dashboardId?: string | null) =>
          `/${organizationId}/${websiteId}/${dashboardId}/channel-performance/search`,
        pattern: '/[id]/[id]/[id]/channel-performance/search',
        allowedRoles: [Roles.ADMIN, Roles.WRITE, Roles.READ]
      }
    },
    dashboard: {
      path: (organizationId: string, websiteId: string, dashboardId?: string | null) =>
        `/${organizationId}/${websiteId}/${dashboardId}/dashboard`,
      pattern: '/[id]/[id]/[id]/dashboard',
      allowedRoles: [Roles.ADMIN, Roles.WRITE, Roles.READ],
      publicAccess: true
    },
    homePage: {
      path: (organizationId: string, websiteId: string, dashboardId: string) =>
        `/${organizationId}/${websiteId}/${dashboardId}/dashboard`,
      pattern: '/[id]/[id]/[id]/dashboard',
      allowedRoles: [Roles.ADMIN, Roles.WRITE, Roles.READ],
      publicAccess: true
    },
    new: {
      path: (organizationId: string, websiteId: string) => `/${organizationId}/${websiteId}/new-dashboard`,
      pattern: '/[id]/[id]/new-dashboard',
      allowedRoles: [Roles.ADMIN]
    },
    dashboardCreate: {
      homepage: {
        path: (organizationId: string, websiteId: string) => `/${organizationId}/${websiteId}/dashboard-create`,
        pattern: '/[id]/[id]/dashboard-create',
        allowedRoles: [Roles.ADMIN]
      },
      create: {
        path: (organizationId: string, websiteId: string) => `/${organizationId}/${websiteId}/dashboard-create/create`,
        pattern: '/[id]/[id]/dashboard-create/create',
        allowedRoles: [Roles.ADMIN]
      },
      goals: {
        path: (organizationId: string, websiteId: string, id: string, flow?: string) =>
          `/${organizationId}/${websiteId}/dashboard-create/${id}/goals?${getQueryParamIfDefined('flow', flow)}`,
        pattern: '/[id]/[id]/dashboard-create/[id]/goals',
        allowedRoles: [Roles.ADMIN, Roles.WRITE]
      },
      customerFunnel: {
        path: (organizationId: string, websiteId: string, id: string, flow?: string) =>
          `/${organizationId}/${websiteId}/dashboard-create/${id}/customer-funnel?${getQueryParamIfDefined('flow', flow)}`,
        pattern: '/[id]/[id]/dashboard-create/[id]/customer-funnel',
        allowedRoles: [Roles.ADMIN]
      },
      selectSource: {
        path: (organizationId: string, websiteId: string, id: string, flow?: string) =>
          `/${organizationId}/${websiteId}/dashboard-create/${id}/select-source?${getQueryParamIfDefined('flow', flow)}`,
        pattern: '/[id]/[id]/dashboard-create/[id]/select-source',
        allowedRoles: [Roles.ADMIN]
      },
      createStages: {
        path: (organizationId: string, websiteId: string, id: string, flow?: string) =>
          `/${organizationId}/${websiteId}/dashboard-create/${id}/create-stages?${getQueryParamIfDefined('flow', flow)}`,
        pattern: '/[id]/[id]/dashboard-create/[id]/create-stages',
        allowedRoles: [Roles.ADMIN]
      },
      createStageEvents: {
        path: (organizationId: string, websiteId: string, dashboardId: string, id: string, flow?: string) =>
          `/${organizationId}/${websiteId}/dashboard-create/${dashboardId}/create-events/${id}?${getQueryParamIfDefined('flow', flow)}`,
        pattern: '/[id]/[id]/dashboard-create/[id]/create-events/[id]',
        allowedRoles: [Roles.ADMIN]
      },
      allSet: {
        path: (organizationId: string, websiteId: string, dashboardId: string) =>
          `/${organizationId}/${websiteId}/dashboard-create/${dashboardId}/all-set`,
        pattern: '/[id]/[id]/dashboard-create/[id]/all-set',
        allowedRoles: [Roles.ADMIN]
      }
    }
  },
  organizationSettings: {
    teamMembers: {
      path: (organizationId: string, websiteId: string) =>
        `/${organizationId}/${websiteId}/organization-settings/team-members`,
      pattern: '/[id]/[id]/organization-settings/team-members',
      allowedRoles: [Roles.ADMIN, Roles.WRITE, Roles.READ]
    },
    organizationDetails: {
      path: (organizationId: string, websiteId: string) =>
        `/${organizationId}/${websiteId}/organization-settings/organization-details`,
      pattern: '/[id]/[id]/organization-settings/organization-details',
      allowedRoles: [Roles.ADMIN, Roles.WRITE, Roles.READ]
    }
  },
  website: {
    notifications: {
      path: (organizationId: string, websiteId: string) => `/${organizationId}/${websiteId}/website/notifications`,
      pattern: '/[id]/[id]/website/notifications',
      allowedRoles: [Roles.ADMIN, Roles.WRITE, Roles.READ]
    },
    dashboards: {
      path: (organizationId: string, websiteId: string) => `/${organizationId}/${websiteId}/website/dashboards`,
      pattern: '/[id]/[id]/website/dashboards',
      allowedRoles: [Roles.ADMIN, Roles.WRITE, Roles.READ]
    },
    connections: {
      path: (organizationId: string, websiteId: string) => `/${organizationId}/${websiteId}/website/connections`,
      pattern: '/[id]/[id]/website/connections',
      allowedRoles: [Roles.ADMIN, Roles.WRITE, Roles.READ]
    },
    details: {
      path: (organizationId: string, websiteId: string) => `/${organizationId}/${websiteId}/website/details`,
      pattern: '/[id]/[id]/website/details',
      allowedRoles: [Roles.ADMIN, Roles.WRITE, Roles.READ]
    },
    connect: {
      path: (websiteId: string, organizationId?: string | null) =>
        `/${organizationId}/${websiteId}/website/connections/source`,
      pattern: '/[id]/[id]/website/connections/source',
      allowedRoles: [],
      publicAccess: true
    },
    connectGoogleAds: {
      path: (websiteId: string, organizationId?: string | null) =>
        `/${organizationId}/${websiteId}/website/connections/google-ads`,
      pattern: '/[id]/[id]/website/connections/google-ads',
      allowedRoles: [],
      publicAccess: true
    },
    setup: {
      start: {
        path: (organizationId: string) => `/${organizationId}/website/setup`,
        pattern: '/[id]/website/setup',
        allowedRoles: [Roles.ADMIN]
      },
      name: {
        path: (organizationId: string) => `/${organizationId}/website/setup/name`,
        pattern: '/[id]/website/setup/name',
        allowedRoles: [Roles.ADMIN]
      },
      domain: {
        path: (organizationId: string, id: string) => `/${organizationId}/website/setup/${id}/domain`,
        pattern: '/[id]/website/setup/[id]/domain',
        allowedRoles: [Roles.ADMIN]
      },
      forms: {
        path: (organizationId: string, id: string) => `/${organizationId}/website/setup/${id}/forms`,
        pattern: '/[id]/website/setup/[id]/forms',
        allowedRoles: [Roles.ADMIN]
      },
      config: {
        path: (organizationId: string, id: string) => `/${organizationId}/website/setup/${id}/config`,
        pattern: '/[id]/website/setup/[id]/config',
        allowedRoles: [Roles.ADMIN]
      },
      configGoogleAds: {
        path: (organizationId: string, id: string) => `/${organizationId}/website/setup/${id}/google-ads`,
        pattern: '/[id]/website/setup/[id]/google-ads',
        allowedRoles: [Roles.ADMIN]
      },
      allSet: {
        path: (organizationId: string, id: string) => `/${organizationId}/website/setup/${id}/all-set`,
        pattern: '/[id]/website/setup/[id]/all-set',
        allowedRoles: [Roles.ADMIN]
      }
    }
  },
  account: {
    setup: {
      step1: {
        path: '/account/setup/1',
        pattern: '/account/setup/1',
        allowedRoles: [],
        publicAccess: true
      },
      step2: {
        path: '/account/setup/2',
        pattern: '/account/setup/2',
        allowedRoles: [],
        publicAccess: true
      },
      step3: {
        path: '/account/setup/3',
        pattern: '/account/setup/3',
        allowedRoles: [],
        publicAccess: true
      }
    }
  },
  api: {
    login: {
      path: '/api/auth/login',
      pattern: '/api/auth/login',
      allowedRoles: [],
      publicAccess: true
    },
    signup: {
      path: '/api/auth/signup',
      pattern: '/api/auth/signup',
      allowedRoles: [],
      publicAccess: true
    },
    logout: {
      path: '/api/auth/logout',
      pattern: '/api/auth/logout',
      allowedRoles: [],
      publicAccess: true
    }
  }
};
