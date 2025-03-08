import { test, expect } from '@playwright/test';

test('Create/edit/delete a hexa geozone', async ({ page, baseURL }) => {

    await page.goto('/lfr3/#/settings/categories');

    await page.locator('#setting-geozones-create').click();

    await page.locator('.fi-shape-hexagon').click();
    await page.getByPlaceholder('Name').click();
    const geozoneName = 'hexa geozone name '+Date.now();
    await page.getByPlaceholder('Name').fill(geozoneName);
    await page.getByPlaceholder('Name').press('Tab');
    const geozoneRef = 'Reference ' + Date.now();
    await page.getByPlaceholder('Reference').fill(geozoneRef);
    await page.locator('.geozone_category').click();

    await page.locator('.medium-12.columns.geozone-category-dropdown-element').nth(0).click()
    await page.getByPlaceholder('Address').click();
    await page.getByPlaceholder('Address').fill('Ha noi Viet Nam');

    await page.getByPlaceholder('Description').click();
    await page.getByPlaceholder('Description').fill('hesa zone description');
    await page.getByPlaceholder('Contact').fill('quynd');
    await page.getByPlaceholder('Contact').press('Tab');
    await page.locator('#setting-geozones-phone input[type="text"]').first().fill('84');
    await page.getByPlaceholder('Phone').fill('90453534545');
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill('quyndhexa@bitnemo.vn');
    await page.getByRole('button', { name: 'Save' }).click();

    /* find and edit begin*/
    await page.locator('input[aria-label="Name"]').type(geozoneName);

    await page.locator('a[user-permissions="settings.geozones.update"]').waitFor();

    await page.getByRole('button', { name: '' }).click();
    await page.getByPlaceholder('Name').click();
    await page.getByPlaceholder('Name').fill(geozoneName+' edit');
    await page.getByPlaceholder('Name').press('Tab');
    await page.getByPlaceholder('Reference').fill(geozoneRef+' edit');

    await page.getByPlaceholder('Description').click();
    await page.getByPlaceholder('Description').fill('hesa zone description  edit');
    await page.getByPlaceholder('Contact').fill('quynd  edit');
    await page.getByPlaceholder('Contact').press('Tab');
    await page.locator('#setting-geozones-phone input[type="text"]').first().fill('84');
    await page.getByPlaceholder('Phone').fill('9999999999');

    await page.getByRole('button', { name: 'Save' }).click();
    /* find and edit end*/
    /*delete begin*/

    await page.locator('a[user-permissions="settings.geozones.delete"]').click();

    const url = baseURL+'/lfr3/eg-services/places';
    const [response] = await Promise.all([
        page.waitForResponse(res => {
            return res.status() == 200
                &&
                res.url() == baseURL+'/lfr3/eg-services/account/countResource'
        }),
    ])
    await page.getByRole('button', { name: 'Delete' }).click();
    await response.finished();

    await page.locator('.lf-spinner').waitFor({state: "detached"});
    await page.locator('.lf-spinner').waitFor({state: "hidden"});
    await page.locator('input[aria-label="Name"]').fill('');
    await page.locator('input[aria-label="Name"]').type(geozoneName);
    expect(await page.locator('a[user-permissions="settings.geozones.delete"]').isVisible()).not.toBeTruthy();
    /*delete end*/
});