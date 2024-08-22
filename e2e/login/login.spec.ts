/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable i18next/no-literal-string */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, expect, type Page } from '@playwright/test';

import { findUserByToken } from '../common/findUserByToken';
import { newDisposableEmail } from '../common/newDisposableEmail';
import { User } from '../common/userLogin.class';

let user: User;

test.describe('User Login scenarios', () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    user = new User(page);
    await user.goToDefaultPage();

    await page.waitForURL('**/login**');
  });

  test('login with valid credentials', async ({ page }: { page: Page }) => {
    await user.login({ email: 'bernardo+1@twistag.com', password: 'Password_' });
    await expect(page.locator('#error-message'), ' Wrong email or password').not.toBeVisible();

    await user.checkRedirect(page, 'dashboard');

    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });
  });

  test('login with invalid credentials (password)', async ({ page }: { page: Page }) => {
    await user.login({ email: 'bernardo+1@twistag.com', password: 'wrongpassword' });
    await expect(page.locator('#error-message'), ' Wrong email or password').toBeVisible();
  });

  test('login with invalid credentials (email)', async ({ page }: { page: Page }) => {
    await user.login({ email: 'bernardo+1@twistag.com', password: 'wrongpassword' });
    await expect(page.locator('#error-message'), ' Wrong email or password').toBeVisible();
  });

  // end describe
});

test.describe('User Sign up / Reset Password scenarios', () => {
  let email = '';
  let password = 'Password_123';
  test.beforeEach(async ({ page }: { page: Page }) => {
    user = new User(page);
    email = await newDisposableEmail();

    await user.goToDefaultPage();

    await page.waitForURL('**/login**');
  });

  test('sign up with valid credentials and verify email', async ({ page }) => {
    await user.signup({ email, password });

    await expect(page.getByRole('heading', { name: 'Check your inbox' })).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('We sent you a confirmation')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Resend email' })).toBeVisible();

    await user.verifyEmail({ email });
  });

  test('reset password flow', async ({ page }) => {
    await user.signup({ email, password });
    await user.verifyEmail({ email });
    await user.logout();
    await user.resetPassword({ email });
    password = 'Password_1234';
    await expect(page.getByRole('heading', { name: 'First, tell us a bit about yourself' })).toBeVisible();
  });

  test.afterEach(async () => {
    // eslint-disable-next-line no-restricted-syntax
    const token = await user.getToken({ email, password });
    const userData = await findUserByToken({ token });
    const { id } = userData.me;
    return user.delete({ id, token });
  });
  // end describe
});

