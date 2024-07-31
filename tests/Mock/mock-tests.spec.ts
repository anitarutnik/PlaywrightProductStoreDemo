import { expect, test } from "../../page-models/base";

test("mock adding products to cart", async ({ page, productPage, homePage }) => {
    await page.route('https://api.demoblaze.com/viewcart', route => {
        const mockResponse = {
            "Items": [
                {
                    "cookie": "user=f07ebb28-976c-04a6-fe97-65a6f0f55909",
                    "id": "385ded9e-0064-0790-2334-fce2cc3df487",
                    "prod_id": 1
                },
                {
                    "cookie": "user=f07ebb28-976c-04a6-fe97-65a6f0f55909",
                    "id": "385ded9e-0064-0790-2334-fce2cc3df487",
                    "prod_id": 2
                }
            ]
        };
        route.fulfill({
            contentType: 'application/json',
            body: JSON.stringify(mockResponse)
        });
    });
    await page.goto('https://www.demoblaze.com');
    await page.waitForLoadState('networkidle');
    await page.getByRole('link', { name: 'Cart' }).click();
    await page.waitForLoadState('networkidle');

    const cartItemSamsung = await page.getByRole('cell', { name: 'Samsung galaxy s6' })
    const cartItemNokia = await page.getByRole('cell', { name: 'Nokia lumia' });

    await expect(cartItemSamsung).toBeVisible();
    await expect(cartItemNokia).toBeVisible();
});

test("mock view product details", async ({ page, homePage }) => {
    await page.route('https://api.demoblaze.com/view', route => {
        const mockResponse = {
            "cat": "phone",
            "desc": "The Samsung Galaxy S6 is powered by 1.5GHz octa-core Samsung Exynos 7420\n processor and it comes with 3GB of RAM. The phone packs 32GB of \ninternal storage cannot be expanded. ",
            "id": 1,
            "img": "imgs/galaxy_s6.jpg",
            "price": 360.0,
            "title": "Samsung galaxy s6"
        };
        route.fulfill({
            contentType: 'application/json',
            body: JSON.stringify(mockResponse)
        });
    });

    await homePage.goto();
    await page.waitForLoadState('networkidle');
    await homePage.phonesCat.click();
    await page.waitForLoadState('networkidle');
    await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
    await page.waitForLoadState('networkidle');

    const productTitle = await page.getByRole('heading', { name: 'Samsung galaxy s6' });
    const productDescription = await page.getByText('The Samsung Galaxy S6 is');
    const productPrice = await page.getByRole('heading', { name: '$360 *includes tax' });

    await expect(productTitle).toBeVisible();
    await expect(productDescription).toBeVisible();
    await expect(productPrice).toBeVisible();
});

test("mock product cat list ", async ({ page, homePage }) => {
    // Mock the api call before navigating
    await page.route('https://api.demoblaze.com/bycat', route => {
        // Provide a mock response
        const mockResponse = {
            "Items": [
                {
                    "cat": "phone",
                    "desc": "The Samsung Galaxy S6 is powered by 1.5GHz octa-core Samsung Exynos 7420\n processor and it comes with 3GB of RAM. The phone packs 32GB of \ninternal storage cannot be expanded. ",
                    "id": 1,
                    "img": "imgs/galaxy_s6.jpg",
                    "price": 360.0,
                    "title": "Samsung galaxy s6"
                },
                {
                    "cat": "phone",
                    "desc": "The Nokia Lumia 1520 is powered by 2.2GHz quad-core Qualcomm Snapdragon 800 processor and it comes with 2GB of RAM. ",
                    "id": 2,
                    "img": "imgs/Lumia_1520.jpg",
                    "price": 820.0,
                    "title": "Nokia lumia 1520"
                },
            ]
        }
        route.fulfill({
            contentType: 'application/json',
            body: JSON.stringify(mockResponse)
        });
    });

    await homePage.goto()
    await homePage.phonesCat.click();

    const prod1 = await page.getByRole('link', { name: 'Nokia lumia' })
    const prod2 = await page.getByRole('link', { name: 'Samsung galaxy s6' })

    await expect(prod1).toBeVisible()
    await expect(prod2).toBeVisible()
});
