/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable i18next/no-literal-string */
import { expect, type Page } from '@playwright/test';
import axios from 'axios';

import { getInboxResetPassword } from './getInboxResetPassword';
import { getInboxTeamInvite } from './getInboxTeamInvite';
import { getInboxVerificationEmail } from './getInboxVerificationEmail';
import { getUUIDfromString } from './getUUIDfromString';

export class User {
  private adminToken: string = '';

  constructor(private page: Page) {
    this.onboarding = {
      step1Personal: this.onboarding.step1Personal.bind(this),
      step2Company: this.onboarding.step2Company.bind(this),
      step3Website: this.onboarding.step3Website.bind(this),
      step4_2ConnectForms: this.onboarding.step4_2ConnectForms.bind(this),
      step4_3ConnectSnippet: this.onboarding.step4_3ConnectSnippet.bind(this),
      step4Connect: this.onboarding.step4Connect.bind(this),
      step5Dashboard: this.onboarding.step5Dashboard.bind(this),
      step6CustomerFunnel: this.onboarding.step6CustomerFunnel.bind(this),
      step7CustomerFunnelEmpty: this.onboarding.step7CustomerFunnelEmpty.bind(this),
      step8AddBudgetTracker: this.onboarding.step8AddBudgetTracker.bind(this)
    };

    this.dashboard = {
      openOrganizationSettings: this.dashboard.openOrganizationSettings.bind(this),
      selectOrganization: this.dashboard.selectOrganization.bind(this),
      selectDashboard: this.dashboard.selectDashboard.bind(this)
    };
  }

  async goToDefaultPage() {
    await this.page.goto(process.env.CI ? '/' : 'https://dashboard-develop.source.app');
  }

  async getToken({ email, password }: { email: string; password: string }): Promise<string> {
    const apiUrlLoginPage = `${process.env.NEXT_PUBLIC_SOURCE_API_URL}/auth/login` || '';

    await this.page.goto(apiUrlLoginPage);
    await this.login({ email, password });
    const token = await this.page.getByText('{"access_token":"').textContent();
    return JSON.parse(token as string).access_token as string;
  }

  async login({ email, password }: { email: string; password: string }) {
    await this.page.waitForLoadState();
    await expect(this.page.getByRole('heading', { name: 'Hello, log in to your account' })).toBeVisible();
    await this.page.fill('input[id="email"]', email);
    await this.page.fill('input[id="password"]', password);

    await this.page.locator('button[id="btn-login"]').click();

    await this.page.waitForLoadState();
  }

  async signup({ email, password }: { email: string; password: string }) {
    await expect(this.page.getByRole('heading', { name: 'Hello, log in to your account' })).toBeVisible();
    await this.page.getByRole('button', { name: 'Create one', exact: false }).click();
    await expect(this.page.getByRole('heading', { name: "Hello, let's create your new" })).toBeInViewport();
    await this.page.fill('input[id="email"]', email);
    await this.page.fill('input[id="password"]', password);
    await this.page.getByRole('button', { name: 'Continue', exact: true }).click();
    await this.page.waitForLoadState();
  }

  async resetPassword({ email }: { email: string }) {
    await expect(this.page.getByRole('heading', { name: 'Hello, log in to your account' })).toBeVisible();

    await this.page.fill('input[id="email"]', email);
    await this.page.click('button[id="btn-reset"]');
    await expect(this.page.getByText('Instructions sent.')).toBeVisible();
    await expect(this.page.getByText(email)).toBeVisible();

    const verificationLink = await getInboxResetPassword({ email });

    if (verificationLink) {
      await expect(this.page.getByText('Instructions sent.')).toBeVisible();
      await this.page.goto(verificationLink);

      await expect(this.page.getByRole('button', { name: 'Continue' })).toBeDisabled();

      await this.page.getByPlaceholder('New password').fill('Password_1234');
      await expect(this.page.getByText('Your password must contain:')).toBeVisible();
      await expect(this.page.getByText('At least 8 characters')).toBeVisible();
      await expect(this.page.getByText('At least 3 of the following:')).toBeVisible();
      await expect(this.page.getByText('Lower case letters (a-z)')).toBeVisible();
      await expect(this.page.getByText('Upper case letters (A-Z)')).toBeVisible();
      await expect(this.page.getByText('Numbers (0-9)')).toBeVisible();
      await expect(this.page.getByText('Special characters (e.g')).toBeVisible();
      await this.page.getByPlaceholder('Confirm password').click();
      await this.page.getByPlaceholder('Confirm password').fill('Password_1234');
      await expect(this.page.getByRole('button', { name: 'Continue' })).toBeVisible();
      await expect(this.page.getByRole('button', { name: 'Continue' })).toBeEnabled();
      await this.page.getByRole('button', { name: 'Continue' }).click();
      await expect(this.page.getByRole('heading', { name: 'Password changed.' })).toBeVisible();
      await this.page.getByRole('button', { name: 'Continue to log in' }).click();
      await expect(this.page.getByRole('heading', { name: 'Hello, log in to your account' })).toBeVisible();
      await this.login({ email, password: 'Password_1234' });
    } else {
      throw new Error('Reset email not found');
    }
  }

