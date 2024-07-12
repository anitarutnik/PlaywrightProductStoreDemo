import { test, expect } from '@playwright/test';

test('sign up link', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');

    //Click the sign up link.
    await page.getByRole('link', { name: 'Sign up' }).click();

    //Expects page to open a modal with the "Sign up" heading
    await expect(page.getByRole('heading', { name: 'Sign up' })).toBeVisible();

});

test('sign up success', async ({page}) => {
    await page.goto('https://www.demoblaze.com/');
    // await page.pause();

    //Wait for the alert to appear and verify its content
    page.on('dialog', async dialog => {

        //Check the dialog message
        expect(dialog.message()).toBe('Sign up successful.');

        //Click the Ok button
        await dialog.accept();
    });

    //Click the sign up link
    await page.getByRole('link', { name: 'Sign up' }).click();

    //Enter unregistered username 
    await page.getByLabel('Username:').fill('test_user_name');

    //Enter password
    await page.getByLabel('Password:').fill('testpass');

    //Click Sign up
    await page.getByRole('button', { name: 'Sign up' }).click();

});

test('user already exists', async ({page}) => {
    await page.goto('https://www.demoblaze.com/');

    //Wait for the alert to appear and verify its content
    page.on('dialog', async dialog => {

        //Check the dialog message
        expect(dialog.message()).toBe('This user already exist.');

        //Click the Ok button
        await dialog.accept();
    });

    //Click the sign up link
    await page.getByRole('link', { name: 'Sign up' }).click();
    

    //Enter registered username 
    await page.getByLabel('Username:').fill('testuser');

     //Enter password
     await page.getByLabel('Password:').fill('pass');

     //Click the sign up link
     await page.getByRole('button', { name: 'Sign up' }).click();

});

test('close button CSS check', async ({page}) => {
    await page.goto('https://www.demoblaze.com/');

    await page.getByRole('link', { name: 'Sign up' }).click();

    // Check the CSS of the Close button
    const locator = page.getByLabel('Sign up').getByText('Close');
    await expect(locator).toHaveCSS('border-top-style', 'solid');

});