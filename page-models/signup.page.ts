import { Locator, Page } from "@playwright/test";

export class SignupPage {
    readonly page: Page;
    readonly signupLinkLocator: Locator;
    readonly signupBtnLocator: Locator;
    readonly signupModalHeading: Locator;
    readonly signupCloseBtn: Locator;
    readonly signupXbutton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signupLinkLocator = page.getByRole('link', { name: 'Sign up' });
        this.signupBtnLocator = page.getByRole('button', { name: 'Sign up' })
        this.signupModalHeading = page.getByRole('heading', { name: 'Sign up' });
        this.signupCloseBtn = page.getByLabel('Sign up').getByText('Close');
        this.signupXbutton = page.getByLabel('Sign up').getByLabel('Close');
    }

    async goto() {
        await this.page.goto('https://www.demoblaze.com/', { waitUntil: 'load' });
    }

    async fillSignupForms(username: string, password: string) {
        await this.page.getByLabel('Username:').fill(username);
        await this.page.getByLabel('Password:').fill(password);
    }

    async signUp(username: string, password: string) {
        await this.goto();
        await this.signupLinkLocator.click();
        await this.fillSignupForms(username, password);
        await this.signupBtnLocator.click();
    }

}