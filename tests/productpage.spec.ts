import { test, expect } from "@playwright/test";

test('add to cart success', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');

    //Wait for the alert to appear and verify its content
    page.on('dialog', async dialog => {

        //Check the dialog message
        expect(dialog.message()).toBe('Product added');

        //Click the Ok button
        await dialog.accept();
    });

    //Click the product link.
    await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();

    //Click Add to cart
    await page.getByRole('link', { name: 'Add to cart' }).click();

});

test('checking if phone is in the cart', async ({page}) => {
    await page.goto('https://www.demoblaze.com/');
    await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
    await page.getByRole('link', { name: 'Add to cart' }).click();
    await page.getByRole('link', { name: 'Cart', exact: true }).click();

    //Expects product to be added to cart
     await expect(page.getByRole('cell', { name: 'Samsung galaxy s6' })).toBeVisible();

});