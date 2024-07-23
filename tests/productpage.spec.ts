import { request } from 'http';
import { test, expect } from '../page-models/base';

test('add to cart success', async ({ page, productPage }) => {
    await productPage.goto();

    //Wait for the alert to appear and verify its content
    page.on('dialog', async dialog => {

        //Check the dialog message
        await expect(dialog.message()).toBe('Product added');

        //Click the Ok button
        await dialog.accept();

    });

    //Click the product link.
    await productPage.productLink.click();

    //Click Add to cart
    await productPage.addBtn.click();

    //Visual comparisons
    // await expect(page).toHaveScreenshot();
});

test('check if phone is in the cart', async ({ page, productPage }) => {
    await productPage.goto();

    //Wait for the alert to appear and verify its content
    page.on('dialog', async dialog => {

        //Check the dialog message
        await expect(dialog.message()).toBe('Product added');

        //Click the Ok button
        await dialog.accept();

    });

    //Click the product link.
    await productPage.productLink.click();

    //Click Add to cart
    await productPage.addBtn.click();


    // Wait for the cart link to be visible and then click it
    await productPage.cartLink.waitFor({ state: 'visible' });
    await productPage.cartLink.click();

    // Wait for the added product to be visible in the cart
    await productPage.addedProduct.waitFor({ state: 'visible' });

    // Expect the product to be visible in the cart
    await expect(productPage.addedProduct).toBeVisible();
});

test('product visual comparisons test', async ({ page, productPage }) => {
    await productPage.goto();
    await productPage.productLink.click();
    // await expect(page).toHaveScreenshot();
})

test('integration test prod page request', async ({ page, productPage }) => {
    await productPage.goto();

    page.on('request', (request) => {
        // url() - request route
        if (request.url().includes('api.demoblaze.com/view')) {
            expect(request.postDataJSON()).toEqual({
                "id": '1'
            });
        }
    });

    await productPage.productLink.click();

    await page.waitForLoadState('networkidle');

});

test('integration test prod page response', async ({ page, productPage }) => {
    await productPage.goto();
    page.on('response', async (response) => {
        if (response.url().includes('api.demoblaze.com/view')) {
            const responseBody = await response.json();
            expect(responseBody).toEqual({
                "cat": "phone",
                "desc": "The Samsung Galaxy S6 is powered by 1.5GHz octa-core Samsung Exynos 7420\n processor and it comes with 3GB of RAM. The phone packs 32GB of \ninternal storage cannot be expanded. ",
                "id": 1,
                "img": "imgs/galaxy_s6.jpg",
                "price": 360,
                "title": "Samsung galaxy s6"
            })
        }
    });

    await productPage.productLink.click();

    await page.waitForLoadState('networkidle');

});

test('integration test for adding product to cart', async ({ page, homePage, productPage }) => {
    await homePage.goto();

    await homePage.samsungPhone.click();
    await page.waitForLoadState('networkidle');

    page.on('request', (request) => {
      if (request.url().includes('api.demoblaze.com/addtocart')) {
        expect(request.postDataJSON()).toEqual({
          "id": expect.any(String),
          "cookie": expect.any(String),
          "prod_id": 1,
          "flag": false
        });
      }
    });

    await productPage.cartLink.click();
    await page.on('dialog', dialog => dialog.accept());
    await page.waitForLoadState('networkidle');
  });
