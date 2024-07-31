import { Locator, Page } from "@playwright/test";

export class SignupPage {
    readonly page: Page;
    readonly signupLinkLocator: Locator;
    readonly signupBtn: Locator;
    readonly signupHeading: Locator;
    readonly closeBtn: Locator;
    readonly xBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signupLinkLocator = page.getByRole('link', { name: 'Sign up' });
        this.signupBtn = page.getByRole('button', { name: 'Sign up' })
        this.signupHeading = page.getByRole('heading', { name: 'Sign up' });
        this.closeBtn = page.getByLabel('Sign up').getByText('Close');
        this.xBtn = page.getByLabel('Sign up').getByLabel('Close');
    }

    async goto() {
        await this.page.goto('/', { waitUntil: 'load' });
    }

    async fillSignupForms(username: string, password: string) {
        await this.page.getByLabel('Username:').fill(username);
        await this.page.getByLabel('Password:').fill(password);
    }

    async signUp(username: string, password: string) {
        await this.goto();
        await this.signupLinkLocator.click();
        await this.fillSignupForms(username, password);
        await this.signupBtn.click();
    }

}