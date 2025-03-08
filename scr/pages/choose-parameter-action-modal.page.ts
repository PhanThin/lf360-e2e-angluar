import Wrapper from "../base/Wrapper";
import {Locator, Page} from "@playwright/test";

export default class ChooseParameterActionModalPage extends Wrapper{
    private _title : Locator;
    private _btnCancel : Locator;
    private _btnAction : Locator;

    get title(): Locator {
        return this._title;
    }

    set title(value: Locator) {
        this._title = value;
    }

    get btnCancel(): Locator {
        return this._btnCancel;
    }

    set btnCancel(value: Locator) {
        this._btnCancel = value;
    }

    get btnAction(): Locator {
        return this._btnAction;
    }

    set btnAction(value: Locator) {
        this._btnAction = value;
    }

    constructor(page : Page) {
        super(page);
        this.getElements();

    }

    private async getElements(){
        this.title = await this.findLocator('.header-conatiner:visible');
        this.btnCancel = await this.findLocator('button[ng-click="cancel()"]');
        this.btnAction = await this.findLocator('#save-button');
    }
}