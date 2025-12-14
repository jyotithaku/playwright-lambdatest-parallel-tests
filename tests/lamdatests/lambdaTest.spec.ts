import { test, expect } from '@playwright/test';
import { SimpleFormPage } from '../pages/simpleFormPage';
import { DragDropSliderPage } from '../pages/dragDropSliderPage';
import { InputFormSubmitPage } from '../pages/inputFormSubmitPage';
 
// Base URL provided in the instructions
const BASE_URL = 'https://www.lambdatest.com/selenium-playground';
 
test.describe('LambdaTest Scenarios', () => {
 
    test.beforeEach(async ({ page }) => {
        // Navigate to the main playground page before each test
        await page.goto(BASE_URL);
    });
 
    // --- Scenario 1: Simple Form Demo ---
    test('Scenario 1: Simple Form Message Validation', async ({ page }) => {
        const simpleFormPage = new SimpleFormPage(page);
        
        // 1. Open Simple Form Demo and validate URL
        await simpleFormPage.simpleFormDemoLink.click();
        await expect(page).toHaveURL(/simple-form-demo/);
 
        // 2. Create a variable and use it for input
        const messageText = 'Welcome to LambdaTest';
 
        // 3. Enter message and click button
        await simpleFormPage.enterMessage(messageText);
        await simpleFormPage.clickGetCheckedValue();
 
        // 4. Validate the message displayed 
        await simpleFormPage.validateMessage(messageText);
        
        console.log('Scenario 1 Passed: Simple Form Message validated successfully.');
    });
 
    // --- Scenario 2: Drag & Drop Sliders ---
    test('Scenario 2: Drag & Drop Slider to 95', async ({ page }) => {
        const sliderPage = new DragDropSliderPage(page);
 
        // 1. Open Drag & Drop Sliders page
        await sliderPage.navigateToDragDropSlider();
 
        // 2. Select the slider 'Default value 15' and drag to make it 95
        const targetValue = '95';
        await sliderPage.dragSliderToValue(targetValue);
 
        // 3. Validate whether the range value shows 95
        await sliderPage.validateRangeValue(targetValue);
 
        console.log('Scenario 2 Passed: Slider value validated successfully as 95.');
    });
 
    // --- Scenario 3: Input Form Submit ---
    test('Scenario 3: Input Form Submission and Validation', async ({ page }) => {
        const inputFormPage = new InputFormSubmitPage(page);
 
        // 1. Open Input Form Submit page
        await inputFormPage.navigateToInputFormSubmit();
 
        // 2. Click "Submit" without filling in any information
        await inputFormPage.clickSubmit();
 
        // 3. Assert "Please fill in the fields" error message (Uses a temporary text locator for the error)
        const expectedError = 'Please fill out this field.';
        // Note: Browser native validation is tricky. We'll assert for the text appearing somewhere.
        // If the form uses HTML5 validation, you might need to use page.evaluate() to check validity.
        // Assuming a visible error message on the page for this exercise.
        await inputFormPage.validateErrorMessage(expectedError);
 
 
        // 4. Fill in fields and click "Submit"
        const formData = {
            name: 'John Doe',
            email: 'john.doe@test.com',
            country: 'United States',
            password: 'Password123',
            company: 'LambdaTest',
            website: 'www.lambdatest.com',
            city: 'San Francisco',
            state: 'CA',
            zipcode: '94105',
            address1: '123 Main St',
            address2: 'Apt 4B'
        };
        const expectedSuccess = 'Thanks for contacting us, we will get back to you shortly.';
        
        // This time, we fill the fields
        await inputFormPage.fillFormAndSubmit(formData);
 
        // 5. Validate the success message
        await inputFormPage.validateSuccessMessage(expectedSuccess);
 
        console.log('Scenario 3 Passed: Form submission and success message validated.');
    });
});