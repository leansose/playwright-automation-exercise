import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

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
    await productsPage.filterByCategory('Women', 'Dress');
    await productsPage.openFirstProduct();
    await productsPage.verifyProductCategory('Women');

});

test('filter product by brand', async ({ page }) => {
  
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    await homePage.open();
    await homePage.clickProductsButton();
    await productsPage.filterByBrand('Polo');
    await productsPage.openFirstProduct();
    await productsPage.verifyProductBrand('Polo');

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
