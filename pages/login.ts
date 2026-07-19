import { Page, Locator } from '@playwright/test';
export class LoginPage {
    /*
    Locators
    Constructor
     Action Methods
     */

    // Locators
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton1: Locator;
    readonly loginbutton2: Locator;

    //Constructor
    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#loginusername');
        this.passwordInput = page.locator('#loginpassword');
        this.loginButton1 = page.locator('#login2');
        this.loginbutton2 = page.getByRole('button', { name: 'Log in' });
    }


    async inputUserName(username: string) {
        await this.usernameInput.clear();
        await this.usernameInput.fill(username);
    }

    async inputPassword(password: string) {
        await this.passwordInput.clear();
        await this.passwordInput.fill(password);
    }

    async clickLoginButton1() {
        await this.loginButton1.click();
    }

    async clickLoginButton2() {
        await this.loginbutton2.click();
    }



    // Action Methods
    async goto() {
        await this.page.goto('https://example.com/login');
    }

    async loginTo(username: string, password: string) {
        this.inputUserName(username);
        this.inputPassword(password);
        this.clickLoginButton2();
    }

}