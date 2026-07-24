import { expect, Page } from '@playwright/test';

export class CartPage {

    readonly itemImage;
    readonly productDescription;
    readonly productPrice;
    readonly quantity;
    readonly totalPrice;
    readonly deleteButton;
    

    constructor(private page: Page) {

        // cart page elements

        this.itemImage = page.getByRole('link', { name: 'Product Image' });
        this.productDescription = page.locator('.cart_description');
        this.productPrice = page.locator('.cart_price');
        this.quantity = page.locator('.cart_quantity');
        this.totalPrice = page.locator('.cart_total_price');
        this.deleteButton = page.locator('.cart_quantity_delete');
        
    }

    // ACTIONS

    async removeItemFromCart(index: number) {
        await this.deleteButton.nth(index).click();
    }

    // ASSERTIONS

    async verifyCartHasProducts() {
        await expect(this.itemImage).toBeVisible();
        await expect(this.productDescription).toBeVisible();
        await expect(this.productPrice).toBeVisible();
        await expect(this.quantity).toBeVisible();
        await expect(this.totalPrice).toBeVisible();
    }

    async verifyQuantityInCart(expected_quantity: number) {
        await expect(this.quantity).toHaveText(expected_quantity.toString());
    }

    async verifyCartIsEmpty() {
        await expect(this.page.getByText('Cart is Empty!')).toBeVisible();
    }
}
