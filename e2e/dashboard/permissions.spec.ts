/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable i18next/no-literal-string */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, type Page, expect } from '@playwright/test';

import { newDisposableEmail } from '../common/newDisposableEmail';
import { User } from '../common/userLogin.class';

let user: User;
const orgId = '0481b6d5-86c2-4c6f-a32d-fc1f84a38dfb';
const websiteId = 'e8f5a240-44bf-44d6-bf7a-46bd47be6330';
const funnelId = '5b711a54-7c1d-4de6-8d27-37a14bb3b312';
const organizationSettingsUrl = `/${orgId}/${websiteId}/organization-settings/organization-details` as string;
const createDashboardUrl = `/${orgId}/${websiteId}/new-dashboard` as string;
const createDashboardNameUrl = `/${orgId}/${websiteId}/dashboard-create/create?flow=executive` as string;
const customerFunnelUrl =
  `/${orgId}/${websiteId}/dashboard-create/001f17d8-95f2-4a16-93dd-b8fd978ee808/customer-funnel?flow=executive` as string;
const funnelsStagesUrl = `/${orgId}/${websiteId}/dashboard-create/${funnelId}/create-stages?flow=executive` as string;
const leadsEventUrl =
  `/${orgId}/${websiteId}/dashboard-create/${funnelId}/create-events/812a9c86-c051-4f32-b7aa-c6db9a007119?flow=executive` as string;
const marketingEventUrl =
  `/${orgId}/${websiteId}/dashboard-create/${funnelId}/create-events/a324c5dd-1e6b-4adf-b9c6-98580926797d?flow=executive` as string;
const salesEventUrl =
  `/${orgId}/${websiteId}/dashboard-create/${funnelId}/create-events/78a8de81-1801-4139-8750-aaf77a43961f?flow=executive` as string;
const customerEventUrl =
  `/${orgId}/${websiteId}/dashboard-create/${funnelId}/create-events/692f9502-e3ff-4ecd-a77a-7a8abc7195fc?flow=executive` as string;
const addGoalsUrl = `/${orgId}/${websiteId}/dashboard-create/${funnelId}/goals?flow=executive` as string;
const websiteSetup = `/${orgId}/website/setup` as string;
const websiteSetup1 = `/${orgId}/website/setup/name` as string;
const websiteSetup2 = `/${orgId}/website/setup/${websiteId}/` as string;
const websiteSetup3 = `/${orgId}/website/setup/${websiteId}/domain` as string;
const websiteSetup4 = `/${orgId}/website/setup/${websiteId}/config` as string;
const websiteSetup5 = `/${orgId}/website/setup/${websiteId}/all-set` as string;
const websiteSnippet =
  `/share?websiteId=${websiteId}&snippetUrl=https://source-pixel-scripts.s3.amazonaws.com/bb1e0806-e8fc-4736-a076-f34ab4dcef35/snippet.html` as string;

test.describe('User Invites on dashboard', () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    // Setting up before all as Admin of an organization
    user = new User(page);

    await user.goToDefaultPage();
    await page.waitForURL('**/login**');

    await user.login({ email: 'bernardo+1@twistag.com', password: 'Password_' });
    await user.checkRedirect(page, 'dashboard');

    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });
  });

  test('User As Admin can see permission page', async ({ page }) => {
    await user.goToDefaultPage();

    await page.getByTestId('organization-dropdown').click();
    await page.getByRole('link', { name: 'Organization Settings' }).click();

    await expect(page.getByText('QA Enterprise').first()).toBeVisible();
    await page.getByRole('tab', { name: 'Team Members' }).click();
    await expect(page.getByRole('button', { name: 'Invite team members' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'QA QA (owner) (you)' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'bernardo+1@twistag.com' })).toBeVisible();
    await expect(page.getByText('Active').first()).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Team member' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Email Address' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Account Permissions' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Status' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Team Members' })).toBeVisible();
  });

  test('User As Admin can invite more users', async ({ page }) => {
    await user.goToDefaultPage();
    const email = await newDisposableEmail();

    await page.getByTestId('organization-dropdown').click();
    await page.getByRole('link', { name: 'Organization Settings' }).click();

    await expect(page.getByText('QA Enterprise').first()).toBeVisible();
    await page.getByRole('tab', { name: 'Team Members' }).click();

    await page.getByRole('button', { name: 'Invite team members' }).click();
    await page.getByPlaceholder('Enter email address...').fill(email);
    await page.getByRole('button', { name: 'Send Invite' }).click();
  });

  test('A new user with no account is invited to join a team', async ({ page, browser }) => {
    const userContext = await browser.newContext();

    await user.goToDefaultPage();
    const email = await newDisposableEmail();

    await page.getByTestId('organization-dropdown').click();
    await page.getByRole('link', { name: 'Organization Settings' }).click();

    await expect(page.getByText('QA Enterprise').first()).toBeVisible();
    await page.getByRole('tab', { name: 'Team Members' }).click();

    await page.getByRole('button', { name: 'Invite team members' }).click();
    await page.getByPlaceholder('Enter email address...').fill(email);
    await page.getByRole('button', { name: 'Send Invite' }).click();
    await expect(page.getByText('Invalid email address')).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'Invite team members' })).not.toBeVisible();

    const userPage = await userContext.newPage();

    await user.verifyTeamInvite({ email, page: userPage, new: true });
  });

  test('A user with account is invited to join a team', async ({ page }) => {
    await user.goToDefaultPage();
    const email = await newDisposableEmail();

    await page.getByTestId('organization-dropdown').click();
    await page.getByRole('link', { name: 'Organization Settings' }).click();

    await expect(page.getByText('QA Enterprise').first()).toBeVisible();

    await page.getByRole('tab', { name: 'Team Members' }).click();
    await page.getByRole('button', { name: 'Invite team members' }).click();
    await page.getByPlaceholder('Enter email address...').fill(email);
    await page.getByRole('button', { name: 'Send Invite' }).click();
    await expect(page.getByText('Invalid email address')).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'Invite team members' })).not.toBeVisible();

    await user.verifyTeamInvite({ email, page, new: false });
  });

  test.afterEach(async () => {
    await user.logout();
  });
});

