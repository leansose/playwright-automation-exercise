import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

test('delete item from cart', async ({ page }) => {

    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await homePage.open();
    await homePage.clickProductsButton();
    await productsPage.openFirstProduct();
    await productsPage.addProductToCart();
    await productsPage.clickViewCart();
    await cartPage.removeItemFromCart(0);
    await cartPage.verifyCartIsEmpty();

});

test('verify product quantity in cart', async ({ page }) => {

    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await homePage.open();
    await homePage.clickProductsButton();
    await productsPage.openFirstProduct();
    await productsPage.addQuantityToProduct(2);
    await productsPage.addProductToCart();
    await productsPage.clickViewCart();
    await cartPage.verifyQuantityInCart(2);

});