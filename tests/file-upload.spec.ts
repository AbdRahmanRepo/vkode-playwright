import { test, expect } from '@playwright/test';

test('Single File Upload', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    await page.locator('#multipleFilesInput').setInputFiles(['files/Actions.pdf', 'files/my-foods.csv']);
    await page.locator('button:has-text("Upload Multiple Files")').click();

    // const msg = await page.locator('#singleFileStatus').innerText();

    // expect(msg).toContain('Actions.pdf');

    await page.waitForTimeout(5000);


});