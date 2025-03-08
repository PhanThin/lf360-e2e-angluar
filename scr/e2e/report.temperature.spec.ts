import { test, expect } from '@playwright/test';
test.use({
    storageState: 'E:\\SourceCode\\autotest_pta_LF_critical\\pta_annguyen.json',
    viewport: { width: 1500, height: 1300 }
});
test('temperature report', async ({ page }) => {
    // Go to https://pta.logifleet360.ch/lfr3/#/reports/viewer/temperature_details
    await page.goto('/lfr3/#/reports/viewer/temperature_details');
    // Click text=Last 7 days
    await page.locator('text=Last 7 days').click();
    // Click button:has-text("Show")
    await page.locator('button:has-text("Show")').click();
    //await page.locator('.k-loading-mask .k-loading-image').waitFor({state: "visible"});
    //await page.locator('.k-loading-mask .k-loading-image').waitFor({state: "detached"});

    await page.locator('.lf-loader-overlay .lf-spinner').waitFor({state: "detached"});
    // const content = document.querySelector('div[class="columns report-rendering-row medium-9"]');
    // const innerScroll = content.shadowRoot.querySelector('div[class="report-scrollable temperature-chart-shown"]');
    // const addHeight = innerScroll.scrollHeight - content.clientHeight + 720;
    // await page.setViewportSize({width: 1280, height: addHeight});

    await page.screenshot({ path: './screenshots/report-temperature.png', fullPage: true })
    await page.locator('div[class="report-scrollable temperature-chart-shown"]').screenshot({ path: './screenshots/report-temperature-table.png'})
});