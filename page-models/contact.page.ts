import { Locator, Page } from "@playwright/test";

export class ContactPage {
    readonly page: Page;
    readonly contactLinkLocator: Locator;
    readonly sendMessageBtn: Locator;
    readonly closeBtn: Locator;
    readonly xBtn: Locator;
    readonly emailInput: Locator;
    readonly nameInput: Locator;
    readonly messageInput: Locator;
    readonly newMessageHeading: Locator;

    constructor(page: Page) {
        this.page = page;
        this.contactLinkLocator = page.getByRole('link', { name: 'Contact' });
        this.sendMessageBtn = page.getByRole('button', { name: 'Send message' });
        this.closeBtn = page.getByLabel('New message').getByText('Close');
        this.xBtn = page.getByLabel('New message').getByLabel('Close');
        this.emailInput = page.locator('#recipient-email');
        this.nameInput = page.getByLabel('Contact Email:');
        this.messageInput = page.getByLabel('Message:');
        this.newMessageHeading = page.getByRole('heading', { name: 'New message' });
    }

    async goto() {
        await this.page.goto('https://www.demoblaze.com/', { waitUntil: 'load' });
    }

    async fillContactForms(recipientEmail: string, contactEmail: string, message: string) {
        await this.emailInput.fill(recipientEmail);
        await this.nameInput.fill(contactEmail);
        await this.messageInput.fill(message);

    }

    async sendMessage(recipientEmail: string, contactEmail: string, message: string) {
        await this.goto();
        await this.contactLinkLocator.click();
        await this.fillContactForms(recipientEmail, contactEmail, message);
        await this.sendMessageBtn.click();
    }

}