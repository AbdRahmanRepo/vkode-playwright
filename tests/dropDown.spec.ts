import { test, expect, Locator } from "@playwright/test";


test("Single Select Drop down", async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    //1) select option from the drop down ( 4 ways)

    //await page.locator('#country').selectOption('India');   // visible text
    //await page.locator('#country').selectOption({value:'uk'});   // by using value attribute
    //await page.locator('#country').selectOption({label:'India'});   // by using label
    //await page.locator('#country').selectOption({index:3});   // by using index


    //2) check number of options in the dropdown(count)
    const dropdownOptions: Locator = page.locator('#country>option');
    await expect(dropdownOptions).toHaveCount(10);

    //3) check an option present in the dropdown

    const optionsText: string[] = (await dropdownOptions.allTextContents()).map(text => text.trim());
    console.log(optionsText)

    expect(optionsText).toContain('Japan'); // Check if the array contains "Japan"


    //4) printing options from the drop down
    for (const option of optionsText) {
        console.log(option)
    }


    await page.waitForTimeout(3000);
})


test("Multi Select Drop down", async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    //1) select option from the drop down ( 4 ways)
    //await page.locator("#colors").selectOption(['Red','Blue','Green']);   // using visible text
    //await page.locator("#colors").selectOption(['red','green','white']);   // using value attribute
    //await page.locator("#colors").selectOption([ {label:'Red'}, {label:'Green'}, {label:'Yellow'} ]);   // using label
    //await page.locator("#colors").selectOption([ {index:0},{index:2},{index:4} ]);   // using index


    //2) check number of options in the dropdown(count)
    const dropdownOptions: Locator = page.locator('#colors>option');
    await expect(dropdownOptions).toHaveCount(7);

    //3) check an option present in the dropdown
    const optionsText: string[] = (await dropdownOptions.allTextContents()).map(text => text.trim());
    console.log(optionsText)

    expect(optionsText).toContain('Green'); // Check if the array contains "Green"


    //4) printing options from the drop down

    for (const option of optionsText) {
        console.log(option);
    }




    await page.waitForTimeout(5000);
})


test("Verify dropdown contains duplicates", async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    const dropDownOptions: Locator = page.locator('#colors>option');  // having duplicates
    // const dropDownOptions: Locator = page.locator('#animals>option');  // not having duplicates

    const optionsText: string[] = (await dropDownOptions.allTextContents()).map(text => text.trim());


    const myset = new Set<string>();   // Set - duplicates not allowed
    const duplicates: string[] = [];    // array  - duplicates allowed


    for (const text of optionsText) {
        if (myset.has(text)) {
            duplicates.push(text);
        }
        else {
            myset.add(text);
        }
    }

    console.log("Duplicate options are:===>", duplicates);

    if (duplicates.length > 0) {
        console.log("Duplicate options found.", duplicates)
    }
    else {
        console.log("No duplicate options found..")
    }


    expect(duplicates.length).toBe(0);


    //await page.waitForTimeout(5000);
})


test("Verify dropdown is Sorted", async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    const dropDownOptions: Locator = page.locator('#colors>option');  // sorted
    //const dropDownOptions:Locator=page.locator('#colors>option');  // not sorted


    //console.log(await dropDownOptions.allTextContents());

    const optionsText: string[] = (await dropDownOptions.allTextContents()).map(text => text.trim());


    // ... spread operator
    const originalList: string[] = [...optionsText];
    const sortedList: string[] = [...optionsText].sort();

    console.log("Original list:", originalList);
    console.log("Sorted list:", sortedList);

    expect(originalList).toEqual(sortedList);

    //await page.waitForTimeout(5000);
})

test.only("Autosuggest dropdown", async ({ page }) => {

    await page.goto("https://www.flipkart.com/");

    await page.locator("input[name='q']").nth(0).fill("smart");  // Search text
    await page.waitForTimeout(5000);

    // Get all the suggested options --> Ctrl+Shift+P  on DOM -->emulate focused page
    const options: Locator = page.locator("ul>li");

    const count = await options.count();
    console.log("Number of suggested options:", count);  //8

    // printing all the suggested options in the console

    console.log("5 th option:", await options.nth(5).innerText());

    console.log("Printing all the auto suggestions.....")
    for (let i = 0; i < count; i++) {
        //console.log(await options.nth(i).innerText());
        console.log(await options.nth(i).textContent());
    }


    //select/click on the smartphone option

    for (let i = 0; i < count; i++) {
        const text = await options.nth(i).innerText();
        if (text === 'smartphone') {
            options.nth(i).click();
            break;
        }

    }

    await page.waitForTimeout(3000);


})

test("Bootsrtap hidden dropdown", async ({ page }) => {


    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    //Login steps
    await page.locator('input[name="username"]').fill('Admin');
    await page.locator('input[name="password"]').fill('admin123');
    await page.locator('button[type="submit"]').click();

    //click on the PIM
    await page.getByText('PIM').click();

    //click on Job TiTLE Dropdown
    await page.locator('form i').nth(2).click();
    await page.waitForTimeout(3000);


    // capture all the options from dropdown and count

    const options: Locator = page.locator("div[role='listbox'] span");

    const count: number = await options.count();
    console.log("Number of options in a dropdown:", count);

    // Print all the options

    console.log("All the text contenst:", await options.allTextContents());

    console.log("Pring all the options.....")
    for (let i = 0; i < count; i++) {
        //console.log(await options.nth(i).innerText());
        console.log(await options.nth(i).textContent());
    }

    //Select/click on option i=10 count = 10
    for (let i = 0; i < count; i++) {
        const text = await options.nth(i).innerText(); // Automaton Tester - 1
        if (text === 'Automaton Tester') {
            await options.nth(i).click();
            break; // Loop break
        }

    }

    await page.waitForTimeout(5000);


})


test('Testig Dropdown', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const dropdown: Locator = page.locator('select#country');

    // Visible Text
    await dropdown.selectOption('India');
    await page.waitForTimeout(5000);

    // By using value attribute
    await dropdown.selectOption({ value: 'uk' });
    await page.waitForTimeout(5000);

    // By using label
    await dropdown.selectOption({ label: 'China' });
    await page.waitForTimeout(5000);


    // By using index
    await dropdown.selectOption({ index: 3 });
    await page.waitForTimeout(5000);


})

test('Multi Select Dropdown', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const dropdown: Locator = page.locator('select#colors');


    //await dropdown.selectOption(['Red', 'Blue', 'Yellow']);     // By Using Visible Text
    //await dropdown.selectOption(['red', 'blue', 'green']);     // By using value attribute
    // await dropdown.selectOption([{ 'label': 'Red' }, { 'label': 'Green' }]);     // By using label
    //await dropdown.selectOption([{ 'index': 0 }, { 'index': 2 }]);        // By using index
    // await page.waitForTimeout(5000);

    // Check the count
    const dropdownOptions: Locator = page.locator('select#colors>option');
    await expect(dropdownOptions).toHaveCount(7);

    // Check an option present in the dropdown
    const optionsText: string[] = (await dropdownOptions.allTextContents()).map(text => text.trim());
    console.log(optionsText);

    // Check if the array contains "Green"
    expect(optionsText).toContain('Pink');

})

