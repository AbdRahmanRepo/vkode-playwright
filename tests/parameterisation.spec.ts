import { test, expect } from '@playwright/test';
import fs from 'fs';
import { parse } from 'csv-parse/sync';
import * as XLSX from 'xlsx';

//testdata
// const searchItems: string[] = ['laptop', 'Gift card', 'smartphone', 'monitor'];

//using for-of loop
/*
for (const item of searchItems) {
    test(`search test for ${item}`, async ({ page }) => {
        await page.goto('https://demowebshop.tricentis.com/');
        await page.locator('#small-searchterms').fill(item);  // fill teh text in search box
        await page.locator("input[value='Search']").click();      // click on the button
        await expect.soft(page.locator('h2 a').nth(0)).toContainText(item, { ignoreCase: true });  //  check if results appear
    });
}
*/


//using forEach function
/*
searchItems.forEach((item)=>{
    test(`search test for ${item}`,async ({ page }) => {
            await page.goto('https://demowebshop.tricentis.com/');
            await page.locator('#small-searchterms').fill(item);  // fill teh text in search box
            await page.locator("input[value='Search']").click();      // click on the button
            await expect.soft(page.locator('h2 a').nth(0)).toContainText(item, { ignoreCase: true });  //  check if results appear
        });

})
*/


//describe
// test.describe("searching items", async () => {

//     searchItems.forEach((item) => {
//         test(`search test for ${item}`, async ({ page }) => {
//             await page.goto('https://demowebshop.tricentis.com/');
//             await page.locator('#small-searchterms').fill(item);  // fill teh text in search box
//             await page.locator("input[value='Search']").click();      // click on the button
//             await expect.soft(page.locator('h2 a').nth(0)).toContainText(item, { ignoreCase: true });  //  check if results appear
//         });

//     })


// })
// const loginTestData: string[][] = [
//     ["laura.taylor1234@example.com", "test123", "valid"],
//     ["invaliduser@example.com", "test321", "invalid"],
//     ["validuser@example.com", "testxyz", "invalid"],
//     ["", "", "invalid"],
// ];


// for (const [email, password, validity] of loginTestData) {

//     test.describe('Login data driven test', async () => {

//         test(`Login test for ${email} and ${password}`, async ({ page }) => {

//             await page.goto('https://demowebshop.tricentis.com/login');

//             // Fill login form
//             await page.locator('#Email').fill(email);
//             await page.locator('#Password').fill(password);
//             await page.locator('input[value="Log in"]').click();

//             if (validity.toLowerCase() === 'valid') {
//                 // Assert logout link is visible - indicates successful login
//                 const logoutLink = page.locator('a[href="/logout"]');
//                 await expect(logoutLink).toBeVisible({ timeout: 5000 });

//             } else {
//                 // Assert error message is visible
//                 const errorMessage = page.locator('.validation-summary-errors');
//                 await expect(errorMessage).toBeVisible({ timeout: 5000 });

//                 // Assert user is still on the login page
//                 await expect(page).toHaveURL('https://demowebshop.tricentis.com/login');
//             }

//         })
//     })

// }

//Reading data from json
const jsonPath = "testdata/data.json";
const loginData: any = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

//main test
test.describe('Login data driven test', async () => {

    for (const { email, password, validity } of loginData) {
        test(`Login test with email: "${email}" and password: "${password}"`, async ({ page }) => {
            await page.goto('https://demowebshop.tricentis.com/login');

            // Fill login form
            await page.locator('#Email').fill(email);
            await page.locator('#Password').fill(password);
            await page.locator('input[value="Log in"]').click();

            if (validity.toLowerCase() === 'valid') {
                // Assert logout link is visible - indicates successful login
                const logoutLink = page.locator('a[href="/logout"]');
                await expect(logoutLink).toBeVisible({ timeout: 5000 });
            } else {
                // Assert error message is visible
                const errorMessage = page.locator('.validation-summary-errors');
                await expect(errorMessage).toBeVisible({ timeout: 5000 });

                // Assert user is still on the login page
                await expect(page).toHaveURL('https://demowebshop.tricentis.com/login');

            }
            await page.waitForTimeout(4000);
        });
    }
});