import { test, expect } from '@playwright/test';

test('modal closed', async ({page}) => {
    await page.goto('https://www.demoblaze.com/');

    await page.getByRole('link', { name: 'Contact' }).click();

    await page.getByRole('button', { name: 'Send message' }).click();

    page.on('dialog', dialog => dialog.accept());

    //Check if Contact modal is closed
    await expect(page.getByRole('heading', { name: 'New message' })).toBeHidden();
});

test('email format check', async ({page}) => {
    await page.goto('https://www.demoblaze.com/');

    await page.getByRole('link', { name: 'Contact' }).click();

});

test('sign up successfully', async ({page}) => {
    await page.goto('https://www.demoblaze.com/');
    //await page.pause();

    //Wait for the alert to appear and verify its content
    page.on('dialog', async dialog => {

        //Check the dialog message
        expect(dialog.message()).toBe('Sign up successful.');

        //Click the Ok button
        await dialog.accept();

    //Click the sign up link
    await page.getByRole('link', { name: 'Sign up' }).click();

    //Enter username
    await page.getByLabel('Username:').fill('test_user_name');

    //Enter password
    await page.getByLabel('Password:').fill('testpass');

    //Click Sign up
    await page.getByRole('button', { name: 'Sign up' }).click();

    });


});