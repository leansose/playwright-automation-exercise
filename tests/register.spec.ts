import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/RegisterPage';


test('register new user', async ({ page }) => {

    const homePage = new HomePage(page);
    const registerPage = new RegisterPage(page);

    await homePage.open();

    await homePage.clickSignupLoginButton();

    await registerPage.fillSignUpForm('Dummy User', 'fetapep260@rapplo.com');

    await expect(page.getByText('Enter Account Information')).toBeVisible();

    await registerPage.fillAccountInformation('qwert12345', '1', 'January', '2000');

    await expect(page.getByText('Address Information')).toBeVisible();

    await registerPage.fillAddressInformation(
        'Dummy',
        'User',
        'Dummy Company',
        '123 Main St',
        'Apt 4B',
        'United States',
        'California',
        'Los Angeles',
        '90001',
        '+1234567890'
    );

    await registerPage.fillCheckboxOptions();

    await registerPage.createAccount();
   
    await homePage.verifyUserLoggedIn();

    await homePage.deleteAccount();

});

test('register an existing email', async ({ page }) => {

    const homePage = new HomePage(page);
    const registerPage = new RegisterPage(page);

    await homePage.open();

    await homePage.clickSignupLoginButton();

    await registerPage.fillSignUpForm('Dummy User', 'giuzesouza@gmail.com');

    await expect(page.getByText('Email Address already exist!')).toBeVisible();

});