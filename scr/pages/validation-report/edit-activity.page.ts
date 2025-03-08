import { Locator, Page } from "@playwright/test";
import ChooseParameterActionModalPage from "../choose-parameter-action-modal.page";

export default class EditActivityPage extends ChooseParameterActionModalPage {
    get activityLevel2(): Locator {
        return this._activityLevel2;
    }

    set activityLevel2(value: Locator) {
        this._activityLevel2 = value;
    }

    get activityLevel3(): Locator {
        return this._activityLevel3;
    }

    set activityLevel3(value: Locator) {
        this._activityLevel3 = value;
    }
    get activityLevel1(): Locator {
        return this._activityLevel1;
    }

    set activityLevel1(value: Locator) {
        this._activityLevel1 = value;
    }
    private _activityLevel1: Locator;
    private _activityLevel2: Locator;
    private _activityLevel3: Locator
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

    constructor(page: Page) {
        super(page);
        this.activityLevel1 = this.page.locator('div[ng-click="showActivityLevel1()"]');
        this.activityLevel2 = this.page.locator('div[ng-click="showActivityLevel2()"]');
        this.activityLevel3 = this.page.locator('div[ng-click="showActivityLevel3()"]');
        this.listLevel1 = this.page.locator('div[ng-show="showActivitiesLevel1"]').locator('.activity-item.ng-scope:visible');
        this.listLevel2 = this.page.locator('div[ng-show="showActivitiesLevel2"]').locator('.activity-item.ng-scope:visible');
        this.listLevel3 = this.page.locator('div[ng-show="showActivitiesLevel3"]').locator('.activity-item.ng-scope:visible');
    }

}