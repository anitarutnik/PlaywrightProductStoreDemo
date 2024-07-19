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

test('check if phone is in the cart', async ({ page, productPage }) => {
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

    
    // Wait for the cart link to be visible and then click it
    await productPage.cartLink.waitFor({ state: 'visible' });
    await productPage.cartLink.click();
    
    // Wait for the added product to be visible in the cart
    await productPage.addedProduct.waitFor({ state: 'visible' });
    
    // Expect the product to be visible in the cart
    await expect(productPage.addedProduct).toBeVisible();
});

test('product visual comparisons test', async ({ page, productPage }) => {
    await productPage.goto();
    await productPage.productLink.click();
    await expect(page).toHaveScreenshot();
})