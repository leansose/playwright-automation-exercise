import { test, expect } from '../fixtures/test.fixture';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';


test('add product to cart', async ({ page, productsPageReady }) => {

    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.openFirstProduct();
    await productsPage.addToCartFromDetailsPage();
    await productsPage.clickContinueShopping();
    await homePage.openCartPage();
    await cartPage.verifyCartHasProducts();

});

test('add multiple products to cart from list of products', async ({ page, productsPageReady }) => {

    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.addToCartFromList(1);
    await productsPage.clickContinueShopping();
    await productsPage.addToCartFromList(3);
    await productsPage.clickViewCart();
    await cartPage.verifyCartHasProducts();

});

test('add multiple products to cart from products details', async ({ page, productsPageReady }) => {

    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.openProductDetails(1);
    await productsPage.addQuantity(2)
    await productsPage.addToCartFromDetailsPage();
    await productsPage.clickContinueShopping();
    await homePage.openProductsPage();
    await productsPage.openProductDetails(3);
    await productsPage.addQuantity(2);
    await productsPage.addToCartFromDetailsPage();
    await productsPage.clickViewCart();
    await cartPage.verifyCartHasProducts();

});

test('delete item from cart', async ({ page, productsPageReady }) => {

    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.openFirstProduct();
    await productsPage.addToCartFromDetailsPage();
    await productsPage.clickViewCart();
    await cartPage.removeItem(0);
    await cartPage.verifyCartIsEmpty();

});

test('verify product quantity in cart', async ({ page, productsPageReady }) => {

    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.openFirstProduct();
    await productsPage.addQuantity(2);
    await productsPage.addToCartFromDetailsPage();
    await productsPage.clickViewCart();
    await cartPage.verifyItemQuantity(0,2); // insert index of item in cart and expected quantity

});

test('verify item total price', async ({ page, productsPageReady }) => {

    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.openFirstProduct();
    await productsPage.addQuantity(2);
    await productsPage.addToCartFromDetailsPage();
    await productsPage.clickViewCart();
    await cartPage.verifyItemTotalPrice(0); // insert index of item in cart

});