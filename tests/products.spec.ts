import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

import { testProducts } from '../test-data/products';
import { review } from '../test-data/review';

test('view products', async ({ page }) => {
  
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    await homePage.open();
    await homePage.clickProductsButton();
    await productsPage.expectProductsVisible();

});

test('view single product details', async ({ page }) => {
  
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    await homePage.open();
    await homePage.clickProductsButton();
    await productsPage.openFirstProduct();
    await productsPage.expectProductDetailsVisible();

});

test('filter product by category', async ({ page }) => {
  
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    await homePage.open();
    await homePage.clickProductsButton();
    await productsPage.filterByCategory(
        testProducts.category,
        testProducts.subcategory);   
    await productsPage.openFirstProduct();
    await productsPage.verifyProductCategory(testProducts.category);

});

test('filter product by brand', async ({ page }) => {
  
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    await homePage.open();
    await homePage.clickProductsButton();
    await productsPage.filterByBrand(testProducts.brand);
    await productsPage.openFirstProduct();
    await productsPage.verifyProductBrand(testProducts.brand);

});

test('add product to cart', async ({ page }) => {

    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await homePage.open();
    await homePage.clickProductsButton();
    await productsPage.openFirstProduct();
    await productsPage.addProductToCart();
    await productsPage.clickContinueShopping();
    await homePage.clickCartButton();
    await cartPage.verifyCartHasProducts();

});

test('search for product', async ({ page }) => {

    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    await homePage.open();
    await homePage.clickProductsButton();
    await productsPage.searchProduct(testProducts.searchKeyword);
    await productsPage.verifySearchedProducts(testProducts.searchKeyword);
    await productsPage.expectProductsVisible();

});

test.only('add a review to product', async ({ page }) => {

    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    await homePage.open();
    await homePage.clickProductsButton();
    await productsPage.openFirstProduct();

    await productsPage.submitProductReview(
        review.name,
        review.email,
        review.message
    );

});
