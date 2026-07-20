import { expect, Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  // Click on 'Signup / Login' button and Verify 'Login to your account' is visible
  async clickSignupLoginButton() {
    await this.page.getByRole('link', { name: 'Signup / Login' }).click();
    await expect(this.page.getByText('Login to your account')).toBeVisible();
  }

  // Enter correct email address and password and click 'Login' button
  async login(email: string, password: string) {
    await this.page.locator('[data-qa="login-email"]').fill(email);
    await this.page.locator('[data-qa="login-password"]').fill(password);
    await this.page.locator('[data-qa="login-button"]').click();
  }

  // Verify that 'Logged in as username' is visible
  async verifyLoggedInVisible() {
    await expect(this.page.getByText('Logged in as')).toBeVisible();
  }

  // Click and verify Logout
    async clickLogoutButton() {
    await this.page.getByRole('link', { name: 'Logout' }).click();
    await expect(this.page.getByText('Login to your account')).toBeVisible();
  }
}