import { Locator, Page } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly phonesCat: Locator;
    readonly laptopsCat: Locator;
    readonly monitorsCat: Locator;
    readonly homeNav: Locator;
    readonly homeFoot: Locator;
    readonly samsungPhone: Locator;
    readonly sonyLaptop: Locator;
    readonly appleMonitor: Locator;

    constructor(page: Page) {
        this.page = page;
        this.phonesCat = page.getByRole('link', { name: 'Phones' });
        this.laptopsCat = page.getByRole('link', { name: 'Laptops' });
        this.monitorsCat = page.getByRole('link', { name: 'Monitors' });
        this.homeNav = page.getByText('PRODUCT STORE Home (current)');
        this.homeFoot = page.locator('#footc');
        this.samsungPhone = page.getByRole('link', { name: 'Samsung galaxy s6' });
        this.sonyLaptop = page.getByRole('link', { name: 'Sony vaio i5' });
        this.appleMonitor = page.getByRole('link', { name: 'Apple monitor' });
    }

    async goto() {
        await this.page.goto('https://www.demoblaze.com/', { waitUntil: 'load' });
    }



}