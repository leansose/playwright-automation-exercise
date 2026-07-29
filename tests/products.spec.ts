import { test, expect } from '../fixtures/test.fixture';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

import { testProducts } from '../test-data/products';
import { review } from '../test-data/review';

test('view products', async ({ page, productsPageReady }) => {
  
    const productsPage = new ProductsPage(page);

    await productsPage.expectProductsVisible();

});

test('view single product details', async ({ page, productsPageReady }) => {
  
  
    const productsPage = new ProductsPage(page);

    await productsPage.openFirstProduct();
    await productsPage.expectProductDetailsVisible();

});

test('filter product by category', async ({ page, productsPageReady }) => {
  
   
    const productsPage = new ProductsPage(page);

    await productsPage.filterByCategory(
        testProducts.category,
        testProducts.subcategory);   
    await productsPage.openFirstProduct();
    await productsPage.verifyProductCategory(testProducts.category);

});

test('filter product by brand', async ({ page, productsPageReady }) => {
  
    const productsPage = new ProductsPage(page);

    await productsPage.filterByBrand(testProducts.brand);
    await productsPage.openFirstProduct();
    await productsPage.verifyProductBrand(testProducts.brand);

});

test('search for product', async ({ page, productsPageReady }) => {

    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    await productsPage.searchProduct(testProducts.searchKeyword);
    await productsPage.verifySearchedProducts(testProducts.searchKeyword);
    await productsPage.expectProductsVisible();

});

test('add a review to product', async ({ page, productsPageReady }) => {

    const productsPage = new ProductsPage(page);

    await productsPage.openFirstProduct();
    await productsPage.submitProductReview(
        review.name,
        review.email,
        review.message
    );

});