test.describe('Dashboard Stage and Events Conditions Scenarios', () => {
  let email = '';
  test.beforeEach(async ({ page }: { page: Page }) => {
    user = new User(page);

    await user.goToDefaultPage();

    await page.waitForURL('**/login**');

    // email = randomEmailGenerator();
    email = await newDisposableEmail();

    await user.signup({ email, password: 'Password_123' });
    await user.verifyEmail({ email });

    await expect(page.getByRole('heading', { name: 'Hello, log in to your account' })).toBeVisible();

    await user.login({ email, password: 'Password_123' });

    // We need to signup as a new user until the funnel setup page
  });

  test('snippet url is loaded in realtime', async ({ page }: { page: Page }) => {
    test.slow();
    await user.onboarding.step1Personal();
    await user.onboarding.step2Company();
    await user.onboarding.step3Website();
    await user.onboarding.step4Connect();
    await user.onboarding.step4_2ConnectForms();

    await expect(page.getByText('<!-- Start Source Pixel')).toBeVisible({ timeout: 55000 });
  });

  test('snippet url is copied to clipboard correctly', async ({ page }: { page: Page }) => {
    test.slow();
    await user.onboarding.step1Personal();
    await user.onboarding.step2Company();
    await user.onboarding.step3Website();
    await user.onboarding.step4Connect();
    await user.onboarding.step4_2ConnectForms();

    await expect(page.getByText('<!-- Start Source Pixel')).toBeVisible({ timeout: 55000 });
    // TODO: add logic for snippet url is copied to clipboard correctly
  });

  test('user can change order of stages and they reflect while defining event conditions', async ({
    page
  }: {
    page: Page;
  }) => {
    await user.onboarding.step1Personal();
    await user.onboarding.step2Company();
    await user.onboarding.step3Website();
    await user.onboarding.step4Connect();
    await user.onboarding.step4_2ConnectForms();
    await user.onboarding.step4_3ConnectSnippet();
    await user.onboarding.step5Dashboard();

    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('heading', { name: 'Confirm your customer' })).toBeVisible();
    await page.locator('[class*=card-item_card-item__dnd-icon-container]').nth(0).hover();
    await page.mouse.down();
    await page.waitForTimeout(100);
    await page.mouse.move(1000, 500, { steps: 8 });
    await page.waitForTimeout(100);
    await page.mouse.up();
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByRole('heading')).toContainText('How do you define Marketing Qualified Leads?');
    await expect(page.locator('[class*=tabs_tabs__tab-label]').nth(0)).toContainText('Marketing Qualified Leads');
  });

  test('user can add new phase (stage) and they reflect while defining event conditions', async ({
    page
  }: {
    page: Page;
  }) => {
    await user.onboarding.step1Personal();
    await user.onboarding.step2Company();
    await user.onboarding.step3Website();
    await user.onboarding.step4Connect();
    await user.onboarding.step4_2ConnectForms();
    await user.onboarding.step4_3ConnectSnippet();
    await user.onboarding.step5Dashboard();

    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByRole('heading', { name: 'Confirm your customer funnel' })).toBeVisible();

    await page.getByRole('button', { name: 'Add a Phase' }).click();
    await page.getByPlaceholder('Leads').fill('This is a new stage');
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByRole('tab', { name: 'This is a new stage' })).toBeVisible();
  });

  test('user can add remove phase (stage) and they reflect while defining event conditions', async ({
    page
  }: {
    page: Page;
  }) => {
    await user.onboarding.step1Personal();
    await user.onboarding.step2Company();
    await user.onboarding.step3Website();
    await user.onboarding.step4Connect();
    await user.onboarding.step4_2ConnectForms();
    await user.onboarding.step4_3ConnectSnippet();
    await user.onboarding.step5Dashboard();

    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByRole('heading', { name: 'Confirm your customer funnel' })).toBeVisible();

    await page.getByRole('button', { name: 'Remove' }).first().click();
    await page.getByRole('button', { name: 'Remove' }).first().click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByRole('heading', { name: 'How do you define Sales' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Sales Qualified Leads' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Customers' })).toBeVisible();

    await expect(page.getByRole('tab', { name: 'Leads' }).textContent()).not.toEqual('Leads');
    await expect(page.getByRole('tab', { name: 'Sales Qualified Leads' }).textContent()).not.toEqual(
      'Marketing Qualified Leads'
    );
  });

  test('user can edit name of the phase (stage) and they reflect while defining event conditions', async ({
    page
  }: {
    page: Page;
  }) => {
    await user.onboarding.step1Personal();
    await user.onboarding.step2Company();
    await user.onboarding.step3Website();
    await user.onboarding.step4Connect();
    await user.onboarding.step4_2ConnectForms();
    await user.onboarding.step4_3ConnectSnippet();
    await user.onboarding.step5Dashboard();

    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByRole('heading', { name: 'Confirm your customer funnel' })).toBeVisible();

    await page.getByRole('button', { name: 'Edit' }).first().click();
    await page.getByPlaceholder('Leads').fill('This is my new stage');
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.getByRole('tab', { name: 'This is my new stage' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Leads', exact: true })).not.toBeVisible();
  });

  test.afterEach(async () => {
    // eslint-disable-next-line no-restricted-syntax
    const token = await user.getToken({ email, password: 'Password_123' });
    const userData = await findUserByToken({ token });
    const { id } = userData.me;
    return user.delete({ id, token });
  });
  // end describe
});

