import { expect, test } from "../../page-models/base";

test('integration test for deleting product from cart', async ({ page, homePage, productPage, cartPage }) => {
    await homePage.goto();

    await homePage.samsungPhone.click();
    await page.waitForLoadState('networkidle');

    await productPage.addBtn.click();
    await page.on('dialog', dialog => dialog.accept());
    await page.waitForLoadState('networkidle');

    await productPage.cartLink.click();
    await page.waitForLoadState('networkidle');

    page.on('request', (request) => {
      if (request.url().includes('api.demoblaze.com/deletecart')) {
        expect(request.postDataJSON()).toEqual({ "id": expect.any(String) });
      }
    });

    await cartPage.deleteBtn.click();
    await page.waitForLoadState('networkidle');
  });