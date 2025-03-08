import Wrapper from "../base/Wrapper";
import {Locator, Page} from "@playwright/test";

export default class MainNavigationBarPage extends Wrapper{
    get settingStep1(): Locator {
        return this._settingStep1;
    }

    set settingStep1(value: Locator) {
        this._settingStep1 = value;
    }
    get trackingStep1(): Locator {
        return this._trackingStep1;
    }

    set trackingStep1(value: Locator) {
        this._trackingStep1 = value;
    }
    get wocStep1(): Locator {
        return this._wocStep1;
    }

    set wocStep1(value: Locator) {
        this._wocStep1 = value;
    }
    private _wocStep1 : Locator;
    private _trackingStep1 : Locator;
    private _settingStep1 : Locator;
    constructor(page : Page) {
        super(page);
        this.getElements();

    }

    private async getElements(){
        this.wocStep1 = await this.findLocator('#wocStep1');
        this.trackingStep1 = await this.findLocator('#trackingStep1');
        this.settingStep1 = await this.findLocator('#settingStep1');
    }
}