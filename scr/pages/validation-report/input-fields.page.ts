import Wrapper from "../../base/Wrapper";
import {Locator, Page} from "@playwright/test";

export default class InputFieldsPage extends Wrapper{
    get endDate(): Locator {
        return this._endDate;
    }

    set endDate(value: Locator) {
        this._endDate = value;
    }
    get startDate(): Locator {
        return this._startDate;
    }

    set startDate(value: Locator) {
        this._startDate = value;
    }
    get timeframe_thisweek(): Locator {
        return this._timeframe_thisweek;
    }

    set timeframe_thisweek(value: Locator) {
        this._timeframe_thisweek = value;
    }

    get timeframe_lastweek(): Locator {
        return this._timeframe_lastweek;
    }

    set timeframe_lastweek(value: Locator) {
        this._timeframe_lastweek = value;
    }

    get timeframe_thismonth(): Locator {
        return this._timeframe_thismonth;
    }

    set timeframe_thismonth(value: Locator) {
        this._timeframe_thismonth = value;
    }

    get timeframe_lastmonth(): Locator {
        return this._timeframe_lastmonth;
    }

    set timeframe_lastmonth(value: Locator) {
        this._timeframe_lastmonth = value;
    }

    get timeframe_custom(): Locator {
        return this._timeframe_custom;
    }

    set timeframe_custom(value: Locator) {
        this._timeframe_custom = value;
    }

    get timeframe_all(): Locator {
        return this._timeframe_all;
    }

    set timeframe_all(value: Locator) {
        this._timeframe_all = value;
    }
    private _timeframe_thisweek: Locator;
    private _timeframe_lastweek: Locator;
    private _timeframe_thismonth: Locator;
    private _timeframe_lastmonth: Locator;
    private _timeframe_custom: Locator;
    private _timeframe_all: Locator;
    private _startDate : Locator;
    private _endDate : Locator;
    private _selectTeam : Locator;
    private _selectProject : Locator;
    private _dropdownTeam : Locator;
    private _dropdownActivity : Locator;
    private _btnShow : Locator;

    get dropdownTeam(): Locator {
        return this._dropdownTeam;
    }

    set dropdownTeam(value: Locator) {
        this._dropdownTeam = value;
    }

    get dropdownActivity(): Locator {
        return this._dropdownActivity;
    }

    set dropdownActivity(value: Locator) {
        this._dropdownActivity = value;
    }

    get btnShow(): Locator {
        return this._btnShow;
    }

    set btnShow(value: Locator) {
        this._btnShow = value;
    }

    get selectTeam(): Locator {
        return this._selectTeam;
    }

    set selectTeam(value: Locator) {
        this._selectTeam = value;
    }

    get selectProject(): Locator {
        return this._selectProject;
    }

    set selectProject(value: Locator) {
        this._selectProject = value;
    }

    constructor(page : Page) {
        super(page);
        this.getElements();

    }

    private async getElements(){
        this.timeframe_thisweek = await this.findLocator('label[for="timeframe-thisweek"]');
        this.timeframe_lastweek = await this.findLocator('label[for="timeframe-lastweek"]');
        this.timeframe_thismonth = await this.findLocator('label[for="timeframe-thismonth"]');
        this.timeframe_lastmonth = await this.findLocator('label[for="timeframe-lastmonth"]');
        this.timeframe_custom = await this.findLocator('label[for="timeframe-custom"]');
        this.timeframe_all = await this.findLocator('label[for="timeframe-all"]');
        this.startDate = await this.findLocator('input[k_ng_model="controls.startDate"]');
        this.endDate = await this.findLocator('input[k_ng_model="controls.endDate"]');
        this.selectTeam = await this.page.locator('#selectTeamProject').getByText('Team');
        this.selectProject = await this.page.locator('#selectTeamProject').getByText('Project');
        this.dropdownTeam = await this.page.locator('#wocSelectTeams').getByText('Select Team').nth(0);
        this.dropdownActivity = await this.page.locator('#wocSelectTasksCustomerSite').getByText('Select activities').nth(0);
        this.btnShow = await this.page.locator('#wocButtons').getByText('Show');
    }
}