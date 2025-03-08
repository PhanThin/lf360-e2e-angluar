import Wrapper from "../base/Wrapper";
import {Locator, Page} from "@playwright/test";

export default class ConfirmModalPage extends Wrapper{
    private _title: Locator;
    private _btnCancel : Locator;
    private _btnAction : Locator;
    private sActionButton : string;

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

    constructor(page : Page, sActionButton: string) {
        super(page);
        this.sActionButton = sActionButton;
        this.getElements();

    }

    private async getElements(){
        this.btnCancel = await this.findLocator('button[ng-click="cancel()"]');
        this.btnAction = await this.findLocator(this.sActionButton);
        this.title = await this.findLocator('.medium-12.columns.modal-title');
    }
}