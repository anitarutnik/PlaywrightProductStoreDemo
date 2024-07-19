import { test, expect } from '../page-models/base';

test('open sign up modal', async ({ signupPage }) => {
    await signupPage.goto();

    //Click the sign up link.
    await signupPage.signupLinkLocator.click();

    //Expects page to open a modal with the "Sign up" heading
    await expect(signupPage.signupHeading).toBeVisible();

});

test('sign up success', async ({ page, signupPage }) => {

    //Wait for the alert to appear and verify its content
    page.on('dialog', async dialog => {

        //Check the dialog message
        await expect(dialog.message()).toBe('Sign up successful.');

        //Click the Ok button
        await dialog.accept();

    });

    await signupPage.signUp('test9845', 'test');

});

test('user already exists', async ({ page, signupPage }) => {

    //Wait for the alert to appear and verify its content
    page.on('dialog', async dialog => {

        //Check the dialog message
        await expect(dialog.message()).toBe('This user already exist.');

        //Click the Ok button
        await dialog.accept();
    });

    await signupPage.signUp('test', 'test');

    //Visual comparisons
    await expect(page).toHaveScreenshot();
    
});


test('close button CSS check', async ({ signupPage }) => {
    await signupPage.goto();

    await signupPage.signupLinkLocator.click();

    // Check the CSS of the Close button
    const locator = signupPage.closeBtn;
    await expect(locator).toHaveCSS('border-top-style', 'solid');

});