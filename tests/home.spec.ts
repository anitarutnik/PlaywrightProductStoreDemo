import { test, expect } from "@playwright/test";

test('Phones category properly listed', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');

    //Click on the "Phones" category
    await page.getByRole('link', { name: 'Phones' }).click();

    //Expects that only phones are listed
    await expect(page.getByRole('link', { name: 'Samsung galaxy s6' })).toBeVisible();

    //Expects that products from other categories are not listed
    await expect(page.getByRole('link', { name: 'Sony vaio i5' })).not.toBeVisible();

    await expect(page.getByRole('link', { name: 'Apple monitor 24' })).not.toBeVisible();

});

test('Laptops category properly listed', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');

    //Click on the "Laptops" category
    await page.getByRole('link', { name: 'Laptops' }).click();

    //Expects that only laptops are listed
    await expect(page.getByRole('link', { name: 'Sony vaio i5' })).toBeVisible();

    //Expects that products from other categories are not listed
    await expect(page.getByRole('link', { name: 'Samsung galaxy s6' })).not.toBeVisible();

    await expect(page.getByRole('link', { name: 'Apple monitor 24' })).not.toBeVisible();

});

test('Monitors category properly listed', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');

    //Click on the "Monitors" category
    await page.getByRole('link', { name: 'Monitors' }).click();

    //Expects that only monitors are listed
    await expect(page.getByRole('link', { name: 'Apple monitor 24' })).toBeVisible();

    //Expects that products from other categories are not listed
    await expect(page.getByRole('link', { name: 'Samsung galaxy s6' })).not.toBeVisible();

    await expect(page.getByRole('link', { name: 'Sony vaio i5' })).not.toBeVisible();

});

test('navigation CSS check', async ({page}) => {
    await page.goto('https://www.demoblaze.com/');

    // Check the navigation styling
    const locator = page.getByText('PRODUCT STORE Home (current)');
    await expect(locator).toHaveCSS('position', 'relative');

});


test('footer CSS check', async ({page}) => {
    await page.goto('https://www.demoblaze.com/');

    // Check the footer styling
    const locator = page.locator('#footc');
    await expect(locator).toHaveCSS('padding-bottom', '48px');

});