test.describe('User flows go back / logout during onboarding', () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    user = new User(page);

    await user.goToDefaultPage();

    await page.waitForURL('**/login**');
  });

  test('user logged in still on onboarding can go back step 1 before he gets a dashboard', async ({
    page
  }: {
    page: Page;
  }) => {
    await user.login({ email: 'bernardo+step1@twistag.com', password: 'Password_123' });
    await page.getByRole('button').first().click();
    await expect(page.getByRole('heading', { name: 'Hello, log in to your account' })).toBeVisible();
  });

  test('user logged in still on onboarding can go back step 2 before he gets a dashboard', async ({
    page
  }: {
    page: Page;
  }) => {
    await user.login({ email: 'bernardo+step2@twistag.com', password: 'Password_123' });
    await page.getByRole('button').first().click();
    await expect(page.getByRole('heading', { name: 'Hello, log in to your account' })).toBeVisible();
  });

  test('user logged in still on onboarding can go back step 4 before he gets a dashboard', async ({
    page
  }: {
    page: Page;
  }) => {
    await user.login({ email: 'bernardo+step4@twistag.com', password: 'Password_123' });
    await page.getByRole('button').first().click();
    await expect(page.getByRole('heading', { name: 'Hello, log in to your account' })).toBeVisible();
  });

  test('user logged in still on onboarding can go back step 5 before he gets a dashboard', async ({
    page
  }: {
    page: Page;
  }) => {
    await user.login({ email: 'bernardo+step5@twistag.com', password: 'Password_123' });
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Done' }).dblclick();
    await page.getByRole('button').first().click();
    await expect(page.getByRole('heading', { name: 'Hello, log in to your account' })).toBeVisible();
  });

  // ################
  test('user logged in still on onboarding can click on X step 1 before he gets a dashboard', async ({
    page
  }: {
    page: Page;
  }) => {
    await user.login({ email: 'bernardo+step1@twistag.com', password: 'Password_123' });
    await page.getByRole('button').first().click();
    await expect(page.getByRole('heading', { name: 'Hello, log in to your account' })).toBeVisible();
  });

  test('user logged in still on onboarding can click on X step 2 before he gets a dashboard', async ({
    page
  }: {
    page: Page;
  }) => {
    await user.login({ email: 'bernardo+step2@twistag.com', password: 'Password_123' });
    await page.getByRole('button').first().click();
    await expect(page.getByRole('heading', { name: 'Hello, log in to your account' })).toBeVisible();
  });

  test('user logged in still on onboarding can click on X step 5 before he gets a dashboard', async ({
    page
  }: {
    page: Page;
  }) => {
    await user.login({ email: 'bernardo+step5@twistag.com', password: 'Password_123' });
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Done' }).dblclick();
    await page.getByRole('link').click();
    await page.getByRole('button').nth(1).click();
    await page.getByRole('button', { name: 'Ok' }).click();
    await expect(page.getByRole('link', { name: '4 Widgets Hot ballon' })).toBeVisible();
  });

  test('user logged can logout from dashboard', async ({ page }: { page: Page }) => {
    await user.login({ email: 'bernardo+step6@twistag.com', password: 'Password_123' });

    await page.getByTestId('organization-dropdown').click();
    await page.getByRole('option', { name: 'Logout' }).locator('div').first().click();

    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(page.getByRole('heading', { name: 'Hello, log in to your account' })).toBeVisible();
  });

  // ################
  test('user logged in can delete dashboard during onboarding', async ({ page }: { page: Page }) => {
    const email = await newDisposableEmail();

    await user.signup({ email, password: 'Password_123' });
    await user.verifyEmail({ email });

    await expect(page.getByRole('heading', { name: 'First, tell us a bit about' })).toBeVisible();

    await user.onboarding.step1Personal();
    await user.onboarding.step2Company();
    await user.onboarding.step3Website();
    await user.onboarding.step4Connect();
    await user.onboarding.step5Dashboard();
    await page.getByRole('heading', { name: 'Ready to define your customer' });
    await page.getByRole('button').nth(1).click();
    await expect(page.getByRole('heading')).toContainText('Exit Dashboard setup');
    await page.getByLabel('Delete dashboard').check();
    await page.getByRole('button', { name: 'Ok' }).click();

    await expect(page.getByText("You'll be able to adjust")).toBeVisible();
  });
  test('user logged in can exit onboarding without deleting dashboard', async ({ page }: { page: Page }) => {
    const email = await newDisposableEmail();

    await user.signup({ email, password: 'Password_123' });
    await user.verifyEmail({ email });

    await expect(page.getByRole('heading', { name: 'First, tell us a bit about' })).toBeVisible();

    await user.onboarding.step1Personal();
    await user.onboarding.step2Company();
    await user.onboarding.step3Website();
    await user.onboarding.step4Connect();
    await user.onboarding.step5Dashboard();
    await expect(page.getByRole('heading', { name: 'Ready to define your customer' })).toBeVisible();
    await page.getByRole('button').nth(1).click();
    await expect(page.getByRole('heading')).toContainText('Exit Dashboard setup');
    await page.getByRole('button').first().click();
    await expect(page.getByRole('heading', { name: 'Ready to define your customer' })).toBeVisible();
    await page.getByRole('button').nth(1).click();
    await expect(page.getByRole('heading')).toContainText('Exit Dashboard setup');
    await page.getByRole('button', { name: 'Ok' }).click();
    await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible({ timeout: 10000 });
    // end describe
  });

  test('user logged without dashboard can exit onboarding back to dashboard creation', async ({
    page
  }: {
    page: Page;
  }) => {
    const email = await newDisposableEmail();

    await user.signup({ email, password: 'Password_123' });
    await user.verifyEmail({ email });

    await expect(page.getByRole('heading', { name: 'First, tell us a bit about' })).toBeVisible();

    await user.onboarding.step1Personal();
    await user.onboarding.step2Company();
    await user.onboarding.step3Website();
    await user.onboarding.step4Connect();

    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Done' }).click();
    await page.getByRole('link', { name: '4 Widgets Hot ballon' }).click();
    await page.getByRole('button').nth(1).click();
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page.getByRole('heading', { name: 'Give your dashboard a unique' })).toBeVisible();
    await page.getByRole('button').nth(1).click();
    await expect(page.getByRole('heading', { name: 'Exit Dashboard setup' })).toBeVisible();
    await page.getByRole('button').first().click();
    await expect(page.getByRole('heading', { name: 'Give your dashboard a unique' })).toBeVisible();
    await page.getByRole('button').nth(1).click();
    await page.getByRole('button', { name: 'Ok' }).click();
    await expect(page.getByRole('heading', { name: 'Tracking with Source' })).toBeVisible();
    await expect(page.getByText("You'll be able to adjust")).toBeVisible();
    // end describe
  });
});

