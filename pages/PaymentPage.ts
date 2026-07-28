import { expect, Page } from '@playwright/test';

export class PaymentPage {

    constructor(private page: Page) {

    }

    // NAVIGATION

    async submitPayment() {
        await this.page.getByRole('button', { name: 'Pay and Confirm Order' }).click();
    }

    async continueToHomePage() {
        await this.page.getByRole('link', { name: 'Continue' }).click();
        await expect(this.page).toHaveTitle('Automation Exercise');
    }

    // ACTIONS

    async fillPaymentForm(cardName: string, cardNumber: string, cvv: string, month: string, year: string) {

        await this.page.locator('[data-qa="name-on-card"]').fill(cardName);
        await this.page.locator('[data-qa="card-number"]').fill(cardNumber);
        await this.page.locator('[data-qa="cvc"]').fill(cvv);
        await this.page.locator('[data-qa="expiry-month"]').fill(month);
        await this.page.locator('[data-qa="expiry-year"]').fill(year);
        
    }

    async downloadInvoice() {

        const downloadPromise = this.page.waitForEvent('download');
        await this.page.getByRole('link', { name: 'Download Invoice' }).click();
        const download = await downloadPromise;
        return download;

    }

    // ASSERTIONS

    async verifyOderPlaced() {
        await expect(this.page.getByText('Order Placed!')).toBeVisible();
        await expect(this.page.getByText('Congratulations! Your order')).toBeVisible();
    }
}