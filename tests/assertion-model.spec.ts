/*By default, failed assertion will terminate test execution. 
Playwright also supports soft assertions 
failed soft assertions do not terminate test execution, but mark the test as failed. */



import { test, expect } from '@playwright/test';


test('Autowaiting and forcing', async ({ page }) => {

  test.setTimeout(50000); // 50 secs
  // test.slow(); // 90 secs  ( Defaul is 30 secs) triple

  await page.goto('https://demowebshop.tricentis.com/');

  //Assertions - Auto wait works
  await expect(page).toHaveURL("https://demowebshop.tricentis.com/", { timeout: 10000 }); // 5s default timeout for assertions
  await expect(page.locator('text=Welcome to our store')).toBeVisible({ timeout: 10000 });

  //Actions - Auto wait works
  await page.locator('#small-searchterms').fill("Laptop", { force: true }); //search box - Force action( it will not so actionalibity checks)
  await page.locator('.button-1.search-box-button').click({ force: true }); // clicking on search button -Force action

});


test('Hard Vs Soft assertions', async ({ page }) => {

  await page.goto('https://demowebshop.tricentis.com/');

  //Hard assertions
  /*await expect(page).toHaveTitle('Demo Web Shop2'); //failed
  await expect(page).toHaveURL('https://demowebshop.tricentis.com/');
  
  const logo= page.locator("img[alt='Tricentis Demo Web Shop']");
  await expect(logo).toBeVisible();
*/

  //Soft assertions)
  await expect.soft(page).toHaveTitle('Demo Web Shop2'); //failed
  await expect.soft(page).toHaveURL('https://demowebshop.tricentis.com/');

  const logo = page.locator("img[alt='Tricentis Demo Web Shop']");
  await expect.soft(logo).toBeVisible();

  await page.waitForTimeout(5000);


});


test('Playwright Assertions Demo', async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/'); //30s

  // 1. Auto-retrying assertion (automatically retries until it passes or times out)
  await expect(page).toHaveURL("https://demowebshop.tricentis.com/"); // waits for correct URL // 5s

  // Auto-retry: waits for the element to be visible and have the expected text
  await expect(page.locator('text=Welcome to our store')).toBeVisible();
  await expect(page.locator("div[class='product-grid home-page-product-grid'] strong")).toHaveText('Featured products');


  // 2. Non-retrying assertion (executes immediately, no retry)
  const title = await page.title();
  expect(title.includes('Demo Web Shop')).toBeTruthy(); // no auto-retry

  const welcometext = await page.locator('text=Welcome to our store').textContent();
  expect(welcometext).toContain('Welcome'); // non-retrying


  // 3. Negating matcher ( applicable for both auto-retrying & Non-retrying assertions)
  await expect(page.locator('text=Welcome to our store')).not.toBeVisible(); // auto-retry
  expect(welcometext).not.toContain('Welcome'); // no auto-retry

  await page.waitForTimeout(5000);
});

test.only('test', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  await page.getByRole('textbox', { name: 'Enter Name' }).click();
  await page.getByRole('textbox', { name: 'Enter Name' }).fill('Abdul Rhamn');
  await page.getByRole('textbox', { name: 'Enter EMail' }).click();
  await page.getByRole('textbox', { name: 'Enter EMail' }).fill('abdrahman@gmail.,com');
  await page.getByRole('textbox', { name: 'Enter Phone' }).click();
  await page.getByRole('textbox', { name: 'Enter Phone' }).fill('9788041131');
  await page.getByRole('textbox', { name: 'Address:' }).click();
  await page.getByRole('textbox', { name: 'Address:' }).fill('habcicbbwdubewpi');
  await page.getByRole('radio', { name: 'Male', exact: true }).check();
  await page.getByRole('checkbox', { name: 'Monday' }).check();
  await page.getByLabel('Country:').selectOption('china');
  await page.getByLabel('Colors:').selectOption('blue');
  await page.getByLabel('Sorted List:').selectOption(['cat', 'cheetah', 'deer']);
  await page.locator('#datepicker').click();
  await page.locator('#ui-datepicker-div').getByRole('cell', { name: '16' }).click();
  await page.locator('#txtDate').click();
  await page.getByRole('link', { name: '13' }).click();
  await page.waitForTimeout(5000);
});