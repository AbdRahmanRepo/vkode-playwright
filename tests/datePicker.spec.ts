import { test, expect, Locator } from '@playwright/test';

test('Booking.com Date Picker Test - Check-in and Check-out', async ({ page }) => {
    await page.goto('https://www.booking.com/');

    // Click on the date picker field to open calendar
    await page.getByTestId('searchbox-dates-container').click();

    // ==== Check-in Date Selection ====
    let checkinYear: string = "2026";
    let checkinMonth: string = "July";
    let checkinDay: string = "20";

    // Navigate through the calendar to find the desired check-in month and year
    while (true) {
        const checkInMonthYear = await page.locator("h3[aria-live='polite']").nth(0).innerText();
        const currentMonth = checkInMonthYear.split(" ")[0];    //February 2026
        const currentYear = checkInMonthYear.split(" ")[1];

        if (currentMonth === checkinMonth && currentYear === checkinYear) {
            break;
        }
        else {
            await page.locator('button[aria-label="Next month"]').click();
        }
    }

    // Select the specific check-in date
    let allDates = await page.locator('table.b8fcb0c66a tbody').nth(0).locator('td').all();
    let checkinDateSelected = false;

    for (let date of allDates) {
        const dateText = await date.innerText();
        if (dateText === checkinDay) {
            await date.click();
            checkinDateSelected = true;
            break;
        }
    }

    // Assertion to confirm check-in date was selected
    expect(checkinDateSelected).toBeTruthy();


    // ==== Check-out Date Selection ====
    let checkoutYear: string = "2026";
    let checkoutMonth: string = "August";
    let checkoutDay: string = "25";

    // Navigate to the required check-out month and year
    while (true) {
        const checkOutMonthYear = await page.locator("h3[aria-live='polite']").nth(1).innerText();
        const currentMonth = checkOutMonthYear.split(" ")[0];
        const currentYear = checkOutMonthYear.split(" ")[1];

        if (currentMonth === checkoutMonth && currentYear === checkoutYear) {
            break;
        } else {
            await page.locator('button[aria-label="Next month"]').click();
        }
    }

    // Select the specific check-out date
    allDates = await page.locator('table.b8fcb0c66a tbody').nth(1).locator('td').all();
    let checkoutDateSelected = false;

    for (let date of allDates) {
        const dateText = await date.innerText();
        if (dateText === checkoutDay) {
            await date.click();
            checkoutDateSelected = true;
            break;
        }
    }

    // Assertion to confirm check-out date was selected
    expect(checkoutDateSelected).toBeTruthy();

    await page.waitForTimeout(5000); // just to visually observe the result during test run (optional)
});


test.only('Date Picker', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const datePicker: Locator = page.locator('input#datepicker');
    await expect(datePicker).toBeVisible();

    await datePicker.click();

    // await datePicker.fill('01/01/2023');

    const year = "2023";
    const month = "January";
    const day = "25";

    while (true) {
        const currentMonth = await page.locator('.ui-datepicker-month').innerText();
        const currentYear = await page.locator('.ui-datepicker-year').innerText();

        if (currentMonth === month && currentYear === year) {
            break;
        } else {
            await page.locator('.ui-datepicker-prev').click();
        }
    }

    const alldates = await page.locator('.ui-datepicker-calendar tbody tr td').all();

    for (let date of alldates) { //1-30
        const dateText = await date.innerText();
        if (dateText === day) {
            await date.click();
            break;
        }
    }


    await page.waitForTimeout(3000);

})
