import { test as baseTest } from "@playwright/test";

import LoginPage from "../pages/login.page";


const test = baseTest.extend<{loginPage: LoginPage; }>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
})

export default test;
export const expect = test.expect;