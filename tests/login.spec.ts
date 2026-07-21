import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

test('login with valid credentials', async ({ page }) => {
  
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  await homePage.open();
  await homePage.clickSignupLoginButton();
  await loginPage.login('giuzesouza@gmail.com', 'qwert12345');
  await homePage.verifyUserLoggedIn();

});

test('login with invalid credentials', async ({ page }) => {

  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  await homePage.open();
  await homePage.clickSignupLoginButton();
  await loginPage.login('invalid@gmail.com', 'invalid123');
  await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();

});

test('login with valid email and invalid password', async ({ page }) => {

  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  await homePage.open();
  await homePage.clickSignupLoginButton();
  await loginPage.login('giuzesouza@gmail.com', 'invalid123');
  await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();

});

test('login with invalid email and valid password', async ({ page }) => {

  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  await homePage.open();
  await homePage.clickSignupLoginButton();
  await loginPage.login('invalid@gmail.com', 'qwert12345');
  await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();

});

test('logout user', async ({ page }) => {

  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  await homePage.open();
  await homePage.clickSignupLoginButton();
  await loginPage.login('giuzesouza@gmail.com', 'qwert12345');
  await homePage.verifyUserLoggedIn();
  await homePage.clickLogoutButton();
  
});

test.skip('login with empty credentials', async ({ page }) => {

  // Not automated.
  // This scenario relies on native HTML5 browser validation does not provide a way to assert a validation message.
  // Chrome displays a validation tooltip, while Firefox highlights the required field.
  // Since the validation UI is browser-dependent and not part of the DOM,
  // this scenario is intentionally excluded from automation.

  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  await homePage.open();
  await homePage.clickSignupLoginButton();
  await loginPage.login('', '');
  await expect(page.getByText('Please enter your email or password!')).toBeVisible();

});
