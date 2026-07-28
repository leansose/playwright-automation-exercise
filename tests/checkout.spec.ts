import { test, expect } from '../fixtures/test.fixture';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { RegisterPage } from '../pages/RegisterPage';

//test-data
import { generateRandomUser } from '../helpers/dataGenerator';
import { userAddress } from '../test-data/user';
import { myComment } from '../test-data/review';


test('place order with comment of one item', async ({ page, authenticatedUser  }) => {

    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await homePage.clickProductsButton();
    await productsPage.openFirstProduct();
    await productsPage.addProductToCart();
    await productsPage.clickViewCart();
    await cartPage.verifyCartHasProducts();
    await cartPage.proceedToCheckout();
    await checkoutPage.verifyTotalAmount();
    await checkoutPage.commentYourOrder(myComment.message);
    await checkoutPage.placeOrder();

});

test('place order with multiple items and verify total price', async ({ page, authenticatedUser  }) => {

    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);


    await homePage.clickProductsButton();
    await productsPage.addProductFromList(1);
    await productsPage.clickContinueShopping();
    await productsPage.addProductFromList(3);
    await productsPage.clickViewCart();
    await cartPage.verifyCartHasProducts();
    await cartPage.proceedToCheckout();
    await checkoutPage.verifyTotalAmount();
    await checkoutPage.placeOrder();

});

test('place order while registering new user', async ({ page}) => {

    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const registerPage = new RegisterPage(page);
    const checkoutPage = new CheckoutPage(page);
    const randomUser = generateRandomUser();

    await homePage.open();
    await homePage.clickProductsButton();
    await productsPage.openFirstProduct();
    await productsPage.addProductToCart();
    await productsPage.clickViewCart();
    await cartPage.verifyCartHasProducts();
    await cartPage.proceedToCheckoutByLoginRegister();

    await registerPage.fillSignUpForm(randomUser.user.name, randomUser.user.email);
    await registerPage.fillAccountInformation(
        randomUser.account.password,
        randomUser.account.day,
        randomUser.account.month,
        randomUser.account.year
    );

    await registerPage.fillCheckboxOptions();

    await registerPage.fillAddressInformation(
        randomUser.address.firstName,
        randomUser.address.lastName,
        randomUser.address.company,
        randomUser.address.address,
        randomUser.address.address2,
        randomUser.address.country,
        randomUser.address.state,
        randomUser.address.city,
        randomUser.address.zipcode,
        randomUser.address.mobileNumber
    );

    await registerPage.createAccount();
    await homePage.verifyUserLoggedIn();
    await homePage.clickCartButton();
    await cartPage.verifyCartHasProducts();
    await cartPage.proceedToCheckout();
    await checkoutPage.verifyTotalAmount();
    await checkoutPage.placeOrder();

    await homePage.deleteAccount();

});

test('verify address details in order after login', async ({ page, authenticatedUser }) => {

    const homePage = new HomePage(page);
    const checkoutPage = new CheckoutPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
   
    await homePage.clickProductsButton();
    await productsPage.openFirstProduct();
    await productsPage.addProductToCart();
    await productsPage.clickViewCart();
    await cartPage.verifyCartHasProducts();
    await cartPage.proceedToCheckout();

    await checkoutPage.verifyDeliveryAddress(userAddress);
    await checkoutPage.verifyBillingAddress(userAddress);

});

test('verify address details in order after registering', async ({ page, registeredUser }) => {

    const homePage = new HomePage(page);
    const checkoutPage = new CheckoutPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await homePage.clickProductsButton();
    await productsPage.openFirstProduct();
    await productsPage.addProductToCart();
    await productsPage.clickViewCart();
    await cartPage.verifyCartHasProducts();
    await cartPage.proceedToCheckout();

    await checkoutPage.verifyDeliveryAddress(registeredUser.address);
    await checkoutPage.verifyBillingAddress(registeredUser.address);

    await homePage.deleteAccount();

});



