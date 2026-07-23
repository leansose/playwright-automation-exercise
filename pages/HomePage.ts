import { expect, Page } from '@playwright/test';

export class HomePage {
    constructor(private page: Page) {}

    // NAVIGATION

    // Opens HomePage and consent cookies
    async open() {
        await this.page.goto('/');

        await expect(this.page.getByAltText('Website for automation practice'))
            .toBeVisible();

        const consent = this.page.getByRole('button', { name: /Consent/i });
        
        if (await consent.isVisible().catch(() => false)) {
            await consent.click();
        }
    }

    async clickProductsButton() {
        await this.page.getByRole('link', { name: 'Products' }).click();
        await expect(this.page.getByText('All Products')).toBeVisible();
    }

    async clickCartButton() {
        await this.page.getByRole('link', { name: 'Cart' }).click();
        await expect(this.page.getByText('Shopping Cart')).toBeVisible();
    }

    async clickSignupLoginButton() {
        await this.page.getByRole('link', { name: 'Signup / Login' }).click();
        await expect(this.page.getByText('Login to your account')).toBeVisible();
        await expect(this.page.getByText('New User Signup!')).toBeVisible();
    }

    async clickLogoutButton() {
        await this.page.getByRole('link', { name: 'Logout' }).click();
        await expect(this.page.getByText('Login to your account')).toBeVisible();
    }

    // ACTIONS

    async deleteAccount() {
        await this.page.getByRole('link', { name: 'Delete Account' }).click();
        await expect(this.page.getByText('Account Deleted!')).toBeVisible();
        await this.page.locator('[data-qa="continue-button"]').click();
    }

    // ASSERTIONS

    async verifyUserLoggedIn() {
        await expect(this.page.getByText('Logged in as')).toBeVisible();
    }

}

