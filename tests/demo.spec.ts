import { test, expect, Locator } from '@playwright/test'; // import 'name of the imports' from 'location'


// test("Test title", function(){}) - predefined library method
// Fixtures - page - reusable components which has set of reusable methods to simplify the code
test.skip('Page Title', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'); // Webpage
    await page.waitForTimeout(4000);
    // await page.getByPlaceholder('Username').fill('Admin');
    // await page.waitForTimeout(2000);
    // await page.getByPlaceholder('Password').fill('admin123');
    // await page.waitForTimeout(2000);
    // await page.getByRole('button', { name: 'Login' }).click();
    // await page.waitForTimeout(2000);
});


test('Test title', async ({ page }) => {
    await page.goto('https://demoqa.com/automation-practice-form');
    await page.waitForTimeout(4000);
    let name: Locator = page.locator("input#firstName");
    await name.isVisible();
    await name.isEnabled();
    await name.fill("John");
    await page.waitForTimeout(4000);

    let gender: Locator = page.locator("input#gender-radio-1");
    await gender.isVisible();
    await gender.isEnabled();
    expect(await gender.isChecked()).toBe(false);
    await gender.check();
    await page.waitForTimeout(4000);
})


// npx playwright test demo.spec.ts --headed - 