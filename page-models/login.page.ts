import { Page } from "@playwright/test";

export class LoginPage {
    //Page instance
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://www.demoblaze.com/', { waitUntil: 'load' });
    }

    loginLinkLocator() {
        return this.page.getByRole('link', { name: 'Log in' });
    }

    loginButtonLocator() {
        return this.page.getByRole('button', { name: 'Log in' });
    }

    async fillLoginForms(username: string, password: string) {
        await this.page.locator('#loginusername').fill('test');
        await this.page.locator('#loginpassword').fill('test');
    }

}

