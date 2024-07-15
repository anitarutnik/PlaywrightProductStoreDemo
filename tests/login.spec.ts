import { test, expect } from '@playwright/test';

test('login link', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');

    //Click the Log in link.
    await page.getByRole('link', { name: 'Log in' }).click();

    //Expects page to open a modal with the "Log in" heading.
    await expect(page.getByRole('heading', { name: 'Log in' })).toBeVisible();

});

test('login success', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');

    //Click the login link
    await page.getByRole('link', { name: 'Log in' }).click();

    //Enter registered username
    await page.locator('#loginusername').fill('test');

    //Enter password
    await page.locator('#loginpassword').fill('test');

    //Click Log in button
    await page.getByRole('button', { name: 'Log in' }).click();

    //Check if Log in modal is closed and user logged in
    await expect(page.getByRole('heading', { name: 'Log in' })).toBeHidden();

    //Wait for the logout button to become visible
    await page.waitForSelector('#logout2', { timeout: 5000 });

    //Check if the user is logged in by looking for the logout button
    const isLoggedIn = await page.isVisible('#logout2');

});

test('empty field alert', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');

    //Click the login link
    await page.getByRole('link', { name: 'Log in' }).click();

    //Wait for the alert to appear and verify its content
    page.on('dialog', async dialog => {

        //Check the dialog message
        expect(dialog.message()).toBe('Please fill out Username and Password.');

        //Click the Ok button
        await dialog.accept();
    })

    //Click Log in button
    await page.getByRole('button', { name: 'Log in' }).click();

});

test('user does not exist', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');

    //Wait for the alert to appear and verify its content
    page.on('dialog', async dialog => {

        //Check the dialog message
        expect(dialog.message()).toBe('User does not exist.');

        //Click the Ok button
        await dialog.accept();
    });

    //Click the login link
    await page.getByRole('link', { name: 'Log in' }).click();

});

test('form validation', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');

    //Wait for the alert to appear and verify its content
    page.on('dialog', async dialog => {

        //Check the dialog message
        expect(dialog.message()).toBe('User does not exist.');

        //Click the Ok button
        await dialog.accept();
    });

    //Click the login link
    await page.getByRole('link', { name: 'Log in' }).click();

});

test('username input field CSS check', async ({page}) => {
    await page.goto('https://www.demoblaze.com/');

    await page.getByRole('link', { name: 'Log in' }).click();

    // Check the CSS of the field
    const locator = page.locator('#loginusername');
    await expect(locator).toHaveCSS('border-top-left-radius', '4px');

});

test('login button CSS check', async ({page}) => {
    await page.goto('https://www.demoblaze.com/');

    await page.getByRole('link', { name: 'Log in' }).click();

    // Check the CSS of the Log in button
    const locator = page.getByRole('button', { name: 'Log in' });
    await expect(locator).toHaveCSS('font-family', 'sans-serif');

});

test('x button CSS check', async ({page}) => {
    await page.goto('https://www.demoblaze.com/');

    await page.getByRole('link', { name: 'Log in' }).click();

    // Check the CSS of the 'x' button
    const locator = page.getByLabel('Log in').getByLabel('Close')
    await expect(locator).toHaveCSS('font-stretch', '100%');

});



