import { expect, Page } from '@playwright/test';

export class HomePage {
    constructor(private page: Page) {}

    //open and verify home page
    async open() {
        await this.page.goto('/');

        await expect(this.page).toHaveURL('https://automationexercise.com/');
        const consent = this.page.getByRole('button', { name: /Consent/i });

        if (await consent.isVisible().catch(() => false)) {
            await consent.click();
        }
    }
}


