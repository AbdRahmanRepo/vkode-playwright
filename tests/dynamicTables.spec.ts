import { test, expect, Locator } from '@playwright/test';

test("Verify Chrome CPU load in dynamic table", async ({ page }) => {

    await page.goto("https://practice.expandtesting.com/dynamic-table");

    const table: Locator = page.locator("table.table tbody");
    await expect(table).toBeVisible();

    //Select all the rows, then find number of rows
    const rows: Locator[] = await table.locator("tr").all();
    console.log("Number of rows in a table:", rows.length);
    expect(rows).toHaveLength(4);


    //Step 1: For Chrome process get value of CPU load.
    // Read each row o check Chrome presence

    let cpuLoad = '';

    for (const row of rows) {
        const processName: string = await row.locator("td").nth(0).innerText();
        if (processName === "Chrome") {
            cpuLoad = await row.locator('td:has-text("%")').innerText(); //(OR) cpuLoad=await row.locator("td",{hasText:'%'}).innerText();
            console.log("CPU Load of Chrome:", cpuLoad); //2.9%
            break;
        }
    }

    //Step2: Compare it with value in the yellow label.
    let yellowboxtext: string = await page.locator("#chrome-cpu").innerText();
    console.log("Chrome CPU load from yellow box:", yellowboxtext);

    if (yellowboxtext.includes(cpuLoad)) {
        console.log("CPU load of Chrome is equal.");
    } else {
        console.log("CPU load of Chrome is Not equal.");
    }

    expect(yellowboxtext).toContain(cpuLoad);

    await page.waitForTimeout(5000);

})

test("Read data from all the table pages", async ({ page }) => {

    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    let hasmorepages = true;

    while (hasmorepages) {
        const rows = await page.locator("#example tbody tr").all();
        for (let row of rows) {
            console.log(await row.innerText());
        }
        await page.waitForTimeout(2000);
        //button[aria-label='Next']
        //button[aria-controls='example']:has-text("›")
        //button[aria-controls='example']:nth-child(9)

        const nextButton: Locator = page.locator("button[aria-label='Next']");
        const isDisabled = await nextButton.getAttribute('class'); // dt-paging-button disabled next

        if (isDisabled?.includes('disabled')) {
            hasmorepages = false;
        }
        else {
            await nextButton.click()
        }
    }

});


test("Filter the rows and check the rows count", async ({ page }) => {

    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    const dropdown: Locator = page.locator("#dt-length-0");
    await dropdown.selectOption({ label: '25' });

    //Appraoch 1
    const rows = await page.locator("#example tbody tr").all();
    expect(rows.length).toBe(25); //assertion

    //Appraoch2
    const rows2 = page.locator("#example tbody tr");
    await expect(rows2).toHaveCount(25);
})




test.only("Search for specific data in a table", async ({ page }) => {

    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    const searchbox: Locator = page.locator('#dt-search-0');
    await searchbox.fill('Paul Byrd');

    await page.waitForTimeout(5000);
    const rows = await page.locator("#example tbody tr").all();

    if (rows.length >= 1) {
        let matchFound = false;
        for (let row of rows) {
            const text = await row.innerText();
            if (text.includes('Paul Byrd')) {
                console.log("Record exist- found");
                matchFound = true;
                break;
            }

        }
        //expect(matchFound).toBe(true);
        expect(matchFound).toBeTruthy();
    }
    else {
        console.log("No Rows found with search text")
    }


})