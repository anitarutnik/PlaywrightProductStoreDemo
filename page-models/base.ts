import { test as base } from "@playwright/test"
import { LoginPage } from "./login.page"
import { SignupPage } from "./signup.page"
import { HomePage } from "./home.page"
import { CartPage } from "./cart.page"
import { ContactPage } from "./contact.page"
import { ProductPage } from "./productpage.page"

type MyFixtures = {
    loginPage: LoginPage
    signupPage: SignupPage
    homePage: HomePage
    cartPage: CartPage;
    contactPage: ContactPage;
    productPage: ProductPage;
}

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page))

    },

    signupPage: async ({ page }, use) => {
        await use(new SignupPage(page))
    },

    homePage: async ({ page }, use) => {
        await use(new HomePage(page))
    },

    cartPage: async ({ page }, use) => {
        await use(new CartPage(page))
    },

    contactPage: async ({ page }, use) => {
        await use(new ContactPage(page))
    },

    productPage: async ({ page }, use) => {
        await use(new ProductPage(page))
    },
})

export { expect } from "@playwright/test"


