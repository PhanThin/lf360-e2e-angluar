import { Page, test } from "@playwright/test";
import InputFieldsPage from "../pages/validation-report/input-fields.page";
import OutputReportPage from "../pages/validation-report/output-report.page";
import MainNavigationBarPage from "../pages/main-navigation-bar.page";
import * as process from "process";
import { ValidationReportTypeEnum } from "../enum/ValidationReportTypeEnum";
import { TimeRangerFilterEnum } from "../enum/TimeRangerFilterEnum";
import { ViewModeEnum } from "../enum/ValidationReportViewModeEnum";

test.describe.serial('validation report', () => {
    test.use({ storageState: './session/pta_linhht.json' });

    let inputFieldsPage: InputFieldsPage;
    let outputReportPage: OutputReportPage;
    let mainNavigationBar: MainNavigationBarPage;

    test.beforeEach(async ({ browser, page }) => {
        //const context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
        //page = await context.newPage();
        inputFieldsPage = new InputFieldsPage(page);
        outputReportPage = new OutputReportPage(page);
        mainNavigationBar = new MainNavigationBarPage(page);


        await page.goto('/lfr3/#/tracking');
        await page.waitForLoadState("load");
        await page.locator('.lf-loader-overlay .lf-spinner').waitFor({ state: "detached" });
        await mainNavigationBar.wocStep1.click();
        await page.locator('.lf-loader-overlay .lf-spinner').waitFor({ state: "detached" });
    });

    async function doTestForAnItem(viewMode: ViewModeEnum, timeRangeFilter: TimeRangerFilterEnum, stepNumber: number, typeReport: ValidationReportTypeEnum) {
        await test.step(typeReport + ' - ' + viewMode, async () => {
            await outputReportPage.doTestBy(viewMode, timeRangeFilter, stepNumber, typeReport);
        })
    }

    async function doTest(timeRangeFilter: TimeRangerFilterEnum, page: Page) {

        await inputFieldsPage.btnShow.click(); // Click "Show" button

        // Wait for the spinner to disappear
        if (!await outputReportPage.waitSpinnerEnd())
            await page.waitForSelector('.initial-message', { state: 'detached' })
        
        if (await outputReportPage.wocViewBy.isVisible()) {
            if (process.env.npm_package_config_mode == 'full') {
                await doTestForAnItem(ViewModeEnum.RESOURCE, timeRangeFilter, 1, ValidationReportTypeEnum.LABOR);
                await doTestForAnItem(ViewModeEnum.TEAM, timeRangeFilter, 2, ValidationReportTypeEnum.LABOR);
                await doTestForAnItem(ViewModeEnum.PROJECT, timeRangeFilter, 3, ValidationReportTypeEnum.LABOR);
                await doTestForAnItem(ViewModeEnum.ACTIVITY, timeRangeFilter, 4, ValidationReportTypeEnum.LABOR);
            } else {
                let timeDone: number = 1;
                let countStep: number = 0;
                await doTestForAnItem(ViewModeEnum.RESOURCE, timeRangeFilter, countStep, ValidationReportTypeEnum.LABOR);
                await doTestForAnItem(ViewModeEnum.PROJECT, timeRangeFilter, countStep, ValidationReportTypeEnum.LABOR); countStep++;
                await doTestForAnItem(ViewModeEnum.TEAM, timeRangeFilter, countStep, ValidationReportTypeEnum.LABOR); countStep++;

                if (await page.locator('div[class="medium-12 columns no-content ng-scope"]', { hasText: /There is no content for the given dates and filter/ }).isVisible()) {
                    countStep = 0
                    await doTestForAnItem(ViewModeEnum.RESOURCE, timeRangeFilter, countStep, ValidationReportTypeEnum.EQUIPMENT); countStep++;
                    await doTestForAnItem(ViewModeEnum.TEAM, timeRangeFilter, countStep, ValidationReportTypeEnum.EQUIPMENT); countStep++;
                    await doTestForAnItem(ViewModeEnum.PROJECT, timeRangeFilter, countStep, ValidationReportTypeEnum.EQUIPMENT); countStep++;
                    timeDone++;
                }

                if (await page.locator('div[class="medium-12 columns no-content ng-scope"]', { hasText: /There is no content for the given dates and filter/ }).isVisible()) {
                    countStep = 0
                    await doTestForAnItem(ViewModeEnum.RESOURCE, timeRangeFilter, countStep, ValidationReportTypeEnum.MATERIAL); countStep++;
                    await doTestForAnItem(ViewModeEnum.PROJECT, timeRangeFilter, countStep, ValidationReportTypeEnum.MATERIAL); countStep++;
                    await doTestForAnItem(ViewModeEnum.TEAM, timeRangeFilter, countStep, ValidationReportTypeEnum.MATERIAL); countStep++;
                    timeDone++;
                }
                return timeDone;
            }
        }
        return 3;
    }

    test('test validation report', async ({ page }) => {
        let timeDone: number;
        console.log('this week');
        await test.step('this week', async () => {
            // Tick the checkbox time span with the option is "This Week"
            await inputFieldsPage.timeframe_thisweek.setChecked(true);
            timeDone = await doTest(TimeRangerFilterEnum.THIS_WEEK, page);
        })
        // let continueTesting : boolean;
        // continueTesting = outputReportPage.countMassEdit < (process.env.npm_package_config_mode == 'full' ? 4 : 1);
        // if (continueTesting || await page.locator('div[class="medium-12 columns no-content ng-scope"]',{hasText:/There is no content for the given dates and filter/}).isVisible()){
        //     console.log('last week');
        //     await test.step('last week', async () => {
        //         await inputFieldsPage.timeframe_lastweek.setChecked(true);
        //         timeDone = await doTest('last week', page);
        //     })
        // }
        // continueTesting = outputReportPage.countMassEdit < (process.env.npm_package_config_mode == 'full' ? 4 : 1);
        // if (continueTesting || await page.locator('div[class="medium-12 columns no-content ng-scope"]',{hasText:/There is no content for the given dates and filter/}).isVisible() || timeDone < 3) {
        //     console.log('this month');
        //     await test.step('this month', async () => {
        //         await inputFieldsPage.timeframe_thismonth.setChecked(true);
        //         timeDone =  await doTest('this month', page);
        //     })
        // }
        // continueTesting = outputReportPage.countMassEdit < (process.env.npm_package_config_mode == 'full' ? 4 : 1);
        // if (continueTesting || await page.locator('div[class="medium-12 columns no-content ng-scope"]',{hasText:/There is no content for the given dates and filter/}).isVisible()  || timeDone < 3){
        //     console.log('last month');
        //     await test.step('last month', async () => {
        //         await inputFieldsPage.timeframe_lastmonth.setChecked(true);
        //         timeDone =  await doTest('last month', page);
        //     })
        // }
    })

})

