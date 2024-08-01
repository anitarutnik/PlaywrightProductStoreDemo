import { request } from 'http';
import { test, expect } from '../page-models/base';

test('add to cart success', async ({ page, productPage }) => {
    await productPage.goto();

    //Wait for the alert to appear and verify its content
    page.on('dialog', async dialog => {

        //Check the dialog message
        await expect(dialog.message()).toBe('Product added');

        //Click the Ok button
        await dialog.accept();

    });

    //Click the product link.
    await productPage.productLink.click();

    //Click Add to cart
    await productPage.addBtn.click();

    //Visual comparisons
    // await expect(page).toHaveScreenshot();
});

test('check if phone is in the cart', async ({ page, productPage, cartPage }) => {
    // Set up the dialog event listener before performing actions that trigger the dialog
    page.on('dialog', async dialog => { await dialog.accept(); });

    // Go to the cart page and delete all items
    await page.goto('/cart.html');

    // Wait for cart to load
    await page.waitForLoadState('networkidle');

    // Recursive deleting cart items
    await cartPage.deleteCartItemsRecursively();

    //Go to home page
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Click the product link
    await productPage.productLink.click();

    // Click Add to cart
    await productPage.addBtn.waitFor({ state: 'visible' });
    await productPage.addBtn.click();
    await page.waitForLoadState('networkidle');

    // Wait for the cart link to be visible and then click it
    await productPage.cartLink.waitFor({ state: 'visible' });
    await productPage.cartLink.click();

    // Expect the product to be visible in the cart
    await expect(productPage.addedProduct).toBeVisible();
});

test('product visual comparisons test', async ({ page, productPage }) => {
    await productPage.goto();
    await productPage.productLink.click();
    // await expect(page).toHaveScreenshot();
})



