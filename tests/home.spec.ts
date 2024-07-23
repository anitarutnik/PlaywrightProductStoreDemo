import { test, expect } from '../page-models/base';

test('Phones category properly listed', async ({ page, homePage }) => {
    await homePage.goto();

    //Click on the "Phones" category
    await homePage.phonesCat.click();

    //Expects that only phones are listed
    await expect(homePage.samsungPhone).toBeVisible();

    //Expects that products from other categories are not listed
    await expect(homePage.sonyLaptop).not.toBeVisible();

    await expect(homePage.appleMonitor).not.toBeVisible();

    //Visual comparisons
    // await expect(page).toHaveScreenshot();


});

test('Laptops category properly listed', async ({ homePage }) => {
    await homePage.goto();

    //Click on the "Laptops" category
    await homePage.laptopsCat.click();

    //Expects that only laptops are listed
    await expect(homePage.sonyLaptop).toBeVisible();

    //Expects that products from other categories are not listed
    await expect(homePage.samsungPhone).not.toBeVisible();

    await expect(homePage.appleMonitor).not.toBeVisible();

});

test('Monitors category properly listed', async ({ homePage }) => {
    await homePage.goto();

    //Click on the "Monitors" category
    await homePage.monitorsCat.click();

    //Expects that only monitors are listed
    await expect(homePage.appleMonitor).toBeVisible();

    //Expects that products from other categories are not listed
    await expect(homePage.samsungPhone).not.toBeVisible();

    await expect(homePage.sonyLaptop).not.toBeVisible();

});

test('navigation CSS check', async ({ homePage }) => {
    await homePage.goto();

    //Check the navigation styling
    await expect(homePage.homeNav).toHaveCSS('position', 'relative');

});


test('footer CSS check', async ({ homePage }) => {
    await homePage.goto();

    //Check the footer styling
    await expect(homePage.homeFoot).toHaveCSS('padding-bottom', '48px');

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
    await page.waitForLoadState('networkidle');

    page.on('response', async (response) => {

        if (response.url().includes('api.demoblaze.com/bycat')) {
            const responseBody = await response.json();
            // responseBody.forEach(async element => {
            expect(responseBody).toEqual({
                "cat": "phone",
                "desc": "The Nokia Lumia 1520 is powered by 2.2GHz quad-core Qualcomm Snapdragon 800 processor and it comes with 2GB of RAM. ",
                "id": 2,
                "img": "imgs/Lumia_1520.jpg",
                "price": 820.0,
                "title": "Nokia lumia 1520"
            })
        }
    });

    await homePage.phonesCat.click();
    await page.waitForLoadState('networkidle');
});

  


