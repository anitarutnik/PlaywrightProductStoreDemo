import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-models/login.page';

test('open log in modal', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    //Click the Log in link.
    await loginPage.loginLinkLocator.click();

    //Expects page to open a modal with the "Log in" heading.
    await expect(loginPage.loginHeading).toBeVisible();

});


test('login success', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.logIn('test', 'test');
    await page.waitForSelector('#logout2', { timeout: 5000 });
    const isLoggedIn = await page.isVisible('#logout2');

    await expect(loginPage.loginLinkLocator).toBeHidden();
    await expect(isLoggedIn).toBeTruthy();
});


test('login modal heading hidden', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.logIn('test', 'test');

    await expect(loginPage.loginHeading).toBeHidden();
});


test('empty field alert', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    page.on('dialog', async dialog => {

        //Check the dialog message
        expect(dialog.message()).toBe('Please fill out Username and Password.');

        //Click the Ok button
        await dialog.accept();
    });

    await loginPage.loginLinkLocator.click();
    await loginPage.loginBtn.click();

});


test('user does not exist', async ({ page }) => {
    const loginPage = new LoginPage(page);

    page.on('dialog', async dialog => {

        //Check the dialog message
        expect(dialog.message()).toBe('User does not exist.');

        //Click the Ok button
        await dialog.accept();
    });

    await loginPage.logIn('testuser54346', 'test');

    await page.waitForTimeout(1000);

});


test('close modal with Close button', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.loginLinkLocator.click();

    await loginPage.closeBtn.click();

});


test('close modal with X button', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.loginLinkLocator.click();

    await loginPage.xBtn.click();

});

test('username input field CSS check', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.loginLinkLocator.click();

    // Check the CSS of the field
    await expect(loginPage.usernameInput).toHaveCSS('border-top-left-radius', '4px');

});


test('login button CSS check', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.loginLinkLocator.click();

    // Check the CSS of the Log in button
    await expect(loginPage.loginBtn).toHaveCSS('font-family', 'sans-serif');

});


test('x button CSS check', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.loginLinkLocator.click();

    // Check the CSS of the 'x' button
    await expect(loginPage.xBtn).toHaveCSS('font-stretch', '100%');

});



