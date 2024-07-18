import { test, expect } from '@playwright/test';
import { SignupPage } from '../page-models/signup.page';

test('open sign up modal', async ({ page }) => {
    const signupPage = new SignupPage(page);
    await signupPage.goto();

    //Click the sign up link.
    await signupPage.signupLinkLocator.click();

    //Expects page to open a modal with the "Sign up" heading
    await expect(signupPage.signupHeading).toBeVisible();

});

test('sign up success', async ({ page }) => {
    const signupPage = new SignupPage(page);

    //Wait for the alert to appear and verify its content
    page.on('dialog', async dialog => {

        //Check the dialog message
        expect(dialog.message()).toBe('Sign up successful.');

        //Click the Ok button
        await dialog.accept();

    });

    await signupPage.signUp('test9845', 'test');

});

test('user already exists', async ({ page }) => {
    const signupPage = new SignupPage(page);

    //Wait for the alert to appear and verify its content
    page.on('dialog', async dialog => {

        //Check the dialog message
        expect(dialog.message()).toBe('This user already exist.');

        //Click the Ok button
        await dialog.accept();
    });

    await signupPage.signUp('test', 'test');

});


test('close button CSS check', async ({ page }) => {
    const signupPage = new SignupPage(page);
    await signupPage.goto();

    await signupPage.signupLinkLocator.click();

    // Check the CSS of the Close button
    const locator = signupPage.closeBtn;
    await expect(locator).toHaveCSS('border-top-style', 'solid');

});