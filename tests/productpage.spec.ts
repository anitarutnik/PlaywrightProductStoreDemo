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
    await expect(page).toHaveScreenshot();
});

test('check if phone is in the cart', async ({ productPage }) => {
    await productPage.goto();

    await productPage.productLink.click();
    await productPage.addBtn.click();
    await productPage.cartLink.click();

    //Expects product to be added to cart
    await expect(productPage.addedProduct).toBeVisible();

});