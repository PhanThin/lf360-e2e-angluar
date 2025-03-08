import { chromium, FullConfig } from '@playwright/test';
import LoginPage from "../pages/login.page";
import accounts from '../../resource/login-account/accounts.json';
import {existsSync, statSync} from "fs";

function getServerBasedOnUrl(url: string){
    if (url.indexOf('pta') > 0) return 'pta';
    if (url == 'https://logifleet360.ch/') return 'prd';
    return 'int'; //dev and int use the same accounts of int
}

function isNeedLogin(filename){
    let bDoLogin : boolean = false;
    if (!existsSync(filename)) {
        bDoLogin = true;
    } else {
        const stat = statSync(filename);
        bDoLogin = Date.now() - stat.mtimeMs > 10*60*60*1000;
    }
    return bDoLogin;
}

async function loginAndSaveState(baseUrl: string, server: string){

    const browser = await chromium.launch();
    for (const account of accounts["accounts_"+server]) {
        if (account.user != ''){
            const filename = accounts.dir+account.filename;
            if (!isNeedLogin(filename)) continue;
            console.log("Logging in for user: "+account.user);
            const page = await browser.newPage();
            let loginPage = await new LoginPage(page);
            await loginPage.visit_globalsetup(baseUrl);
            await loginPage.login(account.user, account.password);
            await page.waitForURL(/tracking/, {timeout: 240*1000});
            await loginPage.saveLogedinState(filename);
            await page.close();
        }
    }
    await browser.close();
}

async function globalSetup(config: FullConfig) {
    const baseUrl = config.projects[0].use.baseURL;
    await loginAndSaveState(baseUrl, getServerBasedOnUrl(baseUrl));
}

export default globalSetup;