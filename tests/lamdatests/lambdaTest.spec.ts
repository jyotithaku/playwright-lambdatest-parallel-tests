import { test, expect } from '@playwright/test';
import { chromium, Browser } from 'playwright-core';

import { SimpleFormPage } from '../pages/simpleFormPage';
import { DragDropSliderPage } from '../pages/dragDropSliderPage';
import { InputFormSubmitPage } from '../pages/inputFormSubmitPage';

const BASE_URL = 'https://www.lambdatest.com/selenium-playground';

let browser: Browser;

test.describe('LambdaTest Scenarios', () => {

  // 🔹 CONNECT TO LAMBDATEST ONCE
  test.beforeAll(async () => {
    const capabilities = {
      browserName: 'Chrome',
      browserVersion: 'latest',
      'LT:Options': {
        platform: 'Windows 11',
        build: 'Playwright Existing Project',
        name: '3 LambdaTest Scenarios',
        user: process.env.LT_USERNAME,
        accessKey: process.env.LT_ACCESS_KEY,
        network: true,
        video: true,
        console: true
      }
    };

    const wsEndpoint =
      `wss://cdp.lambdatest.com/playwright?capabilities=` +
      encodeURIComponent(JSON.stringify(capabilities));

    browser = await chromium.connect(wsEndpoint);
  });

  // 🔹 CREATE NEW PAGE FOR EACH TEST
  test.beforeEach(async ({}, testInfo) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    // attach page to testInfo
    (testInfo as any).page = page;

    await page.goto(BASE_URL);
  });

  // 🔹 CLEANUP
  test.afterEach(async ({}, testInfo) => {
    const page = (testInfo as any).page;
    const context = page.context();
    await page.close();
    await context.close();
  });

  test.afterAll(async () => {
    await browser.close();
  });

  // ---------------- SCENARIO 1 ----------------
  test('Scenario 1: Simple Form Message Validation', async ({}, testInfo) => {
    const page = (testInfo as any).page;
    const simpleFormPage = new SimpleFormPage(page);

    await simpleFormPage.simpleFormDemoLink.click();
    await expect(page).toHaveURL(/simple-form-demo/);

    const messageText = 'Welcome to LambdaTest';
    await simpleFormPage.enterMessage(messageText);
    await simpleFormPage.clickGetCheckedValue();
    await simpleFormPage.validateMessage(messageText);
  });

  // ---------------- SCENARIO 2 ----------------
  test('Scenario 2: Drag & Drop Slider to 95', async ({}, testInfo) => {
    const page = (testInfo as any).page;
    const sliderPage = new DragDropSliderPage(page);

    await sliderPage.navigateToDragDropSlider();
    await sliderPage.dragSliderToValue('95');
    await sliderPage.validateRangeValue('95');
  });

  // ---------------- SCENARIO 3 ----------------
  test('Scenario 3: Input Form Submission and Validation', async ({}, testInfo) => {
    const page = (testInfo as any).page;
    const inputFormPage = new InputFormSubmitPage(page);

    await inputFormPage.navigateToInputFormSubmit();
    await inputFormPage.clickSubmit();

    await inputFormPage.validateErrorMessage('Please fill out this field.');

    await inputFormPage.fillFormAndSubmit({
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
    });

    await inputFormPage.validateSuccessMessage(
      'Thanks for contacting us, we will get back to you shortly.'
    );
  });
});
