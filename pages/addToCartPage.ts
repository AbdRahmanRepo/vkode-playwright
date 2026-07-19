import { Page, Locator } from '@playwright/test';
export class AddToCartPage {
    /*
    Locators
    Constructor
     Action Methods
     */

    // Locators
    readonly page: Page;
    readonly product: Locator;

    //Constructor
    constructor(page: Page) {
        this.page = page;
        this.product = page.getByRole('link', { name: 'Samsung galaxy s6' });
    }



    async clickOnProduct() {
        await this.product.click();
    }

}