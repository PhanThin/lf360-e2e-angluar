import {Locator, Page} from "@playwright/test";
import ChooseParameterActionModalPage from "../choose-parameter-action-modal.page";

export default class EditWbsPage extends ChooseParameterActionModalPage{
    get wbsLevel2(): Locator {
        return this._wbsLevel2;
    }

    set wbsLevel2(value: Locator) {
        this._wbsLevel2 = value;
    }

    get wbsLevel3(): Locator {
        return this._wbsLevel3;
    }

    set wbsLevel3(value: Locator) {
        this._wbsLevel3 = value;
    }
    get wbsLevel1(): Locator {
        return this._wbsLevel1;
    }

    set wbsLevel1(value: Locator) {
        this._wbsLevel1 = value;
    }
    private _wbsLevel1 : Locator;
    private _wbsLevel2 : Locator;
    private _wbsLevel3 : Locator
    private _listLevel1: Locator;
    private _listLevel2: Locator
    private _listLevel3: Locator;

    get listLevel1(): Locator {
        return this._listLevel1;
    }

    set listLevel1(value: Locator) {
        this._listLevel1 = value;
    }

    get listLevel2(): Locator {
        return this._listLevel2;
    }

    set listLevel2(value: Locator) {
        this._listLevel2 = value;
    }

    get listLevel3(): Locator {
        return this._listLevel3;
    }

    set listLevel3(value: Locator) {
        this._listLevel3 = value;
    }

    constructor(page : Page) {
        super(page);
        this.wbsLevel1 =  this.page.locator('div[ng-click="showAllWbsLevel1()"]');
        this.wbsLevel2 =  this.page.locator('div[ng-click="showAllWbsLevel2()"]');
        this.wbsLevel3 =  this.page.locator('div[ng-click="showAllWbsLevel3()"]');
        this.listLevel1 = this.page.locator('div[ng-show="showWbsLevel1"]').locator('.activity-item.ng-scope:visible');
        this.listLevel2 = this.page.locator('div[ng-show="showWbsLevel2"]').locator('.activity-item.ng-scope:visible');
        this.listLevel3 = this.page.locator('div[ng-show="showWbsLevel3"]').locator('.activity-item.ng-scope:visible');
    }

}