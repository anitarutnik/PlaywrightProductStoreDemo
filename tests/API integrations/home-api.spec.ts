import { expect, test } from "../../page-models/base";

test('Add to cart api test', async ({ request }) => {

  const response = await request.get('https://api.demoblaze.com/entries');

  expect(response.ok()).toBeTruthy();
});

test('Phones category properly listed using API call', async ({ request }) => {
  // Making the API call
  const response = await request.post('https://api.demoblaze.com/bycat', {
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      "cat": "phone"
    }
  });

  // Check if the response is OK
  expect(response.ok()).toBeTruthy();

  // Parse the response JSON
  const catItems = await response.json();

  catItems.Items.forEach(async item => {
    expect(item).toHaveProperty('cat', 'phone');
  });
});

test('Laptops category properly listed using API call', async ({ request }) => {
  // Making the API call
  const response = await request.post('https://api.demoblaze.com/bycat', {
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      "cat": "notebook"
    }
  });

  // Check if the response is OK
  expect(response.ok()).toBeTruthy();

  // Parse the response JSON
  const catItems = await response.json();

  catItems.Items.forEach(async item => {
    expect(item).toHaveProperty('cat', 'notebook');
  });
});

test('integration test home page request', async ({ page, homePage }) => {
    await homePage.goto();

    page.on('request', (request) => {
        // url() - request route
        if (request.url().includes('api.demoblaze.com/bycat')) {
            expect(request.postDataJSON()).toEqual({
                "cat": "phone"
            });
        }
    });

    await homePage.phonesCat.click();

    await page.waitForLoadState('networkidle');

});

test('integration test home page response', async ({ page, homePage }) => {
    await homePage.goto();
    // await page.waitForLoadState('networkidle');

    page.on('response', async (response) => {
        if (response.url().includes('api.demoblaze.com/bycat')) {
            const responseBody = await response.json();
            responseBody.Items.forEach(element => {
                expect(element).toHaveProperty('cat', 'phone');
            })
        }
    });

    await homePage.phonesCat.click();
    await page.waitForLoadState('networkidle');
});


