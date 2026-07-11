import { test, expect, Locator } from '@playwright/test';

test("static web table", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/")

    const table: Locator = page.locator("table[name='BookTable'] tbody");
    await expect(table).toBeVisible();

    //1) count number of rows in a table

    const rows: Locator = table.locator("tr"); //returns all the rows including header
    await expect(rows).toHaveCount(7);  //7  //approach 1

    const rowCount: number = await rows.count();
    console.log("Number of rows in a table: ", rowCount);
    expect(rowCount).toBe(7); // appraoch 2




    //2) count number of headers/columns

    //const  columns:Locator= page.locator("table[name='BookTable'] tbody tr th");

    const columns: Locator = rows.locator("th");
    await expect(columns).toHaveCount(4); //4  appraoch 1

    const columnCount: number = await columns.count();
    console.log("number of columns/headers: ", columnCount);
    expect(columnCount).toBe(4); // appraoch 2




    // 3) Read all data from 2nd row (index 2 means 3rd row including header)
    const secondRowCells: Locator = rows.nth(2).locator('td');

    const secondRowTexts: string[] = await secondRowCells.allInnerTexts();
    console.log("2nd Row data: ", secondRowTexts); //[ 'Learn Java', 'Mukesh', 'Java', '500' ]

    await expect(secondRowCells).toHaveText(['Learn Java', 'Mukesh', 'Java', '500']); //assetion

    console.log("printing 2nd row data......")
    for (let text of secondRowTexts) {
        console.log(text);
    }



    // 4) Read all data from the table (excluding header)

    console.log('Printing all Table Data.......');

    const allRowData = await rows.all();  // get all row locators   //all() returns array of locators

    console.log("BookName   Author  subject   price");

    for (let row of allRowData.slice(1))   // slice(1) --> skip header row 
    {
        const cols = await row.locator('td').allInnerTexts();
        console.log(cols.join('\t'));
    }




    // 5) Print book names where author is Mukesh
    console.log("Books written by Mukesh.......")

    const mukeshBooks: string[] = [];

    for (let row of allRowData.slice(1))   // slice(1) --> skip header row 
    {

        //const cells=await row.locator('td').allInnerTexts();
        //const authorName=cells[1];
        //const bookName=cells[0];

        // You can use below 2 statements instead of using above 3 statements to get authorName & Book Name
        const authorName = await row.locator('td').nth(1).innerText(); // Capture Author name 
        const bookName = await row.locator('td').nth(0).innerText(); // Capture Book name 

        if (authorName === 'Mukesh') {
            console.log(`${authorName} \t ${bookName}`)
            mukeshBooks.push(bookName);
        }

    }
    expect(mukeshBooks).toHaveLength(2); //Assertion




    // 6) Calculate total price of all books

    let totalPrice: number = 0;

    for (let row of allRowData.slice(1))   // slice(1) --> skip header row 
    {
        //const cells:string[]=await row.locator('td').allInnerTexts();// captured all the td's from row
        //const price=cells[3]; // capture price from 3th index

        const price = await row.locator('td').nth(3).innerText(); // You can use single statement instead of using above 2 statements to get price
        totalPrice = totalPrice + parseInt(price);

    }
    console.log("Total price: ", totalPrice)

    expect(totalPrice).toBe(7100); //Assertion

})

test("Comparing methods", async ({ page }) => {

    await page.goto('https://demowebshop.tricentis.com/');

    const products: Locator = page.locator('.product-title');   //6

    //1) innerText() Vs textContent()

    //console.log(await products.nth(1).innerText()); //14.1-inch Laptop
    //console.log(await products.nth(1).textContent());
    /*
     const count=await products.count();
 
     for(let i=0;i<count;i++)
     {
         //const productName :string=await products.nth(i).innerText(); // Extracts plain text. Eliminates Whitespace and line breaks
         //console.log(productName);
 
         //const productName: string | null =await products.nth(i).textContent();  // Extracts text including hidden elements. Includes Extra whitespaces, line breaks, etc. 
         //console.log(productName);
 
         const productName: string | null =await products.nth(i).textContent();  // Extracts text including hidden elements. Includes Extra whitespaces, line breaks, etc. 
         console.log(productName?.trim());
 
     }
  */


    //2)  allInnerText() Vs allTextContent()

    /*
    console.log("**** Comparing allInnerText() Vs allTextContent() *****")
        
    //const productNames: string[]=await products.allInnerTexts()
    //console.log("Product Names captured by allInnerText(): ", productNames)
    
    const productNames: string[]=await products.allTextContents()
    console.log("Product Names captured by allTextContent(): ", productNames)
    
    const productNamesTrimmed:string[]=productNames.map(text=>text.trim());
    console.log("Product Names after trimmed: ", productNamesTrimmed)
    
    */


    //3) all() - converts Locator----> Locator[]
    //Returns array of locators
    //Returns array of locators (Stores locators of products)/Converts Locator to array of locators (for iteration)

    const productsLocators: Locator[] = await products.all();
    console.log(productsLocators);

    //console.log(await productsLocators[1].innerText());

    //for of loop
    /*for(let productloc of productsLocators)
    {
        console.log(await productloc.innerText());
    
    }
    */

    //for in loop

    for (let i in productsLocators) {
        console.log(await productsLocators[i].innerText());
    }


})


test.only('Table test', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    const table: Locator = page.locator("table[name='BookTable'] tbody");
    await expect(table).toBeVisible();

    const rows: Locator = table.locator("tr"); // Locator chaining, return all 
    await expect(rows).toHaveCount(7);


    const row1 = rows.nth(2).locator("td");
    const row1count: number = await row1.count();
    await expect(row1).toHaveCount(4);
    await expect(row1).toHaveText(['Learn Java', 'Mukesh', 'Java', '500']);


    const firstRowContent: string[] = await row1.allTextContents();


    const allRowsData = rows.all(); //=> 7

    for (let row of (await allRowsData).slice(1)) {         // Row 2
        // const cells = await row.locator('td').allInnerTexts();
        // console.log(cells.join('\t'));

        const authorName = await row.locator('td').nth(1).innerText(); // Capture Author name 
        const bookName = await row.locator('td').nth(0).innerText(); // Capture Book name 

        if (authorName === 'Mukesh') {
            console.log(`${authorName} \t ${bookName}`)
        }

    }


})