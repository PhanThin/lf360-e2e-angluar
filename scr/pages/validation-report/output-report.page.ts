import Wrapper from "../../base/Wrapper";
import { expect, Locator, Page, test } from "@playwright/test";
import ConfirmModalPage from "../confirm-modal.page";
import EditCommentPage from "./edit-comment.page";
import EditActivityPage from "./edit-activity.page";
import EditDateDurationPage from "./edit-dateduration.page";
import EditWbsPage from "./edit-wbs.page";

import { ValidationReportTypeEnum } from "../../enum/ValidationReportTypeEnum";
import { TimeRangerFilterEnum } from "../../enum/TimeRangerFilterEnum";
import { ViewModeEnum } from "../../enum/ValidationReportViewModeEnum";

class DateRow {
    private _dailyRows_element: Locator;
    get dailyRows_element(): Locator {
        return this._dailyRows_element;
    }
    set dailyRows_element(value: Locator) {
        this._dailyRows_element = value;
    }
}

export default class OutputReportPage extends Wrapper {

    get countMassEdit(): number {
        return this._countMassEdit;
    }

    set countMassEdit(value: number) {
        this._countMassEdit = value;
    }
    get listBoxViewBy(): Locator {
        return this._listBoxViewBy;
    }

    set listBoxViewBy(value: Locator) {
        this._listBoxViewBy = value;
    }
    get wocViewBy(): Locator {
        return this._wocViewBy;
    }

    set wocViewBy(value: Locator) {
        this._wocViewBy = value;
    }
    get totalUnValidateEachDayWithoutConflict(): number[] {
        return this._totalUnValidateEachDayWithoutConflict;
    }

    set totalUnValidateEachDayWithoutConflict(value: number[]) {
        this._totalUnValidateEachDayWithoutConflict = value;
    }
    get arrChildItemOfDay(): Locator[][] {
        return this._arrChildItemOfDay;
    }

    set arrChildItemOfDay(value: Locator[][]) {
        this._arrChildItemOfDay = value;
    }
    get prevItem(): Locator {
        return this._prevItem;
    }

    set prevItem(value: Locator) {
        this._prevItem = value;
    }
    get totalRow(): Locator {
        return this._totalRow;
    }

    set totalRow(value: Locator) {
        this._totalRow = value;
    }
    get listDuration(): Locator {
        return this._listDuration;
    }

    set listDuration(value: Locator) {
        this._listDuration = value;
    }


    get expandableGroupedByDayRows(): Locator {
        return this._expandableGroupedByDayRows;
    }

    set expandableGroupedByDayRows(value: Locator) {
        this._expandableGroupedByDayRows = value;
    }

    get listValidateButton(): Locator {
        return this._listValidateButton;
    }

    set listValidateButton(value: Locator) {
        this._listValidateButton = value;
    }

    private _totalDuration: Locator;
    private _listDuration: Locator;
    private _expandableGroupedByDayRows: Locator;
    private _listValidateButton: Locator;
    private _totalRow: Locator;
    private _nextItem: Locator;
    private _prevItem: Locator;
    private _arrChildItemOfDay: Locator[][] = [];
    private _totalUnValidateEachDayWithoutConflict: number[] = [];
    private _wocViewBy: Locator;
    private _listBoxViewBy: Locator;
    private _countMassEdit: number = 0;

    private bCheckOrderOfRow: boolean = true;
    private sDuration: string;
    private sBtnValidateADay: string;
    private sCheckRow: string;
    private sValidated: string;
    private sValidateAll: string;
    private sUnValidateARecord: string
    private sBtnValidateARecord: string;
    private sConflictRow: string;
    private sEditAll: string;
    private sReplaceComment: string;
    private sReplaceActivity: string;
    private sReplaceWbs: string;
    private sReplaceDateDuration: string;
    private sEditedComment: string = "New comment here";
    private sEditedDate: string = "17/11/2022";
    private sEditedDuration: string = "00:45";
    private sEditedStart: string = "01:00";
    private sEditedEnd: string = "04:00";
    private sMaxEndTime: string = "00:00";
    private sMinStartTime: string = "23:59";
    private sendTimeConflict: string = "00:00";
    private sstartTimeConflict: string = "23:59";
    private sdayConflict: string = "";
    private stxtModalData: string = "";
    private sCommentField: string;
    private sActivityField: string;
    private sWbsField: string;
    private sDateField: string;
    private sDurationField: string;
    private sStartField: string;
    private sEndField: string;
    private stxtNameRecord: string;
    private sBtnPeriod: string;
    private sBtnSelectAll: string;
    private confirmModalMassValidate: ConfirmModalPage;
    private editCommentModal: EditCommentPage;
    private index: number = 0;
    private stypeReport: string = '';

    get nextItem(): Locator {
        return this._nextItem;
    }

    set nextItem(value: Locator) {
        this._nextItem = value;
    }

    get totalDuration(): Locator {
        return this._totalDuration;
    }

    set totalDuration(value: Locator) {
        this._totalDuration = value;
    }


    constructor(page: Page, role?: string) {
        super(page);
        this.confirmModalMassValidate = new ConfirmModalPage(this.page, 'button[ng-click="validate()"]');
        this.editCommentModal = new EditCommentPage(this.page);
        this.getElements();
        //TODO role manager ko dc unvalidate
    }

    public async reset() {
        this.arrChildItemOfDay = [];
        this.totalUnValidateEachDayWithoutConflict = [];
        this.index = 0;
        this._countMassEdit = 0;
    }

    private async getElements() {
        this.sDuration = '.medium-1.columns.column-sizeDuration.ng-binding:visible';
        this.sBtnValidateADay = '.k-button.k-button-icontext.iconValidatedDay:visible';
        this.sCheckRow = '.worker-check:visible';
        this.sValidated = '.validated-text.ng-binding';
        this.sUnValidateARecord = 'a[ng-click="unValidatedTimeBookingRecord(record)"]:visible';
        this.sValidateAll = '.iconValidatedPeriod:visible';
        // this.sValidateAll = '#validate-multis:visible';
        this.sConflictRow = '.fi-warning.iconic-md.location.ng-scope:visible';
        this.sBtnValidateARecord = 'a[ng-click="validatedTimeBookingRecords(record)"]:visible';
        this.sEditAll = 'a[ng-click="editMassTimeRecord()"]';
        this.sReplaceComment = 'a[ng-click="replaceComment()"]:visible';
        this.sReplaceActivity = 'a[ng-click="replaceActivity()"]:visible';
        this.sReplaceWbs = 'a[ng-click="replaceWbs()"]:visible';
        this.sReplaceDateDuration = 'a[ng-click="replaceDateAndDuration()"]:visible';
        this.sCommentField = 'div[ng-click="toggleCommentField(record)"]:visible';
        this.sActivityField = 'div[ng-if="pointOfView !== \'task\' && globalSettingOrigin.useTask"]:visible';
        this.sWbsField = 'div:right-of(' + this.sActivityField + '):visible >> nth=0';
        this.sDateField = 'div[class="medium-1 columns time-booking-middle column-sizeDate ng-binding"]:visible';
        this.sDurationField = '.medium-1.columns.timebooking-text-center.column-sizeDurationPadding.ng-binding:visible';
        this.sStartField = 'div:left-of(' + this.sDurationField + '):visible >> nth=1';
        this.sEndField = 'div:left-of(' + this.sDurationField + '):visible >> nth=0';
        this.stxtNameRecord = 'div:right-of(' + this.sDateField + '):visible >> nth=0';
        this.sBtnPeriod = 'div[ng-click="durationPeriod()"]:visible';
        this.sBtnSelectAll = 'div[ng-class="{\'checked\' : isSelectAll}"]:visible';
        this.stxtModalData = 'span[translate-values="modalData"]:visible';

        this.nextItem = await this.findLocator('.next-page');
        this.prevItem = await this.findLocator('.previous-page');
        this.totalDuration = await this.findLocator('.medium-1.columns.totalDurationTb.title.column-sizeDuration.ng-binding:visible');
        this.expandableGroupedByDayRows = await this.findLocator('div[class="medium-12 columns report-day-row ng-scope"]:visible');
        this.totalRow = await this.findLocator('.medium-12.columns.report-time-lapse-total.timebooking-center:visible');
        this.wocViewBy = (await this.findLocator('#wocViewBy')).locator('.view-by-select:visible');
        this.listBoxViewBy = (await this.findLocator('#wocViewBy')).locator('.view-by-options:visible');
    }

