import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/RegisterPage';

//test-data
import { validUser } from '../test-data/user';
import { generateRandomUser } from '../helpers/dataGenerator';


test('register new user', async ({ page }) => {

    const homePage = new HomePage(page);
    const registerPage = new RegisterPage(page);
    const randomUser = generateRandomUser();

    await homePage.open();

    await homePage.clickSignupLoginButton();

    await registerPage.fillSignUpForm(randomUser.user.name, randomUser.user.email);

    await expect(page.getByText('Enter Account Information')).toBeVisible();

    await registerPage.fillAccountInformation(
        randomUser.account.password,
        randomUser.account.day,
        randomUser.account.month,
        randomUser.account.year
    );

    await expect(page.getByText('Address Information')).toBeVisible();

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

    await homePage.deleteAccount();

});

test('register an existing email', async ({ page }) => {

    const homePage = new HomePage(page);
    const registerPage = new RegisterPage(page);

    await homePage.open();

    await homePage.clickSignupLoginButton();

    await registerPage.fillSignUpForm(validUser.name, validUser.email);

    await expect(page.getByText('Email Address already exist!')).toBeVisible();

});