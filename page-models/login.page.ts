import { Locator, Page } from "@playwright/test";

export class LoginPage {
    //Page instance
    readonly page: Page;
    readonly loginLinkLocator: Locator;
    readonly loginBtnLocator: Locator;
    readonly loginModalHeading: Locator;
    readonly loginCloseBtn: Locator;
    readonly loginXbutton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginLinkLocator = page.getByRole('link', { name: 'Log in' });
        this.loginBtnLocator = page.getByRole('button', { name: 'Log in' });
        this.loginModalHeading = page.getByRole('heading', { name: 'Log in' });
        this.loginCloseBtn = page.getByLabel('Log in').getByText('Close');
        this.loginXbutton = page.getByLabel('Log in').getByLabel('Close');
        
    }

    async goto() {
        await this.page.goto('https://www.demoblaze.com/', { waitUntil: 'load' });
    }

    async fillLoginForms(username: string, password: string) {
        await this.page.locator('#loginusername').fill(username);
        await this.page.locator('#loginpassword').fill(password);
    }

    async logIn(username: string, password: string) {
        await this.goto();
        await this.loginLinkLocator.click();
        await this.fillLoginForms(username, password);
        await this.loginBtnLocator.click();
    }
}

