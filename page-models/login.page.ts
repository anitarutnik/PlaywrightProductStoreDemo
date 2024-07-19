import { Locator, Page } from "@playwright/test";

export class LoginPage {
    //Page instance
    readonly page: Page;
    readonly loginLinkLocator: Locator;
    readonly loginBtn: Locator;
    readonly loginHeading: Locator;
    readonly closeBtn: Locator;
    readonly xBtn: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginLinkLocator = page.getByRole('link', { name: 'Log in' });
        this.loginBtn = page.getByRole('button', { name: 'Log in' });
        this.loginHeading = page.getByRole('heading', { name: 'Log in' });
        this.closeBtn = page.getByLabel('Log in').getByText('Close');
        this.xBtn = page.getByLabel('Log in').getByLabel('Close');
        this.usernameInput = page.getByLabel('Username:');
        this.passwordInput = page.getByLabel('Password:');
        
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
        await this.loginBtn.click();
    }
}

