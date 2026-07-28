import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';

//test-data
import { generateRandomUser } from '../helpers/dataGenerator';
import { validUser } from '../test-data/user';

type AuthFixture = {
    authenticatedUser: void;
    registeredUser: ReturnType<typeof generateRandomUser>;
};

export const test = base.extend<AuthFixture>({

    authenticatedUser: async ({ page }, use) => {

        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);

        await homePage.open();
        await homePage.clickSignupLoginButton();

        await loginPage.login(
            validUser.email,
            validUser.password
        );

        await homePage.verifyUserLoggedIn();

        await use();

    },

    registeredUser: async ({ page }, use) => {

        const homePage = new HomePage(page);
        const registerPage = new RegisterPage(page);
        const randomUser = generateRandomUser();

        await homePage.open();
        await homePage.clickSignupLoginButton();
        
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

        await use(randomUser);

    }

});

export { expect };