test.describe('User Permissions on dashboard', () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    // Setting up before all as Admin of an organization
    user = new User(page);

    await user.goToDefaultPage();
    await page.waitForURL('**/login**');
  });
  // #### Create Dashboard
  test('A user with admin permission can create dashboard', async ({ page }) => {
    // bernardo+e2eadmin@twistag.com

    await user.login({ email: 'bernardo+e2eadmin@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');

    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });
    await page.goto(createDashboardUrl);
    await page.getByText('Take the pain out of').click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Done' }).click();
    await page.getByRole('link', { name: '4 Widgets Hot ballon' }).click();
    await expect(page.getByRole('heading', { name: 'Give your dashboard a unique' })).toBeVisible();
    await page.getByPlaceholder('Executive').click();
    await page.getByPlaceholder('Executive').fill('New dashboard');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByRole('heading', { name: 'Add a couple goals' })).toBeVisible();
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByRole('heading', { name: 'Ready to define your customer' })).toBeVisible();
    await page.getByRole('button', { name: 'Skip for now' }).click();
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible();
  });

  test.fixme('A user with editor permission can not access dashboard', async ({ page }) => {
    // bernardo+e2eeditor@twistag.com
    await user.login({ email: 'bernardo+e2eeditor@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');

    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });
    await page.goto(createDashboardUrl);
    await expect(page.getByText('Take the pain out of marketing data.')).toBeVisible({ timeout: 10000 });

    await expect(page.locator('[id*=tab-add-dashboard] button')).not.toBeVisible();

    await page.goto(createDashboardUrl);
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });
  });

  test.fixme('A user with viewer permission can not create dashboard', async ({ page }) => {
    // bernardo+e2eviewer@twistag.com VIEWER
    await user.login({ email: 'bernardo+e2eviewer@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');

    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });
    await page.goto(createDashboardUrl);
    await expect(page.getByText('Take the pain out of marketing data.')).toBeVisible({ timeout: 10000 });

    await expect(page.locator('[id*=tab-add-dashboard] button')).not.toBeVisible();
  });

  test('A user with admin permission can access new create dashboard', async ({ page }) => {
    // bernardo+e2eadmin@twistag.com

    await user.login({ email: 'bernardo+e2eadmin@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');

    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });
    await page.goto(createDashboardNameUrl);
    await page.getByPlaceholder('Executive').fill('New dashboard');
    await expect(page.getByRole('button', { name: 'Continue' })).toBeEnabled();
  });

  test('A user with editor permission can not access new create dashboard', async ({ page }) => {
    // bernardo+e2eeditor@twistag.com
    await user.login({ email: 'bernardo+e2eeditor@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });
    await page.goto(createDashboardNameUrl);
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });
  });

  test.fixme('A user with viewer permission can not access new create dashboard', async ({ page }) => {
    // bernardo+e2eviewer@twistag.com VIEWER
    await user.login({ email: 'bernardo+e2eviewer@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');

    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });
    await page.goto(createDashboardNameUrl);
    await expect(page.getByText('Take the pain out of marketing data.')).toBeVisible({ timeout: 10000 });
  });

  // ## Organization Settings

  test('Admin can access organization settings', async ({ page }) => {
    // bernardo+e2eadmin@twistag.com
    await user.login({ email: 'bernardo+e2eadmin@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });

    await page.goto(organizationSettingsUrl);
    await page.getByRole('tab', { name: 'Team Members' }).click();
    await expect(page.getByRole('button', { name: 'Invite team members' })).toBeVisible();
  });

  test('Editor can access organization settings', async ({ page }) => {
    // bernardo+e2eeditor@twistag.com
    await user.login({ email: 'bernardo+e2eeditor@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });

    await page.goto(organizationSettingsUrl);
    await page.getByRole('tab', { name: 'Team Members' }).click();
    await expect(page.getByRole('button', { name: 'Invite team members' })).toBeVisible();
  });

  test('Viewer can access organization settings', async ({ page }) => {
    // bernardo+e2eviewer@twistag.com
    await user.login({ email: 'bernardo+e2eviewer@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });

    await page.goto(organizationSettingsUrl);
    await page.getByRole('tab', { name: 'Team Members' }).click();
    await expect(page.getByRole('button', { name: 'Invite team members' })).toBeVisible();
  });

  // #### Invite Members and roles members

  test('Admin can invite members', async ({ page }) => {
    // bernardo+e2eadmin@twistag.com
    await user.login({ email: 'bernardo+e2eadmin@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });

    await user.dashboard.openOrganizationSettings();
    await page.getByRole('tab', { name: 'Team Members' }).click();
    await expect(page.getByRole('button', { name: 'Invite team members' })).toBeVisible();
  });

  test('Admin can change members permissions', async ({ page }) => {
    // bernardo+e2eadmin@twistag.com
    await user.login({ email: 'bernardo+e2eadmin@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });

    await user.dashboard.openOrganizationSettings();
    await page.getByRole('tab', { name: 'Team Members' }).click();

    // Validate changing permissions

    await expect(page.getByRole('button', { name: 'View-only' }).first()).toBeVisible();
    await page.getByRole('button', { name: 'View-only' }).first().click();

    await expect(page.getByRole('option', { name: 'Editor As an editor, team' })).toBeVisible();
    await page.getByRole('option', { name: 'Admin As an administrator,' }).click();
    await page.getByRole('heading', { name: 'Change permissions' }).click();
    await expect(page.getByText('Do you confirm your decision')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Confirm' })).toBeVisible();
  });

  test('Editor can not invite members', async ({ page }) => {
    // bernardo+e2eeditor@twistag.com
    await user.login({ email: 'bernardo+e2eeditor@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');

    await user.dashboard.selectOrganization({ organizationName: 'Admin Permissions Company' });
    await expect(page.getByRole('tab', { name: 'Admin Dashboard' })).toBeVisible();

    await user.dashboard.openOrganizationSettings();
    await page.getByRole('tab', { name: 'Team Members' }).click();

    await expect(page.getByRole('button', { name: 'Invite team members' })).toBeDisabled();
  });

  test('Editor can not change members permissions', async ({ page }) => {
    // bernardo+e2eeditor@twistag.com
    await user.login({ email: 'bernardo+e2eeditor@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });

    await user.dashboard.selectOrganization({ organizationName: 'Admin Permissions Company' });
    await expect(page.getByRole('tab', { name: 'Admin Dashboard' })).toBeVisible();

    await user.dashboard.openOrganizationSettings();
    await page.getByRole('tab', { name: 'Team Members' }).click();

    await expect(page.getByRole('button', { name: 'View-only' }).nth(1)).toBeDisabled();
    await expect(page.getByRole('button', { name: 'Editor' }).nth(1)).toBeDisabled();
    await expect(page.getByRole('button', { name: 'Admin' }).nth(1)).toBeDisabled();
  });

  test('Viewer can not invite members', async ({ page }) => {
    // bernardo+e2eviewer@twistag.com VIEWER
    await user.login({ email: 'bernardo+e2eviewer@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });

    await user.dashboard.selectOrganization({ organizationName: 'Admin Permissions Company' });
    await expect(page.getByRole('tab', { name: 'Admin Dashboard' })).toBeVisible();

    await user.dashboard.openOrganizationSettings();
    await page.getByRole('tab', { name: 'Team Members' }).click();

    await expect(page.getByRole('button', { name: 'View-only' }).nth(1)).toBeDisabled();
    await expect(page.getByRole('button', { name: 'Editor' }).nth(1)).toBeDisabled();
    await expect(page.getByRole('button', { name: 'Admin' }).nth(1)).toBeDisabled();
  });

  test('Viewer can not change members permissions', async ({ page }) => {
    // bernardo+e2eviewer@twistag.com
    await user.login({ email: 'bernardo+e2eviewer@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });

    await user.dashboard.selectOrganization({ organizationName: 'Admin Permissions Company' });
    await expect(page.getByRole('tab', { name: 'Admin Dashboard' })).toBeVisible();

    await user.dashboard.openOrganizationSettings();
    await page.getByRole('tab', { name: 'Team Members' }).click();

    await expect(page.getByRole('button', { name: 'View-only' }).nth(1)).toBeDisabled();
    await expect(page.getByRole('button', { name: 'Editor' }).nth(1)).toBeDisabled();
    await expect(page.getByRole('button', { name: 'Admin' }).nth(1)).toBeDisabled();
  });
  // #### Create Funnels

  test('Admin can visit funnels page', async ({ page }) => {
    // bernardo+e2eadmin@twistag.com
    await user.login({ email: 'bernardo+e2eadmin@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');
    await expect(page.getByRole('heading', { name: `YOU'RE ALMOST THERE` })).toBeVisible({ timeout: 10000 });

    await user.dashboard.selectOrganization({ organizationName: 'Admin Permissions Company' });
    await expect(page.getByRole('tab', { name: 'Admin Dashboard' })).toBeVisible();

    await page.goto(funnelsStagesUrl);
    await expect(page.getByRole('heading', { name: 'Confirm your customer funnel' })).toBeVisible();

    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByRole('heading', { name: 'How do you define Leads?' })).toBeVisible();
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('heading', { name: 'How do you define Marketing' })).toBeVisible();
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('heading', { name: 'How do you define Sales' })).toBeVisible();
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('heading', { name: 'How do you define Customers?' })).toBeVisible();
    await page.getByRole('button', { name: 'Continue' }).click();

    await page.locator('button:nth-child(3)').first().click();
    await expect(page.getByRole('heading', { name: 'Exit Dashboard setup' })).toBeVisible();

    await page.getByRole('button', { name: 'Ok' }).click();
  });

  test('Admin can leave to dashboard from funnels page', async ({ page }) => {
    // bernardo+e2eadmin@twistag.com
    await user.login({ email: 'bernardo+e2eadmin@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');
    await expect(page.getByRole('heading', { name: `YOU'RE ALMOST THERE` })).toBeVisible({ timeout: 10000 });

    await user.dashboard.selectOrganization({ organizationName: 'Admin Permissions Company' });
    await expect(page.getByRole('tab', { name: 'Admin Dashboard' })).toBeVisible();

    await page.goto(funnelsStagesUrl);
    await expect(page.getByRole('heading', { name: 'Confirm your customer funnel' })).toBeVisible();

    await page.getByRole('button').nth(1).click();
    await expect(page.getByRole('heading', { name: 'Exit Dashboard setup' })).toBeVisible();

    await page.getByRole('button', { name: 'Ok' }).click();
    await expect(page.getByRole('heading', { name: `YOU'RE ALMOST THERE` })).toBeVisible({ timeout: 10000 });
  });

  test.fixme('Editor can not visit funnels page', async ({ page }) => {
    // bernardo+e2eeditor@twistag.com
    await user.login({ email: 'bernardo+e2eeditor@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });

    await user.dashboard.selectOrganization({ organizationName: 'Admin Permissions Company' });
    await expect(page.getByRole('tab', { name: 'Admin Dashboard' })).toBeVisible();

    await page.goto(funnelsStagesUrl);
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });
  });

  test.fixme('Viewer can not visit funnels page', async ({ page }) => {
    // bernardo+e2eviewer@twistag.com
    await user.login({ email: 'bernardo+e2eviewer@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });

    await user.dashboard.selectOrganization({ organizationName: 'Admin Permissions Company' });
    await expect(page.getByRole('tab', { name: 'Admin Dashboard' })).toBeVisible();

    await page.goto(funnelsStagesUrl);
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });

    await page.goto(leadsEventUrl);
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });

    await page.goto(marketingEventUrl);
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });

    await page.goto(salesEventUrl);
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });

    await page.goto(customerEventUrl);
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });
  });

  // #### Create Event Conditions
  test('Admin can leave to dashboard from events conditions page', async ({ page }) => {
    // bernardo+e2eadmin@twistag.com
    await user.login({ email: 'bernardo+e2eadmin@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');
    await expect(page.getByRole('heading', { name: `YOU'RE ALMOST THERE` })).toBeVisible({ timeout: 10000 });

    await user.dashboard.selectOrganization({ organizationName: 'Admin Permissions Company' });
    await expect(page.getByRole('tab', { name: 'Admin Dashboard' })).toBeVisible();

    await page.goto(funnelsStagesUrl);
    await expect(page.getByRole('heading', { name: 'Confirm your customer funnel' })).toBeVisible();
    await page.getByRole('button').nth(1).click();
    await expect(page.getByRole('heading', { name: 'Exit Dashboard setup' })).toBeVisible();
    await page.getByRole('button', { name: 'Ok' }).click();
    await expect(page.getByRole('heading', { name: `YOU'RE ALMOST THERE` })).toBeVisible({ timeout: 10000 });

    await page.goto(leadsEventUrl);
    await page.getByRole('button').nth(1).click();
    await expect(page.getByRole('heading', { name: 'Exit Dashboard setup' })).toBeVisible();
    await page.getByRole('button', { name: 'Ok' }).click();
    await expect(page.getByRole('heading', { name: `YOU'RE ALMOST THERE` })).toBeVisible({ timeout: 10000 });

    await page.goto(marketingEventUrl);
    await page.getByRole('button').nth(1).click();
    await expect(page.getByRole('heading', { name: 'Exit Dashboard setup' })).toBeVisible();
    await page.getByRole('button', { name: 'Ok' }).click();
    await expect(page.getByRole('heading', { name: `YOU'RE ALMOST THERE` })).toBeVisible({ timeout: 10000 });

    await page.goto(salesEventUrl);
    await page.getByRole('button').nth(1).click();
    await expect(page.getByRole('heading', { name: 'Exit Dashboard setup' })).toBeVisible();
    await page.getByRole('button', { name: 'Ok' }).click();
    await expect(page.getByRole('heading', { name: `YOU'RE ALMOST THERE` })).toBeVisible({ timeout: 10000 });

    await page.goto(customerEventUrl);

    await page.getByRole('button').nth(1).click();
    await expect(page.getByRole('heading', { name: 'Exit Dashboard setup' })).toBeVisible();
    await page.getByRole('button', { name: 'Ok' }).click();
    await expect(page.getByRole('heading', { name: `YOU'RE ALMOST THERE` })).toBeVisible({ timeout: 10000 });
  });
  test.fixme('Editor can not visit event conditions pages', async ({ page }) => {
    // bernardo+e2eeditor@twistag.com
    await user.login({ email: 'bernardo+e2eeditor@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });

    await user.dashboard.selectOrganization({ organizationName: 'Admin Permissions Company' });
    await expect(page.getByRole('tab', { name: 'Admin Dashboard' })).toBeVisible();

    await page.goto(leadsEventUrl);
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });

    await page.goto(marketingEventUrl);
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });

    await page.goto(salesEventUrl);
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });

    await page.goto(customerEventUrl);
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });
  });
  test.fixme('Viewer can not visit event conditions pages', async ({ page }) => {
    // bernardo+e2eviewer@twistag.com
    await user.login({ email: 'bernardo+e2eviewer@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });

    await user.dashboard.selectOrganization({ organizationName: 'Admin Permissions Company' });
    await expect(page.getByRole('tab', { name: 'Admin Dashboard' })).toBeVisible();

    await page.goto(leadsEventUrl);
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });

    await page.goto(marketingEventUrl);
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });

    await page.goto(salesEventUrl);
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });

    await page.goto(customerEventUrl);
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });
  });

  test('Admin can  visit customer Funnel landing page', async ({ page }) => {
    // bernardo+e2eadmin@twistag.com
    await user.login({ email: 'bernardo+e2eadmin@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');
    await expect(page.getByRole('heading', { name: `YOU'RE ALMOST THERE` })).toBeVisible({ timeout: 10000 });

    await user.dashboard.selectOrganization({ organizationName: 'Admin Permissions Company' });
    await expect(page.getByRole('tab', { name: 'Admin Dashboard' })).toBeVisible();

    await page.goto(customerFunnelUrl);
    await expect(page.getByRole('heading', { name: 'Ready to define your customer funnel?' })).toBeVisible();

    await page.getByRole('button').nth(1).click();
    await expect(page.getByRole('heading', { name: 'Exit Dashboard setup' })).toBeVisible();
    await page.getByRole('button', { name: 'Ok' }).click();
    await expect(page.getByRole('heading', { name: `YOU'RE ALMOST THERE` })).toBeVisible({ timeout: 10000 });
  });
  test.fixme('Editor can not visit customer Funnel landing page', async ({ page }) => {
    // bernardo+e2eeditor@twistag.com
    await user.login({ email: 'bernardo+e2eeditor@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });

    await user.dashboard.selectOrganization({ organizationName: 'Admin Permissions Company' });
    await expect(page.getByRole('tab', { name: 'Admin Dashboard' })).toBeVisible();

    await page.goto(customerFunnelUrl);
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });
  });
  test.fixme('Viewer can not visit customer Funnel landing page', async ({ page }) => {
    // bernardo+e2eviewer@twistag.com
    await user.login({ email: 'bernardo+e2eviewer@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });

    await user.dashboard.selectOrganization({ organizationName: 'Admin Permissions Company' });
    await expect(page.getByRole('tab', { name: 'Admin Dashboard' })).toBeVisible();

    await page.goto(customerFunnelUrl);
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });
  });

  // #### Create Goals

  test('Admin can visit activity goals page', async ({ page }) => {
    // bernardo+e2eadmin@twistag.com
    await user.login({ email: 'bernardo+e2eadmin@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');
    await expect(page.getByRole('heading', { name: `YOU'RE ALMOST THERE` })).toBeVisible({ timeout: 10000 });

    await user.dashboard.selectOrganization({ organizationName: 'Admin Permissions Company' });
    await expect(page.getByRole('tab', { name: 'Admin Dashboard' })).toBeVisible();

    await page.goto(addGoalsUrl);
    await expect(page.getByRole('heading', { name: 'Add a couple goals' })).toBeVisible();
    await expect(page.getByText('Budget Tracker')).toBeVisible();

    await page.getByRole('button').nth(1).click();
    await expect(page.getByRole('heading', { name: 'Exit Dashboard setup' })).toBeVisible();
    await page.getByRole('button', { name: 'Ok' }).click();
    await expect(page.getByRole('heading', { name: `YOU'RE ALMOST THERE` })).toBeVisible({ timeout: 10000 });
  });
  test('Admin can add new goals page', async ({ page }) => {
    // bernardo+e2eadmin@twistag.com
    await user.login({ email: 'bernardo+e2eadmin@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');
    await expect(page.getByRole('heading', { name: `YOU'RE ALMOST THERE` })).toBeVisible({ timeout: 10000 });

    await user.dashboard.selectOrganization({ organizationName: 'Admin Permissions Company' });
    await expect(page.getByRole('tab', { name: 'Admin Dashboard' })).toBeVisible();

    await page.goto(addGoalsUrl);
    await expect(page.getByRole('heading', { name: 'Add a couple goals' })).toBeVisible();

    await page.getByRole('button', { name: 'Add' }).nth(1).click();
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible();
    await page.getByRole('button', { name: 'Remove' }).click();
    await expect(page.getByRole('button', { name: 'Add' }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add' }).nth(1)).toBeVisible();

    await page.getByRole('button').nth(1).click();
    await expect(page.getByRole('heading', { name: 'Exit Dashboard setup' })).toBeVisible();
    await page.getByRole('button', { name: 'Ok' }).click();
    await expect(page.getByRole('heading', { name: `YOU'RE ALMOST THERE` })).toBeVisible({ timeout: 10000 });
  });
  test('Editor can visit activity goals page', async ({ page }) => {
    // bernardo+e2eeditor@twistag.com
    await user.login({ email: 'bernardo+e2eeditor@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });

    await user.dashboard.selectOrganization({ organizationName: 'Admin Permissions Company' });
    await expect(page.getByRole('tab', { name: 'Admin Dashboard' })).toBeVisible();

    await page.goto(addGoalsUrl);
    await expect(page.getByRole('heading', { name: 'Add a couple goals' })).toBeVisible({ timeout: 10000 });
  });
  test('Editor can add new goals page', async ({ page }) => {
    // bernardo+e2eeditor@twistag.com
    await user.login({ email: 'bernardo+e2eeditor@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');
    await expect(page.getByRole('heading', { name: `YOU'RE ALMOST THERE` })).toBeVisible({ timeout: 10000 });

    await user.dashboard.selectOrganization({ organizationName: 'Admin Permissions Company' });
    await expect(page.getByRole('tab', { name: 'Admin Dashboard' })).toBeVisible();

    await page.goto(addGoalsUrl);
    await expect(page.getByRole('heading', { name: 'Add a couple goals' })).toBeVisible();

    await page.getByRole('button', { name: 'Add' }).nth(1).click();
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible();
    await page.getByRole('button', { name: 'Remove' }).click();
    await expect(page.getByRole('button', { name: 'Add' }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add' }).nth(1)).toBeVisible();

    await page.getByRole('button').nth(1).click();
    await expect(page.getByRole('heading', { name: 'Exit Dashboard setup' })).toBeVisible();
    await page.getByRole('button', { name: 'Ok' }).click();
    await expect(page.getByRole('heading', { name: `YOU'RE ALMOST THERE` })).toBeVisible({ timeout: 10000 });
  });
  test.fixme('Viewer can not visit activity goals page', async ({ page }) => {
    // bernardo+e2eviewer@twistag.com
    await user.login({ email: 'bernardo+e2eviewer@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });

    await user.dashboard.selectOrganization({ organizationName: 'Admin Permissions Company' });
    await expect(page.getByRole('tab', { name: 'Admin Dashboard' })).toBeVisible();

    await page.goto(addGoalsUrl);
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });
  });

  // #### Website Setup

  test('Admin can visit Website setup', async ({ page }) => {
    // bernardo+e2eadmin@twistag.com
    await user.login({ email: 'bernardo+e2eadmin@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');
    await expect(page.getByRole('heading', { name: `YOU'RE ALMOST THERE` })).toBeVisible({ timeout: 10000 });

    await user.dashboard.selectOrganization({ organizationName: 'Admin Permissions Company' });
    await expect(page.getByRole('tab', { name: 'Admin Dashboard' })).toBeVisible();

    await page.getByTestId('organization-dropdown').click();
    await page.getByRole('link', { name: 'Organization Settings' }).click();
    await expect(page.getByRole('heading', { name: 'Organization' })).toBeVisible();
    await expect(page.getByText('Name')).toBeVisible();
    await expect(page.getByText('Thumbnail Image')).toBeVisible();
    await expect(page.locator('p').filter({ hasText: 'Team Members' })).toBeVisible();
    await expect(
      page
        .locator('div')
        .filter({ hasText: /^NameAdmin Permissions Company$/ })
        .getByRole('button')
    ).toBeVisible();
    await expect(
      page
        .locator('div')
        .filter({ hasText: /^Thumbnail Image$/ })
        .getByRole('button')
    ).toBeVisible();
  });

  test('Editor can not visit Website setup', async ({ page }) => {
    // bernardo+e2eeditor@twistag.com
    await user.login({ email: 'bernardo+e2eeditor@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });

    await user.dashboard.selectOrganization({ organizationName: 'Admin Permissions Company' });
    await expect(page.getByRole('tab', { name: 'Admin Dashboard' })).toBeVisible();

    await page.getByTestId('organization-dropdown').click();
    await page.getByRole('link', { name: 'Organization Settings' }).click();
    await expect(page.getByRole('heading', { name: 'Organization' })).toBeVisible();
    await expect(page.getByText('Name')).toBeVisible();
    await expect(page.getByText('Thumbnail Image')).toBeVisible();
    await expect(page.locator('p').filter({ hasText: 'Team Members' })).toBeVisible();
    await expect(
      page
        .locator('div')
        .filter({ hasText: /^NameAdmin Permissions Company$/ })
        .getByRole('button')
    ).not.toBeVisible();
    await expect(
      page
        .locator('div')
        .filter({ hasText: /^Thumbnail Image$/ })
        .getByRole('button')
    ).not.toBeVisible();
  });
  test.fixme('Viewer can not visit Website setup', async ({ page }) => {
    // bernardo+e2eviewer@twistag.com
    await user.login({ email: 'bernardo+e2eviewer@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });

    await user.dashboard.selectOrganization({ organizationName: 'Admin Permissions Company' });
    await expect(page.getByRole('tab', { name: 'Admin Dashboard' })).toBeVisible();

    await page.getByTestId('organization-dropdown').click();
    await page.getByRole('link', { name: 'Organization Settings' }).click();
    await expect(page.getByRole('heading', { name: 'Organization' })).toBeVisible();
    await expect(page.getByText('Name')).toBeVisible();
    await expect(page.getByText('Thumbnail Image')).toBeVisible();
    await expect(page.locator('p').filter({ hasText: 'Team Members' })).toBeVisible();
    await expect(
      page
        .locator('div')
        .filter({ hasText: /^NameAdmin Permissions Company$/ })
        .getByRole('button')
    ).not.toBeVisible();
    await expect(
      page
        .locator('div')
        .filter({ hasText: /^Thumbnail Image$/ })
        .getByRole('button')
    ).not.toBeVisible();
  });

  // #### Share website setup snippet

  test('Admin can visit share website setup snippet', async ({ page }) => {
    // bernardo+e2eadmin@twistag.com
    await user.login({ email: 'bernardo+e2eadmin@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');
    await expect(page.getByRole('heading', { name: `YOU'RE ALMOST THERE` })).toBeVisible({ timeout: 10000 });

    await user.dashboard.selectOrganization({ organizationName: 'Admin Permissions Company' });
    await expect(page.getByRole('tab', { name: 'Admin Dashboard' })).toBeVisible();

    await page.goto(websiteSnippet);
    await expect(page.getByRole('heading', { name: 'Connect your website' })).toBeVisible();
  });

  test('Editor can visit share website setup snippet', async ({ page }) => {
    // bernardo+e2eeditor@twistag.com
    await user.login({ email: 'bernardo+e2eeditor@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });

    await user.dashboard.selectOrganization({ organizationName: 'Admin Permissions Company' });
    await expect(page.getByRole('tab', { name: 'Admin Dashboard' })).toBeVisible();

    await page.goto(websiteSnippet);
    await expect(page.getByRole('heading', { name: 'Connect your website' })).toBeVisible();
  });
  test.fixme('Viewer can visit share website setup snippet', async ({ page }) => {
    // bernardo+e2eviewer@twistag.com
    await user.login({ email: 'bernardo+e2eviewer@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });

    await user.dashboard.selectOrganization({ organizationName: 'Admin Permissions Company' });
    await expect(page.getByRole('tab', { name: 'Admin Dashboard' })).toBeVisible();

    await page.goto(websiteSnippet);
    await expect(page.getByRole('heading', { name: 'Connect your website' })).toBeVisible();
  });

  test('User with no account can visit share website setup snippet', async ({ page }) => {
    // bernardo+e2eviewer@twistag.com
    await expect(page.getByRole('heading', { name: 'Hello, log in to your account' })).toBeVisible({ timeout: 10000 });
    await page.goto(websiteSnippet);
    await expect(page.getByRole('heading', { name: 'Connect your website' })).toBeVisible();
  });

  // #### Connections List

  test('Admin can visit connections List', async ({ page }) => {
    // bernardo+e2eadmin@twistag.com
    await user.login({ email: 'bernardo+e2eadmin@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');
    await expect(page.getByRole('heading', { name: `YOU'RE ALMOST THERE` })).toBeVisible({ timeout: 10000 });

    await user.dashboard.selectOrganization({ organizationName: 'Admin Permissions Company' });
    await expect(page.getByRole('tab', { name: 'Admin Dashboard' })).toBeVisible();

    await page.getByTestId('connections').click();
    await expect(page.getByRole('heading', { name: 'Connections' })).toBeVisible();
  });

  test('Editor can visit connections List', async ({ page }) => {
    // bernardo+e2eeditor@twistag.com
    await user.login({ email: 'bernardo+e2eeditor@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });

    await user.dashboard.selectOrganization({ organizationName: 'Admin Permissions Company' });
    await expect(page.getByRole('tab', { name: 'Admin Dashboard' })).toBeVisible();

    await page.getByTestId('connections').click();
    await expect(page.getByRole('heading', { name: 'Connections' })).toBeVisible();
  });
  test.fixme('Viewer can visit connections List', async ({ page }) => {
    // bernardo+e2eviewer@twistag.com
    await user.login({ email: 'bernardo+e2eviewer@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });

    await user.dashboard.selectOrganization({ organizationName: 'Admin Permissions Company' });
    await expect(page.getByRole('tab', { name: 'Admin Dashboard' })).toBeVisible();

    await page.getByTestId('connections').click();
    await expect(page.getByRole('heading', { name: 'Connections' })).toBeVisible();
  });

  // #### Connections Connect page

  test('Admin can visit connections connect page', async ({ page }) => {
    // bernardo+e2eadmin@twistag.com
    await user.login({ email: 'bernardo+e2eadmin@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');
    await expect(page.getByRole('heading', { name: `YOU'RE ALMOST THERE` })).toBeVisible({ timeout: 10000 });

    await user.dashboard.selectOrganization({ organizationName: 'Admin Permissions Company' });
    await expect(page.getByRole('tab', { name: 'Admin Dashboard' })).toBeVisible();

    await page.getByTestId('connections').click();
    await expect(page.getByRole('heading', { name: 'Connections' })).toBeVisible();
    await page.getByRole('row', { name: 'icon Website Tracking Event' }).locator('button').click();
    await expect(page.getByRole('heading', { name: 'Connect your website' })).toBeVisible();
    await expect(page.getByText('<!-- Start Source Pixel')).toBeVisible({ timeout: 55000 });
  });

  test('Editor can visit connections connect page', async ({ page }) => {
    // bernardo+e2eeditor@twistag.com
    await user.login({ email: 'bernardo+e2eeditor@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });

    await user.dashboard.selectOrganization({ organizationName: 'Admin Permissions Company' });
    await expect(page.getByRole('tab', { name: 'Admin Dashboard' })).toBeVisible();

    await page.getByTestId('connections').click();
    await expect(page.getByRole('heading', { name: 'Connections' })).toBeVisible();
    await page.getByRole('row', { name: 'icon Website Tracking Event' }).locator('button').click();

    await expect(page.getByRole('heading', { name: 'Connect your website' })).toBeVisible();
    await expect(page.getByText('<!-- Start Source Pixel')).toBeVisible({ timeout: 55000 });
  });
  test('Viewer can visit connections connect page', async ({ page }) => {
    // bernardo+e2eviewer@twistag.com
    await user.login({ email: 'bernardo+e2eviewer@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });

    await user.dashboard.selectOrganization({ organizationName: 'Admin Permissions Company' });
    await expect(page.getByRole('tab', { name: 'Admin Dashboard' })).toBeVisible();

    await page.getByTestId('connections').click();
    await expect(page.getByRole('heading', { name: 'Connections' })).toBeVisible();
    await page.getByRole('row', { name: 'icon Website Tracking Event' }).locator('button').click();

    await expect(page.getByRole('heading', { name: 'Connect your website' })).toBeVisible();
    await expect(page.getByText('<!-- Start Source Pixel')).toBeVisible({ timeout: 55000 });
  });

  // end describe
});

test.describe('User can change websites', () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    // Setting up before all as Admin of an organization
    user = new User(page);

    await user.goToDefaultPage();
    await page.waitForURL('**/login**');

    await user.login({ email: 'bernardo+1@twistag.com', password: 'Password_' });
    await user.checkRedirect(page, 'dashboard');

    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible();
  });

  test('User as can change websites', async ({ page }) => {
    await user.goToDefaultPage();
  });
});
