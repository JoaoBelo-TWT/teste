/* eslint-disable max-len */
/* eslint-disable i18next/no-literal-string */
import { describe, test, expect } from '@jest/globals';

import { GetMeQuery } from '@/__generated__/graphql';
import { Roles, Routes } from '@/routes/routes';

import {
  removeLanguagePrefix,
  matchUrlWithPattern,
  extractUUIDsFromUrl,
  doesUserHavePermissions,
  matchUrlOnRoutes
} from './user-permissions';

const testCases = [
  // Home page
  { url: '/', pattern: '/' },
  // About page
  { url: '/about', pattern: '/about' },
  // Contact page
  { url: '/contact', pattern: '/contact' },
  // Verify email page
  { url: '/verify-email', pattern: '/verify-email' },
  // Email verified page
  { url: '/email-verified', pattern: '/email-verified' },
  // Dashboard routes
  { url: '/94567d32-152f-4271-8531-7dc8e7014fa0/456/dashboard', pattern: '/[id]/[id]/dashboard' },
  { url: '/123/94567d32-152f-4271-8531-7dc8e7014fa0/dashboard/789', pattern: '/[id]/[id]/dashboard/[id]' },
  { url: '/123/456/new-dashboard', pattern: '/[id]/[id]/new-dashboard' },
  // Dashboard create routes
  { url: '/94567d32-152f-4271-8531-7dc8e7014fa0/456/dashboard-create', pattern: '/[id]/[id]/dashboard-create' },
  {
    url: '/94567d32-152f-4271-8531-7dc8e7014fa0/94567d32-152f-4271-8531-7dc8e7014fa0/dashboard-create/create',
    pattern: '/[id]/[id]/dashboard-create/create'
  },
  { url: '/123/456/dashboard-create/789/goals', pattern: '/[id]/[id]/dashboard-create/[id]/goals' },
  {
    url: '/123/94567d32-152f-4271-8531-7dc8e7014fa0/dashboard-create/789/customer-funnel',
    pattern: '/[id]/[id]/dashboard-create/[id]/customer-funnel'
  },
  {
    url: '/94567d32-152f-4271-8531-7dc8e7014fa0/456/dashboard-create/789/create-stages',
    pattern: '/[id]/[id]/dashboard-create/[id]/create-stages'
  },
  {
    url: '/123/456/dashboard-create/789/create-events/abc',
    pattern: '/[id]/[id]/dashboard-create/[id]/create-events/[id]'
  },
  // Organization settings
  {
    url: '/94567d32-152f-4271-8531-7dc8e7014fa0/456/dashboard/organization-settings',
    pattern: '/[id]/[id]/dashboard/organization-settings'
  },
  // Website setup routes
  { url: '/94567d32-152f-4271-8531-7dc8e7014fa0/website/setup', pattern: '/[id]/website/setup' },
  { url: '/94567d32-152f-4271-8531-7dc8e7014fa0/website/setup/name', pattern: '/[id]/website/setup/name' },
  { url: '/94567d32-152f-4271-8531-7dc8e7014fa0/website/setup/123', pattern: '/[id]/website/setup/[id]' },
  { url: '/94567d32-152f-4271-8531-7dc8e7014fa0/website/setup/123/domain', pattern: '/[id]/website/setup/[id]/domain' },
  { url: '/94567d32-152f-4271-8531-7dc8e7014fa0/website/setup/123/config', pattern: '/[id]/website/setup/[id]/config' },
  {
    url: '/94567d32-152f-4271-8531-7dc8e7014fa0/website/setup/123/all-set',
    pattern: '/[id]/website/setup/[id]/all-set'
  },
  // Account setup routes
  { url: '/account/setup/1', pattern: '/account/setup/1' },
  { url: '/account/setup/2', pattern: '/account/setup/2' },
  { url: '/account/setup/3', pattern: '/account/setup/3' },
  // API routes
  { url: '/api/auth/login', pattern: '/api/auth/login' },
  { url: '/api/auth/signup', pattern: '/api/auth/signup' },
  { url: '/api/auth/logout', pattern: '/api/auth/logout' }
];

