import { expect, Page } from '@playwright/test';

export class ProductsPage {

    // products list in produts page
    readonly productCards;
    readonly productTitle;

    // product details section
    readonly productInfo;
    readonly productName;
    readonly productCategory;
    readonly productPrice;
    readonly availability;
    readonly condition;
    readonly brand;

    constructor(private page: Page) {

        // products list in produts page
        this.productCards = page.locator('.product-image-wrapper'); // find product card
        this.productTitle = this.productCards.locator('.productinfo.text-center p'); // product title
        
        // product details section
        this.productInfo = page.locator('.product-information'); // product details section
        this.productName = this.productInfo.locator('h2'); // product name 
        this.productCategory = this.productInfo.getByText('Category:');
        this.productPrice = this.productInfo.getByText('Rs.'); // product price 
        this.availability = this.productInfo.getByText('Availability:');
        this.condition = this.productInfo.getByText('Condition:');
        this.brand = this.productInfo.locator('p').filter({ hasText: 'Brand:' });
    }

    // NAVIGATION

    // Open first product details page
    async openFirstProduct() {
        await this.page.getByRole('link', { name: 'View Product' }).first().click();
    }

    async clickViewProduct(index: number) {
        await this.page.getByRole('link', { name: 'View Product' }).nth(index).click();
    }

    // Goes to Cart through Added Product pop-up
    async clickViewCart() {
        await this.page.getByRole('link', { name: 'View Cart' }).click();
        await expect(this.page.getByText('Shopping Cart')).toBeVisible();
        await expect(this.page.getByText('Proceed To Checkout')).toBeVisible();
    }

    // ACTIONS

    async searchProduct(keyword: string) {
        await this.page.locator('[id="search_product"]').fill(keyword);
        await this.page.locator('[id="submit_search"]').click();
        await expect(this.page.getByText('Searched Products')).toBeVisible();
    }

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

    async submitProductReview(name: string, email: string, review: string) {
        await this.page.getByRole('textbox', { name: 'Your Name' }).fill(name);
        await this.page.getByRole('textbox', { name: 'Email Address', exact: true }).fill(email);
        await this.page.getByRole('textbox', { name: 'Add Review Here!' }).fill(review);
        await this.page.getByRole('button', { name: 'Submit' }).click();
        await expect(this.page.getByText('Thank you for your review.')).toBeVisible();
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

    async verifySearchedProducts(expectedKeyword: string) {

        // verify product name contains searched keyword
        // if yes, verify next product in search results
        // if not, verify catergory in product details
        // then, go back to produtct page with search results
        // verify next product until no more products in the list

        const keyword = expectedKeyword.toLowerCase();
        const count = await this.productTitle.count();
        const searchResultsUrl = this.page.url();

        for (let i = 0; i < count; i++) {

            const productName = await this.productTitle.nth(i).textContent();

            if (productName?.toLowerCase().includes(keyword)) {
                continue;
            }

            await this.page.getByRole('link', { name: 'View Product' }).nth(i).click();
            const productCategory = await this.productCategory.textContent();
            expect(productCategory?.toLowerCase()).toContain(keyword);

            // Avoid waiting for external ads and third-party resources.
            // The test only requires the search results DOM to be available.
            await this.page.goto(searchResultsUrl, {
                    waitUntil: 'domcontentloaded'
                });
                
            await expect(this.productCards.first()).toBeVisible();
        }

    }


     // Verify page has at least one product
    async expectProductsVisible(){
        await expect(this.productCards.first()).toBeVisible();
    }

    async verifyProductCategory(category: string) {
        await expect(this.productCategory).toContainText(`${category}`);
    }

    async verifyProductBrand(brand: string) {
        await expect(this.brand).toContainText(`Brand: ${brand}`);
    }

}