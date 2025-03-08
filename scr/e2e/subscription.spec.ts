import { test, expect } from '@playwright/test';

test('create/edit/delete a subscription', async ({ page }) => {


    await page.goto('/lfr3/#/reports/subscriptions');

    await page.locator('#reportAddSubscription').click();

    await page.locator('form[name="subscriptionCreationForm"]').getByText('None').first().click();

    await page.getByRole('option', { name: 'Geozone activities' }).click();

    await page.locator('span[role="listbox"]:has-text("NoneNoneDailyWeeklyMonthly") span').nth(2).click();

    await page.getByRole('option', { name: 'Weekly' }).click();

    let subName = 'subcsription critical'+Math.floor(Date.now() / 1000);
    await page.locator('input[ng-model="subscription.name"]').fill(subName);

    await page.getByRole('link', { name: 'Report options' }).click();

    await page.locator('#reportSubscriptionOptionVehicle').click();
    await page.getByRole('option', { name: 'All' }).click();

    await page.locator('label:has-text("Select drivers"):visible').locator('.k-widget.k-multiselect.k-header:visible').click();
    try {
        await page.getByRole('option', { name: 'All' }).click({timeout : 1000});
    } catch (e){
        await page.locator('label:has-text("Select drivers"):visible').locator('.k-widget.k-multiselect.k-header:visible').click();
        await page.getByRole('option', { name: 'All' }).click({timeout : 1000});
    }

    await page.locator('label:has-text("Select geozones"):visible').locator('.k-widget.k-multiselect.k-header:visible').click();
    try {
        await page.getByRole('option', { name: 'All' }).click({timeout : 1000});
    } catch (e){
        await page.locator('label:has-text("Select geozones"):visible').locator('.k-widget.k-multiselect.k-header:visible').click();
        await page.getByRole('option', { name: 'All' }).click({timeout : 1000});
    }


    await page.locator('li:has-text("Distribution")').getByRole('link', { name: 'Distribution' }).click();

    await page.locator('#reportSubscriptionDistributionEmailRecipients').click();
    try {
        await page.getByRole('option', { name: 'quynd' }).click({timeout: 1000});
    } catch (e){
        await page.locator('#reportSubscriptionDistributionEmailRecipients').click();
        await page.getByRole('option', { name: 'quynd' }).click({timeout: 1000});
    }



    await page.getByLabel('Subject').click();

    await page.getByLabel('Subject').fill('subject');

    await page.getByLabel('Email content').click();

    await page.getByLabel('Email content').fill('content');

    await page.getByRole('button', { name: 'Save' }).click();

    console.log('Passed: CREATED A NEW SUBSCRIPTION. Name: '+subName);

    await page.locator('input[aria-label="Name"]').type(subName);

    await page.locator('a[user-permissions="report.subscription.update"]').waitFor();
    await page.locator('a[user-permissions="report.subscription.update"]').click();

    await page.locator('input[name="name"]').fill(subName+' edit');

    await page.locator('span[role="listbox"]:has-text("WeeklyNoneDailyWeeklyMonthly") span').nth(3).click();

    await page.getByRole('option', { name: 'Daily' }).click();

    await page.getByRole('button', { name: 'Save' }).click();

    console.log('Passed: EDITED THE SUBSCRIPTION. New name: '+subName+ ' edit');

    await page.locator('a[user-permissions="report.subscription.delete"]').waitFor();
    await page.locator('a[user-permissions="report.subscription.delete"]').click();
    await page.locator('span[translate="common.form.are_you_sure"]').waitFor();
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.locator('.lf-spinner').waitFor({state: "detached"});
    await page.locator('.lf-spinner').waitFor({state: "hidden"});
    await page.locator('input[aria-label="Name"]').fill('');
    await page.locator('input[aria-label="Name"]').type(subName);
    await page.locator('a[user-permissions="report.subscription.delete"]').waitFor({state: "hidden"});
    expect(await page.locator('a[user-permissions="report.subscription.delete"]').isVisible()).not.toBeTruthy();

    console.log('Passed: DELETED THE SUBSCRIPTION! Name: '+subName+ ' edit');

});