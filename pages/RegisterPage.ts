import { expect, Page } from '@playwright/test';

export class RegisterPage {
    constructor(private page: Page) {}

    // Fill the SignUp form
    async fillSignUpForm(name: string, email: string) {
        await this.page.locator('[data-qa="signup-name"]').fill(name);
        await this.page.locator('[data-qa="signup-email"]').fill(email);
        await this.page.locator('[data-qa="signup-button"]').click();

    }

    // Fill Account Information details
    async fillAccountInformation(password: string, day: string, month: string, year: string) {

        await this.page.getByRole('radio', { name: 'Mr.' }).check();
        await this.page.locator('[data-qa="password"]').fill(password);
        await this.page.locator('[data-qa="days"]').selectOption(day);
        await this.page.locator('[data-qa="months"]').selectOption(month);
        await this.page.locator('[data-qa="years"]').selectOption(year);

    }

    // Select checkboxes
    async fillCheckboxOptions() {

        await this.page.locator('[name="newsletter"]').check();
        await this.page.locator('[name="optin"]').check();
    }

    
    // Fill Address Information details
    async fillAddressInformation(
        firstName: string, 
        lastName: string, 
        company: string, 
        address: string, 
        address2: string, 
        country: string, 
        state: string, 
        city: string, 
        zipcode: string, 
        mobileNumber: string) 
        {
        
        await this.page.locator('[data-qa="first_name"]').fill(firstName);
        await this.page.locator('[data-qa="last_name"]').fill(lastName);
        await this.page.locator('[data-qa="company"]').fill(company);
        await this.page.locator('[data-qa="address"]').fill(address);
        await this.page.locator('[data-qa="address2"]').fill(address2);
        await this.page.locator('[data-qa="country"]').selectOption(country);
        await this.page.locator('[data-qa="state"]').fill(state);
        await this.page.locator('[data-qa="city"]').fill(city);
        await this.page.locator('[data-qa="zipcode"]').fill(zipcode);
        await this.page.locator('[data-qa="mobile_number"]').fill(mobileNumber);
    }

    // Create Account button
    async createAccount() {
        await this.page.locator('[data-qa="create-account"]').click();
        await expect(this.page.getByText('Account Created!')).toBeVisible();
        await this.page.locator('[data-qa="continue-button"]').click(); 
    }  

}