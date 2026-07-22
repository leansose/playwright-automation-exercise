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

    // Open first product details page
    async openFirstProduct() {
        await this.page.getByRole('link', { name: 'View Product' }).first().click();
    }

    // Verify product details are visible
    async expectProductDetailsVisible() {

        await expect(this.productName).toBeVisible(); // product name
        await expect(this.productCategory).toBeVisible(); // category
        await expect(this.productPrice).toContainText('Rs.'); // price
        await expect(this.availability).toBeVisible(); // availability
        await expect(this.condition).toBeVisible(); // condition
        await expect(this.brand).toBeVisible(); // brand
    }

    // Filter product by category and subcategory
    async filterByCategory(category: string, subcategory: string) {
        await expect(this.page.locator('.left-sidebar').getByText('Category')).toBeVisible();
        await this.page.getByRole('link', { name: category }).click();
        await this.page.getByRole('link', { name: subcategory }).click();
        await expect(this.page.getByText(`${category} - ${subcategory} Products`)).toBeVisible();
    }

    // Verify product category
    async checkCategory(category: string) {
        await expect(this.productCategory).toContainText(`${category}`);
    }

     // Filter product by brand
    async filterByBrand(brand: string) {
        await expect(this.page.locator('.left-sidebar').getByText('Brand')).toBeVisible();
        await this.page.getByRole('link', { name: brand }).click();
        await expect(this.page.getByText(`Brand - ${brand} Products`)).toBeVisible();
    }

    // Check product brand
    async checkBrand(brand: string) {
        await expect(this.brand).toContainText(`Brand: ${brand}`);
    }

    // verify page has at least one product
    async expectProductsVisible(){
        await expect(this.products.first()).toBeVisible();

    }

}

