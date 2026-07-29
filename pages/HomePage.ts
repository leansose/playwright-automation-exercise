import { expect, Page } from '@playwright/test';

export class HomePage {
    constructor(private page: Page) {}

    // NAVIGATION

    // Opens HomePage and consent cookies
    async open() {

        await this.page.goto('/');
        await expect(this.page.getByAltText('Website for automation practice')).toBeVisible();
    }

    async acceptCookies() {

        const consent = this.page.getByRole('button', { name: /Consent/i });
        
        if (await consent.isVisible().catch(() => false)) {
            await consent.click();
        }
    }

    async openProductsPage() {
        await this.page.getByRole('link', { name: 'Products' }).click();
        await expect(this.page.getByText('All Products')).toBeVisible();
    }

    async openCartPage() {
        await this.page.getByRole('link', { name: 'Cart' }).click();
        await expect(this.page.getByText('Shopping Cart')).toBeVisible();
    }

    async openSignupLoginPage() {
        await this.page.getByRole('link', { name: 'Signup / Login' }).click();
        await expect(this.page.getByText('Login to your account')).toBeVisible();
        await expect(this.page.getByText('New User Signup!')).toBeVisible();
    }


    // ACTIONS

    async deleteAccount() {
        await this.page.getByRole('link', { name: 'Delete Account' }).click();
        await expect(this.page.getByText('Account Deleted!')).toBeVisible();
        await this.page.locator('[data-qa="continue-button"]').click();
    }

     async logout() {
        await this.page.getByRole('link', { name: 'Logout' }).click();
        await expect(this.page.getByText('Login to your account')).toBeVisible();
    }

    // ASSERTIONS

    async verifyUserLoggedIn() {
        await expect(this.page.getByText('Logged in as')).toBeVisible();
    }

}

