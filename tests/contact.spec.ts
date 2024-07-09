import { test, expect } from '@playwright/test';

test('contact link', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');

    // Click the Contact link.
    await page.getByRole('link', { name: 'Contact' }).click();

    // Expects page to open a modal with the "New message" heading.
    await expect(page.getByRole('heading', { name: 'New message' })).toBeVisible();

});

test('message sent', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');

    //Wait for the alert to appear and verify its content
    page.on('dialog', async dialog => {

        //Check the dialog message
        expect(dialog.message()).toBe('Thanks for the message!!');

        //Click the Ok button
        await dialog.accept();

    });

    //Click the contact link.
    await page.getByRole('link', { name: 'Contact' }).click();

    //Enter Contact Email
    await page.locator('#recipient-email').fill('test@test.com');

    //Enter Contact Name
    await page.getByLabel('Contact Email:').fill('Test Name');

    //Enter Message
    await page.getByLabel('Message:').fill('This is test message');

    //Click Send message
    await page.getByRole('button', { name: 'Send message' }).click();

});

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

