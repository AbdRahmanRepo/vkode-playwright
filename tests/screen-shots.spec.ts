import { test, expect } from '@playwright/test'


test('screenshots demo', async ({ page }) => {

    await page.goto("https://demowebshop.tricentis.com/")

    const timestamp = Date.now();

    //page screenshot
    // await page.screenshot
    // await page.screenshot({ path: 'screenshots/' + 'homepage' + timestamp + '.png' })

    //full page screenshot
    // await page.screenshot({ path: 'screenshots/' + 'fullpage' + timestamp + '.png', fullPage: true })

    // //element screenshot
    // const logo = page.locator("#nivo-slider");
    // await logo.screenshot({ path: 'screenshots/' + 'logo' + timestamp + '.png' })

    //await page.locator("img[alt='Tricentis Demo Web Shop']").screenshot({path:'screenshots/'+'logo'+timestamp+'.png'})

    // await page.locator('.product-grid.home-page-product-grid').screenshot({ path: 'screenshots/' + 'featuredproducts' + timestamp + '.png' })

})
// Fail intentionally
test('screenshots from config', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/index.html');
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.locator('#loginusername').fill('pavanol');
    await page.locator('#loginpassword').fill('test@123X'); //password incorrect
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
    await expect(page.locator('#nameofuser')).toContainText('Welcome pavanol');

})

test.only('tracing test', async ({ page, context }) => {


    // context.tracing.start({ screenshots: true, snapshots: true });

    await page.goto('https://www.demoblaze.com/index.html');
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.locator('#loginusername').fill('pavanol');
    await page.locator('#loginpassword').fill('test@123');
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
    await expect(page.locator('#nameofuser')).toContainText('Welcome pavanol');

    // context.tracing.stop({ path: 'trace.zip' });

});

test.skip('flaky test', async ({ page }) => {

    await page.goto('https://www.demoblaze.com/index.html');
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.locator('#loginusername').fill('pavanol');
    await page.locator('#loginpassword').fill('test@123');
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForTimeout(10000);
    await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
    await expect(page.locator('#nameofuser')).toContainText('Welcome pavanol');

});