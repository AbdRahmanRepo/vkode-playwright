import { test, expect, Locator } from '@playwright/test';

test('Mouse Actions', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const pointMeBtn = page.locator('.dropbtn');
    await pointMeBtn.hover();

    const laptopBtn = await page.locator('.dropdown-content a:nth-child(2)');
    await laptopBtn.hover();

    await page.waitForTimeout(5000);


});

test('Mouse Right Click Action', async ({ page }) => {

    await page.goto('https://swisnl.github.io/jQuery-contextMenu/demo.html');
    const rightClickBtn = page.locator('.context-menu-one');
    await page.waitForTimeout(2000);
    await rightClickBtn.click({ button: 'right' });
    await page.waitForTimeout(5000);

});

test('Mouse Double Click Action', async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.locator("text='Copy Text'").dblclick();

    const field2 = page.locator('#field2');
    expect(field2).toHaveValue('Hello World!');

    await page.waitForTimeout(5000);

});

test.only('Drag and Drop Action', async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    const dragEle = page.locator('#draggable');
    const dropEle = page.locator('#droppable');

    // Approach 1 : using mouse actions drag drop
    // await dragEle.hover();
    // await page.mouse.down();
    // await dropEle.hover();
    // await page.mouse.up();

    // Approach 2 : Using dragAndDrop method
    await dragEle.dragTo(dropEle);

    await page.waitForTimeout(5000);

});






