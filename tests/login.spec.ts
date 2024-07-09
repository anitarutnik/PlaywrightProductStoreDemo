import { test, expect } from '@playwright/test';

test('login link', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');

    // Click the Log in link.
    await page.getByRole('link', { name: 'Log in' }).click();

    // Expects page to open a modal with the "Log in" heading.
    await expect(page.getByRole('heading', { name: 'Log in' })).toBeVisible();

});

test('login success', async ({page}) => {
    await page.goto('https://www.demoblaze.com/');

    //Click the login link
    await page.getByRole('link', { name: 'Log in' }).click();

    //Enter registered username
    await page.locator('#loginusername').fill('test');

    //Enter password
    await page.locator('#loginpassword').fill('test');

    //Click Log in
    await page.getByRole('button', { name: 'Log in' }).click();

    //Check if Log in modal is closed and user logged in
    await expect(page.getByRole('heading', { name: 'Log in' })).toBeHidden();

    // Wait for the logout button to become visible
    await page.waitForSelector('#logout2', { timeout: 5000 });

    //Check if the user is logged in by looking for the logout button
    const isLoggedIn = await page.isVisible('#logout2');

});
