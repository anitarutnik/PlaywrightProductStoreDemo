import { test, expect } from '@playwright/test';

test('login link', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');

    //Click the Cart link.
    await page.getByRole('link', { name: 'Cart' }).click();

     //Click the 'Place Order' button.
     await page.getByRole('button', { name: 'Place Order' }).click();

    //Expects page to open a modal with the "Place order" heading.
    await expect(page.getByRole('heading', { name: 'Place order' })).toBeVisible();

});

test('Purchase success', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');

    //Click the Cart link.
    await page.getByRole('link', { name: 'Cart' }).click();

     //Click the 'Place Order' button.
     await page.getByRole('button', { name: 'Place Order' }).click();

    //Enter name
    await page.getByLabel('Total:').fill('Test Name');

    //Enter country
    await page.getByLabel('Country:').fill('Test Country');

    //Enter city
    await page.getByLabel('City:').fill('Test City');

    //Enter Credit card
    await page.getByLabel('Credit card:').fill('123456789');

    //Enter month
    await page.getByLabel('Month:').fill('July');

    //Enter year
    await page.getByLabel('Year:').fill('2026');

    //Click the 'Purchase' button
    await page.getByRole('button', { name: 'Purchase' }).click();

    //Wait for the modal to appear and verify its content
     await expect(page.getByText('Thank you for your purchase!')).toBeVisible();
   
    
 });


