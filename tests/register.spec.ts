import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';


test('register new user', async ({ page }) => {

    const homePage = new HomePage(page);

    // Open and verify that home page is visible successfully and Consent button is clicked
    await homePage.open();

    // Click on 'Signup / Login' button
    await page.getByRole('link', { name: 'Signup / Login' }).click();

    // Verify 'New User Signup!' is visible
    await expect(page.getByText('New User Signup!')).toBeVisible();

    // Enter name and email address and click 'Signup' button
    await page.locator('[data-qa="signup-name"]').fill('Dummy User');
    await page.locator('[data-qa="signup-email"]').fill('fetapep260@rapplo.com');
    await page.locator('[data-qa="signup-button"]').click();

    // Verify that 'ENTER ACCOUNT INFORMATION' is visible
    await expect(page.getByText('Enter Account Information')).toBeVisible();

    // Fill details: Title, Name, Email, Password, Date of birth
    await page.getByRole('radio', { name: 'Mr.' }).check();
    await page.locator('[data-qa="password"]').fill('qwert12345');
    await page.locator('[data-qa="days"]').selectOption('1');
    await page.locator('[data-qa="months"]').selectOption('January');
    await page.locator('[data-qa="years"]').selectOption('2000');

    // Select checkbox 'Sign up for our newsletter!'
    await page.locator('[name="newsletter"]').check();

    // Select checkbox 'Receive special offers from our partners!'
    await page.locator('[name="optin"]').check();

    // Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
    await page.locator('[data-qa="first_name"]').fill('Dummy');
    await page.locator('[data-qa="last_name"]').fill('User');
    await page.locator('[data-qa="company"]').fill('Dummy Company');
    await page.locator('[data-qa="address"]').fill('123 Main St');
    await page.locator('[data-qa="address2"]').fill('Apt 4B');
    await page.locator('[data-qa="country"]').selectOption('United States');
    await page.locator('[data-qa="state"]').fill('California');
    await page.locator('[data-qa="city"]').fill('Los Angeles');
    await page.locator('[data-qa="zipcode"]').fill('90001');
    await page.locator('[data-qa="mobile_number"]').fill('+1234567890');

    // Click 'Create Account' button
    await page.locator('[data-qa="create-account"]').click();

    // Verify that 'ACCOUNT CREATED!' is visible
    await expect(page.getByText('Account Created!')).toBeVisible(); 

    // Click 'Continue' button
    await page.locator('[data-qa="continue-button"]').click();

    // Verify that 'Logged in as username' is visible
    await expect(page.getByText('Logged in as')).toBeVisible();

    // Click 'Delete Account' button
    await page.getByRole('link', { name: 'Delete Account' }).click();

    // Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
    await expect(page.getByText('Account Deleted!')).toBeVisible();
    await page.locator('[data-qa="continue-button"]').click();

});
