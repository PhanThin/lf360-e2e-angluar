import Wrapper from "../../../base/Wrapper";
import {Locator, Page} from "@playwright/test";
import el from "../../../../resource/element/history-on-map.json";
import WeekDayPage from "./week-day.page";
import WeekTotalRowPage from "./week-total-row.page";
export default class AWeekPage extends Wrapper{
    get week_days(): WeekDayPage[] {
        return this._week_days;
    }

    set week_days(value: WeekDayPage[]) {
        this._week_days = value;
    }

    get week_total_row(): WeekTotalRowPage {
        return this._week_total_row;
    }

    set week_total_row(value: WeekTotalRowPage) {
        this._week_total_row = value;
    }
    constructor(page : Page) {
        super(page);
    }

    private _week_days : WeekDayPage[] = [];
    private _week_total_row : WeekTotalRowPage;

    public async getElements(itself : Locator){
        this.week_total_row = new WeekTotalRowPage(this.page, await itself.locator(el.journey.week_total.itself));
        let numberTotalDays = await itself.locator(el.journey.week_day.itself).count();
        for (let i=0; i<numberTotalDays; i++){
            let weekDay = new WeekDayPage(this.page, await itself.locator(el.journey.week_day.itself).nth(i));
            this.week_days.push(weekDay);
        }
    }
}