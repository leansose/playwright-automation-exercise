import { expect, Page } from '@playwright/test';

export class ProductsPage {

    readonly products;
    readonly productInfo;
    readonly productName;
    readonly productCategory;
    readonly productPrice;
    readonly availability;
    readonly condition;
    readonly brand;

    constructor(private page: Page) {

        this.products = page.locator('.product-image-wrapper'); // view products
        this.productInfo = page.locator('.product-information'); // product details section
        this.productName = this.productInfo.locator('h2'); // product name
        this.productCategory = this.productInfo.getByText('Category:'); // product category
        this.productPrice = this.productInfo.getByText('Rs.'); // product price
        this.availability = this.productInfo.getByText('Availability:'); // product availability
        this.condition = this.productInfo.getByText('Condition:'); // product condition
        this.brand = this.productInfo.locator('p').filter({ hasText: 'Brand:' }); // product brand

    }

    // NAVIGATION

    // Open first product details page
    async openFirstProduct() {
        await this.page.getByRole('link', { name: 'View Product' }).first().click();
    }

    // Goes to Cart through Added Product pop-up
    async clickViewCart() {
        await this.page.getByRole('link', { name: 'View Cart' }).click();
        await expect(this.page.getByText('Shopping Cart')).toBeVisible();
        await expect(this.page.getByText('Proceed To Checkout')).toBeVisible();
    }

    // ACTIONS

    async filterByCategory(category: string, subcategory: string) {
        await expect(this.page.locator('.left-sidebar').getByText('Category')).toBeVisible();
        await this.page.getByRole('link', { name: category }).click();
        await this.page.getByRole('link', { name: subcategory }).click();
        await expect(this.page.getByText(`${category} - ${subcategory} Products`)).toBeVisible();
    }

    async filterByBrand(brand: string) {
        await expect(this.page.locator('.left-sidebar').getByText('Brand')).toBeVisible();
        await this.page.getByRole('link', { name: brand }).click();
        await expect(this.page.getByText(`Brand - ${brand} Products`)).toBeVisible();
    }

    // Add product to cart inside product details page
    async addProductToCart(){
        await this.page.getByRole('button', { name: 'Add to cart' }).click();
        await expect(this.page.getByText('Your product has been added to cart.')).toBeVisible();
    }

    async addQuantityToProduct(quantity: number){
        await this.page.locator('#quantity').fill(quantity.toString());
    }

    async clickContinueShopping(){
        await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
    }

    // ASSERTIONS

    async expectProductDetailsVisible() {
        await expect(this.productName).toBeVisible();
        await expect(this.productCategory).toBeVisible();
        await expect(this.productPrice).toContainText('Rs.');
        await expect(this.availability).toBeVisible();
        await expect(this.condition).toBeVisible();
        await expect(this.brand).toBeVisible();
    }

     // Verify page has at least one product
    async expectProductsVisible(){
        await expect(this.products.first()).toBeVisible();
    }

    async verifyProductCategory(category: string) {
        await expect(this.productCategory).toContainText(`${category}`);
    }

    async verifyProductBrand(brand: string) {
        await expect(this.brand).toContainText(`Brand: ${brand}`);
    }

}