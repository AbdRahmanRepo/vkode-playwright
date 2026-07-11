import { test, expect, Locator, chromium } from '@playwright/test';

// Browser -> Chrome, Firefox, Edge, Safari

// Context -> 

// Page

// Browser --> Context --> Page

test('Test title', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page1 = await context.newPage();
    const page2 = await context.newPage();


    await page1.goto('https://testautomationpractice.blogspot.com/');
    await page1.waitForTimeout(4000);

    await page2.goto('https://playwright.dev/');
    await page2.waitForTimeout(4000);
});