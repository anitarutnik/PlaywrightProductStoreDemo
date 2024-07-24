import { expect, test } from "../../page-models/base";

test('Add to cart api test', async ({ request }) => {

  // Adding product to the cart
  const response = await request.post('https://api.demoblaze.com/addtocart', {
    headers: {
      'Content-Type': 'application/json',  // Ensure the content type is set correctly
    },
    data: {
      "id": "5413d8be-0931-c4b5-d645-0af62d62c35e",
      "cookie": "user=f07ebb28-976c-04a6-fe97-65a6f0f55909",
      "prod_id": 1,
      "flag": false
    }
  });

  expect(response.ok()).toBeTruthy();
});

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
