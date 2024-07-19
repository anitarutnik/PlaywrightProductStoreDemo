import { test, expect } from "@playwright/test";
import { ProductPage } from "../page-models/productpage.page";

test('add to cart success', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.goto();

    //Wait for the alert to appear and verify its content
    page.on('dialog', async dialog => {

        //Check the dialog message
        expect(dialog.message()).toBe('Product added');

        //Click the Ok button
        await dialog.accept();
    });

    //Click the product link.
    await productPage.productLink.click();

    //Click Add to cart
    await productPage.addBtn.click();

});

test('checking if phone is in the cart', async ({page}) => {
    const productPage = new ProductPage(page);
    await productPage.goto();

    await productPage.productLink.click();
    await productPage.addBtn.click();
    await productPage.cartLink.click();

    //Expects product to be added to cart
     await expect(productPage.addedProduct).toBeVisible();

});