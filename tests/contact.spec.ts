import { test, expect } from '../page-models/base';

test('open contact modal', async ({ contactPage }) => {
    await contactPage.goto();

    //Click the Contact link
    await contactPage.contactLinkLocator.click();

    //Expects page to open a modal with the "New message" heading.
    await expect(contactPage.newMessageHeading).toBeVisible();

});

test('Contact email CSS check', async ({ contactPage }) => {
    await contactPage.goto();

    //Click the Contact link.
    await contactPage.contactLinkLocator.click();

    await expect(contactPage.emailInput).toHaveCSS('font-weight', '400');
});

test('message sent', async ({ page, contactPage }) => {

    //Wait for the alert to appear and verify its content
    page.on('dialog', async dialog => {

        //Check the dialog message
        expect(dialog.message()).toBe('Thanks for the message!!');

        //Click the Ok button
        await dialog.accept();

    });

    await contactPage.sendMessage('test@test.com', 'test name', 'test message');
});

test('Send message button CSS check', async ({ contactPage }) => {
    await contactPage.goto();

    await contactPage.contactLinkLocator.click();

    //Check the CSS of the button
    await expect(contactPage.sendMessageBtn).toHaveCSS('display', 'block');

});

test('modal closed', async ({ page, contactPage }) => {
    await contactPage.goto();

    page.on('dialog', dialog => dialog.accept());

    await contactPage.contactLinkLocator.click();

    await contactPage.sendMessageBtn.click();

    //Check if Contact modal is closed
    await expect(contactPage.newMessageHeading).toBeHidden();
});
