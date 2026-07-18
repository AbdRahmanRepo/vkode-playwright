/* annotations
-----------------
only
skip
fail
fixme
slow
*/

import { test, expect, Page } from '@playwright/test';



//only
test('test1', async ({ page }) => {
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle('Google');
});


//skip
test.skip('test2', async ({ page }) => {
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle('Google');
});


//skip -based on teh condition
test('test3', async ({ page, browserName }) => {
    test.skip(browserName === 'firefox', 'this test skipped if browser is firfox');
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle('Google');
});

//fail
test.fail('test4', async ({ page }) => {
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle('Google');
});


//fixme
test.fixme('test5', async ({ page }) => {
    await page.goto('https://www.google.com/');
    //No assertion
});


//slow
test('test6', async ({ page }) => {
    test.slow();  // triple the default timeout ( default : 30 secs, after tripling: 90 secs)
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle('Google');
});

// Grouping 



test.describe('Group1', async () => {

    test('Test1', async () => {
        console.log(" this is Test1 ......")
    });


    test('Test2', async () => {
        console.log(" this is Test2 ......")
    });

})


test.describe('Group2', async () => {

    test('Test3', async () => {
        console.log(" this is Test3 ......")
    });


    test('Test4', async () => {
        console.log(" this is Test4 ......")
    });

})



// Hooks
test.beforeAll('BeforeAll', async () => {
    console.log("this is Before All......")
})

test.afterAll('AfterAll', async () => {
    console.log("this is After All......")
})



test.beforeEach('Beforeach', async () => {

    console.log("this is Before each....")

})

test.afterEach('Aftereach', async () => {

    console.log("this is After each....")

})


test('Test1', async () => {
    console.log(" this is Test1 ......")
});

test('Test2', async () => {
    console.log(" this is Test2 ......")
});

test('Test3', async () => {
    console.log(" this is Test3 ......")
});

test('Test4', async () => {
    console.log(" this is Test4 ......")
});



// Hooks -2
/*
open app   -- beforeAll()

login  -- beforeEach()
    find products
logout  -- afterEach()

login
    add product to cart
logout

close app  -- afterAll()

*/

let page: Page;

test.beforeAll('Open app', async ({ browser }) => {

    page = await browser.newPage();

    await page.goto("https://www.demoblaze.com/index.html")

})

test.afterAll('Closing App', async () => {
    await page.close();
});


test.beforeEach('Login', async () => {

    await page.locator('#login2').click();
    await page.locator('#loginusername').fill('pavanol');
    await page.locator('#loginpassword').fill('test@123');
    await page.locator("button[onclick='logIn()']").click();
    await page.waitForTimeout(2000);
})

test.afterEach('Login', async () => {

    await page.locator('#logout2').click();
})


test.describe('mygroup', async () => {

    test('Find NoOf products', async () => {
        const products = page.locator('#tbodyid .hrefch');
        const count = await products.count();
        console.log('Number of products:', count);
        await expect(products).toHaveCount(9);
    });

    test('Add Product to cart', async () => {
        await page.locator("text='Samsung galaxy s6'").click();

        // Handle alert before the click
        page.on('dialog', async (dialog) => {
            expect(dialog.message()).toContain('Product added');
            await dialog.accept();
        });

        await page.locator('.btn.btn-success.btn-lg').click();
    });

})