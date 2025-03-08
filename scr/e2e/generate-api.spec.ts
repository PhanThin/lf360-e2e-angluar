import { test, expect } from '@playwright/test';
test('Generate API', async ({ page }) => {
    //await page.locator('li:has-text("Info") a').click();
    await page.goto('/lfr3/#/help/api');
    await expect(page).toHaveURL('/lfr3/#/help/api');
    await page.getByText('Generate new API token').click();
    await page.getByRole('button', { name: 'OK' }).click();
    await page.locator('span[class="ng-scope ng-binding"]',{hasText: 'Your new API key'}).waitFor();
    await console.log(await page.locator('span[translate-values="modalData"]').innerText());
    await page.screenshot({ path: './screenshots/generate-api.png', fullPage: true });
    await page.getByRole('button', { name: 'OK' }).click();
    console.log('Passed: GENERATE API');

});