const badTestCases = [
  // Wrong URLs
  { url: '/wrong', pattern: '/' },
  { url: '/about-us', pattern: '/about' },
  { url: '/contact-us', pattern: '/contact' },
  { url: '/verify-email-now', pattern: '/verify-email' },
  { url: '/email-confirmation', pattern: '/email-verified' },
  { url: '/4563-3423-333/12-3434-34343/dashboard', pattern: '/[id]/dashboard/[id]' },
  {
    url: '/dashboard/94567d32-152f-4271-8531-7dc8e7014fa0/94567d32-152f-4271-8531-7dc8e7014fa0',
    pattern: '/[id]/[id]/dashboard/[id]'
  },
  { url: '/new-dashboard/123/94567d32-152f-4271-8531-7dc8e7014fa0', pattern: '/[id]/[id]/new-dashboard' },
  { url: '/dashboard-create/123/456', pattern: '/[id]/[id]/dashboard-create' },
  { url: '/create-dashboard/94567d32-152f-4271-8531-7dc8e7014fa0/456', pattern: '/[id]/[id]/dashboard-create/create' },
  {
    url: '/goals/789/dashboard-create/123/94567d32-152f-4271-8531-7dc8e7014fa0',
    pattern: '/[id]/[id]/dashboard-create/[id]/goals'
  },
  {
    url: '/dashboard-create/94567d32-152f-4271-8531-7dc8e7014fa0/customer',
    pattern: '/[id]/[id]/dashboard-create/[id]/customer-funnel'
  },
  {
    url: '/dashboard-create/94567d32-152f-4271-8531-7dc8e7014fa0/create-stages/94567d32-152f-4271-8531-7dc8e7014fa0/456',
    pattern: '/[id]/[id]/dashboard-create/[id]/create-stages'
  },
  {
    url: '/events/abc/dashboard-create/123/94567d32-152f-4271-8531-7dc8e7014fa0',
    pattern: '/[id]/[id]/dashboard-create/[id]/create-events/[id]'
  },
  {
    url: '/organization-settings/456/94567d32-152f-4271-8531-7dc8e7014fa0/dashboard',
    pattern: '/[id]/[id]/dashboard/organization-settings'
  },
  { url: '/setup/website', pattern: '/website/setup' },
  { url: '/website-name/setup', pattern: '/website/setup/name' },
  { url: '/setup/website/123/domain', pattern: '/website/setup/[id]/domain' },
  { url: '/website-config/123/setup', pattern: '/website/setup/[id]/config' },
  { url: '/all-set/94567d32-152f-4271-8531-7dc8e7014fa0/website/setup', pattern: '/website/setup/[id]/all-set' },
  { url: '/website/setup', pattern: '/[id]/website/setup' },
  { url: '/94567d32-152f-4271-8531-7dc8e7014fa0/website/setup', pattern: '/[id]/website/setup/name' },
  { url: '/website/setup/94567d32-152f-4271-8531-7dc8e7014fa0', pattern: '/[id]/website/setup/[id]' },
  { url: '/website/setup/123/domain', pattern: '/[id]/website/setup/[id]/domain' },
  {
    url: '/94567d32-152f-4271-8531-7dc8e7014fa0/website/setup/94567d32-152f-4271-8531-7dc8e7014fa0',
    pattern: '/[id]/website/setup/[id]/config'
  },
  { url: '/website/setup/94567d32-152f-4271-8531-7dc8e7014fa0/all-set', pattern: '/[id]/website/setup/[id]/all-set' },
  { url: '/setup/account/1', pattern: '/account/setup/1' },
  { url: '/account-setup/2', pattern: '/account/setup/2' },
  { url: '/setup/3/account', pattern: '/account/setup/3' },
  { url: '/auth/login/api', pattern: '/api/auth/login' },
  { url: '/signup/auth/api', pattern: '/api/auth/signup' },
  { url: '/logout/api/auth', pattern: '/api/auth/logout' }
];

describe('Testing removeLanguagePrefix function', () => {
  test('Should remove language prefix from URL', () => {
    const url = '/en/home';
    const expected = '/home';
    expect(removeLanguagePrefix(url)).toBe(expected);
  });
});

describe('Testing matchUrlWithPattern function', () => {
  test('Should match URL with pattern', () => {
    const url = '/home';
    const pattern = '/home';
    expect(matchUrlWithPattern(url, pattern)).toBe(true);
  });
});

describe('Testing extractUUIDsFromUrl function', () => {
  test('Should extract UUIDs from URL', () => {
    const url = '/example/94567d32-152f-4271-8531-7dc8e7014fa0';
    const expected = ['94567d32-152f-4271-8531-7dc8e7014fa0'];
    expect(extractUUIDsFromUrl(url)).toEqual(expected);
  });
});

