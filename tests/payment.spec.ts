import { test, expect } from '../fixtures/test.fixture';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { PaymentPage } from '../pages/PaymentPage';

//test-data

import { userCreditCard } from '../test-data/user';

test.only('successfully payment', async ({ page, authenticatedUser  }) => {

    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const paymentPage = new PaymentPage(page);

    await homePage.clickProductsButton();
    await productsPage.openFirstProduct();
    await productsPage.addProductToCart();
    await productsPage.clickViewCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.placeOrder();

    await paymentPage.fillPaymentForm(
        userCreditCard.cardName,
        userCreditCard.cardNumber,
        userCreditCard.cvv,
        userCreditCard.month,
        userCreditCard.year
    );

    await paymentPage.submitPayment();
    await paymentPage.verifyOderPlaced();
    await paymentPage.downloadInvoice();
    await paymentPage.continueToHomePage();

});