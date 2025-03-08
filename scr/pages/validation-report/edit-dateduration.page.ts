import {Locator, Page} from "@playwright/test";
import ChooseParameterActionModalPage from "../choose-parameter-action-modal.page";

export default class EditDateDurationPage extends ChooseParameterActionModalPage{
    get textStart(): Locator {
        return this._textStart;
    }

    set textStart(value: Locator) {
        this._textStart = value;
    }
    get textEnd(): Locator {
        return this._textEnd;
    }

    set textEnd(value: Locator) {
        this._textEnd = value;
    }
    get btnDate(): Locator {
        return this._btnDate;
    }

    set btnDate(value: Locator) {
        this._btnDate = value;
    }


    get textDuration(): Locator {
        return this._textDuration;
    }

    set textDuration(value: Locator) {
        this._textDuration = value;
    }

    private _btnDate : Locator;
    private _textDuration : Locator;
    private _textStart : Locator;
    private _textEnd : Locator;
    constructor(page : Page) {
        super(page);
        this.btnDate =  this.page.locator('.create-report-modal.woc-create-content.ng-scope').locator('input[kendo-date-picker="widget.date"]');
        this.textDuration =  this.page.locator('.create-report-modal.woc-create-content.ng-scope').locator('input[kendo-time-picker="widget.duration"]');
        this.textStart =  this.page.locator('.create-report-modal.woc-create-content.ng-scope').locator('input[kendo-time-picker="widget.startTime"]');
        this.textEnd =  this.page.locator('.create-report-modal.woc-create-content.ng-scope').locator('input[kendo-time-picker="widget.endTime"]');
    }
}