    private async doValidate(arrIndexOfChildItemOfDay: { day: number, row: number, id: string }[]) {
        await this.page.screenshot({ path: './screenshots/BeforeValidate.png', fullPage: true });
        await this.totalRow.locator(this.sValidateAll).click();
        await this.confirmModalMassValidate.title.waitFor();
        expect((await this.confirmModalMassValidate.title.textContent()).trim()).toMatch('Validate multiple records');
        expect(await this.confirmModalMassValidate.btnAction.innerText()).toMatch('Validate ' + arrIndexOfChildItemOfDay.length + ' records');
        await this.confirmModalMassValidate.btnAction.click();
        //TODO check cancel
        await this.waitSpinnerEnd();
    }

    private async confirmUnvalidate() {
        await this.confirmModalMassValidate.title.waitFor();
        expect((await this.confirmModalMassValidate.title.textContent()).trim()).toMatch('Unvalidated time record');
        await this.confirmModalMassValidate.btnAction.click();
        await this.waitSpinnerEnd();
    }

    private async doUnValidate(arrIndexOfChildItemOfDay: { day: number, row: number, id: string }[]) {
        for (let i = 0; i < arrIndexOfChildItemOfDay.length; i++) {
            if (this.bCheckOrderOfRow) {
                let m = arrIndexOfChildItemOfDay[i].day;
                let n = arrIndexOfChildItemOfDay[i].row;
                await this.arrChildItemOfDay[this.index][m].nth(n).locator(this.sUnValidateARecord).click();
                await this.confirmUnvalidate();
                expect(await this.arrChildItemOfDay[this.index][m].nth(n).locator(this.sBtnValidateARecord).isVisible()).toBeTruthy();
                expect(await this.arrChildItemOfDay[this.index][m].nth(n).locator(this.sCheckRow).isVisible()).toBeTruthy();
            }
            else {
                await (await this.findLocator('div[id="' + arrIndexOfChildItemOfDay[i].id + '"]')).locator(this.sUnValidateARecord).click();
                await this.confirmUnvalidate();
                expect(await (await this.findLocator('div[id="' + arrIndexOfChildItemOfDay[i].id + '"]')).locator(this.sBtnValidateARecord).isVisible()).toBeTruthy();
                expect(await (await this.findLocator('div[id="' + arrIndexOfChildItemOfDay[i].id + '"]')).locator(this.sCheckRow).isVisible()).toBeTruthy();
            }
        }
        if (this.stypeReport != 'material') expect(this.totalUnValidateEachDayWithoutConflict[this.index]).toEqual(await this.countUnValidateItem());
    }

    public async countUnValidateItem() {
        let count = 0;
        const n = await this.expandableGroupedByDayRows.count();
        for (let i = 0; i < n; i++) {
            const strDuration = (await this.expandableGroupedByDayRows.nth(i).locator(this.sDuration).innerText()).trim();
            let a = strDuration.split(':'); // split it at the colons
            const iUnValidatedItem = await this.expandableGroupedByDayRows.nth(i).locator(this.sCheckRow).count();
            if (strDuration != '00:00' && iUnValidatedItem > 0) {
                count = count + (await this.expandableGroupedByDayRows.nth(i).locator(this.sCheckRow).count());
                console.log('Total Unvalidate rows: ' + count);
                if (this.arrChildItemOfDay[this.index][i])
                    for (let j = 0; j < await this.arrChildItemOfDay[this.index][i].count(); j++) {
                        if (await this.arrChildItemOfDay[this.index][i].nth(j).locator(this.sConflictRow).count() > 0) count--;
                    }
                console.log('Total Unvalidate rows wihtout conflict: ' + count);
            }
        }
        return count;
    }

