import { Locator, Page } from "@playwright/test";

export class ProductPage{
    readonly page: Page;
    readonly productLink: Locator;
    readonly addBtn: Locator;
    readonly cartLink: Locator;
    readonly addedProduct: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productLink = page.getByRole('link', { name: 'Samsung galaxy s6' });
        this.addBtn = page.getByRole('link', { name: 'Add to cart' });
        this.cartLink = page.getByRole('link', { name: 'Cart', exact: true });
        this.addedProduct = page.getByRole('cell', { name: 'Samsung galaxy s6' });

    }

    async goto() {
        await this.page.goto('https://www.demoblaze.com/', { waitUntil: 'load' });
    }
}