import { expect, Page, Locator } from '@playwright/test';

export class CheckoutPage {

    readonly itemPrice;
    readonly quantity;
    readonly totalAmount;
    readonly totalRow;
    readonly deliveryAddress;
    readonly billingAddress;


    constructor(private page: Page) {

        this.totalRow = page.getByRole('row', { name: 'Total Amount' });
        this.totalAmount = this.totalRow.locator('.cart_total_price');
        this.itemPrice = page.locator('.cart_price');
        this.quantity = page.locator('.cart_quantity');
        this.billingAddress = page.locator('#address_invoice');
        this.deliveryAddress = page.locator('#address_delivery');

    }

    
    // NAVIGATION

    async placeOrder() {

        await this.page.getByRole('link', { name: 'Place Order' }).click();
        await expect(this.page.getByRole('heading', { name: 'Payment' })).toBeVisible();

    }

    // ACTIONS

    async addCommentToOrder(message: string) {

       await expect(this.page.locator('#ordermsg')).toBeVisible();
       await this.page.locator('textarea[name="message"]').fill('message');

    }


    // ASSERTIONS

    async verifyTotalAmount(){

        const count = await this.quantity.count(); // return number of products in cart

        let expectedTotal = 0;

        // Loop through each product in checkout table
        for (let i = 0; i < count; i++) {

             // get price and quantity of each product
            const priceText = await this.itemPrice.nth(i).textContent();
            const quantityText = await this.quantity.nth(i).textContent();

            // remove non-numeric characters from price
            const itemPrice = Number(priceText?.replace(/\D/g, ''));
            const itemQuantity = Number(quantityText?.replace(/\D/g, ''));

            expectedTotal += itemPrice * itemQuantity;

        }

        const totalText = await this.totalAmount.textContent();
        const orderTotal = Number(totalText?.replace(/\D/g, '')); // remove non-numeric characters from price

        expect(orderTotal).toBe(expectedTotal); // compare expected total with actual total

    };

    private async verifyAddress(locator: Locator, address: any) {

        const text = await locator.textContent();

        expect(text).toContain(address.firstName);
        expect(text).toContain(address.lastName);
        expect(text).toContain(address.address);
        expect(text).toContain(address.city);
        expect(text).toContain(address.state);
        expect(text).toContain(address.zipcode);
        expect(text).toContain(address.country);
        expect(text).toContain(address.mobileNumber);
    }

    async verifyDeliveryAddress(address: any) {
        await expect(this.page.getByText('Your delivery address')).toBeVisible();
        await this.verifyAddress(this.deliveryAddress, address);
    };

    async verifyBillingAddress(address: any) {
        await expect(this.page.getByText('Your billing address')).toBeVisible();
        await this.verifyAddress(this.billingAddress, address);
    }

};