    private getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
    }

    private async getCurrentItem() {
        return await this.page.locator('.toolbar-select:visible')?.innerText();
    }

    private async checkAfterValidate(arrIndexOfChildItemOfDay: { day: number, row: number, id: string }[], currentItem: string) {
        let bGoToAnItem: boolean = false;
        if (currentItem != null && currentItem != '' && currentItem != await this.getCurrentItem()) {
            await this.goToAnItem(this.index);
            bGoToAnItem = true;
        }
        for (let i = 0; i < arrIndexOfChildItemOfDay.length; i++) {
            if (bGoToAnItem) await this.expandableGroupedByDayRows.nth(arrIndexOfChildItemOfDay[i].day).click();
            if (this.bCheckOrderOfRow) {
                let m = arrIndexOfChildItemOfDay[i].day;
                let n = arrIndexOfChildItemOfDay[i].row;
                await this.page.screenshot({ path: './screenshots/AfterValidate.png', fullPage: true });
                await this.arrChildItemOfDay[this.index][m].nth(n).locator(this.sValidated).screenshot({ path: './screenshots/ElementValidated.png' })
                await this.arrChildItemOfDay[this.index][m].nth(n).screenshot({ path: './screenshots/ElementRowValidated.png' })
                expect(await this.arrChildItemOfDay[this.index][m].nth(n).locator(this.sCheckRow).isVisible()).not.toBeTruthy();
                expect(await this.arrChildItemOfDay[this.index][m].nth(n).locator(this.sBtnValidateADay).isVisible()).not.toBeTruthy();
                expect(await this.arrChildItemOfDay[this.index][m].nth(n).locator(this.sValidated).isVisible()).toBeTruthy();
            }
            expect(await (await this.findLocator('div[id="' + arrIndexOfChildItemOfDay[i].id + '"]')).locator(this.sCheckRow).isVisible()).not.toBeTruthy();
            expect(await (await this.findLocator('div[id="' + arrIndexOfChildItemOfDay[i].id + '"]')).locator(this.sBtnValidateADay).isVisible()).not.toBeTruthy();
            expect(await (await this.findLocator('div[id="' + arrIndexOfChildItemOfDay[i].id + '"]')).locator(this.sValidated).isVisible()).toBeTruthy();

        }
    }

    private async randomItemToValidate() {
        let arrIndex: number[] = [];
        let maxTotalItems: number = this.totalUnValidateEachDayWithoutConflict[this.index];
        if (maxTotalItems > 5) maxTotalItems = 5;
        const totalItems: number = this.getRandomInt(1, maxTotalItems);
        for (let i = 0; i < totalItems; i++) {
            let a = this.getRandomInt(1, maxTotalItems);
            while (arrIndex.includes(a)) a = this.getRandomInt(1, maxTotalItems);
            arrIndex.push(a);
        }
        return arrIndex.sort((n1, n2) => n1 - n2);
    }

    private async clickUnValidateItemsBasedOnRanDomArray(arrIndex: number[]) {
        let i: number = 0;
        let j: number = 0;
        let count: number = 0;
        let indexArrayCheck = 0;
        let arrIndexOfChildItemOfDay: { day: number, row: number, id: string }[] = [];
        await this.page.screenshot({ path: './screenshots/validate-report.png', fullPage: true })
        for (i = 0; i < this.arrChildItemOfDay[this.index].length && indexArrayCheck < arrIndex.length; i++)
            if (await this.arrChildItemOfDay[this.index][i]) {
                for (j = 0; j < await this.arrChildItemOfDay[this.index][i].count() && indexArrayCheck < arrIndex.length; j++) {
                    if (await this.arrChildItemOfDay[this.index][i].nth(j).locator(this.sBtnValidateARecord).isVisible()
                        && await this.arrChildItemOfDay[this.index][i].nth(j).locator(this.sConflictRow).count() == 0) {
                        count++;
                        if (count == arrIndex[indexArrayCheck]) {
                            await this.arrChildItemOfDay[this.index][i].nth(j).locator(this.sCheckRow).click();
                            arrIndexOfChildItemOfDay.push({ "day": i, "row": j, "id": await this.arrChildItemOfDay[this.index][i].nth(j).getAttribute('id') });
                            indexArrayCheck++;
                        }
                    }
                }
            }
        return arrIndexOfChildItemOfDay;
    }

    private async clickRecord(arrIndex: number[]) {
        let i: number = 0;
        let j: number = 0;
        let count: number = 0;
        let indexArrayCheck = 0;
        let arrIndexOfChildItemOfDay: { day: number, row: number, id: string }[] = [];

        for (i = 0; i < this.arrChildItemOfDay[this.index].length && indexArrayCheck < arrIndex.length; i++)
            if (await this.arrChildItemOfDay[this.index][i]) {
                for (j = 0; j < await this.arrChildItemOfDay[this.index][i].count() && indexArrayCheck < arrIndex.length; j++) {
                    if (!(await this.arrChildItemOfDay[this.index][i].nth(j).locator(this.sUnValidateARecord).isVisible() || await this.arrChildItemOfDay[this.index][i].nth(j).locator(this.sConflictRow).isVisible())) {
                        count++;
                        if (count == arrIndex[indexArrayCheck]) {
                            if (await this.arrChildItemOfDay[this.index][i].nth(j).locator(this.sCheckRow).isVisible()) {
                                await this.arrChildItemOfDay[this.index][i].nth(j).locator(this.sCheckRow).click();
                            }
                            arrIndexOfChildItemOfDay.push({ "day": i, "row": j, "id": await this.arrChildItemOfDay[this.index][i].nth(j).getAttribute('id') });
                            indexArrayCheck++;
                        }
                    }
                }
            }
        return arrIndexOfChildItemOfDay;
    }

    private async doTestPeriod() {
        // get list name record
        let arrTmp: String[] = [];
        const n = await this.expandableGroupedByDayRows.count();
        for (let i = 0; i < n; i++) {
            if (this.arrChildItemOfDay[this.index][i]) {
                for (let j = 0; j < await this.arrChildItemOfDay[this.index][i].count(); j++) {
                    if (!(await this.arrChildItemOfDay[this.index][i].nth(j).locator(this.sUnValidateARecord).isVisible() || await this.arrChildItemOfDay[this.index][i].nth(j).locator(this.sConflictRow).isVisible())) {
                        const strNameRecord = (await this.arrChildItemOfDay[this.index][i].nth(j).locator(this.stxtNameRecord).innerText()).trim()
                        arrTmp.push(strNameRecord)
                    }
                }
            }
        }
        let uniqueRecord = [...new Set(arrTmp)];
        // end of get list name record

        //random index number in array uniqueRecord
        let arrRandomId: number[] = [];
        let maxTotalItems: number = this.totalUnValidateEachDayWithoutConflict[this.index];
        if (maxTotalItems > 5) maxTotalItems = 5;
        else maxTotalItems = uniqueRecord.length
        maxTotalItems = uniqueRecord.length < maxTotalItems ? uniqueRecord.length : maxTotalItems
        let totalItems: number = this.getRandomInt(1, maxTotalItems)
        if (uniqueRecord.length >= 2 && totalItems == 1) totalItems = 2
        for (let i = 0; i < totalItems; i++) {
            let a = this.getRandomInt(1, maxTotalItems);
            while (arrRandomId.includes(a)) a = this.getRandomInt(1, maxTotalItems);
            arrRandomId.push(a);
        }
        //end of random index number in array uniqueRecord

        // select first record with the same name record
        arrRandomId.sort((n1, n2) => n1 - n2);
        let arrIndexCheckRow: number[] = [];
        let arrNameCheckRow: String[] = [];

        for (let i = 0; i < arrRandomId.length; i++) {
            for (let j = 0; j < arrTmp.length; j++) {
                if (uniqueRecord[i] == arrTmp[j]) {
                    arrIndexCheckRow.push(j + 1);
                    arrNameCheckRow.push(uniqueRecord[i])
                    break;
                }
            }
        }
        // end of select first record with the same name record

        // get min start time, max end time same name record selected
        this.sdayConflict = ''
        this.sstartTimeConflict = ''
        this.sendTimeConflict = ''

        interface recordEqualNameNearSelectedRecord {
            [key: string]: number;
        }
        let countRecord: recordEqualNameNearSelectedRecord = {};
        let checkMinStartTime: boolean = false;
        for (let i = 0; i < n; i++) {
            let countRowEqualNameRecord = 0;
            if (this.arrChildItemOfDay[this.index][i])
                for (let j = 0; j < await this.arrChildItemOfDay[this.index][i].count(); j++) {
                    const strNameRecord = (await this.arrChildItemOfDay[this.index][i].nth(j).locator(this.stxtNameRecord).innerText()).trim()
                    if (arrNameCheckRow.includes(strNameRecord)) {
                        countRowEqualNameRecord = countRowEqualNameRecord + 1
                        if (countRecord[strNameRecord] === undefined) {
                            countRecord[strNameRecord] = 1
                        }
                        else if (countRecord[strNameRecord] >= 1) {
                            countRecord[strNameRecord]++
                        }

                        if (!(await this.arrChildItemOfDay[this.index][i].nth(j).locator(this.sUnValidateARecord).isVisible() || await this.arrChildItemOfDay[this.index][i].nth(j).locator(this.sConflictRow).isVisible())) {
                            if (await this.arrChildItemOfDay[this.index][i].nth(j).locator(this.sEndField).isVisible() && await this.arrChildItemOfDay[this.index][i].nth(j).locator(this.sStartField).isVisible()) {
                                let endTime = (await this.arrChildItemOfDay[this.index][i].nth(j).locator(this.sEndField).innerText()).trim()
                                let startTime = (await this.arrChildItemOfDay[this.index][i].nth(j).locator(this.sStartField).innerText()).trim()
                                if (endTime != '-' && startTime != '-') {
                                    this.sMaxEndTime = this.sMaxEndTime > endTime ? this.sMaxEndTime : endTime
                                    this.sMinStartTime = this.sMaxEndTime < startTime ? this.sMinStartTime : startTime
                                    checkMinStartTime = true

                                    // get day/start/end time to test conflict time
                                    if (this.sdayConflict == '' && countRecord[strNameRecord] >= 2) {
                                        this.sdayConflict = (await this.arrChildItemOfDay[this.index][i].nth(j).locator(this.sDateField).innerText()).trim()
                                        this.sdayConflict = this.sdayConflict.slice(-10, this.sdayConflict.length)
                                        this.sendTimeConflict = (await this.arrChildItemOfDay[this.index][i].nth(j).locator(this.sEndField).innerText()).trim()
                                        this.sstartTimeConflict = (await this.arrChildItemOfDay[this.index][i].nth(j).locator(this.sStartField).innerText()).trim()
                                    }
                                    //end of get day/start/end time to test conflict time
                                }
                            }
                        }
                    }
                }
        }
        // end of get min start time, max end time same name record selected
        if (!checkMinStartTime) {
            this.sMinStartTime = '00:00'
        }
        return arrIndexCheckRow
    }

    public async printArrayCheckedItems(arrIndexOfChildItemOfDay: { day: number, row: number, id: string }[]) {
        console.log('Selected rows: ');
        for (let i = 0; i < arrIndexOfChildItemOfDay.length; i++) {
            let m = arrIndexOfChildItemOfDay[i].day;
            let n = arrIndexOfChildItemOfDay[i].row;
            let id = arrIndexOfChildItemOfDay[i].id;
            console.log('id: ' + id, ' - day: ' + m + ' - row: ' + n);
        }
    }
    ///                                      this week, labor
    public async checkMassValidateAndEdit(timeRangerFilter: string, typeReport: string) {
        this.stypeReport = typeReport
        if (typeReport == 'material') {
            this.sValidated = '.validated-text-material.ng-binding';
        }
        // const mode : string = process.env.npm_package_config_mode;
        const mode: string = 'light';

        while (mode == 'full' || (mode == 'light' && this._countMassEdit < 1)) {
            const n = await this.expandableGroupedByDayRows.count();
            if (n > 0 && this.totalUnValidateEachDayWithoutConflict[this.index] > 0) {
                let arrIndexOfChildItemOfDay: { day: number, row: number, id: string }[];
                let arrIndexCheckRow = await this.randomItemToValidate();

                console.log('--------------------------------------------');
                console.log('Item: ' + await this.page.locator('.toolbar-select:visible')?.innerText() + '. index: ' + this.index + ' - Total unvalidated: ' + this.totalUnValidateEachDayWithoutConflict[this.index] + ' - will check ' + arrIndexCheckRow.length);
                arrIndexOfChildItemOfDay = await this.clickUnValidateItemsBasedOnRanDomArray(arrIndexCheckRow);
                if (arrIndexOfChildItemOfDay.length < arrIndexCheckRow.length) expect(2).toEqual(1);
                let isConflict = false;
                for (let i = 0; i < arrIndexOfChildItemOfDay.length; i++) {
                    let m = arrIndexOfChildItemOfDay[i].day;
                    let n = arrIndexOfChildItemOfDay[i].row;
                    if (await this.arrChildItemOfDay[this.index][m].nth(n).locator(this.sConflictRow).count() > 0) {
                        isConflict = true;
                        break;
                    }
                }
                if (isConflict) {
                    await expect(await this.totalRow.locator(this.sValidateAll)).toHaveClass(/disabled/);
                } else {
                    let currentItem = await this.page.locator('.toolbar-select:visible')?.innerText();
                    await test.step(this.stypeReport.toUpperCase() + ': do validate', async () => {
                        await this.doValidate(arrIndexOfChildItemOfDay);
                    })
                    await test.step(this.stypeReport.toUpperCase() + ': check validate', async () => {
                        await this.checkAfterValidate(arrIndexOfChildItemOfDay, currentItem);
                    })

                    await this.doUnValidate(arrIndexOfChildItemOfDay);
                    arrIndexOfChildItemOfDay = await this.clickUnValidateItemsBasedOnRanDomArray(arrIndexCheckRow); //TODO what is this?
                    if (this._countMassEdit < 4) {
                        await test.step(this.stypeReport.toUpperCase() + ': do replace comment', async () => {
                            await this.doTestMassEditComment(arrIndexOfChildItemOfDay);
                        })
                        await test.step(this.stypeReport.toUpperCase() + ': check replace comment', async () => {
                            await this.checkAfterEditActivityOrWbsOrComment(arrIndexOfChildItemOfDay, this.sCommentField, this.sEditedComment);
                        })
                        let selectedActivity: string
                        let selectedWbs: string
                        await test.step(this.stypeReport.toUpperCase() + ': do replace Activity', async () => {
                            selectedActivity = await this.doTestMassEditActivity(arrIndexOfChildItemOfDay);
                        })
                        await test.step(this.stypeReport.toUpperCase() + ': check replace Activity', async () => {
                            await this.checkAfterEditActivityOrWbsOrComment(arrIndexOfChildItemOfDay, this.sActivityField, selectedActivity);
                        })
                        // await test.step(this.stypeReport.toUpperCase() + ': do replace wbs',async () => {
                        //     selectedWbs = await this.doTestMassEditWBS(arrIndexOfChildItemOfDay);
                        // })
                        // await test.step(this.stypeReport.toUpperCase() + ': check replace wbs',async () => {
                        //     await this.checkAfterEditActivityOrWbsOrComment(arrIndexOfChildItemOfDay, this.sWbsField, selectedWbs);
                        // })

                        if (typeReport == 'material') {
                            await test.step(this.stypeReport.toUpperCase() + ': do replace date and duration', async () => {
                                await this.doTestMassEditDateDurationMaterial(timeRangerFilter);
                            })
                            await test.step(this.stypeReport.toUpperCase() + ': check replace date and duration', async () => {
                                await this.checkAfterEditDateDurationMaterial(arrIndexOfChildItemOfDay, this.sEditedDate, this.sEditedDuration, timeRangerFilter, currentItem);
                            })
                        }
                        else {
                            await test.step(this.stypeReport.toUpperCase() + ': do replace date and duration', async () => {
                                await this.doTestMassEditDateDuration(timeRangerFilter);
                            })
                            await test.step(this.stypeReport.toUpperCase() + ': check replace date and duration', async () => {
                                await this.checkAfterEditDateDuration(arrIndexOfChildItemOfDay, this.sEditedDate, this.sEditedDuration, timeRangerFilter, currentItem);
                            })
                            // check total duration again beacause day change (locator report-day-row change nth) after replace date duration
                            await this.checkTotalDurationAgain();
                            let arrIndexOfChildItemOfDayByName = await this.getArrayRecordByName()
                            if (this.sdayConflict != '') {
                                console.log("CHECK CONFLICT TIME");
                                console.log(this.sdayConflict);
                                await this.doTestCheckConflictMassEditDatePeriod(timeRangerFilter);
                            }
                            else {
                                console.log("\nNo Test conflict time");
                            }

                            if (arrIndexOfChildItemOfDayByName.length != 0) {
                                await this.printArrayCheckedItems(arrIndexOfChildItemOfDay);
                                await test.step(this.stypeReport.toUpperCase() + ': do replace date and period', async () => {
                                    await this.doTestMassEditDatePeriod(timeRangerFilter);
                                })
                                await test.step(this.stypeReport.toUpperCase() + ': check replace date and period', async () => {
                                    await this.checkAfterEditDatePeriod(arrIndexOfChildItemOfDayByName, this.sEditedDate, this.sEditedStart, this.sEditedEnd, timeRangerFilter, currentItem);
                                })
                            }
                        }
                        if (arrIndexOfChildItemOfDay.length >= 1) this._countMassEdit++;
                    }
                }
            }
            this.index--;
            if ((await this.prevItem.getAttribute('disabled')) == 'disabled') break;
            await this.prevItem.click();
        }
    }

    public async getArrayRecordByName() {
        let arrIndexOfChildItemOfDayByName: { day: number, row: number, id: string }[];
        let arrIndexCheckRowByName = await this.doTestPeriod();

        if (!(await this.page.locator(this.sBtnSelectAll).isVisible())) {
            return []
        }
        await this.page.locator(this.sBtnSelectAll).click()
        arrIndexOfChildItemOfDayByName = await this.clickRecord(arrIndexCheckRowByName);

        if (arrIndexOfChildItemOfDayByName.length < arrIndexCheckRowByName.length) {
            console.log("Length record click < length choose record");
            expect(2).toEqual(1);
        }
        let isConflict2 = false;
        for (let i = 0; i < arrIndexOfChildItemOfDayByName.length; i++) {
            let m = arrIndexOfChildItemOfDayByName[i].day;
            let n = arrIndexOfChildItemOfDayByName[i].row;
            if (await this.arrChildItemOfDay[this.index][m].nth(n).locator(this.sConflictRow).count() > 0) {
                isConflict2 = true;
                break;
            }
        }
        if (isConflict2) {
            await expect(await this.totalRow.locator(this.sValidateAll)).toHaveClass(/disabled/);
        }
        return arrIndexOfChildItemOfDayByName
    }

    /*
    * Split string hh:mm to minutes
    */
    private convertStrToMin(str: string) {
        let a = str.split(':'); // split it at the colons
        return (+a[1]) + (+a[0]) * 60;
    }

    public async checkConflictRow() {

        if (this.arrChildItemOfDay[this.index] == undefined) {
            await this.page.locator('button[ng-click="equipmentRowSelecfdft()"]:visible').click()
        }

        for (let i = 0; i < this.arrChildItemOfDay[this.index].length; i++)
            if (this.arrChildItemOfDay[this.index][i])
                for (let j = 0; j < await this.arrChildItemOfDay[this.index][i].count(); j++) {
                    if (await this.arrChildItemOfDay[this.index][i].nth(j).locator(this.sConflictRow).count() > 0) {
                        await this.arrChildItemOfDay[this.index][i].nth(j).locator(this.sCheckRow).click();
                        await expect(await this.totalRow.locator(this.sValidateAll)).toHaveClass(/disabled/);
                        await this.arrChildItemOfDay[this.index][i].nth(j).locator(this.sCheckRow).click();
                        await expect(await this.totalRow.locator(this.sValidateAll)).not.toHaveClass(/disabled/);
                        break;
                    }
                }
    }

    public async goToAnItem(index: number) {
        console.log('Going to item ' + index);
        // let i = 0;
        let i = 1;
        while (i <= index) {
            const n = await this.expandableGroupedByDayRows.count();
            for (let j = 0; j < n; j++) {
                const bValidateExists = await this.expandableGroupedByDayRows.nth(i).locator(this.sBtnValidateADay).count() > 0;
                if (bValidateExists) {
                    await this.expandableGroupedByDayRows.nth(j).click();
                }
            }
            if ((await this.nextItem.getAttribute('disabled')) == 'disabled') break;
            await this.nextItem.click();
            i++;
        }
    }

    private async checkCalculationTotalDuration() {
        while (true) {
            const numberDateRow = await this.expandableGroupedByDayRows.count();

            // Get valute total duration calculated by report
            const totalDurationByReport = (await this.totalDuration.innerText()).trim();
            console.log(this.index + ' - total time: ' + totalDurationByReport);
            let totalDurationByReportConvertedToMin = this.convertStrToMin(totalDurationByReport);

            let totalDurationCalculateByManual = 0; // total duration calculated by sum duration of all date rows

            let unvalidateRowCount = 0; // number of unvalidate rows
            let dateRows: DateRow[] = []; // all record rows grouped by date
            
            // screenshot to run compare by photo
            this.page.screenshot({ path: './screenshots/Duration' + this.index + '.png' })
 
            for (let indexDateRow = 0; indexDateRow < numberDateRow; indexDateRow++) {

                // Get value duration by day and plus to total duration calculated by manual
                let totalDurationByDay = (await this.expandableGroupedByDayRows.nth(indexDateRow).locator(this.sDuration).innerText()).trim();
                totalDurationCalculateByManual += this.convertStrToMin(totalDurationByDay);
                
                // Check if the row has validate button => is unvalidate record
                let isUnvalidateRecord = await this.expandableGroupedByDayRows.nth(indexDateRow).locator(this.sBtnValidateADay).count() > 0;
                console.log("row day number" + indexDateRow + ' Duration ' + totalDurationByDay + ' validate button ' + isUnvalidateRecord);
                
                if (totalDurationByDay != '00:00' && isUnvalidateRecord) {

                    // Click to expand the row
                    await this.expandableGroupedByDayRows.nth(indexDateRow).click();
                    // Get all record rows in the day and plus to recordRowsGroupByDay
                    let dateRow = new DateRow();
                    dateRow.dailyRows_element = await this.expandableGroupedByDayRows.nth(indexDateRow).locator('.medium-12.columns.report-trip-row.timebooking-center.cursor-pointer:visible');
                    dateRows.push(dateRow);
                    // Get number of unvalidate rows in this day and plus to total unvalidate rows 
                    unvalidateRowCount += await this.expandableGroupedByDayRows.nth(indexDateRow).locator('.medium-12.columns.report-trip-row.timebooking-center.cursor-pointer:visible').locator(this.sCheckRow).count();
                    console.log('total duration - total Unvalidate rows: ' + unvalidateRowCount);
                    
                    // Check if the row has conflict row before=> minus to total unvalidate rows
                    for (let indexRow = 0; indexRow < await dateRows[indexDateRow].dailyRows_element.count(); indexRow++) {
                        if (await dateRows[indexDateRow].dailyRows_element.nth(indexRow).locator(this.sConflictRow).count() > 0) unvalidateRowCount--;
                    }
                    console.log('total duration - total Unvalidate rows without conflict: ' + unvalidateRowCount);
                } else {
                    dateRows.push(null); // There is no record rows in this day
                }

            }

            this.arrChildItemOfDay.push(recordRowsGroupByDay);
            this.totalUnValidateEachDayWithoutConflict.push(unvalidateRowCount);

            // Compare total duration calculated by report and by manual
            expect(totalDurationByReportConvertedToMin).toEqual(totalDurationCalculateByManual);
            // Check if the next button is disabled => end of the report
            if ((await this.nextItem.getAttribute('disabled')) == 'disabled') break;

            if (this.index > 2) break;

            // Click to next page
            await this.nextItem.click();
            this.index++;
        }
    }

    public async checkTotalDurationAgain() {
        await this.reset();
        while (true) {
            const n = await this.expandableGroupedByDayRows.count();
            let total = 0;
            let totalDuration = 0;
            const strTotal = (await this.totalDuration.innerText()).trim();
            total = this.convertStrToMin(strTotal);
            let totalUnvalidateEachDay = 0;
            let arrTmp: Locator[] = [];
            console.log(this.index + ' - total time: ' + strTotal);
            this.page.screenshot({ path: './screenshots/DurationAgain' + this.index + '.png' })
            for (let i = 0; i < n; i++) {
                const strDuration = (await this.expandableGroupedByDayRows.nth(i).locator(this.sDuration).innerText()).trim();
                let a = strDuration.split(':'); // split it at the colons
                totalDuration = totalDuration + (+a[1]) + (+a[0]) * 60;
                const bValidateExists = await this.expandableGroupedByDayRows.nth(i).locator(this.sBtnValidateADay).count() > 0;
                console.log("row " + i + ' Duration ' + strDuration + ' validate button ' + bValidateExists);
                if (strDuration != '00:00' && bValidateExists) {
                    // await this.expandableGroupedByDayRows.nth(i).click();
                    arrTmp.push(await this.expandableGroupedByDayRows.nth(i).locator('.medium-12.columns.report-trip-row.timebooking-center.cursor-pointer:visible'));
                    totalUnvalidateEachDay = totalUnvalidateEachDay + (await this.expandableGroupedByDayRows.nth(i).locator('.medium-12.columns.report-trip-row.timebooking-center.cursor-pointer:visible').locator(this.sCheckRow).count());
                    console.log('total duration - total Unvalidate rows: ' + totalUnvalidateEachDay);
                    for (let j = 0; j < await arrTmp[i].count(); j++) {
                        if (await arrTmp[i].nth(j).locator(this.sConflictRow).count() > 0) totalUnvalidateEachDay--;
                    }
                    console.log('total duration - total Unvalidate rows without conflict: ' + totalUnvalidateEachDay);
                } else {
                    arrTmp.push(null);
                }

            }
            this.arrChildItemOfDay.push(arrTmp);
            this.totalUnValidateEachDayWithoutConflict.push(totalUnvalidateEachDay);
            expect(total).toEqual(totalDuration);
            if ((await this.nextItem.getAttribute('disabled')) == 'disabled') break;

            if (this.index > 2) break;
            await this.nextItem.click();
            this.index++;
        }
    }

    private async getRowInDay() {
        while (true) {
            const n = await this.expandableGroupedByDayRows.count();
            let totalUnvalidateEachDay = 0;
            let arrTmp: Locator[] = [];
            this.arrChildItemOfDay = []
            for (let i = 0; i < n; i++) {
                const bValidateExists = await this.expandableGroupedByDayRows.nth(i).locator(this.sBtnValidateADay).count() > 0;
                if (bValidateExists) {
                    await this.expandableGroupedByDayRows.nth(i).click();
                    arrTmp.push(await this.expandableGroupedByDayRows.nth(i).locator('.medium-12.columns.report-trip-row.timebooking-center.cursor-pointer:visible'));
                    totalUnvalidateEachDay = totalUnvalidateEachDay + (await this.expandableGroupedByDayRows.nth(i).locator('.medium-12.columns.report-trip-row.timebooking-center.cursor-pointer:visible').locator(this.sCheckRow).count());
                    console.log('Total Unvalidate rows: ' + totalUnvalidateEachDay);
                    for (let j = 0; j < await arrTmp[i].count(); j++) {
                        //khong hieu
                        if (await arrTmp[i].nth(j).locator(this.sConflictRow).count() > 0) totalUnvalidateEachDay--;
                    }
                    console.log('Total Unvalidate rows without conflict: ' + totalUnvalidateEachDay);
                } else {
                    arrTmp.push(null);
                }

            }
            this.arrChildItemOfDay.push(arrTmp);
            this.totalUnValidateEachDayWithoutConflict.push(totalUnvalidateEachDay);
            if ((await this.nextItem.getAttribute('disabled')) == 'disabled') break;
            //không hiểu 
            if (this.index > 2) break;
            await this.nextItem.click();
            this.index++;
        }
    }

    public async doTestBy(viewMode: ViewModeEnum, timeRangerFilter: TimeRangerFilterEnum, stepNumber: number, typeReport: ValidationReportTypeEnum) {
        // Ensure the view mode is correct
        if (await this.wocViewBy.textContent() != viewMode) {
            await this.wocViewBy.click();
            await this.listBoxViewBy.locator('.option', { hasText: viewMode }).click();
        }

        // Ensure type report is correct
        await this.reset();
        if ((typeReport == ValidationReportTypeEnum.EQUIPMENT || typeReport == ValidationReportTypeEnum.MATERIAL) && stepNumber == 0) 
            await this.page.locator('button[ng-click="' + typeReport + 'RowSelect()"]:visible').click()

        if (typeReport != ValidationReportTypeEnum.MATERIAL) {
            // Validate Total Duration
            await test.step('check Total Duration', async () => {
                await this.checkCalculationTotalDuration();
            })
        }
        else {
            await this.getRowInDay();
        }

        //không hiểu
        await test.step('check Conflict Row', async () => {
            await this.checkConflictRow();
        })

        await test.step('check Mass Validate, Edit', async () => {
            await this.checkMassValidateAndEdit(timeRangerFilter, typeReport);
        })
    }

    //tungnt
    public async doTestMassEditDateDurationMaterial(timeRangerFilter: string) {
        let confirmModalMassEdit = new ConfirmModalPage(this.page, 'button[ng-click="confirm()"]');
        let editDateDurationPage = new EditDateDurationPage(this.page);
        await this.totalRow.locator(this.sEditAll).click();
        await (await this.findLocator(this.sReplaceDateDuration)).click();

        let date: Date = new Date();
        if (timeRangerFilter == 'this week') {
            let weekDay = date.getUTCDay();
            if (weekDay == 1) {
                this.sEditedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
            }
            else {
                this.sEditedDate = (date.getDate() - 1) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
            }
        } else if (timeRangerFilter == 'last week') {
            var today = new Date();
            date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);
            this.sEditedDate = (date.getDate() - 1) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        } else if (timeRangerFilter == 'this month') {
            var today = new Date();
            date = new Date(today.getFullYear(), today.getMonth(), this.getRandomInt(1, today.getDate()));
            this.sEditedDate = (date.getDate()) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        } else if (timeRangerFilter == 'last month') {
            var today = new Date();
            date = new Date(today.getFullYear(), today.getMonth(), this.getRandomInt(1, today.getDate() - 29));
            this.sEditedDate = (date.getDate()) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        }

        await editDateDurationPage.btnDate.fill(this.sEditedDate);
        await this.editCommentModal.title.click();
        await this.editCommentModal.btnAction.click();
        await confirmModalMassEdit.title.waitFor();
        await confirmModalMassEdit.btnAction.click();
        await this.waitSpinnerEnd();
    }

    public async doTestMassEditDateDuration(timeRangerFilter: string) {
        await this.page.screenshot({ path: './screenshots/' + this.stypeReport + 'BeforeReplaceDateDuration.png', fullPage: true });
        let confirmModalMassEdit = new ConfirmModalPage(this.page, 'button[ng-click="confirm()"]');
        let editDateDurationPage = new EditDateDurationPage(this.page);
        await this.totalRow.locator(this.sEditAll).click();
        await (await this.findLocator(this.sReplaceDateDuration)).click();

        let date: Date = new Date();
        if (timeRangerFilter == 'this week') {
            let weekDay = date.getUTCDay();
            if (weekDay == 1) {
                this.sEditedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
            }
            else {
                this.sEditedDate = (date.getDate() - 1) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
            }
        } else if (timeRangerFilter == 'last week') {
            var today = new Date();
            date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);
            this.sEditedDate = (date.getDate() - 1) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        } else if (timeRangerFilter == 'this month') {
            var today = new Date();
            date = new Date(today.getFullYear(), today.getMonth(), this.getRandomInt(1, today.getDate()));
            this.sEditedDate = (date.getDate()) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        } else if (timeRangerFilter == 'last month') {
            var today = new Date();
            date = new Date(today.getFullYear(), today.getMonth(), this.getRandomInt(1, today.getDate() - 29));
            this.sEditedDate = (date.getDate()) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        }

        await editDateDurationPage.btnDate.fill(this.sEditedDate);
        await editDateDurationPage.textDuration.fill(this.sEditedDuration);
        await this.editCommentModal.title.click();
        await this.editCommentModal.btnAction.click();
        await confirmModalMassEdit.title.waitFor();
        await confirmModalMassEdit.btnAction.click();
        await this.waitSpinnerEnd();
    }

    public async doTestCheckConflictMassEditDatePeriod(timeRangerFilter: string) {
        await this.page.screenshot({ path: './screenshots/' + this.stypeReport + 'BeforeReplaceDatePeriod.png', fullPage: true });
        let confirmModalMassEdit = new ConfirmModalPage(this.page, 'button[ng-click="confirm()"]');
        let editDateDurationPage = new EditDateDurationPage(this.page);
        await this.totalRow.locator(this.sEditAll).click();
        await (await this.findLocator(this.sReplaceDateDuration)).click();
        await (await this.findLocator(this.sBtnPeriod)).click();
        await editDateDurationPage.btnDate.fill(this.sdayConflict);
        await editDateDurationPage.textStart.fill(this.sstartTimeConflict);
        await editDateDurationPage.textEnd.fill(this.sendTimeConflict);
        await this.editCommentModal.title.click();
        await this.editCommentModal.btnAction.click();
        await confirmModalMassEdit.title.waitFor();
        await confirmModalMassEdit.btnAction.click();
        await confirmModalMassEdit.title.waitFor();

        if ((await this.page.locator(this.stxtModalData).innerText()).trim() == 'There is a time conflict on start or stop time') {
            console.log('PASS conflict start: ' + this.sMinStartTime + ' and stop time ' + this.sMaxEndTime + " on " + this.sdayConflict);
        }
        else {
            console.log('Fail doTestCheckConflictMassEditDatePeriod conflict start: ' + this.sMinStartTime + ' and stop time ' + this.sMaxEndTime + " on " + this.sdayConflict);
        }

        await this.page.locator('button[ng-click="confirm()"]:visible').click()
        await this.page.locator('button[ng-click="cancel()"]:visible').click()
    }

    public async doTestMassEditDatePeriod(timeRangerFilter: string) {
        await this.page.screenshot({ path: './screenshots/' + this.stypeReport + 'BeforeReplaceDatePeriod.png', fullPage: true });
        let confirmModalMassEdit = new ConfirmModalPage(this.page, 'button[ng-click="confirm()"]');
        let editDateDurationPage = new EditDateDurationPage(this.page);
        await this.totalRow.locator(this.sEditAll).click();
        await (await this.findLocator(this.sReplaceDateDuration)).click();
        await (await this.findLocator(this.sBtnPeriod)).click();

        if (this.sMaxEndTime < '23:45') {
            this.sEditedStart = this.sMaxEndTime
            if (Number(this.sMaxEndTime.slice(3, 5)) + 15 == 60) {
                this.sEditedEnd = (Number(this.sMaxEndTime.slice(0, 2)) + 1) + this.sMaxEndTime.slice(2, 3) + '00'
            }
            else {
                this.sEditedEnd = this.sMaxEndTime.slice(0, 3) + (Number(this.sMaxEndTime.slice(3, 5)) + 15)
            }

        } else if (this.sMaxEndTime == '23:45') {
            this.sEditedStart = this.sMaxEndTime
            this.sEditedEnd = '23:59'
        }
        else {
            if (this.sMinStartTime >= '00:15' && this.sMinStartTime <= '23:45') {
                this.sEditedEnd = this.sMinStartTime
                if (Number(this.sMinStartTime.slice(3, 5)) - 15 == -15) {
                    this.sEditedStart = (Number(this.sMinStartTime.slice(0, 2)) - 1) + this.sMinStartTime.slice(2, 3) + '45'
                }
                else {
                    this.sEditedStart = this.sMinStartTime.slice(0, 3) + (Number(this.sMinStartTime.slice(3, 5)) - 15)
                }
            } else if (this.sMinStartTime == '00:00') {
                this.sEditedStart = '00:00'
                this.sEditedEnd = '00:45'
            } else {
                this.sEditedStart = this.sMaxEndTime
                this.sEditedEnd = this.sMaxEndTime
            }
        }

        await editDateDurationPage.btnDate.fill(this.sEditedDate);
        await editDateDurationPage.textStart.fill(this.sEditedStart);
        await editDateDurationPage.textEnd.fill(this.sEditedEnd);
        await this.editCommentModal.title.click();
        await this.editCommentModal.btnAction.click();
        await confirmModalMassEdit.title.waitFor();
        await confirmModalMassEdit.btnAction.click();
        await this.waitSpinnerEnd();
    }

    public async doTestMassEditComment(arrIndexOfChildItemOfDay: { day: number, row: number, id: string }[]) {
        let confirmModalMassEdit = new ConfirmModalPage(this.page, 'button[ng-click="confirm()"]');
        await this.totalRow.locator(this.sEditAll).click();
        await (await this.findLocator(this.sReplaceComment)).click();
        this.sEditedComment = ' Comment at ' + Date.now() + " ";
        await this.editCommentModal.comment.fill(this.sEditedComment);
        await this.editCommentModal.btnAction.click();
        await confirmModalMassEdit.title.waitFor();

        await confirmModalMassEdit.btnAction.click();
        await this.waitSpinnerEnd();
        console.log('\nNew comment: ' + this.sEditedComment);
    }

    public async doTestMassEditActivity(arrIndexOfChildItemOfDay: { day: number, row: number, id: string }[]) {
        let confirmModalMassEdit = new ConfirmModalPage(this.page, 'button[ng-click="confirm()"]');
        let editActivityModal = new EditActivityPage(this.page);
        let selectedActivity: string = '';
        await this.totalRow.locator(this.sEditAll).click();
        await (await this.findLocator(this.sReplaceActivity)).click();
        await editActivityModal.activityLevel1.click();

        let len: number = await editActivityModal.listLevel1.count() - 1;
        let randomIndex: number = this.getRandomInt(0, len);
        selectedActivity = await editActivityModal.listLevel1.nth(randomIndex).innerText();
        await editActivityModal.listLevel1.nth(randomIndex).click();
        //TODO get more random level
        if (await editActivityModal.btnAction.isDisabled()) {
            len = await editActivityModal.listLevel2.count() - 1;
            randomIndex = this.getRandomInt(0, len);
            selectedActivity = await editActivityModal.listLevel2.nth(randomIndex).innerText();
            await editActivityModal.listLevel2.nth(randomIndex).click();
            if (await editActivityModal.btnAction.isDisabled()) {
                len = await editActivityModal.listLevel3.count() - 1;
                randomIndex = this.getRandomInt(0, len);
                selectedActivity = await editActivityModal.listLevel3.nth(randomIndex).innerText();
                await editActivityModal.listLevel3.nth(randomIndex).click();
            }
        }
        expect(await editActivityModal.btnAction.isDisabled()).not.toBeTruthy();
        await editActivityModal.btnAction.click();

        await confirmModalMassEdit.title.waitFor();
        await confirmModalMassEdit.btnAction.click();
        await confirmModalMassEdit.btnAction
        await this.waitSpinnerEnd();
        console.log('\nNew Activity: ' + selectedActivity)
        return selectedActivity;
    }

    public async checkAfterEditActivityOrWbsOrComment(arrIndexOfChildItemOfDay: { day: number, row: number, id: string }[], field: string, newvalue: string) {
        for (let i = 0; i < arrIndexOfChildItemOfDay.length; i++) {
            if (this.bCheckOrderOfRow) {
                let m = arrIndexOfChildItemOfDay[i].day;
                let n = arrIndexOfChildItemOfDay[i].row;
                if (await this.arrChildItemOfDay[this.index][m].nth(n).locator(field).innerText() == newvalue.trim()) {
                    console.log('PASS ' + newvalue.trim() + 'day ' + m + ' row ' + n);
                } else {
                    console.log('checkAfterEditActivityOrWbsOrComment: ' + field + ' - selected value is:' + newvalue.trim() + '-' + 'day ' + m + ' row ' + n);
                    console.log('web is: ' + await this.arrChildItemOfDay[this.index][m].nth(n).locator(field).innerText());
                }
                //TODO enable this expectation
                //expect(await this.arrChildItemOfDay[this.index][m].nth(n).locator(field).innerText()).toMatch(newvalue.trim());
                await expect(await this.arrChildItemOfDay[this.index][m].nth(n).locator(this.sCheckRow)).toHaveClass(/checked/);
            }
            if (await (await this.findLocator('div[id="' + arrIndexOfChildItemOfDay[i].id + '"]')).locator(field).innerText() == newvalue.trim()) {
                console.log('PASS ' + newvalue.trim() + ' id-' + arrIndexOfChildItemOfDay[i].id);
            } else {
                console.log('checkAfterEditActivityOrWbsOrComment: ' + field + ' - selected value is:' + newvalue.trim() + ' id-' + arrIndexOfChildItemOfDay[i].id);
                console.log('web is: ' + await (await this.findLocator('div[id="' + arrIndexOfChildItemOfDay[i].id + '"]')).locator(field).innerText());
            }
            //TODO enable this expectation
            //expect(await (await this.findLocator('div[id="'+arrIndexOfChildItemOfDay[i].id+'"]')).locator(field).innerText()).toMatch(newvalue.trim());
            await expect(await (await this.findLocator('div[id="' + arrIndexOfChildItemOfDay[i].id + '"]')).locator(this.sCheckRow)).toHaveClass(/checked/);
        }
    }

    public async checkAfterEditDateDuration(arrIndexOfChildItemOfDay: { day: number, row: number, id: string }[], newDate: string, newDuration: string, timeRangerFilter: string, currentItem: string) {
        await this.page.screenshot({ path: './screenshots/' + this.stypeReport + 'AfterReplaceDateDuration.png', fullPage: true });
        let bGoToAnItem: boolean = false;
        if (currentItem != null && currentItem != '' && currentItem != await this.getCurrentItem()) {
            await this.goToAnItem(this.index);
            bGoToAnItem = true;
        }
        for (let i = 0; i < arrIndexOfChildItemOfDay.length; i++) {
            if (bGoToAnItem) await this.expandableGroupedByDayRows.nth(arrIndexOfChildItemOfDay[i].day).click();
            if ((await (await this.findLocator('div[id="' + arrIndexOfChildItemOfDay[i].id + '"]')).locator(this.sDurationField).innerText()).includes(newDuration.trim())) {
                console.log('\nPASS Duration ' + newDuration.trim() + ' id-' + arrIndexOfChildItemOfDay[i].id);
            } else {
                console.log('checkAfterEditDateDuration: ' + this.sDurationField + ' - selected value is: ' + newDuration.trim() + ' id - ' + arrIndexOfChildItemOfDay[i].id);
                console.log('web is: ' + await (await this.findLocator('div[id="' + arrIndexOfChildItemOfDay[i].id + '"]')).locator(this.sDurationField).innerText());
            }
            if ((await (await this.findLocator('div[id="' + arrIndexOfChildItemOfDay[i].id + '"]')).locator(this.sDateField).innerText()).includes(newDate.trim())) {
                console.log('PASS Date ' + newDate.trim() + ' id-' + arrIndexOfChildItemOfDay[i].id);
            } else {
                console.log('checkAfterEditDateDuration: ' + this.sDateField + ' - selected value is: ' + newDate.trim() + ' id - ' + arrIndexOfChildItemOfDay[i].id);
                console.log('web is: ' + await (await this.findLocator('div[id="' + arrIndexOfChildItemOfDay[i].id + '"]')).locator(this.sDateField).innerText());
            }
            //TODO enable this expectation
            //expect(await (await this.findLocator('div[id="'+arrIndexOfChildItemOfDay[i].id+'"]')).locator(field).innerText()).toMatch(newDate.trim());
            await expect(await (await this.findLocator('div[id="' + arrIndexOfChildItemOfDay[i].id + '"]')).locator(this.sCheckRow)).toHaveClass(/checked/);
        }
    }

    public async checkAfterEditDateDurationMaterial(arrIndexOfChildItemOfDay: { day: number, row: number, id: string }[], newDate: string, newDuration: string, timeRangerFilter: string, currentItem: string) {
        await this.page.screenshot({ path: './screenshots/' + this.stypeReport + 'AfterReplaceDateDurationMaterial.png', fullPage: true });
        let bGoToAnItem: boolean = false;
        if (currentItem != null && currentItem != '' && currentItem != await this.getCurrentItem()) {
            await this.goToAnItem(this.index);
            bGoToAnItem = true;
        }

        for (let i = 0; i < arrIndexOfChildItemOfDay.length; i++) {
            if (bGoToAnItem) await this.expandableGroupedByDayRows.nth(arrIndexOfChildItemOfDay[i].day).click();
            if ((await (await this.findLocator('div[id="' + arrIndexOfChildItemOfDay[i].id + '"]')).locator(this.sDateField).innerText()).includes(newDate.trim())) {
                console.log('PASS Date ' + newDate.trim() + ' id-' + arrIndexOfChildItemOfDay[i].id);
            } else {
                console.log('checkAfterEditDateDuration: ' + this.sDateField + ' - selected value is:' + newDate.trim() + ' id-' + arrIndexOfChildItemOfDay[i].id);
                console.log('web is: ' + await (await this.findLocator('div[id="' + arrIndexOfChildItemOfDay[i].id + '"]')).locator(this.sDateField).innerText());
            }
            //TODO enable this expectation
            //expect(await (await this.findLocator('div[id="'+arrIndexOfChildItemOfDay[i].id+'"]')).locator(field).innerText()).toMatch(newDate.trim());
            await expect(await (await this.findLocator('div[id="' + arrIndexOfChildItemOfDay[i].id + '"]')).locator(this.sCheckRow)).toHaveClass(/checked/);
        }
    }

    public async checkAfterEditDatePeriod(arrIndexOfChildItemOfDay: { day: number, row: number, id: string }[], newDate: string, newStart: string, newEnd: string, timeRangerFilter: string, currentItem: string) {
        await this.page.screenshot({ path: './screenshots/' + this.stypeReport + 'AfterReplaceDatePeriod.png', fullPage: true });
        let bGoToAnItem: boolean = false;
        if (currentItem != null && currentItem != '' && currentItem != await this.getCurrentItem()) {
            await this.goToAnItem(this.index);
            bGoToAnItem = true;
        }
        if (newEnd.length == 4) {
            newEnd = "0" + newEnd
        }
        if (newStart.length == 4) {
            newStart = "0" + newStart
        }
        for (let i = 0; i < arrIndexOfChildItemOfDay.length; i++) {
            if (bGoToAnItem) await this.expandableGroupedByDayRows.nth(arrIndexOfChildItemOfDay[i].day).click();
            if (await (await (await this.findLocator('div[id="' + arrIndexOfChildItemOfDay[i].id + '"]')).locator(this.sStartField).innerText()).trim() == newStart.trim()) {
                console.log('\nPASS Start time ' + newStart.trim() + ' id-' + arrIndexOfChildItemOfDay[i].id);
            } else {
                console.log("Start time: " + newStart);
                console.log('checkAfterEditDatePeriod start time: ' + this.sStartField + ' - selected value is: ' + newStart.trim() + ' id - ' + arrIndexOfChildItemOfDay[i].id);
                console.log('web is: ' + await (await this.findLocator('div[id="' + arrIndexOfChildItemOfDay[i].id + '"]')).locator(this.sStartField).innerText());
            }
            if (await (await (await this.findLocator('div[id="' + arrIndexOfChildItemOfDay[i].id + '"]')).locator(this.sEndField).innerText()).trim() == newEnd.trim()) {
                console.log('PASS End time ' + newEnd.trim() + ' id - ' + arrIndexOfChildItemOfDay[i].id);
            } else {
                console.log("End time: " + newEnd);
                console.log('checkAfterEditDatePeriod end time: ' + this.sEndField + ' - selected value is: ' + newEnd.trim() + ' id - ' + arrIndexOfChildItemOfDay[i].id);
                console.log('web is: ' + await (await this.findLocator('div[id="' + arrIndexOfChildItemOfDay[i].id + '"]')).locator(this.sEndField).innerText());
            }
            if ((await (await this.findLocator('div[id="' + arrIndexOfChildItemOfDay[i].id + '"]')).locator(this.sDateField).innerText()).includes(newDate.trim())) {
                console.log('PASS Date ' + newDate.trim() + ' id - ' + arrIndexOfChildItemOfDay[i].id);
            } else {
                console.log('checkAfterEditDatePeriod: ' + this.sDateField + ' - selected value is: ' + newDate.trim() + ' id - ' + arrIndexOfChildItemOfDay[i].id);
                console.log('web is: ' + await (await this.findLocator('div[id="' + arrIndexOfChildItemOfDay[i].id + '"]')).locator(this.sDateField).innerText());
            }
            //TODO enable this expectation
            //expect(await (await this.findLocator('div[id="'+arrIndexOfChildItemOfDay[i].id+'"]')).locator(field).innerText()).toMatch(newDate.trim());
            await expect(await (await this.findLocator('div[id="' + arrIndexOfChildItemOfDay[i].id + '"]')).locator(this.sCheckRow)).toHaveClass(/checked/);
        }
    }

    public async doTestMassEditWBS(arrIndexOfChildItemOfDay: { day: number, row: number, id: string }[]) {
        let confirmModalMassEdit = new ConfirmModalPage(this.page, 'button[ng-click="confirm()"]');
        let editWbsPage = new EditWbsPage(this.page);
        let selectedWbs: string = '';
        await this.totalRow.locator(this.sEditAll).click();
        await (await this.findLocator(this.sReplaceWbs)).click();
        await editWbsPage.wbsLevel1.click();

        let len: number = await editWbsPage.listLevel1.count() - 1;
        let randomIndex: number = this.getRandomInt(0, len);

        selectedWbs = await editWbsPage.listLevel1.nth(randomIndex).innerText();
        if (!(await editWbsPage.listLevel1.nth(randomIndex).locator('.element-check').getAttribute('class')).includes('checked'))
            await editWbsPage.listLevel1.nth(randomIndex).click();
        console.log('\n' + selectedWbs);
        if (!(await editWbsPage.wbsLevel2.getAttribute('class')).includes('not-allow')) {
            if (!(await editWbsPage.wbsLevel2.getAttribute('class')).includes('selected'))
                await editWbsPage.wbsLevel2.click();
            len = await editWbsPage.listLevel2.count() - 1;
            console.log('len 2 ' + len);
            randomIndex = this.getRandomInt(0, len);
            selectedWbs = selectedWbs.trim() + '/ ' + await editWbsPage.listLevel2.nth(randomIndex).innerText();
            await editWbsPage.listLevel2.nth(randomIndex).click();
            if (!(await editWbsPage.wbsLevel3.getAttribute('class')).includes('not-allow')) {
                if (!(await editWbsPage.wbsLevel3.getAttribute('class')).includes('selected'))
                    await editWbsPage.wbsLevel3.click();
                len = await editWbsPage.listLevel3.count() - 1;
                console.log('len 3' + len);
                randomIndex = this.getRandomInt(0, len);
                selectedWbs = selectedWbs.trim() + '/ ' + await editWbsPage.listLevel3.nth(randomIndex).innerText();
                await editWbsPage.listLevel3.nth(randomIndex).click();
            }
        }
        await this.page.screenshot({ path: './screenshots/choose-wbs.png' })


        expect(await editWbsPage.btnAction.isDisabled()).not.toBeTruthy();
        await editWbsPage.btnAction.click();

        await confirmModalMassEdit.title.waitFor();
        await confirmModalMassEdit.btnAction.click();
        await this.waitSpinnerEnd();
        console.log('New WBS: ' + selectedWbs)
        return selectedWbs.trim();
    }
}