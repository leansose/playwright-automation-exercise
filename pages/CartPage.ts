import { expect, Page } from '@playwright/test';

export class CartPage {

    readonly itemImage;
    readonly productDescription;
    readonly productPrice;
    readonly quantity;
    readonly totalPrice;
    readonly deleteButton;
    readonly cartTable;
    

    constructor(private page: Page) {

        // cart page elements

        this.itemImage = page.getByRole('link', { name: 'Product Image' });
        this.productDescription = page.locator('.cart_description');
        this.productPrice = page.locator('.cart_price');
        this.quantity = page.locator('.cart_quantity');
        this.totalPrice = page.locator('.cart_total_price'); // price of item in cart
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
    async removeItemFromCart(itemIndex: number) {
        await this.deleteButton.nth(itemIndex).click();
    }

    // ASSERTIONS

    // The cart displays a table when it contains products.
    async verifyCartHasProducts() {
        await expect(this.cartTable).toBeVisible();
    }

    async verifyQuantityInCart(expectedQuantity: number) {
        await expect(this.quantity).toHaveText(expectedQuantity.toString());
    }

    async verifyCartIsEmpty() {
        await expect(this.page.getByText('Cart is Empty!')).toBeVisible();
    }

}
