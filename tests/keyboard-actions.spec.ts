import { test, expect, Locator } from '@playwright/test';

test('Keyboard Actions', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    //To Find Element
    const input1 = page.locator('#input1');

    //To focus
    await input1.focus();

    //Text input
    await page.keyboard.insertText('Hello World');

    //Select the whole text
    await page.keyboard.down('Control');
    await page.keyboard.press('A');
    await page.keyboard.up('Control');

    await page.waitForTimeout(5000);

    //copy the whole text
    await page.keyboard.down('Control');
    await page.keyboard.press('C');
    await page.keyboard.up('Control');

    //Tab
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    //Paste
    await page.keyboard.down('Control');
    await page.keyboard.press('V');
    await page.keyboard.up('Control');

    //Tab
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    //Paste
    await page.keyboard.down('Control');
    await page.keyboard.press('V');
    await page.keyboard.up('Control');

    await page.waitForTimeout(5000);

});

test.only('keyboard simple way', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    //To Find Element
    const input1 = page.locator('#input1');

    //To focus
    await input1.focus();

    //Text input
    await page.keyboard.insertText('Hello World');

    //Select the whole text
    await page.keyboard.press('Control+A');


    //copy the whole text
    await page.keyboard.press('Control+C');

    //Tab
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    //Paste
    await page.keyboard.press('Control+V');

    //Tab
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    //Paste
    await page.keyboard.press('Control+V');

    await page.waitForTimeout(5000);


});