test.describe('User redirection tests', () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    user = new User(page);

    await user.goToDefaultPage();

    await page.waitForURL('**/login**');
  });

  test('user with no personal info is redirected to setup 1', async ({ page }: { page: Page }) => {
    await user.login({ email: 'bernardo+step1@twistag.com', password: 'Password_123' });
    await expect(page.getByRole('heading')).toContainText('First, tell us a bit about yourself');
    await expect(page.locator('#first-name-input-label')).toContainText("What's your name?");
    await expect(page.locator('form')).toContainText("What's your role?");
    await expect(page.locator('form')).toContainText('Email Address');
    await expect(page.getByLabel('Email Address')).toHaveValue('bernardo+step1@twistag.com');
    await expect(page.getByPlaceholder('First')).toBeEmpty();
    await expect(page.getByPlaceholder('Last')).toBeEmpty();
    await expect(page.getByPlaceholder('Select your role...')).toBeEmpty();
    await page.getByPlaceholder('Select your role...').click();
    await page.getByRole('option', { name: 'CEO' }).click();
    await expect(page.getByPlaceholder('Select your role...')).toHaveValue('CEO');
  });
  test('user with no company info is redirected to setup 2', async ({ page }: { page: Page }) => {
    await user.login({ email: 'bernardo+step2@twistag.com', password: 'Password_123' });

    await expect(page.getByText('What industry are you in?')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('h2')).toHaveText('First, tell us a bit about yourself');
    await expect(page.getByText('Company', { exact: true })).toBeVisible();
    await expect(page.getByText('What industry are you in?')).toBeVisible();
    await expect(page.getByText('What is the size of your')).toBeVisible();
    await expect(page.getByPlaceholder('Company name')).toBeEmpty();
    await expect(page.getByPlaceholder('Select your industry...')).toBeEmpty();
    await expect(page.getByPlaceholder('Select your company size...')).toBeEmpty();
    await page.getByPlaceholder('Select your industry...').click();
    await page.getByRole('option', { name: 'Computer Software' }).click();
    await expect(page.getByPlaceholder('Select your industry...')).toHaveValue('Computer Software');
  });

  test('user with personal and company info is redirected to Website Setup', async ({ page }: { page: Page }) => {
    await user.login({ email: 'bernardo+step3@twistag.com', password: 'Password_123' });

    await expect(page.getByRole('heading', { name: "Ok E2E, let's get that good" })).toBeVisible();
    await expect(page.getByText('Ok E2E,')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();
  });

  test('user with personal, company info and website is redirected to "add your website name', async ({
    page
  }: {
    page: Page;
  }) => {
    // Is suppose to fail for now
    await user.login({ email: 'bernardo+step4@twistag.com', password: 'Password_123' });

    await expect(page.getByRole('heading', { name: 'Name your website' })).toBeVisible();
  });
  test.fixme(
    'user with personal, company info and website name is redirected to "Add data Source"',
    async ({ page }: { page: Page }) => {
      // Is suppose to fail for now
      await user.login({ email: 'bernardo+step4-1@twistag.com', password: 'Password_123' });

      await expect(page.getByText('Take the pain')).toBeVisible();
      await expect(page.getByText('Just add platforms that you')).toBeVisible();
      await expect(page.getByText('Supported CONNECTIONS')).toBeVisible();
      await expect(page.getByText('Coming Soon')).toBeVisible();
      await expect(page.getByText('Google Ads')).toBeVisible();
      await expect(page.getByText('Meta Ads')).toBeVisible();
      await expect(page.getByText('Hubspot')).toBeVisible();
      await expect(page.getByText('Salesforce')).toBeVisible();
      await expect(page.getByText('Request a connection')).toBeVisible();
      await expect(page.getByRole('button', { name: 'Continue' })).toBeDisabled();
    }
  );

  test.fixme(
    'user with personal, company info, website name and connecting source, is redirected to "Plug in your website"',
    async ({ page }: { page: Page }) => {
      // Is suppose to fail for now
      await user.login({ email: 'bernardo+step4-2@twistag.com', password: 'Password_123' });

      await expect(page.getByRole('heading', { name: 'Plug in your website' })).toBeVisible();
      await expect(page.getByText('Add the URL of your website.')).toBeVisible();
      await expect(page.getByPlaceholder('examplewebsite.com')).toBeEmpty();
      await page.getByPlaceholder('examplewebsite.com').fill('qa test step 4-2');
      await page.getByRole('button', { name: 'Continue' }).click();
      await expect(page.getByText('Invalid URL')).toBeVisible();

      await expect(page.locator('form').getByRole('img')).toBeVisible();
    }
  );

  test('user with personal, company info and website and source(pixel) setup is redirected to "Add Stages', async ({
    page
  }: {
    page: Page;
  }) => {
    await user.login({ email: 'bernardo+step5@twistag.com', password: 'Password_123' });

    await expect(page.getByText('Take the pain out of')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Prev' })).toBeDisabled();
    await page.getByLabel('Go to step 2').click();

    await page.getByRole('button', { name: 'Prev' }).click();
    await expect(page.getByRole('button', { name: 'Prev' })).toBeDisabled();

    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Get up and running fast with')).toBeVisible();
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Track your website without')).toBeVisible();
    await page.getByRole('button', { name: 'Prev' }).click();
    await page.getByRole('button', { name: 'Prev' }).click();

    await expect(page.getByRole('img', { name: 'Marketing' })).toBeVisible();
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByRole('img', { name: 'Preset Dashboard' })).toBeVisible();
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByRole('img', { name: 'It Hassle' })).toBeVisible();
    await page.getByRole('button', { name: 'Done' }).click();
    await page.getByLabel('Go to step 1').click();

    await expect(page.getByRole('heading', { name: 'Tracking with Source' })).toBeVisible();
    await page.getByRole('link', { name: '4 Widgets Hot ballon' }).click();

    await expect(page.getByRole('heading', { name: 'Give your dashboard a unique' })).toBeVisible();
    await expect(page.getByPlaceholder('Executive')).toBeEmpty();
    await expect(page.getByText('dashboard name')).toBeVisible();
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByText('Must have more than 3')).toBeVisible();
    await page.getByRole('button').first().click();
    await expect(page.getByText('Take the pain out of')).not.toBeVisible();
  });

  test(
    'user with all info is redirected to default Dashboard',
    {
      annotation: {
        type: 'info',
        description:
          'This is a user without any budget and funnel setup, so it should be redirected to the default dashboard.'
      }
    },
    async ({ page }: { page: Page }) => {
      await user.login({ email: 'bernardo+step6@twistag.com', password: 'Password_123' });
      await expect(page.getByRole('tab', { name: 'QA Dashboard E2E Step' })).toBeVisible({ timeout: 10000 });
      await user.checkRedirect(
        page,
        '18a4bb34-abfb-4ba6-a7d3-afbf3add3d22/a04d3dc8-ed02-4133-9737-c7d9c9bb7804/bff1492f-6346-4e6a-803f-9bf9e1bdaeaf/dashboard'
      );
    }
  );

  test.fixme(
    'user with personal, company info and website and source(pixel) setup is redirected to "Add a couple goals"',
    async ({ page }: { page: Page }) => {
      await user.login({ email: 'bernardo+step7@twistag.com', password: 'Password_123' });
      await expect(page.getByRole('heading', { name: 'Add a couple goals' })).toBeVisible();
      await expect(page.getByText('Adding key performance')).toBeVisible();
      await expect(page.getByText('You can add these at any time')).toBeVisible();
      await expect(page.getByRole('button', { name: 'Remove' }).nth(0)).toBeVisible();
      await expect(page.getByRole('button', { name: 'Remove' }).nth(1)).toBeVisible();

      await expect(page.getByText('Budget Tracker')).toBeVisible();
      // await expect(page.getByRole('button', { name: 'Skip for now' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();

      await page.getByRole('button', { name: 'Remove' }).nth(1).click();
      await page.getByRole('button', { name: 'Add' }).click();
      await page.getByPlaceholder('1,000').click();
      await page.getByPlaceholder('1,000').fill('156');
      await page.getByRole('textbox', { name: 'Customer Funnel Stage' }).click();
      await page
        .locator('div')
        .filter({ hasText: /^Customers$/ })
        .click();
      await expect(page.getByRole('heading')).toContainText('Activity Goal');
      await expect(page.getByRole('button', { name: 'Confirm Goal' })).toBeVisible();
      await page.getByRole('button', { name: 'Confirm Goal' }).click();

      await page.getByRole('button', { name: 'Remove' }).nth(0).click();

      await page.getByRole('button', { name: 'Add' }).click();
      await page.getByPlaceholder('$').fill('$10,0012');
      await page.locator('label div').first().click();
      await page.getByRole('textbox', { name: 'Budget Term' }).click();
      await page.getByRole('option', { name: 'Monthly' }).click();
      await page.getByRole('textbox', { name: 'Budget Term' }).click();
      await expect(page.getByRole('option', { name: 'Weekly' })).toBeVisible();
      await expect(page.getByRole('option', { name: 'Monthly' })).toBeVisible();
      await expect(page.getByRole('option', { name: 'Annually' })).toBeVisible();
      await expect(page.getByRole('option', { name: 'Monthly' }).locator('svg')).toBeVisible();
      await page.getByRole('option', { name: 'Monthly' }).click();
      await page.getByRole('button', { name: 'Create Budget' }).click();
    }
  );

  test.fixme('user without login is redirected to login page', async ({ page }: { page: Page }) => {
    await page.goto(
      '/en/94567d32-152f-4271-8531-7dc8e7014fa0/236074ab-8f1f-4168-8c0b-bedf7360cc45/dashboard/e131cbf0-9d64-44ee-81c2-af120ca3da23'
    );
    await page.waitForURL('**/login**', { timeout: 10000 });
    await user.checkRedirect(page, 'login');
  });

  // end describe
});
