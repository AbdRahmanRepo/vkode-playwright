import { test, expect, Locator } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { HomePage } from '../pages/homePage';



test.describe("Product Add to cart ", async () => {

    test('Add Product to cart', async ({ page }) => {
        await page.goto('https://www.demoblaze.com/index.html');
        const pageUrl = page.url();
        expect(pageUrl).toContain('demoblaze.com');




        // To Login
        await page.getByRole('link', { name: 'Log in' }).click();
        await page.locator('#loginusername').fill('pavanol');
        await page.locator('#loginpassword').fill('test@123');
        await page.getByRole('button', { name: 'Log in' }).click();
        await page.waitForTimeout(10000);
        const username = await page.locator('#nameofuser');
        expect(username).toContainText('pavanol');



        // To Click the product and verify
        await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
        const productName = await page.locator('h2.name').innerText();
        expect(productName).toContain('Samsung galaxy s6');


        //Add to cart
        await page.getByRole('link', { name: 'Add to cart' }).click();
        page.on('dialog', async (dialog) => {
            console.log(dialog.type());
            dialog.accept();
        });

        await page.waitForTimeout(2000);

        //Verify the Product Inside the cart
        await page.locator('#cartur').click();
        const allProduct = await page.locator('#tbodyid tr').all();
        for (let product of allProduct) {
            const productName = await product.locator('td:nth-child(2)').innerText();
            if (productName === 'Samsung galaxy s6') {
                console.log('Product Name Verified Successfully, Name is : ', productName);
                break;
            }
        }

        await page.waitForTimeout(5000);


        // Add to cart another product



    });

    test.only('Add laptop to cart', async ({ page }) => {
        await page.goto('https://www.demoblaze.com/index.html');

        const login = new LoginPage(page);

        login.clickLoginButton1();
        login.loginTo('pavanol', 'test@123');
        expect(page.url()).toContain('https://www.demoblaze.com/index.html');

        const homepage = new HomePage(page);
        homepage.clickOnProduct();


        await page.waitForTimeout(5000);

    });

    test('Add product to cart', async ({ page }) => {
        await page.goto('https://www.demoblaze.com/index.html');

        const login = new LoginPage(page);

        login.clickLoginButton1();
        login.loginTo('pavanol', 'test@123');
        expect(page.url()).toContain('https://www.demoblaze.com/index.html');

    });

})