import { test, expect } from '@playwright/test';
import { CartPage } from '../page-models/cart.page';

test('open cart page', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.goto();

    //Click the Cart link.
    await cartPage.cartLinkLocator.click();

    //Click the 'Place Order' button.
    await cartPage.placeOrderBtn.click();

    //Expects page to open a modal with the "Place order" heading.
    await expect(cartPage.placeOrderHeading).toBeVisible();

});

test('Purchase success', async ({ page }) => {
    const cartPage = new CartPage(page);

    await cartPage.purchaseItem('test name', 'test country', 'test city', '01234567', 'July', '2024');

    //Wait for the modal to appear and verify its content
    await expect(page.getByText('Thank you for your purchase!')).toBeVisible();

});

test('Name and card empty field alert', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.goto();

    page.on('dialog', async dialog => {

        //Check the dialog message
        expect(dialog.message()).toBe('Please fill out Name and Creditcard.');

        //Click the Ok button
        await dialog.accept();
    });

    await cartPage.cartLinkLocator.click();
    await cartPage.placeOrderBtn.click();
    await cartPage.purchaseBtn.click();

});

test('close modal with Close button', async ({ page }) => {
    const cartPage = new CartPage(page);

    await cartPage.goto();
    await cartPage.cartLinkLocator.click();
    await cartPage.placeOrderBtn.click();
    await cartPage.closeBtn.click();

});

test('close modal with X button', async ({ page }) => {
    const cartPage = new CartPage(page);

    await cartPage.goto();
    await cartPage.cartLinkLocator.click();
    await cartPage.placeOrderBtn.click();
    await cartPage.xBtn.click();

});

test('Country input field CSS check', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.goto();

    await cartPage.cartLinkLocator.click();

    await cartPage.placeOrderBtn.click();

    //Check the styling of the Country field
    await expect(cartPage.countryInput).toHaveCSS('background-clip', 'padding-box');

});

test('table cell CSS check', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.goto();

    await cartPage.cartLinkLocator.click();

    //Check the styling of the table cell
    await expect(cartPage.tableCell).toHaveCSS('padding-left', '12px');

});


