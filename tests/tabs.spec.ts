import { test, expect, Locator, chromium } from '@playwright/test';

test('Handle Tabs', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();


    await page.goto('https://testautomationpractice.blogspot.com/');

    context.waitForEvent('page');
    await page.locator("button:has-text('New Tab')").click();

    const [childPage] = await Promise.all([
        context.waitForEvent('page'),
        page.locator("button:has-text('New Tab')").click()
    ])





    // // Approach 1 - using context
    // const pages = await context.pages()
    // console.log('First page title', await pages[0].title());
    // console.log('First page title', await pages[1].title());
    // await page.waitForTimeout(5000);


    // const [childPage] = await Promise.all([context.waitForEvent('page'), page.locator("button:has-text('New Tab')").click()]);

    // page.locator("button:has-text('New Tab')").click()

    // //Approach - 2
    console.log('First page title', await page.title());
    console.log('First page title', await childPage.title());


});

test('Handle Popups', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://testautomationpractice.blogspot.com/');

    await Promise.all([
        page.waitForEvent('popup'),
        await page.locator("#PopUp").click()
    ]);


    const pages = context.pages();
    console.log('No. of Popups : ', pages.length);

    for (const popup of pages) {
        const title = await popup.title();
        console.log(title);
        if (title.includes('Playwright')) {
            await popup.locator('.getStarted_Sjon').click();

            await page.waitForTimeout(5000);

            await popup.close();
        }
    }

    await page.waitForTimeout(5000);
});


test.only('Authenticated Popup', async ({ browser }) => {
    const context = await browser.newContext({ httpCredentials: { username: 'admin', password: 'admin' } });
    // const context = await browser.newContext()
    const page = await context.newPage();


    //Approach 1 -> Passing the credentials in the URL
    // await page.goto('https://admin:admin@the-internet.herokuapp.com/basic_auth');   // https://username:password@url

    // await page.waitForTimeout(5000);

    // Approach 2 - To have credential at the context level
    await page.goto('https://the-internet.herokuapp.com/basic_auth');   // https://username:password@url
    await page.waitForTimeout(5000);


});