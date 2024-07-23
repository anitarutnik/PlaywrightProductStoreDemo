import { Locator, Page } from "@playwright/test";

export class CartPage {
    readonly page: Page;
    readonly cartLinkLocator: Locator;
    readonly placeOrderBtn: Locator;
    readonly purchaseBtn: Locator;
    readonly closeBtn: Locator;
    readonly xBtn: Locator;
    readonly placeOrderHeading: Locator;
    readonly nameInput: Locator;
    readonly countryInput: Locator;
    readonly cityInput: Locator;
    readonly cardInput: Locator;
    readonly monthInput: Locator;
    readonly yearInput: Locator;
    readonly tableCell: Locator;
    readonly deleteBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartLinkLocator = page.getByRole('link', { name: 'Cart' });
        this.placeOrderBtn = page.getByRole('button', { name: 'Place Order' });
        this.purchaseBtn = page.getByRole('button', { name: 'Purchase' });
        this.closeBtn = page.getByLabel('Place order').getByText('Close');
        this.xBtn = page.getByLabel('Place order').getByLabel('Close');
        this.placeOrderHeading = page.getByRole('heading', { name: 'Place order' });
        this.nameInput = page.getByLabel('Total:');
        this.countryInput = page.getByLabel('Country:');
        this.cityInput = page.getByLabel('City:');
        this.cardInput = page.getByLabel('Credit card:');
        this.monthInput = page.getByLabel('Month:');
        this.yearInput = page.getByLabel('Year:');
        this.tableCell = page.getByRole('cell', { name: 'Pic' });
        this.deleteBtn = page.getByRole('link', { name: 'Delete' });

    }

    async goto() {
        await this.page.goto('https://www.demoblaze.com/', { waitUntil: 'load' });
    }

    async fillOrderForms(total: string, country: string, city: string, creditCard: string, month: string, year: string) {
        await this.nameInput.fill(total);
        await this.countryInput.fill(country);
        await this.cityInput.fill(city);
        await this.cardInput.fill(creditCard);
        await this.monthInput.fill(month);
        await this.yearInput.fill(year);
    }

    async purchaseItem(total: string, country: string, city: string, creditCard: string, month: string, year: string) {
        await this.goto();
        await this.cartLinkLocator.click();
        await this.placeOrderBtn.click();
        await this.fillOrderForms(total, country, city, creditCard, month, year);
        await this.purchaseBtn.click();
    }
}