import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

test('login with valid credentials', async ({ page }) => {
  
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  // Open and verify that home page is visible successfully and Consent button is clicked
  await homePage.open();
  // Click on 'Signup / Login' button
  await loginPage.clickSignupLoginButton();
  // Enter correct email address and password and click 'Login' button
  await loginPage.login('giuzesouza@gmail.com', 'qwert12345');
  // Verify that 'Logged in as username' is visible
  await loginPage.verifyLoggedInVisible();

});

test('login with invalid credentials', async ({ page }) => {

  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  // Open and verify that home page is visible successfully and Consent button is clicked
  await homePage.open();
  // Click on 'Signup / Login' button
  await loginPage.clickSignupLoginButton();
  // Enter incorrect email address and password and click 'Login' button
  await loginPage.login('invalid@gmail.com', 'invalid123');
  // Verify error 'Your email or password is incorrect!' is visible
  await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();

});

test('login with empty credentials', async ({ page }) => {

  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  // Open and verify that home page is visible successfully and Consent button is clicked
  await homePage.open();
  // Click on 'Signup / Login' button
  await loginPage.clickSignupLoginButton();
  // Click 'Login' button without entering email and password
  await page.locator('[data-qa="login-button"]').click();
  // Verify error 'Please enter your email or password!' is visible
  await expect(page.getByText('Please enter your email or password!')).toBeVisible();

});

test('logout user', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  // Open and verify that home page is visible successfully and Consent button is clicked
  await homePage.open();
  // Click on 'Signup / Login' button
  await loginPage.clickSignupLoginButton();
  // Enter correct email address and password and click 'Login' button
  await loginPage.login('giuzesouza@gmail.com', 'qwert12345');
  // Verify that 'Logged in as username' is visible
  await loginPage.verifyLoggedInVisible();
  // Click 'Logout' button
  await loginPage.clickLogoutButton();
});
