import {test, expect, Response} from '@playwright/test';


test('Create/edit/delete a circle geozone', async ({ page, baseURL }) => {

    await page.goto('/lfr3/#/settings/categories');

    await page.locator('#setting-geozones-create').click();

    await page.getByPlaceholder('Name').click();

    const geozoneName = 'geozone name '+Date.now();
    await page.getByPlaceholder('Name').fill(geozoneName);

    await page.getByPlaceholder('Name').press('Tab');

    const geozoneRef = 'Reference ' + Date.now();
    await page.getByPlaceholder('Reference').press('Tab');

    await page.getByPlaceholder('Reference').click();

    await page.getByPlaceholder('Reference').fill(geozoneRef);

    await page.getByPlaceholder('Reference').press('Tab');

    await page.locator('.geozone_category').click();

    await page.locator('.medium-12.columns.geozone-category-dropdown-element').nth(0).click()

    await page.getByRole('spinbutton').click();

    await page.getByRole('spinbutton').fill('200');

    await page.getByPlaceholder('Address').click();

    await page.getByPlaceholder('Address').fill('Ha Noi Viet Nam');

    await page.getByPlaceholder('Description').click();

    await page.getByPlaceholder('Description').fill('Bitnemo Vietnam');

    await page.getByPlaceholder('Contact').click();

    await page.getByPlaceholder('Contact').fill('geozone contact');

    await page.getByPlaceholder('Contact').press('Tab');

    await page.locator('#setting-geozones-phone input[type="text"]').first().fill('84');

    await page.locator('#setting-geozones-phone input[type="text"]').first().press('Tab');

    await page.getByPlaceholder('Phone').fill('99955599');

    await page.getByPlaceholder('Email').click();

    await page.getByPlaceholder('Email').fill('quynd@bitnemo.vn');

    await page.screenshot({ path: './screenshots/geozone-01-create.png', fullPage: true });

    await page.getByRole('button', { name: 'Save' }).click();
    console.log('Passed: CREATED GEOZONE. Named: '+geozoneName);
    

    /* find and edit begin*/


    await page.locator('input[aria-label="Name"]').type(geozoneName);

    await page.locator('a[user-permissions="settings.geozones.update"]').waitFor();

    await page.screenshot({ path: './screenshots/geozone-02-filter.png', fullPage: true });

    await page.getByRole('button', { name: '' }).click();

    await page.getByPlaceholder('Name').click();

    await page.getByPlaceholder('Name').fill(geozoneName+' edit');

    await page.getByPlaceholder('Reference').click();

    await page.getByPlaceholder('Reference').fill(geozoneRef+' edit');

    await page.getByRole('spinbutton', { name: '200' }).click();

    await page.getByRole('spinbutton').fill('259');

    await page.getByPlaceholder('Description').click();

    await page.getByPlaceholder('Description').fill('Bitnemo Vietnam edit');

    await page.getByPlaceholder('Contact').click();

    await page.getByPlaceholder('Contact').fill('geozone contact edit');

    await page.getByPlaceholder('Phone').click();

    await page.getByPlaceholder('Phone').fill('999555991');

    await page.screenshot({ path: './screenshots/geozone-03-editing.png', fullPage: true });
    await page.getByRole('button', { name: 'Save' }).click();
    console.log('Passed: EDITED GEOZONE');
    /* find and edit end*/
    /*delete begin*/

    await page.locator('a[user-permissions="settings.geozones.delete"]').click();
    await page.locator('span[translate="common.form.are_you_sure"]').waitFor();
    await page.screenshot({ path: './screenshots/geozone-04-beforedelete.png', fullPage: true });


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
    if (await page.locator('a[user-permissions="settings.geozones.delete"]').isVisible()){
        await page.locator('a[user-permissions="settings.geozones.delete"]').waitFor({state: "hidden", timeout:2000});
        await page.locator('a[user-permissions="settings.geozones.delete"]').waitFor({state: "detached", timeout:2000});
    }
    await page.locator('input[aria-label="Name"]').fill('');
    await page.locator('input[aria-label="Name"]').type(geozoneName);
    expect(await page.locator('a[user-permissions="settings.geozones.delete"]').isVisible()).not.toBeTruthy();

    console.log('Passed: DELETED. Named: '+geozoneName+' edit')
    /*delete end*/
});