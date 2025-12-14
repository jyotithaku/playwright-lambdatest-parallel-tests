import { Locator, Page, expect } from '@playwright/test';
 
export class SimpleFormPage {
    readonly page: Page;
    readonly menuLink: Locator; // Used in navigation (Scenario 1)
    readonly enterMessageInput: Locator; // Used as 1st locator
    readonly getCheckedValueButton: Locator;
    readonly yourMessageText: Locator; // Used as 2nd locator
    readonly simpleFormDemoLink: Locator;
 
    constructor(page: Page) {
        this.page = page;
        this.menuLink = page.locator('//li/a[text()="Simple Form Demo"]');
        this.enterMessageInput = page.getByPlaceholder('Please enter your Message');
        this.getCheckedValueButton = page.getByRole('button', { name: 'Get Checked Value' });
        this.yourMessageText = page.locator('#message'); // Used as 3rd locator
        this.simpleFormDemoLink = page.getByRole('link', { name: 'Simple Form Demo', exact: true });
    }
 
    async navigateToSimpleForm() {
        // Clicks the specific link on the main playground page
        await this.simpleFormDemoLink.click();
        await this.page.waitForURL(/simple-form-demo/);
    }
 
    async enterMessage(message: string) {
        await this.enterMessageInput.fill(message);
    }
 
    async clickGetCheckedValue() {
        await this.getCheckedValueButton.click();
    }
 
    async validateMessage(expectedMessage: string) {
        // Assertion with auto-wait for the text to appear/update
        await expect(this.yourMessageText).toHaveText(expectedMessage);
    }
}