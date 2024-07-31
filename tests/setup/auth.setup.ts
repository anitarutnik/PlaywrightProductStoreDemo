import { LoginPage } from "../../page-models/login.page"
import { expect, test as setup } from '@playwright/test';
import { STORAGE_STATE } from "../../playwright.config";

setup('authenticate', async ({ page }) => {
    const login = new LoginPage(page);
    await login.logIn('test', 'test');
    await expect(login.loggedInUser).toBeVisible({ timeout: 20000});

    await page.context().storageState({path: STORAGE_STATE})
});