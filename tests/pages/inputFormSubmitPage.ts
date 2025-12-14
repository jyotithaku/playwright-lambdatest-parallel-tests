import { Locator, Page, expect } from '@playwright/test';
 
export class InputFormSubmitPage {
    readonly page: Page;
    readonly inputFormSubmitLink: Locator;
    readonly submitButton: Locator;
    readonly errorMessage: Locator; // Locator for 'Please fill in the fields'
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly password: Locator;
    readonly company: Locator;
    readonly website: Locator;
    readonly city: Locator;
    readonly state: Locator;
    readonly zipcode: Locator;
    readonly address1: Locator;
    readonly address2: Locator;

    readonly countryDropdown: Locator;
    readonly successMessage: Locator; // Locator for 'Thanks for contacting us...'
 
    constructor(page: Page) {
        this.page = page;
        this.inputFormSubmitLink = page.getByRole('link', { name: 'Input Form Submit', exact: true });
        this.submitButton = page.getByRole('button', { name: 'Submit', exact: true });
        this.errorMessage = page.locator('//input[@name="name" and @type="text"]//following-sibling::div[text()="Please fill in the fields"]'); // Example locator for error
        this.nameInput = page.locator('//input[@placeholder="Name"]');
        this.emailInput = page.locator('//input[@placeholder="Email"]');
        this.password = page.locator('//input[@placeholder="Password"]');
        this.company = page.locator('//input[@placeholder="Company"]');
        this.website = page.locator('//input[@placeholder="Website"]');
        this.city = page.locator('//input[@placeholder="City"]');
        this.state = page.locator('//input[@placeholder="State"]');
        this.zipcode = page.locator('//input[@placeholder="Zip code"]');
        this.address1 = page.locator('//input[@placeholder="Address 1"]');
        this.address2 = page.locator('//input[@placeholder="Address 2"]');

        this.countryDropdown = page.locator('//select[@name="country"]');
        this.successMessage = page.locator('p.success-msg'); // Assuming a selector for the success message
    }
 
    async navigateToInputFormSubmit() {
        await this.inputFormSubmitLink.click();
        await this.page.waitForURL(/input-form-demo/);
    }
 
    async clickSubmit() {
        await this.submitButton.click();
    }
 
    async validateErrorMessage(expectedError: string) {
        // Note: Playwright assertions usually handle visibility and existence
        // For simple form validation, the browser's native error is often used.
        // For a visible error message on the page, you'd use the errorMessage locator.
        // For now, let's assume the error is displayed as text on the page.
        
        const message = await this.nameInput.evaluate((el:HTMLInputElement)=>el.validationMessage);
        await expect(message).toBe('Please fill out this field.');
    }
    
    async fillFormAndSubmit(data: { name: string, email: string, country: string,password:string,
        company:string,website:string,city:string,state:string,zipcode:string,address1:string,
        address2:string }) {
        await this.nameInput.fill(data.name);
        await this.emailInput.fill(data.email);
        await this.password.fill(data.password);
        await this.company.fill(data.company);
        await this.website.fill(data.website);
        await this.city.fill(data.city);
        await this.state.fill(data.state);
        await this.zipcode.fill(data.zipcode);
        await this.address1.fill(data.address1);
        await this.address2.fill(data.address2);
        await this.countryDropdown.selectOption(data.country); // Select by visible text
        await this.clickSubmit();
    }
 
    async validateSuccessMessage(expectedSuccess: string) {
        await expect(this.page.getByText(expectedSuccess)).toBeVisible();
    }
}