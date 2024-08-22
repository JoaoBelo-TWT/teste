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

import { User } from '../common/userLogin.class';

let user: User;

test.describe('Dashboard Redirects and empty states', () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    // Setting up before all as Admin of an organization
    user = new User(page);

    await user.goToDefaultPage();
    await page.waitForURL('**/login**');
  });
  // #### Create Dashboard
  test('User with no website connected is redirected correctly', async ({ page }) => {
    // bernardo+e2eadmin@twistag.com

    await user.login({ email: 'bernardo+e2eadmin@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');

    await user.dashboard.selectDashboard({ dashboardName: 'Funnels Done' });

    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });

    await page.getByRole('button', { name: 'Connect to your website' }).first().click();
    await expect(page.getByRole('heading', { name: 'Connections' })).toBeVisible();
  });

  test('User with no website connected is redirected to add activity goals', async ({ page }) => {
    // bernardo+e2eadmin@twistag.com

    await user.login({ email: 'bernardo+e2eadmin@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');

    await user.dashboard.selectDashboard({ dashboardName: 'Funnels Done' });

    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });

    await page.getByRole('button', { name: 'Add Budget Goal' }).first().click();
    await expect(page.getByRole('heading', { name: 'Add a budget' })).toBeVisible();
  });

  test('User with no website connected is redirected to add budget goals', async ({ page }) => {
    // bernardo+e2eadmin@twistag.com

    await user.login({ email: 'bernardo+e2eadmin@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');

    await user.dashboard.selectDashboard({ dashboardName: 'Funnels Done' });

    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });

    await page.getByRole('button', { name: 'Add Activity Goal' }).first().click();
    await expect(page.getByRole('heading', { name: 'Activity Goal' })).toBeVisible();
  });

  test('User with no customer funnels connected is redirected is redirected correctly', async ({ page }) => {
    // bernardo+e2eadmin@twistag.com

    await user.login({ email: 'bernardo+e2eadmin@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');

    await user.dashboard.selectDashboard({ dashboardName: 'New dashboard' });

    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });

    await page.getByRole('button', { name: 'Add customer funnels' }).first().click();
    await expect(page.getByRole('heading', { name: 'Ready to define your customer' })).toBeVisible();
    await page.getByRole('button').first().click();
    await page.getByRole('button', { name: '+ Add Budget Goal' }).click();
    await expect(page.getByRole('heading', { name: 'Add a budget' })).toBeVisible();
    await page.getByRole('button').first().click();
    await page.getByRole('button', { name: '+ Add customer funnels' }).click();
    await expect(page.getByRole('heading', { name: 'Activity Goal' })).toBeVisible();
    await page.getByRole('button').first().click();
    await page.getByRole('heading', { name: "YOU'RE ALMOST THERE" }).isVisible();
  });

  test('User with no website connected only sees empty states for customer channel setup', async ({ page }) => {
    // bernardo+e2eadmin@twistag.com

    await user.login({ email: 'bernardo+e2eadmin@twistag.com', password: 'Password_123' });
    await user.checkRedirect(page, 'dashboard');

    await user.dashboard.selectDashboard({ dashboardName: 'New dashboard' });

    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('+ Add budget Goal')).toBeVisible();
    await expect(page.getByText('+ Add customer funnels')).toBeVisible();

    await expect(page.getByRole('heading', { name: "You still don't have any customer funnels setup" })).toHaveCount(2);
    await expect(page.getByRole('heading', { name: 'No data available, yet. Wait' })).toHaveCount(2);
    await page.getByRole('heading', { name: "YOU'RE ALMOST THERE" }).isVisible();
  });
});
