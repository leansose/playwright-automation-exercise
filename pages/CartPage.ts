import { expect, Page } from '@playwright/test';

export class CartPage {

    readonly itemImage;
    readonly itemDescription;
    readonly itemPrice;
    readonly itemQuantity;
    readonly itemTotalPrice;
    readonly deleteButton;
    readonly cartTable;
    

    constructor(private page: Page) {

        // cart page elements

        this.itemImage = page.getByRole('link', { name: 'Product Image' });
        this.itemDescription = page.locator('.cart_description');
        this.itemPrice = page.locator('.cart_price');
        this.itemQuantity = page.locator('.cart_quantity');
        this.itemTotalPrice = page.locator('.cart_total_price');
        this.deleteButton = page.locator('.cart_quantity_delete');
        this.cartTable = page.locator('.cart_menu');
        
    }

    // NAVIGATION

    async proceedToCheckout() {
        await this.page.getByText('Proceed To Checkout').click();
        await expect(this.page.getByText('Review Your Order')).toBeVisible();
    }

    async proceedToCheckoutByLoginRegister() {
        await this.page.getByText('Proceed To Checkout').click();
        await this.page.getByRole('link', { name: 'Register / Login' }).click();
        await expect(this.page.getByText('Login to your account')).toBeVisible();
        await expect(this.page.getByText('New User Signup!')).toBeVisible();
    }

    // ACTIONS

    // Remove a product from the cart based on its position in the cart table.
    async removeItem(itemIndex: number) {
        await this.deleteButton.nth(itemIndex).click();
    }

    // ASSERTIONS

    // The cart displays a table when it contains products.
    async verifyCartHasProducts() {
        await expect(this.cartTable).toBeVisible();
    }

    async verifyItemQuantity(itemIndex: number, expectedQuantity: number) {
        await expect(this.itemQuantity.nth(itemIndex)).toHaveText(expectedQuantity.toString());

    }

    async verifyItemTotalPrice(itemIndex: number) {
        
        const priceText = await this.itemPrice.nth(itemIndex).textContent();
        const quantityText = await this.itemQuantity.nth(itemIndex).textContent();
        const totalPriceText = await this.itemTotalPrice.nth(itemIndex).textContent();

        const itemPrice = Number(priceText?.replace(/\D/g, ''));
        const itemQuantity = Number(quantityText?.replace(/\D/g, ''));
        const totalPrice = Number(totalPriceText?.replace(/\D/g, ''));

        const expectedTotal = itemPrice * itemQuantity;

        expect(totalPrice).toBe(expectedTotal);
    }


    async verifyCartIsEmpty() {
        await expect(this.page.getByText('Cart is Empty!')).toBeVisible();
    }

}