describe('Testing doesUserHavePermissions function', () => {
  test('Should return true if user has permissions', () => {
    const userInfo: GetMeQuery = {
      me: {
        id: 'e9935706-a4bb-4eb7-b93b-26d39b512c54',
        email: 'joao.carneiro@twistag.com',
        createdAt: '2024-03-25T10:50:52.959Z',
        updatedAt: '2024-04-04T10:03:51.007Z',
        permissions: [{ organizationId: '94567d32-152f-4271-8531-7dc8e7014fa0', accessLevel: 'Read' }]
      }
    };

    const url = '94567d32-152f-4271-8531-7dc8e7014fa0/new-dashboard';
    const allowedPermissions: Roles[] = [Roles.READ];
    expect(doesUserHavePermissions(userInfo, url, allowedPermissions)).toBe(true);
  });
});

describe('Testing matchUrlOnRoutes function', () => {
  test('Should match URL on routes', () => {
    const routesList: Routes = {
      home: { path: '/home', pattern: '/home', allowedRoles: [Roles.ADMIN] }
    };
    const url = '/home';
    const expected = { foundMatch: true, allowedPermissions: ['Admin'], hasPublicAccess: false };
    expect(matchUrlOnRoutes(routesList, url)).toEqual(expected);
  });
});

describe('Testing if hasPublicAccess', () => {
  test('Should match URL on routes', () => {
    const routesList: Routes = {
      home: { path: '/home', pattern: '/home', allowedRoles: [Roles.ADMIN], publicAccess: true }
    };
    const url = '/home';
    const expected = { foundMatch: true, allowedPermissions: ['Admin'], hasPublicAccess: true };
    expect(matchUrlOnRoutes(routesList, url)).toEqual(expected);
  });
});

describe('Testing correct matching patterns and urls', () => {
  testCases.forEach(({ url, pattern }) => {
    test(`URL: ${url} matches pattern: ${pattern}`, () => {
      const result = matchUrlWithPattern(url, pattern);
      expect(result).toBe(true);
    });
  });
});

describe('Testing wrong matching patterns or urls', () => {
  badTestCases.forEach(({ url, pattern }) => {
    test(`URL: ${url} matches pattern: ${pattern}`, () => {
      const result = matchUrlWithPattern(url, pattern);
      expect(result).toBe(false);
    });
  });
});

describe('Testing doesUserHavePermissions function', () => {
  const userInfo: GetMeQuery = {
    me: {
      id: 'e9935706-a4bb-4eb7-b93b-26d39b512c54',
      email: 'joao.carneiro@twistag.com',
      createdAt: '2024-03-25T10:50:52.959Z',
      updatedAt: '2024-04-04T10:03:51.007Z',
      permissions: [{ organizationId: '94567d32-152f-4271-8531-7dc8e7014fa0', accessLevel: 'Read' }]
    }
  };

  // Test for ADMIN role
  test('Should return true if user has READ role and allowed permissions include READ', () => {
    const allowedPermissions: Roles[] = [Roles.READ];
    expect(doesUserHavePermissions(userInfo, '94567d32-152f-4271-8531-7dc8e7014fa0/new-dashboard', allowedPermissions)).toBe(true);
  });

  // Test for WRITE role
  test('Should return false if user has WRITE role and allowed permissions include READ', () => {
    const allowedPermissions: Roles[] = [Roles.READ];
    userInfo.me.permissions![0].accessLevel = 'Write';
    expect(doesUserHavePermissions(userInfo, '94567d32-152f-4271-8531-7dc8e7014fa0/new-dashboard', allowedPermissions)).toBe(false);
  });

  // Test for READ role
  test('Should return true if user has ADMIN role and allowed permissions include ADMIN', () => {
    const allowedPermissions: Roles[] = [Roles.ADMIN];
    userInfo.me.permissions![0].accessLevel = 'Admin';
    expect(doesUserHavePermissions(userInfo, '94567d32-152f-4271-8531-7dc8e7014fa0/new-dashboard', allowedPermissions)).toBe(true);
  });

  // Test for READ role
  test('Should return false if user has READ role and allowed permissions include ADMIN', () => {
    const allowedPermissions: Roles[] = [Roles.ADMIN];
    userInfo.me.permissions![0].accessLevel = 'Read';
    expect(doesUserHavePermissions(userInfo, '94567d32-152f-4271-8531-7dc8e7014fa0/create-dashboard', allowedPermissions)).toBe(false);
  });
});
