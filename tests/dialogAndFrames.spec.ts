import { test, Locator, expect } from '@playwright/test';

test('Dialog and Frames', async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    //Register a dialog handler
    page.on('dialog', async (dialog) => {        // Event Register
        console.log(dialog.type());
        expect(dialog.type()).toBe('alert');
        console.log(dialog.message());
        await dialog.accept();
        expect(dialog.message()).toContain('I am an alert box!');
    });


    page.locator('#alertBtn').click(); // alerts are auto-dismissible
    await page.waitForTimeout(5000);


})

test('confirmation dialog', async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    //Register a dialog handler
    page.on('dialog', async (dialog) => {
        console.log(dialog.type());
        expect(dialog.type()).toBe('confirm');
        console.log('Dialog Message : ', dialog.message());
        dialog.accept();
        // dialog.dismiss();

        const text = await page.locator('#demo').innerText();
        console.log(text);
        // expect(text).toBe('You pressed Cancel!');
        expect(text).toBe('You pressed OK!');
    });

    await page.locator('#confirmBtn').click();
    await page.waitForTimeout(5000);
})

test('prompt alert', async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    //Register a dialog handler
    page.on('dialog', async (dialog) => {
        console.log(dialog.type());
        expect(dialog.type()).toBe('prompt');
        console.log('Dialog Message : ', dialog.message());
        dialog.accept('Karthi');
        // dialog.dismiss();

        const text = await page.locator('#demo').innerText();
        console.log(text);
        // expect(text).toBe('You pressed Cancel!');
        expect(text).toContain('Abdul');
    });

    await page.locator('#promptBtn').click();
    await page.waitForTimeout(5000);
})



// Frames
test('frames', async ({ page }) => {
    await page.goto('https://ui.vision/demo/webtest/frames/');
    const frames = page.frames();
    console.log('No.Of Frames : ', frames.length);

    // // Approach 1 : URL
    // const frame = page.frame({ url: 'https://ui.vision/demo/webtest/frames/frame_1' })

    // if (frame) {
    //     await frame.locator("[name='mytext1']").fill('Karthi');
    // } else {
    //     console.log('Frame not found');
    // }


    // Approach 2 : Frame Locator
    const inputBox = page.frameLocator("[src='frame_1.html']").locator("[name='mytext1']");
    inputBox.fill('Karthi');

    await page.waitForTimeout(5000);
})


/*
An iframe (short for “inline frame”) is an HTML element that allows you to embed another HTML document within the current document. 
Iframes are commonly used to embed external content such as videos, maps, or other web pages (as seen here) into a web page without affecting the parent document.
*/



test.only("inner/child frames demo", async ({ page }) => {

    await page.goto('https://ui.vision/demo/webtest/frames/');

    const frame3 = page.frame({ url: 'https://ui.vision/demo/webtest/frames/frame_3' });

    if (frame3) {
        await frame3.locator("[name='mytext3']").fill("Welcome");
        const childFrames = frame3.childFrames();
        console.log("Child frames inside the Frame 3:", childFrames.length); // only 1 child frame exist
        const radio = childFrames[0].getByLabel("I am a human");
        await radio.check(); // select radio button
        await expect(radio).toBeChecked();// assertion
    }
    else {
        console.log("Frame 3 is not found..")
    }
    await page.waitForTimeout(5000);

})


