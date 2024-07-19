import { test, expect } from '../page-models/base';

test('Phones category properly listed', async ({ homePage }) => {
    await homePage.goto();

    //Click on the "Phones" category
    await homePage.phonesCat.click();

    //Expects that only phones are listed
    await expect(homePage.samsungPhone).toBeVisible();

    //Expects that products from other categories are not listed
    await expect(homePage.sonyLaptop).not.toBeVisible();

    await expect(homePage.appleMonitor).not.toBeVisible();

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