  async logout() {
    await this.page.goto('/api/auth/logout');
  }

  async verifyEmail({ email }: { email: string }) {
    const verificationLink = await getInboxVerificationEmail({ email });

    if (verificationLink) {
      await expect(this.page.getByRole('heading')).toContainText('Check your inbox');
      await this.page.goto(verificationLink);

      await expect(this.page.getByText('Email Verified')).toBeVisible();
      await expect(this.page.getByRole('link', { name: 'Back to' })).toBeVisible();
      await this.page.getByRole('link', { name: 'Back to' }).click();
      await expect(this.page.getByRole('heading', { name: 'Hello, log in to your account' })).toBeVisible();
    } else {
      throw new Error('Verification email not found');
    }
  }

  async verifyTeamInvite({ email, page, new: isNew }: { email: string; page: Page; new: boolean }) {
    const verificationLink = await getInboxTeamInvite({ email });

    if (verificationLink) {
      await page.goto(verificationLink);

      await expect(page.getByRole('heading', { name: 'You have been invited to join' })).toBeVisible();
      await expect(page.getByText('You have been invited to join an organization')).toBeVisible();

      if (isNew) {
        await page.getByRole('button', { name: 'Continue to sign up' }).click();

        await expect(page.getByRole('heading', { name: "Hello, let's create your new" })).toBeVisible();
      } else {
        await page.getByRole('button', { name: 'Continue' }).click();

        await expect(page.getByRole('heading', { name: "You're almost there" })).toBeVisible();
      }
      // TODO: Needs to be updated
    } else {
      throw new Error('Verification email not found');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async delete({ id, token }: { id: string; token: string }) {
    const apiUrl = `${process.env.NEXT_PUBLIC_SOURCE_API_URL}/graphql` || '';

    await axios.post(
      apiUrl,
      {
        query: `mutation { removeUser(id: "${id}") }`
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
  }

  onboarding = {
    step1Personal: async () => {
      await this.page.getByPlaceholder('First').click();
      await this.page.getByPlaceholder('First').fill('E2E');
      await this.page.getByPlaceholder('Last').click();
      await this.page.getByPlaceholder('Last').fill('random');
      await this.page.getByPlaceholder('Select your role...').click();
      await this.page.getByRole('option', { name: 'CEO' }).click();
      await this.page.getByRole('button', { name: 'Continue' }).click();
    },
    step2Company: async () => {
      await this.page.getByPlaceholder('Company name').fill('E2E QA');
      await this.page.getByPlaceholder('Select your industry...').click();
      await this.page.getByRole('option', { name: 'Computer software' }).click();
      await this.page.getByPlaceholder('Select your company size...').click();
      await this.page.getByText('-250').click();
      await this.page.getByRole('button', { name: 'Continue' }).click();
      await this.page.getByRole('button', { name: 'Continue' }).click();
    },
    step3Website: async () => {
      await this.page.getByPlaceholder('i.e. Your website name').fill('e2e QA');
      await this.page.getByRole('button', { name: 'Continue' }).click();
    },
    step4Connect: async () => {
      // await this.page.getByRole('button', { name: 'Connect' }).click();
      await this.page.getByPlaceholder('examplewebsite.com').fill('qa.com');
      await this.page.getByRole('button', { name: 'Continue' }).click();
    },
    step4_2ConnectForms: async () => {
      await expect(this.page.getByRole('heading', { name: 'Identify your sign up forms' })).toBeVisible();
      await this.page.getByPlaceholder('www.website.com').click();
      await this.page.getByPlaceholder('www.website.com').fill('source.app');
      await this.page.getByPlaceholder('querySelector').click();
      await this.page.getByPlaceholder('querySelector').fill('#email');
      await this.page.getByRole('button', { name: '+ Add another URL' }).click();
      await this.page.getByRole('textbox', { name: 'www.website.com' }).fill('test.app');
      await this.page.getByRole('textbox', { name: 'querySelector' }).click();
      await this.page.getByRole('textbox', { name: 'querySelector' }).fill('#test');
      await this.page.getByRole('button', { name: 'Continue' }).click();
      await expect(this.page.getByRole('heading', { name: "Connect your website — it's" })).toBeVisible();
    },
    step4_3ConnectSnippet: async () => {
      await expect(this.page.getByText('Log in to your websites admin panel')).toBeVisible();
      await this.page.getByRole('button', { name: 'Continue & test later' }).click();

      await expect(this.page.getByRole('heading', { name: "You're all set." })).toBeVisible();
      await this.page.getByRole('button', { name: 'Let' }).click();
    },
    step5Dashboard: async () => {
      await this.page.getByRole('button', { name: 'Next' }).click();
      await this.page.getByRole('button', { name: 'Next' }).click();
      await this.page.getByRole('button', { name: 'Done' }).click();
      await this.page.getByRole('link', { name: '4 Widgets Hot ballon' }).click();
      await this.page.getByPlaceholder('Executive').fill('Dashboard E2E Step 5');
      await this.page.getByRole('button', { name: 'Continue' }).click();
    },

    step6CustomerFunnel: async ({ skip = false }) => {
      if (skip) {
        await this.page.getByRole('button', { name: 'Skip for now' }).click();
        return;
      }
      await this.page.getByRole('heading', { name: 'Ready to define your customer' }).click();
      await this.page.getByRole('button', { name: 'Continue' }).click();
    },
    step7CustomerFunnelEmpty: async ({ skip = false }) => {
      if (skip) {
        await this.page.getByRole('button', { name: 'Skip for now' }).click();
        return;
      }
      await this.page.getByRole('heading', { name: 'Ready to define your customer' }).click();
      await this.page.getByRole('button', { name: 'Continue' }).click();
    },
    step8AddBudgetTracker: async ({ recurring = false, skip = false }) => {
      if (skip) {
        await this.page.getByRole('button', { name: 'Skip for now' }).click();
        return;
      }
      await this.page.getByRole('heading', { name: 'Ready to define your customer' }).click();
      await this.page.getByRole('button', { name: 'Continue' }).click();
    }
  };

  dashboard = {
    openOrganizationSettings: async () => {
      await this.page.getByTestId('organization-dropdown').click();
      await this.page.getByRole('link', { name: 'Organization Settings' }).click();
      await expect(this.page.getByRole('heading', { name: 'Organization' })).toBeVisible();
      await expect(this.page.getByRole('tab', { name: 'Team Members' })).toBeVisible();
      await expect(this.page.getByRole('tab', { name: 'Organization' })).toBeVisible();
    },
    selectOrganization: async ({ organizationName }: { organizationName: string }) => {
      await this.page.getByTestId('organization-dropdown').click();
      await expect(this.page.getByRole('link', { name: organizationName })).toBeVisible();
      await this.page.getByRole('link', { name: organizationName }).click();
    },
    selectDashboard: async ({ dashboardName }: { dashboardName: string }) => {
      const button = this.page.getByRole('tab', { name: dashboardName, exact: true });

      await button.click();

      let tabId = await button.getAttribute('id');

      tabId = getUUIDfromString(tabId);

      await this.page.waitForURL(`**/${tabId}/**`, { timeout: 15000 });

      const dataActiveValue = await button.getAttribute('data-active');

      expect(dataActiveValue).toBe('true');
    }
  };

  // eslint-disable-next-line class-methods-use-this
  async checkRedirect(page: Page, urlPart: string) {
    await this.page.waitForURL(`**/${urlPart}`, { timeout: 15000 });

    const url = page.url();

    expect(url).toContain(urlPart);
  }
}
